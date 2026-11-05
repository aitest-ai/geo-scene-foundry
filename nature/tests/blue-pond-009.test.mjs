import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {Script} from 'node:vm';

const read=name=>readFileSync(new URL('../demos/'+name,import.meta.url),'utf8');
const old=read('blue-pond-forest-008.html');
const now=read('blue-pond-performance-009.html');
const hash=s=>createHash('sha256').update(s).digest('hex');
const shader=(html,id)=>html.match(new RegExp('<script id="'+id+'"[^>]*>([\\s\\S]*?)<\\/script>'))?.[1];

test('008 baseline is preserved, 009 is a separate verified source',()=>{
 assert.equal(hash(old),'9496ed23db8b5296e2d939c75456f78258447f632fb0bf8196f3999c2d2e362a');
 assert.equal(hash(now),'11430beca035c9c8c90569868f08781dc5ac03679c824531814c130df514e411');
 assert.match(now,/NATURE STUDY \/ 009/);
});
test('water shader core stays byte-identical',()=>{
 const w=s=>s.split('vec3 shadeWater(')[1].split('vec3 render(')[0];
 assert.equal(w(old),w(now));
});
test('scene and particles have complete conservative tree bounds',()=>{
 for(const id of ['frag','particleFrag']){
  const s=shader(now,id);assert.ok(s,id);
  assert.match(s,/vec3 lo=vec3\(-25\.,-2\.,-27\.\),hi=vec3\(28\.,18\.,2\.\)/);
  assert.match(s,/float treeIntersect\(vec3 ro,vec3 rd,out int idx,out int branch\)/);
  assert.match(s,/vec3 trunkBase\(int i\)/);
  assert.ok(s.includes(id==='frag'?'uFast009':'pFast009'));
 }
});
test('shore cutoff keeps one coarse refinement step',()=>{
 const s=shader(now,'frag');
 assert.match(s,/t>tWater\+stepT/);
 assert.doesNotMatch(s,/t>=tWater\)break/);
});
test('active water impacts are compacted and counted',()=>{
 assert.match(shader(now,'frag'),/float\(i\)>=uImpactCount\)break/);
 assert.match(now,/const o=\(fast009>\.5\?activeImpacts:j\)\*4;/);
 assert.match(now,/gl\.uniform1f\(uniforms\.impactCount,activeImpacts\)/);
});
test('transparent particles are rejected before occlusion',()=>{
 const s=shader(now,'particleFrag');
 assert.ok(s.indexOf('if(pFast009>.5 && (vOpacity<.001 || dot(p,p)>1.0))discard;') < s.indexOf('if(pContact>.5){vec3 ro;'));
});
test('same-camera A/B, export, and explicit synchronous timing are wired',()=>{
 for(const x of ['fast009Toggle','benchmark009','saveBenchmark009','order:[0,1,1,0]','gl.finish()','renderScale008'])assert.ok(now.includes(x),x);
 assert.match(now,/NOT GPU timer\/FPS/);
});
test('all four shader blocks balanced; inline JS parses (not GPU compilation)',()=>{
 for(const id of ['frag','vert','particleVert','particleFrag']){
  const s=shader(now,id);assert.ok(s,id);
  assert.equal((s.match(/\{/g)||[]).length,(s.match(/\}/g)||[]).length,id);
 }
 const js=[...now.matchAll(/<script>([\s\S]*?)<\/script>/g)];
 assert.equal(js.length,1);new Script(js[0][1]);
});
