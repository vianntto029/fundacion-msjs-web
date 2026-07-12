import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DIR = 'H:/DESARROLLO Y PROGRAMACION VIANNTTO/ANTIGRAVITY PROJECTS/PROYECTOS WEB/SITIO WEB FUNDACION';

// Map Wix fonts to Google Fonts
const FONT_MAP = {
  'avenir-lt-w01_35-light1475496': 'Nunito Sans',
  'avenir-lt-w01_35-light1475496style': 'Nunito Sans',
  'din-next-w01-light': 'Nunito Sans',
  'din-next-w01-lightstyle': 'Nunito Sans',
  'helvetica-w01-roman': 'Helvetica',
  'helvetica-w01-romanstyle': 'Helvetica',
  'poppins': 'Poppins',
  'poppinsstyle': 'Poppins',
};

function replaceFonts(html) {
  // Replace @font-face declarations referencing parastorage
  html = html.replace(/@font-face\s*\{[^}]*font-family:\s*'([^']+)'[^}]*src:\s*url\(['"]?\/\/static\.parastorage\.com[^)]*\)[^}]*\}/gi, (match, fontName) => {
    const googleFont = FONT_MAP[fontName] || 'Arial, sans-serif';
    return `@font-face { font-family: '${googleFont}'; font-style: normal; font-weight: 400; }`;
  });
  
  // Replace font-family references in CSS
  for (const [wixFont, googleFont] of Object.entries(FONT_MAP)) {
    html = html.replace(new RegExp(wixFont, 'gi'), googleFont);
  }
  
  // Remove any remaining parastorage URLs
  html = html.replace(/url\(['"]?\/\/static\.parastorage\.com[^)]*\)/gi, 'url()');
  
  return html;
}

const files = readdirSync(DIR).filter(f => f.endsWith('.html'));

for (const file of files) {
  const path = join(DIR, file);
  const html = readFileSync(path, 'utf8');
  const cleaned = replaceFonts(html);
  writeFileSync(path, cleaned, 'utf8');
  const wixCount = (cleaned.match(/parastorage/gi) || []).length;
  console.log(`✓ ${file}: ${(cleaned.length / 1024).toFixed(1)} KB (${wixCount} parastorage refs)`);
}

console.log(`\nDone!`);
