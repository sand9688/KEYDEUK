const express = require('express')
const router = express.Router()
const {getUser, setUser, updateUser, deleteUser,serchUserName,
     serchUser, loGin, checkId, searchId, searchPw} = require('../controller/apicontroller')

router.get('/', getUser);
router.post('/', setUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', serchUser);
router.get('/userName/:name', serchUserName)
router.post('/login', loGin);
router.get('/checkid/:id', checkId);
router.post('/searchId', searchId);
router.post('/searchpw', searchPw);



module.exports = router
