import express from 'express';
import { registerUser } from '../services/User';
import { IUser } from '../models/User';
const router = express.Router();
router.post('/register',(req, res)=>{
    const params = req.body as IUser;
    if(params.Email==""|| params.Name=="" || params.Password == ""){
        res.status(400).json({code:400, error:"Missing parameters"});
        return;
    }
    registerUser(params).then((result)=>{
        res.status(200).json({error:"", message:"success", user:result});
    }).catch((error)=>{
        res.json({code:500, error: error.message, message:''})
    })
});
export default router;