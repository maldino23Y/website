import express from 'express';
import Joi from 'joi';
import db from '../config/db.js';
import nodemailer from 'nodemailer';

const router = express.Router();

const contactSchema = Joi.object({
    name: Joi.string().required().max(100),
    email: Joi.string().email().required(),
    phone: Joi.string().allow('', null).max(20),
    subject: Joi.string().required().max(150),
    message: Joi.string().required(),
});

// GET all contact messages (Admin only - omitted auth check for brevity but should be added!)
router.get('/', (req, res, next) => {
    try {
        const messages = db.prepare('SELECT * FROM ContactMessages ORDER BY created_at DESC').all();
        res.json(messages);
    } catch (error) {
        next(error);
    }
});

// POST submit contact form
router.post('/', async (req, res, next) => {
    try {
        const { error, value } = contactSchema.validate(req.body);

        if (error) {
            res.status(400);
            throw new Error(error.details[0].message);
        }

        const { name, email, phone, subject, message } = value;

        const stmt = db.prepare(`
      INSERT INTO ContactMessages (name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `);

        const result = stmt.run(name, email, phone || null, subject, message);

        // Send Email using Nodemailer
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER || 'missaadothmane@gmail.com',
                    pass: process.env.EMAIL_PASS || 'your_google_app_password_here'
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER || 'missaadothmane@gmail.com',
                to: 'missaadothmane@gmail.com', // Recipient who receives the contact form
                subject: `Nouveau message de ${name} : ${subject}`,
                text: `Vous avez reçu un nouveau message sur MASSAD ENERGIE:\n\nNom: ${name}\nEmail: ${email}\nTéléphone: ${phone || 'N/A'}\n\nMessage:\n${message}`
            };

            // Await email delivery so we can notify the user if it actually succeeds
            await transporter.sendMail(mailOptions);

            res.status(201).json({
                success: true,
                id: result.lastInsertRowid,
                message: 'Message envoyé avec succès !'
            });
        } catch (mailError) {
            console.error("Erreur configuration Nodemailer:", mailError);
            // Even though it's saved in the DB, the email failed to send, so we throw to let the frontend know
            res.status(500);
            throw new Error('Votre message a été enregistré, mais l\'envoi de l\'email a échoué. Veuillez vérifier vos accès SMTP.');
        }

    } catch (error) {
        next(error);
    }
});

export default router;
