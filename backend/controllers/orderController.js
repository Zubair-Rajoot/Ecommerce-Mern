const Order = require('../models/orderModel');

const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');

const catchAsyncErrors = require('../middlewae/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeautures');

//create new order 
exports.newOrder = catchAsyncErrors(async(req, res, next)=>{
    const {
            shippingInfo, 
             orderItems,
             paymentInfo,
             ItemsPrice, 
             taxPrice, 
              shippingPrice,
             totalPrice
        } = req.body;

    

        const order = await Order.create({
            shippingInfo, 
            orderItems,
            paymentInfo,
            ItemsPrice, 
            taxPrice, 
             shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
        })


        res.status(200).json({
            success: true,
            order
        })
});


//get single order 
exports.getSingleOrder = catchAsyncErrors(async(req, res, next)=>{
    const order = await Order.findById(req.params.id).populate(
        "user",
        'name email'
    );

    if(!order){
        return next(new ErrorHandler(`order not found with this id `, 404))
    };

    res.status(200).json({
        success: true,
        order
    });
});


//get logged in user orders 
exports.myOrders = catchAsyncErrors(async (req, res, next) => {

    if (!req.user || !req.user._id) {
        return next(new ErrorHandler("User not authenticated", 401));
    }

    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders
    });
});



//get all orders ---------admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount+=order.totalPrice;
    });

    res.status(200).json({
        success: true,
        orders
    });
});




//update order status ---------admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler(`order not found with this id `, 404))
    };
    

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this order", 400))
    }

    order.orderItems.forEach(async(or)=>{
       await updateStock(or.product, or.quantity)
    });

    order.orderStatus = req.body.status;
   

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }


    await order.save({validateBeforeSave: false});


    
    res.status(200).json({
        success: true,
     
    });
});


async function updateStock(id, quantity){
    const product = await Product.findById(id);

    product.Stock-=quantity;

    await product.save({validateBeforeSave: false});
};





//orders order ---------admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

   
    if(!order){
        return next(new ErrorHandler(`order not found with this id `, 404))
    };

    await order.deleteOne();


    res.status(200).json({
        success: true,
    });
});









