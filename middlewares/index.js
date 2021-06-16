const validationFields = require('./validation-fields');
const validationJWT = require('./validation-jwt');

module.exports = {
    ...validationFields,
    ...validationJWT
}