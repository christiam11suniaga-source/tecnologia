const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const eras = [
 {year:"1989",title:"La idea de conectar información",tag:"LA PROPUESTA",description:"Tim Berners-Lee, científico del CERN, presenta una propuesta para organizar información mediante enlaces y permitir que distintos computadores compartan documentos.",detail:"Todavía no existía la Web como la conocemos. Era una idea para resolver un problema real: encontrar y conectar información entre investigadores.",caption:"Una propuesta de hipertexto distribuido. La Web aún no tenía su forma definitiva."},
 {year:"1990",title:"Nace el primer sitio web",tag:"EL PRIMER SERVIDOR",description:"A finales de 1990, Berners-Lee ya tenía en funcionamiento el primer servidor y navegador web en un computador NeXT del CERN. El sitio inicial explicaba el propio proyecto WWW.",detail:"La primera dirección fue info.cern.ch. Su contenido era principalmente texto y enlaces, sin imágenes decorativas ni diseño moderno.",caption:"Interfaz minimalista, texto y enlaces: lo esencial para navegar."},
 {year:"1993",title:"La Web comienza a expandirse",tag:"LA EXPANSIÓN",description:"El navegador Mosaic ayudó a popularizar la Web gracias a una interfaz gráfica más amigable. En abril de 1993, CERN liberó el software de la Web para uso público.",detail:"Ese mismo año se creó la primera página web hecha en Chile, en el Departamento de Ciencias de la Computación de la Universidad de Chile.",caption:"La navegación gráfica y los primeros sitios nacionales empiezan a aparecer."},
 {year:"1996",title:"La web se llena de personalidad",tag:"WEB EXPERIMENTAL",description:"Los sitios comienzan a experimentar con fondos, colores, GIF animados, contadores de visitas, tablas y tipografías llamativas.",detail:"Las páginas podían verse desordenadas, pero reflejaban una etapa creativa en la que diseñar para la Web era todavía algo nuevo.",caption:"Colores intensos, enlaces subrayados y GIF animados."},
 {year:"2000",title:"Portales y buscadores",tag:"LA WEB COTIDIANA",description:"Los portales reúnen noticias, correo, buscadores y otros servicios en un mismo lugar. Cada vez más empresas y personas crean sus propios sitios.",detail:"La Web empieza a convertirse en un espacio de uso cotidiano, aunque las conexiones lentas todavía condicionan el diseño.",caption:"Portales, menús, columnas y servicios reunidos en una página."},
 {year:"2010",title:"La Web se vuelve social y móvil",tag:"WEB SOCIAL",description:"Las redes sociales, los teléfonos inteligentes y las aplicaciones web cambian la forma de crear y compartir contenido.",detail:"El diseño adaptable gana importancia: las páginas deben funcionar en pantallas de distintos tamaños.",caption:"Diseños más limpios, redes sociales y adaptación a móviles."},
 {year:"2020",title:"Una web conectada y audiovisual",tag:"WEB EN TODAS PARTES",description:"El streaming, las videollamadas, el comercio electrónico y las aplicaciones en la nube se vuelven parte de la vida diaria.",detail:"La Web deja de ser solo un lugar para leer: también sirve para trabajar, estudiar, comprar, crear y comunicarse en tiempo real.",caption:"Experiencias audiovisuales, servicios en línea y contenido dinámico."},
 {year:"2026",title:"La web se vuelve inteligente",tag:"ERA ACTUAL",description:"La web actual combina servicios en la nube, aplicaciones, video, comercio, redes sociales e inteligencia artificial.",detail:"Las páginas ya no son solo documentos: muchas funcionan como aplicaciones completas y experiencias personalizadas.",caption:"Diseño adaptable, contenido dinámico e interacción."}
];
let eraIndex = eras.length - 1;
function showEra(index){
 eraIndex = Math.max(0,Math.min(eras.length-1,index));
 const e=eras[eraIndex];
 document.body.dataset.era=e.year;
 $("#eraNumber").textContent=`CAPÍTULO ${String(eraIndex+1).padStart(2,"0")}`;
 $("#eraTag").textContent=e.tag; $("#eraYear").textContent=e.year;
 $("#eraTitle").textContent=e.title; $("#eraDescription").textContent=e.description;
 $("#eraDetail").textContent=e.detail; $("#visualCaption").textContent=e.caption;
 $$("#yearTabs button").forEach(b=>b.classList.toggle("active",b.dataset.year===e.year));
 $("#eraVisual").classList.remove("visual-pop"); void $("#eraVisual").offsetWidth; $("#eraVisual").classList.add("visual-pop");
 $("#prevEra").disabled=eraIndex===0; $("#nextEra").disabled=eraIndex===eras.length-1;
}
$$("#yearTabs button").forEach(b=>b.addEventListener("click",()=>{showEra(eras.findIndex(e=>e.year===b.dataset.year));beep(560)}));
$("#prevEra").addEventListener("click",()=>showEra(eraIndex-1));
$("#nextEra").addEventListener("click",()=>showEra(eraIndex+1));
$("#eraPrevText").addEventListener("click",()=>showEra(eraIndex-1));
$("#eraNextText").addEventListener("click",()=>showEra(eraIndex+1));
showEra(eraIndex);

