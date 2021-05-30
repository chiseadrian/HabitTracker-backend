const { response } = require('express');
const Note = require('../models/Note');



const getNotes = async( req, res = response ) => {
    const userId = req.uid;  
    const notes = await Note.find({ 'user': { $in: userId } }).sort({date: 1});

    res.json({
        ok: true,
        notes
    });
}

const addNote = async ( req, res = response ) => {
    const note = new Note( req.body );

    try {
        note.user = req.uid;
        const noteSaved = await note.save();

        res.json({
            ok: true,
            note: noteSaved
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contact an admin'
        });
    }
}

const updateNote = async( req, res = response ) => {
    const noteId = req.params.id;
    const uid = req.uid;
   
    try {
        const note = await Note.findById( noteId );
        if ( !note ) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no note with that id'
            });
        }
        if ( note.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have the privilege to delete this note'
            });
        }

        const newNote = {
            ...req.body,
            user: uid
        }
        const updatedNote = await Note.findByIdAndUpdate( noteId, newNote, { new: true } );
        res.json({
            ok: true,
            evento: updatedNote
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact an admin'
        });
    }
}

const deleteNote = async( req, res = response ) => {

    const noteId = req.params.id;
    const uid = req.uid;

    try {
        const note = await Note.findById( noteId );
        if ( !note ) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no note with that id'
            });
        }
        if ( note.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have the privilege to delete this note'
            });
        }

        await Note.findByIdAndDelete( noteId );
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
    addNote,
    getNotes,
    updateNote,
    deleteNote
}