const express = require('express')
const router = express.Router({mergeParams: true});
const Pet = require('../models/pet.js');

router.get('/', async (req, res) => {
    try{
        const pet = await Pet.findById(req.params.petId);
        if(!pet) return res.status(400).json("No pet found");
        res.json(pet.comments);
    } catch (err) {
        res.status(501).send('Error getting comment')
    }
});

router.post('/', async (req, res) => {
    try{
        const pet = await Pet.findById(req.params.petId);
        if(!pet) {
            return res.status(400).json("No pet found");
        }
        console.log(req.body);
        pet.comments.push({
            text: req.body.text,
            createdAt: Date.now()
        });

        await pet.save();
        console.log("Saved comment");
        res.status(200).json({message: "Cpmment added", comments: req.body.text});
    }
    catch(err){
        console.log(err);
        res.status(500).json("Error adding a comment");
    }
});

module.exports = router;