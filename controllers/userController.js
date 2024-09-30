
import expressAsyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from '../models/userModels.js';
// @desc Auth User/set token
// route POST /api/users/auth
// @access public
const authUser = expressAsyncHandler(async(req, res) =>{

    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user &&(await user.matchPassword(password))){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email:user.email
        });
    } else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
    // });

    // res.status(401);
    // throw new Error('Something Went Wrong..');
    // res.status(200).json({message:"Auth User"})
});

// @desc Register a New User
// route POST /api/users
// @access public
const registerUser = expressAsyncHandler(async(req, res) =>{

    // res.status(401);
    // throw new Error('Something Went Wrong..');
    const {name,email,password} = req.body;
    console.log(name,email, password);
const userExists = await User.findOne({email});
if(userExists){
    res.status(400);
    throw new Error('User Already Exists');
};
const user = await User.create({
    name,
    email,
    password
});
if(user){
    generateToken(res, user._id);
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email:user.email
    });
} else{
    res.status(400);
    throw new Error('Invalid user details');
}
});

// @desc Logout User
// route POST /api/users/logout
// @access public
const logoutUser = expressAsyncHandler(async(req, res) =>{

    // res.status(401);
    // throw new Error('Something Went Wrong..');
    res.cookie('jwt', '',{
        httpOnly:true,
        expires: new  Date(0)
    });


    res.status(200).json({message:"User Logged Out"});
});

// @desc get the user proile
// route GET /api/users/userProfile
// @access private
const getUserProfile = expressAsyncHandler(async (req, res) =>{

    // res.status(401);
    // throw new Error('Something Went Wrong..');
    res.status(200).json({message:"Get user profile"})
});

// @desc update user proile
// route PUT /api/users/Profile
// @access private
const updateUserProfile = expressAsyncHandler(async(req, res) =>{

    // res.status(401);
    // throw new Error('Something Went Wrong..');
    res.status(200).json({message:"update user profile"})
});
export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};