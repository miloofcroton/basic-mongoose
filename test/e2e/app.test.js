require('dotenv').config();
require('../../lib/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Aircraft = require('../../lib/models/Aircraft');

describe('Aircraft E2E test', () => {


    const aircrafts = [
        {
            name: {
                official: 'AH-64',
                nickname: 'Apache',
                variants: ['AH-64A', 'AH-64B', 'AH-64C', 'AH-64D', 'AH-64E', 'AH-64F']
            },
            specs: {
                type: ['helicopter', 'close air support'],
                armament: {
                    gun: 'M230 Chain Gun',
                    wingtip: 2,
                    underwing: 70
                },
                speed: 227
            },
            history: {
                released: 1986,
                active: true
            }
        },
        {
            name: {
                official: 'F-16',
                nickname: 'Fighting Falcon',
                variants: ['F-16A/B', 'F-16C/D']
            },
            specs: {
                type: ['fighter'],
                armament: {
                    gun: 'M61A1 Vulcan',
                    wingtip: 2,
                    underwing: 6,
                    underfueselage: 3
                },
                speed: 1500
            },
            history: {
                released: 1978,
                active: true
            }
        },
        {
            name: {
                official: 'SR-71',
                nickname: 'Blackbird',
                variants: ['SR-71A', 'SR-71B', 'SR-71C']
            },
            specs: {
                type: ['support'],
                speed: 2200
            },
            history: {
                released: 1966,
                active: false
            }
        }];

    let createdAircrafts;

    const lockheedMartin = aircraft => {
        return request(app)
            .post('/api/aircrafts')
            .send(aircraft);
    };

    beforeEach(async() => {
        await Aircraft.deleteMany();
        const ca = await Promise.all(aircrafts.map(lockheedMartin));
        return createdAircrafts = ca.map(a => a.body);
    });

    afterAll(() => {
        mongoose.disconnect();
    });


    it('gets an aircraft by id on get', () => {
        return request(app)
            .get(`/api/aircrafts/${createdAircrafts[0]._id}`)
            .then(res => expect(res.body).toEqual(createdAircrafts[0]));
    });

    it('gets all aircrafts on get', () => {
        return request(app)
            .get('/api/aircrafts')
            .then(retrievedAircrafts => {
                createdAircrafts.forEach(createdAircraft => {
                    expect(retrievedAircrafts.body).toContainEqual(createdAircraft);
                });
            });
    });

    it('gets all aircrafts for a specific query', () => {
        return request(app)
            .get('/api/aircrafts')
            .query({ 'history.active': true })
            .then(retrievedAircrafts => {
                expect(retrievedAircrafts.body).toContainEqual(createdAircrafts[0]);
                expect(retrievedAircrafts.body).toContainEqual(createdAircrafts[1]);
            });
    });

    it('creates an aircraft on post', () => {

        const a10 = {
            name: {
                official: 'A-10',
                nickname: 'Thunderbolt II',
                variants: ['A-10A', 'A-10B', 'A-10C', 'OA-10A']
            },
            specs: {
                type: ['close air support'],
                armament: {
                    gun: 'GAU-8/A Avenger',
                    underwing: 8,
                    underfueselage: 3
                },
                speed: 439
            },
            history: {
                released: 1977,
                active: true
            }
        };

        return request(app)
            .post('/api/aircrafts')
            .send(a10)
            .then(res => expect(res.body).toEqual({ _id: expect.any(String), '__v': expect.any(Number), ...a10 }));
    });

    it('updates an aircraft on put', () => {

        const upgrade = {
            name: {
                official: 'AH-65',
                nickname: 'Mohawk'
            },
            specs: {
                type: ['helicopter', 'close air support'],
                armament: {
                    gun: 'M230 Chain Gun',
                    wingtip: 2,
                    underwing: 100
                },
                speed: 999
            },
            history: {
                released: 2020,
                active: true
            }
        };
        
        // const expected = { ...upgrade, _id: createdAircrafts[0]._id };
        return request(app)
            .put(`/api/aircrafts/${createdAircrafts[0]._id}`)
            .send(upgrade)
            .then(response => expect(response).toMatchObject({ ok: true }));
    });

    it('demolishes an aircraft on delete', () => {
        return request(app)
            .delete(`/api/aircrafts/${createdAircrafts[0]._id}`)
            .then(res => expect(res.body).toEqual({ removed: true }));
    });


});


