
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , admin = require('./routes/admin')
  , mealo = require('./routes/mealo')
  , get = require('./routes/get')
  , put = require('./routes/put')
  //, mealoJson = require('./routes/json')
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
  , hbs = require('hbs')
  , passport = require('passport')
  , passwordHash = require('password-hash')
  , LocalStrategy = require('passport-local').Strategy;

var app = express();
var parsedJSON = require('./restaurants.json');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

  app.use(function (req, res, next) {
    var err = req.session.error,
        msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

hbs.registerHelper("moduloIf", function(index_count,mod,block) {
  if(parseInt(index_count)%(mod)=== 0 && parseInt(index_count) != 0 )
  {
    return block.fn(this);
  }
});

hbs.registerHelper("lastIf", function(index_count,mod,block) {
  if(parseInt(index_count)=== mod-1)
  {
    return block.fn(this);
  }
});
//app.get('/', routes.index);

app.get('/', function(req, res1) {
    var url = 'http://localhost:3000/getmealo';
	var response = '';
	var body = '';
	http.get(url, function(res) {
        res.on('data', function(chunk) {
            body += chunk;
        });
		res.on('end', function() {
            response = JSON.parse(body);
			res1.render('index', {restdata:response});
            console.log(response);
        });
    });
});

app.get('/mealo', mealo.index);
app.get('/mealo/:id', mealo.mealo);
app.get('/:city/mealo/new', mealo.createmealo);
app.post('/:city/mealo/new', mealo.createmealopost);
app.get('/users', user.list);
app.get('/about', function(req, res) {
   res.render('about', {title:"About Me"});
});

//admin url
app.get('/su', admin.isAdmin, admin.list);

app.post('/update/mealo', put.updateMealo);
app.post('/delete/mealo', put.deleteMealo);
app.get('/get/admin/list', get.allmealos);
app.get('/get', get.all);
app.get('/get/:id', get.one);
app.get('/get/restaurant/:id', get.restaurant);
app.get('/get/restaurant/:id/menu', get.restaurantMenu);
app.get('/get/restaurant/:id/menu/:type', get.restaurantMenuType);

app.get('/get/mealo/:id', get.mealo);
app.get('/getmealo', get.allmealos);

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
    }); 
});

//login code
app.get('/login',  function(req, res) {
  res.render('login');
});

passport.use(new LocalStrategy(function(username, password,done){
     if (connect) {
        var queryString = 'SELECT username, password FROM user WHERE username = ?';
        connect.query(queryString, [username,username], function(err, rows, fields) {
            if (err) throw err;
			if (rows.length > 0) {
				pass = rows[0].password;
				if (passwordHash.verify(password, pass)) {
					done(null, user);
				}
				else {
					return done(null, false, {message: 'Incorrect password'});
				}
			}
			else {
				return done(null, false, { message: 'Incorrect username.' });
			}
        });
    }
}));

passport.serializeUser(function(user, done) {
    done(null, 1);
});

passport.deserializeUser(function(id, done) {
    done(null, 1);
});


app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'}));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
