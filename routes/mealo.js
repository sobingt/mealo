var http = require('http')
    , put = require('../routes/put.js')
    ,crypto = require('crypto')
    ,request = require('request');

exports.index = function(req, res){
  res.render('mealo', { title: 'Express' });
};

exports.mealo = function(req,res1) {
            res1.render('singlemealo', {restdata1:res1.response1,restdata2:res1.response2,url : req.url});


};

exports.bookingmealo = function(req, res) {
    console.log("the  problem");
    request.post('https://test.payu.in/_payment',
    { 
        form: {
            key:'C0Dr8m',
            txnid:100000011111,
            amount:1000,
            productinfo:'dsadasdsad',
            firstname:'Sobin',
            email:'sobingt@gmail.com',
            phone:9969569927,
            surl:'http://localhost:3000/user/103#',
            furl:'http://localhost:3000/user/103#',
            hash:'38220cf82847b710c4e454e5ba5e73dd78e5207ee90807fc6413205b9b9f454aa0c3b682574b62ab0e89c2e522e71b424b0afa7b1e99ba4191a1afad 82baa397',
            offer_key:123,
            api_version:2
            }
    },
    function (error, response, body) {
                console.log(response.request.response.headers.location);
                console.log(response);
                res.writeHead(301,{Location: response.request.response.headers.location});
                res.end();
    });


};

exports.bookedmealo = function(req, res1) {
var id = req.params.id;
    var url = 'http://localhost:3000/get/mealo/'+id;
	var response = '';
	var body = '';
	http.get(url, function(res) {
        res.on('data', function(chunk) {
            body += chunk;
        });
		res.on('end', function() {
            response = JSON.parse(body);
            res1.render('singlemealo', {restdata:response,id : id,url : req.url});
        });
    });
};

getCityRestaurants = function(req, res1){
    var city = req.params.city;
    var url = 'http://localhost:3000/get/'+req.params.city+'/restaurants';
	var response = '';
	var body = '';
	http.get(url, function(res) {
        res.on('data', function(chunk) {
            body += chunk;
        });
		res.on('end', function() {
            response = JSON.parse(body);
            res1.render('createmealo', { place : city, restdata:response });
        });
    });

};

exports.createmealo = function(req, res1){
    var city = req.params.city;
    var url = 'http://localhost:3000/get/'+req.params.city+'/restaurants';
	var response = '';
	var body = '';
	http.get(url, function(res) {
        res.on('data', function(chunk) {
            body += chunk;
        });
		res.on('end', function() {
            response = JSON.parse(body);
            res1.render('createmealo', { place : city, restdata:response });
        });
    });
    
  //res.render('createmealo', { title: 'Express', place : city });
};

exports.createmealopost = function(req, res1){
    var name = req.body.full_name,
        description = req.body.description,
        arrival_dt = req.body.arrival_dt,
        arrival_time = req.body.arrival_time,
        guests = req.body.guests,
        restaurant = req.body.restaurant,
        menu = req.body.menu;
        arrival_dt = arrival_dt.concat(" "+arrival_time);
        var date = new Date(arrival_dt);


    put.mealo(name, menu, guests, date, description);
  res1.render('createdmealo', { title: 'Express', name : name, description : description, arrival_dt : arrival_dt,  arrival_time : arrival_time,  guests : guests,  restaurant :restaurant, menu :  menu,date: date});
};