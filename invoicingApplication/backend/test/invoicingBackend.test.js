//Importing the application to test
let server = require('../invoicingBackend');

//These are the actual modules we use
let chai = require('chai');
let should = chai.should();
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

let apiUrl = "http://localhost:3000";

describe('Invoice endpoint tests', () => {
    beforeEach((done) => {
        server.resetServerState();
        done();
    });
    
    it("Get /api/vEx1/invoices success", function (done) {
        chai.request(apiUrl)
            .get('/api/vEx1/invoices')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    
    //check success for invoice get request
    it("Get /api/vEx1/invoices/:invoiceId", function (done) {
        chai.request(apiUrl)
            .get('/api/vEx1/invoices/2')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('invoice_number');
                res.body.should.have.property('invoiced_by');
                res.body.should.have.property('invoiced_to');
                res.body.should.have.property('amount');
                res.body.should.have.property('paid_status');
                res.body.id.should.equal(2);
                res.body.invoice_number.should.equal("#2021-05-0123");
                res.body.invoiced_by.should.equal("Grischa Liebel");
                res.body.invoiced_to.should.equal("City of Reykjavik");
                res.body.amount.should.equal(15000);
                res.body.paid_status.should.equal("False");
                done();
            });
    })
            });
});