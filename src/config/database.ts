import mongoose from 'mongoose'
const URI = process.env.MONGODB_URI!;

export const connectMongoDB = async () => {
    try{
        await mongoose.connect(URI)
        console.log("Mongodb connected !");
    }catch(err: any){
        console.log(err);
        process.exit(1);
    }
}
