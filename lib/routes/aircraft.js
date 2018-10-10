const router = require('express').Router();
const Aircraft = require('../models/Aircraft');

module.exports = router

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Aircraft.findById(id)
            .then(event => res.json(event));
    })

    .get('/', (req, res) => {
        Aircraft.find()
            .then(aircrafts => res.json(aircrafts));
    })

    .post('/', (req, res) => {
        const { name, specs, history } = req.body;
        Aircraft.create({ name, specs, history })
            .then(event => res.json(event));
    });

    // .put('/:id', (req, res) => {
    //     const { id } = req.params;
    //     const { type, nickname, speed, released, active } = req.body;
    //     Aircraft.update(id, { type, nickname, speed, released, active })
    //         .then(event => res.json(event));
    // })

    // .delete ('/:id', (req, res) => {
    //     const { id } = req.params;
    //     Aircraft.delete(id)
    //         .then(event => res.json(event));
    // });
