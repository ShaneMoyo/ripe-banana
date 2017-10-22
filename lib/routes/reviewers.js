const express = require('express');
const router = express.Router();

const Reviewer = require('../models/reviewer');

router
    .post('/', (req, res, next) => {
        new Reviewer(req.body).save()
            .then(reviewer => res.json(reviewer))
            .catch(next);
    })



module.exports = router;