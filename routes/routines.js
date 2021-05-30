/*
    Routines Routes
    /api/routines
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { addRoutine, getRoutines, deleteRoutine, updateRoutine } = require('../controllers/routines');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener eventos 
router.get('/', getRoutines );

// Crear un nuevo evento
router.post(
    '/',
    [
        check('name','Name is mandatory!').not().isEmpty(),
        check('frecuency','Frecuency is mandatory!').not().isEmpty(),
        check('goal','Goal is mandatory!').not().isEmpty(),
        check('date','Date is mandatory!').custom( isDate ),
        validarCampos
    ],
    addRoutine 
);

// Actualizar Evento
router.put(
    '/:id', 
    [
        check('name','Name is mandatory!').not().isEmpty(),
        check('frecuency','Frecuency is mandatory!').not().isEmpty(),
        check('goal','Goal is mandatory!').not().isEmpty(),
        validarCampos
    ],
    updateRoutine 
);

// Borrar evento
router.delete('/:id', deleteRoutine );

module.exports = router;