/*
    Days Routes
    /api/days
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { addDay, getDays, updateDay, deleteDay, getDaysInRange } = require('../controllers/days');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Get days 
router.get('/', getDays );
router.get('/:start/:end', getDaysInRange );

// New day
router.post(
    '/',
    [
        check('done','Done is mandatory!').not().isEmpty(),
        check('values','Values are mandatory!').not().isEmpty(),
        check('numDay','Day is mandatory!').not().isEmpty(),
        check('numMonth','Month is mandatory!').not().isEmpty(),
        check('numYear','Year is mandatory!').not().isEmpty(),
        check('date','Date is mandatory!').not().isEmpty(),
        validarCampos
    ],
    addDay 
);

// Update day
router.put(
    '/:id', 
    [
        check('done','Done is mandatory!').not().isEmpty(),
        check('values','Values are mandatory!').not().isEmpty(),
        validarCampos
    ],
    updateDay 
);

// Delete day
router.delete('/:id', deleteDay );

module.exports = router;