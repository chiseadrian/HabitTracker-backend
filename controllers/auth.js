const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generateJWT, verifyJWT, googleVerify, sendConfirmEmail } = require('../helpers');


const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Email address already registered!'
            });
        }

        usuario = new Usuario(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        await sendConfirmEmail(usuario.id, usuario.name, email);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Contact an admin'
        });
    }
}

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'This combination of user and password does not exist!'
            });
        }

        if (!usuario.confirmed) {
            return res.status(400).json({
                ok: false,
                msg: "Please verify your email address!"
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'This combination of user and password does not exist!'
            });
        }

        // Generar JWT
        const token = await generateJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact an admin'
        });
    }
}

const renewToken = async (req, res = response) => {
    const { uid, name } = req;
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        token,
        uid,
        name
    })
}

const googleLogin = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const { name, email } = await googleVerify(id_token);
        let usuario = await Usuario.findOne({ email });

        if (!usuario) {  //si el usuario no existe en la BD se crea
            const data = {
                name,
                email,
                password: '...',
                google: true,
                confirmed: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Generar el JWT
        const token = await generateJWT(usuario.id, name);
        res.json({
            ok: true,
            uid: usuario.id,
            name,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Google token is not valid'
        });
    }
}

const confirmRegister = async (req, res = response) => {
    const token = req.params.token;

    try {
        const { uid, name } = verifyJWT(token, process.env.SECRET_JWT_EMAIL);
        await Usuario.updateOne({ _id: uid }, { $set: { confirmed: true } });

        // Generar JWT para la sesion
        const tokenSession = await generateJWT(uid, name);

        res.redirect(`${process.env.HOST}/login`);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: "Token can't be verified"
        });
    }
}


module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken,
    googleLogin,
    confirmRegister
}