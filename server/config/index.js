import mysql from "mysql";

var connection = mysql.createConnection({
  host: "pmya.canary.lmesacademy.net",
  port: 25060,
  user: "yugi",
  password: "dhwiOCh4epPn8tUf",
  database: "06_yugi",
});

connection.connect();

export default connection;
