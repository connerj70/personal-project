module.exports = {
    getMessages: function(req, res, next) {
        const db = req.app.get('db')
        const userId = req.params.userid;
        db.get_messages([userId])
        .then( messages => {
            res.status(200).send(messages)
        });
    }
}