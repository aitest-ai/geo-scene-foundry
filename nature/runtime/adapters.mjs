// Parameter bridge only; no FFT renderer or shoreline injection.
export function toBluePondUniforms(s){if(!s?.water)throw TypeError("water required");return{uWind:Math.min(1.5,Math.max(0,s.water.windMps/8)),uTurq:Math.min(1,Math.max(0,s.water.mineralScattering))};}
export function toOpenWaterWeather(s){if(!s?.water||!s?.sky)throw TypeError("water and sky required");const w=s.water,k=s.sky;return {wind:w.windMps,fetch:w.fetchKm,waveScale:w.waveScale,choppy:w.choppiness,swellHs:0,clouds:k.cloudCover,haze:.6+k.haze*1.5,mist:k.fogDensity*.25,sunElev:k.sunElevationDeg,sunAz:k.sunAzimuthDeg};}
