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
app.put
// 예약 확인 API
app.get
// 예약 취소 API
app.delete
// 예약 검색 API
app.get