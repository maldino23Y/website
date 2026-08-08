import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', '..', 'database', 'sareleb.db');

let db;
try {
    db = new Database(dbPath, {
        // verbose: console.log 
    });
    console.log('Connected to SQLite Database.');
} catch (err) {
    console.error('Failed to connect to Database:', err);
    process.exit(1);
}

// Ensure database handles exit
process.on('exit', () => db.close());
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));

export default db;
