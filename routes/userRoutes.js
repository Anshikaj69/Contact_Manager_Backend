const express = require('express')
const router = express.Router()
const { registerUser , loginUser, currentUser} = require('../controllers/userController')
const validateToken = require('../middleware/validateTokenHandler')

router.route("/register").post(registerUser)
//also
router.post("/login", loginUser)
router.get("/current" ,validateToken,currentUser)

module.exports = router
