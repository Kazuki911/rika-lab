import fs from 'node:fs';
import assert from 'node:assert/strict';
import {compute,modelSeries} from '../assets/models.js';
const catalog=JSON.parse(fs.readFileSync('data/catalog.json'));
assert.equal(new Set(catalog.entries.map(e=>e.id)).size,catalog.entries.length);
assert.equal(catalog.entries.length,10+catalog.topics*5);
let models=0,variants=0;
for(const field of ['physics','chemistry','biology','earth','skills']){
 const topics=JSON.parse(fs.readFileSync(`data/${field}.json`));
 for(const t of Object.values(topics)){
  assert.equal(t.pairs.length,6,t.id+' six matches');
  assert.equal(new Set(t.pairs.map(x=>x[1])).size,6,t.id+' unique match answers');
  for(const list of [t.quiz,t.data.questions]){assert.equal(list.length,3,t.id);for(const q of list){assert.equal(q.options.length,3);assert.equal(new Set(q.options).size,3);assert(q.options[q.correct]);assert(q.explanation.length>5);}}
  assert(t.data.rows.length>=3);assert(t.data.note.length>5);assert.equal(t.inquiry.length,3);
  assert(catalog.units[t.unit]);
  if(t.model.kind==='calc'){
   models++;const base=Object.fromEntries(t.model.controls.map(c=>[c[0],c[5]]));
   let inputs=[base];for(const c of t.model.controls)for(const v of [c[2],c[3]])inputs.push({...base,[c[0]]:v});
   for(const p of inputs){for(const r of compute(t.model.key,p)){assert(r.value===null||typeof r.value==='string'||Number.isFinite(r.value),t.id+' finite output');}const s=modelSeries(t.model,p);assert(s.points.length>=60);for(const [x,y]of s.points){assert(Number.isFinite(x));assert(y===null||Number.isFinite(y),t.id+' graph');}variants++;}
  }else{assert.equal(t.model.kind,'flow');assert(t.model.steps.length>=4);}
 }
}
assert.equal(compute('ohm',{voltage:6,resistance:20})[0].value,.3);
assert.equal(compute('reflection',{angle:35})[1].value,35);
assert.equal(compute('refraction',{angle:60,n1:1.5,n2:1})[0].value,null);
assert.equal(compute('echo',{speed:340,time:1})[0].value,170);
assert.equal(compute('charge',{q1:1,q2:1,distance:2})[0].value,.25);
assert.equal(compute('balance',{right:5,left:5})[0].value,0);
assert.equal(compute('ac',{frequency:50,amplitude:6})[0].value,20);
console.log(`PASS: ${catalog.entries.length} activities; ${catalog.topics} packs; ${models} quantitative models; ${variants} parameter cases; answer integrity and scientific checks.`);
for(const e of catalog.entries){assert(catalog.units[e.unit]);if(!e.legacy){const t=JSON.parse(fs.readFileSync(`data/${e.field}.json`))[e.topicId];assert(t,`missing ${e.id}`);assert.equal(t.unit,e.unit);assert.equal(t.grade,e.grade);assert(e.id===`${t.id}-${e.type}`);}}
if(catalog.topics>=60)for(const id of Object.keys(catalog.units))assert(catalog.entries.some(e=>e.unit===id),`empty unit ${id}`);
const near=(actual,expected)=>assert(Math.abs(actual-expected)<1e-8,`${actual} vs ${expected}`);
near(compute('concentration',{solute:10,water:90})[0].value,10);
assert.deepEqual(compute('reaction',{hydrogen:7,oxygen:2}).map(x=>x.value),[4,3,0]);
near(compute('neutral',{acid:4,base:6})[2].value,2);
near(compute('inherit',{a:50,b:50})[0].value,75);
near(compute('quake',{distance:90,p:6,s:3})[0].value,15);
near(compute('sunheight',{latitude:35,declination:23.4})[0].value,78.4);
near(compute('phase',{angle:90})[0].value,50);
near(compute('networks',{r1:10,r2:20,voltage:6})[1].value,.9);
near(compute('hydrostatic',{depth:1,density:1000,area:10})[1].value,9.8);
near(compute('crystal',{water:100,hot:90,cold:30})[0].value,60);
near(compute('lever',{effortArm:.5,loadArm:.2,load:50})[0].value,20);
near(compute('sampling',{n:400,prob:50})[0].value,2.5);
const reactionModel=JSON.parse(fs.readFileSync('data/chemistry.json')).reactions.model;
for(const [x,y] of modelSeries(reactionModel,{hydrogen:10,oxygen:4}).points){assert(Number.isInteger(x));assert(Number.isInteger(y));}
console.log('PASS: catalog references, all curriculum units, 12 cross-domain reference values, discrete particle graph.');
