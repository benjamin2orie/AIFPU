
// creating a user model using mongoose ans schema

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: 8,
        maxLength: 30,
    },

    email:{
        type: String,
        required: true,
        unique: true,
    },

    password:{
        type:String,
        required: true,
        minLength:8,
        maxLength:30
    }
}, {
    timestamps: true
});

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
      return  next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// userSchema.methods.matchPassword = async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword, this.password);
// };

const User = mongoose.model('User', userSchema);

export default User;