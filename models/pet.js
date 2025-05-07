const mongoose = require('mongoose')

const newComment = new mongoose.Schema({
    text: {type: String, required: true},
    createdAt: { type: Date, default: Date.now }
});

const newPet = new mongoose.Schema({
    name: String,
    breed: String,
    sex: String,
    age: Number,
    about: String,
    image: String,
    comments: [newComment]
});

const Pets = mongoose.model('pets', newPet);

module.exports = Pets;