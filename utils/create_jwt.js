// Create an internal JWT

var jwt = require('jsonwebtoken');

var body = {
  "hello": "world"
}

var myJWT = jwt.sign(body, "password");

console.log(myJWT);
