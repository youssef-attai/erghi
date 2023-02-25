export default function (...fields) {
    return function middleware(req, res, next) {
        for (const field of fields) {
            if (!req.body[field]) {
                res.status(400).json({ message: `missing ${field}` });
                return;
            }
        }

        next();
    }
}
