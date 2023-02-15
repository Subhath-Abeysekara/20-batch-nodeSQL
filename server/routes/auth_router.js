const express = require('express')
const router = express.Router()
var add_member = require('../api_operations/admin_operations/add_member')
var confirm_member = require('../api_operations/admin_operations/confirm_member')
var removeMember = require('../api_operations/admin_operations/remove_member')
var login = require('../api_operations/public_operations/login');
var validate_token = require('../api_operations/public_operations/validate_token')

router.post('/login' ,(req,res,next)=>{
    login(req , res)
})

router.get('/validate' ,async (req,res,next)=>{
    validate_token(req , res)
})

router.post('/register/admin' ,async (req,res,next)=>{
    add_member(req , res)
})

router.put('/confirm/:user_id' ,async (req,res,next)=>{
     confirm_member(req , res)
})

router.delete('/remove/:user_id' ,async (req,res,next)=>{
     removeMember(req , res)
})

module.exports = router
