import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        const testimonials = db.prepare('SELECT * FROM Testimonials ORDER BY created_at DESC').all();
        res.json(testimonials);
    } catch (error) {
        next(error);
    }
});

export default router;
