var  mysql = require('mysql')
    , config = require('../config')
    , crypto = require('crypto');
    
var connection = mysql.createConnection({ 
                    host: config.database.host,
                    user: config.database.user, 
                    password: config.database.password, 
                    database: config.database.database});

exports.login = function(req, res){

    var username = req.body.username;
    //var password = req.body.password;
    var pwd = req.body.password;
    //var pwd = crypto.createHash('md5').update(password).digest("hex");
    console.log(pwd);

    if (connection) {
        var queryString = 'SELECT * FROM user WHERE username=? AND password=?';
        connection.query(queryString,[username,pwd], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            if(rows.length>0)
            {
                
                console.log(rows[0].username);
                req.session.username = rows[0].username;
                req.session.email = "sobingt@gmail.com";
                console.log(req.session.username);
                req.session.save();
                res.write(JSON.stringify(rows));
                res.end();

                
            }
            else
            {
                var error = { error: 'notfound' };
                res.write(JSON.stringify(error));
                res.end();
            }
        });
    }

};
exports.authredirect = function(req, res){

    
};
