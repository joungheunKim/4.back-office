const ReservationRepository = require('../repositories/reservationsRepository');

class ReservationService {
  reservationRepository = new ReservationRepository();
}

module.exports = ReservationService;
