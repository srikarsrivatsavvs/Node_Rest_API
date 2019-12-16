module.exports = app => {
  const customer_controller = require("../controllers/customer.controller");

  const { body } = require("express-validator");

  // Customer Registration
  app.post(
    "/api/customer_signup",
    //validators for request body fields
    [
      body("first_name", "First name should contain 1 to 15 characters only")
        .trim()
        .isLength({ min: 1, max: 15 }),
      body("last_name", "enter valid last name")
        .trim()
        .isLength({ min: 1, max: 15 }),
      body(
        "password",
        "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 15 char long"
      ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
      body("email", "enter valid email").isEmail(),
      body("phone", "enter a valid phone number").isMobilePhone()
    ],
    customer_controller.signup
  );

  // Customer Login
  app.post(
    "/api/customer_login",
    [
      body("phone", "enter a valid registered phone number").isMobilePhone(),
      body(
        "password",
        "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 15 char long"
      ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
      body("email", "enter valid registered email").isEmail()
    ],
    customer_controller.login
  );

  // Customer Details
  app.get("/api/customer_details/:id", customer_controller.customer_details);

  // All Customers
  app.get("/api/customers", customer_controller.customers);

  // Update Customer
  app.put("/api/update_customer/:id", customer_controller.update_customer);

  // Delete Customer
  app.delete("/api/delete_customer/:id", customer_controller.delete_customer);
};
