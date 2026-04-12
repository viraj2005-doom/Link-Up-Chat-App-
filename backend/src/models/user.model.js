import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true,
    },
    fullName: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        default: null,
    },
    profilePicture: {
        type: String,
        default: '',
    },
    authProvider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local',
    },
    firebaseUid: {
        type: String,
        default: null,
    },
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User
