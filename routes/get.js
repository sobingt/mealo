var http = require('http');
var  mysql = require('mysql')
    , config = require('../config');
    
var connection = mysql.createConnection({ 
                    host: config.database.host,
                    user: config.database.user, 
                    password: config.database.password, 
                    database: config.database.database});

//FIX IT .....MAKE IT ALL POSTS OR FUNCTIONS
										  
exports.all = function(req, res){
    if (connection) {
        connection.query('SELECT * FROM user order by fname', function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};

exports.one = function(req, res){
    var id = req.params.id;
    if (connection) {
        var queryString = 'SELECT * FROM user where uid = ?';
        connection.query(queryString, [id], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            console.log(rows);
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};

exports.restaurant = function(req, res){
    var id = req.params.id;
    if (connection) {
        var queryString = 'SELECT  r.id, r.name, r.email, r.phone, r.cuisine, r.picture, r.note, g.latitude, g.longitude, c.city FROM restaurant r LEFT JOIN (geolocation g,city c) ON r.`locationId` = g.id WHERE r.id = ? UNION SELECT r.id, r.name, r.email, r.phone, r.cuisine, r.picture, r.note, g.latitude, g.longitude, c.city FROM restaurant r RIGHT JOIN (geolocation g,city c) ON r.`locationId` = g.id WHERE r.id = ?'
        connection.query(queryString, [id,id], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};

exports.restaurantMenu = function(req, res){
    var id = req.params.id;
    if (connection) {
        var queryString = 'SELECT * FROM menu WHERE restId = ?';
        connection.query(queryString, [id], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            for(var i=0;i<rows.length;i++)
                rows[i].cost=JSON.parse(rows[i].cost);
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};

exports.restaurantMenuType = function(req, res){
    var id = req.params.id;
    var type = req.params.type;
    if (connection) {
        var queryString = 'SELECT * FROM menu WHERE restId = ? AND type = ?';
        connection.query(queryString, [id, type], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            for(var i=0;i<rows.length;i++)
                rows[i].cost=JSON.parse(rows[i].cost);
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};


exports.allRestaurantMenu = function(req, res){
    if (connection) {
        var queryString = 'SELECT m.id, m.name, m.restId, m.menu, m.type, m.cost, r.name AS restName, r.description, r.locationId, r.email, r.phone, r.cityId, r.maxTableSize, r.cuisine, r.picture, r.note, r.address, r.place  FROM menu m, restaurant r WHERE restaurant.id =  menu.restId';
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            for(var i=0;i<rows.length;i++)
                rows[i].cost=JSON.parse(rows[i].cost);
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};

exports.allRestaurantMenuType = function(req, res){
    var type = req.params.type;
    if (connection) {
        var queryString = 'SELECT m.id, m.name, m.restId, m.menu, m.type, m.cost, r.name AS restName, r.description, r.locationId, r.email, r.phone, r.cityId, r.maxTableSize, r.cuisine, r.picture, r.note, r.address, r.place  FROM menu m, restaurant r WHERE r.id =  m.restId AND type = ?';
        connection.query(queryString, [type], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            for(var i=0;i<rows.length;i++)
                rows[i].cost=JSON.parse(rows[i].cost);
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};


exports.mealo = function(req, res){
    var id = req.params.id;
    if (connection) {
        var queryString = 'SELECT mealo.id, mealo.name, mealo.menuId, mealo.tablesize, mealo.time, mealo.created, mealo.uid, mealo.description, m.restId, m.menu, m.type, r.name AS restaurant,r.description as restaurantdesc, r.locationId, r.email, r.phone, r.cityId, r.maxTableSize, r.cuisine, r.picture, r.note, g.latitude, g.longitude, a.attend, m.cost,u.profileimg FROM mealo LEFT JOIN (menu m, restaurant r, geolocation g, attendance a,user u) ON mealo.menuId = m.id AND r.id = m.restId AND r.locationId = g.id AND mealo.id = a.mealid AND mealo.uid=u.uid WHERE mealo.id = ?';
        connection.query(queryString, [id], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
			rows[0].cost = JSON.parse(rows[0].cost);
			console.log(rows[0].cost);
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};

exports.attendes = function(req, res){
    var id = req.params.id;
    if (connection) {
        var queryString = 'select mealo.id,user.profileimg from mealo,user,participant where participant.mealoid=mealo.id and participant.uid=user.uid and mealo.id=?';
        connection.query(queryString, [id], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};

exports.allmealos = function(req, res){
    if (connection) {
        var queryString = 'SELECT mealo.id, mealo.name, mealo.menuId, mealo.tablesize, mealo.time, mealo.created, mealo.uid, mealo.description, m.restId, m.menu, m.type, r.name AS restaurant,r.description AS restaurantdesc, r.locationId, r.email, r.phone, r.cityId, r.maxTableSize, r.cuisine, r.picture, r.note, g.latitude, g.longitude, a.attend, m.cost FROM mealo LEFT JOIN (menu m, restaurant r, geolocation g, attendance a) ON mealo.menuId = m.id AND r.id = m.restId AND r.locationId = g.id AND mealo.id = a.mealid';
        //console.log(queryString);
        //res.write(queryString);
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            for(var i=0;i<rows.length;i++)
            {
                rows[i].phone=JSON.parse(rows[i].phone);
                rows[i].cost= JSON.parse(rows[i].cost);
            }
            res.write(JSON.stringify(rows));
            res.end();
        });
        
    }
};

exports.searchmealo = function(req, res){
    var search = req.params.search+"%";
    console.log(search+" Serach");
    if (connection) {
        var queryString = 'SELECT mealo.id, mealo.name, mealo.menuId, mealo.tablesize, mealo.time, mealo.created, mealo.uid, mealo.description, m.restId, m.menu, m.type, r.name AS restaurant, r.locationId, r.email, r.phone, r.cityId, r.maxTableSize, r.cuisine, r.picture, r.note, g.latitude, g.longitude, a.attend, m.cost FROM mealo LEFT JOIN (menu m, restaurant r, geolocation g, attendance a) ON mealo.menuId = m.id AND r.id = m.restId AND r.locationId = g.id AND mealo.id = a.mealid WHERE mealo.name LIKE ? OR mealo.description LIKE ? OR r.cuisine LIKE ?';
        console.log(queryString,[search,search,search]);
        //res.write(queryString);
        connection.query(queryString,[search,search,search], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            for(var i=0;i<rows.length;i++)
            {
                rows[i].phone=JSON.parse(rows[i].phone);
                rows[i].cost= JSON.parse(rows[i].cost);
            }
            res.write(JSON.stringify(rows));
            console.log(JSON.stringify(rows));
            res.end();
        });
        
    }
};

exports.attendee = function(req, res){
var id = req.params.mealoId;
    if (connection) {
        var queryString = 'SELECT u.fname, u.lname FROM user u LEFT JOIN participant p ON p.uid = u.uid WHERE p.mealoId = ?';
        //console.log(queryString);
        //res.write(queryString);
        connection.query(queryString, [id], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(rows));
            console.log(rows);
            res.end();
        });
        
    }
};


//app.get('/get/mealo/:type', get.mealoType);
 
exports.mealoType = function(req, res){
    var type = req.params.type;
    console.log("ssss");
    if (connection) {
        var queryString = 'SELECT *  FROM mealo WHERE  menuId IN (SELECT id  FROM menu WHERE type LIKE ? )';
        
        connection.query(queryString, [type], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};

exports.cityRestaurants = function(req, res){
    var city = req.params.city;
    if (connection) {
        var queryString = 'SELECT  r.id, r.name, r.email, r.phone, r.cuisine, r.picture, r.note, g.latitude, g.longitude, c.city FROM restaurant r LEFT JOIN (geolocation g,city c) ON r.`locationId` = g.id WHERE c.city LIKE ? UNION SELECT r.id, r.name, r.email, r.phone, r.cuisine, r.picture, r.note, g.latitude, g.longitude, c.city FROM restaurant r RIGHT JOIN (geolocation g,city c) ON r.`locationId` = g.id WHERE c.city LIKE ?';
        connection.query(queryString, [city,city], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            for(var i=0;i<rows.length;i++)
                rows[i].phone=JSON.parse(rows[i].phone);
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};

exports.cityMealos = function(req, res){
    var city = req.params.city;
    if (connection) {
        var queryString = 'SELECT * FROM mealo WHERE menuId IN (SELECT id  FROM menu WHERE restId IN (SELECT id  FROM restaurant WHERE cityId IN (SELECT id  FROM city WHERE city LIKE ? )))';
        console.log(queryString);
        connection.query(queryString, [city], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};

//app.get('/get/:city/mealo/:type', get.cityMealoType);
exports.cityMealosType = function(req, res){
    var city = req.params.city;
    var type = req.params.type;
    if (connection) {
        var queryString = 'SELECT * FROM mealo WHERE menuId IN (SELECT id  FROM menu WHERE type LIKE ? AND restId IN (SELECT id  FROM restaurant WHERE cityId IN (SELECT id  FROM city WHERE city LIKE ? )))';
        console.log(queryString);
        connection.query(queryString, [type,city], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};

exports.cityMenuType = function(req, res){
    var city = req.params.city;
    var type = req.params.type;
    if (connection) {
        var queryString = 'SELECT *  FROM menu WHERE restId IN (SELECT id  FROM restaurant WHERE cityId = (SELECT id  FROM city WHERE city LIKE ? ) )  AND type = ? ';
        
        connection.query(queryString, [city, type], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            for(var i=0;i<rows.length;i++)
                rows[i].cost=JSON.parse(rows[i].cost);
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};

exports.resetPassword = function(req, res){
    var hashKey = req.params.hashkey;
    if (connection) {
        var queryString = 'SELECT uid,hashkey  FROM passwordreset WHERE hashkey=?;';
        
        connection.query(queryString,[hashKey], function(err, rows) {
            if (err) throw err;
			else
			{
				if(rows.length <=0)
				{
				
				}
				else
				{
					res.writeHead(301,{Location: '/resetpassword/'+rows[0].uid});
					res.end();
				}
			}
        });
    }
};





/*
app.get('/get/restaurant/:id/menu', get.restaurantMenu);
app.get('/get/restaurant/:id/menu/:type', get.restaurantMenuType);

app.get('/get/mealo/:id', get.mealo);
app.get('/get/mealo/:type', get.mealoType);

app.get('/get/:city/restaurant', get.cityRestaurant);
app.get('/get/:city/mealos', get.cityMealos);
app.get('/get/:city/users', get.cityUsers);
app.get('/get/:city/menu/type', get.cityMenuType);
*/


//GET FUNCTIONS AS SAID BY SOBIN: FOR INDIVIDUAL MEALO:

exports.getMealo=function(req, res1,next) {
var id = req.params.id;
    var url = 'http://localhost:3000/get/mealo/'+id;
	var response1 = '';
	var body = '';
	http.get(url, function(res) {
        res.on('data', function(chunk) {
            body += chunk;
        });
		res.on('end', function() {
            response1 = JSON.parse(body);
            res1.response1 = response1;
			//console.log(res1.response);
			next();
        });
    });

};

exports.getAttendes=function(req,res1,next) {
var id = req.params.id;
	//console.log(req.params);
    var url = 'http://localhost:3000/get/mealo/attendes/'+id;
	var response2 = '';
	var body = '';
	http.get(url, function(res) {
        res.on('data', function(chunk) {
            body += chunk;
        });
		res.on('end', function() {
            response2 = JSON.parse(body);
			res1.response1 = res1.response1;
			res1.response2 = response2;
			//console.log(res1.response1);
			//console.log(res1.response2);
			console.log("inside get attendes");
			next();
        });
    });

};

exports.getRole=function(req,res1,next) {
	//var uid=res1.uid;
	//res1.response1=res1.response1;
	//res1.response2=res1.response2;
	//console.log(res1.response1);
    //console.log(res1.response2);
	console.log("inside get roleeeee");
	var creatorid=res1.response1[0].uid;
	console.log(creatorid);
	var role="";
	role="registeredmember";
	res1.response3=role;
	next();

};
