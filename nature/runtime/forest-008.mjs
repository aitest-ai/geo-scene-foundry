// Cross-agent reference for early canopy broadphase; not the full GLSL renderer.
const fract=x=>x-Math.floor(x);
export const hash=x=>fract(Math.sin(x*127.1+78.233)*43758.5453);
export function canopy008Candidates(x,depth=0){
 if(!Number.isFinite(x)||![0,1].includes(depth))throw new RangeError('finite x; depth 0 or 1');
 const spacing=depth<.5?3.65:5.25,cell=Math.floor(x/spacing),hits=[];
 for(let k=-2;k<=2;k++){
  const id=cell+k,seed=id*17.73+depth*113.2;
  const cx=(id+.5)*spacing+(hash(seed+3.4)-.5)*spacing*.62;
  const wd=(1.5+1.75*hash(seed+5.2))*(1+.1*depth);
  if(Math.abs(x-cx)>wd*1.14)continue;
  const height=(7+9*hash(seed+11.7))*(1-depth*.14);
  hits.push({id,x:cx,width:wd,height,depth});
 }
 return hits;
}
export function renderDimensions(width,height,dpr=1,scale=1){
 if(![width,height,dpr,scale].every(Number.isFinite)||width<=0||height<=0||dpr<=0||scale<=0)throw new RangeError('positive dimensions/dpr/scale');
 const q=Math.max(.55,Math.min(1,scale));
 return {width:Math.min(1200,Math.floor(width*Math.min(dpr,1.3)*q)),height:Math.min(720,Math.floor(height*Math.min(dpr,1.3)*q))};
}
