function textAfterLabel(html){const div=document.createElement('div');div.innerHTML=html;return div.textContent.replace(/^[^:]+:\s*/,'').trim()}
function bestTitle(card){
  const rows=[...card.querySelectorAll('div')].filter(x=>!x.className.includes('row')&&!x.className.includes('actions'));
  const map={};rows.forEach(r=>{const t=r.textContent||'';const i=t.indexOf(':');if(i>0)map[t.slice(0,i).trim().toLowerCase()]=t.slice(i+1).trim()});
  const keys=['nom legal','nom compagnie','nom personne','contact principal','client','chantier','numero','item','objectif','description','outil ou machine','personne','employe ou sous-traitant','type client'];
  for(const k of keys){if(map[k])return map[k]}
  return textAfterLabel(rows[0]?.innerHTML||'Carte');
}
function optimizeCardTitles(){
  document.querySelectorAll('.list .card').forEach(card=>{
    if(card.querySelector('.smart-card-title'))return;
    const title=bestTitle(card);
    const sub=[...card.querySelectorAll('div')].slice(1,3).map(x=>textAfterLabel(x.innerHTML)).filter(Boolean).join(' • ');
    const head=document.createElement('div');head.className='smart-card-title';
    head.innerHTML='<b>'+title+'</b>'+(sub?'<small>'+sub+'</small>':'');
    card.insertBefore(head,card.firstChild);
  });
}
const css=document.createElement('style');css.textContent='.smart-card-title{display:block!important;padding:6px 0 10px}.smart-card-title b{display:block;font-size:18px}.smart-card-title small{display:block;opacity:.72;margin-top:4px}.list .card>.smart-card-title~div:not(.actions):not(.row):not(.summary){display:none!important}';document.head.appendChild(css);
setInterval(optimizeCardTitles,1200);setTimeout(optimizeCardTitles,700);
