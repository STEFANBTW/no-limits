const fs = require('fs');
const path = require('path');

const directories = ['src/components', 'src/pages'];

const replacements = [
    // Backgrounds
    [/bg-\[\#0a0a0a\](?!\/)/g, 'bg-theme-base'],
    [/bg-\[\#141615\](?!\/)/g, 'bg-theme-surface'],
    [/bg-\[\#1e2120\](?!\/)/g, 'bg-theme-panel'],
    [/bg-\[\#1E2120\](?!\/)/g, 'bg-theme-panel'],
    [/bg-\[\#0f0f0f\](?!\/)/g, 'bg-theme-panel'],
    [/bg-\[\#333333\](?!\/)/g, 'bg-theme-panel'],
    [/bg-\[\#0c0d0c\](?!\/)/g, 'bg-theme-base'],
    [/bg-\[\#1a1a1a\](?!\/)/g, 'bg-theme-surface'],
    
    // Borders
    [/border-white\/5(?![0-9])/g, 'border-theme-border'],
    [/border-white\/10(?![0-9])/g, 'border-theme-border'],
    [/border-\[\#333333\](?![0-9])/g, 'border-theme-border-strong'],
    [/border-white\/20(?![0-9])/g, 'border-theme-border-strong'],
    
    // Texts
    [/text-white\/100(?![0-9])/g, 'text-theme-text'],
    [/text-white\/90(?![0-9])/g, 'text-theme-text'],
    [/text-white\/80(?![0-9])/g, 'text-theme-text-muted'],
    [/text-white\/75(?![0-9])/g, 'text-theme-text-muted'],
    [/text-white\/60(?![0-9])/g, 'text-theme-text-subtle'],
    [/text-white\/50(?![0-9])/g, 'text-theme-text-subtle'],
    [/text-white\/40(?![0-9])/g, 'text-theme-text-subtle'],
    [/text-white\/30(?![0-9])/g, 'text-theme-text-subtle'],
    [/text-\[\#A8A6A1\]/g, 'text-theme-text-muted'],
    [/text-\[\#EBE6DA\]/g, 'text-theme-text'],
    [/text-slate-100/g, 'text-theme-text'],
    [/text-slate-200/g, 'text-theme-text-muted'],
    [/text-slate-300/g, 'text-theme-text-muted'],
    [/text-slate-400/g, 'text-theme-text-subtle'],
    [/text-slate-500/g, 'text-theme-text-subtle'],
    [/text-white(?![a-zA-Z0-9\/])(?!\/\d)/g, 'text-theme-text'],
    [/text-black(?![a-zA-Z0-9\/])(?!\/\d)/g, 'text-theme-text-inverse'],
    
    // Gradients
    [/from-\[\#0a0a0a\](?![a-zA-Z0-9\/])/g, 'from-theme-gradient-start'],
    [/via-\[\#0a0a0a\]\/80/g, 'via-theme-gradient-mid'],
    [/to-\[\#0a0a0a\]/g, 'to-theme-gradient-end'],
    [/from-black\/40/g, 'from-theme-overlay'],
    [/bg-black\/60/g, 'bg-theme-overlay'],
    [/bg-black\/80/g, 'bg-theme-overlay\/80'],
    [/bg-black\/20/g, 'bg-theme-overlay\/20'],
    [/bg-black\/30/g, 'bg-theme-overlay\/30'],
    [/bg-black\/40/g, 'bg-theme-overlay\/40'],
    [/bg-black\/50/g, 'bg-theme-overlay\/50'],
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

console.log("Color replacement complete.");
