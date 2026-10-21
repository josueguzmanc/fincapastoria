(function(){
 'use strict';
 var burger=document.querySelector('#burger'),menu=document.querySelector('#menu');
 function closeMenu(){menu.hidden=true;burger.classList.remove('is-open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Abrir menú');document.body.classList.remove('menu-open');}
 burger.addEventListener('click',function(){var open=menu.hidden;menu.hidden=!open;burger.classList.toggle('is-open',open);burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');document.body.classList.toggle('menu-open',open);if(open)menu.querySelector('a').focus();});
 menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){closeMenu();var t=document.querySelector(a.getAttribute('href'));if(t){t.setAttribute('tabindex','-1');t.focus();}});});
 window.addEventListener('resize',function(){if(innerWidth>900)closeMenu();});
 // Ambient videos remain muted, inline and looping, independently of each other.
 var videos=Array.from(document.querySelectorAll('video'));
 function playVideo(video){video.muted=true;video.defaultMuted=true;video.volume=0;video.loop=true;video.autoplay=true;video.playsInline=true;video.controls=false;var attempt=video.play();if(attempt&&attempt.catch)attempt.catch(function(){/* Mobile power-saving policies may delay autoplay. */});}
 function resumeVideos(){if(!document.hidden)videos.forEach(playVideo);}
 videos.forEach(function(video){
   video.removeAttribute('controls');video.setAttribute('muted','');
   video.addEventListener('canplay',function(){if(!document.hidden)playVideo(video);});
   video.addEventListener('pause',function(){if(!document.hidden&&!video.ended&&!video.error)playVideo(video);});
   video.addEventListener('ended',function(){if(!document.hidden){video.currentTime=0;playVideo(video);}});
   playVideo(video);
 });
 document.addEventListener('visibilitychange',resumeVideos);
 window.addEventListener('pageshow',resumeVideos);
 // A first page gesture also retries devices that initially block autoplay.
 document.addEventListener('touchstart',resumeVideos,{passive:true,once:true});
 document.addEventListener('pointerdown',resumeVideos,{passive:true,once:true});
 document.addEventListener('keydown',resumeVideos,{once:true});
 document.querySelectorAll('[data-count]').forEach(function(item){item.querySelector('b').textContent=Number(item.dataset.count).toLocaleString('es-MX');});
 var links=Array.from(document.querySelectorAll('.gallery-link')),box=document.querySelector('#lightbox'),current=0,origin;
 function show(i){current=(i+links.length)%links.length;var a=links[current];box.querySelector('img').src=a.href;box.querySelector('img').alt=a.querySelector('img').alt;box.querySelector('figcaption').textContent=(current+1)+' / '+links.length+' · '+a.parentNode.querySelector('figcaption').textContent;}
 function close(){box.hidden=true;document.body.classList.remove('lightbox-open');if(origin)origin.focus();}
 links.forEach(function(a,i){a.addEventListener('click',function(e){if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();origin=a;show(i);box.hidden=false;document.body.classList.add('lightbox-open');box.querySelector('button').focus();});});
 box.querySelector('.lightbox__close').addEventListener('click',close);box.querySelector('.lightbox__prev').addEventListener('click',function(){show(current-1);});box.querySelector('.lightbox__next').addEventListener('click',function(){show(current+1);});box.addEventListener('click',function(e){if(e.target===box)close();});
 var startX=null;box.querySelector('img').addEventListener('touchstart',function(e){startX=e.touches.length===1?e.touches[0].clientX:null;},{passive:true});box.querySelector('img').addEventListener('touchend',function(e){if(startX===null)return;var delta=e.changedTouches[0].clientX-startX;if(Math.abs(delta)>60)show(current+(delta<0?1:-1));startX=null;},{passive:true});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(!box.hidden)close();else if(!menu.hidden){closeMenu();burger.focus();}}if(!box.hidden&&e.key==='ArrowRight')show(current+1);if(!box.hidden&&e.key==='ArrowLeft')show(current-1);if(e.key==='Tab'&&(!box.hidden||!menu.hidden)){var list=!box.hidden?Array.from(box.querySelectorAll('button')):[burger].concat(Array.from(menu.querySelectorAll('a'))),first=list[0],last=list[list.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
 document.querySelector('#form').addEventListener('submit',function(e){e.preventDefault();var lines=[];new FormData(e.target).forEach(function(v,k){lines.push(k+': '+v);});document.querySelector('#form-ok').hidden=false;location.href='mailto:pllvalentina@hotmail.com?subject='+encodeURIComponent('Cotización Finca Pastoria')+'&body='+encodeURIComponent(lines.join('\n'));});
}());
