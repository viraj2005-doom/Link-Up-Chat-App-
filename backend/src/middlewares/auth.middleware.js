import jwt from 'jsonwebtoken'
import env from 'dotenv'
import bcrypt from 'bcrypt'
//import User from '../models/User.model.js'

export const protectRoute = async (req,res,next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
            if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ 'message': 'Unauthorized' });
            const token = authHeader.split(' ')[1]; //split the string and get the second part which is the token
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, decoded) => {
                    if (err) return res.status(403).json({ 'message': 'Forbidden' });
                    req.user = decoded.UserInfo.username;
                    req.roles = decoded.UserInfo.roles;
                    next();
                }
            );
        } catch (error) {
        console.log("Error in protectRoute: ", error)
        res.status(500).json({message: "Internal Server error"})
    }
}

