const flairQueries = require("../db/queries.flairs.js");
const postQueries = require("../db/queries.posts.js");

module.exports = {

  new(req, res, next){
    res.render("flairs/new", {
      topicId: req.params.topicId,
      postId:  req.params.postId
    });
  },
  create(req, res, next){
    let newFlair = {
      name: req.body.name,
      color: req.body.color,
      topicId: req.params.topicId,
      postId: req.params.postId
    };
    flairQueries.addFlair(newFlair, (error, flair) => {
      if(error){
        res.redirect(500, "/flairs/new");
      } else {
        res.redirect(303, `/topics/${newFlair.topicId}/posts/${newFlair.postId}/flairs/${flair.id}`); 
      }
    });
  }

}