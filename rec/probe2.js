const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
 const base='https://fluteninja.github.io/startup-usa-guide/';
 await p.goto(base+'state-schemes.html?view=map',{waitUntil:'networkidle'});
 console.log(await p.evaluate(()=>[...document.querySelectorAll('main svg path')].slice(0,3).map(e=>e.outerHTML.slice(0,200))));
 await p.goto(base+'walkable-map.html',{waitUntil:'networkidle'});await p.waitForTimeout(2000);
 const shot=async n=>p.screenshot({path:n});
 await p.mouse.click(960,500);
 await p.keyboard.down('w');await p.waitForTimeout(3000);await p.keyboard.up('w');
 await shot('walk1.png');
 await p.keyboard.down('ArrowUp');await p.waitForTimeout(3000);await p.keyboard.up('ArrowUp');
 await shot('walk2.png');
 await b.close();})();
