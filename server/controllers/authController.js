const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

//Signup Endpoint
exports.signup = async (req, res, next) => {
    const {username, email, password} = req.body

    const exists = await User.findOne({email})
    if(exists) return res.status(400).json({message: "User Already exists"})
    
        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({username, email, password:hashed})

        const token = jwt.sign({id: user._id, role: user.role }, process.env.JWT_SECRET,{
            expiresIn: '1h'
        })
        res.json(token)
}

// Login Endpoint Logic
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User Not Found"});

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "incorrect password"});

    const token = jwt.sign({ id: user._id, role: user.role, username: user.username}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    // Return both token and user (without password)
    const { password: _, ...userWithoutPassword } = user.toObject();
    
    res.status(200).json({
        token,
        user: userWithoutPassword,
    });
}