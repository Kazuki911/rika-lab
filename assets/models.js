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
case'density':return[m('密度',p.mass/p.volume,'g/cm³'),m('水との比較',p.mass/p.volume>1?'大きい':p.mass/p.volume<1?'小さい':'等しい'),m('質量',p.mass,'g')];
case'concentration':return[m('質量パーセント濃度',p.solute/(p.solute+p.water)*100,'%'),m('溶液の質量',p.solute+p.water,'g'),m('溶質の質量',p.solute,'g')];
case'molecules':return[m('水素原子',p.molecules*2,'個'),m('酸素原子',p.molecules,'個'),m('原子の合計',p.molecules*3,'個')];
case'reaction':{let n=Math.min(Math.floor(p.hydrogen/2),p.oxygen);return[m('できる水分子',n*2,'個'),m('余る水素分子',p.hydrogen-2*n,'個'),m('余る酸素分子',p.oxygen-n,'個')];}
case'copper':return[m('試料の質量',p.copper*(1+p.percent/400),'g'),m('取り込んだ酸素',p.copper*p.percent/400,'g'),m('未反応の銅',p.copper*(1-p.percent/100),'g')];
case'massBalance':return[m('容器内の質量',p.before-p.gas*p.escape/100,'g'),m('外へ出た質量',p.gas*p.escape/100,'g'),m('合わせた全体',p.before,'g')];
case'ion':return[m('電荷（陽子1個を+1）',p.protons-p.electrons,''),m('状態',p.protons===p.electrons?'中性':p.protons>p.electrons?'陽イオン':'陰イオン'),m('陽子数',p.protons,'個')];
case'ph':return[m('H⁺の濃度指数',-p.ph,'10の指数'),m('H⁺の濃度',(10**(-p.ph)).toExponential(2),'mol/L'),m('性質',p.ph===7?'中性':p.ph<7?'酸性':'アルカリ性')];
case'neutral':return[m('反応した組の量',Math.min(p.acid,p.base),'相対単位'),m('余ったH⁺',Math.max(0,p.acid-p.base),'相対単位'),m('余ったOH⁻',Math.max(0,p.base-p.acid),'相対単位')];
case'microscope':return[m('総合倍率',p.objective*p.eyepiece,'倍'),m('視野直径',18/p.objective,'mm'),m('対物倍率',p.objective,'倍')];
case'transpiration':return[m('蒸散量',p.area*p.rate*p.hours,'g'),m('1時間の量',p.area*p.rate,'g/h'),m('面積あたり',p.rate*p.hours,'g/cm²')];
case'cardiac':return[m('1分の拍出量',p.rate*p.stroke/1000,'L/分'),m('1時間の延べ量',p.rate*p.stroke*60/1000,'L'),m('心拍数',p.rate,'回/分')];
case'division':return[m('細胞数',p.initial*2**p.rounds,'個'),m('増加倍率',2**p.rounds,'倍'),m('増えた細胞数',p.initial*(2**p.rounds-1),'個')];
case'inherit':{let a=p.a/100,b=p.b/100;return[m('顕性形質の割合',(1-(1-a)*(1-b))*100,'%'),m('AAの割合',a*b*100,'%'),m('aaの割合',(1-a)*(1-b)*100,'%')];}
case'quake':return[m('初期微動継続時間',p.distance/p.s-p.distance/p.p,'s'),m('P波到着',p.distance/p.p,'s'),m('S波到着',p.distance/p.s,'s')];
case'pressure':return[m('片面に働く力',p.pressure*p.area*.01,'N'),m('圧力',p.pressure*100,'Pa'),m('面積',p.area/10000,'m²')];
case'dew':{let water=sat(p.temp)*p.rh/100;return[m('凝結量',Math.max(0,water-sat(p.cool)),'g/m³'),m('初期水蒸気量',water,'g/m³'),m('冷却後の湿度',Math.min(100,water/sat(p.cool)*100),'%')];}
case'rotation':return[m('回転角',15*p.hours,'°'),m('回転した割合',p.hours/24*100,'%'),m('経過時間',p.hours,'h')];
case'sunheight':return[m('南中高度',90-p.latitude+p.declination,'°'),m('天頂からの角度',p.latitude-p.declination,'°'),m('赤緯',p.declination,'°')];
case'phase':return[m('照らされた割合',(1+Math.cos(p.angle*Math.PI/180))*50,'%'),m('暗い側の割合',(1-Math.cos(p.angle*Math.PI/180))*50,'%'),m('位相角',p.angle,'°')];
case'lighttime':return[m('光行時間',p.distance*499/60,'分'),m('光行時間（秒）',p.distance*499,'s'),m('距離',p.distance*149597870.7,'km')];
case'food-energy':return[m('到達エネルギー',p.input*(p.transfer/100)**p.levels,'kJ'),m('出発量に対する割合',100*(p.transfer/100)**p.levels,'%'),m('段階数',p.levels,'段階')];
case'quadrat':return[m('推定個体数',p.count/p.sample*p.total,'個体'),m('観察密度',p.count/p.sample,'個体/m²'),m('調査面積の割合',p.sample/p.total*100,'%')];
case'measurement':return[m('相対的な幅',p.width/p.value*100,'%'),m('下限',p.value-p.width,'mm'),m('上限',p.value+p.width,'mm')];
case'linear':return[m('縦軸y',p.slope*p.x+p.intercept,''),m('傾き',p.slope,''),m('切片',p.intercept,'')];
case'networks':return[m('直列の全電流',p.voltage/(p.r1+p.r2),'A'),m('並列の全電流',p.voltage*(1/p.r1+1/p.r2),'A'),m('並列の合成抵抗',p.r1*p.r2/(p.r1+p.r2),'Ω')];
case'hydrostatic':return[m('圧力の増分',p.density*9.8*p.depth,'Pa'),m('面に働く力の増分',p.density*9.8*p.depth*p.area/10000,'N'),m('深さ',p.depth,'m')];
case'crystal':return[m('析出する量',p.water*(p.hot-p.cold)/100,'g'),m('母液に残る溶質',p.water*p.cold/100,'g'),m('回収率',(p.hot-p.cold)/p.hot*100,'%')];
case'electrolysis':return[m('水素分子',p.water,'個'),m('酸素分子',p.water/2,'個'),m('水素原子の合計',p.water*2,'個')];
case'battery-life':return[m('使用時間',p.energy*p.efficiency/100/p.power,'h'),m('利用可能電力量',p.energy*p.efficiency/100,'Wh'),m('変換前エネルギー',p.energy*3600,'J')];
case'lever':return[m('必要な力',p.load*p.loadArm/p.effortArm,'N'),m('荷重側の力のモーメント',p.load*p.loadArm,'N·m'),m('力点側/作用点側の腕',p.effortArm/p.loadArm,'倍')];
case'stock':return[m('貯蔵量',200+(p.input-p.output)*p.years,'単位'),m('年間の変化',p.input-p.output,'単位/年'),m('初期からの変化',(p.input-p.output)*p.years,'単位')];
case'sampling':return[m('割合の標準偏差',Math.sqrt((p.prob/100)*(1-p.prob/100)/p.n)*100,'ポイント'),m('期待該当数',p.n*p.prob/100,'個'),m('標本数',p.n,'個')];
default:throw new Error('未定義のモデル: '+key);
}}
export function modelSeries(model,p){if(model.key==='ac'){return {xLabel:'時間 (ms)',yLabel:'電圧 (V)',points:Array.from({length:121},(_,i)=>[i/120*100,p.amplitude*Math.sin(2*Math.PI*p.frequency*i/120*.1)])};}let [key,label,lo,hi,step]=model.controls[0];const first=compute(model.key,p)[0];return{xLabel:label+' ('+model.controls[0][6]+')',yLabel:first.label+' ('+first.unit+')',points:Array.from({length:61},(_,i)=>{let x=Math.min(hi,lo+Math.round((hi-lo)*i/60/step)*step);let result=compute(model.key,{...p,[key]:x})[0].value;return[x,typeof result==='number'&&Number.isFinite(result)?result:null]})};}
