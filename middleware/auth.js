const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if(!token){
        return res.status(400).json("no token provided")
    }
    
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded Token:', decoded);
        req.user = decoded;
        next()
    }
    catch(error){
        res.status(500).json(error);
    }
}
module.exports = authenticateToken;