import User from "../models/User.js";

export async function createAccount(req, res) {
    const { username, password } = req.body;

    const newUser = new User({ username, password });
    await newUser.save();

    res.send(`welcome, ${newUser.username}`);
}

export async function login(req, res) {
    const { username, password } = req.body;

    const result = await User.findOne({ username, password });

    if (!result) {
        res.send('Invalid username or password');
        return;
    }

    req.session.userId = result._id.toString();
    res.send(`welcome back, ${result.username}`);
}

export function logout(req, res) {
    req.session.destroy();
    res.send('goodbye');
} 