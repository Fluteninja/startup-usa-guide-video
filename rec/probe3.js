const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
 await p.goto('https://fluteninja.github.io/startup-usa-guide/walkable-map.html',{waitUntil:'networkidle'});await p.waitForTimeout(2000);
 await p.click('button[aria-label*="lose"]',{timeout:2000}).catch(()=>{});
 await p.mouse.move(1826,986);await p.mouse.down();await p.waitForTimeout(4000);await p.mouse.up();
 await p.screenshot({path:'walk3.png'});
 await b.close();})();
