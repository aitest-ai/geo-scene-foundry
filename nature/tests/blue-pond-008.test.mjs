import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {Script} from 'node:vm';
import {canopy008Candidates,renderDimensions} from '../runtime/forest-008.mjs';
const src=p=>readFileSync(new URL('../demos/'+p,import.meta.url),'utf8');
const a=src('blue-pond-forest-007.html'),b=src('blue-pond-forest-008.html');
const sha=s=>createHash('sha256').update(s).digest('hex');
const shader=(s,id)=>s.match(new RegExp('<script id="'+id+'"[^>]*>([\\s\\S]*?)<\\/script>'))?.[1];
test('007 original intact, independent 008 published',()=>{
 assert.equal(sha(a),'9e3a562c77e475fb144149d7ddeb972531c26c7e46e4df04142a28de39b7398b');
 assert.equal(sha(b),'9496ed23db8b5296e2d939c75456f78258447f632fb0bf8196f3999c2d2e362a');
 assert.match(b,/NATURE STUDY \/ 008/);
});
test('water shade code is byte-identical',()=>{
 const w=s=>s.split('vec3 shadeWater(')[1].split('vec3 render(')[0];assert.equal(w(a),w(b));
});
test('008 tree dependency exists inside each GLSL program',()=>{
 const main=shader(b,'frag'),particle=shader(b,'particleFrag');assert.ok(main&&particle);
 for(const s of [main,particle])for(const x of ['grove008','understory008','treeIntersect'])assert.ok(s.includes(x+'('),x);
 const fn=s=>s.match(/vec4 grove008\(vec3 p,float depth,float season\)\{[\s\S]*?\n\}\n/)?.[0];assert.ok(fn(main));assert.equal(fn(main),fn(particle));
});
test('expensive shoreHeight follows horizontal rejection',()=>{
 for(const id of ['frag','particleFrag']){
 const s=shader(b,id).split('vec4 grove008(')[1].split('float understory008(')[0];
 assert.ok(s.indexOf('if(abs(p.x-cx)>wd*1.14)continue;')<s.indexOf('float y0=shoreHeight('));
 }
});
test('scene/particle uniforms, A/B and resolution select wired',()=>{
 for(const str of ['uForest008','pForest008','id="forest008Toggle"','id="renderScale008"','gl.uniform1f(uniforms.forest008,forest008)','gl.uniform1f(pu.forest008,forest008)'])assert.ok(b.includes(str),str);
});
test('JS syntax and GLSL braces valid structurally (not actual GPU compiler)',()=>{
 for(const id of ['vert','frag','particleVert','particleFrag']){const s=shader(b,id);assert.ok(s);assert.equal((s.match(/\{/g)||[]).length,(s.match(/\}/g)||[]).length);}
 const js=[...b.matchAll(/<script>([\s\S]*?)<\/script>/g)];assert.equal(js.length,1);new Script(js[0][1]);
});
test('candidate placement deterministic, 80% frame has fewer pixels',()=>{
 assert.deepEqual(canopy008Candidates(4.1),canopy008Candidates(4.1));
 const full=renderDimensions(1000,500,1,1),low=renderDimensions(1000,500,1,.8);
 assert.ok(full.width>low.width&&full.height>low.height&&low.width*low.height<=full.width*full.height*.65);
});
