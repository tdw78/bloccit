const voteQueries = require("../db/queries.votes.js");
const Authorizer = require("../policies/vote");

module.exports = {

  upvote(req, res, next){
    //const authorized = new Authorizer(req.user).create();
 
    //if(authorized){
      voteQueries.createVote(req, 1, (err, vote) => {
        if(err){
          req.flash("error", err);
        }
        res.redirect(req.headers.referer);
      });

    // } else {
    //   req.flash("notice", "You must be signed in to do that.")
    //   res.redirect(req.headers.referer);
    // }
  },
  downvote(req, res, next){

    if(req.user){
      voteQueries.createVote(req, -1, (err, vote) => {
        if(err){
          req.flash("error", err);
        }
        res.redirect(req.headers.referer);
      });
    } else {
      req.flash("notice", "You must be signed in to do that.")
      res.redirect(req.headers.referer);
    }
  }
}