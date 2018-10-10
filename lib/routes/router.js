const router = require('express').Router();
const Aircraft = require('../models/Aircraft');

const resources = {
    Aircraft,
};

module.exports = router

    .get('/:id', (req, res) => {
        const { id } = req.params;
        resources[resource].findById(id)
            .then(event => res.json(event));
    })

    .get('/', (req, res) => {
        resources[resource].find()
            .then(aircrafts => res.json(aircrafts));
    })

    .post('/', (req, res) => {
        const { name, specs, history } = req.body;
        resources[resource].create({ name, specs, history })
            .then(event => res.json(event));
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;
        const { name, specs, history } = req.body;
        resources[resource].replaceOne({ _id: id }, { name, specs, history })
            .then(event => res.json(event));
    })

    .delete('/:id', (req, res) => {
        const { id } = req.params;
        resources[resource].deleteOne({ _id: id })
            .then(event => res.json(event));
    });
