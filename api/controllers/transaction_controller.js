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
                    const newbalance = parseFloat(userAccount.account[i].account_balance) - amount;
                    const oldbalance = userAccount.account[i].account_balance;
                    const transaction = await Transaction({
                        accountNumber,
                        transactionType,
                        amount: amount.toFixed(2),
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

    const { accountNumber,transactionType,account_type, amount} = req.body;
    try{
        const account = await Account.findOne({accountNumber,});
            if(account){
            for(let i = 0; i <= 1; i++){
                if(account.account[i].account_status === "dormant"){
                    return res.status(200).json({message: "You can't perform a transaction on a dormant account"})
                }
                if(account.account[i].account_type == account_type){
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

exports.get_transactions = async(req,res) => {
    const {accountNumber} = req.body;
    try{
        const transactions = await Transaction.findOne({accountNumber});
        if(transactions){
            res.status(200).json({message: "Transactions fetched successfully"});
        }
        
    }catch(err){
        res.status(400).json(err.message);
    }
}

exports.get_a_transaction = async(req,res) => {
    const{transaction_id} = req.params;
    try{
        const transaction = await Transaction.findById(transaction_id);
        if(transaction){
            res.status(200).json({message: "Transaction fetched successfully"});
        }
        
    }catch(err){
        res.status(400).json(err.message);
    }
}