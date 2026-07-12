import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DIR = 'H:/DESARROLLO Y PROGRAMACION VIANNTTO/ANTIGRAVITY PROJECTS/PROYECTOS WEB/SITIO WEB FUNDACION';

function cleanWixDeep(html) {
  // Remove ALL Wix meta tags
  html = html.replace(/<meta[^>]*X-Wix[^>]*>/gi, '');
  html = html.replace(/<meta[^>]*wix[^>]*>/gi, '');
  html = html.replace(/<meta[^>]*generator[^>]*content="Wix[^>]*>/gi, '');
  
  // Remove ALL Wix scripts (external and inline)
  html = html.replace(/<script[^>]*parastorage\.com[^>]*>.*?<\/script>/gis, '');
  html = html.replace(/<script[^>]*wix\.com[^>]*>.*?<\/script>/gis, '');
  html = html.replace(/<script[^>]*wixstatic\.com[^>]*>.*?<\/script>/gis, '');
  
  // Remove Wix inline scripts
  html = html.replace(/<script>\s*window\.(viewerModel|commonConfig|initialTimestamps|thunderbolt|wixEmbedsAPI|wixBiSession|wixCodeIds|warmupData|wixDevelopersFeatures)[^<]*<\/script>/gis, '');
  
  // Remove Wix JSON configs
  html = html.replace(/<script[^>]*type="application\/json"[^>]*id="wix[^>]*>.*?<\/script>/gis, '');
  
  // Remove Wix CSS (both link and style)
  html = html.replace(/<link[^>]*href="https:\/\/static\.parastorage\.com[^"]*"[^>]*>/gi, '');
  html = html.replace(/<style[^>]*data-url="https:\/\/static\.parastorage\.com[^"]*"[^>]*>.*?<\/style>/gis, '');
  
  // Remove Wix-specific styles
  html = html.replace(/<style[^>]*>\s*\*[^<]*wix[^<]*<\/style>/gis, '');
  
  // Remove Wix banner (the "Created with Wix" bar)
  html = html.replace(/<div[^>]*id="WIX_ADS"[^>]*>.*?<\/div>/gis, '');
  html = html.replace(/<div[^>]*class="[^"]*wix-ads[^"]*"[^>]*>.*?<\/div>/gis, '');
  
  // Remove Wix-specific divs
  html = html.replace(/<div[^>]*id="SITE_CONTAINER"[^>]*>/gi, '<div id="site-container">');
  html = html.replace(/<div[^>]*id="site-root"[^>]*>/gi, '<div id="site-root">');
  
  // Remove Wix fonts (keep Google Fonts if any)
  html = html.replace(/<link[^>]*href="https:\/\/fonts\.wixstatic\.com[^"]*"[^>]*>/gi, '');
  
  // Remove Wix favicons
  html = html.replace(/<link[^>]*href="https:\/\/www\.wix\.com\/favicon[^"]*"[^>]*>/gi, '');
  
  // Remove Wix tracking
  html = html.replace(/<script[^>]*>_skip498[^<]*<\/script>/gis, '');
  html = html.replace(/<script[^>]*>if\s*\(\s*window\.performance[^<]*<\/script>/gis, '');
  
  // Remove empty style tags
  html = html.replace(/<style[^>]*>\s*<\/style>/gi, '');
  
  // Remove empty script tags
  html = html.replace(/<script[^>]*>\s*<\/script>/gi, '');
  
  // Clean up
  html = html.replace(/\n\s*\n\s*\n/g, '\n\n');
  html = html.replace(/>[ \t]+</g, '>\n<');
  
  return html;
}

const files = readdirSync(DIR).filter(f => f.endsWith('.html'));

for (const file of files) {
  const path = join(DIR, file);
  const html = readFileSync(path, 'utf8');
  const cleaned = cleanWixDeep(html);
  writeFileSync(path, cleaned, 'utf8');
  const reduction = ((html.length - cleaned.length) / 1024).toFixed(1);
  console.log(`✓ ${file}: ${(cleaned.length / 1024).toFixed(1)} KB (-${reduction} KB)`);
}

console.log(`\nDone! Cleaned ${files.length} files.`);
