var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'agenda'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.getConnection((err, connection) => {
    const sql = `SELECT * FROM contacts`;
    connection.query(sql, (err, results) => {
      res.json(results);
      connection.release();
    });
  });
});

// http://localhost:3000/users/add
router.post('/add', function(req, res, next) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var phone = req.body.phone;
  console.warn('add', firstName, lastName, phone);
  
  pool.getConnection((err, connection) => {
    const sql = `INSERT INTO contacts (id, firstName, lastName, phone) VALUES (NULL, '${firstName}', '${lastName}', '${phone}');`;
    console.log(sql);
    connection.query(sql, (err, result) => {
      const id = result.insertId;
      res.json({
        success: true,
        id,
        message: 'Done!'
      });
      connection.release();
    });
  });
});


router.put('/update', function(req, res, next) {
  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  console.warn('update', id, firstName, lastName, phone);
  
  pool.getConnection((err, connection) => {
    const sql = `UPDATE contacts SET firstName = '${firstName}', lastName = '${lastName}', phone = '${phone}' WHERE id = ${id}`;
    console.log(sql);
    connection.query(sql, (err, results) => {
      res.json({
        success: true,
        id,
        message: 'Done!'
      });
      connection.release();
    });
  });
});

router.delete('/delete', function(req, res, next) {
  var id = req.body.id;
  console.warn('remove person', id);
  
  pool.getConnection((err, connection) => {
    const sql = `DELETE FROM contacts WHERE id = ${id}`;
    console.log(sql);
    connection.query(sql, (err, results) => {
      res.json({
        success: true,
        message: 'Done!'
      });
      connection.release();
    });
  });
});

module.exports = router;
