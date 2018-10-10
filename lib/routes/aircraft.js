const router = require('express').Router();
const Aircraft = require('../models/Aircraft');

module.exports = router

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Aircraft.find({ _id: id })
            .then(event => res.json(event[0]));
    })

    .get('/', (req, res) => {
        const { query } = req;
        Aircraft.find(query)
            .then(aircrafts =>  res.json(aircrafts));
    })

    // .get('/', (req, res) => {
    //     const { id } = req.params;
    //     const query = !!id ? { _id: id } : req.query;
    //     Aircraft.find(query)
    //         .then(aircrafts => {
    //             if(!!id) res.json(aircrafts[0]);
    //             else res.json(aircrafts);
    //         });
    // })

    .post('/', (req, res) => {
        const { name, specs, history } = req.body;
        Aircraft.create({ name, specs, history })
            .then(event => res.json(event));
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;
        const { name, specs, history } = req.body;
        Aircraft.replaceOne({ _id: id }, { name, specs, history })
            .then(event => res.json(event));
    })

    .delete ('/:id', (req, res) => {
        const { id } = req.params;
        Aircraft.deleteOne({ _id: id })
            .then(event => event.ok === 1 ? res.json({ removed: true }) : res.json({ removed: false }));
    });
