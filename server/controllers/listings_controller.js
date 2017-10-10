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
    }

}