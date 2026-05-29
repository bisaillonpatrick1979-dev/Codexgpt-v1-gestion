function lgLoad(){return JSON.parse(localStorage.getItem('codex-data')||'{}')}
function lgSave(d){localStorage.setItem('codex-data',JSON.stringify(d))}
function drawLegal(){
  let box=document.getElementById('quick-legal-widget');
  if(!box){box=document.createElement('section');box.id='quick-legal-widget';document.body.appendChild(box)}
  const d=lgLoad();const ok=d.LegalConsent||{};
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Mentions / autorisations</h2><label><input id="lg-terms" type="checkbox"> Conditions utilisees acceptees</label><label><input id="lg-privacy" type="checkbox"> Confidentialite acceptee</label><label><input id="lg-gps" type="checkbox"> Autorisation GPS expliquee</label><label><input id="lg-photo" type="checkbox"> Autorisation photos expliquee</label><label><input id="lg-local" type="checkbox"> Stockage local compris</label><button id="lg-save">Sauver consentements</button><p>Derniere acceptation: '+(ok.date||'aucune')+'</p>';
  box.querySelectorAll('label').forEach(x=>x.style.cssText='display:block;margin:8px 0;font-weight:800');
  box.querySelectorAll('button').forEach(x=>x.style.cssText='width:100%;margin:8px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:900');
  document.getElementById('lg-terms').checked=!!ok.terms;document.getElementById('lg-privacy').checked=!!ok.privacy;document.getElementById('lg-gps').checked=!!ok.gps;document.getElementById('lg-photo').checked=!!ok.photo;document.getElementById('lg-local').checked=!!ok.local;
  document.getElementById('lg-save').onclick=()=>{const data=lgLoad();data.LegalConsent={date:new Date().toLocaleString('fr-CA'),terms:document.getElementById('lg-terms').checked,privacy:document.getElementById('lg-privacy').checked,gps:document.getElementById('lg-gps').checked,photo:document.getElementById('lg-photo').checked,local:document.getElementById('lg-local').checked};lgSave(data);drawLegal()};
}
setTimeout(drawLegal,2600);
