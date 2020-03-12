let Datastore = require('nedb-promises');
let users = Datastore.create({ filename: 'db/users.db', autoload: true})
let audio = Datastore.create({ filename: 'db/audio.db', autoload: true});

module.exports = {
    users,
    audio
}