const moment = require("moment");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const connection = require("../startup/db.config");
const mg = require("nodemailer-mailgun-transport");
const fromMail = "no-reply@mail.parkoq.nu";
const nodemailer = require("nodemailer");
const crypto = require("crypto");

moment().format();

const host = process.env.HOST; // FRONTEND Host
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const auth = {
    auth: {
        api_key: "key-ce8f7b95a6e9cf6483d2c00e34a4a9e6",
        domain: "info.parkoq.nu",
    },
    host: "api.eu.mailgun.net",
};
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

moment().format();
//  Input : username/password via body
//  HTTP Success : 200, message and user infos.
//  HTTP Errors : 400, 401.
router.post("/createUser", (req, res, next) => {
    const { building, apartment, password, company } = req.body;
    if (!apartment) {
        return res
            .status(400)
            .send({ error: true, message: "please provide apartment" });
    }
    var salt = bcrypt.genSaltSync(10);
    var hashedpassword = bcrypt.hashSync(password, salt);
    var last_login_date = moment().format();
    var created_date = moment().format();
    connection.query(
        "INSERT INTO apartmentmaster (building, apartment, password, last_login_date, created_date, company) VALUES (?, ?, ?, ?, ?, ?)",
        [
            building,
            apartment,
            hashedpassword,
            last_login_date,
            created_date,
            company,
        ],
        function (error, results, fields) {
            if (error) throw error;
            res
                .status(200)
                .send({ error: true, message: `New apartment added, ${apartment}` });
        }
    );
});
// router.update("/apartmentChangePassword", (req, res, next) => {
//     const { building, apartment, password, company } = req.body;
//     connection.query('UPDATE apartmentmaster SET password = ? WHERE apartment = ? AND building = ?);', [building, apartment, hashedpassword, last_login_date, created_date, company], function (error, results, fields) {
//         if (error) throw error;
//         res.status(200).send({ error: true, message: `New apartment added, ${apartment}` })
//     });

// });
router.post("/getUser", (req, res) => {
    const { building, apartment, password } = req.body;

    connection.query(
        "SELECT password, apartment, building FROM apartmentmaster WHERE apartment = ? AND building = ?",
        [apartment, building],
        function (error, results, fields) {
            if (error) throw error;
            let hashedpassword = results[0].password;
            let test = bcrypt.compareSync(password, hashedpassword); // true
            let jwtToken = jwt.sign(
                {
                    data: results[0],
                },
                "secret",
                { expiresIn: 600000 * 60 }
            );
            let list = [];
            let myJson = {
                apartment: results[0].apartment,
                building: results[0].building,
                jwt: jwtToken,
            };
            list.push(myJson);
            console.log(list);
            // const result = arr.map(x => {
            //     return {
            //         id: x._id,
            //         name: x.room,

            //     };
            // });
            if (test === true) {
                res.status(200).send(myJson);
            } else {
                res.status(501).send({ success: false });
            }
        }
    );
});
router.get("/getApartmentCompany/:company", (req, res) => {
    connection.query(
        "SELECT * FROM apartmentmaster WHERE company = ?",
        [req.params.company],
        function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        }
    );
});
router.post("/createBuilding", (req, res, next) => {
    const { building, company } = req.body;
    if (!building) {
        return res
            .status(400)
            .send({ error: true, message: "please provide building" });
    }
    connection.query(
        "INSERT INTO buildingmaster (building, company) VALUES (?, ?)",
        [building, company],
        function (error, results, fields) {
            if (error) throw error;
            res
                .status(200)
                .send({ error: false, message: `New building added, ${building}` });
        }
    );
});
router.get("/getBuildingCompany/:company", (req, res) => {
    connection.query(
        "SELECT * FROM buildingmaster WHERE company = ?",
        [req.params.company],
        function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        }
    );
});
router.post("/createCustomerUser", (req, res, next) => {
    const { company, firstName, lastName, email, password } = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hashedpassword = bcrypt.hashSync(password, salt);
    var updatedAt = moment().format();
    var createdAt = moment().format();
    if (!company) {
        return res
            .status(400)
            .send({ error: true, message: "please provide company" });
    }
    connection.query(
        "SELECT email, company FROM customeruser WHERE company = ?",
        [company],
        function (error, results, fields) {
            if (error) throw error;
            let nbrOfRows = results.length
            console.log(nbrOfRows);
            if (nbrOfRows === 0) {
                connection.query(
                    "INSERT INTO customeruser ( company, firstName, lastName, email, password, createdAt, updatedAt ) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [company, firstName, lastName, email, hashedpassword, createdAt, updatedAt],
                    function (error, results, fields) {
                        if (error) throw error;
                        let token = crypto.randomBytes(16).toString("hex")
                        connection.query(
                            "INSERT INTO tokens ( email, token, createdAt ) VALUES (?, ?, ?)",
                            [email, token, createdAt],
                            function (error, results, fields) {
                                if (error) throw error;
                                console.log(results[0])
                            }
                        );
                        const message = {
                            to: email,
                            from: fromMail,
                            subject: "Email Verification",
                            text: "Some useless text",
                            html: `<p>Please verify your account by clicking the link: 
                    <a href="http://${host}/account/confirm/${token}">http://${host}/account/confirm/${token}</a> </p>`,
                        };
                        nodemailerMailgun
                            .sendMail(message)
                            .then(() => {
                                return res
                                    .status(200)
                                    .json({ message: "A verification mail has been sent." });
                            })
                            .catch((error) => {
                                return res
                                    .status(500)
                                    .json({ message: `Impossible to send email to ${email}` });
                            });
                    }
                );

            } else {
                res.status(400).send({ error: true, message: "user already exists" })
            }
        }
    )


});

module.exports = router;
