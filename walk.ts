import fs from 'fs';
import path from 'path';

console.log('pwd:', process.cwd());

function walk(dir: string, indent: string = '') {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.name.includes('node_modules') || file.name.includes('.git')) continue;
    
    console.log(`${indent}${file.name}`);
    if (file.isDirectory()) {
      try { walk(path.join(dir, file.name), indent + '  '); } catch {}
    }
  }
}

walk(process.cwd());
