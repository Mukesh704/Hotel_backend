const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) => {
    const token = req.header.authorization.split(" ")[1];
    if(!token) {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }

    try {
        // Verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Attach user info to the request object
        req.user = decoded
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            error: 'Invalid token'
        })
    }
}

// Function to generate the jwt token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET_KEY, {expiresIn: 30});
}

module.exports = {jwtAuthMiddleware, generateToken}