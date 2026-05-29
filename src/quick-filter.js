function quickFilter(){
  const css=document.createElement('style');css.textContent='.quickFilterBox{width:100%;padding:13px;margin:8px 0 12px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:800}.filterEmpty{padding:14px;border:1px dashed #ffffff33;border-radius:14px;opacity:.75}';document.head.appendChild(css);
  function addFilter(list){
    if(!list||list.dataset.filterReady)return;list.dataset.filterReady='yes';
    const input=document.createElement('input');input.className='quickFilterBox';input.placeholder='Rechercher dans cette liste...';
    list.parentElement.insertBefore(input,list);
    const empty=document.createElement('div');empty.className='filterEmpty';empty.textContent='Aucun resultat';empty.style.display='none';list.parentElement.insertBefore(empty,list.nextSibling);
    input.addEventListener('input',()=>{const q=input.value.toLowerCase().trim();let shown=0;list.querySelectorAll('.card').forEach(c=>{const ok=!q||c.textContent.toLowerCase().includes(q);c.style.display=ok?'':'none';if(ok)shown++});empty.style.display=shown?'none':'block'});
  }
  const run=()=>document.querySelectorAll('.list').forEach(addFilter);
  setInterval(run,1200);run();
}
setTimeout(quickFilter,3600);
