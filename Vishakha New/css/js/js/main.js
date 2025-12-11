/* js/main.js - simple nav transitions + surprise reveal + cake confetti */
(function(){
  // transition overlay for nav links
  function playTransition(href){
    const overlay = document.querySelector('.transition-overlay') || document.createElement('div');
    overlay.id = 'transition';
    overlay.className = 'transition-overlay show';
    document.body.appendChild(overlay);
    setTimeout(()=> { location.href = href; }, 520);
  }

  // turn .nav links into transition nav with playTransition
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.nav').forEach(a=>{
      a.addEventListener('click', function(e){
        const href = a.getAttribute('href');
        if(!href) return;
        e.preventDefault();
        playTransition(href);
      });
    });

    // surprise page star interaction
    const star = document.getElementById('star');
    if(star){
      star.addEventListener('click', function(){
        const reveal = document.getElementById('reveal');
        if(reveal){ reveal.classList.remove('hidden'); star.classList.add('hidden'); }
      });
    }

    // cake page: cut + confetti
    const cake = document.getElementById('cake');
    if(cake){
      cake.addEventListener('click', function(){
        // separate layers
        const layers = cake.querySelectorAll('.layer');
        layers.forEach((l,i)=>{
          l.style.transition = 'transform .9s cubic-bezier(.22,.9,.2,1), opacity .7s';
          l.style.transform = `translateX(${(i-1)*48}px) rotate(${(i-1)*6}deg)`;
        });
        // show message area
        const msg = document.getElementById('cakeMsg');
        if(msg) msg.classList.remove('hidden');
        // confetti
        const canvas = document.getElementById('confetti');
        if(canvas) {
          confettiBurst(canvas);
        }
      });
    }

    // small helper confetti burst
    function confettiBurst(canvas){
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const W = canvas.width, H = canvas.height;
      const pieces = [];
      for(let i=0;i<60;i++){
        pieces.push({
          x: W/2 + (Math.random()-0.5)*40,
          y: H/3 + (Math.random()-0.5)*20,
          vx: (Math.random()-0.5)*10,
          vy: - (Math.random()*8 + 4),
          size: 4 + Math.random()*6,
          col: ['#ff7fcf','#9be6ff','#ffd6a8','#cfe0ff'][Math.floor(Math.random()*4)]
        });
      }
      let t=0;
      function frame(){
        t++;
        ctx.clearRect(0,0,W,H);
        pieces.forEach(p=>{
          p.x += p.vx; p.y += p.vy; p.vy += 0.22;
          ctx.fillStyle = p.col; ctx.fillRect(p.x,p.y,p.size,p.size);
        });
        if(t < 120) requestAnimationFrame(frame);
        else ctx.clearRect(0,0,W,H);
      }
      frame();
    }

  });
})();
