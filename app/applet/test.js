const fs = require('fs');
console.log('ROOT /');
fs.readdirSync('/').forEach(f => {
  if (f.includes('2026') || f.includes('public')) console.log('/', f);
});
console.log('CWD .');
fs.readdirSync('.').forEach(f => {
  if (f.includes('2026') || f.includes('public')) console.log('.', f);
});
