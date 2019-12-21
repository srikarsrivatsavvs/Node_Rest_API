module.exports = app => {
  const customer_controller = require("../controllers/customer.controller");
  const Customer = require("../models/Customer");
  const { body, check } = require("express-validator");

  // Customer Registration
  app.post(
    "/api/customer_signup",
    //validators for request body fields
    [
      body("first_name", "Invalid First name, enter 1 to 15 characters only")
        .trim()
        .isLength({ min: 1, max: 15 }),
      body("last_name", "Invalid Last name, enter 1 to 15 characters only")
        .trim()
        .isLength({ min: 1, max: 15 }),
      body(
        "password",
        "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 15 char long"
      ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
      body("email", "Enter valid email").isEmail(),
      body("phone", "Enter a valid phone number")
        .isMobilePhone()
        .isLength({ min: 10, max: 10 })
    ],
    customer_controller.signup
  );

  // Customer Login
  app.post(
    "/api/customer_login",
    [
      body("phone", "Enter a valid registered phone number").isMobilePhone(),
      body(
        "password",
        "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 15 char long"
      ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
      body("email", "Enter valid registered email").isEmail()
    ],
    customer_controller.login
  );

  // Customer Details
  app.get(
    "/api/customer_details/:id", //validators for request body fields
    [
      //check the id field in req.param
      check("id").custom(customerId => {
        // console.log(customerId);
        //look for the id in the Customer collection
        return Customer.findById(customerId)
          .then(customer => {
            //if you found a customer
            if (customer !== null) {
              //validation successful
              return true;
            } else {
              //validation failed
              return Promise.reject("Invalid customer Id");
            }
          })
          .catch();
      })
    ],
    customer_controller.customer_details
  );

  // All Customers
  app.get("/api/customers", customer_controller.customers);

  // Update Customer
  app.put(
    "/api/update_customer/:id",
    //validators for request body fields
    [
      //check the id field in req.param
      check("id").custom(customerId => {
        //look for the id in the Customer collection
        return Customer.findById(customerId)
          .then(customer => {
            //if you found a customer
            if (customer !== null) {
              //validation successful
              return true;
            } else {
              //validation failed
              return Promise.reject("Invalid customer Id");
            }
          })
          .catch();
      }),
      body("first_name", "Invalid First name, enter 1 to 15 characters only")
        .trim()
        .isLength({ min: 1, max: 15 }),
      body("last_name", "Invalid Last name, enter 1 to 15 characters only")
        .trim()
        .isLength({ min: 1, max: 15 }),
      body(
        "password",
        "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 15 char long"
      ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
      body("email", "Enter valid email").isEmail(),
      body("phone", "Enter a valid phone number")
        .isMobilePhone()
        .isLength({ min: 10, max: 10 })
    ],
    customer_controller.update_customer
  );

  // Delete Customer
  app.delete(
    "/api/delete_customer/:id",
    [
      //check the id field in req.param
      check("id").custom(customerId => {
        //look for the id in the Customer collection
        return Customer.findById(customerId)
          .then(customer => {
            //if you found a customer
            if (customer !== null) {
              //validation successful
              return true;
            } else {
              //validation failed
              return Promise.reject("Invalid customer Id");
            }
          })
          .catch();
      })
    ],
    customer_controller.delete_customer
  );
};
