var api_access = require('./api_access')
const jwt = require('jsonwebtoken');

function getDecode(req){
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const token = req.header(tokenHeaderKey);
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            console.log(jwt.decode(token))
            const response = {
                "status" : "success",
                "massage" : "verified",
                "verified": true,
                "token" : jwt.decode(token)
            }
            return response;
        }else{
            const response = {
                "status" : "error",
                "massage" : error,
                "verified": false
            }
            return response
        }
    } catch (error) {
        return res.status(401).send(error);
    }
}

function checkApiAccess(api_no , user_type){
    return api_access(api_no , user_type)
}

module.exports = function authenticate(req , api_no){
    const response = getDecode(req)
    if(response.verified){
        return checkApiAccess(api_no , response.token.user_type)
    }
    return false
}