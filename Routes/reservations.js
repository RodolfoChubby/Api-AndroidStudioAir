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

// Obtener una reserva por ID
router.get('/:id', getReservation, (req, res) => {
  res.json(res.reservation);
});

// Actualizar una reserva
router.patch('/:id', getReservation, async (req, res) => {
  if (req.body.propertyid != null) {
    res.reservation.propertyid = req.body.propertyid;
  }
  if (req.body.userid != null) {
    res.reservation.userid = req.body.userid;
  }
  if (req.body.startdate != null) {
    res.reservation.startdate = req.body.startdate;
  }
  if (req.body.enddate != null) {
    res.reservation.enddate = req.body.enddate;
  }
  if (req.body.totalprice != null) {
    res.reservation.totalprice = req.body.totalprice;
  }
  if (req.body.status != null) {
    res.reservation.status = req.body.status;
  }
  res.reservation.updatedAt = Date.now();

  try {
    const updatedReservation = await res.reservation.save();
    res.json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una reserva
router.delete('/:id', getReservation, async (req, res) => {
  try {
    await res.reservation.remove();
    res.json({ message: 'Reserva eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para obtener reserva por ID
async function getReservation(req, res, next) {
  let reservation;
  try {
    reservation = await Reservation.findById(req.params.id);
    if (reservation == null) {
      return res.status(404).json({ message: 'No se pudo encontrar la reserva' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.reservation = reservation;
  next();
}

module.exports = router;
