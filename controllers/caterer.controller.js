const Caterer = require('../models/Caterer');
const cloudinary = require('cloudinary');

var imgUrl = null;
var urlImage = null;

// Image Upload
async function uploadImage(image){
    console.log( "Image is " + image)
    imgUrl = await cloudinary.uploader.upload(image, {folder: "user_images/"}, function(result){
        console.log(result.url);
        return result.url;
        }, function (err) {
            console.log("Error is here " + err)
        });
    return imgUrl;
}

// Caterer Registration
exports.signup = async (req, res) => {

    // Check if Caterer Already Exists with same Email
    console.log(req.body)
    var imageFile = req.file.path;

    if(imageFile !== null) {
        console.log("Yes Image is here " + imageFile)
        await uploadImage(imageFile);
        urlImage = JSON.stringify(imgUrl.url);
    }
    else {
        console.log("No Image")
        urlImage = "";
    }

    await Caterer.find({email: req.body.email}).then(count => {
        if(count.length > 0) {
            res.json({
                status: "failed",
                message: "Email Already Exists"
            });
        }
        else {
            const caterer = new Caterer({
                name: req.body.name,
                description: req.body.description,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                minimum_order_quantity: req.body.minimum_order_quantity,
                availability: req.body.availability,
                menu_starting_from: req.body.menu_starting_from,
                delivery_fee: req.body.delivery_fee,
                live_kitchen: req.body.live_kitchen,
                image: urlImage
            });

            // Register Caterer

            caterer.save().then(result => {
                res.json({
                    status: "success",
                    message: "Caterer Registered Successfully",
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
    }).catch(err => {
        res.json({
            status: "error",
            message: "Something went wrong",
            error: err
        })
    })
}

// Caterer Login

exports.login = async (req, res) => {
    await Caterer.findOne({$and: [{ email: req.body.email }, { password: req.body.password }] })
        .then(result => {
            if(result ) {
                // If Caterer Exists
                res.json({
                    status: "success",
                    message: "Login Successfull",
                    data: result
                })
            }
            else {
                // If Caterer doesn't Exists
                res.json({
                    status: "failed",
                    message: "Invalid Email or Password",
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

// Caterer Details

exports.caterer_details = async (req, res) => {
    await Caterer.findOne({_id: req.params.id}).then(result => {
        if(result) {
            res.json({
                status: "success",
                message: "Caterer Found",
                data: result
            })
        }
        else {
            res.json({
                status: "failed",
                message: "Caterer Not Found",
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

// Fetch All Caterers

exports.caterers = async (req, res) => {
    await Caterer.find().then(result => {
        res.json({
            status: "success",
            message: result.length + " Caterers Found",
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

// Update Caterer

exports.update_caterer = async (req, res) => {
    await Caterer.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, caterer) => {
        if(err) {
            res.json({
                status: "error",
                message: "Something went wrong",
                error: err
            })
        }
        else {
            if(caterer) {
                res.json({
                    status: "success",
                    message: "Caterer Updated Successfully",
                })
            }
            else {
                res.json({
                    status: "failed",
                    message: "Caterer Not Found",
                })
            }
        }
    })
}

// Delete Caterer

exports.delete_caterer = async (req, res) => {
    await Caterer.findByIdAndDelete(req.params.id).then(result => {
        if(result) {
            res.json({
                status: "success",
                message: "Caterer Deleted Successfully",
            })
        }
        else {
            res.json({
                status: "failed",
                message: "Caterer Not Found",
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