import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register User Code Started 
export const register = async (req,res)=>{
    try{
        const {fullname, email, phoneNumber, password, role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Something is missing", //if registeration information is missing
                success:false
            });
        };
        const user = await User.findOne({email}); //check user already exit?
        if(user){
            return res.status(400).json({
                message: 'User already exit with this email.',
                success: false
            })
        };
        const hashedPassword = await bcrypt.hash(password, 10); //password encrypted

        //if user email is unique then create user

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });

    }catch(error){
        console.log(error)
    }
}
//Register User Code Ended

//Login User Code Started
export const login = async(req,res)=>{
    try{
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "Something is missing",
                status: false,
            });
        };
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false 
            });
        };
        //check role is correct or not
        if(role !== user.role){
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        //generate token, and below code for security from hackers
        const tokenDate = {
            userId:user._id
        }
        const token = await jwt.sign(tokenDate, process.env.SECRET_KEY,{expiresIn: '1d'});
        //token expired in one day

        //send user data with success message
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        //login successfully, send data in cookie
        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpsOnly: true, sameSite: 'strict'}).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true,
        });

    }catch(error){
        console.log(error); 
    }
}
//Login User Code Ended

//Logout User 
export const Logout = async (req,res) =>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message: "Logged out successfully.",
            success: true
        });
    }catch(error){
        console.log(error);
    }
}

//Update Profile
export const updateProfile = async(req,res)=>{
    try{
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file;

        if(!fullname || !email || !phoneNumber || !bio || !skills){
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        };

        //cloudinary code here


        //skills comes in String format to convert it in array
        const skillsArray = skills.split(",");
        const userId = req.id; //middleware authentication
        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message: "User not found.",
                status: false,
            });
        }

        //Updating User Data

        user.fullname = fullname,
        user.email = email,
        user.phoneNumber = phoneNumber,
        user.profile.bio = bio,
        user.profile.skills = skillsArray

        //resume code here

        await user.save();

        //updating user data

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        //return data

        return res.status(200).json({
            message: "Profile update successfully.",
            user,
            success: true
        });
    }catch(error){
        console.log(error) 
    }
}