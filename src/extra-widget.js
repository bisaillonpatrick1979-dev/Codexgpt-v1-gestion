function exMoney(v){return Number(String(v||'').replace(',','.').replace(/[^0-9.-]/g,''))||0}
function exLoad(){return JSON.parse(localStorage.getItem('codex-data')||'{}')}
function exSave(d){localStorage.setItem('codex-data',JSON.stringify(d))}
function drawExtras(){
  let box=document.getElementById('quick-extra-widget');
  if(!box){box=document.createElement('section');box.id='quick-extra-widget';document.body.appendChild(box)}
  const d=exLoad();d.Extras=d.Extras||[];
  const total=d.Extras.reduce((s,x)=>s+exMoney(x.amount),0);
  const list=d.Extras.slice(-6).reverse().map(x=>'<div style="padding:10px;border:1px solid #ffffff22;border-radius:14px;margin-top:8px"><b>'+x.site+'</b> | '+x.status+'<br>'+x.desc+'<br>'+exMoney(x.amount).toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+' | '+x.photo+'</div>').join('');
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Extras chantier</h2><p>Total extras: <b>'+total.toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+'</b></p><input id="ex-site" placeholder="Chantier"><input id="ex-desc" placeholder="Description extra"><input id="ex-amount" placeholder="Montant CAD"><input id="ex-photo" placeholder="Photo ou note"><input id="ex-status" placeholder="Statut: propose, accepte, refuse, a facturer"><button id="ex-save">Ajouter extra</button>'+list;
  box.querySelectorAll('input,button').forEach(x=>x.style.cssText='width:100%;margin:5px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:800');
  document.getElementById('ex-save').onclick=()=>{const data=exLoad();data.Extras=data.Extras||[];data.Extras.push({id:Date.now(),date:new Date().toLocaleDateString('fr-CA'),site:document.getElementById('ex-site').value||'Chantier',desc:document.getElementById('ex-desc').value||'Extra',amount:document.getElementById('ex-amount').value||0,photo:document.getElementById('ex-photo').value||'',status:document.getElementById('ex-status').value||'propose'});exSave(data);drawExtras()};
}
setTimeout(drawExtras,2200);
