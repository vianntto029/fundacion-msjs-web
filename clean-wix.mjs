import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DIR = 'H:/DESARROLLO Y PROGRAMACION VIANNTTO/ANTIGRAVITY PROJECTS/PROYECTOS WEB/SITIO WEB FUNDACION';

function cleanWix(html) {
  // Remove Wix banner
  html = html.replace(/<div[^>]*id="SITE_CONTAINER"[^>]*>/gi, '<div id="site-container">');
  
  // Remove Wix meta tags
  html = html.replace(/<meta[^>]*content="Wix\.com Website Builder"[^>]*>/gi, '');
  html = html.replace(/<meta[^>]*id="wixDesktopViewport"[^>]*>/gi, '');
  
  // Remove Wix favicons
  html = html.replace(/<link[^>]*href="https:\/\/www\.wix\.com\/favicon\.ico"[^>]*>/gi, '');
  
  // Remove Wix-specific scripts (thunderbolt, parastorage)
  html = html.replace(/<script[^>]*src="https:\/\/static\.parastorage\.com[^"]*"[^>]*><\/script>/gi, '');
  html = html.replace(/<script[^>]*data-url="https:\/\/static\.parastorage\.com[^"]*"[^>]*>.*?<\/script>/gis, '');
  
  // Remove Wix inline scripts
  html = html.replace(/<script>window\.viewerModel\s*=\s*JSON\.parse.*?<\/script>/gis, '');
  html = html.replace(/<script>window\.commonConfig\s*=.*?<\/script>/gis, '');
  html = html.replace(/<script>window\.initialTimestamps\s*=.*?<\/script>/gis, '');
  html = html.replace(/<script>window\.thunderboltTag\s*=.*?<\/script>/gis, '');
  html = html.replace(/<script>window\.thunderboltVersion\s*=.*?<\/script>/gis, '');
  
  // Remove Wix JSON config
  html = html.replace(/<script[^>]*type="application\/json"[^>]*id="wix-essential-viewer-model"[^>]*>.*?<\/script>/gis, '');
  
  // Remove Wix polyfills
  html = html.replace(/<script[^>]*nomodule=""[^>]*src="https:\/\/static\.parastorage\.com[^"]*"[^>]*><\/script>/gi, '');
  
  // Remove Wix CSS links
  html = html.replace(/<link[^>]*href="https:\/\/static\.parastorage\.com[^"]*\.css[^"]*"[^>]*>/gi, '');
  html = html.replace(/<link[^>]*href="https:\/\/fonts\.wixstatic\.com[^"]*"[^>]* rel="stylesheet"[^>]*>/gi, '');
  
  // Remove Wix image references (keep local ones)
  html = html.replace(/https:\/\/static\.wixstatic\.com\/media\//gi, '/media/');
  
  // Remove Wix tracking pixels
  html = html.replace(/<img[^>]*height="1"[^>]*width="1"[^>]*style="display:none"[^>]*>/gi, '');
  
  // Remove empty script tags
  html = html.replace(/<script[^>]*>\s*<\/script>/gi, '');
  
  // Remove Wix-specific classes from body
  html = html.replace(/<body([^>]*)>/gi, '<body$1>');
  
  // Clean up multiple empty lines
  html = html.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return html;
}

const files = readdirSync(DIR).filter(f => f.endsWith('.html'));

for (const file of files) {
  const path = join(DIR, file);
  const html = readFileSync(path, 'utf8');
  const cleaned = cleanWix(html);
  writeFileSync(path, cleaned, 'utf8');
  console.log(`✓ Cleaned ${file} (${((html.length - cleaned.length) / 1024).toFixed(1)} KB removed)`);
}

console.log(`\nDone! Cleaned ${files.length} files.`);
