const ReservationService = require('../services/reservationsService');

class ReservationController {
  reservationService = new ReservationService();
}

module.exports = ReservationController;
