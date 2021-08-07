const jwt = require('jsonwebtoken');


const generateJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '1d'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('The token could not be generated');
            }

            resolve(token);
        })
    })
}

const verifyJWT = (token, key) => {
    return jwt.verify(token, key);
}


module.exports = {
    generateJWT,
    verifyJWT
}


