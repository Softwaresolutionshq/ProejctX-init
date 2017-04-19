var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var path = require('path');



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


    var neo4j = require('neo4j-driver').v1;
    var driver = neo4j.driver("bolt://treeproject.cu.cc:7687", neo4j.auth.basic("neo4j", "neo4j"));
    var session = driver.session();

function getAllNodes()
{
    console.log('Executiong JS');
    var theUrl = 'https://treeneo-munnac9.c9users.io:8081';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            console.log('espons : '+xmlHttp.responseText);
        }
            // callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

app.get('/',function(req,res) {

// console.log('Path : ',path.join(__dirname + '/AddUser.html'));
    //res.sendFile(path.join(__dirname + '/AddUser.html'));

    console.log('First then called');
      
     session
     
     .run( "MATCH (a:Person) RETURN a.name AS name, a.age AS age")
     .then( function( result ) 
     {
    //  console.log('Result : ',result);
    
    var len = result.records.length
    
    console.log('length : ',result.records.length);
            for(var count = 0; count < len; count++)
            {
                console.log(result.records[count].get("name") );
            }
        session.close();
        driver.close();
        });
});


app.listen(8082, function() {
  console.log('Server running at http://127.0.0.1:8081/');
    
});

var http = require('http');
var fs = require('fs');

const PORT=8081; 

fs.readFile('./AddUser.html', function (err, html) {

    if (err) throw err;    

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);
});

