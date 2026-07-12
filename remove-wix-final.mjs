import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DIR = 'H:/DESARROLLO Y PROGRAMACION VIANNTTO/ANTIGRAVITY PROJECTS/PROYECTOS WEB/SITIO WEB FUNDACION';

function removeWixReferences(html) {
  // Remove "Proudly created with Wix.com" and the link
  html = html.replace(/Proudly created with <a[^>]*>Wix\.com<\/a>/g, '');
  html = html.replace(/Proudly created with Wix\.com/g, '');
  html = html.replace(/Created with <a[^>]*>Wix\.com<\/a>/g, '');
  html = html.replace(/Created with Wix\.com/g, '');
  
  // Remove any remaining Wix tracking pixels or hidden elements
  html = html.replace(/<img[^>]*height="0"[^>]*width="0"[^>]*style="display:none"[^>]*>/gi, '');
  html = html.replace(/<img[^>]*style="display:none"[^>]*height="0"[^>]*width="0"[^>]*>/gi, '');
  
  // Remove "My Mobile App" iframe if present
  html = html.replace(/<iframe[^>]*title="My Mobile App"[^>]*>.*?<\/iframe>/gis, '');
  
  // Remove Wix worker iframe
  html = html.replace(/<iframe[^>]*name="tpaWorker_[^"]*"[^>]*>.*?<\/iframe>/gis, '');
  
  // Clean up extra whitespace
  html = html.replace(/\s{2,}/g, ' ');
  
  return html;
}

const files = readdirSync(DIR).filter(f => f.endsWith('.html'));

for (const file of files) {
  const path = join(DIR, file);
  const html = readFileSync(path, 'utf8');
  const cleaned = removeWixReferences(html);
  writeFileSync(path, cleaned, 'utf8');
  console.log(`✓ ${file}`);
}

console.log(`\nDone!`);
