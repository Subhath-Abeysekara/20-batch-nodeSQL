var connection = require('../../service/connection')

module.exports = async function confirm_member(req , res){
    try{
        var validity = await validate_token(req , 2)
        console.log(validity)
        if (!validity){
            res.send("not valid")
            return
        }
    }
    catch{
        console.log("catch")
        res.send("not valid")
        return
    }
    var sql = "UPDATE user " + "SET superadmin_status = 'confirm' WHERE user_id = "+req.params.user_id
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result)
    });
    res.send("success")
}