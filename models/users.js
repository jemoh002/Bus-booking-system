const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true }
});

userSchema.plugin(passportLocalMongoose);
/*
// Hashing the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        return next(error)
    }
});

// Comparing passwords for authentication
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw new Error(error);
    }
}
*/

const User = mongoose.model('User', userSchema);
module.exports = User