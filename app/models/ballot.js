var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BallotSchema   = new Schema({
    phone: Number,
    vote1: String,
    vote2: String,
    vote3: String,
    vote4: String
});

module.exports = mongoose.model('Ballot', BallotSchema);