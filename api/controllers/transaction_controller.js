const Account = require('../models/Account');

exports.debit_account = async(req,res) => {
    const { amount,_id } = req.body;
    const { id } = req.params;
    try{
        if (req.user.role !== "super-admin"){
            return res.status(403).json({message:"You are not permitted"});
        }
        else{
            const account = await Account.findOne({id});
            const updated_amount = account.account[0].account_balance -= amount;

                const updated_account = await Account.findByIdAndUpdate(account._id,
                    {"$set": {"account.$[element].account_balance": updated_amount.toFixed(2)}},
                    {new: true, useFindAndModify: false, arrayFilters: [{ "element._id": { $eq:_id}}]}
                    )
                    return res.status(200).json(updated_account);
        
            }
       
        res.status(200).json({message: "You are correct"});
        }catch(err){
        res.status(500).json(err.message);
    }
}

exports.credit_account = async(req,res) => {
    const { amount,_id } = req.body;
    const { id } = req.params;
    try{
        if (req.user.role !== "super-admin"){
            return res.status(403).json({message:"You are not permitted"});
        }
        else{
            const account = await Account.findOne({id});
            const updated_amount = account.account[0].account_balance += amount;

                const updated_account = await Account.findByIdAndUpdate(account._id,
                    {"$set": {"account.$[element].account_balance": updated_amount.toFixed(2)}},
                    {new: true, useFindAndModify: false, arrayFilters: [{ "element._id": { $eq:_id}}]}
                    )
                    return res.status(200).json(updated_account);
        
            }
       
        res.status(200).json({message: "You are correct"});
        }catch(err){
        res.status(500).json(err.message);
    }
}