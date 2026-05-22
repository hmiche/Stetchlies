const fs = require('fs');

function findCarrotTag() {
  const html = fs.readFileSync('workspace_page.html', 'utf8');
  const index = html.indexOf('bg-ami-carrot');
  if (index !== -1) {
    console.log("HTML snippet containing bg-ami-carrot:");
    console.log(html.substring(index - 300, index + 400));
  } else {
    console.log("Not found");
  }
}

findCarrotTag();
