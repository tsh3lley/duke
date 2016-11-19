#API structure:
Route | HTTP Verb | Description
--- | --- | ---
/api/ledger | GET | Get all the ballots from the ledger.
/api/ledger | POST | Post an encrypted ballot to the ledger.
--- | --- | ---
/api/votes/:ballot_id | GET	| Audit a single ballot.
/api/votes/ | POST | Encrypt single ballot.
/api/votes/:ballot_id | DELETE | Delete a meme.
--- | --- | ---
/api/election | GET | Tally the results of the election