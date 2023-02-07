import { Router, Request, Response } from 'express'

const router = Router()

// Login endpoint
// Returns a new refresh token and an access token
// Stores the new refresh token in the database
// Removes the current refresh token from cookies (if exists)
router.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body

    if (!username) return res.status(400).json({ 'message': 'username field is missing' })

    if (!password) return res.status(400).json({ 'message': 'password field is missing' })

    const foundUser = await User.findOne({ "profile.username": username })

    if (!foundUser) return res.sendStatus(401)
    const userId = foundUser._id

    if (!(await bcrypt.compare(password, foundUser.password))) return res.sendStatus(401)

    try {
        const refreshToken = createRefreshToken({ userId: userId.toString() })
        const accessToken = createAccessToken({ userId: userId.toString() })

        await foundUser.updateOne({
            $set: { refresh: refreshToken }
        })

        res.cookie('refresh', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: REFRESH_TOKEN_EXPIRE_SECONDS
        })

        return res.status(201).json({ accessToken })
    } catch (error) {


    })

// Signup endpoint
// Creates a new user in the database
// Then logs the user in
router.post("/new", async (req: Request, res: Response) => {
    const { username, password } = req.body

    if (!username) {
        return res.status(400).json({ 'message': 'username field is missing' })
    }

    if (!password) {
        return res.status(400).json({ 'message': 'password field is missing' })
    }

    try {
        const userId = new mongoose.Types.ObjectId()
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const refreshToken = createRefreshToken({ userId: userId.toString() })
        const accessToken = createAccessToken({ userId: userId.toString() })

        const newUser = new User({
            profile: {
                username,
                bio: "Hey, there!"
            },
            password: hashedPassword,
            refresh: refreshToken
        })

        newUser._id = userId
        await newUser.save()

        res.cookie('refresh', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: REFRESH_TOKEN_EXPIRE_SECONDS
        })
    
});

// Request access token endpoint
// Needs a valid refresh token in the cookies to work

// Logout endpoint
// Removes the refresh token in the cookies from the database
router.get("/logout", async (req: Request, res: Response) => {
    if (!req.cookies.refresh) return res.sendStatus(204)

    const refreshToken = req.cookies.refresh

    try {
        await User.updateOne({ refresh: refreshToken }, {
            $set: { refresh: "" }
        })

        res.clearCookie('refresh', {
            httpOnly: true,
            sameSite: 'none',
        })

        return res.sendStatus(204)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
})

export default router