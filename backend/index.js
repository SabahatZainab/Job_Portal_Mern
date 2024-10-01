import express from "express"; //creating server 
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

// app.get("/home",(req, res)=>{
//     return res.status(200).json({
//         message:"I am coming from backend",
//         success:true
//     })
// });

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: 'http//localhost:5173', //adding localhost of react
    credentials: true
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;

//API's

//user route
app.use("/api/v1/user", userRoute);
//company route
app.use("/api/v1/company",companyRoute);
//job route
app.use("/api/v1/job",jobRoute);
//application route
app.use("/api/v1/application",applicationRoute);


//user api's
//http://localhost:7000/api/v1/user/register
//http://localhost:7000/api/v1/user/login
//http://localhost:7000/api/v1/user/logout
//http://localhost:7000/api/v1/user/profile/update

//company api's
//http://localhost:7000/api/v1/company/register
//http://localhost:7000/api/v1/company/get
//http://localhost:7000/api/v1/company/get/id
//http://localhost:7000/api/v1/company/update/id

//job api's
//http://localhost:7000/api/v1/job/post
//http://localhost:7000/api/v1/job/get
//http://localhost:7000/api/v1/job/getadminsjobs
//http://localhost:7000/api/v1/job/get/id

//application api's
//http://localhost:7000/api/v1/application/apply/id
//http://localhost:7000/api/v1/application/get
//http://localhost:7000/api/v1/application/id/applicants
//http://localhost:7000/api/v1/application/status/id/update

//backend completed except-logos cloudinary code


app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`)
})