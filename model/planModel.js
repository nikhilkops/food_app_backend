const mongoose = require("mongoose");

let FoodplanSchema = new mongoose.Schema({
  name: { type: String, required: [true, "You need to provide name"] },
  price: { type: Number, required: [true, "You need to provide price"] },
  duration: { type: Number, required: [true, "You need to provide duration"] },
  discount: {
    type: Number,
    validate: {
      validator: function () {
        return this.discount < this.price;
      },
      message: "Discount must be less than price",
    },
  },
  description: { type: String },
});

const planModel = mongoose.model("planModel", FoodplanSchema);
module.exports = { planModel };
