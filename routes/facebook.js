var https = require('https');
var  mysql = require('mysql')
    , config = require('../config')
    , graph = require('fbgraph')
    , user = require('./user')
    , crypto = require('crypto');

    
var connection = mysql.createConnection({ 
                    host: config.database.host,
                    user: config.database.user, 
                    password: config.database.password, 
                    database: config.database.database});
                    

exports.updateAccessToken = function(req, res){
        console.log("TIMKE");
    var date = new Date();
    date.setSeconds(date.getSeconds() + req.expirytime);
    var query="UPDATE facebook SET access_token = ?, time = ? WHERE uid = ?";
    connection.query(query,[req.access_token,date,req.uid],function(err,rows){
    if(err) throw err;
         console.log(req.uid+" UID updated")
        user.requestForAuthToken(req,res);
    });

}
                    
exports.getuser = function(req, res, next){
    graph.setAccessToken(req.access_token);
    graph.get("me", function(err, fbres) {
      console.log(fbres);
      req.facebookId= parseInt(fbres.id);
      req.email= fbres.email;
      req.username= fbres.username;
      req.fname= fbres.first_name;
      req.lname= fbres.last_name;
      var query="Select * from user where facebook_id =?";
        connection.query(query,[req.facebookId],function(err,rows){
        if(err) throw err;
        else
        {
            if(rows.length >0)
            {
                req.uid=rows[0].uid
                console.log(req.uid+" UID fetched")
                exports.updateAccessToken(req, res);
            }
            else
            {
                next();
            }
        }
        });

    });
}

exports.authfacebook = function(req, res, next){

    if(typeof req.query.code !== 'undefined')
    {
        var fbquery = '/oauth/access_token?client_id='+config.facebook.client_id+'&redirect_uri='+config.facebook.redirect_uri+'&client_secret='+config.facebook.client_secret+'&code='+req.query.code;
        var options={
        host:'graph.facebook.com',      
        path:fbquery
        }       
        https.get(options,function(res){
                console.log('http fb code')
                 res.setEncoding('utf8');       
                 res.on('data', function (chunk) {
                        chunk = chunk.split('&');
                        console.log(chunk[1]);
                        var access_token = chunk[0].split('=');
                        console.log(access_token[1]);
                        req.access_token = access_token[1];
                        
                        var expirytime = chunk[1].split('=');
                        console.log(expirytime[1]);
                        req.expirytime = parseInt(expirytime[1]);
                        next();
                });
        }); 
    }
    else
    {
        var state = 57862344354534;
        var facebookurl='http://www.facebook.com/dialog/oauth/?client_id='+config.facebook.client_id+'&redirect_uri='+config.facebook.redirect_uri+'&state='+state+'&scope='+config.facebook.scope;
        
        res.writeHead(301,{Location: facebookurl});
        res.end();
    }
}

exports.createuser = function(req, res){
    var password = crypto.randomBytes(11).toString('hex');
    password = crypto.createHash('md5').update(password).digest("hex");
    var profileimg= 'https://graph.facebook.com/'+req.facebookId+'/picture'
    var query="INSERT INTO user (uid, fname, lname, email, username, password, phone, profileimg, role, facebook_id) VALUES (NULL, ?, ?, ?, ?, ?, NULL, ?, 'regular', ?)";
    
    connection.query(query,[req.fname, req.lname, req.email, req.username, password, profileimg, req.facebookId],function(err,rows){
    if(err) throw err;
    else
    {
        req.uid = rows.insertId;
        console.log(req.uid+" UID Registered")
        exports.registerAccessToken(req,res);
        
    }
    });

}

exports.registerAccessToken = function(req, res){
    var date = new Date();
    date.setSeconds(date.getSeconds() + req.expirytime);
    var query="INSERT INTO facebook (id, access_token, uid, time) VALUES (NULL, ?, ?, ?)";
    connection.query(query,[req.access_token,req.uid,date],function(err,rows){
    if(err) throw err;
        console.log(req.uid+" Request for auth")
        user.requestForAuthToken(req,res);
    });

}


