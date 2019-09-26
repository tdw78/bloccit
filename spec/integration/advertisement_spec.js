const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;


describe("routes : advertisements", () => {
  beforeEach((done) => {
    this.advertisement;
    sequelize.sync({force: true}).then((res) => {

      Advertisement.create({
        title: "Buy Our Stuff",
        description: "Our stuff is the best!"
      })
      .then((advertisement) => {
       this.advertisement = advertisement;
       done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });
  describe("GET /advertisements", () => {
  
    it("should return a status code of 200 and all advertisements", (done) => {
       request.get(base, (err, res, body) => {
         expect(res.statusCode).toBe(200);
         expect(err).toBeNull();
         expect(body).toContain("Advertisements");
         expect(body).toContain("Buy Our Stuff");
         done();
     });
   });
 });
 describe("GET /advertisements/new", () => {

   it("should render a new advertisement form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Advertisement");
        done();
      });
    });
  });
  describe("POST /advertisements/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "Summer Sale",
        description: "We're having our annual Summer Sale!"
      }
    };
    it("should creat a new advertisement", (done) => {
      request.post(options,

         (err, res, body) => {
            Advertisement.findOne({where: {title: "Summer Sale"}})
              .then((advertisement) => {
                 expect(res.statusCode).toBe(303);
                 expect(advertisement.title).toBe("Summer Sale");
                 expect(advertisement.description).toBe("We're having our annual Summer Sale!");
                 done();
               })
                .catch((err) => {
                  console.log(err);
                  done();
               });
          });
    });
  });
  describe("Get /advertisements/:id", () => {
      it("should render a view of the selected advertisement", (done) => {
         request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("Buy Our Stuff");
            done();
         });
      });
  });
  describe("POST /advertisements/:id/destroy", () => {
    it("should delete selected advertisement", (done) => {
      Advertisement.findAll()
      .then((advertisements) => {
        const advertisementCountBeforeDelete = advertisements.length;
        expect(advertisementCountBeforeDelete).toBe(1);

        request.post(`${base}${this.advertisement.id}/destroy`, (err, res, body) => {
          Advertisement.findAll()
          .then((advertisements) => {
            expect(err).toBeNull();
            expect(advertisements.length).toBe(advertisementCountBeforeDelete - 1);
            done();
          })
        });
      });
    });
  });
  describe("GET /advertisements/:id/edit", () => {
    it("should render the edit advertisement form", (done) => {
      request.get(`${base}${this.advertisement.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Advertisement");
        expect(body).toContain("Buy Our Stuff");
        done();
      });
    });
  });
  describe("POST /advertisements/:id/update", () => {
     it("should render the updated advertisement", (done) => {
      const options = {
        url: `${base}${this.advertisement.id}/update`,
        form: {
          title: "We have the best stuff",
          description: "We have the best prices"
        }
      };
      request.post(options,
        (err, res, body) => {

        expect(err).toBeNull();
        Advertisement.findOne({
          where: { id: this.advertisement.id }
        })
        .then((advertisement) => {
          expect(advertisement.title).toBe("We have the best stuff");
          done();
        });
      });
     });
  });
});









