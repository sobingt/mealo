// Facebook app config for tests
module.exports = {
  facebook: {
    client_id:      '160625610780207',
    client_secret:  'be91a962a85077f202a60ed2dcc89947',
    scope:      'email, user_about_me, user_birthday, user_location, publish_stream, read_stream, friends_location',
    redirect_uri:   'http://localhost:3000/'
  }
  database: {
    host:       'localhost',
    user:       'root',
    password:   'root',
    database:   'mealo'
  }

};