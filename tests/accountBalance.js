// /api/accounts/:id/

const chai = require("chai");
const assert = chai.assert;
const supertest = require("supertest");
const app = require("../app")
const Account = require("../models/Account")

describe("Account Balance", function(){

  before(function(){
    // console.log("This gets run before everything")
  })
  after(function(){
    Account.remove()
    // console.log("This gets run when all its are done")
  })


  it("should return the current account balance", function(done){

    account = new Account()
    account.balance = 5
    account.save()
    .then( function(account){

      supertest(app)
      .get(`/api/accounts/${account._id}`)
      .expect(200)
      .expect("content-type", /json/)
      .expect(function(res){
        // {
        //   account: {
        //     _id: 453452345234532
        //     balance: 5
        //   }
        // }

        assert.equal(res.body.account._id, account._id)
        assert.equal(res.body.account.balance, 5)
      })
      .end(done)
    })
  })
})
