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
    }
}