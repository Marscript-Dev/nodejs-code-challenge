import express from 'express';
import { IUser } from '../models/User';
import { getUserByEmail } from '../services/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const router = express.Router();
router.post('/login',async (req, res)=>{
    const credentials = req.body as IUser;
    const { Email, Password } = credentials;    
    if( Email==undefined || Password == undefined){
      res.status(400).json({code:400, error:"Missing parameters"});
      return;
    }
    const user =await getUserByEmail(Email);
    if(user == null)
    {
      res.status(401).json({code: 401, error:'email or password invalid', message: ''})
      return;
    }
    if(!bcrypt.compareSync( Password, user.Password ?? '')){
        res.status(401).json({code: 401,error:'email or password invalid' , message:''});
        return;
    }
    const token = jwt.sign(
      { _id: user.Id },
      process.env.SECRET!,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({
      status: 200,
      success: true,
      message: "login success",
      token: token,
    });
});
export default router;