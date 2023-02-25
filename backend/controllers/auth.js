import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function createAccount(req, res) {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.send(`welcome, ${newUser.username}`);
    } catch (error) {
        res.status(409).send('username already exists');
    }
}

export async function login(req, res) {
    const { username, password } = req.body;

    const result = await User.findOne({ username, password });

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
        res.send('Invalid password');
        return;
    }

    req.session.userId = result._id.toString();
    res.send(`welcome back, ${result.username}`);
}

export function logout(req, res) {
    req.session.destroy();
    res.send('goodbye');
} 