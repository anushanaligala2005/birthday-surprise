// PERSONALIZE THIS FILE: change the nickname, quiz answers, clues, and secret letter.
const BESTIE_NICKNAME = "Gem";
document.title = `A Little World for ${BESTIE_NICKNAME} 💗`;
document.getElementById("nicknameTitle").textContent = BESTIE_NICKNAME;

const questions = [
 {q:"Mana first meet lo nee first impression enti?",o:["Chaala silent","Funny person","Different ga unnadu","Gurthu ledu 😅"]},
 {q:"Manam ekkuvaga ekkadiki velladam enjoy chestham?",o:["Restaurants","Shopping","Long walks","Anni kalisi ❤️"]},
 {q:"Natho oka full day spend chesthe em chesthav?",o:["Food tour","Shopping day","Movies + snacks","Long drive"]},
 {q:"Naalo neeku baaga nachina quality enti?",o:["Caring","Funny nature","Understanding","Annitlo konchem 💗"]},
 {q:"Mana memories lo okati malli repeat cheyyali ante?",o:["First meet","Best restaurant visit","Shopping day","Random ga tirigina roju"]},
 {q:"Nenu sad ga unte nuvvu em chesthav?",o:["Navvistha","Vinta","Food ki teesukeltha","Hug istha ❤️"]},
 {q:"Mana next outing ekkadiki?",o:["New restaurant","Shopping mall","Beach","Long drive"]},
 {q:"Future lo manam kalisi try cheyyalsindi enti?",o:["Travel to a new city","Cook together","Matching outfits","A bucket-list trip"]},
 {q:"Mana iddarilo ekkuva matladedi evaru?",o:["Nenu","Nuvvu","Situation batti","Iddaram nonstop 😂"]},
 {q:"Mana perfect evening ela undali?",o:["Street food","Movie night","Long walk","Deep conversations 🌙"]},
 {q:"Nenu order chese chance isthe em choose chesthav?",o:["My favourite food","Something new","Dessert first 🍰","Surprise me"]},
 {q:"Mana friendship ki oka song choose chesthe?",o:["Happy song","Old memories song","Love song","Funny song 😂"]},
 {q:"Shopping lo mana style enti?",o:["Plan chesi veltham","Just window shopping","Okati kosam velli chaala konestham","Okariki okaru suggestions"]},
 {q:"Nenu late ga vasthe nuvvu?",o:["Call chestha","Memes pampistha","Food order chestha","Drama chestha 😅"]},
 {q:"Mana best conversations ekkada jaruguthayi?",o:["Restaurant lo","Walking appudu","Chat lo","Ekkadaina, topic unte chaalu"]},
 {q:"Naa mood ni nuvvu ela guess chesthav?",o:["Face chusi","Voice vini","Messages batti","Nenu cheppestha"]},
 {q:"Manam trip ki velthe first priority enti?",o:["Food spots","Photos","Shopping","Explore everything"]},
 {q:"Mana iddariki perfect gift enti?",o:["Matching bracelets","Favourite snacks","Memory scrapbook","Surprise outing"]},
 {q:"Nenu oka superpower pondithe edi suit avuthundi?",o:["Mind reading","Teleportation","Time travel","Food summon cheyyadam 😂"]},
 {q:"Mana funniest memory type enti?",o:["Random jokes","Wrong turns","Shopping confusion","Food kosam search"]},
 {q:"Nuvvu nannu describe cheyyali ante?",o:["Sweet","Chaotic 😂","Caring","All of the above"]},
 {q:"Mana next tradition start cheyyali ante?",o:["Monthly food date","Birthday letters","Yearly trip","Random surprise days"]},
 {q:"Nenu surprise plan chesthe nuvvu?",o:["Excited avutha","Questions adugutha","Em expect cheyyanu","First food adugutha 😂"]},
 {q:"Manam future lo gurthu cheskovali anukune thing?",o:["Our adventures","Our jokes","Our growth","All these little things ❤️"]},
 {q:"Ee website lo neeku most fun ga anipinchindi enti?",o:["Quiz","Memory game","Challenge wheel","Treasure hunt 💗"]}
];

