const MongoClient = require("mongodb").MongoClient;

const url = `mongodb+srv://admin-pat:789632145@cluster0.smilb.mongodb.net/products_test?retryWrites=true&w=majority`;

async function createProduct(req, res, next) {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: "Could not store data." });
  }

  res.json(newProduct);
}

async function getProducts(req, res, next) {
  const client = new MongoClient(url);

  let products;

  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (error) {
    return res.json({ message: "Could not retrieve data." });
  }

  res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;
