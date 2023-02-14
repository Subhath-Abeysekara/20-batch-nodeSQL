var connection = require('../service/connection')

connection.query("CREATE TABLE user (user_id INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255), username VARCHAR(255) ,password VARCHAR(255) , email VARCHAR(255) , nic VARCHAR(255) ,contact VARCHAR(255) , superadmin_status VARCHAR(255))", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

connection.query("CREATE TABLE admin (user_id INT PRIMARY KEY, position VARCHAR(255))", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });