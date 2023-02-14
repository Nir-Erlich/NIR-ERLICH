var SQL = require('./db')
const path = require('path');
const csv = require('csvtojson');

const createUsersT = (req, res) => {
  const usersSQL = `CREATE TABLE USERS (
        First_Name VARCHAR(50),
        Last_Name VARCHAR(50),
        Email VARCHAR(255) PRIMARY KEY, 
        Gender VARCHAR(50),
        Password VARCHAR(255)
      )`;

  SQL.query(usersSQL, (err, results) => {
    if (err) {
      console.log("error ", err);
      res.status(400).send({ message: "Error in creating table" });
      return;
    }
    console.log('USERS Table Created');
    res.send('USERS Table Created');
    return;
  });
};

const createContentT = (req, res) => {
  const ContentSQL = `CREATE TABLE CONTENTS (
    Activity VARCHAR(255),
    City VARCHAR(255),
    Date_Time DATETIME,
    Park VARCHAR(255),
    PRIMARY KEY (Date_Time),
    UNIQUE KEY (Activity, City)
    )`;

  SQL.query(ContentSQL, (err, results) => {
    if (err) {
      console.log("error ", err);
      res.status(400).send({ message: "Error in creating table" });
      return;
    }
    console.log('CONTENTS Created');
    res.send('CONTENTS Table Created');
    return;
  });
};





const SelectFromCONTENTS = (req, res) => {
  var selectSQL = "SELECT * FROM CONTENTS";
  SQL.query(selectSQL, (err, results) => {
    if (err) {
      console.log("error in selecting data", err);
      res.status(500).send({ message: "Error in selecting data" });
    }
    console.log(results);
    res.send(results);
  });
};

const DropTableUSERS = (req, res) => {
  var dropSQLUSERS = "DROP TABLE USERS";
  SQL.query(dropSQLUSERS, (err, results) => {
    if (err) {
      console.log("Error in dropping USERS table", err);
      res.status(500).send({ message: "Error in dropping USERS table" });
    }
    console.log("Table USERS dropped successfully");
    res.send({ message: "Table USERS dropped successfully" });
  });
};

const DropTableCONTENTS = (req, res) => {
  var dropSQCONTENTS = "DROP TABLE CONTENTS";
  SQL.query(dropSQCONTENTS, (err, results) => {
    if (err) {
      console.log("Error in dropping CONTENTS table", err);
      res.status(500).send({ message: "Error in dropping CONTENTS table" });
    }
    console.log("Table CONTENTS dropped successfully");
    res.send({ message: "Table CONTENTS dropped successfully" });
  });
};

const InsertIntoUSERS_new = (req, res) => {
  var Q1 = "INSERT INTO USERS SET ?";
  const csvFilePath = path.join(__dirname, "USERS_INFO.csv");
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      console.log(jsonObj);
      jsonObj.forEach(element => {
        var NewUser = {
          First_Name: element.First_Name,
          Last_Name: element.Last_Name,
          Email: element.Email,
          Gender: element.Gender,
          Password: element.Password
        };
        SQL.query(Q1, NewUser, (err, mysqlres) => {
          if (err) {
            console.log("error in inserting data into USERS table", err);
          }
          console.log("Created rows sucssefuly in USERS table " + mysqlres);
        });
      });
    })
  res.send("data read in users table");
};

const InsertIntoCONTENTS_new = (req, res) => {
  var Q2 = "INSERT INTO CONTENTS SET ?";
  const csvFilePath = path.join(__dirname, "CONTENTS_INFO.csv");
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      console.log(jsonObj);
      jsonObj.forEach(element => {
        var NewContent = {
          Activity: element.Activity,
          City: element.City,
          Date_Time: element.Date_Time,
          Park: element.Park
        };
        SQL.query(Q2, NewContent, (err, mysqlres) => {
          if (err) {
            console.log("error in inserting data into CONTENTS table", err);
          }
          console.log("Created rows sucssefuly in CONTENTS table " + mysqlres);
        });
      });
    })
  res.send("data read in CONTENTS table");
};

const SelectUSERS = (req, res) => {
  var Q9 = "SELECT * FROM USERS";
  SQL.query(Q9, (err, mySQLres) => {
    if (err) {
      console.log("error in showing USERS table ", err);
      res.send("error in showing USERS table ");
      return;
    }
    console.log("show USERS table");
    res.send(mySQLres);
    return;
  })
};

module.exports = {
  createUsersT, createContentT,
  SelectFromCONTENTS, DropTableUSERS, DropTableCONTENTS,
  InsertIntoUSERS_new, SelectUSERS,
  InsertIntoCONTENTS_new
};





