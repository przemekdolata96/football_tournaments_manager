var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    firstName: String,
    lastName: String,
    number: Number,
    goals: Number,
    assistants: Number,
});

var TeamSchema = new Schema({
    name: String,
    players: [Array]
});

module.exports = mongoose.model('Player', PlayerSchema);
module.exports = mongoose.model('Team', TeamSchema);
