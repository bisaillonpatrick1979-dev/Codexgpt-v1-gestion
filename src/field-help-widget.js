import './money-widget.js';
function fhLoad(){return JSON.parse(localStorage.getItem('codex-data')||'{}')}
function fhSave(d){localStorage.setItem('codex-data',JSON.stringify(d))}
function drawFieldHelp(){
  let box=document.getElementById('quick-field-help-widget');
  if(!box){box=document.createElement('section');box.id='quick-field-help-widget';document.body.appendChild(box)}
  const d=fhLoad();d.FieldHelp=d.FieldHelp||[];
  const list=d.FieldHelp.slice(-5).reverse().map(x=>'<div style="padding:10px;border:1px solid #ffffff22;border-radius:14px;margin-top:8px"><b>'+x.site+'</b> | '+x.status+'<br><b>Q:</b> '+x.question+'<br><b>R:</b> '+x.answer+'</div>').join('');
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Aide chantier</h2><input id="fh-site" placeholder="Chantier"><textarea id="fh-question" placeholder="Question terrain" style="min-height:80px"></textarea><textarea id="fh-answer" placeholder="Solution / reponse" style="min-height:80px"></textarea><input id="fh-status" placeholder="Statut"><button id="fh-save">Sauver aide</button>'+list;
  box.querySelectorAll('input,textarea,button').forEach(x=>x.style.cssText='width:100%;margin:5px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:800');
  document.getElementById('fh-save').onclick=()=>{const data=fhLoad();data.FieldHelp=data.FieldHelp||[];data.FieldHelp.push({id:Date.now(),date:new Date().toLocaleDateString('fr-CA'),site:document.getElementById('fh-site').value||'Chantier',question:document.getElementById('fh-question').value||'',answer:document.getElementById('fh-answer').value||'',status:document.getElementById('fh-status').value||'ouvert'});fhSave(data);drawFieldHelp()};
}
setTimeout(drawFieldHelp,2300);
