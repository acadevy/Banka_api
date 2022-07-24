const User = require('../models/user');



exports.signup = async(req,res) => {
  const { name, email, password } = req.body;
    try {
    //      check if the user already exist
             const user = await User.findOne({email:email});
            if(!user){
              const count = await User.estimatedDocumentCount();
                let role = "admin";
                if (count === 0) {
                  role = "super-admin";
                }
                const newUser = await User({
                  name,
                  email,
                  password,
                  role
                })
                await newUser.save();
                const token = await newUser.generateAuthToken();
                return res.status(201).json({token,newUser});
             
            
            } else {
                return res.status(400).json({
                    error: 'email already  exist'
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
            if(user.password && (user.role ==="admin" || user.role === "super-admin")){
                const token = await user.generateAuthToken();
                res.cookie("token", token, { expiresIn: "1d" });
                return res.status(200).json({user,token});
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

exports.update_user = async(req,res) =>{

        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password'];
        const isValidOperation = updates.every(update =>
          allowedUpdates.includes(update)
        );
        if (!isValidOperation) {
          return res.status(400).send({ error: 'Invalid updates!' });
        }
        try {
            const user = await User.findOne({_id: req.user._id});
            updates.forEach(update => (user[update] = req.body[update]));
            await user.save();
            res.status(200).send(user);
          } catch (error) {
            res.status(400).send(error);
          }
               
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};