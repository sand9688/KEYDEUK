const asyncHandler = require('express-async-handler')
const Test = require('../models/testModel')
const userInfo = require('../models/user')

// @desc Get Test
// @route Get /api/test
// @access Private 
const getTest = asyncHandler( async (req,res) => {
    const tests = await Test.find()
    res.status(200).json(tests)
})
// @desc Set Test
// @route POST /api/test
// @access Private 
const setTest = asyncHandler(async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Plese add text filed')
    }
    const tests = await Test.create({
        text : req.body.text
    })

    res.status(200).json(tests)
    
    
})
// @desc Update Test
// @route PUT /api/test:id
// @access Private 
const updateTest = asyncHandler(async (req,res) => {
    const tests = await Test.findById(req.params.id)

    if(!tests) {
        res.status(400)
        throw new Error('Test not found')
    }

    const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })


    res.status(200).json(updatedTest)
})
// @desc Delete Test
// @route Delete /api/test
// @access Private 
const deleteTest = asyncHandler(async (req,res) => {
    const tests = await Test.findById(req.params.id)

    if(!tests) {
        res.status(400)
        throw new Error('Test not found')
    }

    await tests.remove();

    res.status(200).json({id : req.params.id})
})

const getUser = asyncHandler( async (req,res) => {
    const user = await userInfo.find()
    res.status(200).json(user)
})


const serchUser = asyncHandler( async (req,res) => {
    const user = await userInfo.find({'id' : req.params.id})
    res.status(200).json(user)
})
const serchUserName = asyncHandler( async (req,res) => {
    const user = await userInfo.find({'name' : req.params.name})
    res.status(200).json(user)
})

const setUser = asyncHandler(async (req,res) => {
    if(!req.body.id){
        res.status(400)
        throw new Error(req.body.id)
    }
    const user = await userInfo.create({
        name : req.body.name,
        teamName : req.body.teamName,
        position: req.body.position,
        id : req.body.id,
        password : req.body.password,
        email : req.body.email,
        approve: req.body.approve
    })
    res.status(200).json(user)
})

const updateUser = asyncHandler(async (req,res) => {
    const userId = await userInfo.find({'id' : req.params.id})

    if(!userId) {
        res.status(400)
        throw new Error('userId not found')
    }

    const updateduserInfo = await userInfo.findOneAndUpdate({'id': req.params.id}, req.body, {
        new: true
    })


    res.status(200).json(updateduserInfo)
})

const deleteUser = asyncHandler(async (req,res) => {
    const userId = await userInfo.findOne({'id' : req.params.id})

    if(!userId) {
        res.status(400)
        throw new Error('userId not found')
    }

    await userId.remove();

    res.status(200).json({uerId : req.params.id})
})

const loGin = asyncHandler(async (req,res) => {
    const userId = await userInfo.findOne({'id': req.body.id})
    if(!userId){
        res.status(400)
        throw new Error('ID를 확인해 주세요')
    }else{
        const userPW = userId.password
        if(userPW != req.body.password){
            res.status(400)
            throw new Error('PW 를 확인해 주세요 ')
        }
    }
    
    res.status(200).json(userId)

})

const checkId = asyncHandler(async (req,res) => {

    // const user = await userInfo.find({'id' : req.params.id})
    // res.status(200).json(user)

    const userId = await userInfo.find({'id': req.params.id})
    res.status(200).json(userId)

})

const searchId = asyncHandler(async (req,res) => {

    const user = await userInfo.find({'name': req.body.name , 'email' : req.body.email})
    if(user.length == 0){
        res.status(400)
        throw new Error('정보를 확인해 주세요')
    }
    res.status(200).json(user)

})

const searchPw = asyncHandler(async (req,res) => {

    const user = await userInfo.find({'name': req.body.name ,'id' : req.body.id ,'email' : req.body.email})
    if(user.length == 0){
        res.status(400)
        throw new Error('정보를 확인해 주세요')
    }
    res.status(200).json(user)

})




module.exports = {
    getTest,
    setTest,
    updateTest,
    deleteTest,
    getUser, setUser, updateUser, deleteUser, serchUser,loGin, checkId,serchUserName,
    searchId, searchPw
}