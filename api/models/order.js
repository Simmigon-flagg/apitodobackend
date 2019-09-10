const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // This is a relation which defeats the point of a non relational database
    product: {type: mongoose.Schema.Types.ObjectId , ref: 'Product'},
    quantity: { type : Number, default: 1 },
    dateCreated: { type : Date }
})

module.exports = mongoose.model('Order', orderSchema);