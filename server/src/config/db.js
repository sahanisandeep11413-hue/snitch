import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async ()=>{
    try{
        await mongoose.connect(config.MONGO_URI)
        console.log("conected");
    }catch(error){
        console.log("error to connect db");
    }
}

export default connectDB;
