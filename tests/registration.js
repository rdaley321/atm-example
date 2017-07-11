// /api/accounts/

const chai = require("chai");
const assert = chai.assert;
const supertest = require("supertest");
const app = require("../app")
const Account = require("../models/Account")

describe("Account Registration", function(){

  let account = false;
  afterEach(function(done){
    Account.deleteMany().then( function(){
      done()
    })
  })
  beforeEach(function(done){
    const a = new Account()
    a.username = "theusername"
    a.password = "12345678"
    a.name = "The Name"
    a.city = "Screwston"
    a.balance = 5
    a.save()
    .then( function(a){
      account = a;
      done();
    })
  })


  it("gives 422 with invalid data", function(done){
    registrationData = {
      username: "jwo",
    }
    supertest(app)
    .post("/api/accounts")
    .send(registrationData)
    .expect(422)
    .expect(function(res){
      assert(res.body.error)
    })
    .end(done)
  })

  it("can register with proper data", function(done){
    registrationData = {
      username: "jwo",
      password: "12345678",
      name: "JWo",
      city: "Sugar Land"
    }
    supertest(app)
    .post("/api/accounts")
    .send(registrationData)
    .expect(201)
    .expect(function(res){
      assert.equal(res.body.account.balance, 0)
      assert.equal(res.body.account.name, "JWo")
      assert.equal(res.body.account.username, "jwo")
      assert.equal(res.body.account.city, "Sugar Land")
    })
    .end(done)
  })
})
