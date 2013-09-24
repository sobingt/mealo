var  mysql = require('mysql')
    , config = require('../config');
    
var connection = mysql.createConnection({ 
                    host: config.database.host,
                    user: config.database.user, 
                    password: config.database.password, 
                    database: config.database.database});

                                          
exports.mealo = function(name, menu, guests, date, description){
 date ="2013-09-18 13:16:20";
    if (connection) {
        var queryString = "INSERT INTO mealo.mealo (id, name, menuId, tablesize, time, created, uid, description) VALUES (NULL, '?', ?, ?, '?', CURRENT_TIMESTAMP, 1, '?');";
        connection.query(queryString, [name, menu, guests, date, description]);
        //console.log(queryString, [name, menu, [guests], [date], [description]);
        
    }
};


exports.createmealo = function(req, res){
    if (connection) {
        var queryString = "INSERT INTO mealo.mealo (id, name, menuId, tablesize, time, created, uid, description,images) VALUES(NULL, ?, ?, ?, ?, CURRENT_TIMESTAMP, 1, ?,?);";
        connection.query(queryString, [req.name, req.menu, req.maxguest, req.date, req.description, res.uploadfile],function(err, ress) {
        console.log(ress.insertId);
        
        });
        //console.log(queryString, [name, menu, [guests], [date], [description]);
        
    }
};

exports.updateMealo = function(req, res){
if (connection) {
	var querystring ='UPDATE mealo.mealo SET name = ?, description = ?, tablesize = ? WHERE  mealo.id =?';
	connection.query(querystring, [req.body.name, req.body.description, req.body.guests, req.body.id], function(error, rows) {
		if (error) 
			res.send('Canonot update the mealo.')
	});
	//console.log(querystring, [req.body.name, req.body.description, req.body.date, req.body.guests, req.body.id]);
}
res.send('success');

};

exports.deleteMealo = function(req, res) {
if (connection) {
	var queryString = 'DELETE FROM mealo.mealo WHERE mealo.id = ?';
	connection.query(queryString, [req.body.id], function(error, rows) {
		if (error)
			res.send('Cannot delete Mealo');
	});
	res.send('success');
}


}
/*

    
    */
    