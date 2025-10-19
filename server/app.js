const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const path = require('path')
// Routers
const tourRouter = require('./router/tour.router.js');
const authRouter = require('./router/auth.router.js');


const globalErrorHandler = require('./utils/globalErrorHandler.js');


dotenv.config();

const app = express();


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true               
}));


app.use(express.static(path.join(__dirname,"dist")))

app.use(cookieParser());
app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/tours', tourRouter);




app.use(globalErrorHandler);

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(` Server running on port ${process.env.PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

