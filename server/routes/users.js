const moment = require("moment");
const express = require("express");
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const connection = require('../startup/db.config')

moment().format();
//  Input : username/password via body
//  HTTP Success : 200, message and user infos.
//  HTTP Errors : 400, 401.
router.post("/createUser", (req, res, next) => {
    const { building, apartment, password, company } = req.body;
    if (!apartment) {
        return res.status(400).send({ error: true, message: "please provide apartment" })
    }
    var salt = bcrypt.genSaltSync(10);
    var hashedpassword = bcrypt.hashSync(password, salt);
    var last_login_date = moment().format();
    var created_date = moment().format();
    connection.query('INSERT INTO apartmentmaster (building, apartment, password, last_login_date, created_date, company) VALUES (?, ?, ?, ?, ?, ?)', [building, apartment, hashedpassword, last_login_date, created_date, company], function (error, results, fields) {
        if (error) throw error;
        res.status(200).send({ error: true, message: `New apartment added, ${apartment}` })
    });

});
// router.update("/apartmentChangePassword", (req, res, next) => {
//     const { building, apartment, password, company } = req.body;
//     connection.query('UPDATE apartmentmaster SET password = ? WHERE apartment = ? AND building = ?);', [building, apartment, hashedpassword, last_login_date, created_date, company], function (error, results, fields) {
//         if (error) throw error;
//         res.status(200).send({ error: true, message: `New apartment added, ${apartment}` })
//     });

// });
router.post('/userlogin', (req, res) => {
    const { building, apartment, password } = req.body;
    console.log('something')
    connection.query('SELECT password, apartment, building FROM apartmentmaster WHERE apartment = ? AND building = ?', [apartment, building], function (error, results, fields) {
        if (error) throw error;
        let hashedpassword = results[0].password
        let test = bcrypt.compareSync(password, hashedpassword); // true
        let jwtToken = jwt.sign({
            data: results[0]
        }, 'secret', { expiresIn: 600000 * 60 });
        let list = [];
        let myJson = {
            "apartment": results[0].apartment,
            "building": results[0].building,
            "jwt": jwtToken
        }
        list.push(myJson);
        console.log(list)
        // const result = arr.map(x => {
        //     return {
        //         id: x._id,
        //         name: x.room,

        //     };
        // });
        if (test === true) {
            res.status(200).send(myJson);
        } else {
            res.status(501).send({ "success": false });
        }
    });
})


module.exports = router;
