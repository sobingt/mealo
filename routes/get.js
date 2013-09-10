var mysql = require('mysql');
var connection = mysql.createConnection({ host: 'localhost', user: 'root',  
                                          password: 'root', database: 'mealo'});

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
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};

exports.mealo = function(req, res){
    var id = req.params.id;
    if (connection) {
        var queryString = 'SELECT mealo.id, mealo.name, mealo.menuId, mealo.tablesize, mealo.time, mealo.created, mealo.uid, mealo.description, m.restId, m.menu, m.type, r.name AS restaurant, r.locationId, r.email, r.phone, r.cityId, r.maxTableSize, r.cuisine, r.picture, r.note, g.latitude, g.longitude, a.attend, m.cost FROM mealo LEFT JOIN (menu m, restaurant r, geolocation g, attendance a) ON mealo.menuId = m.id AND r.id = m.restId AND r.locationId = g.id AND mealo.id = a.mealid WHERE mealo.id = ?';
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
        var queryString = 'SELECT mealo.id, mealo.name, mealo.menuId, mealo.tablesize, mealo.time, mealo.created, mealo.uid, mealo.description, m.restId, m.menu, m.type, r.name AS restaurant, r.locationId, r.email, r.phone, r.cityId, r.maxTableSize, r.cuisine, r.picture, r.note, g.latitude, g.longitude, a.attend, m.cost FROM mealo LEFT JOIN (menu m, restaurant r, geolocation g, attendance a) ON mealo.menuId = m.id AND r.id = m.restId AND r.locationId = g.id AND mealo.id = a.mealid';
        //console.log(queryString);
        //res.write(queryString);
         
        
        connection.query(queryString, function(err, rows, fields) {
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
            console.log("The Row");
            console.log(JSON.stringify(rows));
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
            res.write(JSON.stringify(rows));
            res.end();
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
