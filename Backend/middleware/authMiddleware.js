import jwt from "jsonwebtoken";

const authMiddleware =  async(req , res, next) => {
    const {accessToken} = req.cookies;

    if(!accessToken){
        return res.status(401).json({error : 'Please login first' })

    } else{
        try{
            const deCodeToken = await jwt.verify(accessToken , process.env.JWT_KEY)
            req.role = deCodeToken.role;
            req.id = deCodeToken.id;
    
          
            next()

        }
        catch(error){
            return res.status(403).json({error : 'Please login' })

        }
    }
 
};

export default authMiddleware;
