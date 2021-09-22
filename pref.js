const mongoose = require('mongoose');
const prefix = new mongoose.Schema({
    id: String
    

});

module.exports = mongoose.model('prefixs', prefix);