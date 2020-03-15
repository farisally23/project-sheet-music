let {users, audio} = require("./Database.js")
// async function feed(parent, args, context) {
//   const count = await context.prisma
//     .linksConnection({
//       where: {
//         OR: [
//           { description_contains: args.filter },
//           { url_contains: args.filter },
//         ],
//       },
//     })
//     .aggregate()
//     .count()
//   const links = await context.prisma.links({
//     where: {
//       OR: [
//         { description_contains: args.filter },
//         { url_contains: args.filter },
//       ],
//     },
//     skip: args.skip,
//     first: args.first,
//     orderBy: args.orderBy,
//   })
//   return {
//     count,
//     links,
//   }
// }

async function getUserFiles(parent, args, context) {
    const username = args.username;

    let userFiles = await audio.find({owner: username})

    return userFiles
}

async function getFriendsFiles(parent, args, context) {
  const username = args.username;

  const user = await users.find({username: username})
  if (!user) {
    return null
  }

  console.log(user)

  const usersFriends = await user[0].friends
  let allAudio = await audio.find({owner : {$in: usersFriends}}).limit(10)

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

// module.exports = {
//   feed,
// }
