const googleVerify = require('./googleVerify');
const isDate = require('./isDate');
const jwt = require('./jwt');
const sendConfirmEmail = require('./sendConfirmEmail');
const setDailyBackgroundImage = require('./setDailyBackgroundImage');


module.exports = {
    ...googleVerify,
    ...isDate,
    ...jwt,
    ...sendConfirmEmail,
    ...setDailyBackgroundImage,
}