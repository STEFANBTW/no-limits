import fs from 'fs';
import path from 'path';

function walkFind(dir: string) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.name.includes('node_modules') || file.name.includes('.git') || file.name.includes('proc')) continue;
    
    if (file.name.includes('20260417') || file.name.includes('images')) {
       console.log('MATCH DIR/FILE:', path.join(dir, file.name));
    }
  }
}

walkFind(process.cwd());
try { walkFind('/'); } catch(e) {}
