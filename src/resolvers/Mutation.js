const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')
const {createWriteStream} = require("fs")

let {users, audio} = require("./Database.js")


// This function taken from: https://www.youtube.com/watch?v=KQ_ty4A6Nsc
const storeUpload = ({stream, uniqueFileName}) =>
  new Promise((resolve, reject) =>
    stream.pipe(createWriteStream("./client/src/uploads/" + uniqueFileName))
    .on("finish", resolve)
    .on("error", reject)
    );


async function uploadAudio(parent, {name, title, file}) {
  console.log(file);
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
    console.log("ay bruh im storing")
    // Store the file in the db
    await storeUpload({stream, uniqueFileName});
    await audio.insert({owner: owner, title: fileTitle, filename: uniqueFileName})
    return true;
  }

  
}

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

// async function signup(parent, args, context) {
//   const password = await bcrypt.hash(args.password, 10);
//   const username = args.name;
//   const email = args.email;

//   users.findOne({_id: username}, function(err, user) {
//     if (err) {
//       throw new Error('Something went wrong...')
//     }
//     if (user) {
//       console.log("I found an error")
//       return [
//         {
//           path: "username",
//           message: "username " + username + " already taken"
//         }
//       ]
//     }
//     users.update({_id: username},{_id: username, hash: password, email: email}, {upsert: true}, function(err){
//       if (err) {
//         throw new Error('Something went wrong...')
//       }
//     //const token = jwt.sign({ userId: username }, APP_SECRET)
  
//       return null
//     })
//   })  
// }

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
    // Authenticate user
    //await users.insert({_id: username, hash: password, email: email})
    return null
  }
}

//   return null
//   const user = await context.prisma.user({ email: args.email })
//   if (!user) {
//     throw new Error('No such user found')
//   }

//   const valid = await bcrypt.compare(args.password, user.password)
//   if (!valid) {
//     throw new Error('Invalid password')
//   }

//   return {
//     token: jwt.sign({ userId: user.id }, APP_SECRET),
//     user,
//   }
// }


module.exports = {
  uploadAudio,
  signup,
  login,
  addFriend
}