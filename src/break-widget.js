function now(){return new Date().toLocaleString('fr-CA')}
function today(){return new Date().toLocaleDateString('fr-CA')}
function load(){return JSON.parse(localStorage.getItem('codex-data')||'{}')}
function save(d){localStorage.setItem('codex-data',JSON.stringify(d))}
function drawBreakBox(){
  let box=document.getElementById('quick-break-widget');
  if(!box){box=document.createElement('section');box.id='quick-break-widget';document.body.appendChild(box)}
  const active=localStorage.getItem('active-break-start')||'';
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Break rapide</h2><input id="break-site" placeholder="Chantier ou adresse" style="width:100%;margin:6px 0 10px;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit"><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><button id="break-start">Debut break</button><button id="break-stop">Fin break</button></div><p id="break-state"></p>';
  box.querySelectorAll('button').forEach(b=>b.style.cssText='padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:900');
  const state=box.querySelector('#break-state');state.textContent=active?'Break actif depuis: '+active:'Aucun break actif';
  box.querySelector('#break-start').onclick=()=>{localStorage.setItem('active-break-start',now());drawBreakBox()};
  box.querySelector('#break-stop').onclick=()=>{
    const start=localStorage.getItem('active-break-start');
    if(!start){alert('Aucun break actif');return}
    const site=document.getElementById('break-site').value||'Chantier non precise';
    const data=load();data.Breaks=data.Breaks||[];
    data.Breaks.push({id:Date.now(),Date:today(),'Debut break':start,'Fin break':now(),Chantier:site,Notes:'Ajoute depuis break rapide'});
    save(data);localStorage.removeItem('active-break-start');alert('Break sauvegarde');drawBreakBox();
  };
}
setTimeout(drawBreakBox,900);
