var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user:"sqluser",
  password:"password",
  database : "20-batch"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected")
  });

module.exports = connection