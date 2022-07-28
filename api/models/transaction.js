const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    accountNumber: {
        type: Number, 
        required: true
    },
    cashier: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    transactionType: {
        type: String,
        required: true,
    },

    account_type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },

    oldbalance: {
        type: Number,
        default: 0
    },
    newbalance: {
        type: Number
    }
},{timestamps: true});




const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;






