import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// GET all categories
router.get('/', (req, res, next) => {
    try {
        const categories = db.prepare('SELECT * FROM Categories ORDER BY name ASC').all();
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

// GET category by ID or slug
router.get('/:idOrSlug', (req, res, next) => {
    try {
        const { idOrSlug } = req.params;
        let query, param;

        if (isNaN(idOrSlug)) {
            query = 'SELECT * FROM Categories WHERE slug = ?';
            param = idOrSlug;
        } else {
            query = 'SELECT * FROM Categories WHERE id = ?';
            param = parseInt(idOrSlug, 10);
        }

        const category = db.prepare(query).get(param);
        if (!category) {
            res.status(404);
            throw new Error('Category not found');
        }
        res.json(category);
    } catch (error) {
        next(error);
    }
});

// GET products by category slug
router.get('/:idOrSlug/products', (req, res, next) => {
    try {
        const { idOrSlug } = req.params;
        let categoryQuery, param;

        if (isNaN(idOrSlug)) {
            categoryQuery = 'SELECT id FROM Categories WHERE slug = ?';
            param = idOrSlug;
        } else {
            categoryQuery = 'SELECT id FROM Categories WHERE id = ?';
            param = parseInt(idOrSlug, 10);
        }

        const category = db.prepare(categoryQuery).get(param);

        if (!category) {
            res.status(404);
            throw new Error('Category not found');
        }

        const products = db.prepare('SELECT * FROM Products WHERE category_id = ? ORDER BY name ASC').all(category.id);
        res.json(products);
    } catch (error) {
        next(error);
    }
});

export default router;
