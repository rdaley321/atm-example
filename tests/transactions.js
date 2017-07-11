// deposit into an account
// the balance updates
// POST /api/accounts/:id/

const chai = require("chai");
const assert = chai.assert;
const supertest = require("supertest");
const app = require("../app")
const Account = require("../models/Account")

describe("depositing funds", function(){

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

  it("handles gracefully when you deposit a negative number", function(done){
    supertest(app)
    .post(`/api/accounts/${account._id}/deposit`)
    .auth(account.username, account.password)
    .send({amount: -50})
    .expect(422)
    .expect(function(res){
      assert.include(res.body.errorMessage, "Invalid Transation Entry")
    })
    .end(done)

  })


  it("handles gracefully when you withdraw a negative number", function(done){
    supertest(app)
    .post(`/api/accounts/${account._id}/withdraw`)
    .auth(account.username, account.password)
    .send({amount: -50})
    .expect(422)
    .expect(function(res){
      assert.include(res.body.errorMessage, "Invalid Transation Entry")
    })
    .end(done)
  })

  it("fees you for overdraft and does not give your money", function(done){
    supertest(app)
    .post(`/api/accounts/${account._id}/withdraw`)
    .auth(account.username, account.password)
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

  it("properly withdraws when posting to /api/accounts/:id/withdraws", function(done){
    supertest(app)
    .post(`/api/accounts/${account._id}/withdraw`)
    .auth(account.username, account.password)
    .send({
      amount: 2.50
    })
    .expect(200)
    .expect(function(res){
      assert.equal(res.body.account.balance, 2.50)
    })
    .end(done)
  })

  it("properly deposits when posting to /api/accounts/:id/deposit", function(done){
    jsonData = {
      amount: 100
    }
    supertest(app)
    .post(`/api/accounts/${account._id}/deposit`)
    .auth(account.username, account.password)
    .send(jsonData)
    .expect(200)
    .expect(function(res){
      assert.equal(res.body.account.balance, 105)
    })
    .end(done)
  })
})
