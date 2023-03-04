import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, unique: true },
    password: { type: String },
    resetToken: String,
    expireToken: Date,
})

const User = mongoose.model('User', userSchema)

export default User