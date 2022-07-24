const Account = require('../models/Account');


// generate an account number
function account_number() {
    return Math.floor(Math.random() * Date.now())
    }

exports.create_account = async(req,res) => {
    const { id } = req.params;
    try {
        // check if user already have an account
        const user = await Account.findOne({ id});
        if(!user){
                const account = await Account ({
                    accountNumber: account_number(),
                    owner: id,
                    account: req.body,
                    created_by: req.user._id
                })
                await account.save();
                res.status(201).json(account);
        }
        
    } catch(err){
        res.status(500).json(err.message);
    }
}