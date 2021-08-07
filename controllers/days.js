const { response } = require('express');
const Day = require('../models/Day');


const getDays = async (req, res = response) => {
    const userId = req.uid;
    const days = await Day.find({ 'user': { $in: userId } }).sort({ date: 1 });

    res.json({
        ok: true,
        days
    });
}

const getDaysInRange = async (req, res = response) => {
    const userId = req.uid;
    const start = req.params.start;
    const end = req.params.end;

    const days = await Day.find({
        'user': { $in: userId },
        'date': {
            $gte: start,
            $lte: end
        }
    }).sort({ date: 1 });

    res.json({
        ok: true,
        days
    });
}

const addDay = async (req, res = response) => {
    const day = new Day(req.body);

    try {
        day.user = req.uid;
        const daySaved = await day.save();

        res.json({
            ok: true,
            day: daySaved
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contact an admin'
        });
    }
}

const updateDay = async (req, res = response) => {
    const dayId = req.params.id;
    const uid = req.uid;

    try {
        const day = await Day.findById(dayId);
        if (!day) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no day with that id'
            });
        }
        if (day.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have the privilege to delete this'
            });
        }

        const newDay = {
            ...req.body,
            user: uid
        }

        const updatedDay = await Day.findByIdAndUpdate(dayId, newDay, { new: true });
        res.json({
            ok: true,
            evento: updatedDay
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact an admin'
        });
    }
}

const deleteDay = async (req, res = response) => {

    const dayId = req.params.id;
    const uid = req.uid;

    try {
        const day = await Day.findById(dayId);
        if (!day) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no day with that id'
            });
        }
        if (day.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have the privilege to delete this day'
            });
        }

        await Day.findByIdAndDelete(dayId);
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
    addDay,
    getDays,
    updateDay,
    deleteDay,
    getDaysInRange
}