// Scroll progress + subtle reveal
window.addEventListener("scroll",()=>{
 const max=document.documentElement.scrollHeight-innerHeight;
 $("#readingProgress").style.width=(max>0?scrollY/max*100:0)+"%";
},{passive:true});

// Theme switch
$("#themeToggle").addEventListener("click",()=>{document.body.classList.toggle("light");beep(440)});

// Optional sounds, generated locally with Web Audio
let soundOn=false, audioCtx;
function beep(freq=520){
 if(!soundOn)return;
 try{audioCtx ||= new (window.AudioContext||window.webkitAudioContext)();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type="sine";o.frequency.value=freq;g.gain.setValueAtTime(.045,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+.12);o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+.12)}catch(e){}
}
$("#soundToggle").addEventListener("click",()=>{soundOn=!soundOn;$("#soundToggle span").textContent=soundOn?"ON":"OFF";$("#soundToggle").setAttribute("aria-label",soundOn?"Desactivar sonidos":"Activar sonidos");beep(660)});

// Mobile nav
$("#menuToggle").addEventListener("click",()=>{$(".topbar nav").classList.toggle("open")});
$$(".topbar nav a").forEach(a=>a.addEventListener("click",()=>$(".topbar nav").classList.remove("open")));

// Custom cursor on desktop
if(matchMedia("(pointer:fine)").matches){document.addEventListener("mousemove",e=>{const c=$("#cursorDot");c.style.left=e.clientX+"px";c.style.top=e.clientY+"px";document.body.classList.add("cursor-ready")})}

// Comparison slider
$("#compareSlider").addEventListener("input",e=>{const v=e.target.value+"%";$(".compare-new").style.width=v;$("#compareHandle").style.left=v});

// Interactive network nodes
const nodeFacts={
 "1989":["La propuesta inicial","Tim Berners-Lee propone un sistema de información enlazada mientras trabaja en CERN."],
 "1990":["El primer sitio","En CERN funciona el primer servidor web y aparece info.cern.ch."],
 "1993":["Chile entra en la Web","La Universidad de Chile desarrolla la primera página web hecha en Chile."],
 "1996":["Diseño experimental","GIF, fondos, tablas y colores marcan la estética de muchos sitios."],
 "2000":["Portales y buscadores","La Web se convierte en un espacio de servicios y navegación cotidiana."],
 "2010":["La era social y móvil","Las redes sociales y los smartphones transforman la experiencia web."],
 "2026":["Web actual","Aplicaciones, nube, video e inteligencia artificial amplían las posibilidades."]
};
$$(".node").forEach(n=>n.addEventListener("click",()=>{const f=nodeFacts[n.dataset.node];$$(".node").forEach(x=>x.classList.toggle("selected",x===n));$("#nodeInfo").innerHTML=`<b>${f[0]}</b><span>${f[1]}</span>`;beep(600)}));

