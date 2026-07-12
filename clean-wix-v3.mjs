import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DIR = 'H:/DESARROLLO Y PROGRAMACION VIANNTTO/ANTIGRAVITY PROJECTS/PROYECTOS WEB/SITIO WEB FUNDACION';

function cleanWixFinal(html) {
  // Remove ALL Wix style links (both href and data-href)
  html = html.replace(/<style[^>]*data-href="https:\/\/static\.parastorage\.com[^"]*"[^>]*>.*?<\/style>/gis, '');
  
  // Remove Wix scripts with src attribute
  html = html.replace(/<script[^>]*src="https:\/\/static\.parastorage\.com[^"]*"[^>]*><\/script>/gi, '');
  
  // Remove Wix polyfill scripts
  html = html.replace(/<script>\s*if\s*\(\s*!window\.Intl[^<]*<\/script>/gis, '');
  html = html.replace(/<script>\s*if\s*\(\s*!window\.performance[^<]*<\/script>/gis, '');
  
  // Remove Wix SDK styles
  html = html.replace(/\.wixSdkShowFocusOnSibling\s*\{[^}]*\}/gi, '');
  
  // Remove Wix skip animations script
  html = html.replace(/<script[^>]*id="wix-skip-played-animations-setup"[^>]*>.*?<\/script>/gis, '');
  
  // Remove Wix-specific CSS variables
  html = html.replace(/--wst-[^:]*:[^;]*;/gi, '');
  
  // Remove Wix-specific classes
  html = html.replace(/\.wix[^{]*\{[^}]*\}/gi, '');
  
  // Remove Wix meta tags
  html = html.replace(/<meta[^>]*[Ww]ix[^>]*>/gi, '');
  
  // Remove Wix favicons
  html = html.replace(/<link[^>]*wix\.com[^>]*>/gi, '');
  
  // Clean up empty lines
  html = html.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return html;
}

const files = readdirSync(DIR).filter(f => f.endsWith('.html'));

for (const file of files) {
  const path = join(DIR, file);
  const html = readFileSync(path, 'utf8');
  const cleaned = cleanWixFinal(html);
  writeFileSync(path, cleaned, 'utf8');
  const wixCount = (cleaned.match(/wix|parastorage/gi) || []).length;
  console.log(`✓ ${file}: ${(cleaned.length / 1024).toFixed(1)} KB (${wixCount} refs)`);
}

console.log(`\nDone!`);
