var http = require('http')
    , config = require('../config')
    ,crypto = require('crypto')
    ,request = require('request');
    
    
exports.pay = function(req, res, next){
    if(config.payment.apiversion==2)
        var seed =config.payment.key+"|"+req.body.transId+"|"+req.body.amount+"|"+config.payment.offerkey+"|"+config.payment.apiversion+"|"+config.payment.salt;
    else if(config.payment.apiversion==1)
        var seed =config.payment.key+"|"+req.body.transId+"|"+req.body.amount+"|"+req.body.productinfo+"|"+req.userdata.fname+"|"+req.userdata.email+"|"+config.payment.salt;
    //Sha512(key|txnid|amount|offer_key|api_version|<SALT>)
    //sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||<SALT>)
    var hashKey = crypto.createHash('sha512').update(seed).digest("hex");
    console.log(config.payment.key);
    console.log(req.body.transid);
    console.log(req.body.amount);
    console.log(req.body.productinfo);
    console.log(req.userdata.fname);
    console.log(req.userdata.email);
    console.log(req.body.mobile);
    console.log(hashKey);
    console.log(config.payment.offerkey);
    console.log(config.payment.apiversion);
    
    request.post(config.payment.posturl,
    { 
        form: {
            key:config.payment.key,
            txnid:req.body.transid,
            amount:req.body.amount,
            productinfo:req.body.productinfo,
            firstname:req.userdata.fname,
            email:req.userdata.email,
            phone:req.mobile,
            surl:config.payment.successurl,
            furl:config.payment.failureurl,
            hash:hashKey,
            udf1:req.body.transid,
            udf2:req.body.mealoid,
            offer_key:config.payment.offerkey,
            api_version:config.payment.apiversion
            }
    },
    function (error, response, body) {
                console.log("REQ");
                console.log(response.request.response.headers.location);
                //console.log(response.request.response.headers);
                //res.redirect(301, response);
                res.writeHead(301,{Location: response.request.response.headers.location});
                res.end();
    });


}

exports.success = function(req, res, next){
    var queryString="UPDATE transaction SET status = 'complete', paymentid=? WHERE  transaction.id =?;";
	connection.query(queryString,[req.body.mihpayid,req.body.txnid],function(err, rows) {
    if (err) 
    {
        throw err;
    }
    else
	{
        queryString="UPDATE mealo SET status = 'complete' WHERE id =?;";
        connection.query(queryString,[req.body.udf2],function(err, rows) {
        if (err) 
        {
            throw err;
        }
        else
        {
            res.redirect(301, 'mealo/'+req.body.udf2);
            res.end();
        }
        });
    
    }


    });
}

exports.fail = function(req, res, next){
    var queryString="UPDATE transaction SET status = 'cancelled', paymentid=? WHERE  transaction.id =?;";
	connection.query(queryString,[req.body.mihpayid,req.body.txnid],function(err, rows) {
    if (err) 
    {
        throw err;
    }
    else
	{
        res.redirect(301, '/');
        res.end();
    }


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

/**
{ mihpayid: '403993715508504560',
  mode: '',
  status: 'failure',
  unmappedstatus: 'userCancelled',
  key: 'C0Dr8m',
  txnid: '10010080',
  amount: '1131.00',
  discount: '0.00',
  addedon: '2013-09-30 04:42:14',
  productinfo: 'fdgdfgdf',
  firstname: 'Sobin',
  lastname: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  country: '',
  zipcode: '',
  email: 'sobingt@gmail.com',
  phone: '',
  udf1: '10010080',
  udf2: '26',
  udf3: '',
  udf4: '',
  udf5: '',
  udf6: '',
  udf7: '',
  udf8: '',
  udf9: '',
  udf10: '',
  hash: '86a81d65a7066e5e4bd01ae53c1bfd0d55eb090a9bfb222c82c82f3e5c0955d7c957ce7499ba8719e665ec95be013de0065444704641baf
3cdc5b4c8e2b27b26',
  field1: '',
  field2: '',
  field3: '',
  field4: '',
  field5: '',
  field6: '',
  field7: '',
  field8: '',
  field9: 'Cancelled by user',
  PG_TYPE: '',
  bank_ref_num: '',
  bankcode: '',
  error: '',
  'error Message': '',
  offer: '123456',
  offer_type: '' }
***/
