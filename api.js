const express = require('express')
const { sendMsg, getSessions, registerSession } = require('./controller')

const router = express.Router()

router.post('/', sendMsg)

router.get('/' , getSessions)

router.post('/register' , registerSession)

module.exports = router;
