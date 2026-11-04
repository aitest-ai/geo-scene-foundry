import fs from "node:fs";import path from "node:path";import{fileURLToPath}from"node:url";
const d=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const ranges={"windMps":[0,35],"fetchKm":[0,1000],"waveScale":[0,3],"choppiness":[0,2],"reflectionStrength":[0,1],"mineralScattering":[0,1],"foamAmount":[0,1]};
let n=0;for(const f of fs.readdirSync(path.join(d,"presets")).filter(x=>x.endsWith(".json"))){const s=JSON.parse(fs.readFileSync(path.join(d,"presets",f),"utf8"));if(s.schemaVersion!=="1.0.0"||s.id!==f.slice(0,-5)||!["design","prototype","verified"].includes(s.status))throw Error(f+": header");
for(const k of ["conditions","water","sky","vegetation","qa"])if(!s[k])throw Error(f+": "+k);
for(const[k,[lo,hi]]of Object.entries(ranges)){const v=s.water[k];if(!Number.isFinite(v)||v<lo||v>hi)throw Error(f+": "+k)}
if(!/^#[0-9a-f]{6}$/i.test(s.water.tintSRGB))throw Error(f+": tint");
for(const k of ["browserVerified","mobileVerified","geoSurveyed","fftIntegrated"])if(typeof s.qa[k]!=="boolean")throw Error(f+": QA");
if(s.status!=="verified"&&Object.values(s.qa).some(Boolean))throw Error(f+": unverified QA");
n++;}
for(const f of fs.readdirSync(path.join(d,"seasons")).filter(x=>x.endsWith(".json"))){const s=JSON.parse(fs.readFileSync(path.join(d,"seasons",f),"utf8"));if(s.id!==f.slice(0,-5)||s.conditions?.season!==s.id)throw Error(f+": season");n++;}
console.log("PASS: "+n+" nature scene/season recipes");