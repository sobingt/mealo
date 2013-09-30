var http = require('http');
var  mysql = require('mysql')
    , config = require('../config');
    
var connection = mysql.createConnection({ 
                    host: config.database.host,
                    user: config.database.user, 
                    password: config.database.password, 
                    database: config.database.database});
                    
exports.createinvoice = function(req, res, next){
    if (connection) {
        var queryString = "INSERT INTO transaction (id, uid, mealoid, name, amount, status, time) VALUES (NULL, ?, ?, ?, ?, 'incomplete', CURRENT_TIMESTAMP)";
        
        connection.query(queryString, [req.jsondata[0].uid, req.jsondata[0].mealoid, req.jsondata[0].mealoname, req.jsondata[0].amount],
        function(error, ress) {
           if(error)
           {
                console.log(error);
                throw error;
            }
            else
            {
                req.jsondata[0]['transid']=ress.insertId;
                next();
            }
        });

    }
}

exports.invoice = function(req, res, next){
    console.log(req.jsondata);
    res.render('invoice',{data:req.jsondata});
}
