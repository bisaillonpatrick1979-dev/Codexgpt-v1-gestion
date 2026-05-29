function pmMoney(v){return Number(String(v||'').replace(',','.').replace(/[^0-9.-]/g,''))||0}
function pmLoad(){return JSON.parse(localStorage.getItem('codex-data')||'{}')}
function pmSave(d){localStorage.setItem('codex-data',JSON.stringify(d))}
function drawPayments(){
  let box=document.getElementById('quick-payment-widget');
  if(!box){box=document.createElement('section');box.id='quick-payment-widget';document.body.appendChild(box)}
  const d=pmLoad();d.Payments=d.Payments||[];
  const total=d.Payments.reduce((s,x)=>s+pmMoney(x.amount),0);
  const list=d.Payments.slice(-6).reverse().map(p=>'<div style="padding:10px;border:1px solid #ffffff22;border-radius:14px;margin-top:8px"><b>'+p.invoice+'</b> | '+p.client+'<br>'+pmMoney(p.amount).toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+' | '+p.method+' | '+p.date+'</div>').join('');
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Paiements clients</h2><p>Total recu: <b>'+total.toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+'</b></p><input id="pm-invoice" placeholder="Numero facture"><input id="pm-client" placeholder="Client"><input id="pm-amount" placeholder="Montant CAD"><input id="pm-method" placeholder="Mode: virement, cheque, cash, carte"><button id="pm-save">Ajouter paiement</button>'+list;
  box.querySelectorAll('input,button').forEach(x=>x.style.cssText='width:100%;margin:5px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:800');
  document.getElementById('pm-save').onclick=()=>{const data=pmLoad();data.Payments=data.Payments||[];data.Payments.push({id:Date.now(),date:new Date().toLocaleDateString('fr-CA'),invoice:document.getElementById('pm-invoice').value||'Facture',client:document.getElementById('pm-client').value||'Client',amount:document.getElementById('pm-amount').value||0,method:document.getElementById('pm-method').value||'mode'});pmSave(data);drawPayments()};
}
setTimeout(drawPayments,1800);