// Mini browser simulator
const pages={
 about:{title:"WHAT IS THE WEB?",body:"The Web is a system of connected documents. You can move from one document to another by following hypertext links.",links:[["Back to home","home"],["Available links","links"]]},
 links:{title:"AVAILABLE LINKS",body:"A link connects this page with another document. Select a section to explore the information space.",links:[["What is the Web?","about"],["Help and information","help"],["Back to home","home"]]},
 help:{title:"HELP AND INFORMATION",body:"Use the links to move between documents. Early websites were mostly text, and every connection opened a new path.",links:[["Back to home","home"],["What is the Web?","about"]]},
 home:{title:"THE WORLD WIDE WEB",body:"Welcome to this small information space. Select a link to continue.",links:[["What is the Web?","about"],["Available links","links"],["Help and information","help"]]}
};
function renderRetro(key){
 const p=pages[key];$("#retroScreen").innerHTML=`<h4>${p.title}</h4><p>${p.body}</p><ul>${p.links.map(([label,id])=>`<li><a href="#" data-page="${id}">${label}</a></li>`).join("")}</ul><p class="retro-small">Document loaded locally · ${key}.html</p>`;
 $("#retroScreen").querySelectorAll("a").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();renderRetro(a.dataset.page);beep(520)}));
}
renderRetro("home");

// Random facts
const facts=[
"El primer sitio web del mundo explicaba qué era la propia World Wide Web.",
"El primer servidor web funcionaba en un computador NeXT en el CERN.",
"El 30 de abril de 1993, CERN liberó el software de la Web para facilitar su expansión.",
"La primera página web hecha en Chile apareció en 1993 y fue desarrollada en la Universidad de Chile.",
"El navegador Mosaic ayudó a que más personas pudieran explorar la Web mediante una interfaz gráfica."
];
let factIndex=0;
$("#nextFact").addEventListener("click",()=>{factIndex=(factIndex+1)%facts.length;$("#factNumber").textContent=String(factIndex+1).padStart(2,"0");$("#factText").textContent=facts[factIndex];beep(610)});

