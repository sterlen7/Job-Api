const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,require:true,unique:true},
    password:{type:String, require:true},
    isAdmin:{type:Boolean,default:false},
    banned:{type:Boolean,default:false},
    otpCode: { type: String },
    otpCodeExpires: { type: Date },
    googleId :{type:String,require:true},
    displayName:{type:String,require:true}
},
{
    timestamps: true
})

const User = mongoose.model('User',userSchema)

module.exports= User