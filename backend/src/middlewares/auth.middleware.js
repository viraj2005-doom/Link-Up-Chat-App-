import jwt from 'jsonwebtoken'

export const protectRoute = (req, res, next) => {
    try {
        const cookieToken = req.cookies?.jwt
        const authHeader = req.headers.authorization || req.headers.Authorization
        const headerToken = authHeader?.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : null

        if (!headerToken && !cookieToken) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        let decoded = null

        if (headerToken) {
            decoded = jwt.verify(headerToken, process.env.JWT_ACCESS_TOKEN_SECRET)
        } else if (cookieToken) {
            try {
                decoded = jwt.verify(cookieToken, process.env.JWT_ACCESS_TOKEN_SECRET)
            } catch (accessError) {
                decoded = jwt.verify(cookieToken, process.env.JWT_REFRESH_TOKEN_SECRET)
            }
        }

        req.user = decoded
        next()
    } 
    catch (error) {
        console.log('Error in protectRoute:', error)
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        })

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid or expired token' })
        }

        return res.status(500).json({ message: 'Internal Server error' })
    }
}
