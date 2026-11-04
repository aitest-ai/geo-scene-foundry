// Pure, immutable state logic. No browser or game writes.
const O=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
const copy=x=>JSON.parse(JSON.stringify(x));
export function mergeScene(base,overlay){if(!O(base)||!O(overlay))throw TypeError("scene objects");const out=copy(base);
function m(a,b){for(const[k,v]of Object.entries(b)){if(["qa","status","id","version","schemaVersion"].includes(k))continue;if(O(v)){a[k]=O(a[k])?a[k]:{};m(a[k],v)}else a[k]=copy(v)}}
m(out,overlay);return out;}
const lin=x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4;
const gam=x=>x<=.0031308?12.92*x:1.055*x**(1/2.4)-.055;
function mixHex(a,b,t){const ch=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16)/255);const A=ch(a).map(lin),B=ch(b).map(lin);return"#"+A.map((x,i)=>Math.round(Math.max(0,Math.min(1,gam(x+(B[i]-x)*t)))*255).toString(16).padStart(2,"0")).join("");}
function blend(a,b,t){if(typeof a==="number"&&typeof b==="number")return a+(b-a)*t;if(typeof a==="string"&&typeof b==="string"&&/^#[0-9a-f]{6}$/i.test(a)&&/^#[0-9a-f]{6}$/i.test(b))return mixHex(a,b,t);
if(O(a)&&O(b)){const z={...a};for(const k of Object.keys(b))z[k]=k in a?blend(a[k],b[k],t):copy(b[k]);return z;}return copy(t<.5?a:b);}
export function transitionScene(a,b,t){if(!O(a)||!O(b))throw TypeError("scene objects");if(!Number.isFinite(t))throw RangeError("finite progress required");const r=blend(a,b,Math.max(0,Math.min(1,t)));for(const k of ["qa","status","id","version","schemaVersion"])r[k]=copy(a[k]);return r;}
