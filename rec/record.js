const {chromium}=require('playwright');
const base='https://fluteninja.github.io/startup-usa-guide/';
const cursor=`(()=>{const d=document.createElement('div');d.style.cssText='position:fixed;left:0;top:0;width:22px;height:22px;border-radius:50%;background:rgba(220,38,38,.55);border:2px solid #fff;box-shadow:0 0 8px #0006;pointer-events:none;z-index:2147483647;transform:translate(-50%,-50%);transition:none';
addEventListener('DOMContentLoaded',()=>document.body.appendChild(d));addEventListener('mousemove',e=>{d.style.left=e.clientX+'px';d.style.top=e.clientY+'px'},true);})()`;
const scenes={
 async hub(p){await p.goto(base+'ecosystem-map.html',{waitUntil:'networkidle'});await p.waitForTimeout(1500);
  await p.mouse.move(400,600,{steps:20});
  for(const x of [430,950,1470]){await p.mouse.move(x,900,{steps:30});await p.waitForTimeout(900);}
  await p.mouse.wheel(0,350);await p.waitForTimeout(1500);},
 async inc(p){await p.goto(base+'incubators.html?view=map',{waitUntil:'networkidle'});await p.waitForTimeout(1800);
  await p.mouse.move(800,450,{steps:20});await p.waitForTimeout(800);
  for(let i=0;i<6;i++){await p.mouse.wheel(0,60);await p.waitForTimeout(80);}
  await p.waitForTimeout(600);
  const bb=await p.evaluate(()=>{let best=null,n=0;document.querySelectorAll('main svg').forEach(s=>{const c=s.querySelectorAll('path').length;if(c>n){n=c;best=s}});const r=best.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}});
  for(const [rx,ry] of [[.09,.5],[.42,.75],[.83,.26]]){await p.mouse.move(bb.x+bb.w*rx,bb.y+bb.h*ry,{steps:35});await p.mouse.click(bb.x+bb.w*rx,bb.y+bb.h*ry);await p.waitForTimeout(1600);}},
 async schemes(p){await p.goto(base+'state-schemes.html?view=map',{waitUntil:'networkidle'});await p.waitForTimeout(1800);
  await p.mouse.move(700,400,{steps:20});
  for(let i=0;i<5;i++){await p.mouse.wheel(0,60);await p.waitForTimeout(80);}
  await p.waitForTimeout(800);
  const bb=await p.evaluate(()=>{let best=null,n=0;document.querySelectorAll('main svg').forEach(s=>{const c=s.querySelectorAll('path').length;if(c>n){n=c;best=s}});const r=best.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}});
  await p.mouse.move(bb.x+bb.w*.5,bb.y+bb.h*.4,{steps:30});await p.waitForTimeout(500);
  for(const [x,y] of [[620,470],[850,600],[1100,483]]){await p.mouse.move(x,y,{steps:35});await p.mouse.click(x,y);await p.waitForTimeout(2200);}},
 async walk(p){await p.goto(base+'walkable-map.html',{waitUntil:'networkidle'});await p.waitForTimeout(2500);
  await p.mouse.move(409,100,{steps:15});await p.mouse.click(409,100);await p.waitForTimeout(800);
  const hold=async(k,ms)=>{await p.keyboard.down(k);await p.waitForTimeout(ms);await p.keyboard.up(k)};
  await hold('d',3000);await hold('w',2500);await hold('a',2500);
  await p.mouse.move(1783,349,{steps:20});await p.mouse.click(1783,349);await p.waitForTimeout(1500);
  await hold('s',2000);}
};
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--enable-unsafe-swiftshader']});
 for(const [n,f] of Object.entries(scenes)){if(process.env.ONLY&&!process.env.ONLY.split(',').includes(n))continue;
  const c=await b.newContext({viewport:{width:1920,height:1080},recordVideo:{dir:'.',size:{width:1920,height:1080}}});
  await c.addInitScript(cursor);const p=await c.newPage();const v=p.video();
  await f(p).catch(e=>console.log(n,'ERR',e.message));
  await p.screenshot({path:'end_'+n+'.png'});await c.close();
  require('fs').renameSync(await v.path(),n+'.webm');console.log('done',n);}
 await b.close();})();
