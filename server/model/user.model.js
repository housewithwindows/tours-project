const mongoose = require('mongoose');
const crypt = require('bcrypt')
const crypto = require('crypto')



const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Fullname is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    photo: String,
    role: {
        enum: ['user', 'admin', 'moderator'],
        default: 'user',
        type: String
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: String,
    verifivationCodeExpires: Date

},{ timestamps: true });


userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()

    this.password = await crypt.hash(this.password,12)
    
    next()
})
// ვადარებთ პაროლებს 
userSchema.methods.comparePasswords = async (candidate,password) => {
    return await crypt.compare(candidate, password);
}

userSchema.methods.createVerificationCode = function(){
    const code = crypto.randomBytes(12).toString('hex')
    this.verificationCode = code
    return code
}

const User = mongoose.model('Users',userSchema)
module.exports = User;