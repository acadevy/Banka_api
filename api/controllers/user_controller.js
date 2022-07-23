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
    // exports.signin = (req, res) => {
    //   User.findOne({ email: req.body.email }).exec(async (error, user) => {
    //     if (error) return res.status(400).json({ error });
    //     if (user) {
    //       const isPassword = await user.authenticate(req.body.password);
    //       if (isPassword && user.role === "user") {
    //         // const token = jwt.sign(
    //         //   { _id: user._id, role: user.role },
    //         //   process.env.JWT_SECRET,
    //         //   { expiresIn: "1d" }
    //         // );
    //         const token = generateJwtToken(user._id, user.role);
    //         const { _id, firstName, lastName, email, role, fullName } = user;
    //         res.status(200).json({
    //           token,
    //           user: { _id, firstName, lastName, email, role, fullName },
    //         });
    //       } else {
    //         return res.status(400).json({
    //           message: "Something went wrong",
    //         });
    //       }
    //     } else {
    //       return res.status(400).json({ message: "Something went wrong" });
    //     }
    //   });
    // };
