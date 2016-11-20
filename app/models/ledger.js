var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LedgerSchema   = new Schema({
	key: Object,
    votes: [{ type: Schema.Types.ObjectId, ref: 'Ballot' }]
});

module.exports = mongoose.model('Ledger', LedgerSchema);