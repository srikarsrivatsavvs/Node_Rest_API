module.exports = (app) => {
    const menu_controller = require('../controllers/menu.controller');

    // Create Menu
    app.post('/api/create_menu', menu_controller.create_menu);

    // Fetch All Menus
    app.get('/api/menus', menu_controller.menus);

    // Update Menu
    app.put('/api/update_menu/:id', menu_controller.update_menu);

    // Menu Details
    app.get('/api/menu/:id', menu_controller.menu);

    // Delete Menu
    app.delete('/api/delete_menu/:id', menu_controller.delete_menu);
}