var http = require('http');
var  mysql = require('mysql')
    , config = require('../config')
    , crypto = require('crypto')
    , get = require('./get');
    
var connection = mysql.createConnection({ 
                    host: config.database.host,
                    user: config.database.user, 
                    password: config.database.password, 
                    database: config.database.database});

 

exports.isAdmin = function(req, res, next) {
  var auth_token = req.session.auth_token;
  /*if (connection) {
		var queryString = 'SELECT u.uid, u.role, t.auth_token FROM user u LEFT JOIN token t ON t.uid = u.uid WHERE t.auth_token = ?'; 
        connection.query(queryString, [auth_token], function(err, rows, fields) {
            if (err) throw err;
			if (rows.length > 0){
				next();
			}
			else {
				res.send('Oops, You do not have permission to view this page');
			}
        });
    }
	*/
	next();
};										  
										
exports.list = function(req, res1){
    //var url = 'http://localhost:3000/getmealo';
	var mealos = get.allmealos;
	var attendees = new Array();
	var queryString = 'SELECT mealo.id, mealo.name, mealo.menuId, mealo.tablesize, mealo.time, mealo.created, mealo.uid, mealo.description, m.restId, m.menu, m.type, r.name AS restaurant, r.locationId, r.email, r.phone, r.cityId, r.maxTableSize, r.cuisine, r.picture, r.note, g.latitude, g.longitude, a.attend, m.cost FROM mealo LEFT JOIN (menu m, restaurant r, geolocation g, attendance a) ON mealo.menuId = m.id AND r.id = m.restId AND r.locationId = g.id AND mealo.id = a.mealid';
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
			for(var i in rows) {
				val = rows[i];
				var queryStringnew = 'SELECT u.fname, u.lname, p.mealoId FROM user u LEFT JOIN participant p ON p.uid = u.uid WHERE p.mealoId = ?';
				connection.query(queryStringnew, [val.id], function(err, rows1, fields) {
					for(var j in rows1) {
						val2 = rows1[j];
						attendees[val.id] = val2.fname+' '+val2.lname;
					}
				});
				
				//res1.render('admin', {restdata:attendees});
			}
			res1.render('admin', {restdata:rows, attendees:attendees});
        });
	var response = '';
	var body = '';
	/*http.get(url, function(res) {
        res.on('data', function(chunk) {
            body += chunk;
        });
		res.on('end', function() {
            response = JSON.parse(body);
            res1.render('admin', {restdata:response});
        });
    });*/
};

										