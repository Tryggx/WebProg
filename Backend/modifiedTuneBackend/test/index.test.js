//Importing the application to test
let server = require('../index');

//These are the actual modules we use
let chai = require('chai');
let should = chai.should();
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

let apiUrl = "http://localhost:3000";

describe('Endpoint tests', () => {
    //###########################
    //The beforeEach function makes sure that before each test, 
    //there are exactly two tunes and two genres.
    //###########################
    beforeEach((done) => {
        server.resetState();
        done();
    });

    //###########################
    //Write your tests below here
    //###########################

    // Do something weird
    it("GET /randomURL causes 405", function (done) {
        chai.request(apiUrl)
            .get('/randomURL')
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it("GET all tunes ", function (done) {
        chai.request(apiUrl)
            .get('/api/v1/tunes')
            .end((err,res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.be.equal(2)
                done();
            });
    });

    it("GET /genres/:genreId/tunes/:tuneId", function (done) {
        chai.request(apiUrl)
            .get('/api/v1/genres/1/tunes/0')
            .end((err,res) => {
                res.should.have.status(200);
                res.should.be.json
                //res.should.be.json;
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.should.have.property('genreId');
                res.body.should.have.property('content')
                res.body.name.should.equal('Für Elise');
                res.body.content.should.be.a('array')
                res.body.id.should.equal('0');
                res.body.genreId.should.equal('1');
                res.body.content.should.be.a('array')
                Object.keys(res.body).should.have.length(4) 
                done()
            });
    });

    it("PATCH /genres/:genreId/tunes/:tuneId", function (done) {
        chai.request(apiUrl)
            .patch('/api/v1/genres/1/tunes/0')
            .send({ "name": "Fürdur"})
            .end((err,res) => {
                res.should.have.status(200);
                res.should.be.json
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.should.have.property('genreId');
                res.body.should.have.property('content')
                res.body.id.should.equal('0');
                res.body.name.should.equal('Fürdur');
                res.body.genreId.should.equal('1');
                res.body.content.should.be.a('array')
                Object.keys(res.body).should.have.length(4) 
                //res.length.should.be.equal(3)
                //res.should.have.length(4);
                done();
            });
    });

    it("PATCH with wrong genreId", function (done) {
        chai.request(apiUrl)
            .patch('/api/v1/genres/6/tunes/0')
            .send({ "name": "Fürdur"})
            .end((err,res) => {
                res.should.have.status(400);
                res.should.be.json
                res.body.message.should.equal("Tune with id 0 does not have genre id 6.")
                done();
            });
    });

    it("PATCH with wrong content", function (done) {
        chai.request(apiUrl)
            .patch('/api/v1/genres/6/tunes/0')
            .send({ "password": "Fürdur"})
            .end((err,res) => {
                res.should.have.status(400);
                res.should.be.json
                res.body.message.should.equal("To update a tune, you need to provide a name, a non-empty content array, or a new genreId.")
                done();
            });
    });

    it("GET Tune with nonexistent id ", function (done) {
        chai.request(apiUrl)
            .get('/api/v1/genres/1/tunes/5')
            .end((err,res) => {
                res.should.have.status(404);
                res.should.be.json;
                res.body.message.should.be.equal('Tune with id 5 does not exist.')
                done();
            });
    });

    it("POST tune test", function (done) {
        chai.request(apiUrl)
            .post('/api/v1/genres/0/tunes')
            .send({  "name": "Fürdur"})
            .end((err,res) => {
                res.should.have.status(500);
                done();
            });
    });

    it("POST Genre test", function (done) {
        chai.request(apiUrl)
            .post('/api/v1/genres')
            .set('Authorization', 'HMAC f1a71952d1c9d661edf9fe8825ee711b6dc07408903de1e763a58baa0eda82fc')
            .send({"genreName": "Fürdur"})
            .end((err,res) => {
                res.should.have.status(201);
                done();
            });
    });
});