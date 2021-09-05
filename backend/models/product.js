const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
   pcode:        { type: String, require: true},
   pname:        { type: String },
   pdescription: { type: String },
   pminqty: { type: Number }
   
});

 module.exports = mongoose.model("Product", productSchema);