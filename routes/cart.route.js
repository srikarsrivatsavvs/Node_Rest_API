module.exports = (app) => {
    const cart_controller = require('../controllers/cart.controller');

    // Add Item to Cart
    app.post('/api/add_item', cart_controller.add_item);

    // Item Details
    app.get('/api/item/:id', cart_controller.item_details);

    // View Customer Cart Items
    app.get('/api/cart_items/:id', cart_controller.cart_items);

    app.put('/api/update_cart/:itemId', cart_controller.update_cart);

    app.put('/api/delete_cart/:itemId', cart_controller.delete_cart);

}