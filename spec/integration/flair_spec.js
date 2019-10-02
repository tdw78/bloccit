// const request = require("request");
// const server = require("../../src/server");
// const base = "http://localhost:3000/flairs";

// const sequelize = require("../../src/db/models/index").sequelize;
// const Topic = require("../../src/db/models").Topic;
// const Post = require("../../src/db/models").Post;
// const Flair = require("../../src/db/models").Flair;

// describe("routes: flairs", () => {
//   beforeEach((done) => {
//     this.topic;
//     this.post;
//     this.flair;

//     sequelize.sync({force: true}).then((res) => {

//         Topic.create({
//            title: "Favorite Sport",
//            description: "What is your favorite sport?"
//          })
//           .then((topic) => {
//             this.topic = topic;
      
//         Post.create({
//            title: "Soccer",
//            body: "I love soccer!",
//            topicId: this.topic.id
//          })
//           .then((post) => {
//            this.post = post;
           
//          Flair.create({
//            name: "Loved It!",
//            color: "blue",
//            topicId: this.topic.topicId,
//            postId: this.post.postId
//           })
//           .then((flair) => {
//             this.flair = flair;
//             done();
//           })
//           .catch((err) => {
//             console.log(err);
//             done();
//           });  
//         });        
//       });
//     });
//   });
//   describe("GET /posts/:postId/flairs/new", () => {
//     it("should render a new flair form", (done) => {
//       request.get(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/new`, (err, res, body) => {
//         expect(err).toBeNull();
//         expect(body).toContain("New Flair");
//         done();
//       });
//     });
//   });
//   describe("POST /posts/:postId/flairs/create", () => {

//     it("should create a new flair and redirect", (done) => {
//       const options = {
//         url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/create`,
//         form: {
//           name: "I really liked this post",
//           color: "orange"
//         }
//       };
//       request.flair(options,
//         (err, res, body) => {

//           Flair.findOne({where: {name: "I really liked this post"}})
//             .then((flair) => {
//               expect(flair).not.toBeNull();
//               expect(flair.name).toBe("I really liked this post");
//               expect(flair.color).toBe("orange");
//               expect(flair.postId).not.toBeNull();
//               done();
//             })
//             .catch((err) => {
//               console.log(err);
//               done();
//             });
//         });
//     });
//   });
// });