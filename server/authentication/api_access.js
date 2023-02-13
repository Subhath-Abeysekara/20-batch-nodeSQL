const obj ={
    'api_access_list' : [
        {
            'api_no' : 1,
            'user_types' : ['superadmin']
        },
        {
            'api_no' : 2,
            'user_types' : ['superadmin']
        }
    ]
} 

module.exports = function check_authorization(api_no , user_type){
    var newArray = obj.api_access_list.filter(function (el)
    { 
        if(el.api_no == api_no ){
            return el.user_types.includes(user_type)       
        }
    }
    ); 
}