const encouraging = ["Cute answer! 💗","Awww, memory unlocked! 🥹","Noted for our next adventure ✨","That answer deserves a heart! ❤️","The best part is making more memories together."];
let currentQ=0, answers=Array(questions.length).fill(null), quizPoints=0, memoryDone=false, wheelDone=false, dateDone=false, huntDone=false;
const $=id=>document.getElementById(id);
function showToast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2500)}
function renderQuestion(){
 const item=questions[currentQ];$("questionNumber").textContent=`Question ${currentQ+1} of ${questions.length}`;$("questionText").textContent=item.q;$("quizProgress").style.width=`${(currentQ+1)/questions.length*100}%`;$("quizPoints").textContent=`💗 ${quizPoints}`;$("quizFeedback").textContent="";
 const opts=$("options");opts.innerHTML="";
 item.o.forEach((opt,i)=>{const b=document.createElement("button");b.className="option"+(answers[currentQ]===i?" selected":"");b.innerHTML=`<span class="option-letter">${String.fromCharCode(65+i)}</span><span></span>`;b.lastChild.textContent=opt;b.onclick=()=>{if(answers[currentQ]===null)quizPoints+=1;answers[currentQ]=i;[...opts.children].forEach(el=>el.classList.remove("selected"));b.classList.add("selected");$("quizFeedback").textContent=encouraging[(currentQ+i)%encouraging.length];$("quizPoints").textContent=`💗 ${quizPoints}`;updateStats();if(answers.every(a=>a!==null))showQuizResult()};opts.appendChild(b)});
 $("prevQuestion").disabled=currentQ===0;$("prevQuestion").style.opacity=currentQ===0?".45":"1";$("nextQuestion").textContent=currentQ===questions.length-1?"See results 💗":"Next →";
}
function showQuizResult(){const box=$("quizResult");box.classList.remove("hidden");box.innerHTML=`<h3>Quiz complete! 🎉</h3><p>You collected <strong>${quizPoints} heart points</strong> by sharing your answers.</p><p>${quizPoints>=20?"Officially a memory champion! 🏆":quizPoints>=12?"A pretty lovely little adventure! 💗":"There are so many more memories waiting to be made. ✨"}</p>`;quizDone=true;updateStats()}
let quizDone=false;
$("prevQuestion").onclick=()=>{if(currentQ>0){currentQ--;renderQuestion()}};
$("nextQuestion").onclick=()=>{if(currentQ<questions.length-1){currentQ++;renderQuestion()}else{showQuizResult();$("quizResult").scrollIntoView({behavior:"smooth",block:"center"})}};
$("startBtn").onclick=()=>{document.getElementById("quiz").scrollIntoView({behavior:"smooth"});showToast("Your birthday adventure starts now! 💗")};

// Memory game
const symbols=["💗","🍓","🌙","🍕","🧸","✨"];let deck=[],first=null,lock=false,moves=0,pairs=0;
function initMemory(){deck=[...symbols,...symbols].sort(()=>Math.random()-.5);first=null;lock=false;moves=0;pairs=0;$("moves").textContent=moves;$("pairs").textContent="0/6";$("memoryMessage").textContent="Tap any two cards to start 💗";$("memoryGrid").innerHTML="";deck.forEach((sym,i)=>{const b=document.createElement("button");b.className="memory-card";b.textContent="？";b.setAttribute("aria-label","Hidden memory card");b.onclick=()=>flipCard(i,b);$("memoryGrid").appendChild(b)})}
function flipCard(i,b){if(lock||b.classList.contains("matched")||b.classList.contains("revealed"))return;b.textContent=deck[i];b.classList.add("revealed");if(first===null){first={i,b};return}moves++;$("moves").textContent=moves;const one=first;first=null;if(deck[one.i]===deck[i]){one.b.classList.add("matched");b.classList.add("matched");pairs++;$("pairs").textContent=`${pairs}/6`;if(pairs===6){memoryDone=true;$("memoryMessage").textContent=`You matched all the hearts in ${moves} moves! Memory master! 🏆`;updateStats();confetti()}else $("memoryMessage").textContent="It's a match! Another little win 💗"}else{lock=true;$("memoryMessage").textContent="Not a match — try remembering those spots ✨";setTimeout(()=>{one.b.textContent="？";b.textContent="？";one.b.classList.remove("revealed");b.classList.remove("revealed");lock=false},750)}}
$("restartMemory").onclick=initMemory;initMemory();

// Wheel
const challenges=["Tell me a memory you never forgot 🥹","Give me a three-word compliment 💗","Pick our next food date 🍝","Make your funniest face 😂","Name one dream trip for us 🌍","Share a song that reminds you of us 🎶","Tell one sweet truth 💌","Choose a photo we should recreate 📸"];
let rotation=0,spinning=false;
$("spinBtn").onclick=()=>{if(spinning)return;spinning=true;const idx=Math.floor(Math.random()*challenges.length);rotation+=1440+(360-idx*45-22.5-rotation%360+360)%360;$("challengeWheel").style.transform=`rotate(${rotation}deg)`;$("wheelResult").textContent="Spinning… ✨";$("spinBtn").disabled=true;setTimeout(()=>{$("wheelResult").textContent=challenges[idx];spinning=false;wheelDone=true;$("spinBtn").disabled=false;updateStats();showToast("Challenge unlocked! Give it a try 💗")},4100)};

// Date picker
document.querySelectorAll(".date-pick").forEach(btn=>btn.onclick=()=>{dateDone=true;$("dateResult").classList.remove("hidden");$("dateResult").innerHTML=`<h3>Date plan picked! 💗</h3><p>Our next idea: <strong>${btn.dataset.date}</strong></p><p>Save this for a day when we both have time — no pressure, just fun.</p>`;updateStats();showToast("Date idea saved on this page ✨")});

