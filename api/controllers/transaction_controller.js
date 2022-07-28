const Account = require('../models/Account');
const Transaction = require('../models/transaction');
const User = require('../models/user');

exports.debit_account = async(req,res) => {

    const { accountNumber,transactionType,account_type, amount} = req.body;
    try{
        const account = await Account.findOne({accountNumber,});
            if(account){
            for(let i = 0; i <= 1; i++){
                if(account.account[i].account_status === "dormant"){
                    return res.status(200).json({message: "You can't perform a transaction on a dormant account"})
                }
                if(account.account[i].account_balance >= amount && account.account[i].account_type == account_type){
                    const user = await User.findById(account.owner);
                    const userAccount = account;
                    const newbalance = parseFloat(userAccount.account[i].account_balance) + amount;
                    const oldbalance = userAccount.account[i].account_balance;
                    const transaction = await Transaction({
                        accountNumber,
                        transactionType,
                        amount,
                        account_type,
                        cashier: req.user._id
                    });
                   
                     await transaction.save();
                     const update_transaction = await Transaction.findOne({accountNumber})
                     const updated_transaction = await Transaction.findByIdAndUpdate(update_transaction.id,
                        {"$set": {newbalance: newbalance.toFixed(2),oldbalance:oldbalance.toFixed(2)}},{new:true,
                        useFindAndModify: false});
                     return res.status(200).json(updated_transaction);                  
                }
                else {
                    return res.status(400).json({message: "Insufficient balance or account type error"})
                }
           }
        }


    }catch(err){
        res.status(400).json(err.message);
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