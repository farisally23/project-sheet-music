const bcrypt = require('bcryptjs')
const { APP_SECRET, getUserId } = require('../utils')
const {createWriteStream} = require("fs")
const validator = require('validator');

let {users, audio} = require("./Database.js")


// This function taken from: https://www.youtube.com/watch?v=KQ_ty4A6Nsc
const storeUpload = ({stream, uniqueFileName}) =>
  new Promise((resolve, reject) =>
    stream.pipe(createWriteStream("./client/src/uploads/" + uniqueFileName))
    .on("finish", resolve)
    .on("error", reject)
    );


async function uploadAudio(parent, {name, title, file}) {
  const fileTitle = await title;
  const owner = await name;
  const uniqueFileName = await owner + fileTitle + ".mp3"
  const { stream, filename, mimetype } = await file;
  // Check if user already has a file with this name
  // This will currently throw an error and crash the server if user
  // tries to upload multiple files with the same name, the issue
  // seems to be with graphql-yoga according to some research, may
  // need to find a workaround, like replacing same file names
  let fileExists = await audio.findOne({title: fileTitle, owner: owner}) 
  if (fileExists) {
    return false;
  }

  else {
    // Store the file in the db
    await storeUpload({stream, uniqueFileName});
    await audio.insert({owner: owner, title: fileTitle, filename: uniqueFileName})
    return true;
  }

  
}

// Null return == Success

async function addFriend(parent, args, context) {
  const username = args.username;
  const friend = args.friend;


  // Check if user exists
  let user = await users.findOne({username: username})
  let usersFriends = user.friends

  // Check if friend exists
  let friendExists = await users.findOne({username: friend})
  if (!friendExists) {
    return [
      {
        path: "friend",
        message: "The user '" + friend + "' does not exist" 
      }
    ] 
  }
  else if (usersFriends.includes(friend)) {
    return [
      {
        path: "friend",
        message: "You and " + friend + " are already friends"
      }
    ] 
  }
  else {
    //add friend and update DB
    usersFriends.push(friend)
    await users.update({username: username}, {$set: { friends: usersFriends }})
  }
  return null;
}



async function signup(parent, args, context) {
  const password = await bcrypt.hash(args.password, 10);
  const username = args.username;
  const email = args.email;

  let user = await users.findOne({username: username})


  if (user) {
    return [
      {
        path: "username",
        message: "username " + username + " already taken"
      }
    ] 
  }

  else {
    await users.insert({username: username, hash: password, email: email, friends: []})
}

  return null
}

async function login(parent, args, context) {

  const user = await users.findOne({username: args.username})
  const valid = await bcrypt.compare(args.password, user.hash)

  if (!valid) {
    return [
      {
        path: "password",
        message: "incorrect password"
      }
    ] 
  }

  else {
    return null
  }
}


module.exports = {
  uploadAudio,
  signup,
  login,
  addFriend
}