module.exports = (app) => {
    const caterer_controller = require('../controllers/caterer.controller');
    const upload = require('../config/caterer_image.config.js');

    // caterer Registration
    app.post('/api/caterer_signup', upload.single('image'), caterer_controller.signup);

    // caterer Login
    app.post('/api/caterer_login', caterer_controller.login)

    // caterer Details
    app.get('/api/caterer_details/:id', caterer_controller.caterer_details)

    // All caterers
    app.get('/api/caterers', caterer_controller.caterers)

    // Update caterer
    app.put('/api/update_caterer/:id', caterer_controller.update_caterer);

    // Delete caterer
    app.delete('/api/delete_caterer/:id', caterer_controller.delete_caterer);
    
}