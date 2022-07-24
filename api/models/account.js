const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    accountNumber: [{
        type: Number,
        trim: true,
        required: true
    }],

    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
         },
    type: [{
        type: String,
        enum: ["savings", "current"],
        default: "savings",
    }],
    status: {
        type: String,
        default: "active"
    },
    balance: {
        type: Number,
        trim: true
        }
});


const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
