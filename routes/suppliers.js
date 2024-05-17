// routes/suppliers.js
const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

router.post('/', async (req, res) => {
    try {
        const supplier = new Supplier(req.body);
        await supplier.save();
        res.status(201).send(supplier);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.send(suppliers);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/:supplierId', async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndUpdate(req.params.supplierId, req.body, { new: true });
        if (!supplier) return res.status(404).send('Supplier not found');
        res.send(supplier);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
