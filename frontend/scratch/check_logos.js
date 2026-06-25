import fs from 'fs';
const content = fs.readFileSync('src/components/Header.tsx', 'utf8');

const regex = /site-logo[\s\S]*?href="([^"]*)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const beforeMatch = content.substring(0, match.index);
  const lineNum = beforeMatch.split('\n').length;
  console.log(`Line ${lineNum}: href="${match[1]}"`);
}
