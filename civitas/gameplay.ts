// CIVITAS first playable civilization loop. Inventory reflects actual world edits.
type CivitasState = {wood:number;stone:number;build:number;settlement:string;founded:boolean};
const civitasKey = "civitas-one-world-v1";
let civitas: CivitasState = (() => {
  try { return {...{wood:0,stone:0,build:0,settlement:"",founded:false},...JSON.parse(localStorage.getItem(civitasKey)||"{}")}; }
  catch { return {wood:0,stone:0,build:0,settlement:"",founded:false}; }
})();
const civitasSave = () => localStorage.setItem(civitasKey,JSON.stringify(civitas));
const civitasUI = document.createElement("section");
civitasUI.id = "civitas-panel";
civitasUI.innerHTML = '<div class="cv-top"><div><span class="cv-eyebrow">ONE WORLD · EARLY CIVILIZATION</span><h1>CIVITAS</h1></div><span id="cv-stage">ПЕРВОПОСЕЛЕНЕЦ</span></div><div class="cv-resources"><div>🪵 Дерево <b id="cv-wood">0</b></div><div>🪨 Камень <b id="cv-stone">0</b></div><div>🏗 Построено <b id="cv-build">0</b></div></div><div class="cv-objective"><span>ВАША ЦЕЛЬ</span><strong id="cv-goal">Соберите 10 ресурсов и разместите 5 блоков</strong><div class="cv-progress"><i id="cv-progress"></i></div></div><button id="cv-found" disabled>Основать поселение</button><div class="cv-hint">ЛКМ — добывать · ПКМ — строить · WASD — движение · 1–9 — материалы</div>';
document.body.appendChild(civitasUI);
const civitasStyle=document.createElement("style");
civitasStyle.textContent=`
#civitas-panel{position:fixed;z-index:120;left:22px;top:20px;width:min(360px,calc(100vw - 44px));color:#f7f1e6;font-family:Inter,system-ui,sans-serif;background:linear-gradient(135deg,rgba(15,29,27,.94),rgba(15,24,30,.9));border:1px solid rgba(219,186,118,.45);border-radius:18px;padding:20px;box-shadow:0 20px 65px #0008;backdrop-filter:blur(15px);pointer-events:auto}
.cv-top{display:flex;justify-content:space-between;align-items:center;gap:12px}.cv-eyebrow{font-size:9px;letter-spacing:2px;color:#c8b991}.cv-top h1{font-size:27px;letter-spacing:4px;margin:3px 0 13px;font-weight:650}.cv-top #cv-stage{font-size:9px;color:#e8c98c;border:1px solid #a9874e;border-radius:30px;padding:7px}
.cv-resources{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.cv-resources div{background:#ffffff0d;border:1px solid #ffffff18;padding:11px 6px;border-radius:9px;text-align:center;font-size:11px}.cv-resources b{display:block;font-size:20px;margin-top:5px;color:#f5d18e}
.cv-objective{margin-top:18px}.cv-objective span{display:block;font-size:10px;letter-spacing:2px;color:#c8b991;margin-bottom:6px}.cv-objective strong{font-size:13px;font-weight:500}.cv-progress{height:5px;background:#ffffff22;border-radius:20px;margin:12px 0}.cv-progress i{display:block;height:100%;width:0;background:linear-gradient(90deg,#bd9655,#f2d89b);border-radius:20px;transition:width .3s}
#cv-found{width:100%;padding:12px;border:0;border-radius:9px;background:#d4ad6c;color:#1e241f;font-weight:750;cursor:pointer}#cv-found:disabled{opacity:.4;cursor:not-allowed}.cv-hint{font-size:10px;color:#b5bcb7;line-height:1.6;margin-top:13px}
@media(max-width:600px){#civitas-panel{left:10px;top:10px;width:min(285px,calc(100vw - 20px));padding:12px}.cv-top h1{font-size:20px}.cv-hint{font-size:9px}}
`;
document.head.appendChild(civitasStyle);
function civitasRender(){
  const set=(id:string,value:string)=>{const el=document.getElementById(id);if(el)el.textContent=value};
  set("cv-wood",String(civitas.wood));set("cv-stone",String(civitas.stone));set("cv-build",String(civitas.build));
  const progress=Math.min(1,(Math.min(civitas.wood+civitas.stone,10)+Math.min(civitas.build,5))/15);
  const barEl=document.getElementById("cv-progress");if(barEl)barEl.style.width=(progress*100)+"%";
  const ready=civitas.wood+civitas.stone>=10&&civitas.build>=5;
  const button=document.getElementById("cv-found") as HTMLButtonElement;
  button.disabled=!ready||civitas.founded;
  button.textContent=civitas.founded?"✓ Поселение основано":"Основать поселение";
  set("cv-stage",civitas.founded?"ОСНОВАТЕЛЬ":"ПЕРВОПОСЕЛЕНЕЦ");
  set("cv-goal",civitas.founded?("Поселение «"+civitas.settlement+"» · продолжайте строительство"):"Соберите 10 ресурсов и разместите 5 блоков");
  civitasSave();
}
window.addEventListener("civitas:mine",((event:Event)=>{
  const e=event as CustomEvent<{kind:string;count:number}>;
  if(e.detail.kind==="wood")civitas.wood+=e.detail.count;
  else civitas.stone+=e.detail.count;
  civitasRender();
}) as EventListener);
window.addEventListener("civitas:build",((event:Event)=>{civitas.build+=(event as CustomEvent<{count:number}>).detail.count;civitasRender()}) as EventListener);
document.getElementById("cv-found")?.addEventListener("click",()=>{
  if(civitas.wood+civitas.stone<10||civitas.build<5||civitas.founded)return;
  const name=prompt("Название вашего поселения","Новая Цивитас");
  if(!name?.trim())return;
  civitas.settlement=name.trim().slice(0,40);civitas.founded=true;civitasRender();
});
civitasRender();
