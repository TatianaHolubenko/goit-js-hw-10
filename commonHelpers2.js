import"./assets/modulepreload-polyfill-ec808ebb.js";import{i as s}from"./assets/vendor-651d7991.js";const i=document.querySelector(".form");i.addEventListener("submit",r=>{r.preventDefault();const o=document.querySelector('input[name = "delay"]'),c=document.querySelector('input[name="state"]:checked').value,t=parseInt(o.value);new Promise((e,n)=>{setTimeout(()=>{c==="fulfilled"?e(t):n(t)},t)}).then(e=>{s.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{s.error({title:"Error",message:`❌ Rejected promise in ${e}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map