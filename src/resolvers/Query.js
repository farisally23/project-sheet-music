let {users, audio} = require("./Database.js")

async function getUserFiles(parent, args, context) {
    const username = args.username;

    let userFiles = await audio.find({owner: username}).sort({createdAt:-1})

    return userFiles
}

async function getFriendsFiles(parent, args, context) {
  const username = args.username;

  const user = await users.find({username: username})
  if (!user) {
    return null
  }

  const usersFriends = await user[0].friends
  let allAudio = await audio.find({owner : {$in: usersFriends}}).limit(20).sort({createdAt:-1})

  return allAudio
}

async function getUsersFriends(parent, args, context) {
  const username = args.username;
  let user = await users.find({username : username})
  if (!user) {
    return null
  }
  else {
    let usersFriends = user[0].friends
    let friends = await users.find({username: {$in: usersFriends}})
    return friends
  }
}

module.exports = {
    getUserFiles,
    getFriendsFiles,
    getUsersFriends
  }