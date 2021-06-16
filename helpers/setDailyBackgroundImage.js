const fetch = require('node-fetch');
const Helper = require('../models/Helper');


const setDailyBackgroundImage = async () => {
    const urlImage = await getURLBackgroundImage();

    try {
        if (urlImage !== null) {
            const helpers = await Helper.find();
            const newHelper = {
                image: urlImage
            }

            if (helpers.length === 0) { //si no hay ninguno se crea
                const helper = new Helper(newHelper);
                await helper.save();
            } else {                    //si existe se actualiza
                const helperId = helpers[0].id;
                await Helper.findByIdAndUpdate(helperId, newHelper, { new: true });
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const getURLBackgroundImage = async () => {
    const url = `${process.env.BACKGROUND_HOST}/photos/random?client_id=${process.env.BACKGROUND_IMAGE_KEY}&orientation=landscape&query=landscape`;

    try {
        const resp = await fetch(url);
        const body = await resp.json();
        return body.urls.raw;
    } catch (err) {
        console.log(err);
        return null;
    }
}



module.exports = {
    setDailyBackgroundImage
}