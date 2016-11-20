var express = require('express');
var router  = express.Router();
var path    = require('path');
var Ballot  = require('./models/ballot');
var Ledger  = require('./models/ledger');
var pallier = require('../jspaillier-master/paillier');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    //var test = paillier.generateKeys(1024);
    res.render('home', {message: 'test'}); 
});

router.route('/ledger')
    //utility function to create the first ledger
    .put(function(req, res) {

        var ledger = new Ledger();  
        //ledger.keys = paillier.generateKeys(1024);

        ledger.save(function(err, ledger) {
            if (err)
                res.send(err);

            res.json({ 
                message: 'ledger created!',
            });
        });
    })

    //post a ballot to the ledger
    .post(function(req, res) {
        Ballot.findById(req.body.ballot_id, function(err, ballot) {
            if (err)
                res.send(err);

            Ledger.findById('582d1bb3e87fbb115b000001', function(err, ledger) {
                if (err)
                    res.send(err);

                ledger.votes.push(ballot._id);
                ledger.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Ballot Added to Ledger!' });
                });
            });
        });
    })

    //get all ballots from the ledger
    .get(function(req, res) {
        Ledger.find(function(err, ledger) {
            if (err)
                res.send(err);

            // res.json({ledger});
            res.render('ledger', {ledger});
        });
    });

// VOTE ROUTES
// =============================================================================

router.route('/votes')

    // create a ballot (accessed at POST http://localhost:8080/api/votes)
    .post(function(req, res) {
        req.assert('ballot.phone', 'Invalid postparam').notEmpty().isInt();
        req.assert('ballot.vote1', 'Invalid postparam').notEmpty().isInt();
        req.assert('ballot.vote2', 'Invalid postparam').notEmpty().isInt();
        req.assert('ballot.vote3', 'Invalid postparam').notEmpty().isInt();
        req.assert('ballot.vote4', 'Invalid postparam').notEmpty().isInt();

        console.log(ballot);

        var ballot = new Ballot();  
        ballot.phone = req.body.phone; 
        ballot.vote1 = req.body.vote1;
        ballot.vote2 = req.body.vote2;
        ballot.vote3 = req.body.vote3;
        ballot.vote4 = req.body.vote4;

/*        //ENCRYPT THE BALLOT HERE
        var numBits = 1024;
        ballot.vote1 = keys.pub.encrypt(nbv(ballot.vote1));
        ballot.vote2 = keys.pub.encrypt(nbv(ballot.vote2));
        ballot.vote3 = keys.pub.encrypt(nbv(ballot.vote3));
        ballot.vote4 = keys.pub.encrypt(nbv(ballot.vote4));*/

        ballot.save(function(err, ballot) {
            if (err)
                res.send(err);

            res.json({ 
                message: 'Ballot created!',
                id: ballot._id
            });
        });
    })

    .get(function(req, res) {
        res.render('vote');
    });

router.route('/votes/:ballot_id')

    //audit a ballot
    .get(function(req, res) {
        Ballot.findById(req.params.ballot_id, function(err, ballot) {
            if (err)
                res.send(err);

            //DECRYPT THE BALLOT, DELETE IT, AND SEND WHAT WAS DECRYPTED
            Ballot.remove({
                _id: req.params.ballot_id
            }, function(err, meme) {
                if (err)
                    res.send(err);

                res.json({
                    message: 'Successfully deleted',
                    decrypted: ballot
                });
            });
        });
    });

// ELECTION ROUTES
// =============================================================================

router.route('/election')
    
    //tally the election
    .get(function(req, res) {
        Ledger.find(function(err, ballots) {
            if (err)
                res.send(err);

            //TALLY THE VOTES
            res.json(ballots);
        });
    });

module.exports = router;