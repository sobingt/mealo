var alphamail=require('alphamail');

var emailService = new alphamail.EmailService("5232c205d5ac06-55939110");

//Generic function to send email,

exports.email=function(id){

	var payload = new alphamail.EmailMessagePayload()
    .setProjectId(id) // ID of your AlphaMail project
    .setSender(new alphamail.EmailContact("Mealo Team","testtanmay03@gmail.com"))
    .setReceiver(new alphamail.EmailContact("Founder","support@mealo.in"));

emailService.queue(payload, function(error, result){
    if(error){
        console.log(error);
        return;
    }
    console.log("Email sent! ID = " + result);
	
});

};









