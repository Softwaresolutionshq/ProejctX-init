var express = require('express');
var bodyParser = require('body-parser');
var app     = express();

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 

//app.use(express.bodyParser());

var request = require("request");
var host = 'treeproject.cu.cc',
    port = 7474;

var httpUrlForTransaction = 'http://' + host + ':' + port + '/db/data/transaction/commit';

function runCypherQuery(query, params, callback) {
  
  console.log('Query :'+query);
  console.log('Params :'+params);
  
 request.post({
     uri: httpUrlForTransaction,
     json: {statements: [{statement: query, parameters: params}]}
   },
   function (err, res, body) {
     callback(err, body);
   })
}

// post data reciever
app.post('/', function(req, res) 
{
  var name = req.body.nameField;
  var age = req.body.ageField;
  var gender = req.body.genderField;
    
    res.send('You sent the name as "' + name + '"and he/she is "' + age + '" years old.');
    
runCypherQuery(
 
 'CREATE (somebody:Person { name: {name}, age: {age}, gender: {gender} }) RETURN somebody', 
 
 {
   name: name,
   age: age,
   gender: gender
 }, 
 
 
 function (err, resp) {
   if (err) {
     console.log(err);
   } else {
     console.log(resp);
   }
 }
 
 
);    

});



app.listen(8081, function() {
  console.log('Server running at http://127.0.0.1:8081/');
});


