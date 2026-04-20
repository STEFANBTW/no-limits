import fs from 'fs';

try {
  const files = fs.readdirSync('.', { recursive: true });
  const matches = files.filter(f => f.includes('20260417'));
  console.log(matches.join('\n'));
} catch (e) {
  console.error(e);
}
