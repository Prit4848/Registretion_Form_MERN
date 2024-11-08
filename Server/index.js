const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt'); 
const userModel = require('./Models/userModel');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

const PORT = 3000;

app.post('/api/register', async (req, res) => {
    try {
        let { name, email, password } = req.body;

        
        const user = await userModel.findOne({ email: email });

        if (user) {
            return res.status(409).json({
                message: 'User already exists',
            });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

       
        const userCreation = await userModel.create({
            name,
            email,
            password: hash,
        });

        res.status(201).json({
            message: 'User created successfully',
            success: true,
            user: userCreation,
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
