import * as THREE from './vendor/three.module.js';
// Five distinct first-person models; all use the same lightweight geometry helpers.
export function buildArsenal(camera,{box,cyl,mat,M,uniform}){
 const gun=new THREE.Group();camera.add(gun);
 const models=Array.from({length:5},()=>new THREE.Group());gun.add(...models);
 const [rifle,knife,smg,sniper,pistol]=models;
 const steel=mat('#a0afb4',.24,.8),carbon=mat('#28343a',.52,.35),tan=mat('#765039',.48,.05),purple=mat('#6376ab',.2,.82),redDot=new THREE.MeshBasicMaterial({color:'#ff795e'});
 function ring(r,t,x,y,z,m,parent){const mesh=new THREE.Mesh(new THREE.TorusGeometry(r,t,7,24),m);mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
 function barrel(radius,length,x,y,z,m,parent){const mesh=cyl(radius,length,x,y,z,m,parent);mesh.rotation.x=Math.PI/2;return mesh;}
 function hands(g,compact=false){box(.18,.18,.2,.08,-.2,.14,M.rubber,false,g);box(.21,.22,.44,.18,-.33,.36,uniform,false,g).rotation.z=-.2;if(!compact){box(.2,.19,.28,.15,-.16,-.4,uniform,false,g).rotation.z=-.3;box(.19,.19,.5,.3,-.24,-.1,uniform,false,g).rotation.z=-.45;}}
 function reflex(g,z,y=.17){box(.18,.025,.13,0,y-.065,z,carbon,false,g);for(const x of[-.075,.075])box(.025,.15,.05,x,y+.01,z,carbon,false,g);box(.17,.025,.05,0,y+.09,z,carbon,false,g);box(.008,.008,.01,0,y,z+.028,redDot,false,g);}
 box(.14,.19,.7,0,-.03,0,carbon,false,rifle);box(.17,.15,.42,0,-.01,-.46,tan,false,rifle);barrel(.035,.5,0,0,-.85,M.black,rifle);barrel(.06,.11,0,0,-1.1,steel,rifle);box(.17,.27,.16,0,-.22,-.13,M.dark,false,rifle).rotation.x=-.2;box(.13,.27,.14,0,-.2,.19,M.black,false,rifle).rotation.x=.22;box(.19,.23,.4,0,-.02,.48,tan,false,rifle);box(.1,.035,.8,0,.09,-.2,M.black,false,rifle);for(let z=-.63;z<-.28;z+=.08)box(.185,.025,.035,0,.035,z,carbon,false,rifle);hands(rifle);
 // Compact SMG with a curved magazine, short suppressor, and holographic sight.
 box(.17,.19,.46,0,0,-.14,carbon,false,smg);box(.18,.16,.28,0,-.01,-.46,M.steel,false,smg);barrel(.065,.23,0,0,-.66,M.black,smg);box(.12,.36,.14,0,-.24,-.23,M.black,false,smg).rotation.x=-.22;box(.13,.23,.14,0,-.2,.09,carbon,false,smg);box(.035,.07,.43,-.065,.02,.28,steel,false,smg);box(.035,.07,.43,.065,.02,.28,steel,false,smg);box(.18,.22,.06,0,-.02,.51,M.rubber,false,smg);for(let z=-.51;z<-.2;z+=.075)box(.19,.02,.027,0,.045,z,steel,false,smg);hands(smg);
 // Long sniper profile and a glass-fronted telescopic optic.
 box(.16,.2,.7,0,-.03,-.16,tan,false,sniper);box(.16,.17,.47,0,-.02,.4,carbon,false,sniper);barrel(.034,.75,0,.015,-.99,steel,sniper);barrel(.055,.12,0,.015,-1.4,M.black,sniper);box(.12,.22,.15,0,-.19,.06,M.black,false,sniper);box(.13,.17,.19,0,-.2,-.25,carbon,false,sniper);barrel(.09,.55,0,.22,-.13,M.black,sniper);barrel(.115,.1,0,.22,-.44,carbon,sniper);barrel(.12,.11,0,.22,.18,carbon,sniper);barrel(.094,.015,0,.22,.245,mat('#4a9caa',.12,.65),sniper);cyl(.055,.08,0,.34,-.1,steel,sniper);box(.16,.035,.04,.13,.02,.1,steel,false,sniper);cyl(.035,.08,.22,-.01,.1,M.black,sniper);hands(sniper);
 box(.13,.15,.47,0,0,-.25,steel,false,pistol);box(.11,.29,.16,0,-.18,-.07,M.black,false,pistol).rotation.x=.15;box(.04,.04,.08,0,.1,-.42,M.black,false,pistol);hands(pistol,true);
 // Karambit: curved hooked blade, textured grip, and finger ring.
 const shape=new THREE.Shape();shape.moveTo(-.025,.06);shape.bezierCurveTo(-.31,.19,-.38,.45,-.19,.61);shape.bezierCurveTo(-.33,.35,-.06,.26,.05,.24);shape.lineTo(.07,.07);shape.closePath();
 const blade=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:.035,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.008,bevelThickness:.008}),purple);blade.position.set(.03,.06,-.23);blade.rotation.z=-.35;knife.add(blade);
 box(.11,.31,.08,.04,-.055,-.21,carbon,false,knife).rotation.z=-.25;for(let i=0;i<4;i++)box(.12,.025,.09,.04+i*.007,-.16+i*.06,-.21,M.rubber,false,knife).rotation.z=-.25;ring(.075,.02,.1,-.27,-.21,steel,knife);box(.2,.17,.23,.05,-.1,-.15,M.rubber,false,knife);box(.22,.22,.44,.18,-.3,.1,uniform,false,knife).rotation.z=-.3;
 // Additional recognizable silhouettes, machining and textured surfaces.
 const wood=mat('#75432a',.5,.03),olive=mat('#506044',.63,.12);
 for(const m of rifle.children)if(m.isMesh&&m.material===tan)m.material=wood;
 for(let i=0;i<7;i++){const mag=box(.145,.055,.18,0,-.25-i*.045,-.13+i*i*.003,carbon,false,rifle);mag.rotation.x=-.15-i*.04;}
 barrel(.025,.47,0,.085,-.76,carbon,rifle);box(.045,.13,.045,0,.09,-1.01,steel,false,rifle);ring(.035,.009,0,.15,-1.01,carbon,rifle);
 for(const g of [rifle,smg,sniper,pistol]){for(let i=0;i<5;i++){const screw=cyl(.012,.006,.087,.03-i*.023,-.12,steel,g);screw.rotation.z=Math.PI/2;}box(.015,.055,.16,.09,.025,-.1,steel,false,g);}
 box(.19,.15,.5,0,-.025,-.29,carbon,false,smg);box(.07,.3,.09,0,-.22,-.5,M.rubber,false,smg);box(.05,.05,.04,0,.13,-.58,steel,false,smg);box(.05,.045,.04,0,.13,.05,steel,false,smg);
 for(const m of sniper.children)if(m.isMesh&&m.material===tan)m.material=olive;
 box(.24,.26,.48,0,-.05,.43,olive,false,sniper);box(.22,.15,.58,0,-.13,-.36,olive,false,sniper);for(const x of[-.1,.1]){const leg=box(.025,.38,.025,x,-.28,-.62,steel,false,sniper);leg.rotation.z=x>0?-.2:.2;}
 box(.17,.19,.55,0,.025,-.27,steel,false,pistol);barrel(.047,.13,0,.02,-.57,carbon,pistol);for(let i=0;i<7;i++)box(.177,.018,.013,0,.06-i*.018,-.08,carbon,false,pistol);ring(.085,.016,0,-.13,-.25,carbon,pistol);
 const grain=document.createElement('canvas');grain.width=grain.height=128;const ctx=grain.getContext('2d');ctx.fillStyle='#9a9a9a';ctx.fillRect(0,0,128,128);for(let i=0;i<2400;i++){ctx.fillStyle=i%2?'#ffffff20':'#00000025';ctx.fillRect(Math.random()*128,Math.random()*128,1,1);}const texture=new THREE.CanvasTexture(grain);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(3,3);for(const m of[steel,carbon,wood,olive,tan]){m.bumpMap=texture;m.bumpScale=.008;m.roughnessMap=texture;}
 const materialCopies=new Map();gun.traverse(o=>{if(o.isMesh){o.castShadow=false;o.receiveShadow=false;if(!materialCopies.has(o.material)){const copy=o.material.clone();copy.depthTest=false;copy.depthWrite=false;materialCopies.set(o.material,copy);}o.material=materialCopies.get(o.material);o.renderOrder=100;}});
 return {gun,models};
}
