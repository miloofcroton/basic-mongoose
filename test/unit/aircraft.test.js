require('dotenv').config();
const Aircraft = require('../../lib/models/Aircraft');
require('../../lib/mongoose-connector')();


describe('aircraft model', () => {

    let createdAircraft;

    beforeEach(() => {
        return Aircraft.deleteMany();
    });

    beforeEach(() => {
        return Promise.all([
            Aircraft.create({
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
            }),
            Aircraft.create({
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
            }),
            Aircraft.create({
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
            })
        ])
            .then(ca => createdAircraft = ca.map(c => c.toJSON()));
    });


    it('gets an aircraft by id', () => {
        return Aircraft.findById(createdAircraft[0]._id)
            .lean()
            .then(receivedAircraft => expect(receivedAircraft).toEqual(createdAircraft[0]));
    });

    it('gets all aircraft', () => {
        return Aircraft.find()
            .then(receivedAircrafts => expect(receivedAircrafts).toHaveLength(3));
    });

    it('creates a new aircraft in my db', () => {
        return Aircraft.create({
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
        })
            .then(createdAircraft => {
                expect(createdAircraft).toHaveProperty('_id');
                expect(createdAircraft.name.official).toEqual('A-10');
                expect(createdAircraft.name.nickname).toEqual('Thunderbolt II');
                expect(createdAircraft.specs.speed).toEqual(439);
                expect(createdAircraft.history.released).toEqual(1977);
                expect(createdAircraft.history.active).toEqual(true);
            });
    });

    it('updates an aircraft by id', () => {
        return Aircraft.findOneAndUpdate(
            { _id: createdAircraft[2]._id }, 
            { 
                ...createdAircraft[2],
                history: { released: 1966, active: true }, 
                specs: { speed: 2500, type:['support'] } 
            },
            { new: true }
        )
            .then(receivedAircraft => expect(receivedAircraft.toObject()).toEqual({
                ...createdAircraft[2], 
                history: { 
                    released: 1966, 
                    active: true },
                specs: { 
                    speed: 2500, 
                    type: ['support'] 
                } 
            }));
    });

    // it('patches an aircraft by id', () => {
    //     return Aircraft.patch(createdAircraft[2]._id, { active: true, speed: 2500 })
    //         .then(receivedAircraft => expect(receivedAircraft).toEqual({ ...createdAircraft[2], active: true, speed: 2500 }));
    // });

    // it('sends an aircraft to its final hangar', () => {
    //     return Aircraft.delete(createdAircraft[0]._id)
    //         .then(retiredAircraft => Aircraft.get(retiredAircraft._id))
    //         .then(receivedAircraft => expect(receivedAircraft).toBeNull());
    // });

});
