const express = require('express');
const router = express.Router();
const Films = require('../models/film');
const Studio = require('../models/studio');

router

    .post('/', (req, res, next) => {
        new Studio(req.body).save()
            .then( studio => res.json(studio))
            .catch(next);

    })

    .get('/', (req, res, next) => {
        Studio.find()
            .select('name _id')
            .lean()
            .then(studio => res.json(studio))
            .catch(next);

    })

    .get('/:id', (req, res, next) => {
        const studioId = req.params.id;
        Promise.all([
            Studio.findById(req.params.id)
                .select('name address')
                .lean(),
            Films.find({ studio: studioId})
                .select('title')
                .lean()
        ])

            .then(([studioData, films ])=> {
                if(!studioData) {
                    next({code: 404, error: `${studioId} not found`});
                }
                else {
                    studioData.films = films.sort((a,b) => a._id < b._id);
                    console.log('STUDIODATAAAAAAAAAAAAAAAAA', studioData);
                    res.json(studioData);
                }
            });
    });

module.exports = router;