module.exports = {
    getListings: function(req, res, next) {
        const db = req.app.get('db')
        db.getListings()
        .then( listings => {
            res.status(200).send(listings);
        })
    },

    // getListingImages: function(req, res, next) {
    //     const db = req.app.get('db')
    //     db.get_listing_images()
    //     .then( listingImages => {
    //         res.status(200).send(listingImages)
    //     })
    // },

    addListing: function(req, res, next) {
        let image1;
        let image2;
        let image3;
        const db = req.app.get('db');
        const {category, brand, price, description, size, name, condition, user_id, imageURL} = req.body;
        if(req.body.images.length >= 1) image1 = req.body.images[0].url;
        else image1 = null
        if(req.body.images.length >= 2) image2 = req.body.images[1].url;
        else image2 = null
        if(req.body.images.length >= 3) image3 = req.body.images[2].url;
        else image3 = null

        db.add_listing([category, brand, price, description, size, name, condition, user_id, imageURL])
        .then((response) => db.add_listing_image([response[0].listing_id, image1, image2, image3]))
    },

    getUserListings: function(req, res,  next) {
        const db = req.app.get('db');
       const { userid } = req.params;
        db.get_user_listings([userid])
        .then( listings => {
            res.status(200).send(listings);
        })
    },

    deleteListing: function(req, res, next) {
        const db = req.app.get('db');
        const { userId, listingId } = req.body;
        db.delete_listing([listingId, userId])
        .then( listings => {
            res.status(200).send(listings);
        })
    }
}