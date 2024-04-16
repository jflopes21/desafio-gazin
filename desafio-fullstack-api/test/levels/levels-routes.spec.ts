import request from "supertest";
import { expect } from "chai";
import { app } from "../../src/app";

describe("levels route check", function () {
  it("Should return 200 if there is data or 404 if no data is returned", function (done) {
    request(app)
      .get("/api/niveis")
      .expect(200)
      .end(function (error, response) {
        if (error) {
          request(app)
            .get("/api/niveis")
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

  it("Should return 201 if level created or 400 if level already exists", function (done) {
    const body = {
      nivel: "Level Spec",
    };
    request(app)
      .post("/api/niveis")
      .send(body)
      .expect(201)
      .end(function (error, response) {
        if (error) {
          request(app)
            .post("/api/niveis")
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

  it("Should update a level or return 400 if level doesn't exists", function (done) {
    let levelId: number = 48;

    const body = {
      nivel: "Update Test",
    };
    request(app)
      .put(`/api/niveis/${levelId}`)
      .send(body)
      .expect(200)
      .end(function (error, response) {
        if (error) {
          request(app)
            .put(`/api/niveis/${levelId}`)
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

  it("Should delete a level or return 400 if level doesn't exists", function (done) {
    let levelId: number = 49;
    request(app)
      .delete(`/api/niveis/${levelId}`)
      .expect(204)
      .end(function (error, response) {
        if (error) {
          request(app)
            .delete("/api/niveis")
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
