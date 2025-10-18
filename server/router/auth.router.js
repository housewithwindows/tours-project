const express = require('express');
const { login, signUp,verifyEmail } = require('../controllers/auth.controller.js'); 



const authRouter = express.Router();


authRouter.post('/login',login);
authRouter.post('/signup', signUp);



authRouter.get('/verify/:code',verifyEmail)

module.exports = authRouter;