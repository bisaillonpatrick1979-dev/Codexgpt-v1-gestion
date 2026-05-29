function pyMoney(v){return Number(String(v||'').replace(',','.').replace(/[^0-9.-]/g,''))||0}
function pyLoad(){return JSON.parse(localStorage.getItem('codex-data')||'{}')}
function pySave(d){localStorage.setItem('codex-data',JSON.stringify(d))}
function drawPayroll(){
  let box=document.getElementById('quick-payroll-widget');
  if(!box){box=document.createElement('section');box.id='quick-payroll-widget';document.body.appendChild(box)}
  const d=pyLoad();d.Payroll=d.Payroll||[];
  const total=d.Payroll.reduce((s,x)=>s+pyMoney(x.amount),0);
  const list=d.Payroll.slice(-6).reverse().map(p=>'<div style="padding:10px;border:1px solid #ffffff22;border-radius:14px;margin-top:8px"><b>'+p.name+'</b> | '+p.type+' | '+p.status+'<br>'+pyMoney(p.amount).toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+' | '+p.period+'</div>').join('');
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Paie rapide</h2><p>Total paie: <b>'+total.toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+'</b></p><input id="py-name" placeholder="Nom employe ou sous-traitant"><input id="py-type" placeholder="Type: heure, pi2, job"><input id="py-period" placeholder="Periode"><input id="py-amount" placeholder="Montant CAD"><input id="py-status" placeholder="Statut: a payer, paye"><button id="py-save">Ajouter paie</button>'+list;
  box.querySelectorAll('input,button').forEach(x=>x.style.cssText='width:100%;margin:5px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:800');
  document.getElementById('py-save').onclick=()=>{const data=pyLoad();data.Payroll=data.Payroll||[];data.Payroll.push({id:Date.now(),name:document.getElementById('py-name').value||'Travailleur',type:document.getElementById('py-type').value||'heure',period:document.getElementById('py-period').value||'periode',amount:document.getElementById('py-amount').value||0,status:document.getElementById('py-status').value||'a payer'});pySave(data);drawPayroll()};
}
setTimeout(drawPayroll,1700);
