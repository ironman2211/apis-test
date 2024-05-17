// routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const Category = require("../models/Category");
const Supplier = require("../models/Supplier");

router.post("/", async (req, res) => {
  try {
    const { name, description, price, quantity, category, supplier } = req.body;

    let categoryId;
    if (category) {
      let existingCategory = await Category.findOne({ name: category.name });
      if (!existingCategory) {
        existingCategory = await Category.create(category);
      }
      categoryId = existingCategory._id;
    }

    // Create or find supplier
    let supplierId;
    if (supplier) {
      let existingSupplier = await Supplier.findOne({ name: supplier.name });
      if (!existingSupplier) {
        existingSupplier = await Supplier.create(supplier);
      }
      supplierId = existingSupplier._id;
    }

    // Create product with category and supplier references
    const product = new Product({
      name,
      description,
      price,
      quantity,
      category: categoryId,
      supplier: supplierId,
    });
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).send("Product not found");
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:productId", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).send("Product not found");
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) return res.status(404).send("Product not found");
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find(req.query);
    console.log(products);
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/:productId/adjust", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    console.log(product);
    if (!product) return res.status(404).send("Product not found");
    product.quantity += req.body.quantity;
    await product.save();
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
