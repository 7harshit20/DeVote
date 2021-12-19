const express = require('express');
const connectDb = require('./config/db');
const cookieParser = require('cookie-parser');

connectDb();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/register', require('./route/register'));
app.use('/api/auth', require('./route/auth'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}...`));