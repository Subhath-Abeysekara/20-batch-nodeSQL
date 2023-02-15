
var validate_token = require('../../authentication/authenticate')

module.exports = async function validate(req , res){
    var validity = await validate_token(req , 2)
    console.log("validity2 ",validity)
    if(validity){
        res.send("valid")
    }
    else{
        res.send("invalid")
    }
}