const menu=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('#mobile-nav');
function setMobileMenu(open){
 if(!menu||!mobileNav)return;
 menu.setAttribute('aria-expanded',String(open));
 menu.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');
 const label=menu.querySelector('[data-menu-label]');
 if(label)label.textContent=open?'Close':'Menu';
 const icon=menu.querySelector('[data-menu-icon]');
 if(icon)icon.textContent=open?'×':'+';
 mobileNav.hidden=!open;
}
menu?.addEventListener('click',()=>setMobileMenu(menu.getAttribute('aria-expanded')!=='true'));
mobileNav?.addEventListener('click',event=>{if(event.target.closest('a'))setMobileMenu(false);});
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){setMobileMenu(false);menu.focus();}
});
document.addEventListener('click',event=>{
 if(menu?.getAttribute('aria-expanded')==='true'&&!event.target.closest('#mobile-nav,.menu-toggle'))setMobileMenu(false);
});
const dialog=document.querySelector('#image-dialog'),image=document.querySelector('#dialog-image'),title=document.querySelector('#image-title');let lastTrigger;
document.querySelectorAll('[data-zoom]').forEach(link=>link.addEventListener('click',e=>{if(!dialog?.showModal)return;e.preventDefault();lastTrigger=link;image.src=link.href;image.alt=link.dataset.title;title.textContent=link.dataset.title;dialog.showModal();document.body.classList.add('dialog-open');}));
document.querySelector('.close-dialog')?.addEventListener('click',()=>dialog.close());dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog?.addEventListener('close',()=>{document.body.classList.remove('dialog-open');lastTrigger?.focus();});
if('IntersectionObserver'in window){const links=[...document.querySelectorAll('.case-outline nav a')];const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){links.forEach(link=>{const active=link.hash===`#${entry.target.id}`;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}},{rootMargin:'-10% 0px -65% 0px'});document.querySelectorAll('.case-section[id]').forEach(s=>observer.observe(s));}

// Keep the visitor's theme preference across pages and visits.
const themeButton=document.querySelector('.theme-toggle');
const systemTheme=window.matchMedia('(prefers-color-scheme: dark)');
function applyTheme(theme){document.documentElement.dataset.theme=theme;const dark=theme==='dark';themeButton?.setAttribute('aria-pressed',String(dark));themeButton?.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');const label=themeButton?.querySelector('.theme-label');if(label)label.textContent=dark?'Light':'Dark';document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#17161d':'#f6f5f0');}
applyTheme(document.documentElement.dataset.theme||'light');
themeButton?.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';applyTheme(next);try{localStorage.setItem('edward-theme',next);}catch{}});
systemTheme.addEventListener('change',event=>{try{if(localStorage.getItem('edward-theme'))return;}catch{}applyTheme(event.matches?'dark':'light');});
const topButton=document.querySelector('.back-to-top');
function updateTopButton(){if(topButton)topButton.hidden=window.scrollY<500;}
window.addEventListener('scroll',updateTopButton,{passive:true});updateTopButton();
topButton?.addEventListener('click',()=>{window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});document.querySelector('.brand')?.focus({preventScroll:true});});
