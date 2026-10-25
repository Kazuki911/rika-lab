// Pure quantitative models; units and assumptions are specified in each topic pack.
export const sat=t=>216.7*6.112*Math.exp(17.67*t/(t+243.5))/(t+273.15);
const m=(label,value,unit='')=>({label,value,unit});
export function compute(key,p){switch(key){
case'reflection':return[m('入射角',p.angle,'°'),m('反射角',p.angle,'°'),m('鏡面との角',90-p.angle,'°')];
case'refraction':{const s=p.n1/p.n2*Math.sin(p.angle*Math.PI/180);return[m('屈折角',s>1?null:Math.asin(s)*180/Math.PI,'°'),m('臨界角',p.n1>p.n2?Math.asin(p.n2/p.n1)*180/Math.PI:null,'°'),m('全反射',s>1?'起こる':'起こらない')];}
case'echo':return[m('反射面まで',p.speed*p.time/2,'m'),m('往復距離',p.speed*p.time,'m'),m('往復時間',p.time,'s')];
case'balance':return[m('右向きの合力',p.right-p.left,'N'),m('合力の大きさ',Math.abs(p.right-p.left),'N'),m('向き',p.right===p.left?'つり合い':p.right>p.left?'右':'左')];
case'ohm':return[m('電流',p.voltage/p.resistance,'A'),m('電力',p.voltage**2/p.resistance,'W'),m('抵抗',p.resistance,'Ω')];
case'electricHeat':return[m('温度上昇',p.power*p.time/(4.2*p.mass),'℃'),m('発生する熱量',p.power*p.time,'J'),m('水の質量',p.mass,'g')];
case'charge':return[m('力の大きさ',Math.abs(p.q1*p.q2/p.distance**2),'相対値'),m('符号付きの力',p.q1*p.q2/p.distance**2,'相対値'),m('働き',p.q1*p.q2===0?'力なし':p.q1*p.q2>0?'反発':'引力')];
case'coil':return[m('磁界の強さ',Math.abs(p.current*p.turns),'相対指標'),m('向き',p.current===0?'電流なし':p.current>0?'基準方向':'逆方向'),m('巻き数',p.turns,'回')];
case'motor':return[m('力（符号付き）',p.current*p.field*p.length,'N'),m('力の大きさ',Math.abs(p.current*p.field*p.length),'N'),m('向き',p.current*p.field===0?'力なし':p.current*p.field>0?'基準方向':'逆方向')];
case'ac':return[m('周期',1000/p.frequency,'ms'),m('最大電圧',p.amplitude,'V'),m('1秒間の周期数',p.frequency,'回')];
case'vectors':return[m('合力',Math.sqrt(Math.max(0,p.a**2+p.b**2+2*p.a*p.b*Math.cos(p.angle*Math.PI/180))),'N'),m('横成分',p.a+p.b*Math.cos(p.angle*Math.PI/180),'N'),m('縦成分',p.b*Math.sin(p.angle*Math.PI/180),'N')];
case'motion':return[m('位置',p.v0*p.time+.5*p.acceleration*p.time**2,'m'),m('速さ',p.v0+p.acceleration*p.time,'m/s'),m('加速度',p.acceleration,'m/s²')];
case'work':return[m('仕事',p.force*p.distance,'J'),m('仕事率',p.force*p.distance/p.time,'W'),m('時間',p.time,'s')];
case'energy':{let e=p.mass*9.8*p.height;return[m('運動エネルギー',e*p.fraction/100,'J'),m('位置エネルギー',e*(1-p.fraction/100),'J'),m('速さ',Math.sqrt(2*9.8*p.height*p.fraction/100),'m/s')];}
case'mixHeat':return[m('混合温度',p.hot*p.ratio/100+p.cold*(1-p.ratio/100),'℃'),m('高温側の割合',p.ratio,'%'),m('低温側の割合',100-p.ratio,'%')];
case'efficiency':return[m('有用な出力',p.input*p.efficiency/100,'J'),m('その他の出力',p.input*(1-p.efficiency/100),'J'),m('入力',p.input,'J')];
case'recycle':return[m('再生量',p.mass*p.collect*p.yield/10000,'kg'),m('回収量',p.mass*p.collect/100,'kg'),m('全体の再生率',p.collect*p.yield/100,'%')];
case'decay':return[m('残存割合',100*2**(-p.time/p.halflife),'%'),m('経過した半減期',p.time/p.halflife,'回'),m('変化した割合',100*(1-2**(-p.time/p.halflife)),'%')];
default:throw new Error('未定義のモデル: '+key);
}}
export function modelSeries(model,p){if(model.key==='ac'){return {xLabel:'時間 (ms)',yLabel:'電圧 (V)',points:Array.from({length:121},(_,i)=>[i/120*100,p.amplitude*Math.sin(2*Math.PI*p.frequency*i/120*.1)])};}let [key,label,lo,hi]=model.controls[0];const first=compute(model.key,p)[0];return{xLabel:label+' ('+model.controls[0][6]+')',yLabel:first.label+' ('+first.unit+')',points:Array.from({length:61},(_,i)=>{let x=lo+(hi-lo)*i/60;let result=compute(model.key,{...p,[key]:x})[0].value;return[x,typeof result==='number'&&Number.isFinite(result)?result:null]})};}
