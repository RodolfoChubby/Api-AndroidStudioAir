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

// Obtener una propiedad por ID
router.get('/:id', getProperty, (req, res) => {
  res.json(res.property);
});

// Actualizar una propiedad
router.patch('/:id', getProperty, async (req, res) => {
  if (req.body.title != null) {
    res.property.title = req.body.title;
  }
  if (req.body.description != null) {
    res.property.description = req.body.description;
  }
  if (req.body.location != null) {
    res.property.location = req.body.location;
  }
  if (req.body.pricenight != null) {
    res.property.pricenight = req.body.pricenight;
  }
  if (req.body.maxguests != null) {
    res.property.maxguests = req.body.maxguests;
  }
  if (req.body.status != null) {
    res.property.status = req.body.status;
  }
  res.property.updatedAt = Date.now();

  try {
    const updatedProperty = await res.property.save();
    res.json(updatedProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una propiedad
router.delete('/:id', getProperty, async (req, res) => {
  try {
    await res.property.remove();
    res.json({ message: 'Propiedad eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para obtener propiedad por ID
async function getProperty(req, res, next) {
  let property;
  try {
    property = await Property.findById(req.params.id);
    if (property == null) {
      return res.status(404).json({ message: 'No se pudo encontrar la propiedad' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.property = property;
  next();
}

module.exports = router;
