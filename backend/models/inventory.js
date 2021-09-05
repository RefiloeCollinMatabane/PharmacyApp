const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
   pcode:        { type: String, require: true},
   supcode:      { type: String },
   pname:        { type: String },
   supname:      { type: String },
   pdescription: { type: String },
   supnumber:    { type: Number },
   pqty:         { type: Number },
   pminqty:      { type: Number },
   supaddress:   { type: String },
   stockid:      { type: String, require: true},
   unitprice:    { type: Number },
   sellingprice: { type: Number },
   manudate:     { type: Date, timestamp: false },
   expdate:      { type: Date, timestamp: false },
   paymenttype:  { type: String },
   creditdue:    { type: Date, timestamp: false } 

});

 module.exports = mongoose.model("Inventory", inventorySchema);