function drawSignBox(){
  let box=document.getElementById('quick-sign-widget');
  if(!box){box=document.createElement('section');box.id='quick-sign-widget';document.body.appendChild(box)}
  box.style.cssText='margin:12px;padding:16px;border:1px solid #ffffff22;border-radius:22px;background:rgba(255,255,255,.08);color:inherit;font-family:Arial,sans-serif';
  const saved=localStorage.getItem('codex-sign-name')||'';
  const date=localStorage.getItem('codex-sign-date')||'';
  box.innerHTML='<h2>Signature</h2><input id="sign-name" placeholder="Nom de signature" value="'+saved+'" style="width:100%;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit"><button id="sign-save" style="margin-top:10px;width:100%;padding:14px;border-radius:14px;border:1px solid #ffffff33;background:#ffffff14;color:inherit;font-weight:900">Sauver signature</button><p>Signature: <b>'+saved+'</b><br>Date: '+date+'</p>';
  document.getElementById('sign-save').onclick=()=>{localStorage.setItem('codex-sign-name',document.getElementById('sign-name').value);localStorage.setItem('codex-sign-date',new Date().toLocaleDateString('fr-CA'));drawSignBox()};
}
setTimeout(drawSignBox,1000);
