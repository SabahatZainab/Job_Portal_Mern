//middleware is b/w req and res for checking req.
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        };

        //if token decoded we get information, which we send during login

        req.id = decode.userId; // in our case which is userId
        next(); //proceed the process towards responds.(next route)

    } catch (error) {
        
    }
}
export default isAuthenticated;