var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BallotSchema = new Schema({
    phone: Number,
    hillary: String,
    gary: String,
    jill: String,
    donald: String
});

module.exports = mongoose.model('Ballot', BallotSchema);