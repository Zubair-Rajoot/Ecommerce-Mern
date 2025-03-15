const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middlewae/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


//registr user 
exports.registerUser = catchAsyncErrors(async(req, res, next)=>{

    const {name, email, password} = req.body;

    const user = await User.create({
        name, email, password,
        avatar:{
            public_id: "this is sample id ",
          url: "profilepicurl",
        }
    });

   
    sendToken(user, 201, res);


});



//login user 
exports.loginUser = catchAsyncErrors(async(req, res, next)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("please Enter Email and password", 400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("invalid email or password", 401))
    };

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid email or password", 401))
    };


    sendToken(user, 201, res)
    
});

//logout user
exports.logout = catchAsyncErrors(async(req,res, next)=>{
  
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "logged out",
    })
});


//forgrt password

exports.forgotPassword = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler("user not found", 404))
    };

    //get reset password token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});



    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/password/reset/${resetToken}`;

    const message = `your password reset token is :-\n\n ${resetPasswordUrl} \n\n if you have not requested this 
    email please ignore it`;


    try {
        await sendEmail({
            email: user.email,
            subject: `ShopSphere passowrd Recovey`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email send to ${user.email} successfully`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500))

    }
})



//reset password
exports.resetPassword = catchAsyncErrors(async(req, res, next)=>{

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest("hex");


    const user = await User.findOne({   
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now()},

    })

    if(!user){
        return next(new ErrorHandler("reset password token is invalid or expired", 404));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("password does not match", 404));
    }


    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;


    await user.save();

    sendToken(user, 200, res);

})


//get user detail
exports.getUserDetails = catchAsyncErrors(async(req, res, next)=>{

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    });
});


//update  user password
exports.updatePassword = catchAsyncErrors(async(req, res, next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("old password is incorrect", 400))
    };

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("New password and confirm password do not match", 400))
    };

    user.password = req.body.newPassword;


    await user.save()


   sendToken(user, 200, res)
});


//update  user profile
exports.updateProfile = catchAsyncErrors(async(req, res, next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });


    res.status(200).json({
        success: true,
        user
    });


});




//get all users -------- admin
exports.getAllUser = catchAsyncErrors(async(req, res, next)=>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
});



//get single user --- admin
exports.getSingleUser = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`user not found with id : ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        user
    })
});


//update  user role ---- admin
exports.updateUserRole = catchAsyncErrors(async(req, res, next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,

    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    await user.save()


    res.status(200).json({
        success: true,
        user
    });


});





//delete user -------- admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with ID ${req.params.id}`, 400));
    }

    await User.deleteOne({ _id: req.params.id }); 

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
});










