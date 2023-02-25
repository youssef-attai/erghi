export function ensureFieldsExist(...fields) {
    return function middleware(req, res, next) {
        for (const field of fields) {
            if (!req.body[field]) {
                res.send(`Missing ${field}`);
                return;
            }
        }

        next();
    }
}

export function ensureAuthenticated(req, res, next) {
    if (!req.session.userId) {
        return res.sendStatus(401);
    }

    next();
}