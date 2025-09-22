const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Formato token non valido. Usa 'Bearer token'" });
    }

    const token = authHeader.split(' ')[1];

    
    if (!token) {
        return res.status(401).json({ message: "Token mancante" });
    }

    
    try {
        const decoded = jwt.verify(token, "segreto"); 
        req.user = decoded; 
        next();
    } catch (error) {
        
        let errorMessage = "Token non valido";
        
        if (error.name === 'TokenExpiredError') {
            errorMessage = "Token scaduto";
        } else if (error.name === 'JsonWebTokenError') {
            errorMessage = "Token malformato";
        }

        return res.status(403).json({ 
            message: errorMessage,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = authMiddleware;