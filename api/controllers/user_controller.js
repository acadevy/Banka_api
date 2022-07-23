const User = require('../models/user');



exports.signup = async(req,res) => {
    const {email} = req.body;
    try {
    //      check if the user already exist
             const user = await User.findOne({email:email});
            if(!user){
                const newUser = await User(req.body);
                await newUser.save();
                const token = await newUser.generateAuthToken();
                return res.status(201).json({token,newUser});
             
            
            } else {
                return res.status(400).json({
                    error: 'User already  exist'
                });
            }
            
             }
            catch(err){
            return res.status(500).json(err.message)
    }
    }

    exports.signin =async (req,res) => {
        const {email,password} = req.body;
        try{
            const user = await User.findByCredentials(email,password);
            if(user.password && user.role ==="user"){
                const token = await user.generateAuthToken();
                return res.status(200).json({user,token});
               }
               else {
                return r
               }
                
            } catch(err){
            return res.status(400).json(err.message);
        }
    }
exports.get_a_user = async(req,res) => {
        const {id} = req.params;
        try {
        const user = await User.findById(id);
        res.status(200).json({user});

     }catch(err){
            res.status(404).json({message: "User does not exist"});
        }
}