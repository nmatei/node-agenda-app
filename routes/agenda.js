var express = require('express');
var mysql = require('mysql');
var router = express.Router();

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "web2"
});

router.get('/', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query("SELECT * FROM phone_book", function (err, result, fields) {
            connection.release();
            if (err) throw err;
            console.log(result);
            res.json(result);
        });
    });
});

router.post('/add', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        if (err) throw err;

        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const phone = req.body.phone;

        let sql = `INSERT INTO phone_book (firstName, lastName, phone) VALUES ('${firstName}', '${lastName}', '${phone}')`;
        connection.query(sql, function (err, result, fields) {
            connection.release();
            if (err) throw err;
            console.log(sql);
            console.log(result);
            //res.json({success: true});
            res.writeHead(301,
                {Location: '/phone-book.html'}
            );
            res.end();
        });
    });
});

router.post('/delete', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        if (err) throw err;

        const id = parseInt(req.body.id);

        let sql = `DELETE FROM phone_book WHERE id = ${id}`;
        connection.query(sql, function (err, result, fields) {
            connection.release();
            if (err) throw err;
            console.log(sql);
            console.log(result);
            res.json({success: true});
        });
    });
});

router.post('/update', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        if (err) throw err;

        const id = parseInt(req.body.id);
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const phone = req.body.phone;

        let sql = `UPDATE phone_book SET firstName = '${firstName}', lastName = '${lastName}', phone = '${phone}' WHERE id = ${id}`;
        connection.query(sql, function (err, result, fields) {
            connection.release();
            if (err) throw err;
            console.log(sql);
            console.log(result);
            res.json({success: true});
        });
    });
});

module.exports = router;
