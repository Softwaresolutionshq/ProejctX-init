var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var app=express();
var neo4j = require('neo4j-driver').v1;

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

var driver = neo4j.driver("bolt://treeproject.cu.cc:7687", neo4j.auth.basic("neo4j", "neo4j"));
var session = driver.session();

function getAllNodes()
{
  session
  .run( "match (n) return n")
  .then( function( result ) {
    console.log( result.records[0].get("title") + " " + result.records[0].get("name") );
    session.close();
    driver.close();
    return result;
  });

}

