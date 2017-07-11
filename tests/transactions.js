// deposit into an account
// the balance updates
// POST /api/accounts/:id/

const chai = require("chai");
const assert = chai.assert;
const supertest = require("supertest");
const app = require("../app")
const Account = require("../models/Account")

describe("depositing funds", function(){

  before(function(){
    // console.log("This gets run before everything")
  })
  after(function(){
    Account.remove()
    // console.log("This gets run when all its are done")
  })

  it("fees you for overdraft and does not give your money", function(done){
    account = new Account()
    account.balance = 5
    account.save()
    .then( function(account){
      supertest(app)
      .post(`/api/accounts/${account._id}/withdraw`)
      .send({amount: 100})
      .expect(200)
      .expect(function(res){
        // {
        //   errorMessage: "Funds Unavailable, lamezo!",
        //   account: {
        //     _id: sdfasdf,
        //     balance: -130
        //   }
        // }
        assert.equal(res.body.account.balance, -130)
        assert.include(res.body.errorMessage, "Overdraft charged")
      })
      .end(done)
    })
  })

  it("properly withdraws when posting to /api/accounts/:id/withdraws", function(done){
    account = new Account()
    account.balance = 5
    account.save()
    .then( function(account){
      supertest(app)
      .post(`/api/accounts/${account._id}/withdraw`)
      .send({
        amount: 2.50
      })
      .expect(200)
      .expect(function(res){
        assert.equal(res.body.account.balance, 2.50)
      })
      .end(done)
    })
  })

  it("properly deposits when posting to /api/accounts/:id/deposit", function(done){

    account = new Account()
    account.balance = 5
    account.save()
    .then( function(account){

      jsonData = {
        amount: 100
      }
      supertest(app)
      .post(`/api/accounts/${account._id}/deposit`)
      .send(jsonData)
      .expect(200)
      .expect(function(res){
        assert.equal(res.body.account.balance, 105)
      })
      .end(done)
    })

  })
})
