module.exports = (app) => {
    const order_controller = require('../controllers/order.controller');

    // Create Order
    app.post('/api/create_order', order_controller.create_order);

    // Fetch All Orders
    app.get('/api/orders', order_controller.orders);

    // Order Details
    app.get('/api/order/:id', order_controller.order_details);

    // Customer Orders
    app.get('/api/customer_orders/:id', order_controller.customer_orders);

    // Caterer Orders
    app.get('/api/caterer_orders/:id', order_controller.caterer_orders);

    // Update Order Status
    app.put('/api/update_order/:id', order_controller.update_order);

    // Delete Order
    app.put('/api/delete_order/:id', order_controller.delete_order);
}