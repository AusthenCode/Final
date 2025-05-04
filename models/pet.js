const mongoose = require('mongoose')

const newPet = new mongoose.Schema({
    name: String,
    breed: String,
    sex: String,
    age: Number,
    about: String,
    image: String
});

const Pets = mongoose.model('pets', newPet);

module.exports = Pets;