import mongoose,{Schema} from "mongoose";
import bycrypt from "bcrypt"
import jwt from  "jsonwebtoken"

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true, 
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avtar:{
        type:String,
        required:true
    },
    coverImg:{
        type:String
    },
    watchHistrory:[{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }],
    password:{
       type:String,
       required:[true,'password is required..!'] 
    }
},{
    timestamps:true
})

userSchema.pre("save",function(next){
if(!this.isModified("password")) return next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
           _id: this._id,
           email:this.email,
           username:this.username,
           fullName:this.fullName 
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
const user = mongoose.model("User",userSchema)