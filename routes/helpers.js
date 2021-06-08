/*
    Helper Routes
    /api/helpers
*/
const { Router } = require('express');
const { getHelpers } = require('../controllers/helper');

const router = Router();


// Get helper 
router.get('/', getHelpers);

// Add helper
// router.post(
//     '/',
//     [
//         check('image', 'Image is mandatory!').not().isEmpty(),
//         validarCampos
//     ],
//     addHelper
// );

// // Update helper
// router.put(
//     '/:id',
//     [
//         check('image', 'Image is mandatory!').not().isEmpty(),
//         validarCampos
//     ],
//     updateHelper
// );

// // Delete note
// router.delete('/:id', deleteHelper);

module.exports = router;