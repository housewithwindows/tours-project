const mongoose  = require("mongoose");

const tourSchema = new mongoose.Schema({
    title:{
    type : String,
    minimumLength: [5,'title must be at least 5 letters'],
    maxLength: [20,'description must be at most 20 letters'],
    required: [true,'Entering a title is neccessary']
    },
    duration: {
        type: Number,
        required: [true,'Entering duration is required']
    },
    description: {
        type : String,
        minimumLength: [8,'description must be at least 8 letters'],
        maxLength: [20,'description must be at most 20 letters'],
        required: [true,'Entering a description is neccessary']
    },
    price: {
        type : Number,
        required: [true,'Entering a price is required']
    }
},{timestamps: true})

const Tour = mongoose.model('Tours',tourSchema)

module.exports = Tour