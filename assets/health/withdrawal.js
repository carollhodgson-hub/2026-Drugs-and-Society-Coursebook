const book=document.getElementById('withdrawalBook');
if(book){
  const pages=[...book.querySelectorAll('.withdrawal-page')],prev=document.getElementById('withdrawalPrev'),next=document.getElementById('withdrawalNext'),dots=document.getElementById('withdrawalDots'),count=document.getElementById('withdrawalCount');
  let active=0;
  pages.forEach((page,i)=>{const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label','Go to withdrawal page '+(i+1)+': '+page.dataset.title);dot.onclick=()=>go(i);dots.append(dot)});
  function go(i){active=Math.max(0,Math.min(pages.length-1,i));book.scrollTo({left:pages[active].offsetLeft,behavior:'smooth'});update()}
  function update(){[...dots.children].forEach((d,i)=>d.setAttribute('aria-current',i===active));count.textContent=(active+1)+' of '+pages.length+' · '+pages[active].dataset.title;prev.disabled=active===0;next.disabled=active===pages.length-1}
  prev.onclick=()=>go(active-1);next.onclick=()=>go(active+1);
  book.addEventListener('scroll',()=>{clearTimeout(book.scrollTimer);book.scrollTimer=setTimeout(()=>{active=Math.round(book.scrollLeft/book.clientWidth);update()},80)});
  book.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(active+1)}if(e.key==='ArrowLeft'){e.preventDefault();go(active-1)}});
  update();
}
