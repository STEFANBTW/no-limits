const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/text-\[length:var\(--dash-font-brand\)]/g, 'dash-font-brand');
  content = content.replace(/text-\[length:var\(--dash-font-page-title\)]/g, 'dash-font-page-title');
  content = content.replace(/text-\[length:var\(--dash-font-section-title\)]/g, 'dash-font-section-title');
  content = content.replace(/text-\[length:var\(--dash-font-card-title\)]/g, 'dash-font-card-title');
  content = content.replace(/text-\[length:var\(--dash-font-body\)]/g, 'dash-font-body');
  content = content.replace(/text-\[length:var\(--dash-font-action\)]/g, 'dash-font-action');
  fs.writeFileSync(filePath, content);
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      replaceInFile(fullPath);
    }
  }
}

traverse('src/pages/admin');
console.log('done.');

const idx = fs.readFileSync('src/index.css', 'utf8');
if(!idx.includes('@utility dash-font-brand')) {
  fs.writeFileSync('src/index.css', idx + '\n@utility dash-font-brand { font-size: var(--dash-font-brand); }\n@utility dash-font-page-title { font-size: var(--dash-font-page-title); }\n@utility dash-font-section-title { font-size: var(--dash-font-section-title); }\n@utility dash-font-card-title { font-size: var(--dash-font-card-title); }\n@utility dash-font-body { font-size: var(--dash-font-body); }\n@utility dash-font-action { font-size: var(--dash-font-action); }\n');
}
