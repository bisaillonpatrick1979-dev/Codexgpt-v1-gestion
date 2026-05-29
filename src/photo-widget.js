function photoData(){return JSON.parse(localStorage.getItem('codex-data')||'{}')}
function photoSave(d){localStorage.setItem('codex-data',JSON.stringify(d))}
function drawPhotoWidget(){
  let box=document.getElementById('quick-photo-widget');
  if(!box){box=document.createElement('section');box.id='quick-photo-widget';document.body.appendChild(box)}
  const data=photoData();data.Photos=data.Photos||[];
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  const list=data.Photos.slice(-5).reverse().map(p=>'<div style="padding:10px;border:1px solid #ffffff22;border-radius:14px;margin-top:8px"><b>'+p.Type+'</b> | '+p.Chantier+'<br>'+p.URL+'<br><small>'+p.Date+'</small></div>').join('');
  box.innerHTML='<h2>Photos / recus</h2><input id="ph-type" placeholder="Type: avant, apres, recu, dommage" style="width:100%;margin:5px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit"><input id="ph-site" placeholder="Chantier" style="width:100%;margin:5px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit"><input id="ph-url" placeholder="Lien photo ou note fichier" style="width:100%;margin:5px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit"><button id="ph-save" style="width:100%;margin-top:8px;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:900">Sauver photo/recu</button>'+list;
  document.getElementById('ph-save').onclick=()=>{const d=photoData();d.Photos=d.Photos||[];d.Photos.push({id:Date.now(),Date:new Date().toLocaleString('fr-CA'),Type:document.getElementById('ph-type').value||'Photo',Chantier:document.getElementById('ph-site').value||'Non precise',URL:document.getElementById('ph-url').value||'Non precise'});photoSave(d);drawPhotoWidget()};
}
setTimeout(drawPhotoWidget,1200);
