var express = require('express');
var mysql = require('mysql');
var router = express.Router();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "phone_book"
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if(err) throw err;
    const sql = "SELECT * FROM contacts";
    connection.query(sql, function(err, results) {
      if(err) throw err;
      console.log(results);
      res.json(results);
    })
  })
});

// /contacts/delete?id=3
router.get('/delete', function(req, res, next) {
  var id = req.query.id;

  pool.getConnection(function(err, connection) {
    if(err) throw err;
    const sql = `DELETE FROM contacts WHERE id=${id}`;
    connection.query(sql, function(err, results) {
      if(err) throw err;
      console.log(results);
      //res.json({success: true});
      // TODO please redirect to agenda.html
      res.redirect('/agenda.html');
    })
  })
});

// /contacts/create
router.post('/create', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if(err) throw err;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phone = req.body.phone;
    const sql = `INSERT INTO contacts (id, firstName, lastName, phone) VALUES (NULL, '${firstName}', '${lastName}', '${phone}');`;
    connection.query(sql, function(err, results) {
      if(err) throw err;
      console.log(results);
      res.json({success: true});
    })
  });  
});

// /contacts/update
router.post('/update', function(req, res, next) {
  var id = req.query.id;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var phone = req.body.phone;

  pool.getConnection(function(err, connection) {
    if(err) throw err;
    const sql = `UPDATE contacts SET firstName='${firstName}', lastName='${lastName}', phone='${phone}' WHERE id=${id}`;
    connection.query(sql, function(err, results) {
      if(err) throw err;
      console.log(results);
      res.json({success: true});
    })
  })
});

module.exports = router;
