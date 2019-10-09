const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic methods", () => {
  beforeEach((done) => {
    this.topic;
    this.post;

    sequelize.sync({ force: true }).then((res) => {
        Topic.create({
            title: "Best movie of all time",
            description: "In your opinion, what is the best movie of all time?",
            posts: [
              {
                title: "Pulp Fiction",
                body: "Pulp Fiction is the best movie of all time!",
              }
            ]
          },
          {
            include: {
              model: Post,
              as: "posts"
            }
          })
          .then((topic) => {
          this.topic = topic;
          this.post = topic.posts[0];
          done();
        });
    });
  });

  describe("#create()", () => {
    it("should create a new topic", (done) => {
      Topic.create({
        title: "My Topic",
        description: "What I want to discuss"
      })
        .then((topic) => {
          expect(topic.title).toBe("My Topic");
          expect(topic.description).toBe("What I want to discuss");
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
    });
  });

  describe("#getPosts()", () => {
    it("should return an array of posts associated to the topic", (done) => {
      this.topic.getPosts()
      .then((associatedPosts) => {
        expect(associatedPosts[0].title).toBe("Pulp Fiction");
        done();
      });
    });
  });
});
