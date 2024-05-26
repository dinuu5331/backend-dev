import mongoose from "mongoose";
import { db } from "../constants.js";

const mongoConnect = async()=>{
try {
    await mongoose.connect(`${process.env.MONGO_URL}/${db}`)
    console.log("mongoDB is connected sucessfully!!!");
} catch (error) {
  console.error(error)  
  console.log("Error in connecting DB");
}
}

export default mongoConnect