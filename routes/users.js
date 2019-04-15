var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// http://localhost:3000/users/add
router.post('/add', function(req, res, next) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var phone = req.body.phone;
  console.warn('add', firstName, lastName, phone);
  // TODO save this data in persons.json
  res.json({
    success: true,
    message: 'TODO'
  });
});

module.exports = router;
