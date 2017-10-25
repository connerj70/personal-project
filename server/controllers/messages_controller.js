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
        const {userId, senderId, messageText} = req.body;
        console.log(senderId, userId, messageText)
        db.add_message([userId, senderId, messageText])
        .then( messages => {
            res.status(200).send(messages)
        })
    },

    deleteMessage: function(req, res, next) {
        const db = req.app.get('db');
        const {recieverId, messageId} = req.body;
        db.delete_message([messageId, recieverId])
        .then( messages => {
            res.status(200).send(messages)
        })
    }
}