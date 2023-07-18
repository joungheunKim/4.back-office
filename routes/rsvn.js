const express = require('express');
const app = express();

// 예약 등록 API
app.post('/api/reservations', (req, res) => {
    const { name, number, date, time } = req.body;

    const reservation = new reservation({
        name,
        number,
        date,
        time
    })

    reservation.save()
    .then(() => {
        res.status(201).json({ Message: 'Reserved' });
    })
    .catch(error => {
        res.status(500).json({ errorMessage: 'Failed' });
    })
});


// 예약 수정 API
app.put('/api/reservations/:id', (req, res) => {
    const reservationId = req.params.id;

    const { name, date, time } = req.body;

    Reservation.findByIdAndUpdate(
        reservationId,
        { name, date, time },
        { new: true }
      )
        .then(updatedReservation => {
          if (!updatedReservation) {
            res.status(404).json({ error: 'Reservation Not Found' });
          } else {
            res.json({ message: 'Reservation updated', reservation: updatedReservation });
          }
        })
        .catch(error => {
          res.status(500).json({ error: 'Failed to update reservation' });
        });
    });
    
// 예약 확인 API
app.get


// 예약 취소 API
app.delete('/api/reservations/:id', (req, res) => {
    const reservationId = req.params.id;
  
    const query = `DELETE FROM reservations WHERE id = ?`;
    connection.query(query, [reservationId], (error, results) => {
      if (error) {
        console.error('Failed to delete reservation', error);
        res.status(500).json({ error: 'Failed to delete reservation' });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Reservation not found' });
        } else {
          res.json({ message: 'Reservation deleted' });
        }
      }
    });
  });

// 예약 검색 API
app.get