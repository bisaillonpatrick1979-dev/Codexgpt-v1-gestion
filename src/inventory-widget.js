function ivLoad(){return JSON.parse(localStorage.getItem('codex-data')||'{}')}
function ivSave(d){localStorage.setItem('codex-data',JSON.stringify(d))}
function drawInventory(){
  let box=document.getElementById('quick-inventory-widget');
  if(!box){box=document.createElement('section');box.id='quick-inventory-widget';document.body.appendChild(box)}
  const d=ivLoad();d.Inventory=d.Inventory||[];
  const list=d.Inventory.slice(-8).reverse().map(x=>'<div style="padding:10px;border:1px solid #ffffff22;border-radius:14px;margin-top:8px"><b>'+x.item+'</b> | '+x.qty+' '+x.unit+'<br>'+x.place+' | '+x.status+'</div>').join('');
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  box.innerHTML='<h2>Inventaire rapide</h2><input id="iv-item" placeholder="Item"><input id="iv-qty" placeholder="Quantite"><input id="iv-unit" placeholder="Unite"><input id="iv-place" placeholder="Emplacement"><input id="iv-status" placeholder="Statut"><button id="iv-save">Ajouter inventaire</button>'+list;
  box.querySelectorAll('input,button').forEach(x=>x.style.cssText='width:100%;margin:5px 0;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:800');
  document.getElementById('iv-save').onclick=()=>{const data=ivLoad();data.Inventory=data.Inventory||[];data.Inventory.push({id:Date.now(),item:document.getElementById('iv-item').value||'Item',qty:document.getElementById('iv-qty').value||'1',unit:document.getElementById('iv-unit').value||'unite',place:document.getElementById('iv-place').value||'',status:document.getElementById('iv-status').value||'en stock'});ivSave(data);drawInventory()};
}
setTimeout(drawInventory,2800);
