import mongoose from "mongoose";

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('mongodb connected sucessfully');
    }catch(error){
        console.log('mongodb connection failed',error);
    }
}
export default connectDB;