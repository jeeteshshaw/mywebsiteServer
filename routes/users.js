var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/',function(req, res, next) {
  res.render("response")
});


var loginHandler =  require('./users/login');
var signupHandler = require('./users/signup');
var valifyToken = require('./varifyToken');
// create application/x-www-form-urlencoded parser
router.use('/login', loginHandler);
router.use('/signup', signupHandler);
router.use('/auth', valifyToken);




module.exports = router;
