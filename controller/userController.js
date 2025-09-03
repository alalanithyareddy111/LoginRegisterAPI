// import bcrypt from "bcrypt";
// import User from "../models/User"

// export const registerUser=async(req,res)=>{
//     try{
//         const {name,email,password}=req.body;
//         const existingUser=await User.findOne({email});
//         if(existingUser){
//             return res.status(400).json({message:"User already exists"});
//         }
//         const hashedPassword=await bcrypt.hash(password,10);

//         const newUser=new User({name,email,password:hashedPassword})
//         await newUser.save();
//         res.status(201).json({message:"User registered successfully"});
//     }
//     catch(err){
//         res.status(500).json({message:"Server error"});
//     }
// }


import bcrypt from "bcrypt";
import User from "../models/User.js";

export const userRegister=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const registeredUser=await User.findOne({email})
        if(registeredUser){
          res.status(400).json({Message:"User already exists"});
          return;
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({name,email,password:hashedPassword});
        await newUser.save();
        res.status(200).json({Message:"User registered successfully"});
    } catch (error) {
        res.status(500).json({Message:"Server error"});
    }
    
}

export const userLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const loginUser=await User.findOne({email});
        if(!loginUser){
            res.status(400).json({Message:"Invalid credentials"});
            return;
        }
        const isMatch=await bcrypt.compare(password,loginUser.password);
        if(!isMatch){
            res.status(400).json({Message:"Invalid credentials"});
            return;
        }
        res.status(200).json({Message:"Login successful"});
    }
    catch(err){
        res.status(500).json({Message:"Server error"});
    }
}