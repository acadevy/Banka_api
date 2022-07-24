const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim:true
  },
  email: {
    required: true,
    type: String,
    unique: true,
    trim:true,
    lowercase: true
  },
  image: {
    type: Buffer
  },
  password: {
    required: true,
    type: String
  },
  role: {
    type: String,
    enum:["admin",'user','super-admin'],
    default: "user"
  },
}, { timestamps: true });


// create middleware for encrypting the password
userSchema.pre('save', async function (next) {
  const user = this;
  if(this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash
    } catch(err) {
      return next(err);
    }
  } else return next();
});



userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id.toString(),role: this.role }, process.env.JWT_SECRET);
  return token;
};


userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login!');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login!');
  }

  return user;
};


const User = mongoose.model('User', userSchema);

module.exports = User;