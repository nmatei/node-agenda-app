var express = require('express');
var fs = require('fs');
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
  
  var persons = require('../public/data/persons.json');
  //var strPersons = fs.readFileSync('./public/data/persons.json');
  //var persons = JSON.parse(strPersons);
  
  const id = new Date().getTime();
  persons.push({
    id,
    firstName,
    lastName,
    phone
  });
  
  var str = JSON.stringify(persons, null, 2);
  fs.writeFileSync('./public/data/persons.json', str);

  res.json({
    success: true,
    id,
    message: 'Done!'
  });
});


router.put('/update', function(req, res, next) {
  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  console.warn('update', id, firstName, lastName, phone);
  
  var persons = require('../public/data/persons.json');
  
  const person = persons.find((p) => {
    return p.id == id;
  });
  person.firstName = firstName;
  person.lastName = lastName;
  person.phone = phone;
  
  var str = JSON.stringify(persons, null, 2);
  fs.writeFileSync('./public/data/persons.json', str);

  res.json({
    success: true,
    id,
    message: 'Done!'
  });
});

router.delete('/delete', function(req, res, next) {
  var id = req.body.id;
  console.warn('remove person', id);
  
  var persons = require('../public/data/persons.json');
  
  var remainingPersons = persons.filter(function(person) {
    return person.id != id; 
  });
  
  var str = JSON.stringify(remainingPersons, null, 2);
  fs.writeFileSync('./public/data/persons.json', str);

  res.json({
    success: true,
    message: 'Done!'
  });
});

module.exports = router;
