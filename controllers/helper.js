const { response } = require('express');
const Helper = require('../models/Helper');


const getHelpers = async (req, res = response) => {
    const [helpers] = await Helper.find();

    res.json({
        ok: true,
        image: helpers.image
    });
}



module.exports = {
    getHelpers
}