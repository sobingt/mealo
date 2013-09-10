var http = require('http')
    , put = require('../routes/put.js');

exports.index = function(req, res){
  res.render('mealo', { title: 'Express' });
};

exports.mealo = function(req, res1) {
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