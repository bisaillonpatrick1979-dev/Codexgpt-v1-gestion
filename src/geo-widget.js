function geoDraw(){
  let box=document.getElementById('quick-geo-widget');
  if(!box){box=document.createElement('section');box.id='quick-geo-widget';document.body.appendChild(box)}
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  const last=localStorage.getItem('codex-last-position')||'Aucune position';
  box.innerHTML='<h2>GPS chantier</h2><p id="geo-info">'+last+'</p><button id="geo-btn" style="width:100%;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:900">Lire position</button><p><small>Base pour controle chantier 25 m. Le blocage automatique sera ajoute plus tard.</small></p>';
  document.getElementById('geo-btn').onclick=()=>{
    const info=document.getElementById('geo-info');
    if(!navigator.geolocation){info.textContent='GPS non disponible';return}
    info.textContent='Lecture GPS...';
    navigator.geolocation.getCurrentPosition(p=>{
      const txt='Latitude: '+p.coords.latitude.toFixed(6)+' | Longitude: '+p.coords.longitude.toFixed(6)+' | Precision: '+Math.round(p.coords.accuracy)+' m';
      localStorage.setItem('codex-last-position',txt);info.textContent=txt;
    },()=>{info.textContent='Permission GPS refusee ou indisponible'});
  };
}
setTimeout(geoDraw,1300);
