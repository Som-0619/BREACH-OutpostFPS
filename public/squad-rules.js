export const ROLES=Object.freeze({
 pathfinder:{name:'Pathfinder',speed:1.15,revive:45,frags:3,description:'Move 15% faster. Scout a route through the compound.'},
 lifeline:{name:'Lifeline',speed:1,revive:75,frags:3,description:'Revive teammates with 75 health instead of 45.'},
 breacher:{name:'Breacher',speed:1,revive:45,frags:4,description:'Deploy with four frag grenades instead of three.'}
});
export const roleInfo=role=>ROLES[role]||ROLES.pathfinder;
export const isBlackout=level=>level>0&&level%5===0;
export function validPose(p){return !!p&&['x','y','z','yaw','pitch'].every(k=>Number.isFinite(p[k]))&&Math.abs(p.x)<=22&&Math.abs(p.z)<=22&&p.y>=.5&&p.y<=5&&Math.abs(p.pitch)<=1.3;}
export function canRevive(actor,target,occluded=false){return actor.health>0&&target.health<=0&&!occluded&&Math.hypot(actor.x-target.x,actor.z-target.z)<=3;}
export function applyPulse(players,enemies,charge){if(charge<100)return{activated:false,charge};for(const p of players)if(p.health>0)p.armor=Math.min(100,p.armor+25);for(const e of enemies)if(e.alive){e.blind=Math.max(e.blind||0,3.5);e.fire=Math.max(e.fire||0,4);}return{activated:true,charge:0};}
