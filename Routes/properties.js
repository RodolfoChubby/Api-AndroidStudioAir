const express = require('express');
const router = express.Router();
const Property = require('../Models/property');

// Crear una nueva propiedad
router.post('/', async (req, res) => {
  const property = new Property(req.body);
  try {
    const savedProperty = await property.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener todas las propiedades
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
 