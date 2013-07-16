var nforce = require('nforce');
var nowjs = require('now');
var sfuser = process.env.SFUSER;
var sfpass = process.env.SFPASS;

var oauth;
var org = nforce.createConnection({
  clientId: process.env.CLIENTID, //'3MVG9A2kN3Bn17hsUEcf_CJmziXEkX6NUrV0VeYFcCD8KChwrJKM20Okg9GCDiCK1C7ndI3kvhI0les2J0Bqe',
  clientSecret: process.env.SECRET, //'3543453312217366867',
  redirectUri: process.env.CALLBACK //'http://localhost:3000/',
});

org.authenticate({ username: sfuser, password: sfpass}, function(err, _oauth) {
  if(err) {
    console.error('unable to authenticate to sfdc');
	console.error('--> ' + JSON.stringify(err));
  } else {
	console.log(_oauth);
	oauth = _oauth;
  }

  var str = org.stream('ReducedPrices', oauth);
  str.on('connect', function(){
    console.log('connected to pushtopic');
  });

  str.on('error', function(error) {
    console.log('error: ' + error);
  });

  str.on('data', function(data) {
    console.log(data);
	console.log('sending message');
	everyone.now.receiveMessage(data);
  });
	

});

var express = require('express')
    , http = require('http')
    , path = require('path')
    , request = require('request');

var APP_RELATIVE_PATH = path.join(__dirname, '/');
console.log(APP_RELATIVE_PATH);

var app = express();

app.configure(function() {
    app.use(express.bodyParser()); // used to parse JSON objectType given in the request body
	app.set('port', process.env.PORT || 3000);
	//app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.static(APP_RELATIVE_PATH));

});



app.get('/:query', function (request, response) {
	console.log('query found');
   	org.query(request.params.query, oauth, function(err, resp) {
	     if(err) {
			console.error('--> ' + JSON.stringify(err));
		} else {
			console.log(resp);
			if(resp.records && resp.records.length) {				
	        	response.json(resp.records);
	        } 
		}
	 });
});
app.get('/:objectType/:id', function (request, response) {
    var rec = nforce.createSObject(request.params.objectType, {'Id':request.params.id});
	org.getRecord(rec, oauth, function(err, resp) {
	    if(err) {
	      console.error('--> unable to lead');
	      console.error('--> ' + JSON.stringify(err));
	    } else {
	      console.log('--> updated');
	      response.json(resp);
	    }
	  });
});

app.post('/InventorySubmit',function (request, response) {
	console.log('Sending Inventory Data');
	enveloped_body = {};
	if(request.body.length) {
		enveloped_body = {
			items: request.body
		}
	} else {
		enveloped_body = {
			items: [request.body]
		}
	}
	console.log(enveloped_body);
	org.apexRest({uri:'InventoryControl', method: 'POST', body: enveloped_body, urlParams: request.params}, oauth, function(err,resp){
	    if(!err) {
	      console.log(resp);
	      response.send(resp);
	    }else{
	      console.log(err);
	      response.send(err);
	    }	
	});
});
app.post('/:objectType', function (request, response) {
    var rec = nforce.createSObject(request.params.objectType, request.body);
	org.insert(rec, oauth, function(err, resp) {
	    if(err) {
	      console.error('--> unable to lead');
	      console.error('--> ' + JSON.stringify(err));
	    } else {
	      console.log('--> updated');
	      response.json(resp);
	    }
	  });
});  
 
app.put('/:objectType/:id', function (request, response) {
    var rec = nforce.createSObject(request.params.objectType, request.body);
	org.update(rec, oauth, function(err, resp) {
	    if(err) {
	      console.error('--> unable to lead');
	      console.error('--> ' + JSON.stringify(err));
	    } else {
	      console.log('--> updated');
	      response.json(resp);
	    }
	  });
});  
app.delete('/:objectType/:id', function (request, response) {
    var rec = nforce.createSObject(request.params.objectType, request.body);
	org.delete(rec, oauth, function(err, resp) {
	    if(err) {
	      console.error('--> unable to lead');
	      console.error('--> ' + JSON.stringify(err));
	    } else {
	      console.log('--> updated');
	      response.json(resp);
	    }
	  });
});

server = http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
var everyone = nowjs.initialize(server);