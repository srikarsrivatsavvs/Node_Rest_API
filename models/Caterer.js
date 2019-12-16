const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

let catererSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    minimum_order_quantity: {type: Number, required: true},
    availability: {type: Boolean, required: true},
    menu_starting_from: {type: Number, required: true},
    delivery_fee: {type: Number, required: true},
    live_kitchen: {type: Boolean, required: true},
    image: {type: String, required: true}
})
module.exports = mongoose.model('caterers', catererSchema);