// const Authorizer = require("../policies/topic");

// module.exports = {

//   getAllTopics(callback){
//     return Topic.findAll()

//     .then((topics) => {
//       callback(null, topics);
//     })
//     .catch((err) => {
//       callback(err);
//     })
//   },
//   addTopic(newTopic, callback){
//     return Topic.create({
//       title: newTopic.title,
//       description: newTopic.description
//     })
//     .then((topic) => {
//       callback(null, topic);
//     })
//     .catch((err) => {
//       callback(err);
//     })
//   },
//   getTopic(id, callback){
//     return Topic.findByPk(id, {

//      include: [{
//        model: Post,
//        as: "posts"
//      }]
//    })
//     .then((topic) => {
//       callback(null, topic);
//     })
//     .catch((err) => {
//       callback(err);
//     })
//   },
//   deleteTopic(req, callback){

//         return Topic.findByPk(req.params.id)
//         .then((topic) => {
//           const authorized = new Authorizer(req.user, topic).destroy();
   
//           if(authorized) {
//             topic.destroy()
//             .then((res) => {
//               callback(null, topic);
//             });
//           } else {
   
//             req.flash("notice", "You are not authorized to do that.")
//             callback(401);
//           }
//         })
//         .catch((err) => {
//           callback(err);
//         });
//       },
//       updateTopic(req, updatedTopic, callback){

//         // #1
//              return Topic.findByPk(req.params.id)
//              .then((topic) => {
        
//         // #2
//                if(!topic){
//                  return callback("Topic not found");
//                }
        
//         // #3
//                const authorized = new Authorizer(req.user, topic).update();
        
//                if(authorized) {
        
//         // #4
//                  topic.update(updatedTopic, {
//                    fields: Object.keys(updatedTopic)
//                  })
//                  .then(() => {
//                    callback(null, topic);
//                  })
//                  .catch((err) => {
//                    callback(err);
//                  });
//                } else {
        
//         // #5
//                  req.flash("notice", "You are not authorized to do that.");
//                  callback("Forbidden");
//                }
//              });
//            }
// }