/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validationFields, validationJWT } = require('../middlewares');
const { crearUsuario, loginUsuario, renewToken, googleLogin, confirmRegister } = require('../controllers/auth');


const router = Router();


router.post(
    '/new',
    [ // middlewares
        check('name', 'Name is mandatory!').not().isEmpty(),
        check('email', 'Email is mandatory!').isEmail(),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
        validationFields
    ],
    crearUsuario
);

router.post(
    '/',
    [
        check('email', 'Email is mandatory!').isEmail(),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
        validationFields
    ],
    loginUsuario
);

router.post(
    '/google',
    [
        check('id_token', 'id_token is mandatory!').not().isEmpty(),
        validationFields
    ],
    googleLogin
);


router.get('/renew', validationJWT, renewToken);
router.get('/confirmation/:token', confirmRegister);



module.exports = router;