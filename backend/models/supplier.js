const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema({
   supcode:    { type: String, require: true },
   supname:    { type: String },
   supnumber:  { type: Number },
   supaddress: { type: String }

   
});

 module.exports = mongoose.model("Supplier", supplierSchema);