const jwt = require("jsonwebtoken")

const isAuthenticated = {
    protected: async (req, res, next) => {
        try {
            console.log("Token from cookies:", req.cookies.tokenData);
            const token = req.cookies.tokenData;
            if (!token) {
                return res.status(401).json({
                    message: "User not Authenticated",
                    success: false,
                })
            }
            const decode = await jwt.verify(token, process.env.SECURITY_KEY)
            if (!decode) {
                return res.status(401).json({
                    message: "Invalid token",
                    success: false
                })
            }

            req.id = decode.userId;
            next();

        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = isAuthenticated;