var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LedgerSchema   = new Schema({
	key: String,
    votes: [{ type: Schema.Types.ObjectId, ref: 'Ballot' }]
});

module.exports = mongoose.model('Ledger', LedgerSchema);