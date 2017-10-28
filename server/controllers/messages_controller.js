module.exports = {
    getSentMessages: function(req, res, next) {
        const db = req.app.get('db')
        const userId = req.params.userid;
        db.get_sent_messages([userId])
        .then( messages => {
            res.status(200).send(messages)
        });
    },

    getRecievedMessages: function(req, res, next) {
        const db = req.app.get('db')
        const userId = req.params.userid;
        db.get_recieved_messages([userId])
        .then( messages => {
            res.status(200).send(messages)
        })
    },

    postMessage: function(req, res, next) {
        const db = req.app.get('db');
        const {userId, senderId, messageText, listingId} = req.body;
        db.add_message([userId, senderId, messageText, listingId])
        .then( messages => {
            res.status(200).send(messages)
        })
    },

    getMessageListings: function(req, res, next) {
        const db = req.app.get('db');
        db.get_message_listings()
        .then( listingImages => {
            res.status(200).send(listingImages)
        })
    }
}