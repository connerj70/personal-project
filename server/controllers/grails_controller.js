module.exports = {
    addGrail: function(req, res, next) {
        const db = req.app.get('db');
        const {listingId, userId} = req.body;
        db.add_grail([listingId, userId])
        .then( response => {
            res.status(200).send(response);
        })
    },

    getGrails: function(req, res, next)  {
        const db = req.app.get('db');
        const userId = req.params.userid;
        db.get_grails([userId])
        .then( grails => {
            res.status(200).send(grails)
        })
    },

    removeGrail: function(req, res, next) {
        const db = req.app.get('db');
        const {listingId, userId} = req.body;
        db.remove_grail([listingId, userId])
        .then( grails => {
            res.status(200).send(grails)
        })
    }
}