const moment = require("moment");
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const connection = require("../startup/db.config");

router.post("/booking", (req, res) => {
    const { rid, building, apartment, tid, date } = req.body;

    let time_booked = moment().format();
    let status = "true"
    connection.query(
        "INSERT INTO booking(rid, building, apartment, date, tid, time_booked, status) VALUES (?,?,?,?,?,?,?)",
        [rid, building, apartment, date, tid, time_booked, status],
        function (error, results, fields) {
            if (error) throw error;

/*             res.status(400).send({ 'rid': rid, 'building': building, 'apartment': apartment, 'date': date, 'tid': tid, 'time_booked': time_booked, 'status': status })
 */            res.status(200).send(results);
        }
    );
});
router.get("/bookinghistory", (req, res) => {
    const { apartment, building } = req.query
    let status = true
    connection.query(`SELECT
    b.id,
    b.rid,
    b.date,
    bm.building,
    b.apartment,
    t.start_time,
    t.end_time,
    b.time_booked
FROM
    booking b,
    buildingmaster bm,
    apartmentmaster a,
    timeslotmaster t,
    roomtypemaster r
WHERE
    b.building = ? AND b.apartment = ? AND b.building = bm.building AND b.apartment = a.apartment AND b.rid = r.id AND b.tid = t.timeslot_id AND b.status = "true"
ORDER BY
    b.id
DESC
    `, [building, apartment], function (error, results, fields) {
        if (error) throw error;
        console.log(error)
        res.status(200).json({ 'results': results });
    })
});
router.get("/bookingavailablebetweentwodates", (req, res) => {
    const { rid } = req.query;
    let date1 = moment().subtract(1, 'months').format('YYYY-MM-DD');
    let date2 = moment().add(2, 'months').format('YYYY-MM-DD');
    let array = []
    for (var m = moment(date1); m.isBefore(date2); m.add(1, 'days')) {
        array.push({ 'date': m.format('YYYY-MM-DD') })
    }
    res.send({ array });

    let status = true;
    /*  connection.query(
         `SELECT
         bm.building building,
         a.apartment apartment,
         CONCAT(t.start_time, " - ", t.end_time) AS timeslot,
         t.timeslot_id
     FROM
         apartmentmaster a
     JOIN buildingmaster bm JOIN booking b RIGHT JOIN timeslotmaster t ON
         t.timeslot_id = b.tid AND b.rid = ? AND b.date = ? AND b.building = bm.building AND a.apartment = b.apartment
     ORDER BY
         t.start_time`,
         [rid, date],
         function (error, results, fields) {
             if (error) throw error;
             let timeslot = []
             let test = results;
             const result = test.map((x) => {
                 if (x.apartment != null) {
                     return {
                         apartment: x.apartment,
                         building: x.building,
                         timeslot_id: x.timeslot_id,
                         timeslot: x.timeslot,
                         status: 'disabled'
                     }
                 }
                 if (x.apartment === null) {
                     return {
                         apartment: x.apartment,
                         building: x.building,
                         timeslot_id: x.timeslot_id,
                         timeslot: x.timeslot,
                         status: 'enabled'
                     }
                 }
 
             });
             res.status(200).json({ 'timeslots': result });
         }
     ); */
});
router.get("/bookingavailable", (req, res) => {
    const { rid, date } = req.query;
    let status = true;
    connection.query(
        `SELECT
        bm.building building,
        a.apartment apartment,
        CONCAT(t.start_time, " - ", t.end_time) AS timeslot,
        t.timeslot_id
    FROM
        apartmentmaster a
    JOIN buildingmaster bm JOIN booking b RIGHT JOIN timeslotmaster t ON
        t.timeslot_id = b.tid AND b.rid = ? AND b.date = ? AND b.building = bm.building AND a.apartment = b.apartment
    ORDER BY
        t.start_time`,
        [rid, date],
        function (error, results, fields) {
            if (error) throw error;
            let timeslot = []
            let test = results;
            const result = test.map((x) => {
                if (x.apartment != null) {
                    return {
                        apartment: x.apartment,
                        building: x.building,
                        timeslot_id: x.timeslot_id,
                        timeslot: x.timeslot,
                        status: 'disabled'
                    }
                }
                if (x.apartment === null) {
                    return {
                        apartment: x.apartment,
                        building: x.building,
                        timeslot_id: x.timeslot_id,
                        timeslot: x.timeslot,
                        status: 'enabled'
                    }
                }

            });
            res.status(200).json({ 'timeslots': result });
        }
    );
});
router.get('/getTimeslots', (req, res) => {
    let status = true;
    connection.query(`SELECT id, CONCAT( start_time, " - ", end_time ) AS timeslot FROM timeslotmaster where status = "true"`, [status], function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(results);
    })
})
router.get('/building_rules', (req, res) => {
    const { building } = req.query
    connection.query(`SELECT * FROM rules WHERE building = ?`, [building], function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(results)
    })
})
module.exports = router;
