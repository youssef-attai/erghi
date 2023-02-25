export async function createAccount(req, res) {
    const { username, password } = req.body;

    const newUser = new User({ username, password });
    await newUser.save();

    res.send(`welcome, ${newUser.username}`);
}

export async function login(req, res) {
}

export function logout(req, res) {
} 