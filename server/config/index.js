import mysql from "mysql";

var connection = mysql.createConnection({
  host: "localhost",
  port: 80,
  user: "root",
  password: "",
  database: "account",
});

connection.connect();

export default connection;
