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
            res.status(200).json({message: "Status was successfully updated"});
        }
        else{
            res.status(403).json({message: "User is not permitted to perform this operation"});
        }


    }
    catch(err){
        res.status(500).json(err.message);
    }
}

exports.get_all_account = async(req,res) => {
    const { status } = req.body;
    try{
        const accounts = await Account.find({"account.account_status": status});
        if(accounts.length === 0 && req.user.role === 'super-admin'){
            res.status(204).json({message: "No account was found"});
        }
        else if(req.user.role !== "super-admin"){
            res.status(403).json({message: "Only admin can perform this task"})
        }
        else {
            res.status(200).json(accounts)
        }

    }catch(err){
        res.status(400).json(err.message);
    }
}

exports.get_an_account = async(req,res) =>{
    const {accountNo} = req.params;
    try{
        const account = await Account.find({accountNumber: accountNo});
        if(req.user.role === "super-admin" || req.user.role === "user"){
                res.status(200).json(account);
        }
        else{
            res.status(400).json("You are not permitted");
        }
        

    } catch(err){
        res.status(400).json(err.message);
    }
}

exports.delete_account = async(req,res) => {
    const {accountNo} = req.params;
    try{
        const account = await Account.findOneAndDelete({accountNumber: accountNo});
        if(req.user.role === "super-admin" && account) {
                res.status(200).json({message: "Account successfully deleted"});
        }
        else if(req.user.role === "super-admin" && !account){
            res.status(204).json({message: "Account does not exist"})
        }
        else if(req.user.role !== "super-admin"){
            res.status(403).json({message: "Only super-admin are permitted"});
        }
        
    } catch(err){
        res.status(400).json(err.message);
    }

}