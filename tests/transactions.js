// deposit into an account
// the balance updates
// POST /api/accounts/:id/

const chai = require("chai");
const assert = chai.assert;
const supertest = require("supertest");
const app = require("../app")
const Account = require("../models/Account")

describe("depositing funds", function(){
  it("updates balance when posting to /api/accounts/:id/deposit", function(done){

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

      /// Clean up the account we created
      Account.deleteOne({_id: account._id})
    })

  })
})
