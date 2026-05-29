import './card-title-optimizer.js';
function sdLoad(){try{return JSON.parse(localStorage.getItem('codex-data')||'{}')}catch{return {}}}
function sdText(v){return String(v||'').trim()}
function sdUnique(a){return [...new Set(a.map(sdText).filter(Boolean))].slice(0,80)}
function sdOptions(){const d=sdLoad();return{
  client:sdUnique([...(d.Clients||[]).map(x=>x['Nom compagnie']||x['Nom personne']||x['Contact principal']),...(d.Factures||[]).map(x=>x.Client),...(d.Devis||[]).map(x=>x.Client)]),
  chantier:sdUnique([...(d.Chantiers||[]).map(x=>x.Nom||x.Adresse),...(d.Punchs||[]).map(x=>x.Chantier),...(d.Factures||[]).map(x=>x.Chantier),...(d.Planning||[]).map(x=>x.site)]),
  employe:sdUnique([...(d.Employes||[]).map(x=>x['Nom legal']),...(d.Payroll||[]).map(x=>x.name),...(d.Planning||[]).map(x=>x.person)]),
  sous:sdUnique([...(d['Sous-traitants']||[]).map(x=>x['Nom compagnie']||x.Contact)]),
  document:sdUnique([...(d.Factures||[]).map(x=>x.Numero),...(d.Devis||[]).map(x=>x.Numero),...(d.Contrats||[]).map(x=>x.Numero)]),
  item:sdUnique([...(d.Catalogue||[]).map(x=>x.Item),...(d.Inventory||[]).map(x=>x.item)]),
  status:['Brouillon','Actif','A verifier','A payer','Paye','Envoye','Accepte','Refuse','A facturer','Ferme','Archive'],
  pay:['heure','pi2','job','forfait'],
  unit:['unite','heure','pi2','pi lineaire','boite','rouleau','jour','forfait'],
  tax:['GST 5%','TPS + TVQ 14.975%','0%','Taxable','Non taxable']
}}
function sdKey(ph){ph=String(ph||'').toLowerCase();if(ph.includes('client'))return'client';if(ph.includes('chantier')||ph.includes('adresse'))return'chantier';if(ph.includes('employe')||ph.includes('travailleur')||ph.includes('personne'))return'employe';if(ph.includes('sous'))return'sous';if(ph.includes('document')||ph.includes('facture')||ph.includes('devis')||ph.includes('contrat')||ph.includes('numero'))return'document';if(ph.includes('item')||ph.includes('catalogue')||ph.includes('outil')||ph.includes('machine'))return'item';if(ph.includes('statut'))return'status';if(ph.includes('mode paie')||ph.includes('type paie'))return'pay';if(ph.includes('unite'))return'unit';if(ph.includes('tax')||ph.includes('taxe'))return'tax';return''}
function enhanceDropdowns(){let opts=sdOptions();Object.entries(opts).forEach(([k,arr])=>{let dl=document.getElementById('dl-'+k);if(!dl){dl=document.createElement('datalist');dl.id='dl-'+k;document.body.appendChild(dl)}dl.innerHTML=arr.map(v=>'<option value="'+String(v).replaceAll('"','&quot;')+'"></option>').join('')});document.querySelectorAll('input:not([list])').forEach(inp=>{const k=sdKey(inp.placeholder||inp.name||inp.id);if(k)inp.setAttribute('list','dl-'+k)});}
setInterval(enhanceDropdowns,1500);setTimeout(enhanceDropdowns,900);
