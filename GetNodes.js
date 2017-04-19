var express = require('express');
var request = require('request');
var app = express();

var host = 'treeproject.cu.cc',
    port = 7474;
    
var httpUrlForTransaction = 'http://' + host + ':' + port + '/db/data/transaction/commit';


app.get('/data', function (req, res) {
	var query="MATCH (n) RETURN n";
 
	var promise = doDatabaseOperation(query);
	promise.then(function (data) 
	{
		res.send(data)
		    	console.log('Response1 : '+res);
	})
 
});


var doDatabaseOperation = function (query, params) {
	return new Promise(function (resolve, reject) {
		request.post({
			uri:httpUrlForTransaction,
			headers:{
			},
			json:{
				statements:[
					{
						statement:query,
						parameters:params
					}
				]
			}
		},
	    function(err,res){
	    	if(err)
	    		reject(err)
	    	else
	    	{
		    	resolve(res.body)
		    	console.log('Response : '+res.body);
	    	}
	    })
	});	
}