$( document ).ready(function() {
/*
$('#loginfrm form').submit(function(){
    var username = $('#loginfrm form #username').val();
    var password = $('#loginfrm form #password').val();
    
    var $form = $(this);
    //var dataString = 'username='+ username + '&passsword=' + password;  
    var dataString = $form.serialize();
console.log(dataString);
 $.ajax({
    type: "POST",
    dataType: "json",
    data: dataString,
    beforeSend: function(x) {
         $('#imgProgress').show();
         $('#loginform').addClass('transparent');
         $("#loginform :input").attr("disabled", true);
    },
    url: '../auth/',
    success: function(data) {
        // 'data' is a JSON object which we can access directly.
        // Evaluate the data.success member and do something appropriate...
        //$('#loginresult').html(data[0].error);
        console.log(data);
        //$('#imgProgress').delay(1000).fadeOut();
        //$('#loginform').delay(1000).removeClass('transparent');

        if (typeof data.error != 'undefined')
        {
            $('#loginresult').html("<b>Wrong username and password.</b>");
            $('#loginform').removeClass('transparent');
            $("#loginform :input").attr("disabled", false);
        }
        else
        {
            $('#loginresult').html("<b>loading data.</b>");
            
            $('#imgProgress').delay(1000).fadeOut();
        }
    }
});

});
*/
});

function loginform(username, password)
{



}