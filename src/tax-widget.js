function txLoad(){return JSON.parse(localStorage.getItem('codex-data')||'{}')}
function txSave(d){localStorage.setItem('codex-data',JSON.stringify(d))}
function drawTax(){
  let box=document.getElementById('quick-tax-widget');
  if(!box){box=document.createElement('section');box.id='quick-tax-widget';document.body.appendChild(box)}
  const d=txLoad();d.TaxProfiles=d.TaxProfiles||[];
  const list=d.TaxProfiles.map(t=>'<div style="padding:10px;border:1px solid #ffffff22;border-radius:14px;margin-top:8px"><b>'+t.name+'</b><br>'+t.rate+' % | '+t.region+'</div>').join('');
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Taxes rapides</h2><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><button id="tx-ab">Alberta GST 5%</button><button id="tx-qc">Quebec TPS+TVQ 14.975%</button></div><input id="tx-name" placeholder="Nom taxe"><input id="tx-rate" placeholder="Pourcentage"><input id="tx-region" placeholder="Region"><button id="tx-save">Sauver taxe</button>'+list;
  box.querySelectorAll('input,button').forEach(x=>x.style.cssText='width:100%;margin:5px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:800');
  function add(name,rate,region){const data=txLoad();data.TaxProfiles=data.TaxProfiles||[];data.TaxProfiles.push({id:Date.now(),name,rate,region});txSave(data);drawTax()}
  document.getElementById('tx-ab').onclick=()=>add('GST',5,'Alberta');
  document.getElementById('tx-qc').onclick=()=>add('TPS + TVQ',14.975,'Quebec');
  document.getElementById('tx-save').onclick=()=>add(document.getElementById('tx-name').value||'Taxe',document.getElementById('tx-rate').value||0,document.getElementById('tx-region').value||'Region');
}
setTimeout(drawTax,1600);
