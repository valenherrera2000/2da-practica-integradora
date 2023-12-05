import { Router } from 'express';
import UserModel from '../../models/UserModel.js';
import { createHash } from '../../utils.js';

const router = Router();

router.post('/auth/register', async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        password,
    } = req.body;
    if (
        !first_name ||
        !last_name ||
        !dni ||
        !email ||
        !password
    ) {
        return res.status(400).json({ message: 'All fields are required 😨' });
    };
    const user = await UserModel.findOne({ email });
    if (user) {
        return res.status(400).json({ message: 'This email is already registered. Try recovering your password' })
    };
    user = await UserModel.create({
        first_name,
        last_name,
        email,
        password: createHash(password),
    });
    res.status(200).json({ message: 'User has been created successfully!' });
});

router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ message: 'Invalid email or password 😨' });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password 😨' });
    }
    const isValidPassword = verifyPassword(password, user);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid email or password 😨' });
    }
    const token = tokenGenerator(user);
    res
        .cookie('access_token', token, { maxAge: 1000 * 60 * 30, httpOnly: true, signed: true })
        .status(200)
        .json({ message: 'Log in successful 👽' });
});



export default router;