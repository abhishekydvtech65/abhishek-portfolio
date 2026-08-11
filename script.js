const menuBtn=document.getElementById("menuBtn"),navMenu=document.getElementById("navMenu"),typing=document.getElementById("typing"),year=document.getElementById("year"),glow=document.querySelector(".glow");
menuBtn.addEventListener("click",()=>{navMenu.classList.toggle("open");menuBtn.textContent=navMenu.classList.contains("open")?"✕":"☰"});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navMenu.classList.remove("open")));
year.textContent=new Date().getFullYear();
const words=["Frontend Developer","UI/UX Designer","Problem Solver","CSE Student"];let wi=0,ci=0,del=false;
function type(){let w=words[wi];typing.textContent=del?w.slice(0,ci-1):w.slice(0,ci+1);del?ci--:ci++;if(!del&&ci===w.length){del=true;setTimeout(type,1400);return}if(del&&ci===0){del=false;wi=(wi+1)%words.length}setTimeout(type,del?45:80)}type();
document.addEventListener("mousemove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity=1;e.target.style.transform="translateY(0)"}}),{threshold:.12});
document.querySelectorAll("section,.cards article,.timeline article").forEach(e=>{e.style.opacity=0;e.style.transform="translateY(25px)";e.style.transition="opacity .7s ease,transform .7s ease";obs.observe(e)});
