const { Schema, model } = require('mongoose');


const RoutineSchema = Schema({
    name: {
        type: String,
        required: true
    },
    frecuency: {
        type: Number,        
    },
    goal: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

RoutineSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('Routine', RoutineSchema );

