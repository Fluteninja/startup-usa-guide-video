const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
 const base='https://fluteninja.github.io/startup-usa-guide/';
 for(const u of ['ecosystem-map.html','incubators.html?view=map','state-schemes.html?view=map','walkable-map.html']){
  await p.goto(base+u,{waitUntil:'networkidle'});await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>({sb:getComputedStyle(document.querySelector('.sidebar')||document.body).position,w:document.querySelector('main')?.getBoundingClientRect().width,paths:document.querySelectorAll('svg path').length,cls:[...new Set([...document.querySelectorAll('svg path')].slice(0,60).map(e=>e.getAttribute('class')))].slice(0,5),canvas:document.querySelectorAll('canvas').length}));
  console.log(u,JSON.stringify(r));
  await p.screenshot({path:u.split('.')[0]+'.png'});
 }
 await b.close();})();
