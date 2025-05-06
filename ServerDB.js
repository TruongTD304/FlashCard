const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// MongoDB Atlas Connection (Database: qlbn)
mongoose.connect(
  'mongodb+srv://admin:Ad@123456.rauojhj.mongodb.net/qlbn?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
  console.log('✅ Connected to MongoDB Atlas (qlbn)');
}).catch((err) => {
  console.error('❌ Error connecting to MongoDB Atlas:', err);
});

// Mongoose Schema and Model for Users
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
}, { collection: 'Users' }); // Chỉ định tên collection rõ ràng

const User = mongoose.model('User', userSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

/* ======== API Routes for Users ======== */

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Lấy tất cả users
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error loading users' });
  }
});

// Create new user
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Error adding user' });
  }
});

// Update user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user' });
  }
});

// Delete user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user' });
  }
});

/* ======== Start Server ======== */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
