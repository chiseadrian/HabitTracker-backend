const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true
    },
    google: {
        type: Boolean,
        default: false,
        required: true
    }
});


module.exports = model('Usuario', UsuarioSchema);

