const { reservations } = require('../models');

class ReservationRepository {
  createReservation = async (User_id, Sitter_id, date) => {
    await reservations.create(User_id, Sitter_id, date);
  };
}

module.exports = ReservationRepository;
