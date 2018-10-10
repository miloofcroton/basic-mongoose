require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const db = require('../../lib/mongoose-connector');


describe.skip('Aircraft E2E test', () => {


    const aircrafts = [
        { type: 'AH-64', nickname: 'Apache', speed: 227, released: 1986, active: true },
        { type: 'F-16', nickname: 'Fighting Falcon', speed: 1500, released: 1978, active: true },
        { type: 'SR-71', nickname: 'Blackbird', speed: 2200, released: 1966, active: false }
    ];

    let createdAircrafts;

    const lockheedMartin = aircraft => {
        return request(app)
            .post('/api/aircrafts')
            .send(aircraft);
    };

    beforeEach(() => {
        return db('aircraft').then(collection => collection.deleteMany());
    });
    beforeEach(() => {
        return Promise.all(aircrafts.map(lockheedMartin))
            .then(ca => createdAircrafts = ca.map(a => a.body));
    });

    // alt:
    // beforeEach(async() => {
    //     const ca = await Promise.all(aircrafts.map(lockheedMartin));
    //     return createdAircrafts = ca.map(a => a.body);
    // });

    it('get an aircraft by id', () => {
        return request(app)
            .get(`/api/aircrafts/${createdAircrafts[0]._id}`)
            .then(res => expect(res.body).toEqual(createdAircrafts[0]));
    });

    it('gets all aircraft on get', () => {
        return request(app)
            .get('/api/aircrafts')
            .then(retreivedAircrafts => {
                createdAircrafts.forEach(createdAircraft => {
                    expect(retreivedAircrafts.body).toContainEqual(createdAircraft);
                });
            });
    });

    it('creates an aircraft on post', () => {
        return request(app)
            .post('/api/aircrafts')
            .send({ type: 'A-10', nickname: 'Thunderbird', speed: 439, released: 1977, active: true })
            .then(res => expect(res.body).toEqual({ _id: expect.any(String), type: 'A-10', nickname: 'Thunderbird', speed: 439, released: 1977, active: true }));
    });

    it('updates an aircraft on put', () => {

        const upgrade = { type: 'AH-65', nickname: 'Mohawk', speed: 999, released: 2020, active: true };
        const expected = { ...upgrade, _id: expect.any(String) };
        return request(app)
            .put(`/api/aircrafts/${createdAircrafts[0]._id}`)
            .send(upgrade)
            .then(res => expect(res.body).toEqual(expected));

    });

    it('demolishes an aircraft on delete', () => {
        return request(app)
            .delete(`/api/aircrafts/${createdAircrafts[0]._id}`)
            .then(destroyedAircraft => request(app).get(`/api/aircraft/${destroyedAircraft.body._id}`))
            .then(res => expect(res.body).toEqual({}));
    });


});


