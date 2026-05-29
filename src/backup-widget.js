function backupDraw(){
  let box=document.getElementById('quick-backup-widget');
  if(!box){box=document.createElement('section');box.id='quick-backup-widget';document.body.appendChild(box)}
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Sauvegarde rapide</h2><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><button id="bk-export">Exporter JSON</button><label id="bk-label">Importer JSON<input id="bk-file" type="file" accept="application/json" style="display:none"></label></div><button id="bk-reset">Reset local</button><p><small>Utilise cette sauvegarde avant de tester beaucoup de changements.</small></p>';
  box.querySelectorAll('button,label').forEach(x=>x.style.cssText='display:block;text-align:center;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:900;margin-top:8px');
  document.getElementById('bk-export').onclick=()=>{const blob=new Blob([localStorage.getItem('codex-data')||'{}'],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='codex-backup.json';a.click()};
  document.getElementById('bk-file').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{JSON.parse(r.result);localStorage.setItem('codex-data',r.result);alert('Import termine');location.reload()}catch{alert('Fichier invalide')}};r.readAsText(f)};
  document.getElementById('bk-reset').onclick=()=>{if(confirm('Effacer les donnees locales?')){localStorage.removeItem('codex-data');localStorage.removeItem('codex-onboarding-done');location.reload()}};
}
setTimeout(backupDraw,1400);
