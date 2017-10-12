module.exports = {
    getUsers: function(req, res, next) {
        const db = req.app.get('db');
        db.get_users()
        .then( users => {
            res.status(200).send(users);
        })
    }
}