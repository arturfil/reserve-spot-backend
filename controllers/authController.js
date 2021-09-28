const bcrypt = require('bcryptjs');
const { googleVerify } = require('../helpers/googleVerify');

const { generateJwt } = require('../middlewares/generateJwt')
const User = require('../models/User');

// GET
const getAllUsers = async (req, res) => {
  const users = await User.find();
  try {
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({message: "Couldn't get the users"})
  }
}

// POST/signup 
const signUpUser = async (req, res) => {
  const testEmail = await User.findOne({email: req.body.email})
  if (testEmail) {
    return res.status(500).json({message: "Email already in use"});
  }
  const user = new User(req.body);
  try {
    // we generate the number of rounds of encryption and hash the passwrd
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(req.body.password, salt);
    user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({message: "Error creating user"});
  }
}

// POST/login
const loginUser = async (req, res) => {
  // password123
  const {email, password} = req.body;
  const user = await User.findOne({email});
  // means that the email doesn't exist associated with a user
  if (!user) { 
    return res.status(400).json({message: "Please check credentials"});
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  // checking if the password is wrong
  if (!validPassword) { 
    return res.status(500).json({message: "Please check credentials"});
  }
  const token = await generateJwt(user._id);
  return res.status(200).json({user, token});
}

// POST/googleLogin
const googleLogin = async (req, res) => {
  const { email, name } = req.body;
  let user = await User.findOne({email});
  if (!user) {
    user = await User.create({
      email: email,
      name: name,
      password: "P",
      google: true
    })
  }
  try {
    const token = await generateJwt(user._id);
    return res.status(200).json({user, token})
  } catch (error) {
    return res.status(500).json({message: "User was not able to login"})
  }
}

module.exports = {
  getAllUsers,
  signUpUser,
  loginUser,
  googleLogin
}