// Quiz
const questions=[
 {q:"¿En qué año presentó Tim Berners-Lee la propuesta inicial de la Web?",a:["1989","1993","1996","2001"],correct:0,why:"La propuesta inicial fue presentada en marzo de 1989, mientras trabajaba en CERN."},
 {q:"¿Dónde se creó el primer servidor y sitio web?",a:["Universidad de Chile","CERN, en Suiza","NASA","Universidad de Oxford"],correct:1,why:"El primer servidor web funcionó en CERN y su dirección fue info.cern.ch."},
 {q:"¿En qué año se creó la primera página web hecha en Chile?",a:["1989","1990","1993","2000"],correct:2,why:"La primera web hecha en Chile fue desarrollada en 1993 en la Universidad de Chile."},
 {q:"¿Qué navegador ayudó a popularizar la Web en 1993?",a:["Mosaic","Chrome","Safari","Edge"],correct:0,why:"Mosaic destacó por su interfaz gráfica más amigable y ayudó a expandir el uso de la Web."},
 {q:"¿Qué diferencia a Internet de la World Wide Web?",a:["Son exactamente lo mismo","Internet conecta redes; la Web es un servicio que funciona sobre ella","La Web es el cable físico","Internet solo sirve para correos"],correct:1,why:"Internet es la infraestructura de redes. La Web es uno de los servicios que utiliza esa infraestructura."}
];
let qIndex=0,score=0,answered=false;
function loadQuestion(){
 const q=questions[qIndex];answered=false;
 $("#questionCount").textContent=`PREGUNTA ${String(qIndex+1).padStart(2,"0")} / 05`;
 $("#scoreLabel").textContent=`PUNTOS: ${score}`;
 $("#questionText").textContent=q.q;$("#quizFeedback").textContent="";
 $("#nextQuestion").disabled=true;$("#nextQuestion").textContent=qIndex===questions.length-1?"Ver resultado →":"Siguiente pregunta →";
 $("#quizProgress").style.width=(qIndex/questions.length*100)+"%";
 $("#answers").innerHTML="";
 q.a.forEach((answer,i)=>{const b=document.createElement("button");b.className="answer-option";b.textContent=answer;b.addEventListener("click",()=>chooseAnswer(i));$("#answers").appendChild(b)});
}
function chooseAnswer(i){
 if(answered)return;answered=true;const q=questions[qIndex],buttons=$$("#answers button");
 buttons.forEach((b,j)=>{b.disabled=true;if(j===q.correct)b.classList.add("correct");else if(j===i)b.classList.add("wrong")});
 if(i===q.correct){score++;$("#quizFeedback").textContent="¡Correcto! "+q.why;beep(760)}else{$("#quizFeedback").textContent="No exactamente. "+q.why;beep(230)}
 $("#scoreLabel").textContent=`PUNTOS: ${score}`;$("#nextQuestion").disabled=false;
}
$("#nextQuestion").addEventListener("click",()=>{
 if(!answered)return;
 qIndex++;
 if(qIndex<questions.length){loadQuestion();return}
 $("#quizProgress").style.width="100%";$("#quizArea").classList.add("hidden");$("#quizResult").classList.remove("hidden");
 const memeByScore={
  0:{emoji:"💀",title:"0/5 · La Web te vio y cerró la pestaña",caption:"Entraste a Internet y saliste con menos conocimiento que una impresora sin tinta.",tag:"NPC DIGITAL"},
  1:{emoji:"🐒",title:"1/5 · El conocimiento abandonó el chat",caption:"Una respuesta correcta. El resto fue una expedición arqueológica sin herramientas.",tag:"MODO MONO"},
  2:{emoji:"🤡",title:"2/5 · Casi, pero no",caption:"Tienes conexión a Internet, pero la información no está llegando al destino.",tag:"BUFFERING MENTAL"},
  3:{emoji:"🗿",title:"3/5 · No está mal",caption:"Sobreviviste a la historia de la Web. No con honores, pero sobreviviste.",tag:"PIEDRA SABIA"},
  4:{emoji:"🧠",title:"4/5 · Te faltó una pestaña",caption:"Estuviste a un clic de la perfección. Una pestaña más y eras leyenda.",tag:"CEREBRO EN HD"}
 };
 $("#secretLock").classList.add("hidden");
 $("#secretReward").classList.add("hidden");
 if(score===5){
  $("#resultTitle").textContent="¡PERFECTO! 5/5";
  $("#resultText").textContent="Has desbloqueado la recompensa definitiva. Confía en el proceso. No en el enlace.";
  $("#scoreMeme").classList.add("hidden");
  $("#revealSecret").classList.remove("hidden");
  $("#revealSecret").textContent="Reclamar recompensa (sospechosamente especial) ✦";
 }else{
  const meme=memeByScore[score];
  $("#resultTitle").textContent=`Resultado: ${score}/5`;
  $("#resultText").textContent="Tu puntuación ha sido evaluada por el comité internacional de memes.";
  $("#scoreMeme").innerHTML=`<div class="meme-card meme-score-${score}"><span class="meme-tag">${meme.tag}</span><div class="meme-emoji" role="img" aria-label="Meme ${score} de 5">${meme.emoji}</div><h4>${meme.title}</h4><p>${meme.caption}</p><small>MEME DESBLOQUEADO · ${score}/5</small></div>`;
  $("#scoreMeme").classList.remove("hidden");
  $("#revealSecret").classList.add("hidden");
 }
 beep(820);
});;
$("#revealSecret").addEventListener("click",()=>{
 // El enlace visible abre YouTube directamente. Evitamos iframes y ventanas emergentes,
 // que suelen fallar con páginas abiertas desde file:// o con bloqueadores.
 $("#secretReward").classList.remove("hidden");
 $("#scoreMeme").classList.add("hidden");
 $("#revealSecret").classList.add("hidden");
 beep(880);
});
$("#closeReward").addEventListener("click",()=>{$("#secretReward").classList.add("hidden");$("#revealSecret").classList.remove("hidden")});
$("#restartQuiz").addEventListener("click",()=>{qIndex=0;score=0;$("#quizResult").classList.add("hidden");$("#quizArea").classList.remove("hidden");$("#secretReward").classList.add("hidden");$("#scoreMeme").classList.add("hidden");$("#secretLock").classList.remove("hidden");$("#revealSecret").classList.remove("hidden");$("#revealSecret").textContent="Abrir recompensa secreta ✦";loadQuestion()});
loadQuestion();

// Small entrance motion for sections
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("seen");observer.unobserve(entry.target)}}),{threshold:.08});
$$(".intro-band,.timeline-section,.chile-section,.lab-section,.quiz-section,.closing").forEach(el=>observer.observe(el));


