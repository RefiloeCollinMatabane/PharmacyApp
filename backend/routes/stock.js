const express = require("express");

const Stock = require("../models/stock");

const router = express.Router();



router.post("/additem", (req, res, _next) => {
    const stock = new Stock({
      icode: req.body.icode,
      iname: req.body.iname,
      idescription: req.body.idescription,
      uprice: req.body.uprice
    });
    stock.save()
      .then(result => {
        res.status(201).json({
          message: 'Item Added!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
    });
});


router.get("/getitems", (req, res, _next) => {
    Stock.find().then(documents => {
      res.status(200).json({
        message: "Items Fetched!",
        products: documents
      });
    });
  
});

router.get("/:id",(req,res,next)=>{
    Stock.findById(req.params.id).then(stock =>{
      if(stock){
        res.status(200).json(stock);
      }else{
        res.status(200).json({message:'Item not found'});
      }
    }).catch(error => {
        res.status(500).json({
            message: "Fetched failed!"

        });
    });

});










module.exports = router;