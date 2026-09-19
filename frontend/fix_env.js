const fs = require('fs');
let env = fs.readFileSync('.env', 'utf-8');
let modified = false;

let lines = env.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith('VITE_SUPABASE_URL=')) {
    let url = lines[i].substring('VITE_SUPABASE_URL='.length).trim();
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      lines[i] = 'VITE_SUPABASE_URL=https://' + url;
      modified = true;
      console.log('Fixed URL protocol');
    }
    if (url.endsWith('/')) {
      lines[i] = lines[i].slice(0, -1);
      modified = true;
      console.log('Removed trailing slash');
    }
  }
}

if (modified) {
  fs.writeFileSync('.env', lines.join('\n'));
} else {
  console.log('No fixes needed in .env');
}
