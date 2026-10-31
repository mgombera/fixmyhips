// usage: node render.js file.glb outprefix [views json]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const glb = path.resolve(process.argv[2]); const outp = process.argv[3];
const views = JSON.parse(process.argv[4] || '{"front":[0,0,1],"lateral":[-1,0,0],"anterolateral":[-0.75,0.2,0.65]}');
const lm = process.argv[5] ? fs.readFileSync(process.argv[5],'utf8') : 'null';
const root = __dirname;
const html = `<!doctype html><html><body style="margin:0;background:#fff">
<script type="importmap">{"imports":{"three":"http://local/node_modules/three/build/three.module.js","three/addons/":"http://local/node_modules/three/examples/jsm/"}}</script>
<script type="module">
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
const W=900,H=900; const r=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true}); r.setSize(W,H); r.setClearColor(0xffffff); document.body.appendChild(r.domElement);
const scene=new THREE.Scene(); scene.add(new THREE.HemisphereLight(0xffffff,0x667788,1.2));
const cam=new THREE.PerspectiveCamera(30,1,0.001,100); const dl=new THREE.DirectionalLight(0xffffff,1.6); cam.add(dl); dl.position.set(0.3,0.5,0); scene.add(cam);
const g=await new GLTFLoader().loadAsync('http://local/model.glb');
const colors={pelvis:0xe8dcc4,femur:0xd8c8a8};
g.scene.traverse(o=>{ if(o.isMesh){ if(!o.geometry.attributes.normal) o.geometry.computeVertexNormals(); o.material=new THREE.MeshStandardMaterial({color:colors[o.name]||colors[o.parent?.name]||0xcccccc,roughness:0.7,metalness:0}); }});
scene.add(g.scene);
const LM=${lm};
if(LM){ const add=(p,c,s=0.004)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(s,12,8),new THREE.MeshBasicMaterial({color:c,depthTest:false})); m.renderOrder=9; m.position.set(...p); scene.add(m);} ;
 for(const [k,v] of Object.entries(LM)){ if(Array.isArray(v)&&v.length===3&&typeof v[0]==='number'&&!k.includes('axis')&&!k.includes('normal')) add(v,0xff0000);}
 if(LM.acetabular_rim) LM.acetabular_rim.points.forEach(p=>add(p,0x0055ff,0.0025));
 if(LM.femoral_head) add(LM.femoral_head.center,0x00aa00,0.005);
}
const box=new THREE.Box3().setFromObject(g.scene); const c=box.getCenter(new THREE.Vector3()); const sz=box.getSize(new THREE.Vector3()).length();
window.shot=(d)=>{ let dir=d, k=1.9, t=c; if(!Array.isArray(d)){dir=d.dir; k=d.dist??1.9; if(d.target) t=new THREE.Vector3(...d.target);} if(d.hide){g.scene.traverse(o=>{if(o.isMesh) o.visible=!d.hide.includes(o.name);});} else g.scene.traverse(o=>{if(o.isMesh) o.visible=true;}); const v=new THREE.Vector3(...dir).normalize(); cam.position.copy(t).addScaledVector(v,sz*k); cam.up.set(0,1,0); cam.lookAt(t); r.render(scene,cam); return r.domElement.toDataURL('image/png'); };
window.ready=true;
</script></body></html>`;
(async()=>{
 const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const p=await b.newPage({viewport:{width:900,height:900}});
 p.on('console',m=>console.log('console:',m.text())); p.on('pageerror',e=>console.log('err',e));
 await p.route('http://local/**', async rt=>{ const u=new URL(rt.request().url()); if(u.pathname==='/index.html') return rt.fulfill({body:html,contentType:'text/html'});
   if(u.pathname==='/model.glb') return rt.fulfill({body:fs.readFileSync(glb),contentType:'model/gltf-binary'});
   const f=path.join(root,u.pathname); return rt.fulfill({body:fs.readFileSync(f),contentType:'application/javascript'}); });
 await p.goto('http://local/index.html'); await p.waitForFunction('window.ready===true',null,{timeout:60000});
 for(const [n,d] of Object.entries(views)){ const url=await p.evaluate(d=>window.shot(d),d); fs.writeFileSync(`${outp}_${n}.png`,Buffer.from(url.split(',')[1],'base64')); console.log('wrote',`${outp}_${n}.png`);}
 await b.close();
})();
