import jwt from 'jsonwebtoken'

export const protectRoute = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization

        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)

        req.user = decoded
        next()
    } 
    catch (error) {
        console.log('Error in protectRoute:', error)

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid or expired token' })
        }

        return res.status(500).json({ message: 'Internal Server error' })
    }
}

