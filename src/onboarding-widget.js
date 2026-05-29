function obData(){return JSON.parse(localStorage.getItem('codex-data')||'{}')}
function obSave(d){localStorage.setItem('codex-data',JSON.stringify(d))}
function drawOnboarding(){
  if(localStorage.getItem('codex-onboarding-done')==='yes')return;
  let box=document.createElement('div');box.id='quick-onboarding';
  box.style.cssText='position:fixed;inset:0;z-index:80;background:rgba(0,0,0,.78);display:grid;place-items:center;padding:14px;color:#f8fafc;font-family:Arial,sans-serif';
  box.innerHTML='<section style="width:min(560px,100%);background:#0f172a;border:1px solid #ffffff33;border-radius:24px;padding:18px;box-shadow:0 30px 90px #000"><h2>Configuration initiale</h2><p>Choisis les reglages de base.</p><input id="ob-lang" placeholder="Langue: francais, anglais, espagnol" value="Francais"><input id="ob-country" placeholder="Pays" value="Canada"><input id="ob-region" placeholder="Province / Etat" value="Alberta"><input id="ob-currency" placeholder="Devise" value="CAD"><input id="ob-tax" placeholder="Taxe par defaut" value="GST 5%"><input id="ob-week" placeholder="Semaine de paie" value="Lundi-Dimanche"><button id="ob-save">Entrer dans l app</button></section>';
  document.body.appendChild(box);
  box.querySelectorAll('input,button').forEach(x=>x.style.cssText='width:100%;margin:6px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:#f8fafc;font-weight:800');
  document.getElementById('ob-save').onclick=()=>{const d=obData();d.Reglages=d.Reglages||[];d.Reglages.push({id:Date.now(),Langue:document.getElementById('ob-lang').value,Pays:document.getElementById('ob-country').value,'Province ou Etat':document.getElementById('ob-region').value,Devise:document.getElementById('ob-currency').value,'Taxe defaut':document.getElementById('ob-tax').value,'Semaine paie':document.getElementById('ob-week').value});obSave(d);localStorage.setItem('codex-onboarding-done','yes');box.remove()};
}
setTimeout(drawOnboarding,500);
