/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        if (!res.body[0]){
          done();
        }
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai
            .request(server)
            .post("/api/books")
            .send({title: "test"})
            .end(function (err,res){
              assert.equal(res.status, 200);
              assert.equal(res.body.title,"test");
              done();
            });
      });
      
      test('Test POST /api/books with no title given', function(done) {
         chai
            .request(server)
            .post("/api/books")
            .send({})
            .end(function (err,res){
              assert.equal(res.status, 200);
              assert.equal(res.text,"missing required field title");
              done();
      });
    });
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
       chai
            .request(server)
            .get("/api/books")
            .end(function (err,res){
              assert.equal(res.status, 200);
              assert.isArray(res.body,"it is an array");
              done();
      });         
    });
    });

    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai
            .request(server)
            .get("/api/books/614e800fab127f00bb8bd97500")
            .end(function (err,res){
              assert.equal(res.status, 200);
              assert.equal(res.text,"no book exists");
              done();
      });
      });

      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai
            .request(server)
            .get("/api/books/617ccc2475fb1c0270585cdd")
            .end(function (err,res){
              assert.equal(res.status, 200);
              assert.equal(res.body.title,"ENGINEER");
              done();
      });
    });
    });

    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
       chai
            .request(server)
            .post("/api/books/617ccc2475fb1c0270585cdd")
            .send({comment: "mechanical"})
            .end(function (err,res){
              assert.equal(res.status, 200);
              assert.equal(res.body.comments[0],"mechanical");
              done();
      });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
         chai
            .request(server)
            .post("/api/books/617ccc6b75fb1c0270585ce3")
            .send({})
            .end(function (err,res){
              assert.equal(res.status, 200);
              assert.equal(res.text,"missing required field comment");
              done();
      });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
       chai
            .request(server)
            .post("/api/books/engine")
            .send({comment: "mechanical"})
            .end(function (err,res){
              assert.equal(res.status, 200);
              assert.equal(res.text,"no book exists");
              done();
      });
    });
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
         chai
            .request(server)
            .delete("/api/books/617ccc8775fb1c0270585ce6")
            .end(function (err,res){
              assert.equal(res.status, 200);
              assert.equal(res.text,"delete successful");
              done();
      });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai
            .request(server)
            .delete("/api/books/614e800fab127f00bb8bd97500")
            .end(function (err,res){
              assert.equal(res.status, 200);
              assert.equal(res.text,"no book exists");
              done();
      });
    });
    });
});
});