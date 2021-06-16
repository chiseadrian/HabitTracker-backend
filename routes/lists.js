/*
    List Routes
    /api/lists
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validationFields, validationJWT } = require('../middlewares');
const { addList, getLists, updateList, deleteList } = require('../controllers/lists');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use(validationJWT);


// Get lists 
router.get('/', getLists);

// New list
router.post(
    '/',
    [
        check('name', 'Name is mandatory!').not().isEmpty(),
        check('date', 'Date is mandatory!').not().isEmpty(),
        check('columns', 'Columns are mandatory!').not().isEmpty(),
        check('values', 'Values are mandatory!').not().isEmpty(),
        validationFields
    ],
    addList
);

// Update list
router.put(
    '/:id',
    [
        check('name', 'Name is mandatory!').not().isEmpty(),
        check('date', 'Date is mandatory!').not().isEmpty(),
        check('columns', 'Columns are mandatory!').not().isEmpty(),
        check('values', 'Values are mandatory!').not().isEmpty(),
        validationFields
    ],
    updateList
);

// Delete day
router.delete('/:id', deleteList);

module.exports = router;