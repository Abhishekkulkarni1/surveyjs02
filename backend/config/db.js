const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12754544",
    password: "7bBgzNYZqH",
    database: "sql12754544",
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

module.exports = db;
