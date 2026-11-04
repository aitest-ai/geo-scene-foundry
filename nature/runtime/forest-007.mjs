// Pure reference for forest layout. JS double precision is not pixel-identical with GLSL float32.
import {shoreHeight006} from './shore-profile.mjs';
const h=x=>{const y=Math.sin(x*127.1+78.233)*43758.5453;return y-Math.floor(y)};
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
export function tree007(cell,depth=0,season=1){
 if(!Number.isInteger(cell)||![depth,season].every(Number.isFinite)||![0,1].includes(depth))throw TypeError('Invalid forest coordinates');
 const spacing=depth===0?3.65:5.25,seed=cell*17.73+depth*113.2;
 const x=(cell+.5)*spacing+(h(seed+3.4)-.5)*spacing*.62,z=-33-8*depth;
 const height=(7+9*h(seed+11.7))*(1-depth*.14),width=(1.5+1.75*h(seed+5.2))*(1+depth*.1);
 const pine=h(seed+17.5)>=.39,larch=pine&&h(seed+1.8)>=.76;
 const au=smooth(1.12,1.92,season)*(1-smooth(2.08,2.94,season)),winter=smooth(2.15,2.96,season);
 return {cell,depth,x,z,y:shoreHeight006(x,z,season),height,width,kind:pine?(larch?'larch':'evergreen'):'broadleaf',autumnMix:au,winterMix:winter,foliageMultiplier:1-winter*(.91*(!pine?1:0)+.74*(larch?1:0))};
}
export function forest007Range(a,b,depth=0,season=1){
 if(!Number.isInteger(a)||!Number.isInteger(b)||b<a||b-a>2000)throw RangeError('Invalid tree range');
 return Array.from({length:b-a+1},(_,i)=>tree007(a+i,depth,season));
}