// Treasure hunt: customize options to your real story if desired.
const clues=[
 {icon:"💭",title:"The beginning",text:"Where did our story begin? Pick the answer that feels right.",opts:["At a restaurant 🍝","Somewhere unexpected ✨","Through friends 🫶","In a classroom / work place 📚"],correct:1,success:"Every story has a beginning — and ours became its own little adventure. 💗"},
 {icon:"🛍️",title:"The adventure clue",text:"What makes an ordinary outing feel special?",opts:["The place only","The food only","The person you're with ❤️","Buying everything 😂"],correct:2,success:"Exactly! The company can turn an ordinary day into a favourite memory. 🥹"},
 {icon:"🌙",title:"The future clue",text:"Choose the treasure worth collecting for years.",opts:["Expensive things","More shared memories 💌","Perfect plans only","Never trying anything new"],correct:1,success:"You found the treasure: more kind moments, more laughter, and more memories. 💗"}
];let clueIndex=0;
function renderClue(){const c=clues[clueIndex];$("huntProgress").textContent=`CLUE ${clueIndex+1} OF ${clues.length}`;$("clueIcon").textContent=c.icon;$("clueTitle").textContent=c.title;$("clueText").textContent=c.text;$("clueFeedback").textContent="";$("clueOptions").innerHTML="";c.opts.forEach((o,i)=>{const b=document.createElement("button");b.className="option";b.innerHTML=`<span class="option-letter">${String.fromCharCode(65+i)}</span><span></span>`;b.lastChild.textContent=o;b.onclick=()=>{if(i===c.correct){$("clueFeedback").textContent=c.success;if(clueIndex<clues.length-1){[...$("clueOptions").children].forEach(x=>x.disabled=true);setTimeout(()=>{clueIndex++;renderClue()},1000)}else{huntDone=true;$("clueOptions").innerHTML="";$("huntProgress").textContent="TREASURE FOUND!";$("huntReward").classList.remove("hidden");$("huntReward").innerHTML="<h3>Treasure unlocked! 🗝️</h3><p>You found the best kind of treasure — shared memories and all the adventures still to come.</p>";confetti();updateStats()}}else{$("clueFeedback").textContent="Not quite! Try another answer 🥹";b.classList.add("selected")}};$("clueOptions").appendChild(b)})}
renderClue();

// Unlocking the final letter
function completed(){return [quizDone,memoryDone,wheelDone,dateDone,huntDone].filter(Boolean).length}
function updateStats(){const n=completed();$("heartCount").textContent=quizPoints;$("completedCount").textContent=`${n}/5`;$("levelCount").textContent=Math.min(5,Math.floor(quizPoints/5)+1);$("letterProgress").style.width=`${n/5*100}%`;if(n===5){$("letterLock").textContent="🔓";$("letterHeading").textContent="Your secret letter is ready 💌";$("letterStatus").textContent="You completed every adventure. Tap below to open it!";$("unlockLetterBtn").textContent="Open my secret letter 💗"}else{$("letterStatus").textContent=`${n} of 5 adventures complete. Keep going to unlock the letter.`}}
$("unlockLetterBtn").onclick=()=>{if(completed()===5){$("secretLetter").classList.remove("hidden");$("letterLock").textContent="💌";$("letterHeading").textContent="A little message from Anu";$("unlockLetterBtn").classList.add("hidden");confetti();showToast("Secret letter unlocked! Happy Birthday 💗")}else{showToast(`Only ${completed()}/5 adventures done — keep exploring! ✨`);$("letterProgress").style.width=`${completed()/5*100}%`}};
function confetti(){const emojis=["💗","✨","🎉","💕","🎂","🌸"];for(let i=0;i<28;i++){const e=document.createElement("span");e.textContent=emojis[Math.floor(Math.random()*emojis.length)];e.style.cssText=`position:fixed;left:${Math.random()*100}vw;top:${Math.random()*70+10}vh;font-size:${16+Math.random()*18}px;z-index:80;pointer-events:none;transition:transform 1.6s ease,opacity 1.6s ease`;document.body.appendChild(e);requestAnimationFrame(()=>{e.style.transform=`translate(${(Math.random()-.5)*180}px,${100+Math.random()*220}px) rotate(${Math.random()*300}deg)`;e.style.opacity="0"});setTimeout(()=>e.remove(),1800)}}
$("confettiBtn").onclick=confetti;
// Gentle background hearts
const bg=$(".floating-hearts");for(let i=0;i<13;i++){const h=document.createElement("span");h.className="floating-heart";h.textContent=["♡","♥","✦"][i%3];h.style.left=`${Math.random()*100}%`;h.style.fontSize=`${12+Math.random()*18}px`;h.style.animationDuration=`${12+Math.random()*18}s`;h.style.animationDelay=`${Math.random()*-20}s`;h.style.color=i%2?"#f4a5c4":"#c7b4f4";bg.appendChild(h)}
renderQuestion();updateStats();
