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
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res
      .status(400)
      .send({ error: true, message: "please provide email" });
  }

  connection.query(
    "SELECT * FROM companyuser WHERE email = ?",
    [email],
    function (error, results, fields) {
      if (error) throw error;
      let comparePassword = bcrypt.compareSync(password, results[0].password);
      if (comparePassword === true) {
        req.session.userId = results[0].id;
        req.session.user = results[0];
        console.log(req.session.user);
        res.status(200).send({ message: "Login success", user: results[0] });
      }
    }
  );
});

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
  var update_time = moment().format();
  try {
    connection.query(
      "SELECT * FROM apartmentmaster WHERE company = ? AND apartment = ? AND building = ?",
      [company, apartment, building],
      function (error, results, fields) {
        if (results.length) {
          console.log("already exist");
          res.status(400).send({
            error: false,
            message: "already exist",
          });
        } else {
          connection.query(
            "INSERT INTO apartmentmaster (building, apartment, password, company ) VALUES (?, ?, ?, ?)",
            [
              building,
              apartment,
              hashedpassword,
              company
            ],
            function (error, results, fields) {
              if (error) throw error;
              res.status(200).send({
                error: false,
                message: `New apartment added, ${apartment}`,
              });
            }
          );
        }
      }
    );
  } catch (error) {
    throw error;
  }
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
router.get("/getAllUsersFromCompany/:company", (req, res) => {
  connection.query(
    "SELECT * FROM companyuser WHERE company = ?",
    [req.params.company],
    function (error, results, fields) {
      if (error) throw error;
      let test = results;
      let testarray = [];
      const result = test.map((x) => {
        return {
          email: x.email,
          company: x.company,
          firstname: x.firstname,
          lastname: x.lastname,
          isAdmin: x.isAdmin,
          isVerified: x.isVerified,
          create_time: x.create_time,
          update_time: x.update_time,
          status: x.status,
          permission: x.permission,
        };
      });
      res.status(200).send({ result: result });
    }
  );
});
router.get("/getApartmentCompany/:company", (req, res) => {
  try {
    connection.query(
      "SELECT * FROM apartmentmaster WHERE company = ?",
      [req.params.company],
      function (error, results, fields) {
        if (error) throw error;
        let test = results;
        const result = test.map((x) => {
          return {
            id: x.id,
            apartment: x.apartment,
            building: x.building,
            created_date: x.created_date,
            last_login_date: x.last_login_date,
            status: x.status,
            email: x.email,
            rfid_key: x.rfid_key,
          };
        });
        res.status(200).send({ result: result });
      }
    );
  } catch (error) {
    res.status(501).send({ 'error': true })
  }

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
router.post("/createcompanyuser", (req, res, next) => {
  const { company, firstname, lastname, email, password } = req.body;
  var salt = bcrypt.genSaltSync(10);
  var hashedpassword = bcrypt.hashSync(password, salt);
  /*   var updatedAt = moment().format();
   */ var createdAt = moment().format();
  if (!company) {
    return res
      .status(400)
      .send({ error: true, message: "please provide company" });
  }
  console.log(req.body);
  connection.query(
    "SELECT email, company FROM booki.companyuser WHERE company = ?",
    [company],
    function (error, results, fields) {
      if (error) console.log(error);
      let nbrOfRows = results.length;
      if (nbrOfRows === 0) {
        connection.query(
          "INSERT INTO booki.companyuser ( company, firstname, lastname, email, password ) VALUES (?, ?, ?, ?, ?)",
          [company, firstname, lastname, email, hashedpassword],
          function (error, results, fields) {
            if (error) throw error;
            let token = crypto.randomBytes(16).toString("hex");
            connection.query(
              "INSERT INTO booki.tokens ( email, token, create_time ) VALUES (?, ?, ?)",
              [email, token, createdAt],
              function (error, results, fields) {
                if (error) throw error;
                console.log(results);
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
        return res.status(400).json({ message: "User already exists" });
      }
    }
  );
});
router.get("/confirmation/:token", (req, res) => {
  // Find a matching token
  let token = req.params.token;
  connection.query(
    "SELECT token, email FROM tokens WHERE token = ?",
    [token],
    function (error, results, fields) {
      if (error) {
        return res.status(500).send("An unexpected error occurred");
      }
      if (results.length === 0) {
        return res.status(404).send({
          message:
            "We were unable to find a valid token. Your token may have expired.",
        });
      }
      // If we found a token, find a matching user

      let email = results[0].email;
      connection.query(
        "SELECT email, isVerified FROM companyuser WHERE email = ?",
        [email],
        function (error, results, fields) {
          if (error) {
            return res.status(500).send("An unexpected error occurred");
          }
          if (results.length === 0) {
            return res.status(404).send({
              message: `We were unable to find a user for this token.`,
            });
          }
          console.log(results[0].isVerified);
          if (results[0].isVerified === 1) {
            return res.status(400).send({
              message: "This user has already been verified. Please log in.",
            });
          }
          if (results[0].isVerified === 0) {
            connection.query(
              "UPDATE companyuser SET isVerified = '1' WHERE email = ?",
              [email],
              function (error, results, fields) {
                if (error) throw error;
                return res.status(200).send({
                  message: "The account has been verified. Please log in.",
                });
              }
            );
          }
        }
      );
    }
  );
});
router.post("/register/reset", (req, res) => {
  let email = req.body.email;
  connection.query(
    "SELECT email, isVerified FROM companyuser WHERE email = ?",
    [email],
    function (error, results, fields) {
      if (error) {
        return res.status(500).send("An unexpected error occurred");
      }
      if (results.length === 0) {
        return res.status(404).send("User not found");
      }
      if (results[0].isVerified === 0) {
        connection.query(
          "DELETE FROM companyuser WHERE email = ?",
          [email],
          function (error, results, fields) {
            if (error) {
              return res.status(500).send("An unexpected error occurred");
            }
            return res.status(200).send({
              message: "User reset is successful.",
            });
          }
        );
      }
      if (results[0].isVerified === 1) {
        return res.status(400).send({
          message:
            "This user is not verified. Please look for verifiation email.",
        });
      }
    }
  );
});

module.exports = router;
