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

module.exports = router;
