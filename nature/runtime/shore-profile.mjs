// Source of truth: 006 GLSL shoreHeight(); JS pure-function reference for geometry and tests.
// Candidate artistic elevation only; not surveyed GIS or a gameplay collider.
const fract=x=>x-Math.floor(x);
const hash2=(x,z)=>fract(Math.sin(x*127.1+z*311.7)*43758.5453);
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
const noise=(x,z)=>{const i=Math.floor(x),k=Math.floor(z),a=fract(x),b=fract(z);const u=a*a*(3-2*a),v=b*b*(3-2*b);
return (1-v)*((1-u)*hash2(i,k)+u*hash2(i+1,k))+v*((1-u)*hash2(i,k+1)+u*hash2(i+1,k+1));};
export const shoreline=x=>-29+1.35*Math.sin(x*.14)+.7*Math.sin(x*.49);
export function shoreHeight006(x,z,season=3){
if(![x,z,season].every(Number.isFinite))throw RangeError("finite input required");
const sd=shoreline(x)-z;if(sd<0)return -8;
const winter=smooth(2.15,2.95,season),n=noise(x*.085+4.8,z*.085-1.7);
const band=.16+1.28*smooth(0,11,sd)+1.42*smooth(11,37,sd)+.80*smooth(35,75,sd)
+(n-.5)*(.30+.70*smooth(6,45,sd));
const drift=(.08+.11*noise(x*.27,z*.27))*winter*smooth(1.2,9,sd);
return Math.max(.04,band+drift);
}
export function ridgeHeight006(x,depth=0){
if(!Number.isFinite(x)||!Number.isFinite(depth))throw RangeError("finite input required");
return 13+11*depth+3.2*Math.sin(x*.032+depth*1.7)+1.9*Math.sin(x*.089+depth*2.1)
+5.3*(noise(x*.023+depth*3.1,depth*13.4)-.5);
}
