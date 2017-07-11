// /api/accounts/

const chai = require("chai");
const assert = chai.assert;
const supertest = require("supertest");
const app = require("../app")
const Account = require("../models/Account")

describe("Account Registration", function(){

  before(function(){
    const account = new Account()
    account.username = "jwo"
    account.password = "12345678"
    account.name = "The Name"
    account.city = "Screwston"
    account.balance = 5
    account.save()
  })
  after(function(){
    Account.deleteMany()
    // console.log("This gets run when all its are done")
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
