const mongoose = require('mongoose');

const chickenSchema = new mongoose.Schema({
    name: String, 
    location: String,
    price: Number,
    image: String,
    rating: {type: Number, max: 5},
    description: String
});

const Chicken = mongoose.model('Chicken', chickenSchema);

module.exports = Chicken;