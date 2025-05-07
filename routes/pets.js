const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Pet = require('../models/pet');
const authenticateToken = require('../middleware/auth');

router.get('/', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (err) {
        res.status(500).send('Error reading pet data from database.');
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { name, breed, sex, age, about, image } = req.body;
        const newPet = new Pet({ name, breed, sex, age, about, image });
        await newPet.save();
        res.json({ message: 'Pet added successfully!', id: newPet._id });
    } catch (error) {
        res.status(500).send('Error adding pet to database.');
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.json({ message: 'Pet deleted successfully!' });
    } catch (error) {
        res.status(500).send('Error deleting pet from database.');
    }
});

router.patch('/:id', async (req, res) => {
    try {
        await Pet.findByIdAndUpdate(req.params.id,
        {$set: req.body},
        {new: true} 
    )
        res.json({message: 'Pet updated successfully!'});
    }
    catch (error) {
        res.status(500).send('Error: Shit i broke something.');
    }
});

module.exports = router;
