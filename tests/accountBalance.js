// /api/accounts/:id/

const chai = require("chai");
const assert = chai.assert;
const supertest = require("supertest");
const app = require("../app")
const Account = require("../models/Account")

describe("Account Balance", function(){
  let account = false;
  let dorton = false;

  afterEach(function(done){
    Account.deleteMany().then( function(){
      done()
    })
  })
  beforeEach(function(done){

    const d = new Account()
    d.username = "dorton"
    d.password = "12345678"
    d.name = "Dorton"
    d.city = "Pearland"
    d.balance = 509324752893745
    d.save()
    .then( function(d){
      dorton = d
    })
    .then( function(){
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
  })

  it("can update name data", function(done){

    supertest(app)
    .patch(`/api/accounts/${account._id}`)
    .auth(account.username, account.password)
    .send({name: "JWO NEW NAME"})
    .expect(200)
    .expect( function(res){
      assert.equal(res.body.account.name, "JWO NEW NAME")
    })
    .end(done)
  })

  it("should return the current account balance", function(done){
    supertest(app)
    .get(`/api/accounts/${dorton._id}`)
    .auth(account.username, account.password)
    .expect(401)
    .end(done)
  })
})
