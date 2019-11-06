const Comment = require("./models").Comment;
const Post = require("./models").Post;
const User = require("./models").User;
const Vote = require("./models").Vote;
const Authorizer = require("../policies/vote");

module.exports = {
  createVote(req, val, callback){

    return Vote.findOne({
      where: {
        postId: req.params.postId,
        userId: req.user.id
      }
    })
    .then((vote) => {

      if(vote){
        vote.value = val;
        vote.save()
        .then((vote) => {
          callback(null, vote);
        })
        .catch((err) => {
          callback(err);
        });
      } else {
        //const authorized = new Authorizer(req.user).create();
       
       //if(authorized){
         Vote.create({
           value: val,
           postId: req.params.postId,
           userId: req.user.id
         }).then((vote) => {
           callback(null, vote);
         })
         .catch((err) => {
           callback(err);
         }); 
    }
    });
  }
}