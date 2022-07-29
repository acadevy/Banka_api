const Account = require('../models/Account');
const User = require('../models/user');


// generate an account number
function account_number() {
    return Math.floor(Math.random() * Date.now())
    }

exports.create_account = async(req,res) => {
    const { id } = req.params;
    const { account_type} = req.body.account[0];
    const { account_balance } = req.body.account[1];
    const { account_status } = req.body.account[2];
    try {
        // check if the user is already registered
        const user = await User.findById({_id:id})
        if(user){
            // check if user already have an account
            const account1 = await Account.findOne({owner:id});
            if(account1 == null){
            // create new account
                 const created_account = await Account ({
                 accountNumber: account_number(),
                 owner: id,
                 account: [{account_type,account_balance,account_status}],
                created_by: req.user._id
            })
            await created_account.save();
            return res.status(201).json(created_account);
            }
            const check_account = account1.account;
            if(check_account.length > 0){
                if (check_account.length === 2) {
                    return res.status(400).json({ message:'user already have a savings and current accounts'});
                  }
                  if (check_account[0].account_type === account_type) {
                    return res.status(400).json({ message:`user already have a ${account_type} account`});
                  }
                 else{
                    const updatedPost = await Account.findByIdAndUpdate(account1._id, 
                        {$push: {"account": {account_type,account_balance,account_status}}}, {new: true, upsert: true});
                    res.json(updatedPost);
                 } 
            }
                 
        }
       
        else {
            return res.status(400).json({message: "User does not exist"});
        }
    } catch(err){
        console.log(err.message);
        return res.status(500).json(err.message);
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
            res.status(200).json({message: "Account status was successfully changed"});
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
        if (status && !(['dormant', 'active'].includes(status))){
            res.status(400).json({message: "Enter a correct status - dormant or active"})
        }
        const accounts = await Account.find({"account.account_status": status});
        if(accounts.length === 0 && req.user.role === 'super-admin'){
            res.status(200).json({message: "No account was found"});
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
                res.status(200).json({message: "Account was successfully fetched"});
        }
        else{
            res.status(400).json("You are not permitted");
        }
        

    } catch(err){
        res.status(400).json(err.message);
    }
}

// implement later
exports.updated_account_balance = async(req,res)=>{
    const {account_balance,accountNumber} = req.body;
    const { id } = req.params;
    try{
        const account = await Account.findOne({accountNumber});
            const updated_account = await Account.findOneAndUpdate({accountNumber},
                {"$set": {"account.$[element].account_balance": account_balance}},
                {new: true, useFindAndModify: false, arrayFilters: [{ "element._id": { $eq: id }}]}
                )
                res.status(200).json({updated_account});

        
    }catch(err){
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