const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== '.next' && file !== 'node_modules') {
                filelist = walkSync(filePath, filelist);
            }
        } else {
            if (file.endsWith('.js') || file.endsWith('.jsx')) {
                filelist.push(filePath);
            }
        }
    });
    return filelist;
};

const frontendDir = path.join(__dirname, 'frontend');
const files = walkSync(frontendDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace colors
    content = content.replace(/sareleb-blue/g, 'brand-blue');
    content = content.replace(/sareleb-gold/g, 'brand-black');
    content = content.replace(/text-sareleb-gold/g, 'text-brand-blue');
    // Wait, if it was gold text, brand-black might be too dark, let's make it brand-blue for highlights
    content = content.replace(/bg-sareleb-gold/g, 'bg-brand-black');
    content = content.replace(/sareleb-dark/g, 'brand-black');
    content = content.replace(/sareleb-gray/g, 'brand-gray');

    // Custom manual overrides because of the previous regex overlap
    content = content.replace(/bg-brand-black/g, 'bg-brand-black text-white hover:bg-gray-800'); // Ensure buttons have text color

    // Replace text
    content = content.replace(/SARELEB/g, 'MASSAD ENERGIE');
    content = content.replace(/Sareleb/g, 'Massad Energie');
    content = content.replace(/sareleb\.com/g, 'massad-energie.com');

    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
});
