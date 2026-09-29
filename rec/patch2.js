const fs=require('fs');let s=fs.readFileSync('record.js','utf8');
const a=s.indexOf("  for(const name of ['Virginia'"),b=s.indexOf(" async walk");
s=s.slice(0,a)+"  for(const [x,y] of [[620,470],[850,600],[1100,483]]){await p.mouse.move(x,y,{steps:35});await p.mouse.click(x,y);await p.waitForTimeout(2200);}},\n"+s.slice(b);
fs.writeFileSync('record.js',s);
