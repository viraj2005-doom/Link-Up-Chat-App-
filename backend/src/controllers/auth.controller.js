import User from "../models/user.model.js"
import { generateToken } from "../services/utils.js"
import bcrypt from 'bcryptjs'
import cloudinary from '../services/cloudinary.js'
import { createDecipheriv } from "crypto"
export const signup = async (req,res) => {
    const {fullName, email,password} = req.body
    try {
        if(!fullName || !email || !password)
        {
            return res.status(400).json({message: "Full name, email and password are required"})
        }

        const trimmedFullName = fullName.trim()
        const normalizedEmail = email.trim().toLowerCase()

        if(password.length < 6)
        {
            return res.status(400).json({message: "Password must be at least 6 characters long"})
        }

        const user = await User.findOne({email: normalizedEmail})
        if(user)
        {
            return res.status(400).json({message: "User already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            fullName : trimmedFullName,
            email : normalizedEmail,
            password : hashedPassword
        })

        if (newUser) {
            const accessToken = generateToken(newUser._id, res)
            res.status(201).json({
                _id:newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePicture : newUser.profilePicture,
                createdAt: newUser.createdAt,
                accessToken,
                message: "User created successfully"})
        }
        else{
            res.status(400).json({message: "Invalid user data"})
        }        
    } catch (error) {
        console.log("Error in signup: ", error)
        res.status(500).json({message: "Internal Server error"})
    }
}


export const signin = async (req,res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({
            email: email.trim().toLowerCase()
        })
        if(!user){
            return res.status(400).json({message: "Invalid email or password"})
        }
        
        await bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err) {
                console.log("Error comparing passwords: ", err)
                return res.status(500).json({message: "Internal Server error"})
            }
            if(isMatch){
                const accessToken = generateToken(user._id, res)
                res.status(200).json({
                    _id:user._id,
                    fullName : user.fullName,
                    email : user.email,
                    profilePicture : user.profilePicture,
                    createdAt: user.createdAt,
                    accessToken,
                    message: "User signed in successfully"})
            }
            else{
                res.status(400).json({message: "Invalid email or password"})
            }
        })
    } catch (error) {
        console.log("Error in signin: ", error)
        res.status(500).json({message: "Internal Server error"})
    }
}


export const logout = (req,res) => {
    try{
        res.cookie('jwt', '', { httpOnly: true, sameSite: 'Strict', secure: true, maxAge: 0 })
        res.status(200).json({message: "User logged out successfully"})
    }
    catch(error)
    {
        console.log("Error in logout: ", error)
        res.status(500).json({message: "Internal Server error"})

    }
}

export const updateProfile = async (req,res) => {
    try {
        const { profilePicture } = req.body ?? {}
        const userId = req.user?.userId

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        if (!profilePicture) {
            return res.status(400).json({ message: "Profile picture is required" })
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePicture, {
            public_id: `profile_pictures/${userId}`
        })

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: uploadResponse.secure_url },
            { new: true }
        )

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            profilePicture: updatedUser.profilePicture,
            createdAt: updatedUser.createdAt,
            message: "Profile picture updated successfully"
        })
        
    } catch (error) {
        console.log("Error in updateProfile: ", error)
        res.status(500).json({message: "Internal Server error"})
    }
}


export const checkAuth = async (req, res) => {
    try {
        const userId = req.user?.userId

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const user = await User.findById(userId).select("-password")

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePicture,
            createdAt: user.createdAt
        })
    } catch (error) {
        console.log("Error in checkAuth: ", error)
        res.status(500).json({message: "Internal Server error"})
    }
}
