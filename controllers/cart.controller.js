const Cart = require('../models/Cart');

exports.add_item = (req, res) => {
    let cart = new Cart({
        customer_id: req.body.customer_id,
        menu_id: req.body.menu_id,
        quantity: req.body.quantity
    })

    cart.save().then(result => {
        res.json({
            status: "success",
            message: "Menu Added to Cart",
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

// Item Details
exports.item_details = async (req, res) => {
    await Cart.findOne({_id: req.params.id}).then(result => {
        if(result) {
            res.json({
                status: "success",
                message: "Item Found",
                data: result
            })
        }
        else {
            res.json({
                status: "failed",
                message: "No Item Found",
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

// Customer Cart Items
exports.cart_items = async (req, res) => {
    await Cart.find({customer_id: req.params.id}).then(result => {
        res.json({
            status: "success",
            message: result.length + " Items Found",
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

// Update Cart Item
exports.update_cart = async (req, res) => {
    await Cart.findByIdAndUpdate(req.params.itemId, {$set: req.body}, (err, cart) => {
        if(err) {
            res.json({
                status: "error",
                message: "Something went wrong",
                error: err
            })
        }
        else {
            if(cart) {
                res.json({
                    status: "success",
                    message: "Cart Item Updated Successfully",
                })
            }
            else {
                res.json({
                    status: "failed",
                    message: "Cart Item Not Found",
                })
            }
        }
    })
}

// Delete Cart Item
exports.delete_cart = async(req, res) => {
    await Cart.findByIdAndDelete(req.params.itemId).then(result => {
        if(result) {
            res.json({
                status: "success",
                message: "Cart Item Deleted Successfully",
            })
        }
        else {
            res.json({
                status: "failed",
                message: "Cart Item Not Found",
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