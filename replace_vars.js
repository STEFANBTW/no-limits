const fs = require('fs');
const path = require('path');

const dir = 'src/pages/admin';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace old explicit pixel sizes
  content = content.replace(/var\(--dash-font-32\)/g, 'var(--dash-font-page-title)');
  content = content.replace(/var\(--dash-font-24\)/g, 'var(--dash-font-page-title)');
  content = content.replace(/var\(--dash-font-20\)/g, 'var(--dash-font-section-title)');
  content = content.replace(/var\(--dash-font-18\)/g, 'var(--dash-font-section-title)');
  content = content.replace(/var\(--dash-font-16\)/g, 'var(--dash-font-body)');
  content = content.replace(/var\(--dash-font-14\)/g, 'var(--dash-font-body)');
  content = content.replace(/var\(--dash-font-12\)/g, 'var(--dash-font-card-title)');
  
  // Replace semantic classes created previously
  content = content.replace(/length:var\(--dash-h1-sidebar\)/g, 'var(--dash-font-brand)');
  content = content.replace(/var\(--dash-h1-sidebar\)/g, 'var(--dash-font-brand)');
  
  content = content.replace(/length:var\(--dash-h3-page\)/g, 'var(--dash-font-page-title)');
  content = content.replace(/var\(--dash-h3-page\)/g, 'var(--dash-font-page-title)');
  
  content = content.replace(/length:var\(--dash-h3-section\)/g, 'var(--dash-font-section-title)');
  content = content.replace(/var\(--dash-h3-section\)/g, 'var(--dash-font-section-title)');
  
  content = content.replace(/length:var\(--dash-h3-sub\)/g, 'var(--dash-font-section-title)');
  content = content.replace(/var\(--dash-h3-sub\)/g, 'var(--dash-font-section-title)');
  
  content = content.replace(/length:var\(--dash-h3-card\)/g, 'var(--dash-font-card-title)');
  content = content.replace(/var\(--dash-h3-card\)/g, 'var(--dash-font-card-title)');
  
  // Also fix a bug where `text-[var(--dash-font-brand)]` might need length: if it's placed outside in certain Tailwind versions if there's issue.
  // Actually, wait, it's safer to leave text-[var(...)] alone because it works for both text-color and font-size depending on what is returned. Since we return `16px` it maps to font-size.

  fs.writeFileSync(filePath, content);
}
console.log('done running script');
