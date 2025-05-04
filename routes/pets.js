const express = require('express')
const router = express.Router();
const Pet = require('../models/pet');


router.get('/', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (err) {
        res.status(500).send('Error reading pet data from database.');
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, breed, sex, age, about, image } = req.body;
        const newPet = new Pet({ name, breed, sex, age, about, image });
        await newPet.save();
        res.json({ message: 'Pet added successfully!', id: newPet._id });
    } catch (error) {
        res.status(500).send('Error adding pet to database.');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.json({ message: 'Pet deleted successfully!' });
    } catch (error) {
        res.status(500).send('Error deleting pet from database.');
    }
});

module.exports = router;
