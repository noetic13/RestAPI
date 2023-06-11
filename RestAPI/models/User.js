const mongoose= require('mongoose')

const UserSchema = mongoose.Schema({
    name: String,
    email: {type:String , required:true},
    age:Number
})

const User = mongoose.model("User",UserSchema)
module.exports=User