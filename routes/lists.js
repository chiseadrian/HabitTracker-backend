/*
    List Routes
    /api/lists
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { addList, getLists, updateList, deleteList } = require('../controllers/lists');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Get lists 
router.get('/', getLists );

// New list
router.post(
    '/',
    [
        check('name','Name is mandatory!').not().isEmpty(),
        check('date','Date is mandatory!').not().isEmpty(),
        check('columns','Columns are mandatory!').not().isEmpty(),
        check('values','Values are mandatory!').not().isEmpty(),
        validarCampos
    ],
    addList 
);

// Update list
router.put(
    '/:id', 
    [
        check('name','Name is mandatory!').not().isEmpty(),
        check('date','Date is mandatory!').not().isEmpty(),
        check('columns','Columns are mandatory!').not().isEmpty(),
        check('values','Values are mandatory!').not().isEmpty(),
        validarCampos
    ],
    updateList 
);

// Delete day
router.delete('/:id', deleteList );

module.exports = router;