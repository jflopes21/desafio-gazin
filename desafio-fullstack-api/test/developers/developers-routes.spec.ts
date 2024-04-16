import request from "supertest";
import { expect } from "chai";
import { app } from "../../src/app";

describe("developers route check", function () {
  it("Should return 200 if there is data or 404 if no data is returned", function (done) {
    request(app)
      .get("/api/desenvolvedores")
      .expect(200)
      .end(function (error, response) {
        if (error) {
          request(app)
            .get("/api/desenvolvedores")
            .expect(404)
            .end(function (error, response) {
              if (error) return done(error);
              done();
            });
        } else {
          done();
        }
      });
  });

  it("Should return 201 if developer created or 400 if developer already exists", function (done) {
    const body = {
      nivelId: 48,
      nome: "João Francisco",
      sexo: "M",
      datanascimento: "2002-08-21",
      hobby: "Programação"
    };
    request(app)
      .post("/api/desenvolvedores")
      .send(body)
      .expect(201)
      .end(function (error, response) {
        if (error) {
          request(app)
            .post("/api/desenvolvedores")
            .send(body)
            .expect(400)
            .end(function (error, response) {
              if (error) return done(error);
              done();
            });
        } else {
          done();
        }
      });
  });

  it("Should update a developer or return 400 if developer doesn't exists", function (done) {
    let developerId: number = 48;

    const body = {
      nivel: "Update Test",
    };
    request(app)
      .put(`/api/desenvolvedores/${developerId}`)
      .send(body)
      .expect(200)
      .end(function (error, response) {
        if (error) {
          request(app)
            .put(`/api/desenvolvedores/${developerId}`)
            .send(body)
            .expect(400)
            .end(function (error, response) {
              if (error) return done(error);
              done();
            });
        } else {
          done();
        }
      });
  });

  it("Should delete a developer or return 400 if developer doesn't exists", function (done) {
    let developerId: number = 49;
    request(app)
      .delete(`/api/desenvolvedores/${developerId}`)
      .expect(204)
      .end(function (error, response) {
        if (error) {
          request(app)
            .delete(`/api/desenvolvedores/${developerId}`)
            .expect(400)
            .end(function (error, response) {
              if (error) return done(error);
              done();
            });
        } else {
          done();
        }
      });
  });
});
