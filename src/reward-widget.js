function rwLoad(){return JSON.parse(localStorage.getItem('codex-data')||'{}')}
function rwSave(d){localStorage.setItem('codex-data',JSON.stringify(d))}
function drawRewards(){
  let box=document.getElementById('quick-reward-widget');
  if(!box){box=document.createElement('section');box.id='quick-reward-widget';document.body.appendChild(box)}
  const d=rwLoad();d.Goals=d.Goals||[];
  const list=d.Goals.slice(-6).reverse().map(x=>'<div style="padding:10px;border:1px solid #ffffff22;border-radius:14px;margin-top:8px"><b>'+x.goal+'</b> | '+x.owner+' | '+x.status+'<br>Cible: '+x.target+'<br>Recompense: '+x.reward+'<br>Suivi: '+x.progress+'</div>').join('');
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Objectifs / recompenses</h2><input id="rw-owner" placeholder="Equipe ou personne"><input id="rw-goal" placeholder="Objectif"><input id="rw-target" placeholder="Cible"><input id="rw-reward" placeholder="Recompense"><input id="rw-progress" placeholder="Progression"><input id="rw-status" placeholder="Statut"><button id="rw-save">Ajouter objectif</button>'+list;
  box.querySelectorAll('input,button').forEach(x=>x.style.cssText='width:100%;margin:5px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:800');
  document.getElementById('rw-save').onclick=()=>{const data=rwLoad();data.Goals=data.Goals||[];data.Goals.push({id:Date.now(),owner:document.getElementById('rw-owner').value||'Equipe',goal:document.getElementById('rw-goal').value||'Objectif',target:document.getElementById('rw-target').value||'',reward:document.getElementById('rw-reward').value||'',progress:document.getElementById('rw-progress').value||'0%',status:document.getElementById('rw-status').value||'actif'});rwSave(data);drawRewards()};
}
setTimeout(drawRewards,2500);
