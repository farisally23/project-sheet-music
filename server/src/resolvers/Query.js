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

async function getAllFiles(parent, args, context) {
  const username = args.username;
  let allAudio = await audio.find({owner : {$ne: username}}).limit(10)
  console.log(allAudio)

  return allAudio
}

module.exports = {
    getUserFiles,
    getAllFiles
  }

// module.exports = {
//   feed,
// }
