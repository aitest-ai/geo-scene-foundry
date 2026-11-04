import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {Script} from "node:vm";
const load=name=>readFileSync(new URL("../demos/"+name,import.meta.url),"utf8");
const old=load("blue-pond-seasons-002.html");
const now=load("blue-pond-seasons-003.html");
test("003 remains a separate and self-contained candidate",()=>{
 assert.match(old,/NATURE STUDY \/ 002/);
 assert.match(now,/NATURE STUDY \/ 003/);
 assert.ok(now.length>old.length);
 assert.match(now,/<script id="frag"/);
 assert.doesNotMatch(now,/<script[^>]+src=["']https?:/);
});
test("003 keeps shared wind and seasonal controls with 002 comparison",()=>{
 for(const part of ['data-season="0"','data-season="3"','data-scene="mist"','data-scene="sunset"','id="beforeAfter"',"get detail(){return detail}"]) assert.ok(now.includes(part),part);
 assert.match(now,/uniform float uDetail/);
 assert.match(now,/if\(uDetail<\.5\)/);
});
test("003 adds layered woods and shoreline geometry instead of global color only",()=>{
 assert.match(now,/vec4 woodland\(vec3 p,float depth\)/);
 assert.match(now,/for\(int layer=1;layer>=0;layer--\)/);
 assert.match(now,/return base\+winter\*crest;/);
 assert.match(now,/float snowMask=/);
 assert.match(now,/vec3 refl=reflectScene/);
});
test("inline JS remains syntactically valid",()=>{
 const matches=[...now.matchAll(/<script>([\s\S]*?)<\/script>/g)];
 assert.equal(matches.length,1);
 new Script(matches[0][1]);
});
test("GLSL delimiters are balanced (not shader compilation)",()=>{
 const frag=now.match(/<script id="frag"[^>]*>([\s\S]*?)<\/script>/);
 assert.ok(frag);
 assert.equal((frag[1].match(/\{/g)||[]).length,(frag[1].match(/\}/g)||[]).length);
});
