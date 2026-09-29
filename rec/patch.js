const fs=require('fs');let s=fs.readFileSync('record.js','utf8');
const a=s.indexOf(' async schemes'),b=s.indexOf('};\n(async');
const nw=` async schemes(p){await p.goto(base+'state-schemes.html?view=map',{waitUntil:'networkidle'});await p.waitForTimeout(1800);
  await p.mouse.move(700,400,{steps:20});
  for(let i=0;i<5;i++){await p.mouse.wheel(0,60);await p.waitForTimeout(80);}
  await p.waitForTimeout(800);
  const bb=await p.evaluate(()=>{let best=null,n=0;document.querySelectorAll('main svg').forEach(s=>{const c=s.querySelectorAll('path').length;if(c>n){n=c;best=s}});const r=best.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}});
  await p.mouse.move(bb.x+bb.w*.5,bb.y+bb.h*.4,{steps:30});await p.waitForTimeout(500);
  for(const name of ['Virginia','Massachusetts','Colorado']){const el=p.getByText(name,{exact:true}).first();const r=await el.boundingBox();
   await p.mouse.move(r.x+r.width/2,r.y+r.height/2,{steps:35});await p.mouse.click(r.x+r.width/2,r.y+r.height/2);await p.waitForTimeout(2000);}},
 async walk(p){await p.goto(base+'walkable-map.html',{waitUntil:'networkidle'});await p.waitForTimeout(2500);
  await p.mouse.move(409,100,{steps:15});await p.mouse.click(409,100);await p.waitForTimeout(800);
  const hold=async(k,ms)=>{await p.keyboard.down(k);await p.waitForTimeout(ms);await p.keyboard.up(k)};
  await hold('d',3000);await hold('w',2500);await hold('a',2500);
  await p.mouse.move(1783,349,{steps:20});await p.mouse.click(1783,349);await p.waitForTimeout(1500);
  await hold('s',2000);}
`;
s=s.slice(0,a)+nw+s.slice(b);
s=s.replace("for(const [n,f] of Object.entries(scenes)){","for(const [n,f] of Object.entries(scenes)){if(process.env.ONLY&&!process.env.ONLY.split(',').includes(n))continue;");
fs.writeFileSync('record.js',s);
