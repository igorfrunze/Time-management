const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    res.json({
      email: user.email,
      name: user.name,
      imageURL: user.imageURL,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      token,
      message: 'User created!',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error Registering' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Wrong password or email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password or email' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, email: user.email, id: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Login Error' });
  }
});

router.patch('/', async (req, res) => {
  const { email, name, imageURL } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, imageURL },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({ message: 'user not found' });
    }

    res.json({
      email: updatedUser.email,
      name: updatedUser.name,
      imageURL: updatedUser.imageURL,
      message: 'user updated successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

module.exports = router;
