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
        else {
            res.status(400).json({message: "User already have an account"});
        }
    } catch(err){
        res.status(500).json(err.message);
    }
}

exports.deactivate_account = async(req,res) => {
    const {account_id} = req.params;
    const { status,id }  = req.body;
    try{
        if(req.user.role === 'super-admin'){
            const updated_account = await Account.findByIdAndUpdate(account_id,
            {"$set": {"account.$[element].account_status": status}},
            {new: true, useFindAndModify: false, arrayFilters: [{ "element._id": { $eq: id }}]}
            )
            console.log(id);
            res.json(updated_account);
        }


    }
    catch(err){
        res.status(500).json(err.message);
    }
}