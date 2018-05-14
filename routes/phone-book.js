var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const fs = require('fs');

    let rawdata = fs.readFileSync('phone-book.json');
    let phoneBooks = JSON.parse(rawdata);
    res.json(phoneBooks);
});

router.post('/add', function(req, res, next) {
    // read
    const fs = require('fs');

    let rawdata = fs.readFileSync('phone-book.json');
    let phoneBooks = JSON.parse(rawdata);

    // update
    phoneBooks.push({
        id: 100, // TODO
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

module.exports = router;
