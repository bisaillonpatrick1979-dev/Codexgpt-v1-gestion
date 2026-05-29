function jpMoney(v){return Number(String(v||'').replace(',','.').replace(/[^0-9.-]/g,''))||0}
function jpNet(r){let b=jpMoney(r['Montant CAD']);return b+(b*(jpMoney(r['Taxe %'])/100))-jpMoney(r['Remise CAD'])-jpMoney(r['Depot CAD'])}
function jpLoad(){return JSON.parse(localStorage.getItem('codex-data')||'{}')}
function drawJobProfit(){
  let box=document.getElementById('quick-job-profit-widget');
  if(!box){box=document.createElement('section');box.id='quick-job-profit-widget';document.body.appendChild(box)}
  const d=jpLoad();
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Profit chantier rapide</h2><input id="jp-key" placeholder="Nom chantier ou client"><button id="jp-go">Calculer profit</button><div id="jp-out"></div>';
  box.querySelectorAll('input,button').forEach(x=>x.style.cssText='width:100%;margin:5px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:800');
  document.getElementById('jp-go').onclick=()=>{
    const k=document.getElementById('jp-key').value.toLowerCase();
    const inv=(d.Factures||[]).filter(x=>(String(x.Chantier||'')+String(x.Client||'')).toLowerCase().includes(k)).reduce((s,x)=>s+jpNet(x),0);
    const exp=(d.Comptabilite||[]).filter(x=>String(x.Description||'').toLowerCase().includes(k)||String(x.Categorie||'').toLowerCase().includes(k)).reduce((s,x)=>s+jpMoney(x['Montant CAD']),0);
    const pay=(d.Payroll||[]).filter(x=>(String(x.name||'')+String(x.period||'')).toLowerCase().includes(k)).reduce((s,x)=>s+jpMoney(x.amount),0);
    const received=(d.Payments||[]).filter(x=>(String(x.client||'')+String(x.invoice||'')).toLowerCase().includes(k)).reduce((s,x)=>s+jpMoney(x.amount),0);
    const profit=inv-exp-pay;
    document.getElementById('jp-out').innerHTML='<div style="padding:12px;border:1px solid #ffffff22;border-radius:14px;margin-top:8px"><b>Facture:</b> '+inv.toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+'<br><b>Paiements recus:</b> '+received.toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+'<br><b>Depenses:</b> '+exp.toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+'<br><b>Paie:</b> '+pay.toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+'<br><b>Profit estimé:</b> '+profit.toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+'</div>';
  };
}
setTimeout(drawJobProfit,1900);
