const bcrypt = require('bcryptjs');
const { googleVerify } = require('../helpers/googleVerify');

const { generateJwt } = require('../middlewares/generateJwt')
const User = require('../models/User');

const getAllUsers = async (req, res) => {
  const users = await User.find();
  try {
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({message: "Couldn't get the users"})
  }
}

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

const loginUser = async (req, res) => {
  const {email, password} = req.body;
  console.log("HERE")
  const user = await User.findOne({email});
  // means that the email doesn't exist associated with a user
  console.log("HERE after User.find")
  if (!user) { 
    return res.status(400).json({message: "Please check credentials"});
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  console.log("HERE after BCRYPT")
  // checking if the password is wrong
  if (!validPassword) { 
    return res.status(500).json({message: "Please check credentials"});
  }
  const token = await generateJwt(user._id);
  console.log("HERE after generateJWT")
  return res.status(200).json({user, token});
}

const googleLogin = async (req, res) => {
  const { id_token } = req.body;
  try {
    const googleUser = await googleVerify(id_token);
    console.log(googleUser)
  } catch (error) {
    return res.status(400).json({message: "Couldn't verify token"})
  }
}

module.exports = {
  getAllUsers,
  signUpUser,
  loginUser,
  googleLogin
}