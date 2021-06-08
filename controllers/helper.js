const { response } = require('express');
const Helper = require('../models/Helper');


const getHelpers = async (req, res = response) => {
    const [helpers] = await Helper.find();

    res.json({
        ok: true,
        image: helpers.image
    });
}

// const addHelper = async (req, res = response) => {
//     const helper = new Helper(req.body);

//     try {
//         const helperSaved = await helper.save();
//         res.json({
//             ok: true,
//             helper: helperSaved
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             ok: false,
//             msg: 'Contact an admin'
//         });
//     }
// }

// const updateHelper = async (req, res = response) => {
//     const helperId = req.params.id;

//     try {
//         const helper = await Helper.findById(helperId);
//         if (!helper) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: 'There is no helper with that id'
//             });
//         }

//         const newHelper = {
//             ...req.body
//         }
//         const updatedHelper = await Helper.findByIdAndUpdate(helperId, newHelper, { new: true });
//         res.json({
//             ok: true,
//             evento: updatedHelper
//         });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             ok: false,
//             msg: 'Contact an admin'
//         });
//     }
// }

// const deleteHelper = async (req, res = response) => {
//     const helperId = req.params.id;

//     try {
//         const helper = await Helper.findById(helperId);
//         if (!helper) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: 'There is no helper with that id'
//             });
//         }

//         await Helper.findByIdAndDelete(helperId);
//         res.json({ ok: true });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             ok: false,
//             msg: 'Contact an admin'
//         });
//     }
// }

module.exports = {
    getHelpers,
    // addHelper,
    // updateHelper,
    // deleteHelper
}