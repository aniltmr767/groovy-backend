import mongoose from 'mongoose'

const profileSchema = mongoose.Schema({
    name: { type: String, required: true },
    emailId: { type: String },
    mobile: { type: String, required: true, unique: true },
    city: String,
    address: String,
    userId: [String],
})

const Profile = mongoose.model('Profile', profileSchema)

export default Profile