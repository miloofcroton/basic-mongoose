require('dotenv').config();
const Aircraft = require('../lib/models/Aircraft');

describe('aircraft model', () => {

    let createdAircraft;

    beforeEach(() => {
        return Aircraft.drop();
    });

    beforeEach(() => {
        return Promise.all([
            Aircraft.create({ type: 'AH-64', nickname: 'Apache', speed: 227, released: 1986, active: true }),
            Aircraft.create({ type: 'F-16', nickname: 'Fighting Falcon', speed: 1500, released: 1978, active: true }),
            Aircraft.create({ type: 'SR-71', nickname: 'Blackbird', speed: 2200, released: 1966, active: false })
        ])
            .then(ca => createdAircraft = ca);
    });


    it('gets a spy by id', () => {
        return Aircraft.get(createdAircraft[0]._id)
            .then(receivedAircraft => expect(receivedAircraft).toEqual(createdAircraft[0]));
    });

    it('gets all aircraft', () => {
        return Aircraft.getAll()
            .then(receivedAircrafts => expect(receivedAircrafts).toHaveLength(3));
    });

    it('creates a new aircraft in my db', () => {
        return Aircraft.create({ type: 'A-10', nickname: 'Thunderbird', speed: 439, released: 1977, active: true })
            .then(createdAircraft => {
                expect(createdAircraft).toHaveProperty('_id');
                expect(createdAircraft.type).toEqual('A-10');
                expect(createdAircraft.nickname).toEqual('Thunderbird');
                expect(createdAircraft.speed).toEqual(439);
                expect(createdAircraft.released).toEqual(1977);
                expect(createdAircraft.active).toEqual(true);
            });
    });

    it('updates an aircraft by id', () => {
        return Aircraft.update(createdAircraft[2]._id, { ...createdAircraft[2], active: true, speed: 2500 })
            .then(receivedAircraft => expect(receivedAircraft).toEqual({ ...createdAircraft[2], active: true, speed: 2500 }));
    });

    it('patches an aircraft by id', () => {
        return Aircraft.patch(createdAircraft[2]._id, { active: true, speed: 2500 })
            .then(receivedAircraft => expect(receivedAircraft).toEqual({ ...createdAircraft[2], active: true, speed: 2500 }));
    });

    it('sends an aircraft to its final hangar', () => {
        return Aircraft.delete(createdAircraft[0]._id)
            .then(retiredAircraft => Aircraft.get(retiredAircraft._id))
            .then(receivedAircraft => expect(receivedAircraft).toBeNull());
    });

});

