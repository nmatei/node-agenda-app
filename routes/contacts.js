var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// /contacts/delete?phone=1234
router.get('/delete', function(req, res, next) {
  var phone = req.query.phone;

  var content = fs.readFileSync('public/data/contacts.json');
  var contacts = JSON.parse(content);

  var remainingContacts = contacts.filter(function(contact){
    return contact.phone != phone;
  });

  content = JSON.stringify(remainingContacts, null, 2);
  fs.writeFileSync('public/data/contacts.json', content);
  
  //res.json({success: true});
  // TODO please redirect to agenda.html
  res.redirect('/agenda.html');
});

// /contacts/create
router.post('/create', function(req, res, next) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var phone = req.body.phone;

  var content = fs.readFileSync('public/data/contacts.json');
  var contacts = JSON.parse(content);

  contacts.push({
      firstName,
      lastName,
      phone
  });

  content = JSON.stringify(contacts, null, 2);
  fs.writeFileSync('public/data/contacts.json', content);
  
  res.json({success: true});
});

// /contacts/update
router.post('/update', function(req, res, next) {
  var oldPhone = req.query.phone; // TODO id
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var phone = req.body.phone;

  var content = fs.readFileSync('public/data/contacts.json');
  var contacts = JSON.parse(content);

  // update... (v1)
  var contact = contacts.find(function(contact){
    return contact.phone == oldPhone;
  });
  contact.firstName = firstName;
  contact.lastName = lastName;
  contact.phone = phone;
  // TODO update... (v2);

  content = JSON.stringify(contacts, null, 2);
  fs.writeFileSync('public/data/contacts.json', content);
  
  res.json({success: true});
});

module.exports = router;
