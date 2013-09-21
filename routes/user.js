var mysql = require('mysql');
var connection = mysql.createConnection({ host: 'localhost', user: 'root',  
                                          password: 'root1234', database: 'mealo'});
/*
 * GET users listing.
 */
var crypto = require('crypto')
    , http = require('http')
    , request = require('request')
	,email=require('./email.js')
	,config=require('../config.js');
	
    
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

exports.register = function(req, res1){
    res1.render('register');
};

exports.forgetPassword = function(req, res1){
    res1.render('forgetpassword');
};

exports.resetPassword = function(req, res1){
    //res1.render('forgetpassword');
	var userEmail=req.body.email;
	var queryString="Select email,uid,fname from user where email=?";
	connection.query(queryString,[userEmail],function(err,rows){
		if(err) throw err;
		else
		{
			if(rows.length <=0)
			{
			
			}
			else
			{
				var hashKey=crypto.randomBytes(24).toString('hex');
				var queryString2="Insert into passwordreset(uid,hashkey) values(?,?)";
				connection.query(queryString2,[rows[0].uid,hashKey],function (err1,rows1){
					if(err) throw err;
					else
					{
						console.log(rows[0].uid);
						var link=config.host.url+config.host.port+'/reset/'+hashKey;
						//SEND EMAIL
						email.forgotPassword(rows[0].fname,link,rows[0].email);
					}
			});
			}
		}
		
		});
	
};

exports.insertUser =function(req,res1){
	var firstName=req.body.firstname;
	var lastName=req.body.lastname;
	var emailId=req.body.email;
	var userName=req.body.username;
	var password=crypto.createHash('md5').update(req.body.password).digest("hex");
	var queryString="INSERT INTO user(fname,lname,email,username,password) values(?,?,?,?,?);";
	connection.query(queryString,[firstName,lastName,emailId,userName,password],function(err, rows) {
            if (err) throw err;
            else
			{
				res1.writeHead(301,{Location: '/login/'});
				res1.end();
			}
        });

};

exports.setNewPasswordConfirm=function(req,res1){
	var uid=req.params.uid;
	var password=crypto.createHash('md5').update(req.body.password).digest("hex");
	var queryString="UPDATE user set password=? where uid=?;";
	connection.query(queryString,[password,uid],function(err, rows) {
            if (err) throw err;
            else
			{
				res1.writeHead(301,{Location: '/login/'});
				res1.end();
			}
        });

};

exports.setNewPassword =function(req,res1){
	var uid=req.params.uid;
	res1.render('resetpassword',{uid:uid});

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
