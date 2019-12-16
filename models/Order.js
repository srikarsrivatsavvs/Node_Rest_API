const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

let orderSchema = new Schema({
    customer_id: {type: String, required: true},
    caterer_id: {type: String, required: true},
    menu_id: {type: String, required: true},
    quantity: {type: Number, required: true},
    start_date: {type: Date, required: true},
    delivery_date: {type: Date, required: true},
    order_status: {type: String, required: true, default: "active"}
})
module.exports = mongoose.model('orders', orderSchema);