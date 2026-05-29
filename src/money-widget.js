function myLoad(){return JSON.parse(localStorage.getItem('codex-data')||'{}')}
function mySave(d){localStorage.setItem('codex-data',JSON.stringify(d))}
function myNum(v){return Number(String(v||'').replace(',','.').replace(/[^0-9.-]/g,''))||0}
function drawMoneyBox(){
  let box=document.getElementById('quick-money-widget');
  if(!box){box=document.createElement('section');box.id='quick-money-widget';document.body.appendChild(box)}
  const d=myLoad();const s=d.MoneySettings||{base:'CAD',other:'USD',rate:'0.73'};
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Argent / devise</h2><input id="my-base" placeholder="Devise principale" value="'+s.base+'"><input id="my-other" placeholder="Autre devise" value="'+s.other+'"><input id="my-rate" placeholder="Taux" value="'+s.rate+'"><input id="my-amount" placeholder="Montant"><button id="my-save">Sauver</button><button id="my-go">Calculer</button><div id="my-out"></div>';
  box.querySelectorAll('input,button').forEach(x=>x.style.cssText='width:100%;margin:5px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:800');
  document.getElementById('my-save').onclick=()=>{const data=myLoad();data.MoneySettings={base:document.getElementById('my-base').value||'CAD',other:document.getElementById('my-other').value||'USD',rate:document.getElementById('my-rate').value||1};mySave(data);alert('Sauve')};
  document.getElementById('my-go').onclick=()=>{const a=myNum(document.getElementById('my-amount').value);const r=myNum(document.getElementById('my-rate').value)||1;document.getElementById('my-out').textContent='Resultat: '+(a*r).toFixed(2)+' '+(document.getElementById('my-other').value||'USD')};
}
setTimeout(drawMoneyBox,2400);
