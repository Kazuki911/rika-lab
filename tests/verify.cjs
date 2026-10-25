// Dependency-free checks of physical relationships and all canvas models.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const noop = () => {};
const drawing = new Proxy({}, {get: (_, key) => (...args) => {
  for (const arg of args) if (typeof arg === 'number') assert(Number.isFinite(arg), `Non-finite canvas argument: ${String(key)}`);
}, set: () => true});
const elements = new Map();
const element = key => {
  if (!elements.has(key)) elements.set(key, {value: key === '#speed' ? '1' : '', innerHTML: '', textContent: '', classList: {add:noop,remove:noop,toggle:noop}, addEventListener:noop, querySelectorAll:()=>[], getContext:()=>drawing});
  return elements.get(key);
};
const sandbox = {console, Math, Number, JSON, Object, String, Array, setTimeout, clearTimeout, location:{hash:''}, document:{querySelector:element,querySelectorAll:()=>[],hidden:false}, window:{devicePixelRatio:1,addEventListener:noop,scrollTo:noop}, localStorage:{getItem:()=>null,setItem:noop}, requestAnimationFrame:noop};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('assets/app.js','utf8'),sandbox);
function run(code){return vm.runInContext(code,sandbox);}
function metric(id,p,n=0){sandbox.input=p;return Number(run(`values('${id}',input)[${n}][1]`));}
assert.equal(run('lessons.length'),10);
assert.equal(metric('pendulum',{length:1,angle:10,mass:50}),metric('pendulum',{length:1,angle:10,mass:300}));
assert.equal(metric('spring',{mass:100,gravity:9.8,k:10},1),9.8);
assert.equal(metric('circuit',{mode:'series',voltage:6,r1:10,r2:20}),.2);
assert.equal(metric('circuit',{mode:'parallel',voltage:6,r1:10,r2:20}),.9);
assert.equal(metric('lens',{focal:70,distance:140,height:25},1),1);
assert.equal(metric('lens',{focal:70,distance:35,height:25},1),2);
assert.equal(metric('sound',{frequency:340,velocity:340}),340);
assert.equal(metric('sound',{frequency:340,velocity:340},1),1);
assert.equal(metric('buoyancy',{depth:0,volume:500,density:1000}),metric('buoyancy',{depth:1.5,volume:500,density:1000}));
assert.equal(metric('particles',{amount:40,temperature:20,volume:1}),2);
assert.equal(metric('photosynthesis',{light:0,co2:400,temperature:25},2),-10);
assert.equal(metric('humidity',{temperature:0,water:12}),100);
assert.equal(metric('moon',{day:0},1),0);
assert.equal(metric('moon',{day:14.75},1),100);
const count=run(`(() => {let cases=0;for(const l of lessons){current=l;let base=Object.fromEntries(l.controls.map(c=>[c.key,c.value]));for(const c of l.controls){for(const value of (c.options?c.options.map(o=>o[0]):[c.min,c.value,c.max])){params={...base,[c.key]:value};draw();cases++;}}}current=lessons.find(l=>l.id==='lens');params={focal:70,distance:70,height:25};draw();return cases+1;})()`);
console.log(`PASS: 10 lessons, 15 scientific assertions, ${count} canvas boundary cases`);
