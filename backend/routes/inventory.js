const express = require("express");

const Inventory = require("../models/inventory");

const router = express.Router();

router.post("/addproduct", (req, res, _next) =>{
        const inventory = new Inventory({

            pcode:        req.body.pcode,
            supcode:      req.body.supcode,
            pname:        req.body.pname,
            supname:      req.body.supname,
            pdescription: req.body.pdescription,
            supnumber:    req.body.supnumber,
            pqty:         req.body.pqty,
            pminqty:      req.body.pminqty,
            supaddress:   req.body.supaddress,
            stockid:      req.body.stockid,
            unitprice:    req.body.unitprice,
            sellingprice: req.body.sellingprice,
            manudate:     req.body.manudate,
            expdate:      req.body.expdate,
            paymenttype:  req.body.paymenttype,
            creditdue:    req.body.creditdue


      });
      inventory.save()
        .then(result => {
            res.status(201).json({
              message: 'Prouct Added!',
              result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error:err
               });
        });
    });

    router.get("/showproducts", (req, res, _next) =>{
        Inventory.find().then(documents => {
            res.status(200).json({
                message: "Product Fetched!",
                products: documents
            });
        });

      });

      router.get("/:id",(req,res,next)=>{
        Inventory.findById(req.params.id).then(inventory =>{
          if(inventory){
            res.status(200).json(inventory);
          }else{
            res.status(200).json({message:'Inventory not found'});
          }
        });
      });


      router.put("/:id", (req, res) => {
        const inventory = new Inventory({
            id:          req.body.id,
            pcode:        req.body.pcode,
            supcode:      req.body.supcode,
            pname:        req.body.pname,
            supname:      req.body.supname,
            pdescription: req.body.pdescription,
            supnumber:    req.body.supnumber,
            pqty:         req.body.pqty,
            pminqty:      req.body.pminqty,
            supaddress:   req.body.supaddress,
            stockid:      req.body.stockid,
            unitprice:    req.body.unitprice,
            sellingprice: req.body.sellingprice,
            manudate:     req.body.manudate,
            expdate:      req.body.expdate,
            paymenttype:  req.body.paymenttype,
            creditdue:    req.body.creditdue
        });
        console.log(inventory);
        Inventory.updateOne({id: req.params.id}, inventory).then(result => {
        console.log(result);  
        res.status(200).json({message : 'Update Successful!'});
        });      
     });
      
      
      router.delete("/:id", (req, res, next) => {
        Inventory.deleteOne({ _id: req.params.id }).then(result => {
          console.log(result);
          res.status(200).json({ message: 'Inventory deleted!' });
        });
      });  
  

module.exports = router;

