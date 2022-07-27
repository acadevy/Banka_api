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

    amount: {
        type: Number,
        required: true
    },

    oldbalance: {
        type: Number
    },
    newbalance: {
        type: Number,
        default: 0
    }
},{timestamps: true});



transactionSchema.pre('save', async function (next) {
    this.oldbalance = this.newbalance
    next();
  });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;






