const express = require('express');
const { check } = require('express-validator');
const { oath } = require('google-auth-library');

const { validateFields } = require('../middlewares/validateFields')
const { getAllUsers, signUpUser, loginUser, googleLogin } = require('../controllers/authController');
const router = express.Router();

router.get('/', getAllUsers);

router.post('/signup', [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Email is required").not().isEmpty(),
  check("password", "Password has to be 8 char. long with capital, symbol and numbers")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  validateFields
], signUpUser);

router.post('/login', loginUser);

router.post('/googleLogin', googleLogin)

module.exports = router;