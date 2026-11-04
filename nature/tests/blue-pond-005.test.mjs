import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {Script} from "node:vm";
import {createHash} from "node:crypto";
import {predictContacts,shorelineAt} from "../runtime/particle-contact.mjs";
const f=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const a=f("demos/blue-pond-seasons-004.html"),b=f("demos/blue-pond-seasons-005.html");
const p=JSON.parse(f("effects/particle-contact-v0.1.json"));
test("004 baseline unchanged and independent 005",()=>{
 assert.equal(createHash("sha256").update(a).digest("hex"),"641e5cc4361d728f46e1b2f050ca49c05c8e044546935f89e287d39198384cc3");
 assert.match(a,/NATURE STUDY \/ 004/);assert.match(b,/NATURE STUDY \/ 005/);
});
test("contact uses common world-space geometry",()=>{
 for(const k of ["blockedByScene(","vec4 leaf=woodland(q,depth)","treeIntersect(ro,rd,ti,branch)","shoreHeight(q.xz)","wave(q.xz,pTime)","gl_FragCoord.xy","vDepth=length(d)"])assert.ok(b.includes(k),k);
});
test("water interaction events and optional toggles present",()=>{
 for(const k of ["uniform vec4 uImpacts[12]","impactGradient(p.xz)","gl.uniform4fv(uniforms.impacts,impactValues)","id=\"occlusionToggle\"","id=\"rippleToggle\""])assert.ok(b.includes(k),k);
 assert.equal(p.rippleContacts.maxEvents,12);
});
test("safe particle shader fallback",()=>assert.ok(b.includes("const pLoc=(name)=>particleProgram?gl.getUniformLocation(particleProgram,name):null;")));
test("inline JS syntax and shader delimiter balance",()=>{
 const js=[...b.matchAll(/<script>([\s\S]*?)<\/script>/g)];assert.equal(js.length,1);new Script(js[0][1]);
 for(const id of ["frag","particleVert","particleFrag"]){const m=b.match(new RegExp('<script id="'+id+'"[^>]*>([\\s\\S]*?)<\\/script>'));assert.ok(m,id);assert.equal((m[1].match(/\{/g)||[]).length,(m[1].match(/\}/g)||[]).length);}
});
test("deterministic contact predictions and shoreline",()=>{
 const arg={time:35,season:2,wind:.25,intensity:.75};
 assert.deepEqual(predictContacts(arg),predictContacts(arg));assert.deepEqual(predictContacts({...arg,season:1}),[]);
 let total=0;for(let t=0;t<120;t+=.25)for(const ev of predictContacts({...arg,time:t})){total++;assert.ok(ev.z>=shorelineAt(ev.x)+.6);assert.ok(ev.age<=2.25);}
 assert.ok(total>0);
});
test("GPU/mobile/physics remain explicitly unverified",()=>{assert.equal(p.status,"prototype");assert.equal(p.qa.webgl2Verified,false);assert.equal(p.qa.mobileVerified,false);assert.equal(p.rippleContacts.physicallyMeasured,false);});
