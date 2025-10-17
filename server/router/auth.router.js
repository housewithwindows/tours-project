const express = require('express');
const { login, signUp,verifyEmail } = require('../controllers/auth.controller.js'); 

const { protect }  = require('../middleware/auth.middleware');

const authRouter = express.Router();


authRouter.post('/login',protect, login);
authRouter.post('/signup',protect, signUp);



authRouter.get('/verify/:code',verifyEmail)

module.exports = authRouter;