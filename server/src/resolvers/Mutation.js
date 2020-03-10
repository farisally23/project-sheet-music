const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')
const {createWriteStream} = require("fs")

let Datastore = require('nedb');
let users = new Datastore({ filename: 'db/users.db', autoload: true})
let audio = new Datastore({ filename: 'db/audio.db', autoload: true});


// This function taken from: https://www.youtube.com/watch?v=KQ_ty4A6Nsc
const storeUpload = ({stream, filename}) =>
  new Promise((resolve, reject) =>
    stream.pipe(createWriteStream("../uploads/" + filename))
    .on("finish", resolve)
    .on("error", reject)
    );


async function uploadAudio(parent, {file}) {
  const {stream, filename} = await file;
  await storeUpload({stream, filename});
  console.log("I got here");
  return true;
}



async function signup(parent, args, context) {
  const password = await bcrypt.hash(args.password, 10);
  const username = args.name;
  const email = args.email;

  users.findOne({_id: username}, function(err, user) {
    if (err) {
      throw new Error('Something went wrong...')
    }
    if (user) {
      return [
        {
          path: "username",
          message: "username " + username + " already taken"
        }
      ]
    }
    users.update({_id: username},{_id: username, hash: password, email: email}, {upsert: true}, function(err){
      if (err) {
        throw new Error('Something went wrong...')
      }
    //const token = jwt.sign({ userId: username }, APP_SECRET)
  
      return null
    })
  })


  
}

async function login(parent, args, context) {
  const user = await context.prisma.user({ email: args.email })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user,
  }
}


module.exports = {
  uploadAudio,
  signup,
  login,
}
