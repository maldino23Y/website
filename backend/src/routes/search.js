import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.json({ products: [], categories: [] });
        }

        const searchTerm = `%${q}%`;

        const products = db.prepare('SELECT id, name, reference, price, image_url FROM Products WHERE name LIKE ? OR reference LIKE ? OR description LIKE ? LIMIT 10').all(searchTerm, searchTerm, searchTerm);

        const categories = db.prepare('SELECT id, name, slug, description FROM Categories WHERE name LIKE ? OR description LIKE ? LIMIT 5').all(searchTerm, searchTerm);

        res.json({ products, categories });
    } catch (error) {
        next(error);
    }
});

export default router;
