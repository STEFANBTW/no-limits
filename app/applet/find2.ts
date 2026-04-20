import fs from 'fs';

function walk(dir) {
    if (dir.includes('node_modules')) return;
    try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = dir + '/' + file;
            if (file.includes('20260417')) {
                console.log("MATCH", fullPath);
            }
            try {
                if (fs.statSync(fullPath).isDirectory()) {
                    walk(fullPath);
                }
            } catch(e) {}
        }
    } catch(e) {}
}

walk('/');
