
// creating a database to bring mongoose

import mongoose from "mongoose";

// creating a function to connect to the database

const connectDb = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongodb connected successfully...');
    } catch(error){
        console.error(`Error: ${error.message}`);
        process.exit();

    };
};

export default connectDb;
