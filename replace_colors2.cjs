const fs = require('fs');
const path = require('path');

const directories = ['src/components', 'src/pages'];

const replacements = [
    // Backgrounds
    [/bg-white\/(?!5|10|20)([0-9]{1,2})/g, 'bg-theme-text/$1'],
    [/bg-white\/5(?![0-9])/g, 'bg-theme-border/50'], 
    [/bg-white\/10(?![0-9])/g, 'bg-theme-border'],
    [/bg-white\/20(?![0-9])/g, 'bg-theme-border-strong'],
    [/bg-[#1E2120]/ig, 'bg-theme-panel'],
    [/text-[#54524F]/ig, 'text-theme-text-subtle'],
    [/text-[#141615]/ig, 'text-theme-base'],
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const originalContent = content;
            for (const [pattern, replacement] of replacements) {
                content = content.replace(pattern, replacement);
            }
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

for (const dir of directories) {
    if (fs.existsSync(dir)) {
        processDirectory(dir);
    }
}

console.log("Secondary color replacement complete.");
