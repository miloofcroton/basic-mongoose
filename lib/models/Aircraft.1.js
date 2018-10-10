const mongoose = require('mongoose');

class Aircraft {

    get(id) {
        return db('aircraft')
            .then(collection => collection.findOne({ _id: ObjectId(id) }));
    }

    getAll(query) {
        return db('aircraft')
            .then(collection => collection.find(query))
            .then(aircraftDocObject => aircraftDocObject.toArray());
    }

    create(payload) {
        return db('aircraft')
            .then(collection => {
                return collection.insertOne({
                    type: payload.type,
                    nickname: payload.nickname,
                    speed: payload.speed,
                    released: payload.released,
                    active: payload.active
                });
            })
            .then(result => result.ops[0]);
    }

    update(id, payload) {
        return db('aircraft')
            .then(collection => {
                return collection.findOneAndUpdate(
                    { _id: ObjectId(id) },
                    {
                        $set: {
                            type: payload.type,
                            nickname: payload.nickname,
                            speed: payload.speed,
                            released: payload.released,
                            active: payload.active
                        }
                    },
                    { returnOriginal: false }
                );
            })
            .then(result => result.value);
    }

    patch(id, payload) {
        return db('aircraft')
            .then(collection => {

                const update = {};
                for(let key in payload) update[key] = payload[key];

                return collection.findOneAndUpdate(
                    { _id: ObjectId(id) },
                    { $set: update },
                    { returnOriginal: false }
                );
            })
            .then(result => result.value);
    }

    delete(id) {
        return db('aircraft')
            .then(collection => collection.findOneAndDelete({ _id: ObjectId(id) }))
            .then(result => result.value);
    }

    drop() {
        return db('aircraft').then(collection => collection.deleteMany());
    }


}


module.exports = new Aircraft();
