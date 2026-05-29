function compactUi(){
  const style=document.createElement('style');
  style.textContent=`
    .list .card{cursor:pointer;position:relative;padding-right:18px}.list .card>div:not(:first-child):not(.actions):not(.row):not(.summary){display:none}.list .card.expanded>div{display:block}.list .card:after{content:' toucher pour details';display:block;opacity:.65;font-size:12px;margin-top:6px}.list .card.expanded:after{content:' details ouverts'}
    #quick-module-center{margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:24px;background:rgba(255,255,255,.09);color:inherit;font-family:Arial,sans-serif}.compact-tabs{display:flex;gap:8px;overflow:auto;padding-bottom:8px}.compact-tabs button{white-space:nowrap;padding:12px 14px;border-radius:999px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:900}.compact-tabs button.active{background:#facc15;color:#111}.compact-panel{display:none}.compact-panel.active{display:block}.compact-panel section{margin:10px 0!important}.directForm{max-height:55vh;overflow:auto}.modal.moduleModal{max-height:92vh;overflow:auto}.tabs{max-height:62vh;overflow:auto}.workspace .card{font-size:16px}`;
  document.head.appendChild(style);
  document.addEventListener('click',e=>{const card=e.target.closest('.list .card');if(card&&!e.target.closest('button'))card.classList.toggle('expanded')});
  const groups={Resume:['quick-summary-widget','quick-month-calendar'],Bureau:['quick-company-widget','quick-tax-widget','quick-money-widget','quick-backup-widget'],Chantiers:['quick-planning-widget','quick-closeout-widget','quick-extra-widget','quick-photo-widget','quick-field-help-widget'],Finance:['quick-print-widget','quick-payroll-widget','quick-payment-widget','quick-job-profit-widget'],Terrain:['quick-break-widget','quick-geo-widget','quick-inventory-widget','quick-rental-widget','quick-reward-widget']};
  let wrap=document.getElementById('quick-module-center');
  if(!wrap){wrap=document.createElement('section');wrap.id='quick-module-center';const root=document.getElementById('root');root.after(wrap)}
  wrap.innerHTML='<h2>Modules compacts</h2><div class="compact-tabs"></div><div class="compact-body"></div>';
  const tabs=wrap.querySelector('.compact-tabs'),body=wrap.querySelector('.compact-body');
  Object.keys(groups).forEach((g,i)=>{const b=document.createElement('button');b.textContent=g;b.className=i===0?'active':'';b.onclick=()=>{tabs.querySelectorAll('button').forEach(x=>x.classList.remove('active'));body.querySelectorAll('.compact-panel').forEach(x=>x.classList.remove('active'));b.classList.add('active');body.querySelector('[data-panel="'+g+'"]').classList.add('active')};tabs.appendChild(b);const p=document.createElement('div');p.className='compact-panel '+(i===0?'active':'');p.dataset.panel=g;body.appendChild(p)});
  let tries=0;const move=()=>{tries++;Object.entries(groups).forEach(([g,ids])=>{const p=body.querySelector('[data-panel="'+g+'"]');ids.forEach(id=>{const el=document.getElementById(id);if(el&&el.parentElement!==p)p.appendChild(el)})});if(tries<18)setTimeout(move,300)};move();
}
setTimeout(compactUi,3200);
