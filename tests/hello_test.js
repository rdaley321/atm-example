// Make a request to /api/status

const chai = require("chai");
const assert = chai.assert;
const supertest = require("supertest");
const app = require("../app")

describe("/api/status", function(){
  it("returns OK when online", function(done){
    supertest(app)
      .get("/api/status")
      .expect(200)
      .expect("content-type", /json/)
      .expect(function(res){
        // {
        //   status: "ok"
        // }
        assert.equal(res.body.status, "ok")
      })
      .end(done)
  })
})
