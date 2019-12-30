const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.set("useFindAndModify", false);

let customerSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  verified: { type: Boolean, required: true },
  cart: [
    {
      menu_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menus",
        required: true
      },
      quantity: { type: Number, required: true }
    }
  ]
});
module.exports = mongoose.model("customers", customerSchema);
