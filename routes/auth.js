/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken, googleLogin, confirmRegister } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.post(
    '/new',
    [ // middlewares
        check('name', 'Name is mandatory!').not().isEmpty(),
        check('email', 'Email is mandatory!').isEmail(),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
);

router.post(
    '/',
    [
        check('email', 'Email is mandatory!').isEmail(),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
);

router.post(
    '/google',
    [
        check('id_token', 'id_token is mandatory!').not().isEmpty(),
        validarCampos
    ],
    googleLogin
);


router.get('/renew', validarJWT, revalidarToken);
router.get('/confirmation/:token', confirmRegister);



module.exports = router;