
var nav=document.getElementById('nav'),m=document.getElementById('menu'),tg=document.getElementById('tg'),themeToggle=document.getElementById('themeToggle');
function sc(){var y=window.scrollY;nav.classList.toggle('s',y>40)}
addEventListener('scroll',sc,{passive:true});sc();
tg.onclick=function(){var o=m.classList.toggle('o');tg.setAttribute('aria-expanded',o)};
m.onclick=function(){m.classList.remove('o');tg.setAttribute('aria-expanded',false)};
var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
var lb=document.getElementById('lb'),li=lb.querySelector('img');
document.querySelectorAll('.gal .ph').forEach(function(b){b.onclick=function(){var i=b.querySelector('img');li.src=i.src;li.alt=i.alt;lb.classList.add('o')}});
lb.onclick=function(){lb.classList.remove('o')};
addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('o')});

/* Persistent Light / Dark theme preference */
(function(){
  var saved=localStorage.getItem('ikon-gardens-theme');
  var theme=saved==='light'?'light':'dark';
  document.documentElement.setAttribute('data-theme',theme);
  function update(){
    var dark=document.documentElement.getAttribute('data-theme')==='dark';
    themeToggle.innerHTML=dark?'☀':'☾';
    themeToggle.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');
    themeToggle.title=dark?'Switch to light theme':'Switch to dark theme';
  }
  themeToggle.addEventListener('click',function(){
    var next=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
    document.documentElement.setAttribute('data-theme',next);
    localStorage.setItem('ikon-gardens-theme',next);
    update();
  });
  update();
})();
