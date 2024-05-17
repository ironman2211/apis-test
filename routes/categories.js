// routes/categories.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.post('/', async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).send(category);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        console.log(categories);
        res.send(categories);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/:categoryId', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.categoryId, req.body, { new: true });
        if (!category) return res.status(404).send('Category not found');
        res.send(category);
    } catch (err) {
        res.status(500).send(err);
    }
});


router.delete("/:categoryId", async (req, res) => {
    try {
      const product = await Category.findByIdAndDelete(req.params.categoryId);
      if (!product) return res.status(404).send("Product not found");
      res.send(product);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
module.exports = router;
