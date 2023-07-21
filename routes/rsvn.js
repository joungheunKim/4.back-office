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
app.get('/api/reservations/:id', (req, res) => {
  const reservationId = parseInt(req.params.id);

  // 예약 ID로 예약 정보 조회
  const reservation = reservations.find(reservation => reservation.id === reservationId);

  if (!reservation) {
    // 해당 예약 ID로 조회된 예약이 없을 경우
    res.status(404).json({ error: 'Reservation not found' });
  } else {
    // 예약 정보를 클라이언트로 전송
    res.json(reservation);
  }
});

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
app.get('/api/reservations/:id', (req, res) => {
  const reservationId = req.params.id;

  const query = `SELECT * FROM reservations WHERE id = ?`;
  connection.query(query, [reservationId], (error, results) => {
    if (error) {
      console.error('Failed to fetch reservation', error);
      res.status(500).json({ error: 'Failed to fetch reservation' });
    } else {
      if (results.length === 0) {

        res.status(404).json({ error: 'Reservation not found' });
      } else {

        const reservation = results[0];
        res.json({ reservation });
      }
    }
  });
});