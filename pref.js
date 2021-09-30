
const mongoose = require('mongoose');

const prefix = new mongoose.Schema({
	id: String,
	prefix: { type: String, default: '!' },

});

module.exports = mongoose.model('prefixs', prefix);
