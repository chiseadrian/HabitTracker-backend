const { Schema, model } = require('mongoose');


const ListSchema = Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    columns: {
        type: Array,
        required: true
    },
    values: {
        type: Object,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

ListSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('List', ListSchema );

