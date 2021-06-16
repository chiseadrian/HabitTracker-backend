/*
    Notes Routes
    /api/notes
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validationFields, validationJWT } = require('../middlewares');
const { addNote, getNotes, updateNote, deleteNote } = require('../controllers/notes');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use(validationJWT);


// Get notes 
router.get('/', getNotes);

// Add note
router.post(
    '/',
    [
        check('title', 'Title is mandatory!').not().isEmpty(),
        check('body', 'Body is mandatory!').not().isEmpty(),
        check('date', 'Date is mandatory!').not().isEmpty(),
        validationFields
    ],
    addNote
);

// Update note
router.put(
    '/:id',
    [
        check('title', 'Title is mandatory!').not().isEmpty(),
        check('body', 'Body is mandatory!').not().isEmpty(),
        validationFields
    ],
    updateNote
);

// Delete note
router.delete('/:id', deleteNote);


module.exports = router;