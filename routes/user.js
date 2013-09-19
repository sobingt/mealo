var mysql = require('mysql');
var connection = mysql.createConnection({ host: 'localhost', user: 'root',  
                                          password: '', database: 'mealo'});
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.findOne = function(req, res) {
  var username = req.username;
  if (connection) {
        var queryString = 'SELECT username, password FROM user WHERE username = ?';
        connection.query(queryString, [username,username], function(err, rows, fields) {
            if (err) throw err;
			res.contentType('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
	
};

exports.authenticatedOrNot = function(req, res, next){
    if(req.isAuthenticated()){
        next();	
    }else{
        res.redirect("/login");
    }
};