const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const User = require('../model/user.model');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/mail.js');

dotenv.config();

// Generate JWT token
const signToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );
};

// Create and send token with full user object
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user);

  res.cookie("token", token, {
    maxAge: Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV !== "dev",
    httpOnly: true,
    sameSite: "Lax"
  });

  return res.status(statusCode).json({
    status: "success",
    message: "User created successfully",
    data: { user } // return full user as-is
  });
};

// SIGNUP CONTROLLER
const signUp = catchAsync(async (req, res, next) => {
  const { email, password, fullname } = req.body;

  const newUser = await User.create({
    email,
    password,
    fullname
  });

  const code = newUser.createVerificationCode();
  await newUser.save({ validateBeforeSave: false });

  const url = `${req.protocol}://${req.get("host")}/api/auth/verify/${code}`;
  await sendEmail(email, 'You have successfully signed up', url);

  return createSendToken(newUser, 201, res);
});


const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Email or password is incorrect', 401));
    }

    createSendToken(user, 200, res);
});


const autoLogin = (req, res) => {
    const { user } = req;

    if (!user) {
        return res.status(401).json({ message: "No user logged in" });
    }

    res.status(200).json({
        status: 'success',
        data: { user }
    });
};

const verifyEmail = catchAsync(async (req, res, next) => {
    const { code } = req.params;

    const user = await User.findOne({ verificationCode: code });

    if (!user) {
        return next(new AppError('Verification code invalid', 400));
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(200).send('<h1>User is verified!</h1>');
});

module.exports = { signUp, login, verifyEmail, autoLogin };
