function money(v){return Number(String(v||'').replace(',','.').replace(/[^0-9.-]/g,''))||0}
function key(d){return d.toLocaleDateString('fr-CA')}
function drawCalendar(offset=0){
  const data=JSON.parse(localStorage.getItem('codex-data')||'{}');
  const punches=data.Punchs||[];
  const base=new Date();
  const cur=new Date(base.getFullYear(),base.getMonth()+offset,1);
  const y=cur.getFullYear(),m=cur.getMonth();
  const first=new Date(y,m,1);
  const start=new Date(y,m,1-first.getDay());
  const days=Array.from({length:42},(_,i)=>new Date(start.getFullYear(),start.getMonth(),start.getDate()+i));
  let wrap=document.getElementById('quick-month-calendar');
  if(!wrap){wrap=document.createElement('section');wrap.id='quick-month-calendar';document.body.appendChild(wrap)}
  wrap.innerHTML='';
  wrap.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  const title=document.createElement('div');title.style.cssText='display:flex;gap:10px;align-items:center;justify-content:space-between;margin-bottom:12px';
  const prev=document.createElement('button');prev.textContent='◀';
  const next=document.createElement('button');next.textContent='▶';
  const h=document.createElement('h2');h.textContent=cur.toLocaleDateString('fr-CA',{month:'long',year:'numeric'});h.style.margin='0';
  prev.onclick=()=>drawCalendar(offset-1);next.onclick=()=>drawCalendar(offset+1);
  title.append(prev,h,next);wrap.append(title);
  const grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(7,1fr);gap:7px';
  ['D','L','M','M','J','V','S'].forEach(x=>{const e=document.createElement('b');e.textContent=x;e.style.textAlign='center';grid.append(e)});
  days.forEach(d=>{
    const k=key(d);const list=punches.filter(p=>p.Date===k);const amt=list.reduce((s,p)=>s+money(p['Montant CAD']),0);const hrs=list.length*8;
    const cell=document.createElement('button');cell.type='button';cell.innerHTML='<b>'+d.getDate()+'</b><br><small>'+hrs+' h<br>'+amt.toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+'</small>';
    const bg=hrs===0?'#94a3b8':hrs<4?'#3b82f6':hrs<8?'#22c55e':hrs<12?'#f59e0b':'#ef4444';
    cell.style.cssText='min-height:78px;border:1px solid #ffffff33;border-radius:14px;padding:8px;background:'+bg+';color:#111;font-weight:800;opacity:'+(d.getMonth()===m?1:.38);
    cell.onclick=()=>alert(k+'\nHeures: '+hrs+' h\nMontant: '+amt.toLocaleString('fr-CA',{style:'currency',currency:'CAD'})+'\nPunchs: '+list.length);
    grid.append(cell);
  });
  wrap.append(grid);
}
setTimeout(()=>drawCalendar(0),800);