// Museo visual: recreaciones educativas de distintas generaciones de la Web.
const museumData={
 "1993":{title:"1993 · La web era principalmente texto",desc:"Los sitios se organizaban con títulos, párrafos y enlaces azules subrayados. Las imágenes eran escasas y la navegación era directa.",address:"http://info.example/1993",html:'<h3>THE WORLD WIDE WEB</h3><p>Welcome to the information space.</p><hr><ul><li><a href="#museo">What is hypertext?</a></li><li><a href="#museo">How to create a page</a></li><li><a href="#museo">Available information</a></li></ul><small>Text · links · simple documents</small>'},
 "1996":{title:"1996 · Colores, GIF y páginas personales",desc:"Aparecen fondos estampados, contadores, GIF animados, textos centrados y muchos enlaces. Cada persona quería que su página destacara.",address:"http://members.example/~homepage",html:'<div class="retro96-banner">★ MY AWESOME HOMEPAGE ★</div><p class="retro96-welcome">WELCOME TO MY SITE!!!</p><div class="retro96-columns"><aside>MENU<br>About me<br>My links<br>Guestbook</aside><div><b>UNDER CONSTRUCTION</b><p>Welcome, visitor number <strong>001384</strong>!</p><div class="retro96-gif">✦ ✧ ✦</div></div></div><small>Best viewed at 800 × 600</small>'},
 "2005":{title:"2005 · Portales, columnas y Flash",desc:"Los portales agrupan noticias, buscadores y correo. Se popularizan menús, banners, reproductores y animaciones hechas con tecnologías como Flash.",address:"http://portal.example.com",html:'<div class="retro05-head">portal<span>.com</span> <small>Buscar: __________ 🔍</small></div><nav>INICIO　 NOTICIAS　 DEPORTES　 MÚSICA　 CORREO</nav><div class="retro05-layout"><aside>Secciones<br>Últimas noticias<br>Entretenimiento<br>Comunidad</aside><div><h3>Lo último en Internet</h3><div class="retro05-banner">TU MUNDO, EN UN SOLO LUGAR</div><p>Noticias, servicios y contenidos reunidos en un portal.</p></div></div>'},
 "2015":{title:"2015 · Diseño adaptable y redes sociales",desc:"Las páginas se adaptan a móviles. Predominan tarjetas, imágenes grandes, menús simples y botones para compartir contenido.",address:"https://app.example/2015",html:'<div class="retro15-nav">◉ social<span>☰</span></div><div class="retro15-cover"></div><h3>Historias para compartir</h3><p>Una experiencia pensada para pantallas grandes y pequeñas.</p><div class="retro15-cards"><b>FOTO</b><b>VIDEO</b><b>MENSAJES</b></div>'},
 "2026":{title:"2026 · Aplicaciones web e inteligencia artificial",desc:"La web funciona como una plataforma de aplicaciones: interfaces dinámicas, video, colaboración en tiempo real, personalización e inteligencia artificial.",address:"https://experience.example/2026",html:'<div class="retro26-nav">◈ FUTURE<span>⌕　☰</span></div><div class="retro26-hero"><small>THE NEXT WEB</small><h3>Everything<br>connected.</h3><p>Una web que responde, aprende y se adapta.</p><button>EXPLORAR ↗</button></div><div class="retro26-cards"><b>IA</b><b>LIVE</b><b>CLOUD</b></div>'}
};
function showMuseum(year){const d=museumData[year];const page=$("#museumPage");page.className="museum-page museum-"+year;page.innerHTML=d.html;$("#museumAddress").textContent=d.address;$("#museumTitle").textContent=d.title;$("#museumDescription").textContent=d.desc;$$('#museumControls button').forEach(b=>b.classList.toggle('active',b.dataset.museum===year));beep(520)}
$$('#museumControls button').forEach(b=>b.addEventListener('click',()=>showMuseum(b.dataset.museum)));

