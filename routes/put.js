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
/*

    
    */
    