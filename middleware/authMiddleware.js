
// creating a function that protect our routes


// import jwt from 'jsonwebtoken';
import jwt from  'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModels.js';
// import cookieParser from 'cookie-parser';

const protect = expressAsyncHandler(async (req,res, next) =>{
    let token;
    token = req.cookies.jwt;
    
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch(error){
            res.status(401);
            throw new Error ('Not Authorized, Invalid token');
        }
    
    }else{
        res.status(401);
        throw new Error('Not Authorized, no token');
    }
});
export{protect}