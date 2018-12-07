const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator/check');
const Registration = mongoose.model('Registration');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('form',  { title: 'Registration Form' });
});

router.post('/', 
    [
        body('name')
            .isLength({min: 1})
            .withMessage('Please enter a name'),
        body('email')
            .isLength({min: 1})
            .withMessage('Please enter an email')
     ],(req, res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()) {
            const registration = new Registration(req.body);
            registration.save()
                .then(() => { res.send('Thank you for your registration!'); })
                .catch(() => { res.send('Sorry! Something went wrong.'); });
        } else {
            res.render('form', {
                title: 'Registration Form',
                errors: errors.array(),
                data: req.body,
            });
        }
});

module.exports = router;