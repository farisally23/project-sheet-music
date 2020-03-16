let Datastore = require('nedb-promises');
let users = Datastore.create({ filename: 'db/users.db', autoload: true, timestampData: true})
let audio = Datastore.create({ filename: 'db/audio.db', autoload: true, timestampData: true});

module.exports = {
    users,
    audio
}