import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DIR = 'H:/DESARROLLO Y PROGRAMACION VIANNTTO/ANTIGRAVITY PROJECTS/PROYECTOS WEB/SITIO WEB FUNDACION';

function removeBanner(html) {
  // Remove the Wix freemium banner - it's inside SITE_CONTAINER
  // Pattern: <div id="SITE_CONTAINER">...Ir al contenido principal...Este sitio web fue creado con Wix...Empezar...</div>
  html = html.replace(/<button[^>]*id="SKIP_TO_CONTENT_BTN"[^>]*>.*?<\/button>/gi, '');
  html = html.replace(/Este sitio web fue creado con Wix\.\s*Crea el tuyo hoy mismo\./g, '');
  html = html.replace(/<span[^>]*data-hook="freemium-button"[^>]*>.*?<\/span>/gi, '');
  html = html.replace(/<span[^>]*class="[^"]*zAqGm2[^"]*"[^>]*>.*?<\/span>/gi, '');
  
  // Remove Wix Chat iframe
  html = html.replace(/<iframe[^>]*title="Wix Chat"[^>]*>.*?<\/iframe>/gis, '');
  html = html.replace(/<div[^>]*id="comp-jqkn0z81"[^>]*>.*?<\/div>/gis, '');
  
  return html;
}

const files = readdirSync(DIR).filter(f => f.endsWith('.html'));

for (const file of files) {
  const path = join(DIR, file);
  const html = readFileSync(path, 'utf8');
  const cleaned = removeBanner(html);
  writeFileSync(path, cleaned, 'utf8');
  console.log(`✓ ${file}`);
}

console.log(`\nDone!`);
