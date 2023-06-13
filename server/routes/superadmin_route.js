const express = require('express')
const router = express.Router()
var add_member = require('../api_operations/admin_operations/add_member')
var confirm_member = require('../api_operations/admin_operations/confirm_member')
var removeMember = require('../api_operations/admin_operations/remove_member')
var get_members = require('../api_operations/admin_operations/get_members')
var slot_update = require('../api_operations/admin_operations/slot_update')
var get_slot = require('../api_operations/admin_operations/get_slotByType')
var get_slot_id = require('../api_operations/admin_operations/get_slotById')

router.get('/get/members' ,async (req,res,next)=>{
    get_members(req , res)
})

router.post('/register/admin' ,async (req,res,next)=>{
    add_member(req , res)
})

router.put('/confirm/:user_id' ,async (req,res,next)=>{
     confirm_member(req , res)
})

router.put('/slot/update/:slot_id' ,async (req,res,next)=>{
    slot_update(req , res)
})

router.delete('/remove/:user_id' ,async (req,res,next)=>{
     removeMember(req , res)
})

router.get('/slot/get/:type' ,async (req,res,next)=>{
    get_slot(req , res)
})

router.get('/slot/getById/:slot_id' ,async (req,res,next)=>{
    get_slot_id(req , res)
})

module.exports = router