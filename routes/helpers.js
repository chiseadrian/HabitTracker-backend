/*
    Helper Routes
    /api/helpers
*/
const { Router } = require('express');
const { getHelpers } = require('../controllers/helper');

const router = Router();


// Get helper 
router.get('/', getHelpers);


module.exports = router;