const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/learnhub', {useNewUrlParser: true, useUnifiedTopology: true});

// User model
const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
});
const User = mongoose.model('User', UserSchema);

app.use(cors());
app.use(express.json());

// Register API (same as before)
app.post('/api/register', async (req, res) => {
    const {email, username, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
            password: hashedPassword
        });

        await newUser.save();

        res.json({message: 'User registered successfully!'});
    } catch (error) {
        res.status(500).json({error: 'Error registering user.'});
    }
});

// ✅ Login API (verifying password securely)
app.post('/api/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.json({success: false, message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.json({success: true, message: 'Login successful'});
        } else {
            res.json({success: false, message: 'Incorrect password'});
        }
    } catch (error) {
        res.status(500).json({success: false, message: 'Error logging in.'});
    }
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
