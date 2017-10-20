module.exports = {
    getListings: function(req, res, next) {
        const db = req.app.get('db')
        db.getListings()
        .then( listings => {
            res.status(200).send(listings);
        })
    },

    getListingImages: function(req, res, next) {
        const db = req.app.get('db')
        db.get_listing_images()
        .then( listingImages => {
            res.status(200).send(listingImages)
        })
    },

    addListing: function(req, res, next) {
        console.log(req.body);
        const db = req.app.get('db');
        const {category, brand, price, description, size, name, condition, user_id, imageURL} = req.body;
        db.add_listing([category, brand, price, description, size, name, condition, user_id, imageURL])
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