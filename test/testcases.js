let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let server = require('../app');

//test case for api
describe('TransactionDetails', () => {
 describe('/GET TransactionDetails', () => {
     it('it should get transaction details', (done) => {
     chai.request(server)
         .get('/eth/api/v1/transaction/0xbeae83e379e9a4c986cfc453fe90e1fa2ca50eaa692ad99abe2aee2214208132')
         .end((err, res) => {
               (res).should.have.status(200);
               (res.body).should.be.a('object');
               done();
            });
         });
     });
});