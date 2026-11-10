// EA Creative Playground interactions. All effects are optional enhancements; links and content work without them.
const labCanvas=document.querySelector('#lab-canvas');
const labShape=document.querySelector('#lab-shape');
const labType=document.querySelector('#lab-type');
const remixButton=document.querySelector('#lab-remix');
const palettes=[
  {shape:'33% 67% 57% 43% / 47% 38% 62% 53%',bg:'radial-gradient(circle at 30% 25%,#f0c4ff,#a69bff 30%,#6255ff 72%,#31268b)',words:['MAKE','GOOD','NOISE']},
  {shape:'50% 50% 36% 64% / 36% 61% 39% 64%',bg:'radial-gradient(circle at 30% 25%,#fff5b8,#ffb65c 35%,#ff754b 72%,#8f2c19)',words:['STAY','VERY','CURIOUS']},
  {shape:'64% 36% 65% 35% / 53% 44% 56% 47%',bg:'radial-gradient(circle at 30% 25%,#e8ffc2,#c6ff55 35%,#86b92c 72%,#405b18)',words:['THINK','THEN','PLAY']},
  {shape:'42% 58% 48% 52% / 62% 35% 65% 38%',bg:'radial-gradient(circle at 30% 25%,#d5f5ff,#75c8f5 35%,#397eb4 72%,#193b6b)',words:['MAKE','IT','MATTER']}
];
let paletteIndex=0;
function remixLab(){
  if(!labShape||!labType)return;
  paletteIndex=(paletteIndex+1)%palettes.length;
  const item=palettes[paletteIndex];
  labShape.style.borderRadius=item.shape;
  labShape.style.background=item.bg;
  labType.innerHTML=item.words.map((word,index)=>'<span>'+word+(index===2?'<span class="lab-type__dot">.</span>':'')+'</span>').join('');
  labShape.animate([{transform:'scale(.7) rotate(-25deg)'},{transform:'scale(1.08) rotate(12deg)'},{transform:'scale(1) rotate(0deg)'}],{duration:420,easing:'cubic-bezier(.2,.8,.2,1)'});
}
remixButton?.addEventListener('click',remixLab);
labShape?.addEventListener('click',remixLab);
if(labCanvas&&labShape&&window.matchMedia('(pointer:fine)').matches){
 let dragging=false,startX=0,startY=0,baseX=0,baseY=0;
 labShape.addEventListener('pointerdown',event=>{
   dragging=true;labShape.setPointerCapture(event.pointerId);
   const shapeRect=labShape.getBoundingClientRect(),canvasRect=labCanvas.getBoundingClientRect();
   startX=event.clientX;startY=event.clientY;
   baseX=shapeRect.left-canvasRect.left;baseY=shapeRect.top-canvasRect.top;
   labShape.style.left=baseX+'px';labShape.style.top=baseY+'px';labShape.style.right='auto';
 });
 labShape.addEventListener('pointermove',event=>{
   if(!dragging)return;
   const maxX=labCanvas.clientWidth-labShape.offsetWidth,maxY=labCanvas.clientHeight-labShape.offsetHeight;
   labShape.style.left=Math.max(0,Math.min(maxX,baseX+event.clientX-startX))+'px';
   labShape.style.top=Math.max(0,Math.min(maxY,baseY+event.clientY-startY))+'px';
 });
 const endDrag=()=>{dragging=false;};
 labShape.addEventListener('pointerup',endDrag);labShape.addEventListener('pointercancel',endDrag);
}
if('IntersectionObserver'in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}
 }),{threshold:.12});
 document.querySelectorAll('[data-reveal]').forEach(item=>revealObserver.observe(item));
}else document.querySelectorAll('[data-reveal]').forEach(item=>item.classList.add('is-visible'));
const customCursor=document.querySelector('.play-cursor');
if(customCursor&&window.matchMedia('(pointer:fine)').matches&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 let cursorX=0,cursorY=0,renderX=0,renderY=0,raf=0;
 window.addEventListener('pointermove',event=>{
   cursorX=event.clientX;cursorY=event.clientY;customCursor.classList.add('is-visible');
   if(!raf)raf=requestAnimationFrame(function tick(){renderX+=(cursorX-renderX)*.22;renderY+=(cursorY-renderY)*.22;customCursor.style.transform='translate('+renderX+'px,'+renderY+'px) translate(-50%,-50%)';raf=requestAnimationFrame(tick);});
 },{passive:true});
 document.addEventListener('pointerover',event=>{if(event.target.closest('a,button'))customCursor.classList.add('is-hover');else customCursor.classList.remove('is-hover');});
 document.addEventListener('pointerleave',()=>customCursor.classList.remove('is-visible'));
}
const scramble=document.querySelector('[data-scramble]');
if(scramble&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 const original=scramble.textContent;const glyphs='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
 let timer=0;
 scramble.addEventListener('pointerenter',()=>{
   if(timer)clearInterval(timer);let frame=0;
   timer=setInterval(()=>{scramble.textContent=original.split('').map((char,index)=>index<frame?char:glyphs[Math.floor(Math.random()*glyphs.length)]).join('');frame+=.7;if(frame>original.length){clearInterval(timer);scramble.textContent=original;}},38);
 });
}
