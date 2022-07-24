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
    account: [{ 
        account_type: {
         type: String,
        enum: ["savings", "current"],
        default: "savings",
        },
        account_balance: {
            type: Number,
            default: 0
        },
        account_status: {
            type: String,
            default: "active"
        }
    }],
    created_by: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {timestamps: true});


const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
