const router = require('express').Router();
const Aircraft = require('../models/Aircraft');

module.exports = router

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Aircraft.find({ _id: id })
            .then(aircraft => res.json(aircraft[0]));
    })

    .get('/', (req, res) => {
        const { query } = req;
        Aircraft.find(query)
            .then(aircrafts =>  res.json(aircrafts));
    })

    .post('/', (req, res) => {
        const { name, specs, history } = req.body;
        Aircraft.create({ name, specs, history })
            .then(aircraft => res.json(aircraft));
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;
        const { name, specs, history } = req.body;
        Aircraft.replaceOne({ _id: id }, { name, specs, history })
            .then(aircraft => res.json(aircraft));
    })

    .delete ('/:id', (req, res) => {
        const { id } = req.params;
        Aircraft.deleteOne({ _id: id })
            .then(aircraft => res.json({ removed: !!aircraft.ok }));
    });
