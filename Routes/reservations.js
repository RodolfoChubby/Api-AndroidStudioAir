const express = require('express');
const router = express.Router();
const Reservation = require('../Models/reservation');

// Crear una nueva reserva
router.post('/', async (req, res) => {
  const reservation = new Reservation(req.body);
  try {
    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener todas las reservas
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
