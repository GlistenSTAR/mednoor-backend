const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models').User;

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const isEmpty = require('../validation/is-empty');

exports.loadUser = async (req, res) => {
  // console.log(req.user);
  try {
    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

exports.signup = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!isEmpty(user)) {
      errors.email = "This email already exists";
      return res.status(400).json(errors);
    }

    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    };

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(req.body.password, salt);

    await User.create(newUser);

    res.status(200).json({ msg: "Successfully registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

exports.signin = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (isEmpty(user)) {
      errors.email = "This email not registered";
      return res.status(400).json(errors);
    }
    // console.log(user.password)
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      errors.password = "Invalid password";
      return res.status(400).json(errors);
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '1 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token: token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}