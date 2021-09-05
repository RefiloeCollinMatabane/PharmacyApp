const express = require("express");

const Supplier = require("../models/supplier");

const router = express.Router();


router.post("/addsupplier", (req, res, _next) =>{
    const supplier = new Supplier({

        supcode:    req.body.supcode,
        supname:    req.body.supname,
        supnumber:  req.body.supnumber,
        supaddress: req.body.supaddress

  });
  supplier.save()
    .then(result => {
        res.status(201).json({
          message: 'Supplier Added!',
          result: result
        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
           });
    });
});

router.get("/showsuppliers", (req, res, _next) =>{
    Supplier.find().then(documents => {
        res.status(200).json({
            message: "Product Fetched!",
            suppliers: documents  
        });
    });

  });

  router.get("/:id",(req,res,next)=>{
    Supplier.findById(req.params.id).then(supplier =>{
      if(supplier){
        res.status(200).json(supplier);
      }else{
        res.status(200).json({message:'Supplier not found'});
      }
    });
  });


  router.put("/:id", (req, res) => {
    const supplier = new Supplier({
        id:          req.body.id,
        supcode:        req.body.supcode,
        supname:      req.body.supname,
        supnumber:        req.body.supnumber,
        supaddress:      req.body.supaddress

    });
    console.log(supplier);
    Supplier.updateOne({id: req.params.id}, supplier).then(result => {
    console.log(result);  
    res.status(200).json({message : 'Update Successful!'});
    });      
 });
  
  
  router.delete("/:id", (req, res, next) => {
    Supplier.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: 'Supplier deleted!' });
    });
  });





module.exports = router;