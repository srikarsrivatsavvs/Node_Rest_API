module.exports = app => {
  const cart_controller = require("../controllers/cart.controller");
  const isAuth = require("../middleware/is-auth");
  // Add Item to Cart
  app.post("/api/add_item", isAuth, cart_controller.add_item);

  // Remove Item from Cart
  app.post("/api/add_item", isAuth, cart_controller.remove_item);

  // // Item Details
  // app.get("/api/item/:id", isAuth, cart_controller.item_details);

  // View Customer Cart Items
  app.get("/api/cart_items/", isAuth, cart_controller.cart_items);

  // app.put("/api/update_cart/:itemId", isAuth, cart_controller.update_cart);

  app.put("/api/empty_cart/", isAuth, cart_controller.empty_cart);
};
