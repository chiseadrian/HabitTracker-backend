const { Schema, model } = require('mongoose');


const DaySchema = Schema({
    numDay: {
        type: Number,
        required: true
    },
    numMonth: {
        type: Number,
        required: true
    },
    numYear: {
        type: Number,
        required: true
    },
    done: {
        type: Number,   
        required: true     
    },
    values: {
        type: Object,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

DaySchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('Day', DaySchema );

