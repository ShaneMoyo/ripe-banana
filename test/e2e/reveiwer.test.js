const assert = require('chai').assert;
const mongoose = require('mongoose');
const request = require('./request');


describe('reviewer API', () => {
    beforeEach(()=> mongoose.connection.dropDatabase());

    const kateTaylor = {
        name: 'Kate Taylor',
        company: 'Globe and Mail'
    };

    const jamesBerardinelli = {
        name: 'James Berardinelli',
        company: 'ReelViews'
    };

    it('saves a reviewer with id', ()=>{
        return request.post('/api/reviewers')
            .send(kateTaylor)
            .then(res => {
                const reviewer = res.body;
                assert.ok(reviewer._id);
                assert.equal(reviewer.name, kateTaylor.name);
            });
    });

    it('Gets all reviewers', () =>{
        const saves = [kateTaylor, jamesBerardinelli].map(reviewer =>{
            return request.post('/api/reviewers')
                .send(reviewer)
                .then(res => res.body);
        });
        let saved = null;
        let savedNames = null;
        return Promise.all(saves)
            .then(_saved => {
                saved = _saved;
                savedNames = saved.map( save => {
                    return {
                        _id: save.id,
                        name: save.name
                    };
                });
                return request.get('/api/reviewers');
            })
            .then(res =>{
                assert.deepEqual(res.body, savedNames);
            });
    });


})

