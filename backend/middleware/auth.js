import jwt from 'jsonwebtoken'
import 'dotenv/config'

const authMiddleware = (req, res, next) => {
    // Check various sources for the token
    const token = req.cookies?.token ||
        req.headers.token ||
        (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ success: false, message: "Authentication required" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decoded.id }; // Attach user object with _id
        req.body.userId = decoded.id;
        next();
    }
    catch (err) {
        const message = err.name === 'TokenExpiredError' ? 'Session expired' : 'Invalid session';
        res.status(401).json({ success: false, message });
    }
}

export default authMiddleware
