const express = require('express')
const router = express.Router()
var connection = require('../service/connection')
var generate_token = require('../authentication/generate_token')
var validate_token = require('../authentication/authenticate')
var generate_username = require('../generate_username/generate_username')
var generate_password = require('../generate_username/generate_password')
var sendMail = require('../send_mails/send_mails')

router.post('/login' ,(req,res,next)=>{
    console.log(req.body)
    connection.query("select * from user where username = '"+req.body.username+"'", function (err, result, fields) {
        if (err) throw err;
        if(req.body.password===result[0].password){
            connection.query("select * from admin where user_id = "+result[0].user_id, function (err, result2, fields) {
                if (err) throw err;
                console.log(result2)
                const token = generate_token(result[0].user_id , result2[0].position)
                res.send(token)
              });
        }
        else{
            res.send("error username or password")
        }   
      });
})

router.get('/validate' ,async (req,res,next)=>{
    var validity = await validate_token(req , 2)
    console.log("validity2 ",validity)
    if(validity){
        res.send("valid")
    }
    else{
        res.send("invalid")
    }
})

router.post('/register/admin' ,(req,res,next)=>{
    console.log(req.body)
    var sql = "INSERT INTO user (firstname , lastname ,email ,nic ,contact ,superadmin_status) " + "VALUES ('"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.email+"','"+req.body.nic+"','"+req.body.contact+"','pending')"
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result)
        const password = generate_password()
        const username = generate_username(req.body.firstname , result.insertId)
        const response = {
            "username" : username ,
            "password" : password
        }
        var sql2 = "INSERT INTO admin (user_id , position) " + "VALUES ("+result.insertId+",'"+req.body.position+"')"
        connection.query(sql2, function (err, result2, fields) {
            if (err) throw err;
            console.log(result2)
            var sql3 = "UPDATE user " + "SET username = '"+username+"', password = '"+password+"' WHERE user_id = "+result.insertId
            connection.query(sql3, function (err, result3, fields) {
                if (err) throw err;
                console.log(result3)
              });
          });
        var mailBody = "Your username is : '"+username+"' And password is : '"+password+"'"
        var mailSubject = "Username And Password"
        sendMail(req.body.email , mailSubject , mailBody)
        res.send(response)
      });  
})

router.put('/confirm/:user_id' ,async (req,res,next)=>{
    var sql = "UPDATE user " + "SET superadmin_status = 'confirm' WHERE user_id = "+req.params.user_id
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result)
    });
    res.send("success")
})

router.delete('/remove/:user_id' ,async (req,res,next)=>{
    var sql = "DELETE FROM user WHERE user_id = "+req.params.user_id
    connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        console.log(result)
        var sql2 = "DELETE FROM admin WHERE user_id = "+req.params.user_id
        connection.query(sql2, function (err, result2, fields) {
            if (err) res.send(err);
            console.log(result2)
        });
    });
    res.send("success")
})

module.exports = router
