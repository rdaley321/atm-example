// /api/accounts/:id/

const chai = require("chai");
const assert = chai.assert;
const supertest = require("supertest");
const app = require("../app")
const Account = require("../models/Account")

describe("Account Balance", function(){

  before(function(){

    const account = new Account()
    account.username = "dorton"
    account.password = "12345678"
    account.name = "Dorton"
    account.city = "Pearland"
    account.balance = 509324752893745
    account.save()


    // console.log("This gets run before everything")
  })
  after(function(){
    Account.deleteMany()
    // console.log("This gets run when all its are done")
  })

  it("can update name data", function(done){
    const account = new Account()
    account.username = "theusername"
    account.password = "12345678"
    account.name = "The Name"
    account.city = "Screwston"
    account.balance = 5
    account.save().then(function(account){

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

  })


  it("should return the current account balance", function(done){
    let dorton = false;
    Account.findOne({username: "dorton"})
    .then(function(newDortonAccount){
      dorton = newDortonAccount
      const account = new Account()
      account.username = "eviljwo"
      account.password = "12345678"
      account.name = "EvilWo"
      account.city = "land of sugar"
      account.balance = 5
      return account.save()
    })
    .then( function(account){

      supertest(app)
      .get(`/api/accounts/${dorton._id}`)
      .auth(account.username, account.password)
      .expect(401)
      .end(done)
    })
  })
})
