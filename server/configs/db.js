import mongoose from 'mongoose';
const connectDB=async()=>{
    try{
        let mongodbUri=process.env.MONGODB_URI;
        const projectName='resume-builder';
        if(!mongodbUri){
            throw new Error("MONGODB_URI environment vairable not set")
        }
        
        if(mongodbUri.endsWith('/')){
            mongodbUri=mongodbUri.slice(0,-1) 
        }
        await mongoose.connect(`${mongodbUri}/${projectName}`);

        console.log("Database is connected successfully");
    }catch(err){
        
        console.log('Error connecting to MongoDB:',err);
        
    }
}

export default connectDB;