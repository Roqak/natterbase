let chai = require('chai');
let mocha = require('mocha');
let chaiHttp = require('chai-http');
let app = require('./index');


let token = "Bearer ";


chai.use(chaiHttp);

/*
* Test the /POST route
*/
describe('/POST login', () => {
    it('it should Authenticate user', (done) => {
        let user = {
            username: "admin",
            password: "admin"
        };
        chai.request(app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object'); 
                token += res.body.payload.token;
                done();
            });
    });
});

/*
* Test the /GET route
*/
 describe('/GET countries', () => {
    it('it should get all the countries', (done) => {
        chai.request(app)
            .get('/countries')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});


/*
* Test the /PUT route
*/
describe('/PUT countries', () => {
    it('it should update existing country array', (done) => {
        let body = {
            countries: "Nigeria"
        }
        chai.request(app)
            .put('/countries')
            .send(body)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
} );

/*
* Test the /DELETE route
*/
describe('/DELETE countries', () => {
    it('it should find a matching country and delete from the array', (done) => {
        let countries = {
            name: "Nigeria"
        };
        chai.request(app)
        .delete(`/countries/${countries.name}`)
        .set('x-access-token', token)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});
