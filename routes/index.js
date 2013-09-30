var http = require('http')
    , fs = require('fs');
    
var  mysql = require('mysql')
    , config = require('../config');
    
var connection = mysql.createConnection({ 
                    host: config.database.host,
                    user: config.database.user, 
                    password: config.database.password, 
                    database: config.database.database});
/*
 * GET home page.
 */


exports.index = function(req, res){
console.log(req.mealos);
console.log(req.restaurants);
res.render('index', { auth_token: req.session.auth_token ,mealos : req.mealos,restaurants : req.restaurants });
};

exports.mealos = function(req, res, next){
  var url = 'http://localhost:3000/getmealo';
	var response = '';
	var body = '';
	http.get(url, function(res) {
        res.on('data', function(chunk) {
            body += chunk;
        });
		res.on('end', function() {
            response = JSON.parse(body);
            req.mealos=response;
            next()
        });
    });
};

exports.search = function(req, res1){
    var search = req.body.search;
    console.log("sss"+search);
  var url = 'http://localhost:3000/get/search/'+search;
	var response = '';
	var body = '';
	http.get(url, function(res) {
        res.on('data', function(chunk) {
            body += chunk;
        });
		res.on('end', function() {
            response = JSON.parse(body);
            req.mealos=response;
            res1.render('search', { mealos : req.mealos});
        });
    });
};

exports.restaurants= function(req, res, next){
  var url = 'http://localhost:3000/get/mumbai/restaurants';
	var response = '';
	var body = '';
	http.get(url, function(res) {
        res.on('data', function(chunk) {
            body += chunk;
        });
		res.on('end', function() {
            response = JSON.parse(body);
            req.restaurants=response;
            next()
        });
    });
};


exports.uploadfile = function(req, res, next){
     console.log(req.files.file);
     if(typeof req.files.file !== 'undefined')
     {
         var temp_path = req.files.file.path;
         var save_path = './public/images/' + req.files.file.name;
         
         fs.rename(temp_path, save_path, function(error){
            if(error) throw error;
            
            fs.unlink(temp_path, function(){
                if(error)
                {
                    console.log(error);
                    throw error;
                
                }
                //res.send("File uploaded to: " + save_path);
                req.uploadfile=save_path;
                next();
            });
            
         });
    }
    else
    {
        res.redirect(301, '/#id_reg');
		res.end();
    }
};

exports.createmealo = function(req, res, next){
     req.date = req.body.date;
     req.hour = parseInt(req.body.hour); 
     req.minute= parseInt(req.body.minute);
     req.meridian= req.body.meridian;
     var date = new Date(req.date);
     if(req.body.meridian="PM" && req.hour!=12)
        req.hour+=12;
     date.setHours(req.hour);
     date.setMinutes(req.minute);
     req.date = date;
     var data = new Array();
     data[0] = {};
     data[0]['uid']=req.userdata.uid;
     data[0]['fname']=req.userdata.fname;
     data[0]['mealoname']=req.body.name;
     data[0]['description'] =req.body.description;
     data[0]['date'] =date;
     data[0]['cuisine'] =req.body.cuisine;
     data[0]['amount'] =parseInt(req.body.amount);
     data[0]['maxguest'] =parseInt(req.body.maxguest);
     data[0]['restaurant'] =parseInt(req.body.restaurant);
     data[0]['menu'] =parseInt(req.body.menu);
     data[0]['uploadfile'] =req.uploadfile;
    
    var queryString="INSERT INTO mealo (id, name, menuId, tablesize, time, created, uid, description, images, status) VALUES (NULL, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, 'incomplete');";
	connection.query(queryString,[req.body.name,data[0]['menu'],data[0]['maxguest'],data[0]['date'], data[0]['uid'],data[0]['description'],data[0]['uploadfile']],function(err, rows) {
        if (err) 
        {
            throw err;
        }
        else
		{
            data[0]['mealoid']=rows.insertId;
            req.jsondata=data;
            next();
        }


    });
 };
 
exports.prepaymealo = function(req, res, next){
req.transId=1231434234;
req.amount=1000;
req.name="Sobin Mealo";
req.fname="Sobin";
req.email="sobingt@gmail.com";
req.mobile=9969569927;
next();
}
 
/*
exports.createmealo = function(req, res){
  res.render('createmealo', { title: 'Express' });
};
*/