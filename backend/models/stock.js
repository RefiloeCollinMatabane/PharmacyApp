const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
   icode:        { type: String, require: true},
   iname:        { type: String },
   idescription: { type: String },
   uprice: { type: Number}
   
});

 module.exports = mongoose.model("Stock", productSchema);