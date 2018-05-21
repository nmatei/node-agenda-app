var express = require('express');
var mysql = require('mysql');
var router = express.Router();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "web2"
});

router.get('/', function(req, res, next) {
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM phone_book", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
        });
    });
});

router.post('/add', function(req, res, next) {
    // read
    const fs = require('fs');

    let rawdata = fs.readFileSync('phone-book.json');
    let phoneBooks = JSON.parse(rawdata);

    // update
    phoneBooks.push({
        id: new Date().getTime(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    });

    // save
    let data = JSON.stringify(phoneBooks, null, 2);
    fs.writeFileSync('phone-book.json', data);

    // return
    //res.json(phoneBooks);

    res.writeHead(301,
        {Location: '/phone-book.html'}
    );
    res.end();

});

router.post('/delete', function(req, res, next) {
    // read
    const fs = require('fs');

    let rawdata = fs.readFileSync('phone-book.json');
    let persons = JSON.parse(rawdata);

    const id = parseInt(req.body.id);

    persons = persons.filter(function(person) {
        return person.id !== id;
    });

    // save
    let data = JSON.stringify(persons, null, 2);
    fs.writeFileSync('phone-book.json', data);

    res.json(persons);
});

router.post('/update', function(req, res, next) {
    // read
    const fs = require('fs');

    let rawdata = fs.readFileSync('phone-book.json');
    let persons = JSON.parse(rawdata);

    const id = parseInt(req.body.id);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;

    let editPerson = persons.find(function (person) {
        return person.id === id;
    });
    editPerson.firstName = firstName;
    editPerson.lastName = lastName;
    editPerson.phone = phone;

    // save
    let data = JSON.stringify(persons, null, 2);
    fs.writeFileSync('phone-book.json', data);

    res.json(persons);
});

module.exports = router;
