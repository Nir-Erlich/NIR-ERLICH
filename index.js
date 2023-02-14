const express = require('express');
const session = require("express-session");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const sql = require("./db");
const createDB = require("./createDB");
const CSVToJSON = require('csvtojson');
const CRUD = require("./CRUD");
const fs = require('fs');
const stringify = require('csv-stringify').stringify;
const { parse } = require("csv-parse");
const flash = require("connect-flash");
app.use(express.json());
app.use(flash());

const port = 3000;

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/CreateUSERSTable',createDB.createUsersT);
app.get("/InsertUSERSinfo", createDB.InsertIntoUSERS_new);
app.get('/ShowUSERSTable', createDB.SelectUSERS);
app.get('/DropUSERSTable', createDB.DropTableUSERS);

app.get('/CreateCONTENTSTable',createDB.createContentT);
app.get("/InsertCONTENTSinfo", createDB.InsertIntoCONTENTS_new);
app.get('/ShowCONTENTSTable', createDB.SelectFromCONTENTS);
app.get('/DropCONTENTSTable', createDB.DropTableCONTENTS);

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views/homepage.html'));
})

app.get('/checkformember', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views/checkformember.html'));
});

app.get('/sing_up', (req, res)=>{
    res.sendFile(path.join(__dirname, "views/sign_up.html"))
});

app.get('/sing_in', (req, res)=>{
    res.sendFile(path.join(__dirname, "views/sign_in.html"))
});

app.get('/content', (req, res)=>{
    res.sendFile(path.join(__dirname, "views/content.html"));
});

app.post('/singUp', (req, res)=>{
    if(!req.body){
    res.status(400).send({
    message:"Content cannot be empty!" });
    return; 
}

});



app.post("/signUpToDB", CRUD.createNewUSER);
app.post("/signInDB", CRUD.checkIfUserExists);

app.post("/addNewContent", CRUD.createNewCONTENT);

app.listen(port, ()=>{
    console.log("serever is working on: " + port);
}); 