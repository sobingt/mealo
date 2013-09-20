var mysql = require('mysql');
var connection = mysql.createConnection({ host: 'localhost', user: 'root',  
                                          password: 'root', database: 'mealo'});
                                          
exports.mealo = function(name, menu, guests, date, description){
 date ="2013-09-18 13:16:20";
    if (connection) {
        var queryString = "INSERT INTO mealo.mealo (id, name, menuId, tablesize, time, created, uid, description) VALUES (NULL, '?', ?, ?, '?', CURRENT_TIMESTAMP, 1, '?');";
        connection.query(queryString, [name, menu, guests, date, description]);
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
    