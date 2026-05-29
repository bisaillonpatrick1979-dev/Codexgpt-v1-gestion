function cardDetailModal(){
  const css=document.createElement('style');
  css.textContent=`.detailOverlay{position:fixed;inset:0;z-index:120;background:rgba(0,0,0,.72);display:grid;place-items:center;padding:12px}.detailBox{width:min(680px,100%);max-height:88vh;overflow:auto;border-radius:24px;background:#0f172a;color:#f8fafc;border:1px solid #ffffff33;padding:16px;box-shadow:0 30px 90px #000}.detailBox h2{margin:0 0 12px}.detailRow{padding:10px;border-bottom:1px solid #ffffff18}.detailRow b{display:block;color:#facc15}.detailClose{width:100%;padding:14px;margin-top:12px;border-radius:14px;border:1px solid #ffffff33;background:#facc15;color:#111;font-weight:900}.list .card>div:not(:first-child):not(.actions):not(.row):not(.summary){display:none!important}.list .card.expanded>div:not(:first-child):not(.actions):not(.row):not(.summary){display:none!important}`;
  document.head.appendChild(css);
  document.addEventListener('click',e=>{
    const card=e.target.closest('.list .card');
    if(!card||e.target.closest('button'))return;
    e.preventDefault();e.stopPropagation();
    const rows=[...card.querySelectorAll('div')].filter(x=>!x.className.includes('row')&&!x.className.includes('actions'));
    const title=rows[0]?.textContent?.trim()||'Details';
    const html=rows.map(r=>'<div class="detailRow">'+r.innerHTML+'</div>').join('');
    const o=document.createElement('div');o.className='detailOverlay';
    o.innerHTML='<section class="detailBox"><h2>'+title+'</h2>'+html+'<button class="detailClose">Fermer</button></section>';
    document.body.appendChild(o);
    o.querySelector('.detailClose').onclick=()=>o.remove();
    o.onclick=x=>{if(x.target===o)o.remove()};
  },true);
}
setTimeout(cardDetailModal,3400);
