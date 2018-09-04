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
        connection.query("SELECT * FROM warranties", function (err, result, fields) {
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

        const name = req.body.name;
        const serialNumber = req.body.serialNumber;
        const acquisitionDate = req.body.acquisitionDate;
        const warrantyMonths = req.body.warrantyMonths;

        let sql = `INSERT INTO warranties (name, serialNumber, acquisitionDate, warrantyMonths) VALUES ('${name}', '${serialNumber}', '${acquisitionDate}', ${warrantyMonths})`;
        connection.query(sql, function (err, result, fields) {
            connection.release();
            if (err) throw err;
            console.log(sql);
            console.log(result);
            res.json({success: true});
        });
    });
});

router.post('/delete', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        if (err) throw err;

        const id = parseInt(req.body.id);

        let sql = `DELETE FROM warranties WHERE id = ${id}`;
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
        const name = req.body.name;
        const serialNumber = req.body.serialNumber;
        const acquisitionDate = req.body.acquisitionDate;
        const warrantyMonths = req.body.warrantyMonths;

        let sql = `UPDATE warranties SET name = '${name}', serialNumber = '${serialNumber}', acquisitionDate = '${acquisitionDate}', warrantyMonths = ${warrantyMonths} WHERE id = ${id}`;
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
