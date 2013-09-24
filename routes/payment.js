var http = require('http')
    , config = require('../config')
    ,crypto = require('crypto')
    ,request = require('request');
    
    
exports.pay = function(req, res, next){
    if(config.payment.apiversion==2)
        var seed =config.payment.key+"|"+req.transId+"|"+req.amount+"|"+config.payment.offerkey+"|"+config.payment.apiversion+"|"+config.payment.salt;
    else if(config.payment.apiversion==1)
        var seed =config.payment.key+"|"+req.transId+"|"+req.amount+"|"+req.name+"|"+req.fname+"|"+req.email+"|"+config.payment.salt;
    //Sha512(key|txnid|amount|offer_key|api_version|<SALT>)
    //sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||<SALT>)
    var hashKey = crypto.createHash('sha512').update(seed).digest("hex");
    
    request.post(config.payment.posturl,
    { 
        form: {
            key:config.payment.key,
            txnid:req.transId,
            amount:req.amount,
            productinfo:req.name,
            firstname:req.fname,
            email:req.email,
            phone:req.mobile,
            surl:config.payment.successurl,
            furl:config.payment.failureurl,
            hash:hashKey,
            offer_key:config.payment.offerkey,
            api_version:config.payment.apiversion
            }
    },
    function (error, response, body) {
                //console.log(response);
                //console.log(response.request.response.headers.location);
                res.writeHead(301,{Location: response.request.response.headers.location});
                //res.send(response);
                res.end();
    });


}

exports.testprepay = function(req, res, next){
req.transId=1231434234;
req.amount=1000;
req.name="Sobin Mealo";
req.fname="Sobin";
req.email="sobingt@gmail.com";
req.mobile=9969569927;
next();
}