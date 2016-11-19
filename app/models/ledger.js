var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LedgerSchema   = new Schema({
    votes: [{ type: Schema.Types.ObjectId, ref: 'Ballot' }]
});

module.exports = mongoose.model('Ledger', LedgerSchema);