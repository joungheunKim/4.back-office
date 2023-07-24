const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const ReservationController = require('../controllers/reservationsController');
const reservationController = new ReservationController();

router.post(
  '/reservation/:sitter_id',
  authMiddleware,
  reservationController.reservationPost
);
router.get('/reservation', reservationController.reservationAllGet);
router.get('/reservation:sitter_id', reservationController.reservationGet);
router.put(
  '/reservation:sitter_id',
  authMiddleware,
  reservationController.reservationPut
);
router.delete(
  '/reservation:sitter_id',
  authMiddleware,
  reservationController.reservationDelete
);
