const {chromium}=require('playwright');
(async()=>{
 for(const headless of [true,false]){
 const b=await chromium.launch({headless,args:['--use-gl=angle','--enable-unsafe-swiftshader']});const p=await b.newPage({viewport:{width:1920,height:1080}});
 await p.goto('https://fluteninja.github.io/startup-usa-guide/walkable-map.html',{waitUntil:'networkidle'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{window.__k=[];addEventListener('keydown',e=>window.__k.push(e.key),true)});
 await p.keyboard.down('d');await p.waitForTimeout(4000);await p.keyboard.up('d');
 console.log(headless,await p.evaluate(()=>window.__k.length),await p.evaluate(()=>document.querySelector('.minimap,[class*=minimap]')?.outerHTML.length));
 await p.screenshot({path:'k_'+headless+'.png'});await b.close();}
})();
