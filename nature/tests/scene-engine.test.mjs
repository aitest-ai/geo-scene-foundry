import test from"node:test";import assert from"node:assert/strict";import fs from"node:fs";
import{mergeScene,transitionScene}from"../runtime/scene-engine.mjs";import{toBluePondUniforms,toOpenWaterWeather}from"../runtime/adapters.mjs";
const read=p=>JSON.parse(fs.readFileSync(new URL("../"+p,import.meta.url),"utf8"));const a=read("presets/blue-pond.json"),z=read("seasons/autumn.json");
test("immutable seasonal layering",()=>{const prior=JSON.stringify(a),b=mergeScene(a,z);assert.equal(JSON.stringify(a),prior);assert.equal(b.conditions.season,"autumn");assert.equal(b.vegetation.autumnMix,.84);assert.deepEqual(b.qa,a.qa)});
test("interpolate endpoints",()=>{const b=mergeScene(a,z);assert.equal(transitionScene(a,b,0).water.windMps,a.water.windMps);assert.equal(transitionScene(a,b,1).water.windMps,b.water.windMps)});
test("gamma-aware color mix",()=>{let b=JSON.parse(JSON.stringify(a)),c=JSON.parse(JSON.stringify(a));b.water.tintSRGB="#ffffff";c.water.tintSRGB="#000000";assert.equal(transitionScene(c,b,.5).water.tintSRGB,"#bcbcbc")});
test("adapter scope",()=>{assert.equal(toBluePondUniforms(a).uTurq,.92);assert.equal(toOpenWaterWeather(a).fetch,a.water.fetchKm);assert.equal(a.qa.fftIntegrated,false)});
test("bad progress rejected",()=>assert.throws(()=>transitionScene(a,a,NaN),RangeError));