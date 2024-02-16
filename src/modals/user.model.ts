import { Schema ,model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    refreshToken: {
        type: String,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
},{timestamps: true})

// encrypt the user password
userSchema.pre('save',async function(next){
    if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password,13);
    }
    return next();
})

// compare password 
userSchema.methods.comparePassword = async function(password:string){
    return await bcrypt.compare(password,this.password);
}

export default model('User',userSchema)