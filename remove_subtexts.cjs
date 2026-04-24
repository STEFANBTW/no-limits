const fs = require('fs');
const path = require('path');

const file = 'src/pages/admin/DashboardTab.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Remove pending subtext
content = content.replace(/<div className="flex items-center gap-2 text-\[var\(--dash-font-card-title\)\] text-\[var\(--dash-accent\)\] font-medium">[\s\S]*?<\/div>/, '');

// Remove revenue subtext
content = content.replace(/<div className="flex items-center gap-2 text-\[var\(--dash-font-card-title\)\] text-\[var\(--dash-text-muted\)\]">[\s\S]*?<\/div>/, '');

// Remove active catalog subtext
content = content.replace(/<div className="flex items-center gap-2 text-\[var\(--dash-font-card-title\)\] text-green-500 font-medium">[\s\S]*?<\/div>/, '');

// Remove Ops sync subtext
content = content.replace(/<div className="text-\[var\(--dash-font-card-title\)\] text-\[var\(--dash-text-muted\)\] mt-1 uppercase tracking-tight">Cloudinary Integration<\/div>/, '');

// Remove Ops new collection subtext
content = content.replace(/<div className="text-\[var\(--dash-font-card-title\)\] text-\[var\(--dash-text-muted\)\] mt-1 uppercase tracking-tight">Define Art-World<\/div>/, '');

// Remove recent timeline dates and no events logged text
content = content.replace(/<div className="text-\[var\(--dash-font-body\)\] text-\[var\(--dash-text-muted\)\] italic">No recent events logged.<\/div>/, '');

// Remove the item date in timeline
content = content.replace(/<div className="text-\[var\(--dash-font-card-title\)\] text-\[var\(--dash-text-muted\)\] uppercase tracking-wider">[\s\S]*?<\/div>/g, '');

fs.writeFileSync(file, content);
console.log('done removing subtexts');
