import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function createAccount(req, res) {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        req.session.userId = newUser._id.toString();
        res.send(`welcome, ${newUser.username}`);
    } catch (error) {
        res.status(409).send('username already exists');
    }
}

export async function login(req, res) {
    const { username, password } = req.body;

    const foundUser = await User.findOne({ username });
    if (!foundUser) return res.status(400).json({ message: 'invalid username' });

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) return res.status(400).json({ message: 'invalid password' });

    req.session.userId = foundUser._id.toString();
    res.json({ username: foundUser.username });
}

export function logout(req, res) {
    const _id = req.session.userId;
    req.session.destroy(() => {
        console.log('session destroyed');
    });
    res.json({ message: `user ${_id} logged out` });
}

export async function me(req, res) {
    const _id = req.session.userId;
    const { username } = await User.findOne({ _id });
    res.json({ username });
}