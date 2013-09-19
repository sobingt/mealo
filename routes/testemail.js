var testemail=require('./email.js');

exports.welcomeToMealo=function() {
	var id=2919;
	testemail.email(id);
};

exports.testRegistration=function() {
	var id=2926;
	testemail.email(id);
};

exports.registerForMealo=function() {
	var id=2918;
	testemail.email(id);
};

exports.mealoCreated=function() {
	var id=2920;
	testemail.email(id);
};

exports.personJoined=function() {
	var id=2921;
	testemail.email(id);
};

exports.mealoToRestaurant=function() {
		var id=2922;
		testemail.email(id);
};

exports.personCanceled=function() {
	var id=2923;
	testemail.email(id);
};

exports.mealoCanceled=function() {
	var id=2924;
	testemail.email(id);
};

exports.mealoCanceledToRestaurant=function() {
	var id=2925;
	testemail.email(id);
};

exports.mealoConfirmationToRestaurant=function() {
	var id=2926;
    testemail.email(id);
};

exports.mealoReminder=function() {
	var id=2927;
	testemail.email(id);
};