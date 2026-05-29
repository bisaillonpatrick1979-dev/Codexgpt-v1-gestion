function plLoad(){return JSON.parse(localStorage.getItem('codex-data')||'{}')}
function plSave(d){localStorage.setItem('codex-data',JSON.stringify(d))}
function drawPlanning(){
  let box=document.getElementById('quick-planning-widget');
  if(!box){box=document.createElement('section');box.id='quick-planning-widget';document.body.appendChild(box)}
  const d=plLoad();d.Planning=d.Planning||[];
  const list=d.Planning.slice(-6).reverse().map(x=>'<div style="padding:10px;border:1px solid #ffffff22;border-radius:14px;margin-top:8px"><b>'+x.person+'</b> | '+x.priority+' | '+x.status+'<br>'+x.site+' | '+x.date+'<br>'+x.notes+'</div>').join('');
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Planification rapide</h2><input id="pl-person" placeholder="Personne"><input id="pl-site" placeholder="Chantier"><input id="pl-date" placeholder="Date"><input id="pl-priority" placeholder="Priorite"><input id="pl-status" placeholder="Statut"><input id="pl-notes" placeholder="Notes"><button id="pl-save">Ajouter planification</button>'+list;
  box.querySelectorAll('input,button').forEach(x=>x.style.cssText='width:100%;margin:5px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:800');
  document.getElementById('pl-save').onclick=()=>{const data=plLoad();data.Planning=data.Planning||[];data.Planning.push({id:Date.now(),person:document.getElementById('pl-person').value||'Personne',site:document.getElementById('pl-site').value||'Chantier',date:document.getElementById('pl-date').value||new Date().toLocaleDateString('fr-CA'),priority:document.getElementById('pl-priority').value||'Normal',status:document.getElementById('pl-status').value||'Planifie',notes:document.getElementById('pl-notes').value||''});plSave(data);drawPlanning()};
}
setTimeout(drawPlanning,2000);
