function pwMoney(v){return Number(String(v||'').replace(',','.').replace(/[^0-9.-]/g,''))||0}
function pwLineTotal(r){return pwMoney(r.Quantite)*pwMoney(r['Prix CAD'])||pwMoney(r['Total CAD'])}
function pwNet(r){let base=pwMoney(r['Montant CAD']);return base+(base*(pwMoney(r['Taxe %'])/100))-pwMoney(r['Remise CAD'])-pwMoney(r['Depot CAD'])}
function drawPrintWidget(){
  let box=document.getElementById('quick-print-widget');
  if(!box){box=document.createElement('section');box.id='quick-print-widget';document.body.appendChild(box)}
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Impression rapide</h2><input id="pw-num" placeholder="Numero facture/devis/contrat" style="width:100%;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit"><button id="pw-go" style="margin-top:10px;width:100%;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:900">Ouvrir document imprimable</button>';
  document.getElementById('pw-go').onclick=()=>{
    const num=document.getElementById('pw-num').value.trim();if(!num){alert('Entre un numero');return}
    const data=JSON.parse(localStorage.getItem('codex-data')||'{}');
    const pools=[...(data.Factures||[]),...(data.Devis||[]),...(data.Contrats||[]),...(data['Mes factures']||[])];
    const doc=pools.find(x=>String(x.Numero||'')===num);if(!doc){alert('Document introuvable');return}
    const lines=(data.Lignes||[]).filter(x=>String(x.Document||'')===num);
    const sign=localStorage.getItem('codex-sign-name')||doc.Signature||'';const sdate=localStorage.getItem('codex-sign-date')||doc['Date signature']||'';
    const rows=lines.map(l=>'<tr><td>'+String(l.Description||'')+'</td><td>'+String(l.Quantite||'')+'</td><td>'+String(l.Unite||'')+'</td><td>'+String(l['Prix CAD']||'')+'</td><td>'+pwLineTotal(l).toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+'</td></tr>').join('');
    const html='<!doctype html><html><head><title>'+num+'</title><style>body{font-family:Arial;color:#111;padding:32px}header{display:flex;justify-content:space-between;border-bottom:3px solid #111;padding-bottom:16px}h1{font-size:36px}table{width:100%;border-collapse:collapse;margin-top:24px}th,td{border:1px solid #ddd;padding:10px;text-align:left}.total{font-size:24px;font-weight:900;text-align:right;margin-top:24px}.sig{margin-top:60px;width:320px;border-top:2px solid #111;padding-top:10px}</style></head><body><header><div><h1>Document '+num+'</h1><p>CodexGPT Gestion</p></div><div><b>Client:</b> '+String(doc.Client||'')+'<br><b>Chantier:</b> '+String(doc.Chantier||'')+'<br><b>Statut:</b> '+String(doc.Statut||'')+'</div></header><table><tr><th>Description</th><th>Qte</th><th>Unite</th><th>Prix</th><th>Total</th></tr>'+rows+'</table><div class="total">Total net: '+pwNet(doc).toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+'</div><p>Notes: '+String(doc.Notes||'')+'</p><div class="sig">Signature: '+sign+'<br>Date: '+sdate+'</div></body></html>';
    const w=window.open('','_blank');w.document.write(html);w.document.close();w.print();
  };
}
setTimeout(drawPrintWidget,1100);
