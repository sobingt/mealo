
/*
 * GET home page.
 */


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.createmealo = function(req, res){
  res.render('createmealo', { title: 'Express' });
};