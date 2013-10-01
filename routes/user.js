var crypto = require('crypto')
    , http = require('http')
    , request = require('request')
	, email=require('./email.js')
    , mysql = require('mysql')
	, config=require('../config.js');

var connection = mysql.createConnection({ 
                    host: config.database.host,
                    user: config.database.user, 
                    password: config.database.password, 
                    database: config.database.database});

/*
 * GET users listing.
 */
exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.profile = function(req, res){
    var id = req.params.id;
	var same="visitor";
	if(typeof req.userdata !== "undefined"){
	//console.log("in if");
	var visitor=req.userdata[0].uid;
	//console.log(visitor);
	//console.log("id is"+id);
	if(visitor==id)
		same="owner";
	//console.log(same);
	//console.log(id);
	}
	if (connection) {
    
        var queryString = 'SELECT fname,lname,email,phone,profileimg FROM USER where uid=?;'
        connection.query(queryString,[id], function(err, rows, fields) {
            if (err) throw err;
            else
            {
                req.userdetails=rows;
				//console.log(rows);
				res.render('userprofile',{userdetail:req.userdetails,role:same});
            }
        });
    }
	
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
	var hashKey=crypto.randomBytes(24).toString('hex');
	var queryString="INSERT INTO usertemp(fname,lname,email,uname,password,hashkey) values(?,?,?,?,?,?);";
	connection.query(queryString,[firstName,lastName,emailId,userName,password,hashKey],function(err, rows) {
            if (err) throw err;
            else
			{
				var link=config.host.url+config.host.port+'/activate/'+hashKey;
				email.mealoRegistration(link,emailId);
			}
        });

};

exports.activateUser =function(req,res1){
	var hashKey = req.params.hashkey;
    if (connection) {
        var queryString = 'SELECT fname,lname,email,uname,password,hashkey  FROM usertemp WHERE hashkey=?;';
        
        connection.query(queryString,[hashKey], function(err, rows) {
            if (err) throw err;
			else
			{
				if(rows.length <=0)
				{
				
				}
				else
				{
					var queryInsert="INSERT INTO user(fname,lname,email,username,password) values(?,?,?,?,?);";
					connection.query(queryInsert,[rows[0].fname,rows[0].lname,rows[0].email,rows[0].uname,rows[0].password],function(err,rows1){
						if(err) throw err;
						else
						{
							var queryDelete="DELETE from usertemp where hashkey=?";
							connection.query(queryDelete,[hashKey],function(err,rows3){
								if(err) throw err;
								else
								{
									res1.writeHead(301,{Location: '/login/'});
									res1.end();
								}
							});
						}
					  });	
				}
			}
        });
    }

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
exports.test = function(req, res){
    console.log("The test");
};

exports.getuser = function(req, res, next){
    
    if (connection) {
        var queryString = 'SELECT user.uid, fname, lname, email, username,role FROM token,user WHERE auth_token = ? AND token.uid=user.uid';
        connection.query(queryString, [req.session.auth_token], function(err, rows, fields) {
            if (err) throw err;
            if(rows.length <= 0)
            {
                next();
            }
            else
            {
                req.userdata=rows;
                next();
            }
        });
    }
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
                
                req.uid = response[0].uid;
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

exports.hasAuthToken = function(req,res,next){
    if (connection) {
        var queryString = 'SELECT * FROM token where uid = ?';
        connection.query(queryString, [req.uid], function(err, rows, fields) {
            if (err) throw err;
            if(rows.length <= 0)
            {
                next();
            }
            else
            {
                if(req.session.auth_token==rows[0].auth_token)
                {
                    res.writeHead(301,{Location: '/user/'+req.uid});
                    res.end();
                }
                else
                {
                    auth_token = rows[0].auth_token;
                    req.session.auth_token = auth_token;
                    res.writeHead(301,{Location: '/user/'+req.uid});
                    res.end();                
                }

            }
        });
    }

};
//app.post('/login', user.auth, user.hasAuthToken, user.requestForAuthToken);
exports.requestForAuthToken = function(req,res){
    var auth_token = crypto.randomBytes(48).toString('hex');
    if (connection) {
    
        var queryString = 'INSERT INTO token (id, uid, auth_token, time) VALUES (NULL, ?, ?,5259480)'
        connection.query(queryString, [req.uid,auth_token], function(err, rows, fields) {
            if (err) throw err;
            else
            {
                req.session.auth_token = auth_token;
                res.writeHead(301,{Location: '/user/'+req.uid});
                res.end();
            }
        });
    }

    

    
};

exports.isAuthTokenValid = function(req,res,next)
{
    console.log(req.url);
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

exports.isAuthed = function(req,res,next)
{
    console.log(req.url);
    if(typeof req.session.auth_token !== "undefined")
    {
        if (connection) 
        {
            var queryString = 'SELECT * FROM token where auth_token = ?';
            connection.query(queryString, [req.session.auth_token], function(err, rows, fields) {
                if (err) throw err;
                if(rows.length <= 0)
                {
                    console.log("not Token "+req.session.auth_token);
                    //res.writeHead(301,{Location: '/login'});
                    res.end();
                }
                else
                {
                     next();
                }
            });
        }
    }
    else
    {
        console.log("not Token dude "+req.session.auth_token);
        //res.writeHead(301,{Location: '/login'});
        res.end();
    }
};

