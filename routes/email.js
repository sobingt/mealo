var alphamail=require('alphamail'),
    config=require('../config.js');

var emailService = new alphamail.EmailService("523934f4916131-27041132");

//Generic function to send email,

exports.email=function(id,to,data){

	var payload = new alphamail.EmailMessagePayload()
    .setProjectId(id) // ID of your AlphaMail project
    .setSender(new alphamail.EmailContact(config.mail.fromAuthor,config.mail.from))
    .setReceiver(new alphamail.EmailContact("User",to))
	.setBodyObject(data)

emailService.queue(payload, function(error, result){
    if(error){
        console.log(error);
        return;
    }
    console.log("Email sent! ID = " + result);
	
});

};

exports.mealoRegistration=function(link,email){
		var id=config.mail.mealoRegistrationId;
		var data={
			"link":link
			};
		exports.email(id,email,data);
};

exports.mealoWelcome=function(name,email){
	var id=config.mail.mealoWelcomeId;
	var data={
		"name":name
		};
	exports.email(id,email,data);
};

exports.mealoCreationToHost=function(name,restaurantName,menuType,mealoTime,email){
	var id=config.mail.mealoCreationToHostId;
	var data={
		"name":name,
		"restaurantName":restaurantName,
		"menuType":menuType,
		"mealoTime":mealoTime
		};
	exports.email(id,email,data);
};


exports.newAttendeToHost=function(hostName,attendeName,mealoTime,email){
	var id=config.mail.newAttendeToHostId;
	var data={
		"hostName":hostName,
		"attendeName":attendeName,
		"mealoTime":mealoTime
		};
	exports.email(id,email,data);
};

exports.attendeCancelToHost=function(hostName,attendeName,mealoTime,email){
	var id=config.mail.attendeCancelToHostId;
	var data={
		"hostName":hostName,
		"attendeName":attendeName,
		"mealoTime":mealoTime
		};
	exports.email(id,email,data);
};

exports.mealoCancelToAttende=function(hostName,attendeName,mealoTime,email){
	var id=config.mail.mealoCancelToAttendeId;
	var data={
		"hostName":hostName,
		"attendeName":attendeName,
		"mealoTime":mealoTime
		};
	exports.email(id,email,data);
};

exports.mealoConfirmToRestaurant=function(restaurantName,mealoTime,menuType,noOfAttendes,email){
	var id=config.mail.mealoConfirmToRestaurantId;
	var data={
		"restaurantName":restaurantName,
		"mealoTime":mealoTime,
		"menuType" :menuType,
		"noOfAttendes" :noOfAttendes
		};
	exports.email(id,email,data);
};

exports.mealoReminder=function(restaurantName,mealoTime,attendeName,email){
	var id=config.mail.mealoReminderId;
	var data={
		"restaurantName":restaurantName,
		"mealoTime":mealoTime,
		"attendeName":attendeName
		};
	exports.email(id,email,data);
};

exports.forgotPassword=function(userName,link,email){
	var id=config.mail.mealoForgetPasswordId;
	var data={
		"username":userName,
		"link":link
		};
	exports.email(id,email,data);
};






