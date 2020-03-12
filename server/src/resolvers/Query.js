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
    console.log("I executed")
    const username = args.username;

    let userFiles = await audio.find({owner: username})
    console.log(userFiles);

    return userFiles
}

module.exports = {
    getUserFiles,
  }

// module.exports = {
//   feed,
// }
