function clLoad(){return JSON.parse(localStorage.getItem('codex-data')||'{}')}
function clSave(d){localStorage.setItem('codex-data',JSON.stringify(d))}
function drawCloseout(){
  let box=document.getElementById('quick-closeout-widget');
  if(!box){box=document.createElement('section');box.id='quick-closeout-widget';document.body.appendChild(box)}
  const d=clLoad();d.Closeout=d.Closeout||[];
  const list=d.Closeout.slice(-5).reverse().map(x=>'<div style="padding:10px;border:1px solid #ffffff22;border-radius:14px;margin-top:8px"><b>'+x.site+'</b> | '+x.status+'<br>'+x.done+'</div>').join('');
  const opts=['heures verifiees','photos finales','extras ajoutes','depenses ajoutees','facture creee','paiement note','signature recue','chantier propre'];
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Fermeture chantier</h2><input id="cl-site" placeholder="Chantier"><div id="cl-list">'+opts.map(o=>'<label style="display:block;margin:6px 0"><input type="checkbox" value="'+o+'"> '+o+'</label>').join('')+'</div><input id="cl-status" placeholder="Statut" value="A verifier"><button id="cl-save">Sauver fermeture</button>'+list;
  box.querySelectorAll('input,button').forEach(x=>{if(x.type!=='checkbox')x.style.cssText='width:100%;margin:5px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:800'});
  document.getElementById('cl-save').onclick=()=>{const data=clLoad();data.Closeout=data.Closeout||[];const checked=[...box.querySelectorAll('input[type=checkbox]:checked')].map(x=>x.value).join(', ');data.Closeout.push({id:Date.now(),site:document.getElementById('cl-site').value||'Chantier',status:document.getElementById('cl-status').value||'A verifier',done:checked||'Rien coche'});clSave(data);drawCloseout()};
}
setTimeout(drawCloseout,2100);
