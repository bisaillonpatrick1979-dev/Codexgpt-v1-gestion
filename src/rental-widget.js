function rtNum(v){return Number(String(v||'').replace(',','.').replace(/[^0-9.-]/g,''))||0}
function rtLoad(){return JSON.parse(localStorage.getItem('codex-data')||'{}')}
function rtSave(d){localStorage.setItem('codex-data',JSON.stringify(d))}
function drawRental(){
  let box=document.getElementById('quick-rental-widget');
  if(!box){box=document.createElement('section');box.id='quick-rental-widget';document.body.appendChild(box)}
  const d=rtLoad();d.Rentals=d.Rentals||[];
  const total=d.Rentals.reduce((s,x)=>s+rtNum(x.cost),0);
  const list=d.Rentals.slice(-6).reverse().map(x=>'<div style="padding:10px;border:1px solid #ffffff22;border-radius:14px;margin-top:8px"><b>'+x.item+'</b> | '+x.vendor+'<br>'+x.site+' | '+x.start+' → '+x.end+'<br>'+rtNum(x.cost).toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+' | '+x.status+'</div>').join('');
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Locations equipement</h2><p>Total: <b>'+total.toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+'</b></p><input id="rt-item" placeholder="Outil ou machine"><input id="rt-vendor" placeholder="Fournisseur"><input id="rt-site" placeholder="Chantier"><input id="rt-start" placeholder="Date debut"><input id="rt-end" placeholder="Date fin"><input id="rt-cost" placeholder="Cout CAD"><input id="rt-status" placeholder="Statut"><button id="rt-save">Ajouter location</button>'+list;
  box.querySelectorAll('input,button').forEach(x=>x.style.cssText='width:100%;margin:5px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:800');
  document.getElementById('rt-save').onclick=()=>{const data=rtLoad();data.Rentals=data.Rentals||[];data.Rentals.push({id:Date.now(),item:document.getElementById('rt-item').value||'Equipement',vendor:document.getElementById('rt-vendor').value||'',site:document.getElementById('rt-site').value||'',start:document.getElementById('rt-start').value||'',end:document.getElementById('rt-end').value||'',cost:document.getElementById('rt-cost').value||0,status:document.getElementById('rt-status').value||'actif'});rtSave(data);drawRental()};
}
setTimeout(drawRental,2900);
