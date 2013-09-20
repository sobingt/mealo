var mysql = require('mysql');
var connection = mysql.createConnection({ host: 'localhost', user: 'root',  
                                          password: 'root', database: 'mealo'});
/*
 * GET users listing.
 */
var crypto = require('crypto')
    , http = require('http')
    , request = require('request');
    
exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.profile = function(req, res){
    var id = req.params.id;
    res.render('userprofile');
};

exports.login = function(req, res1){
    res1.render('login');
};


exports.auth = function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    var pwd = crypto.createHash('md5').update(password).digest("hex");
	var response = '';
	var body = '';
    request.post('http://localhost:3000/auth',
    { form: { username: username, password: pwd } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            response = JSON.parse(body);
            if(typeof response.error !== "undefined")
            {
                res.render('login', {error:"Wrong combination username and password"});
            }else
            {
                
                res.uid = response[0].uid;
                next();
            }
            
        }
        else
        {
            res.render('login', {error: error});
        }
    }
);
	 
    
};

exports.test = function(req, res){
    console.log("The test");
};

exports.hasAuthToken = function(req,res,next){
    if (connection) {
        var queryString = 'SELECT * FROM token where uid = ?';
        connection.query(queryString, [res.uid], function(err, rows, fields) {
            if (err) throw err;
            if(rows.length <= 0)
            {
                next();
            }
            else
            {
                if(req.session.auth_token==rows[0].auth_token)
                {
                    res.writeHead(301,{Location: '/user/'+res.uid});
                    res.end();
                }
                else
                {
                    auth_token = rows[0].auth_token;
                    req.session.auth_token = auth_token;
                    res.writeHead(301,{Location: '/user/'+res.uid});
                    res.end();                
                }

            }
        });
    }

};

exports.requestForAuthToken = function(req,res){
    var auth_token = crypto.randomBytes(48).toString('hex');
    if (connection) {
    
        var queryString = 'INSERT INTO token (id, uid, auth_token, time) VALUES (NULL, ?, ?,5259480)'
        connection.query(queryString, [res.uid,auth_token], function(err, rows, fields) {
            if (err) throw err;
            else
            {
                req.session.auth_token = auth_token;
                res.writeHead(301,{Location: '/user/'+res.uid});
                res.end();
            }
        });
    }

    

    
};

exports.isAuthTokenValid = function(req,res,next)
{
    if (connection) {
        var queryString = 'SELECT * FROM token where auth_token = ?';
        connection.query(queryString, [req.session.auth_token], function(err, rows, fields) {
            if (err) throw err;
            if(rows.length <= 0)
            {
                next();
            }
            else
            {
                res.writeHead(301,{Location: '/user/'+rows[0].uid});
                res.end();
            }
        });
    }


};
