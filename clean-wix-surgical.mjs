import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DIR = 'H:/DESARROLLO Y PROGRAMACION VIANNTTO/ANTIGRAVITY PROJECTS/PROYECTOS WEB/SITIO WEB FUNDACION';

function surgicalClean(html) {
  // 1. Remove Wix banner ("Este sitio web fue creado con Wix...")
  html = html.replace(/<div[^>]*id="WIX_ADS"[^>]*>[\s\S]*?<\/div>/gi, '');
  html = html.replace(/<div[^>]*class="[^"]*freemium-banner[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  html = html.replace(/<div[^>]*data-testid="freemium-banner"[^>]*>[\s\S]*?<\/div>/gi, '');
  
  // 2. Remove the "Ir al contenido principal" skip link (Wix specific)
  html = html.replace(/<a[^>]*class="[^"]*skip-to-content[^"]*"[^>]*>.*?<\/a>/gi, '');
  html = html.replace(/<div[^>]*id="SKIP_TO_CONTENT_BTN"[^>]*>.*?<\/div>/gi, '');
  
  // 3. Remove Wix tracking pixels
  html = html.replace(/<img[^>]*height="1"[^>]*width="1"[^>]*style="display:none"[^>]*>/gi, '');
  html = html.replace(/<noscript>[\s\S]*?wix\.com[\s\S]*?<\/noscript>/gi, '');
  
  // 4. Remove "top of page" text
  html = html.replace(/top of page/gi, '');
  
  // 5. Remove Wix-specific meta tags (keep viewport and charset)
  html = html.replace(/<meta[^>]*X-Wix[^>]*>/gi, '');
  html = html.replace(/<meta[^>]*content="Wix\.com Website Builder"[^>]*>/gi, '');
  
  // 6. Remove Wix favicons (replace with a simple one)
  html = html.replace(/<link[^>]*href="https:\/\/www\.wix\.com\/favicon\.ico"[^>]*>/gi, '');
  
  // 7. Remove Wix-specific inline scripts that don't affect visuals
  html = html.replace(/<script>\s*window\.wixEmbedsAPI\s*=.*?<\/script>/gis, '');
  html = html.replace(/<script>\s*window\.wixBiSession\s*=.*?<\/script>/gis, '');
  html = html.replace(/<script>\s*window\.wixCodeIds\s*=.*?<\/script>/gis, '');
  
  // 8. Clean up empty lines
  html = html.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return html;
}

const files = readdirSync(DIR).filter(f => f.endsWith('.html'));

for (const file of files) {
  const path = join(DIR, file);
  const html = readFileSync(path, 'utf8');
  const cleaned = surgicalClean(html);
  writeFileSync(path, cleaned, 'utf8');
  console.log(`✓ ${file}: ${(cleaned.length / 1024).toFixed(1)} KB`);
}

console.log(`\nDone! Cleaned ${files.length} files (visual Wix elements removed, CSS preserved).`);
