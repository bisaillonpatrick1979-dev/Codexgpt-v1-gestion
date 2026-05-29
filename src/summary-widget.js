function smMoney(v){return Number(String(v||'').replace(',','.').replace(/[^0-9.-]/g,''))||0}
function smLine(r){return smMoney(r.Quantite)*smMoney(r['Prix CAD'])||smMoney(r['Total CAD'])}
function smNet(r){let b=smMoney(r['Montant CAD']);return b+(b*(smMoney(r['Taxe %'])/100))-smMoney(r['Remise CAD'])-smMoney(r['Depot CAD'])}
function drawSummary(){
  let box=document.getElementById('quick-summary-widget');
  if(!box){box=document.createElement('section');box.id='quick-summary-widget';document.body.insertBefore(box,document.body.firstChild.nextSibling)}
  const d=JSON.parse(localStorage.getItem('codex-data')||'{}');
  const rev=(d.Factures||[]).reduce((s,x)=>s+smNet(x),0);
  const exp=(d.Comptabilite||[]).reduce((s,x)=>s+smMoney(x['Montant CAD']),0);
  const punch=(d.Punchs||[]).reduce((s,x)=>s+smMoney(x['Montant CAD']),0);
  const lines=(d.Lignes||[]).reduce((s,x)=>s+smLine(x),0);
  const profit=rev-exp;
  const cards=[['Revenus',rev],['Depenses',exp],['Profit',profit],['Punchs',punch],['Lignes',lines]];
  const counts=[['Clients',(d.Clients||[]).length],['Employes',(d.Employes||[]).length],['Chantiers',(d.Chantiers||[]).length],['Factures',(d.Factures||[]).length],['Photos',(d.Photos||[]).length],['Breaks',(d.Breaks||[]).length]];
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.10);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Resume rapide</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px">'+cards.map(c=>'<div style="padding:12px;border:1px solid #ffffff22;border-radius:14px;background:#ffffff12"><b>'+c[0]+'</b><br>'+c[1].toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+'</div>').join('')+counts.map(c=>'<div style="padding:12px;border:1px solid #ffffff22;border-radius:14px;background:#ffffff12"><b>'+c[0]+'</b><br>'+c[1]+'</div>').join('')+'</div><button id="sm-refresh" style="width:100%;margin-top:10px;padding:12px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:900">Rafraichir resume</button>';
  document.getElementById('sm-refresh').onclick=drawSummary;
}
setTimeout(drawSummary,650);
