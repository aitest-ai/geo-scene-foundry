// Deterministic CPU-side reference for other agents/rendering engines.
// No DOM, WebGL, physics, network or writes to existing world geometry.
const fract=x=>x-Math.floor(x);
const h=x=>fract(Math.sin(x*127.1+78.233)*43758.5453);
const sm=(a,b,x)=>{let t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
export function seasonalParticleState(index,time,season,wind,intensity=0.65){
 if(!Number.isInteger(index)||index<0||!Number.isFinite(time)||!Number.isFinite(season)||!Number.isFinite(wind)||!Number.isFinite(intensity))throw new TypeError('Invalid particle input');
 const id=index,a=h(id*3.37+1),b=h(id*7.19+2),c=h(id*11.73+4);
 const spring=1-sm(.08,.92,season);
 const autumn=sm(1.28,1.9,season)*(1-sm(2.08,2.7,season));
 const winter=sm(2.28,2.97,season);
 const kind=winter>Math.max(spring,autumn)?'snow':autumn>spring?'leaf':'petal';
 const alpha=Math.max(0,Math.min(1,(spring*.48+autumn*.85+winter)*Math.max(0,Math.min(1,intensity))));
 const speed=.45+(.55*c);const fallRate=(.56+speed*.78)*winter+speed*(1-winter);
 const life=fract(b+time*fallRate/19),y=15.8-life*16.1;
 const dx=time*(.12+.29*wind)+1.25*Math.sin(time*.56+b*6.283+id)*Math.sin(time*.14+c*6.283);
 const xf=((((a-.5)*51+dx+27)%54)+54)%54-27;
 const z=-24+39*h(id*9.61+7);
 const visible=alpha*sm(0,1.7,y)*(1-sm(14.3,15.8,y));
 return {x:xf,y,z,kind,opacity:Math.max(0,Math.min(1,visible)),seed:c};
}
