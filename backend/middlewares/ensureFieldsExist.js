export default function ensureFieldsExist(...fields) {
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
