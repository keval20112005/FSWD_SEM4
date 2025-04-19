const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db.js');
const User = require('./User.js');
dotenv.config();

const app=express();

app.use(express.json());

connectDB()

app.post('/users', async (req, res) => {
    try {
      const { name, email, age } = req.body;
  
      // Validation checks (optional)
      if (!name || !email || !age) {
        return res.status(400).json({ message: 'Name, email, and age are required' });
      }
  
      const user = new User({
        name,
        email,
        age,
      });
  
      await user.save();  // Save the user to MongoDB
  
      res.status(201).json({ message: 'User created successfully', user }); 
    } catch (error) {
      // Log the full error
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  });

app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  });


app.listen(process.env.PORT,()=>{
    console.log("Server is running");
})
