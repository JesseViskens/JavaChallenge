var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MateriaalSchema = new Schema({
    naam: {type: String, required: true},
    hoeveelheid: {type: Number, required: true}
});

module.exports = mongoose.model('Materiaal', MateriaalSchema);