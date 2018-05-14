var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TournamentSchema = new Schema({
    name: String
});

module.exports = mongoose.model('TournamentSchema', PlayerSchema);
