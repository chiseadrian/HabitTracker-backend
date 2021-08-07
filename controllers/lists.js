const { response } = require('express');
const List = require('../models/List');


const getLists = async (req, res = response) => {
    const userId = req.uid;
    const lists = await List.find({ 'user': { $in: userId } }).sort({ date: 1 });

    res.json({
        ok: true,
        lists
    });
}

const addList = async (req, res = response) => {
    const list = new List(req.body);

    try {
        list.user = req.uid;
        const listSaved = await list.save();

        res.json({
            ok: true,
            list: listSaved
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contact an admin'
        });
    }
}

const updateList = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const list = await List.findById(id);
        if (!list) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no list with that id'
            });
        }
        if (list.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have the privilege to delete this'
            });
        }

        const newList = {
            ...req.body,
            user: uid
        }
        const updatedList = await List.findByIdAndUpdate(id, newList, { new: true });
        res.json({
            ok: true,
            evento: updatedList
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact an admin'
        });
    }
}

const deleteList = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const list = await List.findById(id);
        if (!list) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no list with that id'
            });
        }
        if (list.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have the privilege to delete this'
            });
        }

        await List.findByIdAndDelete(id);
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
    addList,
    getLists,
    updateList,
    deleteList
}