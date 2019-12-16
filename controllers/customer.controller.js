const Customer = require("../models/Customer");

const { validationResult } = require("express-validator");
// Customer Signup

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Server side validation failed",
      errors: errors.array()
    });
  }
  // Check if Customer Already Exists with same Email
  await Customer.find({ email: req.body.email })
    .then(count => {
      if (count.length > 0) {
        res.json({
          status: "failed",
          message: "Email Already Exists"
        });
      } else {
        const customer = new Customer({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone
        });

        // Register Customer

        customer
          .save()
          .then(result => {
            res.json({
              status: "success",
              message: "Customer Registered Successfully",
              data: result
            });
          })
          .catch(err => {
            res.json({
              status: "error",
              message: "Something went wrong",
              error: err
            });
          });
      }
    })
    .catch(err => {
      res.json({
        status: "error",
        message: "Something went wrong",
        error: err
      });
    });
};

// Login Existing Customer
exports.login = async (req, res) => {
  await Customer.findOne({
    $or: [
      {
        $and: [{ email: req.body.email }, { password: req.body.password }]
      },
      {
        $and: [{ phone: req.body.phone }, { password: req.body.password }]
      }
    ]
  })
    .then(result => {
      if (result) {
        // If Customer Exists
        res.json({
          status: "success",
          message: "Login Successfull",
          data: result
        });
      } else {
        // If Customer doesn't Exists
        res.json({
          status: "failed",
          message: "Invalid Email or Password",
          data: result
        });
      }
    })
    .catch(err => {
      res.json({
        status: "error",
        message: "Something went wrong",
        error: err
      });
    });
};

// Customer Details
exports.customer_details = async (req, res) => {
  await Customer.findOne({ _id: req.params.id })
    .then(result => {
      if (result) {
        res.json({
          status: "success",
          message: "Customer Found",
          data: result
        });
      } else {
        res.json({
          status: "failed",
          message: "Customer Not Found",
          data: result
        });
      }
    })
    .catch(err => {
      res.json({
        status: "error",
        message: "Something went wrong",
        error: err
      });
    });
};

// Fetch All Customers
exports.customers = async (req, res) => {
  await Customer.find()
    .then(result => {
      res.json({
        status: "success",
        message: result.length + " Customers Found",
        data: result
      });
    })
    .catch(err => {
      res.json({
        status: "error",
        message: "Something went wrong",
        error: err
      });
    });
};

// Update Customer
exports.update_customer = async (req, res) => {
  await Customer.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (err, customer) => {
      if (err) {
        res.json({
          status: "error",
          message: "Something went wrong",
          error: err
        });
      } else {
        if (customer) {
          res.json({
            status: "success",
            message: "Customer Updated Successfully"
          });
        } else {
          res.json({
            status: "failed",
            message: "Customer Not Found"
          });
        }
      }
    }
  );
};

// Delete Customer
exports.delete_customer = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) {
        res.json({
          status: "success",
          message: "Customer Deleted Successfully"
        });
      } else {
        res.json({
          status: "failed",
          message: "Customer Not Found"
        });
      }
    })
    .catch(err => {
      res.json({
        status: "error",
        message: "Something went wrong",
        error: err
      });
    });
};
