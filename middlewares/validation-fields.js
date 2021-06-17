const { response } = require('express');
const { validationResult } = require('express-validator');


const validationFields = (req, res = response, next) => {
    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: errors.array()[0]
        });
    }

    next();
}


module.exports = {
    validationFields
}

