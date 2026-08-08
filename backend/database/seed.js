import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'sareleb.db');
const schemaPath = path.join(__dirname, 'schema.sql');

console.log('Initializing database...');
const db = new Database(dbPath);

const schema = fs.readFileSync(schemaPath, 'utf-8');
db.exec(schema);
console.log('Schema created.');

// Check if data exists
const count = db.prepare('SELECT COUNT(*) as count FROM Categories').get().count;

if (count === 0) {
    console.log('Seeding initial data...');

    const categories = [
        { name: 'MOTEURS ELECTRIQUES', description: 'Moteurs asynchrones triphasés et monophasés', slug: 'moteurs-electriques' },
        { name: 'MOTEURS REDUCTEURS', description: 'Motoréducteurs coaxiaux, orthogonaux et poulies', slug: 'moteurs-reducteurs' },
        { name: 'VIBRATION', description: 'Moteurs vibrants pour usage industriel', slug: 'vibration' },
        { name: 'TRANSFORMATEURS BT', description: 'Transformateurs basse tension', slug: 'transformateurs-bt' },
        { name: 'VENTILATION', description: 'Solutions de ventilation industrielle', slug: 'ventilation' },
        { name: 'STABILISATEURS', description: 'Régulateurs et stabilisateurs de tension', slug: 'stabilisateurs' },
        { name: 'LEVAGE', description: 'Equipements de levage et manutention', slug: 'levage' },
        { name: 'PIECES DE RECHANGE', description: 'Pièces détachées pour moteurs', slug: 'pieces-de-rechange' },
        { name: 'ROULEMENTS', description: 'Roulements industriels de haute qualité', slug: 'roulements' },
        { name: 'TRANSMISSION MECANIQUE', description: 'Accouplements, courroies et poulies', slug: 'transmission-mecanique' },
        { name: 'REBOBINAGE ET RENOVATION', description: 'Services de réparation et rebobinage', slug: 'rebobinage-renovation' }
    ];

    const insertCategory = db.prepare('INSERT INTO Categories (name, description, slug) VALUES (@name, @description, @slug)');

    categories.forEach(cat => {
        insertCategory.run(cat);
    });

    console.log('Categories seeded.');

    // Sample Products for first category
    let motId = db.prepare('SELECT id FROM Categories WHERE slug = \'moteurs-electriques\'').get().id;
    const insertProduct = db.prepare(`
    INSERT INTO Products (category_id, name, description, reference, price, stock, image_url)
    VALUES (@categoryId, @name, @description, @reference, @price, @stock, @imageUrl)
  `);

    const sampleProducts = [
        { categoryId: motId, name: 'Moteur Triphasé IE3 11kW', description: 'Moteur haute efficacité, 4 pôles', reference: 'MOT-IE3-11K-4P', price: 1250.00, stock: 15, imageUrl: '/images/products/moteur1.jpg' },
        { categoryId: motId, name: 'Moteur Monophasé 2.2kW', description: 'Moteur monophasé 230V, double condensateur', reference: 'MOT-1PH-22K', price: 340.50, stock: 22, imageUrl: '/images/products/moteur2.jpg' },
        { categoryId: motId, name: 'Moteur Triphasé IE4 15kW', description: 'Moteur très haute efficacité, 2 pôles', reference: 'MOT-IE4-15K-2P', price: 2100.00, stock: 8, imageUrl: '/images/products/moteur3.jpg' }
    ];

    sampleProducts.forEach(prod => {
        insertProduct.run(prod);
    });

    // Testimonials
    const insertTestimonial = db.prepare(`
    INSERT INTO Testimonials (client_name, company, content, rating)
    VALUES (@name, @company, @content, @rating)
  `);

    const testimonials = [
        { name: 'Ahmed B.', company: 'Industries Maroc', content: 'Un partenaire de confiance depuis des années. La qualité des moteurs est exceptionnelle.', rating: 5 },
        { name: 'Youssef M.', company: 'AgriTech SARL', content: 'Le service après-vente de Massad est très réactif. Nos machines tournent sans interruption.', rating: 5 },
        { name: 'Karim S.', company: 'Minoterie du Nord', content: 'Excellent rapport qualité-prix sur toute la gamme de transmission mécanique.', rating: 5 }
    ];

    testimonials.forEach(t => insertTestimonial.run(t));
    console.log('Testimonials seeded.');

    // Create an admin user
    // (In a real app, hash the password! Here we use a fake hash for demonstration)
    // Let's import bcryptjs to hash a real password
    const bcrypt = await import('bcryptjs');
    const salt = bcrypt.default.genSaltSync(10);
    const hash = bcrypt.default.hashSync('admin123', salt);

    db.prepare(`
    INSERT INTO Users (username, email, password_hash, role)
    VALUES ('admin', 'admin@sareleb.com', ?, 'admin')
  `).run(hash);
    console.log('Admin user seeded (admin@sareleb.com / admin123).');
} else {
    console.log('Database already contains data, skipping seed.');
}

db.close();
console.log('Seed completed successfully.');
