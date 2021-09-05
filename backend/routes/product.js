const express = require("express");

const Product = require("../models/product");

const router = express.Router();


router.post("/addproduct", (req, res, _next) => {
  const product = new Product({
    pcode: req.body.pcode,
    pname: req.body.pname,
    pdescription: req.body.pdescription,
    pminqty: req.body.pminqty
  });
  product.save()
    .then(result => {
      res.status(201).json({
        message: 'Prouct Added!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});



router.get("/showproducts", (req, res, _next) => {
  Product.find().then(documents => {
    res.status(200).json({
      message: "Products Fetched!",
      products: documents
    });
  });

});


router.put("/:id", (req, res) => {
  const product = new Product({
    id: req.query.id,
    pcode: req.query.pcode,
    pname: req.query.pname,
    pdescription: req.query.pdescription,
    pminqty: req.query.pminqty
  });
  console.log(product);
  Product.findByIdAndUpdate({ id: req.params.id }, { product }).then(result => {   //  updateOne
    console.log(result);
    res.status(200).json({ message: 'Update Successful!' });
  });
});


router.delete("/:id", (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Product deleted!' });
  });
});


module.exports = router;