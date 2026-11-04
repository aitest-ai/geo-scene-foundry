// Deterministic visual contact reference, not a physical fluid engine.
const fract=x=>x-Math.floor(x);
const hash=x=>fract(Math.sin(x*127.1+78.233)*43758.5453);
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
const wrap=(x,w)=>((x%w)+w)%w;
export const shorelineAt=x=>-29+1.35*Math.sin(x*.14)+.7*Math.sin(x*.49);
export function predictContacts({time,season,wind,intensity=.65,enabled=true}={}){
 for(const x of [time,season,wind,intensity])if(!Number.isFinite(x))throw RangeError("finite inputs required");
 if(!enabled||intensity<=0)return[];
 const spring=1-smooth(.08,.92,season),autumn=smooth(1.28,1.9,season)*(1-smooth(2.08,2.7,season)),winter=smooth(2.28,2.97,season);
 const strength=(spring*.45+autumn*.95+winter*.20)*Math.min(1,Math.max(0,intensity));
 if(strength<.025)return[];
 const events=[];
 for(let j=0;j<12;j++){
  const id=j*27+3,a=hash(id*3.37+1),b=hash(id*7.19+2),c=hash(id*11.73+4);
  const s0=.45+.55*c,speed=s0+((.56+s0*.78)-s0)*winter,ph=15.8/16.1;
  const cycle=Math.floor(b+time*speed/19-ph),when=(cycle+ph-b)*19/speed,age=time-when;
  if(age<0||age>2.25)continue;
  const drift=when*(.12+.29*wind)+1.25*Math.sin(when*.56+b*6.283+id)*Math.sin(when*.14+c*6.283);
  const x=wrap((a-.5)*51+drift+27,54)-27+(.25+.35*autumn)*Math.sin(when*2.9+id*2);
  const z=-38+55*hash(id*9.61+7);
  if(z<shorelineAt(x)+.6)continue;
  events.push({id,x,z,age,strength});
 }
 return events;
}
