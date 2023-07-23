const express = require('express');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users.route');
const sitterRouter = require('./routes/sitters.routes');
const postsRouter = require('./routes/posts');
const reviewRouter = require('./routes/reviews');
const app = express();
const PORT = 3000;
const dotenv = require('dotenv');
dotenv.config();

const router = require('./routes');

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.static('assets'));

app.use('/api', [usersRouter, sitterRouter, postsRouter, reviewRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});
