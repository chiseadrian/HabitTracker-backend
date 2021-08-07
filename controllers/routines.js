const { response } = require('express');
const Routine = require('../models/Routine');


const getRoutines = async (req, res = response) => {
    const userId = req.uid;
    const routines = await Routine.find({ 'user': { $in: userId } });
    res.json({
        ok: true,
        routines
    });
}

const addRoutine = async (req, res = response) => {
    const routine = new Routine(req.body);

    try {
        routine.user = req.uid;
        const routineGuardado = await routine.save();

        res.json({
            ok: true,
            routine: routineGuardado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contact an admin'
        });
    }
}

const updateRoutine = async (req, res = response) => {

    const routineId = req.params.id;
    const uid = req.uid;

    try {

        const routine = await Routine.findById(routineId);

        if (!routine) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no routine with that id'
            });
        }

        if (routine.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have the privilege to delete this'
            });
        }

        const newRoutine = {
            ...req.body,
            user: uid
        }

        const updatedRoutine = await Routine.findByIdAndUpdate(routineId, newRoutine, { new: true });

        res.json({
            ok: true,
            evento: updatedRoutine
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact an admin'
        });
    }
}

const deleteRoutine = async (req, res = response) => {

    const routineId = req.params.id;
    const uid = req.uid;

    try {

        const routine = await Routine.findById(routineId);

        if (!routine) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no routine with that id'
            });
        }

        if (routine.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have the privilege to delete this'
            });
        }


        await Routine.findByIdAndDelete(routineId);

        res.json({ ok: true });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact an admin'
        });
    }
}


module.exports = {
    addRoutine,
    getRoutines,
    deleteRoutine,
    updateRoutine
}