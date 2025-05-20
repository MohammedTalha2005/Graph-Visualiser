import jwt from "jsonwebtoken";
import { usermodel } from "../db/usermodel.js";
export const isLoggedin= async (req,res,next)=>{
    let token=req.cookies?.token;
    if(token===undefined || token===''){
        return  res.redirect('/login');
    }
    token = jwt.verify(token, process.env.jwtsecret);
    req.user=await usermodel.findOne({email:token.email});
    next(); 
}