// Minijuego 1: construir una página con elementos clásicos.
const builderItems={title:'<h2>Mi primera página web</h2>',paragraph:'<p>¡Hola! Esta es mi página personal de Internet.</p>',link:'<p><a href="#juegos">Visita mi sitio favorito</a></p>',image:'<div class="builder-image">[ IMAGEN GIF ]<br>🌐</div>'};
let builderCount=0;
$$('[data-build]').forEach(btn=>btn.addEventListener('click',()=>{const action=btn.dataset.build,canvas=$("#builderCanvas");if(action==='clear'){canvas.innerHTML='<p class="builder-empty">Tu página está vacía. ¡Agrega algo!</p>';builderCount=0}else{if(builderCount===0)canvas.innerHTML='';canvas.insertAdjacentHTML('beforeend',builderItems[action]);builderCount++}$("#builderStatus").textContent=`Elementos añadidos: ${builderCount} · ${builderCount>=3?'¡Ya tienes una pequeña web!':'Sigue agregando contenido.'}`;beep(580)}));

// Minijuego 2: reconocer la estética de cada década.
const guessRounds=[
 {era:'1990s',cls:'guess-90',title:'WELCOME!!!',links:'HOME　 ABOUT　 GUESTBOOK',box:'★ UNDER CONSTRUCTION ★<br>Best viewed at 800 × 600',why:'Fondos intensos, enlaces subrayados, GIF y contadores eran habituales.'},
 {era:'2000s',cls:'guess-00',title:'PORTAL CENTRAL',links:'NOTICIAS　 CORREO　 BUSCADOR',box:'ÚLTIMAS NOTICIAS · SERVICIOS · BANNERS',why:'Los portales reunían secciones, noticias, buscadores y banners.'},
 {era:'2010s',cls:'guess-10',title:'Comparte tu historia',links:'INICIO　 PERFIL　 MENSAJES',box:'FOTO DESTACADA　 ♥ 1.2K　 COMPARTIR',why:'Diseño limpio, imágenes grandes y redes sociales marcaron esta etapa.'},
 {era:'2020s',cls:'guess-20',title:'Tu espacio digital',links:'INICIO　 EXPLORAR　 PERFIL',box:'VIDEO EN VIVO · TARJETAS · CONTENIDO DINÁMICO',why:'Las plataformas combinan video, aplicaciones, personalización y servicios.'},
 {era:'1990s',cls:'guess-90',title:'MY PERSONAL PAGE',links:'LINKS　 WEBRING　 MY EMAIL',box:'VISITOR Nº 000245 · SIGN MY GUESTBOOK',why:'Las páginas personales y los libros de visitas eran parte de la cultura web.'}
];
let guessIndex=0,guessScore=0,guessAnswered=false;
function loadGuess(){const r=guessRounds[guessIndex];$("#guessPreview").className='guess-preview '+r.cls;$("#guessPreview").innerHTML=`<div class="guess-art-title">${r.title}</div><div class="guess-art-links">${r.links}</div><div class="guess-art-box">${r.box}</div>`;$("#guessQuestion").textContent=`Diseño ${guessIndex+1} de 5: ¿a qué década pertenece?`;
 $$('#guessOptions button').forEach(b=>{b.disabled=false;b.classList.remove('correct','wrong')});$("#guessNext").disabled=true;$("#guessStatus").textContent=`Ronda ${guessIndex+1} de 5 · Puntos: ${guessScore}`;guessAnswered=false}
$$('#guessOptions button').forEach(b=>b.addEventListener('click',()=>{if(guessAnswered)return;guessAnswered=true;const r=guessRounds[guessIndex],correct=b.dataset.guess===r.era;$$('#guessOptions button').forEach(x=>{x.disabled=true;if(x.dataset.guess===r.era)x.classList.add('correct')});if(correct){guessScore++;b.classList.add('correct')}else b.classList.add('wrong');$("#guessStatus").textContent=(correct?'¡Correcto! ':'No era esa. ')+r.why+` Puntos: ${guessScore}/5`;$("#guessNext").disabled=false;$("#guessNext").textContent=guessIndex===4?'Ver resultado ↗':'Siguiente diseño →';beep(correct?760:240)}));
$("#guessNext").addEventListener('click',()=>{if(!guessAnswered)return;if(guessIndex<4){guessIndex++;loadGuess()}else{$("#guessQuestion").textContent=`Resultado final: ${guessScore} de 5`;$("#guessPreview").innerHTML='<div class="guess-finish">'+(guessScore>=4?'¡Experto en historia web!':'¡Recorrido completado!')+'</div>';$ ("#guessStatus").textContent='Puedes volver a jugar recargando la página.';$("#guessNext").disabled=true}});
loadGuess();
