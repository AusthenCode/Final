require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3000;

const Pet = require('./models/pet');
const petRoute = require('./routes/pets');
const commentRoute = require('./routes/comments');
const userRoute= require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/pets');
const db = mongoose.connection
db.once('open',()=>{
    console.log("Success")
});

app.use('/api/pets', petRoute);
app.use('/api/pets/:petId/comments', commentRoute);
app.use('/api/users', userRoute);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});