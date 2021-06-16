const { Schema, model } = require('mongoose');


const HelperSchema = Schema({
    image: {        //guarda url de la imagen del home  (siempre hay solamente una)
        type: String,
        required: true
    }
});

HelperSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('Helper', HelperSchema);

