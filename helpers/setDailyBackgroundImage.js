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

const getURLBackgroundImage = () => {
    const url = `https://api.unsplash.com/photos/random?client_id=${process.env.BACKGROUND_IMAGE_KEY}&orientation=landscape&query=landscape`;
    let urlImage = null;

    try {
        fetch(url)
            .then(body => {
                if (body.status === 200)
                    urlImage = body.urls.raw;
            });
    } catch (err) {
        console.log(err);
        return null;
    }

    return urlImage;
}


module.exports = {
    setDailyBackgroundImage
}