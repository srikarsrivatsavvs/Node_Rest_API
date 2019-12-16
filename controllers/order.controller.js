const Order = require('../models/Order');

// Create New Order
exports.create_order = async (req, res) => {
    let order = new Order({
        customer_id: req.body.customer_id,
        caterer_id: req.body.caterer_id,
        menu_id: req.body.menu_id,
        quantity: req.body.quantity,
        start_date: req.body.start_date,
        delivery_date: req.body.delivery_date
    })

    order.save().then(result => {
        res.json({
            status: "success",
            message: "Your Order has been Started",
            data: result
        })
    }).catch(err => {
        res.json({
            status: "error",
            message: "Something went wrong",
            error: err
        })
    })
}

// Fetch All Orders
exports.orders = async (req, res) => {
    await Order.find().then(result => {
        res.json({
            status: "success",
            message: result.length + " Orders Found",
            data: result
        })
    }).catch(err => {
        res.json({
            status: "error",
            message: "Something went wrong",
            error: err
        })
    })
}

// Order Details
exports.order_details = async (req, res) => {
    await Order.findOne({_id: req.params.id}).then(result => {
        if(result) {
            res.json({
                status: "success",
                message: "Order Found",
                data: result
            })
        }
        else {
            res.json({
                status: "failed",
                message: "No Order Found",
                data: result
            })
        }
    }).catch(err => {
        res.json({
            status: "error",
            message: "Something went wrong",
            error: err
        })
    })
}

// Customer Orders
exports.customer_orders = async (req, res) => {
    await Order.find({customer_id: req.params.id}).then(result => {
        res.json({
            status: "success",
            message: result.length + " Orders Found",
            data: result
        })
    }).catch(err => {
        res.json({
            status: "error",
            message: "Something went wrong",
            error: err
        })
    })
}

// Caterer Orders
exports.caterer_orders = async (req, res) => {
    await Order.find({caterer_id: req.params.id}).then(result => {
        res.json({
            status: "success",
            message: result.length + " Orders Found",
            data: result
        })
    }).catch(err => {
        res.json({
            status: "error",
            message: "Something went wrong",
            error: err
        })
    })
}

// Update Order Status
exports.update_order = async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, {$set: {order_status: req.body.status}}, (err, order) => {
        if(err) {
            res.json({
                status: "error",
                message: "Something went wrong",
                error: err
            })
        }
        else {
            if(order) {
                res.json({
                    status: "success",
                    message: "Order Updated Successfully",
                })      
            }
            else {
                res.json({
                    status: "failed",
                    message: "No Order Found",
                }) 
            }
        }
    })
}

// Delete Order
exports.delete_order = async (req, res) => {
    await Order.findByIdAndDelete(req.params.id).then(result => {
        if(result) {
            res.json({
                status: "success",
                message: "Order Deleted Successfully",
            })
        }
        else {
            res.json({
                status: "failed",
                message: "Order Not Found",
            })
        }
        
    }).catch(err => {
        res.json({
            status: "error",
            message: "Something went wrong",
            error: err
        })
    })
}