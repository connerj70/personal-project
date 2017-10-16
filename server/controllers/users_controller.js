module.exports = {
    getUsers: function(req, res, next) {
        const db = req.app.get('db');
        db.get_users()
        .then( users => {
            res.status(200).send(users);
        })
    },

    updateUser: function(req, res, next) {
        const db = req.app.get('db');
        const {userId, country, venmoName} = req.body;

        db.update_user([country, venmoName, userId])
        .then( user => {
            res.status(200).send(user)
        })
    }
}