const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if username and password exist
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already taken' });
      }
  
      // Create a new user
      const user = new User({  email, password });
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  };
  

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
const googleAuth = async (req, res) => {
    try {
      const { name, email, avatar } = req.body;
      
      if (!email ) {
        return res.status(400).json({ error: 'Invalid Google credentials' });
      }
  
      let user = await User.findOne({ email });
  
      if (!user) {
        // Create new Google user
        user = new User({
          email,
          password: email
        });
        await user.save();
      }
  
  
      const token = jwt.sign(
        { 
          id: user._id,
          email: user.email,
        }, 
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.status(200).json({
        token,
        user: {
          id: user._id,
          email: user.email,
        }
      });
  
    } catch (error) {
      console.error('Google auth error:', error);
      res.status(400).json({ error: 'Google authentication failed' });
    }
  };

module.exports = { register, login , googleAuth};