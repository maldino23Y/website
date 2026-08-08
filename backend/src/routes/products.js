import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// GET all products with filtering options
router.get('/', (req, res, next) => {
    try {
        const { category, search, minPrice, maxPrice, limit, offset } = req.query;

        let query = 'SELECT p.*, c.name as category_name, c.slug as category_slug FROM Products p JOIN Categories c ON p.category_id = c.id WHERE 1=1';
        const params = [];

        if (category) {
            // Allow category by ID or slug
            if (isNaN(category)) {
                query += ' AND c.slug = ?';
            } else {
                query += ' AND p.category_id = ?';
            }
            params.push(category);
        }

        if (search) {
            query += ' AND (p.name LIKE ? OR p.reference LIKE ? OR p.description LIKE ?)';
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        if (minPrice) {
            query += ' AND p.price >= ?';
            params.push(parseFloat(minPrice));
        }

        if (maxPrice) {
            query += ' AND p.price <= ?';
            params.push(parseFloat(maxPrice));
        }

        const parsedLimit = parseInt(limit, 10) || 50;
        const parsedOffset = parseInt(offset, 10) || 0;

        query += ' ORDER BY p.name ASC LIMIT ? OFFSET ?';
        params.push(parsedLimit, parsedOffset);

        const products = db.prepare(query).all(params);

        // Get total count for pagination
        let countQuery = 'SELECT COUNT(*) as count FROM Products p JOIN Categories c ON p.category_id = c.id WHERE 1=1';
        const countParams = params.slice(0, -2); // Remove limit and offset

        // Copy the WHERE clauses for the count query
        if (category) countQuery += (isNaN(category) ? ' AND c.slug = ?' : ' AND p.category_id = ?');
        if (search) countQuery += ' AND (p.name LIKE ? OR p.reference LIKE ? OR p.description LIKE ?)';
        if (minPrice) countQuery += ' AND p.price >= ?';
        if (maxPrice) countQuery += ' AND p.price <= ?';

        const total = db.prepare(countQuery).get(countParams).count;

        res.json({
            data: products,
            pagination: {
                total,
                limit: parsedLimit,
                offset: parsedOffset
            }
        });

    } catch (error) {
        next(error);
    }
});

// GET featured products
router.get('/featured', (req, res, next) => {
    try {
        const products = db.prepare('SELECT p.*, c.name as category_name, c.slug as category_slug FROM Products p JOIN Categories c ON p.category_id = c.id ORDER BY p.id DESC LIMIT 6').all();
        res.json(products);
    } catch (error) {
        next(error);
    }
});

// GET product by slug
router.get('/slug/:slug', (req, res, next) => {
    try {
        const { slug } = req.params;

        // Simple fallback since we don't have a product slug, we'll try to find by reference or name if slugifier used
        const product = db.prepare('SELECT p.*, c.name as category_name, c.slug as category_slug FROM Products p JOIN Categories c ON p.category_id = c.id WHERE p.reference = ? OR p.name = ?').get(slug, slug);
        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
});

// GET product by ID
router.get('/:id', (req, res, next) => {
    try {
        const { id } = req.params;
        const product = db.prepare('SELECT p.*, c.name as category_name, c.slug as category_slug FROM Products p JOIN Categories c ON p.category_id = c.id WHERE p.id = ?').get(parseInt(id, 10));
        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
});

export default router;
