function coLoad(){return JSON.parse(localStorage.getItem('codex-data')||'{}')}
function coSave(d){localStorage.setItem('codex-data',JSON.stringify(d))}
function drawCompany(){
  let box=document.getElementById('quick-company-widget');
  if(!box){box=document.createElement('section');box.id='quick-company-widget';document.body.appendChild(box)}
  const d=coLoad();const c=d.CompanyProfile||{};
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Profil compagnie</h2><input id="co-name" placeholder="Nom compagnie" value="'+(c.name||'')+'"><input id="co-phone" placeholder="Telephone" value="'+(c.phone||'')+'"><input id="co-email" placeholder="Email" value="'+(c.email||'')+'"><input id="co-address" placeholder="Adresse" value="'+(c.address||'')+'"><input id="co-tax" placeholder="Numero taxe" value="'+(c.tax||'')+'"><input id="co-wcb" placeholder="WCB" value="'+(c.wcb||'')+'"><input id="co-ins" placeholder="Assurance responsabilite" value="'+(c.insurance||'')+'"><input id="co-logo" placeholder="Logo URL" value="'+(c.logo||'')+'"><button id="co-save">Sauver profil compagnie</button>';
  box.querySelectorAll('input,button').forEach(x=>x.style.cssText='width:100%;margin:5px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:800');
  document.getElementById('co-save').onclick=()=>{const data=coLoad();data.CompanyProfile={name:document.getElementById('co-name').value,phone:document.getElementById('co-phone').value,email:document.getElementById('co-email').value,address:document.getElementById('co-address').value,tax:document.getElementById('co-tax').value,wcb:document.getElementById('co-wcb').value,insurance:document.getElementById('co-ins').value,logo:document.getElementById('co-logo').value};coSave(data);alert('Profil sauvegarde')};
}
setTimeout(drawCompany,1500);
