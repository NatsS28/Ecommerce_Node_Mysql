const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();


const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
});

connection.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("mysql connected");
    }
})


app.set('view engine', 'hbs');


app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(2998, () => {
    console.log("Server started");
})
