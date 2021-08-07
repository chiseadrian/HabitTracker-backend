/*
    Days Routes
    /api/days
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validationFields, validationJWT } = require('../middlewares');
const { addDay, getDays, updateDay, deleteDay, getDaysInRange } = require('../controllers/days');

const router = Router();


// Todas tienes que pasar por la validación del JWT
router.use(validationJWT);

// Get days 
router.get('/', getDays);
router.get('/:start/:end', getDaysInRange);

// New day
router.post(
    '/',
    [
        check('done', 'Done is mandatory').not().isEmpty(),
        check('values', 'Values are mandatory').not().isEmpty(),
        check('numDay', 'Day is mandatory').not().isEmpty(),
        check('numMonth', 'Month is mandatory').not().isEmpty(),
        check('numYear', 'Year is mandatory').not().isEmpty(),
        check('date', 'Date is mandatory').not().isEmpty(),
        validationFields
    ],
    addDay
);

// Update day
router.put(
    '/:id',
    [
        check('done', 'Done is mandatory').not().isEmpty(),
        check('values', 'Values are mandatory').not().isEmpty(),
        validationFields
    ],
    updateDay
);

// Delete day
router.delete('/:id', deleteDay);

module.exports = router;