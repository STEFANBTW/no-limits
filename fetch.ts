import fs from "fs";

async function fetchSite() {
  try {
    const res = await fetch("https://www.nolimitsfurniture.com.ng");
    const html = await res.text();
    fs.writeFileSync("nolimits.html", html);
    console.log("Saved to nolimits.html");
  } catch (e) {
    console.error(e);
  }
}

fetchSite();
