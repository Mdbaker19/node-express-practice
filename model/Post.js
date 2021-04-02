const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const content = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now()
    }
});
module.exports = mongoose.model('item', content);