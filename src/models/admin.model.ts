import bcrypt from 'bcrypt'
import { Schema,model } from "mongoose";


const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
},{timestamps: true})

// hash password
adminSchema.pre('save',async function(next: any){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,11);
    }

    next();
})

// compare password

adminSchema.methods.comparePassword = async function(password:string){
    return await bcrypt.compare(password,this.password);
}

export default model('Admin',adminSchema);