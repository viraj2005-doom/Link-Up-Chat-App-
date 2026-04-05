import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
    const accessToken = jwt.sign(
        { userId },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {
            expiresIn: '15m',
        }
    );
    const refreshToken = jwt.sign(
        { userId },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {
            expiresIn: '7d',
        }
    );

    res.cookie('jwt', refreshToken, { 
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return accessToken;
}
