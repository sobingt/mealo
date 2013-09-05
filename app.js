
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , get = require('./routes/get')
  , mealoJson = require('./routes/json')
  , http = require('http')
  , path = require('path')
  , mysql = require('mysql')
  , connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "mealo"
	})
  , gm = require('googlemaps')
  , hbs = require('hbs');

var app = express();
var parsedJSON = require('./restaurants.json');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//<<<<<<< Updated upstream
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/get', get.all);
app.get('/get/:id', get.one);

app.get('/get/restaurant/:id', get.restaurant);
app.get('/get/restaurant/:id/menu', get.restaurantMenu);
app.get('/get/restaurant/:id/menu/:type', get.restaurantMenuType);

app.get('/get/mealo/:id', get.mealo);
app.get('/get/mealo/type/:type', get.mealoType);

app.get('/get/:city/restaurants', get.cityRestaurants);
app.get('/get/:city/mealos', get.cityMealos);
app.get('/get/:city/mealos/:type', get.cityMealosType);
app.get('/get/:city/menu/:type', get.cityMenuType);

var fs = require('fs');
//FIX ME: need a seperate function

app.get('/:city/restaurants', function(req, res1) {
var url = 'http://localhost:3000/get/'+req.params.city+'/restaurants';
	var response = '';
	var body = '';
	http.get(url, function(res) {
        res.on('data', function(chunk) {
            body += chunk;
        });
		res.on('end', function() {
            response = JSON.parse(body);
			res1.render('restaurants', {restdata:response});
        });
    })
	
   
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
