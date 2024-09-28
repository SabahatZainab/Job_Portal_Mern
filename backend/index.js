import express from "express"; //creating server 
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";

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
app.use("/api/v1/user", userRoute);

//user api's
//http://localhost:7000/api/v1/user/register


app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`)
})