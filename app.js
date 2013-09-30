
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , config = require('./config')
  , user = require('./routes/user')
  , admin = require('./routes/admin')
  , mealo = require('./routes/mealo')
  , get = require('./routes/get')
  ,testemail=require('./routes/testemail')
  , put = require('./routes/put')
  , auth = require('./routes/auth')
  , payment = require('./routes/payment')
  , upload = require('./routes/upload')
  , invoice = require('./routes/invoice')
  , facebook = require('./routes/facebook')
  //, mealoJson = require('./routes/json')
  , http = require('http')
  , path = require('path')
  , mysql = require('mysql')
  , fs = require('fs')
  , gm = require('googlemaps')
  , hbs = require('hbs')
  , util = require('util')
  , connect = require('express/node_modules/connect')
  , parseCookie = connect.utils.parseCookie
  , MemoryStore = connect.middleware.session.MemoryStore
  , store;

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
app.use( express.cookieParser() );
app.use(express.session({
    secret: 'secret'
    , key: 'express.sid'
    , store: store = new MemoryStore()
    , expires: new Date(Date.now() + (30 * 86400 * 1000))
  }));
app.use(app.router);
app.use(function(req, res, next){
        res.locals.session = req.session;
        next();
});


app.use(express.static(path.join(__dirname, 'public')));


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


hbs.registerHelper("limit", function(index_count,limit,block) {
  if(parseInt(index_count)< limit-1 )
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

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartial('headPartial', 'header');
hbs.registerPartial('searchPartial', 'search');
hbs.registerPartial('loginPartial', 'login');
hbs.registerPartial('createmealoPartial', 'createmealo');


var access = fs.createWriteStream(__dirname + '/node.access.log', { flags: 'a' })
      , error = fs.createWriteStream(__dirname + '/node.error.log', { flags: 'a' });

app.get('/pay', payment.testprepay, payment.pay);

app.get('/',routes.mealos,routes.restaurants,routes.index);
app.get('/test', function (req, res) {
  res.send(req.session.email+"is in");
});
app.get('/test', function (req, res) {
  res.send(req.session.email+"is in");
});

app.get('/testing', function (req, res) {
  req.session.value = "Cookies Babbys"
  req.session.email = "Cookies Babbys"
  res.send(req.session.email+ " " + req.session.auth_token);
});

app.get('/reset/:hashkey',get.resetPassword);
app.get('/resetpassword/:uid',user.setNewPassword);
app.post('/resetpassword/:uid',user.setNewPasswordConfirm);
app.get('/login',user.isAuthTokenValid, user.hasAuthToken, user.login);
app.get('/register',user.register);
app.post('/register',user.insertUser);
app.get('/activate/:hashkey',user.activateUser);
app.get('/forgetpassword',user.forgetPassword);
app.post('/forgetpassword',user.resetPassword);
app.post('/login', user.auth, user.hasAuthToken, user.requestForAuthToken);
app.post('/auth', auth.login);
app.get('/auth/facebook', facebook.authfacebook, facebook.getuser, facebook.createuser);
//app.get('/auth', auth.authredirect);

app.get('/testing', function (req, res) {
  req.session.value = "Cookies Babbys"
  req.session.email = "Cookies Babbys"
  res.send(req.session.email+ " " + req.session.auth_token);
});


//ADDING CODE TO SEND AN EMAIL:

var alphamail=require('alphamail');

var emailService = new alphamail.EmailService("5232c205d5ac06-55939110");
	
app.get('/email', function(req,res) {

var data={
	name:"sobin"
};

var payload = new alphamail.EmailMessagePayload()
    .setProjectId(2916) // ID of your AlphaMail project
    .setSender(new alphamail.EmailContact("Bit Brothers", "testtanmay03@gmail.com"))
    .setReceiver(new alphamail.EmailContact("Founder", "sobingt@gmail.com"))
    .setBodyObject(data);

emailService.queue(payload, function(error, result){
    if(error){
        console.log(error);
        return;
    }
    console.log("Email sent! ID = " + result);
});



});

// middleware
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + "/public/uploads" }))

//END OF ADDITION

//adding for email:

//app.get('/test/welcome',testemail.welcomeToMealo);
//app.get('/test/registration',testemail.testRegistration);



//end of addition for email

app.post('/search', routes.search);
app.get('/invoice', invoice.invoice);
app.get('/create/mealo',routes.mealos,routes.restaurants,routes.index);

app.post('/create/mealo',user.getuser, routes.uploadfile, routes.createmealo, invoice.createinvoice, invoice.invoice);
app.post('/pay/mealo', user.getuser, payment.pay);
app.post('/pay/success', payment.success);
app.post('/pay/fail', payment.fail);

app.get('/mealo', mealo.index);
app.get('/mealo/:id',get.getMealo,get.getAttendes,get.getRole,mealo.mealo);

app.get('/mealo/:id/failed', mealo.mealo);
app.get('/mealo/:id/booking'/*,user.isAuthed*/, mealo.bookingmealo);
app.get('/mealo/:id/booked', mealo.bookedmealo);
app.get('/:city/mealo/new', mealo.createmealo);
app.post('/:city/mealo/new', mealo.createmealopost);
app.get('/users', user.list);
app.get('/user/:id', user.profile);
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
app.get('/get/restaurants/menu', get.allRestaurantMenu);
app.get('/get/restaurants/menu/:type', get.allRestaurantMenuType);

app.get('/get/search/:search', get.searchmealo);

app.get('/get/mealo/:id', get.mealo);
app.get('/get/mealo/attendes/:id', get.attendes);
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

app.get('/:token/session', function(req, res1) {

	req.session.auth_token=req.params.auth_token;
    res1.send("OK")
    res1.end()
   
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
