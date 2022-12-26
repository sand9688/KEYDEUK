const express = require('express')
const router = express.Router()
const { getTest,setTest,updateTest,deleteTest } = require('../controller/apicontroller')


router.route('/').get(getTest).post(setTest)
router.route('/:id').put(updateTest).delete(deleteTest)

// rotuer.get('/', getTest);

// rotuer.post('/', setTest);

// router.put('/:id', updateTest);

// router.delete('/:id', deleteTest);

module.exports = router