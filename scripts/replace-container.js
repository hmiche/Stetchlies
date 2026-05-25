const fs = require('fs');
const path = require('path');

const NEW_CLASSES = 'w-full max-w-[1280px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

function replaceInFile(filePath) {
  if (!filePath.endsWith('.tsx')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace 'container mx-auto' with NEW_CLASSES
  // But make sure we don't duplicate mx-auto
  const regex1 = /\bcontainer\s+mx-auto\b/g;
  const regex2 = /\bcontainer\b/g;
  
  let newContent = content.replace(regex1, NEW_CLASSES);
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Updated:', filePath);
  } else {
    // Sometimes it's just 'container'
    newContent = content.replace(regex2, NEW_CLASSES);
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated:', filePath);
    }
  }
}

walkDir(path.join(__dirname, '../app'), replaceInFile);
walkDir(path.join(__dirname, '../components'), replaceInFile);

console.log('Done replacing container classes!');
