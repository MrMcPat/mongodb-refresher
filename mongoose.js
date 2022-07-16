const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose
  .connect(
    `mongodb+srv://admin-pat:789632145@cluster0.smilb.mongodb.net/products_test?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

async function createProduct(req, res, next) {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await createdProduct.save();

  res.json(result);
}

async function getProducts(req, res, next) {
  const products = await Product.find().exec();
  res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;
