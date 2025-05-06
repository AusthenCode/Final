const express = require('express')
const router = express.Router();
const Pet = require('../models/pet');

function checkAuthentication(req,res,next){
    req.user={id:7}
    if(!authenticated) res.status(501).json('FAILED TO AUTHENTICATE')
    else next();
}

router.get('/', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (err) {
        res.status(500).send('Error reading pet data from database.');
    }
});

router.post('/', checkAuthentication, async (req, res) => {
    console.log(req.user);
    try {
        const { name, breed, sex, age, about, image } = req.body;
        const newPet = new Pet({ name, breed, sex, age, about, image });
        await newPet.save();
        res.json({ message: 'Pet added successfully!', id: newPet._id });
    } catch (error) {
        res.status(500).send('Error adding pet to database.');
    }
});

router.delete('/:id', checkAuthentication,async (req, res) => {
    try {
        //find document
        //check if document.authorID!=req.user.ID res.status(501).json('You are not authorized to delete this document')
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
