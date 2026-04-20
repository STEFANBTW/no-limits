import fs from "fs";

async function fetchCSS() {
  try {
    const res1 = await fetch("https://www.nolimitsfurniture.com.ng/_next/static/css/39a00187c724f7f9.css");
    const css1 = await res1.text();
    fs.writeFileSync("css1.css", css1);
    
    const res2 = await fetch("https://www.nolimitsfurniture.com.ng/_next/static/css/9244ccf7a956be65.css");
    const css2 = await res2.text();
    fs.writeFileSync("css2.css", css2);
    
    console.log("Saved CSS");
  } catch (e) {
    console.error(e);
  }
}

fetchCSS();
