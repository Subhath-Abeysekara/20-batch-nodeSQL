var connection = require('../../service/connection')
var validate_token = require('../../authentication/authenticate')

module.exports = async function get_slot(req , res){
    try{
        var validity = await validate_token(req , 2)
        console.log(validity)
        if (!validity.condition){
            res.send("not valid")
            return
        }
    }
    catch{
        console.log("catch")
        res.send("not valid")
        return
    }
    var sql = "SELECT * FROM slot WHERE slot_type = '"+req.params.type+"'"
    connection.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        console.log(result)
        res.send(result)
    });
}