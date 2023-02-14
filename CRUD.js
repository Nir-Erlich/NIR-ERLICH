const response = require("express");
const sql = require("./db.js");




const createNewUSER = function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const newUser = {
        "First_Name": req.body.First_Name,
        "Last_Name": req.body.Last_Name,
        "Email": req.body.email,
        "Password": req.body.Password
    };
    sql.query("INSERT INTO USERS SET?", newUser, (err, mysqlres) => {
        if (err) {
            console.log("error:", err);
            res.status(400).send({ message: "error in creating User:" + err });
            return;
        }
        console.log("created user:", { id: mysqlres.insertId, ...newUser });
        res.send({ message: "new User created successfully" });
        req.flash("success", "User added successfully");
        res.redirect("/content");
        return;
    });
};

const createNewCONTENT = function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }
    const newCONTENT = {
        "Activity": req.body.Activity,
        "City": req.body.City,
        "Date_Time": req.body.Date_Time,
        "Park": req.body.Park
    };
    sql.query("INSERT INTO CONTENTs SET?", newCONTENT, (err, mysqlres) => {
        if (err) {
            console.log("error:", err);
            res.status(400).send({ message: "error in creating Content:" + err });
            return;
        }
        console.log("created Content:", { id: mysqlres.insertId, ...newCONTENT });
        res.send({ message: "new CONTENT created successfully" });
        return;
    });
};

const checkIfUserExists = function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "User data cannot be empty!"
        });
        return;
    }
    const Email = req.body.Email;
    const Password = req.body.Password;

    sql.query("SELECT * FROM users WHERE Email = ? OR Password = ?", [Email, Password], (err, result) => {
        if (err) {
            console.log("error:", err);
            res.status(400).send({ message: "error in checking if user exists: " + err });
            return;
        }
        if (result.length > 0) {
            res.status(400).send({ message: "User exists in the DataBase" });
            return;
        }
        res.send({ message: "User does not exist in the database" });
    });
};


module.exports = { createNewUSER, createNewCONTENT, checkIfUserExists };
