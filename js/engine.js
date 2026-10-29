(() => {
 const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
 const title=$("#title-screen"),adv=$("#adv-screen"),dialogue=$("#dialogue"),speakerEl=$("#speaker"),textEl=$("#text"),
 routePanel=$("#route-panel"),notice=$("#notice"),logPanel=$("#log-panel"),logContent=$("#log-content"),configPanel=$("#config-panel"),helpPanel=$("#help-panel"),
 evidenceAcquire=$("#evidence-acquire"),evidenceAcquireTitle=$("#evidence-acquire-title"),evidenceAcquireBody=$("#evidence-acquire-body"),
 investigationPanel=$("#investigation-panel"),investigationResult=$("#investigation-result"),investigationProgress=$("#investigation-progress"),
 interviewPanel=$("#interview-panel"),interviewResult=$("#interview-result"),interviewProgress=$("#interview-progress"),
 evidencePanel=$("#evidence-panel"),evidenceList=$("#evidence-list"),
 deductionPanel=$("#deduction-panel"),deductionList=$("#deduction-list"),deductionCount=$("#deduction-count"),deductionSubmit=$("#deduction-submit"),
 choiceBox=$("#choice-box"),
 caseResultPanel=$("#case-result-panel"),caseResultKicker=$("#case-result-kicker"),caseResultTitle=$("#case-result-title"),caseResultText=$("#case-result-text"),caseResultStats=$("#case-result-stats"),caseProgressRow=$("#case-progress-row"),caseResultNext=$("#case-result-next"),
 saveLoadPanel=$("#save-load-panel"),saveLoadKicker=$("#save-load-kicker"),saveLoadTitle=$("#save-load-title"),manualSlot=$("#manual-slot"),autoSlot=$("#auto-slot"),manualSlotMain=$("#manual-slot-main"),manualSlotSub=$("#manual-slot-sub"),autoSlotMain=$("#auto-slot-main"),autoSlotSub=$("#auto-slot-sub"),
 allClearSummary=$("#all-clear-summary"),titleClearBadge=$("#title-clear-badge"),eventCgOverlay=$("#event-cg-overlay"),eventCgImage=$("#event-cg-image"),eventCgClose=$("#event-cg-close"),
 bgmPlayer=$("#bgm-player"),caseFileOverlay=$("#case-file-overlay"),caseFileContinue=$("#case-file-continue"),routeStartOverlay=$("#route-start-overlay"),routeStartFile=$("#route-start-file"),routeStartTitle=$("#route-start-title"),routeStartClient=$("#route-start-client"),loadRecapOverlay=$("#load-recap-overlay"),loadRecapFile=$("#load-recap-file"),loadRecapScene=$("#load-recap-scene"),loadRecapText=$("#load-recap-text"),sceneTransition=$("#scene-transition");
 const endingOverlay=$("#ending-overlay"),endingImage=$("#ending-image"),endingEnd=$("#ending-end"),endingCreditsViewport=$("#ending-credits-viewport"),endingCredits=$("#ending-credits"),endingBlackout=$("#ending-blackout");

 let state={mode:"title",scene:"intro",index:0,log:[],auto:false,skip:false,route:null,evidence:[],investigation:{},interviews:{},interview:null,interviewHub:false,deductionOpen:false,epilogueResult:null};
 let autoTimer=null,skipTimer=null,textTimer=null,currentVoice=null,lastVoiceSrc=null,lastVoiceLine=null,transitionTimer=null;
 let endingTimers=[];
 let eventCgReturnMode=null;
 let typingActive=false,typingFullText="",typingLine=null;
 let settings=JSON.parse(localStorage.getItem("bocchi_adv_settings")||'{"bgm":45,"se":60,"voice":90,"voiceMuted":false,"textSpeed":"normal","effects":true,"skipStopUnread":true,"skipSpeed":90}');
 const BGM_GAIN=0.65;
 const SE_GAIN=0.50;
 if(typeof settings.voiceMuted!=="boolean")settings.voiceMuted=false;
 if(!["instant","fast","normal","slow"].includes(settings.textSpeed))settings.textSpeed="normal";
 if(typeof settings.skipStopUnread!=="boolean")settings.skipStopUnread=true;
 if(![55,90,140].includes(Number(settings.skipSpeed)))settings.skipSpeed=90;
 settings.skipSpeed=Number(settings.skipSpeed);
 const ALL_CLOSED_ENDING_KEY="bocchi_all_closed_ending_v1";
 const READ_KEY="bocchi_read_lines_v1";
 const SAVE_KEY="bocchi_adv_save_v09";
 const AUTO_SAVE_KEY="bocchi_adv_autosave_v019";
 const OLD_SAVE_KEY="bocchi_adv_save_v08";
 const PROGRESS_KEY="bocchi_adv_case_progress_v041";
 const SCORE_KEY="bocchi_adv_case_scores_v042";

 const portraitFile={
   kujo:"assets/images/official_kujo_normal.webp",suzu:"assets/images/official_suzu_normal.webp",
   koharu:"assets/images/official_koharu_normal.webp",naoto:"assets/images/official_naoto_normal.webp",
   komiyama:"assets/images/official_komiyama_normal.webp",yuma:"assets/images/official_yuma_normal.webp",kazami:"assets/images/official_kazami_normal.webp",asakura:"assets/images/official_asakura_normal.webp",
   rina:"assets/images/official_rina_normal.webp",mikoto:"assets/images/official_mikoto_normal.webp",takumi:"assets/images/official_takumi_normal.webp",yuto:"assets/images/official_yuto_normal.webp",hanako:"assets/images/official_hanako_normal.png"
 };
 const portraitExpr={
   naoto:{normal:"assets/images/official_naoto_normal.webp",happy:"assets/images/official_naoto_normal.webp",excited:"assets/images/official_naoto_normal.webp",troubled:"assets/images/official_naoto_troubled.webp",angry:"assets/images/official_naoto_angry.webp",surprised:"assets/images/official_naoto_surprised.webp"},
   kujo:{normal:"assets/images/official_kujo_normal.webp",calm:"assets/images/official_kujo_normal.webp",firm:"assets/images/official_kujo_normal.webp",stern:"assets/images/official_kujo_angry.webp",angry:"assets/images/official_kujo_angry.webp",surprised:"assets/images/official_kujo_surprised.webp"},
   suzu:{normal:"assets/images/official_suzu_normal.webp",smile:"assets/images/official_suzu_normal.webp",cheerful:"assets/images/official_suzu_fun.webp",fun:"assets/images/official_suzu_fun.webp",playful:"assets/images/official_suzu_smug.webp",smug:"assets/images/official_suzu_smug.webp",surprised:"assets/images/official_suzu_normal.webp"},
   koharu:{normal:"assets/images/official_koharu_normal.webp",smile:"assets/images/official_koharu_normal.webp",earnest:"assets/images/official_koharu_please.webp",gentle:"assets/images/official_koharu_please.webp",please:"assets/images/official_koharu_please.webp",surprised:"assets/images/official_koharu_troubled.webp",troubled:"assets/images/official_koharu_troubled.webp"},
   komiyama:{normal:"assets/images/official_komiyama_normal.webp",anxious:"assets/images/official_komiyama_anxious.webp",troubled:"assets/images/official_komiyama_anxious.webp"},
   yuma:{normal:"assets/images/official_yuma_normal.webp"},
   kazami:{normal:"assets/images/official_kazami_normal.webp",irritated:"assets/images/official_kazami_irritated.webp",confused:"assets/images/official_kazami_confused.webp"},
   asakura:{normal:"assets/images/official_asakura_normal.webp",smug:"assets/images/official_asakura_smug.webp",flustered:"assets/images/official_asakura_flustered.webp",happy:"assets/images/official_asakura_happy.webp"},
   rina:{normal:"assets/images/official_rina_normal.webp",anxious:"assets/images/official_rina_anxious.webp",troubled:"assets/images/official_rina_anxious.webp"},
   mikoto:{normal:"assets/images/official_mikoto_normal.webp",confused:"assets/images/official_mikoto_confused.webp"},
   takumi:{normal:"assets/images/official_takumi_normal.webp",confused:"assets/images/official_takumi_normal.webp",anxious:"assets/images/official_takumi_normal.webp",flustered:"assets/images/official_takumi_normal.webp"},
   yuto:{normal:"assets/images/official_yuto_normal.webp",troubled:"assets/images/official_yuto_troubled.webp",sad:"assets/images/official_yuto_sad.webp",serious:"assets/images/official_yuto_serious.webp",surprised:"assets/images/official_yuto_surprised.webp",smile:"assets/images/official_yuto_smile.webp"},
   hanako:{normal:"assets/images/official_hanako_normal.png"}
 };
 const portraitPreloadCache=[];
 function preloadPortraitAssets(){
   const urls=new Set(Object.values(portraitFile));
   Object.values(portraitExpr).forEach(group=>Object.values(group||{}).forEach(src=>urls.add(src)));
   urls.forEach(src=>{
     if(!src)return;
     const img=new Image();
     img.decoding="async";
     img.src=src;
     portraitPreloadCache.push(img);
   });
 }
 let audioUnlocked=false;
 const seFiles={
   confirm:"assets/audio/se/confirm.wav",hover:"assets/audio/se/title_hover.wav",page:"assets/audio/se/page.wav",evidence:"assets/audio/se/evidence.wav",
   success:"assets/audio/se/deduction_success.wav",fail:"assets/audio/se/deduction_fail.wav"
 };

 function applyEffectsSetting(){document.body.classList.toggle("effects-off",!settings.effects)}
 function syncSettingsUI(){
   $("#bgm-volume").value=settings.bgm;$("#se-volume").value=settings.se;$("#voice-volume").value=settings.voice;
   $("#voice-mute").checked=!!settings.voiceMuted;
   $("#text-speed").value=settings.textSpeed;$("#screen-effects").checked=settings.effects;
   $("#skip-stop-unread").checked=!!settings.skipStopUnread;$("#skip-speed").value=String(settings.skipSpeed);applyEffectsSetting();
 }
 function saveSettings(){localStorage.setItem("bocchi_adv_settings",JSON.stringify(settings))}
 function showNotice(msg){notice.textContent=msg;notice.classList.remove("hidden");setTimeout(()=>notice.classList.add("hidden"),1200)}

 function loadCaseProgress(){
   try{return JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{}}catch(e){return{}}
 }
 function saveCaseProgress(progress){localStorage.setItem(PROGRESS_KEY,JSON.stringify(progress||{}))}

 function loadCaseScores(){
   try{return JSON.parse(localStorage.getItem(SCORE_KEY)||'{}')||{}}catch(e){return{}}
 }
 function saveCaseScores(scores){localStorage.setItem(SCORE_KEY,JSON.stringify(scores||{}))}
 function resetClearData(){
   if(!confirm("FILEの解決済み・BEST評価・エンディング既読・既読台詞情報を初期化します。セーブデータと音量設定は残ります。よろしいですか？"))return;
   localStorage.removeItem(PROGRESS_KEY);
   localStorage.removeItem(SCORE_KEY);
   localStorage.removeItem(ALL_CLOSED_ENDING_KEY);
   localStorage.removeItem(READ_KEY);readLines=new Set();
   updateRouteProgressUI();
   showNotice("クリアデータを初期化しました");
 }

 function loadReadLines(){
   try{return new Set(JSON.parse(localStorage.getItem(READ_KEY)||"[]"))}catch(e){return new Set()}
 }
 function saveReadLines(set){localStorage.setItem(READ_KEY,JSON.stringify([...set]))}
 let readLines=loadReadLines();
 function currentReadKey(){
   if(state.interview&&state.interview.who)return `interview:${state.route||""}:${state.interview.who}:${state.interview.index||0}`;
   return `${state.scene||""}:${state.route||""}:${state.epilogueResult||""}:${state.index||0}`;
 }
 function markCurrentRead(){const k=currentReadKey();if(!k||readLines.has(k))return;readLines.add(k);saveReadLines(readLines)}
 function updateSkipButton(){const b=$("#skip-btn");if(!b)return;b.textContent=state.skip?"SKIP ●":"SKIP";b.classList.toggle("playing",!!state.skip);b.setAttribute("aria-pressed",state.skip?"true":"false")}
 function stopSkip(show=false){clearTimeout(skipTimer);state.skip=false;updateSkipButton();if(show)showNotice("未読の台詞でSKIPを停止しました")}
 function scheduleSkip(line){
   clearTimeout(skipTimer);if(!state.skip)return;
   if(!line||line.action){stopSkip(false);return}
   const unread=!readLines.has(currentReadKey());
   if(settings.skipStopUnread&&unread){stopSkip(true);return}
   stopCurrentVoice();skipTimer=setTimeout(advance,settings.skipSpeed);
 }

 function currentInsightValue(){
   if(state.route==="suzu")return typeof state.suzuInsight==="number"?state.suzuInsight:3;
   if(state.route==="kujo")return typeof state.kujoInsight==="number"?state.kujoInsight:3;
   if(state.route==="koharu")return typeof state.koharuInsight==="number"?state.koharuInsight:3;
   return 3;
 }
 function currentMistakes(){return Math.max(0,3-currentInsightValue())}
 function scoreRank(solved,insight){
   if(!solved)return "UNRESOLVED";
   if(insight>=3)return "S";
   if(insight===2)return "A";
   if(insight===1)return "B";
   return "C";
 }
 function routeFileLabel(route){return route==="suzu"?"FILE 01":route==="kujo"?"FILE 02":route==="koharu"?"FILE 03":"生徒会相談録"}
 function updateTitleClearBadge(progress=loadCaseProgress(),scores=loadCaseScores()){
   if(!titleClearBadge)return;
   const routes=['suzu','kujo','koharu'];
   const allSolved=routes.every(r=>progress[r]==='solved');
   if(!allSolved){titleClearBadge.classList.add('hidden');titleClearBadge.innerHTML='';return}
   const bestSummary=routes.map(r=>{const sc=scores[r]||{};const stars='★'.repeat(sc.insight??0)+'☆'.repeat(Math.max(0,3-(sc.insight??0)));return `<span>${routeFileLabel(r)} <b>${sc.rank||'—'}</b> ${stars}</span>`}).join('');
   titleClearBadge.innerHTML=`<strong>全件解決済</strong><div>${bestSummary}</div>`;
   titleClearBadge.classList.remove('hidden');
 }
 function updateRouteProgressUI(){
   const progress=loadCaseProgress(),scores=loadCaseScores();
   const routes=['suzu','kujo','koharu'];
   const allSolved=routes.every(r=>progress[r]==='solved');
   if(allClearSummary){
     if(allSolved){
       const bestSummary=routes.map(r=>{const sc=scores[r]||{};return `${routeFileLabel(r)} ${sc.rank||'—'} ${'★'.repeat(sc.insight??0)}${'☆'.repeat(Math.max(0,3-(sc.insight??0)))}`}).join('　');
       allClearSummary.innerHTML=`<strong>全件解決済</strong><span>${bestSummary}</span><small>解決済みのFILEはいつでも再調査できます。</small><button type="button" class="ending-replay-btn">エンドロールを見る</button>`;
       const replayEndingBtn=allClearSummary.querySelector('.ending-replay-btn');
       if(replayEndingBtn)replayEndingBtn.onclick=e=>{e.stopPropagation();playSe('confirm');replayEndingFromMenu();};
       allClearSummary.classList.remove('hidden');
     }else{allClearSummary.classList.add('hidden');allClearSummary.innerHTML=''}
   }
   $$('.route-card').forEach(card=>{
     const route=card.dataset.route,status=progress[route]||null,seal=card.querySelector('.route-seal'),foot=card.querySelector('.route-footer em'),stateLabel=card.querySelector('.route-state');
     const score=scores[route]||null;
     card.classList.toggle('case-solved',status==='solved');
     card.classList.toggle('case-unresolved',status==='unresolved');
     if(seal)seal.textContent=status==='solved'?'解決済':status==='unresolved'?'未解決':'調査';
     if(foot)foot.textContent=status==='solved'?'もう一度調査':status==='unresolved'?'再調査':'調査開始';
     if(stateLabel)stateLabel.textContent='状態　'+(status==='solved'?'解決済':status==='unresolved'?'未解決':'未調査');
     let best=card.querySelector('.route-best');
     if(!best){best=document.createElement('span');best.className='route-best';card.appendChild(best)}
     if(score&&score.solved){
       const stars='★'.repeat(score.insight??3)+'☆'.repeat(Math.max(0,3-(score.insight??3)));
       best.innerHTML=`<small>BEST</small><b>${score.rank||'S'}</b><em>${stars}</em>`;
       best.classList.remove('hidden');
     }else{best.classList.add('hidden');best.innerHTML=''}
   });
   updateTitleClearBadge(progress,scores);
 }
 function renderCaseProgressChips(progress){
   if(!caseProgressRow)return;
   const items=[['suzu','FILE 01'],['kujo','FILE 02'],['koharu','FILE 03']];
   caseProgressRow.innerHTML=items.map(([route,label])=>{
     const status=progress[route]||'';
     const text=status==='solved'?'解決済':status==='unresolved'?'未解決':'未調査';
     return `<span class="case-progress-chip ${status}">${label}<br>${text}</span>`;
   }).join('');
 }
 function finishCase(){
   const progress=loadCaseProgress();
   const solved=state.epilogueResult==='success';
   const insight=currentInsightValue(),mistakes=currentMistakes(),rank=scoreRank(solved,insight);
   progress[state.route]=solved?'solved':'unresolved';
   saveCaseProgress(progress);updateRouteProgressUI();renderCaseProgressChips(progress);
   const scores=loadCaseScores(),prev=scores[state.route];
   const currentScore={solved,insight,mistakes,rank};
   const isNewBest=!prev ||
     (solved&&!prev.solved) ||
     (solved===!!prev.solved && insight>(prev.insight??-1)) ||
     (solved===!!prev.solved && insight===(prev.insight??-1) && mistakes<(prev.mistakes??999));
   if(isNewBest){scores[state.route]=currentScore;saveCaseScores(scores);}
   const best=scores[state.route]||currentScore;
   const allSolved=['suzu','kujo','koharu'].every(r=>progress[r]==='solved');
   const firstAllClosed=allSolved&&!localStorage.getItem(ALL_CLOSED_ENDING_KEY);
   state.finalEndingPending=firstAllClosed;
   if(caseResultKicker)caseResultKicker.textContent=allSolved?'全件解決済':solved?'解決済':'未解決';
   if(caseResultTitle)caseResultTitle.textContent=`${routeFileLabel(state.route)}「${SCENARIO.routes[state.route].title}」`;
   if(caseResultText)caseResultText.textContent=allSolved?'三件すべての相談を解決した。生徒会相談録の今回分はこれで完了。':solved?'推理は的中。相談は解決済みとして記録された。':'今回は真相へ届かなかった。未解決として記録され、いつでも再調査できる。';
   if(caseResultStats){
     caseResultStats.innerHTML=`<div class="result-rank ${solved?'solved':'unresolved'}"><span>RANK</span><strong>${rank}</strong></div><div class="result-stat"><span>推理精度</span><b>${'★'.repeat(insight)}${'☆'.repeat(Math.max(0,3-insight))}</b></div><div class="result-stat"><span>誤答</span><b>${mistakes}回</b></div><div class="result-stat best ${isNewBest?'new-best':''}"><span>${isNewBest?'NEW BEST':'BEST'}</span><b>${best.rank||rank} / ${'★'.repeat(best.insight??insight)}${'☆'.repeat(Math.max(0,3-(best.insight??insight)))}</b>${isNewBest?'<em>記録更新</em>':''}</div>`;
   }
   if(caseResultNext)caseResultNext.textContent=firstAllClosed?'エンディングへ':'相談一覧へ戻る';
   caseResultPanel.classList.remove('hidden');caseResultPanel.setAttribute('aria-hidden','false');dialogue.classList.add('hidden');setCharacters([]);
 }
 function closeCaseResult(){
   playSe('confirm');caseResultPanel.classList.add('hidden');caseResultPanel.setAttribute('aria-hidden','true');
   if(state.finalEndingPending){
     state.finalEndingPending=false;state.scene='finale';state.route=null;state.index=0;state.evidence=[];state.investigation={};state.interviews={};state.interview=null;state.interviewHub=false;state.deductionOpen=false;state.epilogueResult=null;
     routePanel.classList.add('hidden');dialogue.classList.remove('hidden');const first=SCENARIO.finale&&SCENARIO.finale[0];if(first)renderLine(first);saveGame(true);return;
   }
   state.scene='routeSelect';state.route=null;state.index=0;state.evidence=[];state.investigation={};state.interviews={};state.interview=null;state.interviewHub=false;state.deductionOpen=false;state.epilogueResult=null;
   dialogue.classList.add('hidden');routePanel.classList.remove('hidden');updateRouteProgressUI();retrigger(routePanel,'route-enter');saveGame(true);
 }
 function clearEndingTimers(){endingTimers.forEach(t=>clearTimeout(t));endingTimers=[]}
 function endingLater(fn,ms){const t=setTimeout(fn,ms);endingTimers.push(t);return t}
 function fadeOutBgm(ms=2000){
   const start=Math.max(0,bgmPlayer.volume||0),steps=20,stepMs=Math.max(20,Math.floor(ms/steps));let i=0;
   const timer=setInterval(()=>{i++;bgmPlayer.volume=start*Math.max(0,1-i/steps);if(i>=steps){clearInterval(timer);bgmPlayer.volume=0}},stepMs);
   endingTimers.push(timer);
 }
 function startEndingSequence(){
   clearEndingTimers();clearTimeout(autoTimer);clearTimeout(skipTimer);stopCurrentVoice();stopSkip(false);state.auto=false;const autoBtn=$("#auto-btn");if(autoBtn)autoBtn.textContent="AUTO";
   dialogue.classList.add("hidden");setCharacters([]);
   if(!endingOverlay||!endingImage){finishFinale();return}
   endingOverlay.classList.remove("hidden","credits-mode");endingOverlay.setAttribute("aria-hidden","false");
   endingImage.src="assets/images/eventcg_finale_team.webp";endingImage.alt="事件解決後、生徒会室に集まった直人、こはる、九条、すずの4人";
   if(endingEnd)endingEnd.textContent="END";
   if(endingCreditsViewport)endingCreditsViewport.classList.add("hidden");
   if(endingCredits)endingCredits.classList.remove("run");
   if(endingBlackout){endingBlackout.style.transition="opacity 2s ease";endingBlackout.classList.remove("active");}
   // END is held for 3 seconds, then a 2-second fade to black.
   endingLater(()=>{if(endingBlackout)endingBlackout.classList.add("active")},3000);
   endingLater(()=>{
     endingImage.src="assets/images/eventcg_finale_all_closed.webp";endingImage.alt="巨大化したこはる、酒呑童子の九条、すず猫がそろったエンドロール背景";
     endingOverlay.classList.add("credits-mode");
     if(endingCreditsViewport)endingCreditsViewport.classList.remove("hidden");
     if(endingCredits){void endingCredits.offsetWidth;endingCredits.classList.add("run")}
     if(endingBlackout){endingBlackout.style.transition="none";endingBlackout.classList.remove("active");requestAnimationFrame(()=>{endingBlackout.style.transition="opacity 2s ease"})}
   },5000);
   // Same BGM continues; fade it only over the last two seconds of the 10-second credits.
   endingLater(()=>fadeOutBgm(2000),13000);
   endingLater(()=>finishFinale(),15000);
 }

 function finishFinale(){
   clearEndingTimers();
   if(endingOverlay){endingOverlay.classList.add('hidden');endingOverlay.classList.remove('credits-mode');endingOverlay.setAttribute('aria-hidden','true')}
   if(endingCredits)endingCredits.classList.remove('run');
   if(endingCreditsViewport)endingCreditsViewport.classList.add('hidden');
   if(endingBlackout)endingBlackout.classList.remove('active');
   localStorage.setItem(ALL_CLOSED_ENDING_KEY,'1');localStorage.removeItem(AUTO_SAVE_KEY);stopCurrentVoice();clearTimeout(autoTimer);
   updateTitleClearBadge();
   bgmPlayer.pause();
   transitionTo(()=>{adv.classList.remove('active');title.classList.add('active');dialogue.classList.add('hidden');routePanel.classList.add('hidden');caseResultPanel.classList.add('hidden');setCharacters([]);state={mode:'title',scene:'title',index:0,log:[],auto:false,skip:false,route:null,evidence:[],investigation:{},interviews:{},interview:null,interviewHub:false,deductionOpen:false,epilogueResult:null};});
 }


 function replayEndingFromMenu(){
   if(!['suzu','kujo','koharu'].every(r=>loadCaseProgress()[r]==='solved'))return;
   routePanel.classList.add('hidden');dialogue.classList.add('hidden');setCharacters([]);
   state.scene='finale';state.route=null;state.index=0;state.evidence=[];state.investigation={};state.interviews={};state.interview=null;state.interviewHub=false;state.deductionOpen=false;state.epilogueResult=null;
   setBgm('assets/audio/bgm/student_council_secret.mp3',true);
   startEndingSequence();
 }

 function playSe(name){
   if(name==="hover"&&!audioUnlocked)return;
   const src=seFiles[name];if(!src)return;
   const a=new Audio(src);a.volume=Math.max(0,Math.min(1,(settings.se/100)*SE_GAIN));a.play().catch(()=>{});
 }
 function setBgm(src,restart=false){
   if(!src)return;const current=bgmPlayer.getAttribute("src");
   if(current!==src){bgmPlayer.src=src;bgmPlayer.load()}else if(restart){bgmPlayer.currentTime=0}
   bgmPlayer.volume=Math.max(0,Math.min(1,(settings.bgm/100)*BGM_GAIN));bgmPlayer.play().catch(()=>{});
 }
 function updateVoiceButton(playing=false){
   const btn=$("#voice-replay-btn");if(!btn)return;
   btn.textContent=playing?"VOICE ●":"VOICE";
   btn.classList.toggle("playing",!!playing);
   btn.setAttribute("aria-pressed",playing?"true":"false");
 }
 function stopCurrentVoice(){
   if(!currentVoice){updateVoiceButton(false);return;}
   currentVoice.onended=null;currentVoice.pause();
   try{currentVoice.currentTime=0}catch(e){}
   currentVoice=null;updateVoiceButton(false);
 }
 function clearTyping(){clearTimeout(textTimer);typingActive=false;typingFullText="";typingLine=null}
 function finishTyping(){
   if(!typingActive)return false;
   clearTimeout(textTimer);textEl.textContent=typingFullText;typingActive=false;
   if(state.auto&&!currentVoice){clearTimeout(autoTimer);autoTimer=setTimeout(advance,700)}
   return true;
 }
 function startTyping(line){
   clearTyping();const full=(line&&line.text)||"";typingFullText=full;typingLine=line||null;
   if(!full||state.skip||settings.textSpeed==="instant"){textEl.textContent=full;return}
   const delay=settings.textSpeed==="fast"?12:settings.textSpeed==="slow"?48:28;
   let i=0;typingActive=true;textEl.textContent="";
   const step=()=>{
     if(!typingActive)return;
     i++;textEl.textContent=full.slice(0,i);
     if(i>=full.length){typingActive=false;if(state.auto&&!currentVoice){clearTimeout(autoTimer);autoTimer=setTimeout(advance,700)};return}
     textTimer=setTimeout(step,delay);
   };
   textTimer=setTimeout(step,delay);
 }
 function scheduleAuto(line,voice){
   clearTimeout(autoTimer);if(!state.auto)return;
   if(voice){
     voice.onended=()=>{if(currentVoice===voice){currentVoice=null;updateVoiceButton(false);autoTimer=setTimeout(advance,700)}};
     return;
   }
   if(typingActive)return;
   const base=settings.textSpeed==="instant"?500:settings.textSpeed==="fast"?850:settings.textSpeed==="slow"?1450:1100;
   const perChar=settings.textSpeed==="instant"?0:settings.textSpeed==="fast"?24:settings.textSpeed==="slow"?48:34;
   autoTimer=setTimeout(advance,Math.min(5000,base+(line.text||"").length*perChar));
 }
 function playVoice(src,line){
   stopCurrentVoice();
   lastVoiceSrc=src||null;lastVoiceLine=line||null;
   const replayBtn=$("#voice-replay-btn");if(replayBtn)replayBtn.disabled=!src;
   updateVoiceButton(false);
   if(!src||settings.voiceMuted){scheduleAuto(line,null);return}
   const a=new Audio(src);currentVoice=a;a.volume=Math.max(0,Math.min(1,settings.voice/100));updateVoiceButton(true);
   a.play().catch(()=>{if(currentVoice===a)currentVoice=null;updateVoiceButton(false);scheduleAuto(line,null)});
   scheduleAuto(line,a);
 }
 function replayCurrentVoice(){
   if(!lastVoiceSrc){showNotice("この台詞にはボイスがありません");return}
   if(settings.voiceMuted){showNotice("ボイスがミュートされています");return}
   stopCurrentVoice();clearTimeout(autoTimer);
   const a=new Audio(lastVoiceSrc);currentVoice=a;a.volume=Math.max(0,Math.min(1,settings.voice/100));updateVoiceButton(true);
   a.play().catch(()=>{if(currentVoice===a)currentVoice=null;updateVoiceButton(false);showNotice("ボイスを再生できませんでした");scheduleAuto(lastVoiceLine,null)});
   scheduleAuto(lastVoiceLine,a);
 }
 function transitionTo(fn,fadeMs=230){
   clearTimeout(transitionTimer);
   if(!settings.effects){fn();sceneTransition.classList.remove("active");return}
   sceneTransition.style.setProperty("--scene-fade-ms",`${fadeMs}ms`);
   sceneTransition.classList.add("active");
   transitionTimer=setTimeout(()=>{
     try{fn()}finally{requestAnimationFrame(()=>sceneTransition.classList.remove("active"));setTimeout(()=>sceneTransition.style.removeProperty("--scene-fade-ms"),fadeMs+40)}
   },fadeMs);
 }
 function runTimeFade(){
   stopCurrentVoice();clearTimeout(autoTimer);clearTimeout(skipTimer);
   transitionTo(()=>{
     state.index++;const next=currentList()[state.index];
     if(next){
       renderLine(next);
       if(next.action==="eventCG")requestAnimationFrame(()=>openEventCg(next));
     }
     saveGame(true);
   },1000);
 }
 function retrigger(el,cls){
   if(!el||!settings.effects)return;
   el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);
   setTimeout(()=>el.classList.remove(cls),420);
 }

 function setBg(bg){$("#background").className="background bg-"+(bg||"wide")}
 function setCharacters(chars){
   const wanted=new Map((chars||[]).map(([who,pos])=>[pos,who]));
   ["left","center","right"].forEach(pos=>{
     const e=$("#portrait-"+pos),who=wanted.get(pos);
     if(!who){e.className="portrait-slot "+pos+" hidden";e.dataset.who="";e.querySelector("img").removeAttribute("src");return}
     const changed=e.dataset.who!==who||e.classList.contains("hidden");
     e.className="portrait-slot "+pos+" "+who;e.dataset.who=who;
     const img=e.querySelector("img");if(img.getAttribute("src")!==portraitFile[who])img.src=portraitFile[who];
     if(changed)retrigger(e,"just-entered");
   });
 }
 function focusCharacter(who){
   $$(".portrait-slot:not(.hidden)").forEach(e=>{const active=!!who&&e.dataset.who===who;e.classList.toggle("dim",!!who&&!active);e.classList.toggle("speaking",active)});
 }
 function swapPortraitWhenReady(img,src){
   if(!img||!src||img.getAttribute("src")===src)return;
   img.dataset.pendingSrc=src;
   const loader=new Image();
   const commit=()=>{
     if(img.dataset.pendingSrc!==src)return;
     img.src=src;
     delete img.dataset.pendingSrc;
   };
   loader.onload=commit;
   loader.onerror=()=>{if(img.dataset.pendingSrc===src)delete img.dataset.pendingSrc};
   loader.src=src;
   if(loader.complete&&loader.naturalWidth)commit();
 }
 function applyExpression(who,expression){
   if(!expression||!who||!portraitExpr[who]||!portraitExpr[who][expression])return;
   const target=$$(".portrait-slot:not(.hidden)").find(e=>e.dataset.who===who);
   if(target){const img=target.querySelector("img"),src=portraitExpr[who][expression];swapPortraitWhenReady(img,src)}
 }
 function addLog(s,t){if(!t)return;const last=state.log[state.log.length-1];if(last&&last.speaker===s&&last.text===t)return;state.log.push({speaker:s,text:t});if(state.log.length>160)state.log.shift()}
 function ensureCaseState(){if(!Array.isArray(state.evidence))state.evidence=[];if(!state.investigation||typeof state.investigation!=="object")state.investigation={};if(!state.interviews||typeof state.interviews!=="object")state.interviews={};if(typeof state.interviewHub!=="boolean")state.interviewHub=false;if(state.interview===undefined)state.interview=null;if(typeof state.deductionOpen!=="boolean")state.deductionOpen=false;if(state.epilogueResult===undefined)state.epilogueResult=null}
 function hasEvidence(id){ensureCaseState();return state.evidence.some(x=>x.id===id)}
 function addEvidence(item){ensureCaseState();if(!item||hasEvidence(item.id))return false;state.evidence.push(item);playSe("evidence");saveGame(true);return true}
 function evidenceSource(item){
   if(item&&item.source)return item.source;
   const route=state.route||"";
   if(route==="suzu")return "FILE 01『消える弁当』 調査記録";
   if(route==="kujo")return "FILE 02『100点になる課題』 調査記録";
   if(route==="koharu")return "FILE 03『戻ってくる本』 調査記録";
   return "生徒会調査記録";
 }
 function renderEvidenceList(){
   ensureCaseState();
   if(!state.evidence.length){evidenceList.innerHTML=`<div class="evidence-empty">まだ証拠・重要情報はありません。</div>`;return;}
   evidenceList.innerHTML=`<div class="evidence-summary">記録済み <b>${state.evidence.length}</b> 件</div>`+state.evidence.map((x,i)=>`<div class="evidence-list-item"><div class="evidence-index">EVIDENCE ${String(i+1).padStart(2,"0")}</div><b>${x.title}</b><p>${x.body}</p><div class="evidence-source">入手元：${evidenceSource(x)}</div></div>`).join("");
 }
 function openEvidenceAcquire(item){clearTimeout(autoTimer);stopCurrentVoice();evidenceAcquire.dataset.id=item.id;evidenceAcquire.dataset.title=item.title;evidenceAcquire.dataset.body=item.body;evidenceAcquireTitle.textContent=item.title;evidenceAcquireBody.textContent=item.body;evidenceAcquire.classList.remove("hidden");evidenceAcquire.setAttribute("aria-hidden","false");dialogue.classList.add("hidden");playSe("evidence")}
 function closeEvidenceAcquire(){const item={id:evidenceAcquire.dataset.id,title:evidenceAcquire.dataset.title,body:evidenceAcquire.dataset.body};if(!hasEvidence(item.id)){ensureCaseState();state.evidence.push(item);saveGame(true)}evidenceAcquire.classList.add("hidden");evidenceAcquire.setAttribute("aria-hidden","true");dialogue.classList.remove("hidden");state.index++;const next=currentList()[state.index];if(next)renderLine(next)}
 const investigationSets={
   suzu:{
     title:"1年教室を調べる",
     lead:"3つの調査先には、それぞれ見るべきポイントがある。",
     finish:"調査結果を整理する",
     cards:[
       {key:"desk",no:"01",name:"机まわり",desc:"弁当箱や袋、机の中を確認する"},
       {key:"classmate",no:"02",name:"同級生への聞き込み",desc:"最近、紗季の席の近くにいた生徒を調べる"},
       {key:"lunch",no:"03",name:"昼休みの出入り",desc:"昼休みに教室へ戻ってきた生徒を確認する"}
     ],
     data:{
       desk:{direct:true,evidence:[{id:"desk_intact",title:"弁当袋と机",body:"弁当袋や弁当箱に乱暴に開けられた跡はない。財布・教科書など他の持ち物も無事。"}],result:"【物証】弁当袋や弁当箱にこじ開けた跡はない。机も荒らされていない。『学校で誰かが強引に盗った』形跡は見つからなかった。"},
       classmate:{direct:true,evidence:[{id:"suspect_classmate",title:"口論した同級生",body:"紗季と最近口論した同級生。朝の会話で弁当の中身を知っており、昼前に紗季の席の近くへ来ていた。本人は忘れ物を取りに来ただけだと話す。"}],result:"【人物】昼前、風見が紗季の席付近へ来ていた。弁当の中身も知っている。風見には『機会』がある。"},
       lunch:{direct:true,evidence:[{id:"suspect_foodie",title:"食べ物好きの生徒",body:"昼休みに何度も教室へ戻り、『今日も減ってた？』と紗季へ聞いていた。本人は噂を聞き、犯人を見つけようとしていたと話す。"}],result:"【時間】昼休み、朝倉が何度も教室へ戻っていた。被害発覚直前にも動いている。朝倉にも『機会』がある。"}
     }
   },
   kujo:{
     title:"回収箱の謎を調べる",
     lead:"人間犯説を検証しながら、夜の回収箱に何があるか絞り込む。",
     finish:"調査結果を整理する",
     cards:[
       {key:"teacher",no:"01",name:"担任に確認",desc:"回収箱の管理方法と鍵について確認する"},
       {key:"box",no:"02",name:"回収箱を調べる",desc:"先生から鍵を借り、箱の中を確認する"},
       {key:"timing",no:"03",name:"提出時間を確認",desc:"里奈と他の生徒の提出タイミングを比べる"}
     ],
     data:{
       teacher:{prompt:"担任に何を確認する？",options:[
         {label:"放課後の施錠と鍵の管理",correct:true,feedback:"放課後に箱は施錠され、鍵は担任が保管していた。美琴も拓海も答案を取り出せない。"},
         {label:"里奈の数学の成績",correct:false,feedback:"成績では、提出後に答案が書き換わった理由を説明できない。"},
         {label:"最近のクラス平均点",correct:false,feedback:"平均点は今回の現象とは関係が薄い。箱に誰が触れられたかを確認するべきだ。"}
       ],evidence:[
         {id:"locked_box",title:"施錠された回収箱",body:"回収箱は放課後から翌朝まで施錠され、鍵は担任が所持していた。美琴も拓海も中の答案を取り出せない。"},
         {id:"recent_box",title:"最近使われ始めた古い回収箱",body:"回収箱は長期間倉庫にしまわれており、担任が最近になって教室で再使用し始めた。"}
       ],result:"人間が夜の答案へ触れる経路はほぼ消えた。さらに、この箱は最近になって倉庫から戻された古い物だった。"},
       box:{prompt:"借りた鍵で回収箱を開けた。どこを見る？",options:[
         {label:"箱の底と隅に残った物",correct:true,feedback:"底の隅から、後端に消しゴムが付いた使い込まれた古い鉛筆が見つかった。"},
         {label:"箱の外側の傷",correct:false,feedback:"古い傷は多いが、答案が修正されたことには直接つながらない。"},
         {label:"投入口の幅だけ測る",correct:false,feedback:"答案を外から取り出せるほどの幅ではない。だが、それだけでは原因は分からない。"}
       ],evidence:[{id:"old_pencil",title:"箱の底の消しゴム付き古鉛筆",body:"回収箱の底から、後端に小さな消しゴムが付いた使い込まれた古い鉛筆が見つかった。"}],result:"回収箱の中には、答案以外に古い消しゴム付き鉛筆が残っていた。"},
       timing:{prompt:"提出時間について、何を確かめる？",options:[
         {label:"夜の間に箱へ残る答案は誰のものか",correct:true,feedback:"放課後に提出するのは里奈だけ。他の生徒は翌朝なので、夜の箱にある答案は里奈のものだけだ。"},
         {label:"誰が一番早く課題を解き終えるか",correct:false,feedback:"解き終える速さより、答案がいつ箱へ入るかが重要だ。"},
         {label:"課題を忘れた生徒の人数",correct:false,feedback:"未提出者の数では、里奈だけが修正された理由にならない。"}
       ],evidence:[{id:"rina_afterschool",title:"放課後に提出する藤崎里奈",body:"放課後のうちに課題を回収箱へ入れるのは里奈だけ。ほかの生徒は翌朝に提出する。"}],result:"『里奈だけ』ではなく、『夜の回収箱に入っている答案だけ』が条件なのかもしれない。"}
     }
   },
   koharu:{
     title:"戻ってくる本を調べる",
     lead:"一回目と二回目を同じ事件だと決めつけず、戻った理由を分けて調べる。",
     finish:"二度の『戻った』を整理する",
     cards:[
       {key:"records",no:"01",name:"除籍記録",desc:"本が正式に図書館資料から外された時点を確認する"},
       {key:"disposal",no:"02",name:"焼却物置き場",desc:"図書室から本を出した後の保管経路を確認する"},
       {key:"night",no:"03",name:"夜の図書室",desc:"本が戻った夜に何か見た者がいないか確かめる"}
     ],
     data:{
       records:{direct:true,evidence:[
         {id:"first_not_removed",title:"一回目は除籍未完了",body:"最初に焼却物置き場へ出された時点では、除籍処理がまだ完了しておらず、図書館資料として帳簿に残っていた。"},
         {id:"second_removed",title:"二回目は除籍完了後",body:"二度目に焼却物置き場へ出された時には、除籍処理は正式に完了していた。通常の職員が本棚へ戻す理由はない。"}
       ],result:"【記録】一回目と二回目では前提が違う。一回目は除籍未完了、二回目は正式な除籍後だった。"},
       disposal:{direct:true,evidence:[{id:"staff_first_return",title:"職員が戻した一回目",body:"一回目は、除籍されていない本が焼却物置き場にあるのを職員が見つけ、手続き上の誤りだと思って本棚へ戻していた。"}],result:"【経路】一回目は怪異ではない。未除籍の本を見つけた職員が、誤廃棄だと思って本棚へ戻していた。"},
       night:{direct:true,evidence:[],result:"【夜の図書室】目撃者がいるらしい。夜の図書室へ行き、本人から話を聞くことにした。"}
     }
   }
 };
 function currentInvestigationSet(){return investigationSets[state.route]||investigationSets.suzu}
 function currentInvestigationData(){return currentInvestigationSet().data}
 function investigationOptionsEl(){return $("#investigation-options")}
 function refreshInvestigation(){
   ensureCaseState();const set=currentInvestigationSet(),data=set.data,done=Object.keys(data).filter(k=>state.investigation[k]);
   investigationProgress.textContent=`${done.length} / ${Object.keys(data).length}`;
   investigationPanel.querySelector('h2').textContent=set.title;investigationPanel.querySelector('.investigation-lead').textContent=set.lead;$("#investigation-finish").textContent=set.finish;
   const cards=$$('.investigation-card');cards.forEach((b,i)=>{const m=set.cards[i];if(!m){b.classList.add('hidden');return}b.classList.remove('hidden');b.dataset.investigate=m.key;b.querySelector('b').textContent=m.no;b.querySelector('strong').textContent=m.name;b.querySelector('small').textContent=m.desc;const d=!!state.investigation[m.key];b.classList.toggle('done',d);b.querySelector('em').textContent=d?'調査済み':'未調査'});
   $("#investigation-finish").disabled=done.length<Object.keys(data).length
 }
 function clearInvestigationOptions(){const box=investigationOptionsEl();if(!box)return;box.innerHTML="";box.classList.add("hidden")}
 function openInvestigation(){clearTimeout(autoTimer);stopCurrentVoice();ensureCaseState();investigationPanel.classList.remove("hidden");investigationPanel.setAttribute("aria-hidden","false");dialogue.classList.add("hidden");setCharacters([]);refreshInvestigation();clearInvestigationOptions();investigationResult.textContent=currentInvestigationSet().lead}
 function inspectItem(key){
   const data=currentInvestigationData()[key];if(!data)return;ensureCaseState();playSe("confirm");
   if(state.investigation[key]){investigationResult.textContent=data.result;clearInvestigationOptions();return}
   if(data.direct){
     state.investigation[key]=true;(data.evidence||[]).forEach(addEvidence);investigationResult.textContent=data.result;clearInvestigationOptions();refreshInvestigation();saveGame(true);return
   }
   investigationResult.textContent=data.prompt;const box=investigationOptionsEl();
   box.innerHTML=data.options.map((opt,i)=>`<button class="investigation-option" data-key="${key}" data-option="${i}">${opt.label}</button>`).join("");box.classList.remove("hidden");
   $$('.investigation-option').forEach(btn=>btn.onclick=()=>chooseInvestigationFocus(btn.dataset.key,Number(btn.dataset.option)))
 }
 function chooseInvestigationFocus(key,index){
   const data=currentInvestigationData()[key],opt=data&&data.options[index];if(!data||!opt)return;playSe("confirm");
   if(!opt.correct){investigationResult.textContent=`${opt.feedback}　別の着眼点を選ぼう。`;return}
   if(!state.investigation[key]){state.investigation[key]=true;(data.evidence||[]).forEach(addEvidence)}
   investigationResult.textContent=`${opt.feedback}　【調査完了】`;clearInvestigationOptions();refreshInvestigation();saveGame(true);
   if(state.route==="kujo"&&key==="box"){
     openInvestigationCg("assets/images/eventcg_file02_pencil_discovery.webp","回収箱を開け、隅に残っていた古い消しゴム付き鉛筆を発見する場面");
   }
 }
 function finishInvestigation(){const data=currentInvestigationData();if(Object.keys(data).some(k=>!state.investigation[k]))return;playSe("confirm");investigationPanel.classList.add("hidden");investigationPanel.setAttribute("aria-hidden","true");clearInvestigationOptions();dialogue.classList.remove("hidden");state.index++;const next=currentList()[state.index];if(next)renderLine(next);saveGame(true)}
 const interviewScripts={
   kazami:[
     {chars:[["suzu","left"],["kazami","center"],["naoto","right"]],speaker:"風見蓮司",text:"……俺に何の用だよ。小宮山の弁当の話なら、俺は知らない。",focus:"kazami",expression:"irritated",voice:"assets/audio/voice/kazami_001.mp3"},
     {speaker:"水城すず",text:"まだ何も聞いてないのに、ずいぶん詳しいにゃ。紗季と最近ケンカしたって聞いたけど？",focus:"suzu",expression:"smug",voice:"assets/audio/voice/suzu_007.mp3"},
     {speaker:"風見蓮司",text:"くだらないことで言い合いになっただけだ。だからって弁当のおかずなんか盗るかよ。",focus:"kazami",expression:"irritated",voice:"assets/audio/voice/kazami_002.mp3"},
     {speaker:"直人",text:"昼前、小宮山の席の近くにいたのは？",focus:"naoto",expression:"normal",voice:"assets/audio/voice/naoto_011.mp3"},
     {speaker:"風見蓮司",text:"朝、机の横に消しゴム落としたんだよ。授業の合間に取りに行った。それだけだ。",focus:"kazami",expression:"confused",voice:"assets/audio/voice/kazami_003.mp3"},
     {speaker:"水城すず",text:"その日の弁当に唐揚げが入ってることも知ってたにゃ？",focus:"suzu",expression:"normal",voice:"assets/audio/voice/suzu_008.mp3"},
     {speaker:"風見蓮司",text:"朝、小宮山が友達に話してたのが聞こえた。クラスにいた奴なら何人も聞いてるだろ。",focus:"kazami",expression:"normal",voice:"assets/audio/voice/kazami_004.mp3"},
     {speaker:"直人",text:"席へ行く機会も、弁当の中身を知る機会もあった。でも、それだけじゃ盗った証拠にはならないな。",focus:"naoto",expression:"normal",voice:"assets/audio/voice/naoto_012.mp3"}
   ],
   asakura:[
     {chars:[["suzu","left"],["asakura","center"],["naoto","right"]],speaker:"朝倉夏帆",text:"あ、紗季ちゃんのお弁当のこと？　今日も減ってたの？",focus:"asakura",expression:"smug",voice:"assets/audio/voice/asakura_001.mp3"},
     {speaker:"直人",text:"その言い方だと、ずいぶん気にしてるみたいだな。昼休みに何度も教室へ戻ってるそうだけど。",focus:"naoto",expression:"normal",voice:"assets/audio/voice/naoto_013.mp3"},
     {speaker:"朝倉夏帆",text:"ち、違う違う！　食べたんじゃないよ！　むしろ犯人を見つけようとしてたの！",focus:"asakura",expression:"flustered",voice:"assets/audio/voice/asakura_002.mp3"},
     {speaker:"水城すず",text:"なんでそこまで首を突っ込んだのかにゃ？",focus:"suzu",expression:"normal",voice:"assets/audio/voice/suzu_009.mp3"},
     {speaker:"朝倉夏帆",text:"だって、おかずだけ一個ずつ消えるなんて気になるじゃん。誰がやってるのか見つけたら、ちょっと探偵っぽくて面白そうだし。",focus:"asakura",expression:"happy",voice:"assets/audio/voice/asakura_003.mp3"},
     {speaker:"直人",text:"『今日も減ってた？』って聞いたのは、盗った本人だからじゃなく、被害が続いたか確認してた？",focus:"naoto",expression:"normal",voice:"assets/audio/voice/naoto_014.mp3"},
     {speaker:"朝倉夏帆",text:"そうそう！　……まあ、紗季ちゃんのお弁当がおいしそうだなって思ったことはあるけど、勝手に食べたりしないよ。",focus:"asakura",expression:"normal",voice:"assets/audio/voice/asakura_004.mp3"},
     {speaker:"水城すず",text:"食べ物好きなのは本当。でも、それだけで犯人にはできないにゃ。",focus:"suzu",expression:"normal",voice:"assets/audio/voice/suzu_010.mp3"}
   ],
   mikoto:[
     {chars:[["kujo","left"],["mikoto","center"],["naoto","right"]],speaker:"黒川美琴",text:"里奈の課題のことですか。提出前に一問間違っているのは見ました。",focus:"mikoto",expression:"normal",voice:"assets/audio/voice/mikoto_001.mp3"},
     {speaker:"直人",text:"正しい答えも分かってた？",focus:"naoto",expression:"normal",voice:"assets/audio/voice/naoto_025.mp3"},
     {speaker:"黒川美琴",text:"もちろん。でも私は直していません。提出後の答案にも触っていません。",focus:"mikoto",expression:"confused",voice:"assets/audio/voice/mikoto_002.mp3"},
     {speaker:"九条玲",text:"放課後、教室へ戻ったそうだな。",voice:"assets/audio/voice/kujo_008.mp3",focus:"kujo",expression:"firm"},
     {speaker:"黒川美琴",text:"参考書を忘れたので取りに戻りました。それだけです。もう一つ直っていた問題は、私も今見るまで間違いに気づいていませんでした。",focus:"mikoto",expression:"confused",voice:"assets/audio/voice/mikoto_003.mp3"},
     {speaker:"直人",text:"誤答を知っていて、放課後にも教室へ戻った。でも二つ目の誤答までは知らなかった、か。",focus:"naoto",expression:"troubled",voice:"assets/audio/voice/naoto_026.mp3"}
   ],
   takumi:[
     {chars:[["kujo","left"],["takumi","center"],["naoto","right"]],speaker:"三浦拓海",text:"朝、回収箱の近くにいたのは本当です。日直だったので早く来てました。",focus:"takumi",expression:"confused",voice:"assets/audio/voice/takumi_001.mp3"},
     {speaker:"直人",text:"箱には触った？",focus:"naoto",expression:"normal",voice:"assets/audio/voice/naoto_027.mp3"},
     {speaker:"三浦拓海",text:"中には触ってません。……箱が少し斜めになっていたので、位置は直しました。",focus:"takumi",expression:"anxious",voice:"assets/audio/voice/takumi_002.mp3"},
     {speaker:"九条玲",text:"最初に『触っていない』と言ったな。",voice:"assets/audio/voice/kujo_009.mp3",focus:"kujo",expression:"stern"},
     {speaker:"三浦拓海",text:"中身には、って意味です。紛らわしくてすみません。鍵も持ってませんし、課題を取り出したりはしてません。",focus:"takumi",expression:"flustered",voice:"assets/audio/voice/takumi_003.mp3"},
     {speaker:"直人",text:"早朝に箱のそばにいて、外側には触った。でも中へ手を出した証拠はない。",focus:"naoto",expression:"troubled",voice:"assets/audio/voice/naoto_028.mp3"}
   ]
 };
 const interviewEvidence={
   kazami:{id:"kazami_statement",title:"風見蓮司の証言",body:"紗季と口論しており、弁当の中身も知っていた。昼前に紗季の席付近へ行ったが、落とした消しゴムを取りに行ったと説明。"},
   asakura:{id:"asakura_statement",title:"朝倉夏帆の証言",body:"昼休みに何度も教室へ戻り『今日も減ってた？』と聞いていた。本人は弁当を狙ったのではなく、犯人を見つけようとしていたと説明。"},
   mikoto:{id:"mikoto_returned",title:"美琴は放課後に教室へ戻った",body:"黒川美琴は忘れた参考書を取りに、里奈が課題を提出した後の教室へ一度戻っている。"},
   takumi:{id:"takumi_box",title:"拓海は早朝に回収箱へ触った",body:"三浦拓海は日直で早朝登校し、斜めになっていた回収箱の位置を直した。ただし中身には触っていないと証言。"}
 };
 function interviewKeys(){return state.route==="kujo"?["mikoto","takumi"]:["kazami","asakura"]}
 const interviewMeta={
   kazami:{name:"風見 蓮司",desc:"紗季と最近口論。昼前に紗季の席付近にいた。"},
   asakura:{name:"朝倉 夏帆",desc:"昼休みに何度も教室へ戻り、事件を気にしている。"},
   mikoto:{name:"黒川 美琴",desc:"里奈の誤答を知り、放課後に教室へ戻っている。"},
   takumi:{name:"三浦 拓海",desc:"翌朝かなり早く登校し、回収箱の近くにいた。"}
 };
 function refreshInterviewHub(){
   ensureCaseState();const keys=interviewKeys(),done=keys.filter(k=>state.interviews[k]);interviewProgress.textContent=`${done.length} / ${keys.length}`;
   const cards=$$('.interview-card');cards.forEach((b,i)=>{const k=keys[i],m=interviewMeta[k];b.dataset.interview=k;b.querySelector('b').textContent=String(i+1).padStart(2,'0');b.querySelector('strong').textContent=m.name;b.querySelector('small').textContent=m.desc;const d=!!state.interviews[k];b.classList.toggle('done',d);b.querySelector('em').textContent=d?'聴取済み':'未聴取'});
   interviewPanel.querySelector('h2').textContent=state.route==="kujo"?"関係者に話を聞く":"容疑者候補に話を聞く";
   interviewPanel.querySelector('.interview-lead').textContent="順番は自由。二人の証言を確かめる。";
   $("#interview-finish").disabled=done.length<keys.length;
   interviewResult.textContent=done.length===0?'話を聞く相手を選んでください。':done.length===1?'もう一人にも話を聞く必要がある。':state.route==="kujo"?'二人とも怪しく見えるが、答案へ触れた方法はまだ説明できない。':'二人の証言が揃った。どちらにも怪しい点はあるが、決定的な証拠はない。'
 }
 function openInterviewHub(){clearTimeout(autoTimer);stopCurrentVoice();ensureCaseState();state.interview=null;state.interviewHub=true;interviewPanel.classList.remove("hidden");interviewPanel.setAttribute("aria-hidden","false");dialogue.classList.add("hidden");setCharacters([]);refreshInterviewHub();saveGame(true)}
 function startInterview(who){if(!interviewScripts[who])return;playSe("confirm");state.interviewHub=false;state.interview={who,index:0};interviewPanel.classList.add("hidden");interviewPanel.setAttribute("aria-hidden","true");dialogue.classList.remove("hidden");renderLine(interviewScripts[who][0]);saveGame(true)}
 function completeInterview(){const who=state.interview&&state.interview.who;if(!who)return;state.interviews[who]=true;addEvidence(interviewEvidence[who]);state.interview=null;state.interviewHub=true;openInterviewHub()}
 function finishInterviewHub(){ensureCaseState();const keys=interviewKeys();if(keys.some(k=>!state.interviews[k]))return;playSe("confirm");state.interviewHub=false;interviewPanel.classList.add("hidden");interviewPanel.setAttribute("aria-hidden","true");dialogue.classList.remove("hidden");state.index++;const next=currentList()[state.index];if(next)renderLine(next);saveGame(true)}


 function openKujoExperiment(){
   clearTimeout(autoTimer);stopCurrentVoice();ensureCaseState();dialogue.classList.add("hidden");choiceBox.classList.remove("hidden");
   if(typeof state.kujoInsight!=="number")state.kujoInsight=3;
   state.kujoExperimentStage=1;renderKujoExperiment();saveGame(true)
 }
 function kujoStars(){return "★".repeat(Math.max(0,state.kujoInsight||0))+"☆".repeat(Math.max(0,3-(state.kujoInsight||0)))}
 function renderKujoExperiment(){
   const stage=state.kujoExperimentStage||1;
   if(stage===1){
     choiceBox.innerHTML=`<div class="hypothesis-board"><div class="hypothesis-kicker">条件整理　${kujoStars()}</div><h2>3つの調査結果から共通条件を絞れ</h2><div class="hypothesis-clues"><span>施錠：夜は人間が答案に触れない</span><span>箱の中：古い消しゴム付き鉛筆</span><span>提出時間：夜に残る答案は里奈だけ</span></div><p>答案が直る現象を説明するうえで、まず疑うべき条件はどれだ？</p><button data-kujo-hyp="nightbox">夜のあいだ回収箱の中にあること</button><button data-kujo-hyp="mikoto">美琴が誤答を知っていること</button><button data-kujo-hyp="takumi">拓海が翌朝早く登校すること</button></div>`;
   }else{
     choiceBox.innerHTML=`<div class="hypothesis-board"><div class="hypothesis-kicker">再現実験　${kujoStars()}</div><h2>「夜の回収箱」が原因か、どう切り分ける？</h2><p>人ではなく条件を検証する。比較対象を置いて、一晩で差が出る方法を選べ。</p><button data-kujo-test="control">同じ誤答案を二枚用意し、片方だけ回収箱へ入れて一晩置く</button><button data-kujo-test="watch">美琴と拓海を一晩見張る</button><button data-kujo-test="day">昼間だけ回収箱へ誤答案を入れて様子を見る</button></div>`;
   }
   $$('#choice-box button[data-kujo-hyp]').forEach(b=>b.onclick=()=>chooseKujoHypothesis(b.dataset.kujoHyp));
   $$('#choice-box button[data-kujo-test]').forEach(b=>b.onclick=()=>chooseKujoTest(b.dataset.kujoTest));
 }
 function kujoMiss(message){
   state.kujoInsight=Math.max(0,(state.kujoInsight??3)-1);playSe("fail");showNotice(message);renderKujoExperiment();saveGame(true)
 }
 function chooseKujoHypothesis(key){
   playSe("confirm");
   if(key!=="nightbox"){
     kujoMiss(key==="mikoto"?"美琴が誤答を知っていても、施錠後の答案には触れない。人ではなく現象が起こる条件を見るべきだ。":"拓海が来るのは翌朝だ。里奈の答案が一晩だけ箱に残る点を説明できない。");return
   }
   state.kujoExperimentStage=2;renderKujoExperiment();saveGame(true)
 }
 function chooseKujoTest(key){
   playSe("confirm");
   if(key!=="control"){
     kujoMiss(key==="watch"?"人を見張っても、『夜の回収箱』という条件そのものは検証できない。":"昼だけでは夜に起きる現象かどうか比較できない。対照実験が必要だ。");return
   }
   addEvidence({id:"overnight_test",title:"一晩置いた再現答案",body:"同じ誤答を書いた二枚の紙を用意し、片方だけを夜の回収箱へ入れた。翌朝、回収箱側だけが正答へ修正されていた。"});
   choiceBox.classList.add("hidden");choiceBox.innerHTML="";dialogue.classList.remove("hidden");state.kujoExperimentStage=0;state.index++;const next=currentList()[state.index];if(next)renderLine(next);showNotice(`推理精度 ${kujoStars()}`);saveGame(true)
 }

 function openSuzuHypothesis(){
   clearTimeout(autoTimer);stopCurrentVoice();ensureCaseState();dialogue.classList.add("hidden");choiceBox.classList.remove("hidden");
   if(typeof state.suzuInsight!=="number")state.suzuInsight=3;
   state.suzuHypothesisStage=1;renderSuzuHypothesis();saveGame(true)
 }
 function suzuStars(){return "★".repeat(Math.max(0,state.suzuInsight||0))+"☆".repeat(Math.max(0,3-(state.suzuInsight||0)))}
 function renderSuzuHypothesis(){
   const stage=state.suzuHypothesisStage||1;
   if(stage===1){
     choiceBox.innerHTML=`<div class="hypothesis-board"><div class="hypothesis-kicker">推理ボード　${suzuStars()}</div><h2>3つの調査結果をつなげろ</h2><div class="hypothesis-clues"><span>机：荒らされた跡なし</span><span>風見：昼前に席へ接近</span><span>朝倉：昼休みに出入り</span></div><p>ここまで調べても、まだ一度も確かめていない時間帯はどこだ？</p><button data-suzu-hyp="before">学校に着く前</button><button data-suzu-hyp="kazami">昼前・風見が近づいた時間</button><button data-suzu-hyp="asakura">昼休み・朝倉が戻った時間</button></div>`;
   }else{
     choiceBox.innerHTML=`<div class="hypothesis-board"><div class="hypothesis-kicker">検証計画　${suzuStars()}</div><h2>「学校に着く前」をどう確かめる？</h2><p>推測ではなく、次の一手で時間帯を切り分ける。</p><button data-suzu-test="arrival">翌朝、登校直後に弁当を開けて確認する</button><button data-suzu-test="tail">風見を朝から尾行する</button><button data-suzu-test="search">朝倉の鞄を調べる</button></div>`;
   }
   $$('#choice-box button[data-suzu-hyp]').forEach(b=>b.onclick=()=>chooseSuzuHypothesis(b.dataset.suzuHyp));
   $$('#choice-box button[data-suzu-test]').forEach(b=>b.onclick=()=>chooseSuzuTest(b.dataset.suzuTest));
 }
 function suzuMiss(message){
   state.suzuInsight=Math.max(0,(state.suzuInsight??3)-1);playSe("fail");showNotice(message);renderSuzuHypothesis();saveGame(true)
 }
 function chooseSuzuHypothesis(key){
   playSe("confirm");
   if(key!=="before"){suzuMiss(key==="kazami"?"風見の時間帯はすでに調査済みだ。未検証なのはもっと前だ。":"朝倉の時間帯もすでに調査済みだ。未検証なのはもっと前だ。");return}
   state.suzuHypothesisStage=2;renderSuzuHypothesis();saveGame(true)
 }
 function chooseSuzuTest(key){
   playSe("confirm");
   if(key!=="arrival"){suzuMiss(key==="tail"?"風見を追っても、学校へ来る前に減っていた可能性は検証できない。":"朝倉を調べても、登校前の時間帯は切り分けられない。");return}
   addEvidence({id:"arrival_check",title:"登校直後の確認",body:"翌朝、登校直後に弁当を確認すると、その時点ですでにおかずが一品減っていた。学校内の容疑者が触る前から被害が起きている。"});
   choiceBox.classList.add("hidden");choiceBox.innerHTML="";dialogue.classList.remove("hidden");state.suzuHypothesisStage=0;state.index++;const next=currentList()[state.index];if(next)renderLine(next);showNotice(`推理精度 ${suzuStars()}`);saveGame(true)
 }
 function openKoharuHypothesis(){
   clearTimeout(autoTimer);stopCurrentVoice();ensureCaseState();dialogue.classList.add("hidden");choiceBox.classList.remove("hidden");
   if(typeof state.koharuInsight!=="number")state.koharuInsight=3;
   state.koharuHypothesisStage=1;renderKoharuHypothesis();saveGame(true)
 }
 function koharuStars(){return "★".repeat(Math.max(0,state.koharuInsight||0))+"☆".repeat(Math.max(0,3-(state.koharuInsight||0)))}
 function renderKoharuHypothesis(){
   const stage=state.koharuHypothesisStage||1;
   if(stage===1){
     choiceBox.innerHTML=`<div class="hypothesis-board"><div class="hypothesis-kicker">二重事件の整理　${koharuStars()}</div><h2>二度の「戻った」は同じ原因か？</h2><div class="hypothesis-clues"><span>一回目：除籍未完了</span><span>一回目：職員が戻した</span><span>二回目：除籍完了後</span><span>夜：三年生男子の目撃</span></div><p>ここまでの情報から、まず何を切り分けるべきだ？</p><button data-koharu-hyp="separate">一回目と二回目は別の理由で戻った</button><button data-koharu-hyp="hanako">二回とも花子さんが戻した</button><button data-koharu-hyp="book">本そのものが自力で戻った</button></div>`;
   }else{
     choiceBox.innerHTML=`<div class="hypothesis-board"><div class="hypothesis-kicker">二回目の動機　${koharuStars()}</div><h2>除籍後の本を、なぜ生徒が戻す？</h2><p>目撃された三年生の男子を調べる。最も重要なのはどの情報だ？</p><button data-koharu-test="memory">その本と本人の過去の関係を調べる</button><button data-koharu-test="grades">最近の成績を調べる</button><button data-koharu-test="club">所属する部活だけを調べる</button></div>`;
   }
   $$('#choice-box button[data-koharu-hyp]').forEach(b=>b.onclick=()=>chooseKoharuHypothesis(b.dataset.koharuHyp));
   $$('#choice-box button[data-koharu-test]').forEach(b=>b.onclick=()=>chooseKoharuTest(b.dataset.koharuTest));
 }
 function koharuMiss(message){state.koharuInsight=Math.max(0,(state.koharuInsight??3)-1);playSe("fail");showNotice(message);renderKoharuHypothesis();saveGame(true)}
 function chooseKoharuHypothesis(key){
   playSe("confirm");
   if(key!=="separate"){koharuMiss(key==="hanako"?"花子さんは二度目の夜に男子生徒を見ただけで、本には触れていない。":"一回目は職員が戻した事実がある。同じ原因で二度戻ったと考える必要はない。");return}
   state.koharuHypothesisStage=2;renderKoharuHypothesis();saveGame(true)
 }
 function chooseKoharuTest(key){
   playSe("confirm");
   if(key!=="memory"){koharuMiss(key==="grades"?"成績では、処分された本を戻す動機は見えない。":"部活だけでは、その本に執着する理由までは分からない。");return}
   addEvidence({id:"yuto_second_return",title:"二回目は橘先輩が戻した",body:"花子さんの目撃と図書室の記録から、二度目に本棚へ戻した人物は三年生の橘悠斗だと分かった。"});
   addEvidence({id:"yuto_memory",title:"戻した理由：母との思い出",body:"問題の本は、亡くなった母親が幼い橘先輩へ何度も読んでくれた思い出の一冊だった。処分されるのが嫌で、自分で本棚へ戻していた。"});
   choiceBox.classList.add("hidden");choiceBox.innerHTML="";dialogue.classList.remove("hidden");state.koharuHypothesisStage=0;state.index++;const next=currentList()[state.index];if(next)renderLine(next);showNotice(`推理精度 ${koharuStars()}`);saveGame(true)
 }
 const deductionCorrect={
   suzu:["arrival_check","mother_testimony","kitchen_gap","yuma_favorite"],
   kujo:["rina_afterschool","locked_box","old_pencil","overnight_test"],
   koharu:["staff_first_return","yuto_second_return","yuto_memory"]
 };
 const deductionCardsByRoute={
   suzu:[
     {id:"arrival_check",title:"登校直後には、すでに減っていた",body:"翌朝、紗季が学校へ着いてすぐ弁当を確認すると、その時点でおかずが一品なくなっていた。"},
     {id:"decoy_suzu_schooltime",title:"おかずは昼休みに初めて減った",body:"登校直後には全部そろっており、昼休みになってから初めて一品なくなった。"},
     {id:"mother_testimony",title:"母親は朝、すべてのおかずを詰めた",body:"母親は弁当を作った時点で、唐揚げなどのおかずを全部入れたと確認している。"},
     {id:"decoy_suzu_motherforgot",title:"母親がおかずを入れ忘れていた",body:"母親は朝から一品入れ忘れており、最初から弁当のおかずが足りなかった。"},
     {id:"kitchen_gap",title:"弁当が台所で無人になる時間があった",body:"母親が台所を離れる短い時間があり、その間は家の中で弁当に触れられた。"},
     {id:"decoy_suzu_nogap",title:"家では誰も弁当に触れられなかった",body:"弁当は作ってから家を出るまで常に母親の手元にあり、他の家族が触る時間はなかった。"},
     {id:"yuma_favorite",title:"消えたおかずは、すべて悠真の好物だった",body:"唐揚げ・卵焼き・ミートボール・ウインナーは、どれも弟の悠真が好きな食べ物だった。"},
     {id:"decoy_suzu_yumahates",title:"悠真は消えたおかずが全部苦手だった",body:"悠真は唐揚げ・卵焼き・ミートボール・ウインナーを嫌っていて、普段から食べようとしない。"},
     {id:"decoy_suzu_kazami_seen",title:"風見が弁当を開けて食べるところを目撃された",body:"昼前、風見が紗季の弁当箱を開け、おかずを食べるところを複数の生徒が見ていた。"},
     {id:"decoy_suzu_asakura_seen",title:"朝倉が弁当からおかずを取るところを目撃された",body:"昼休み、朝倉が紗季の弁当からおかずを取り出すところを本人が目撃していた。"}
   ],
   kujo:[
     {id:"rina_afterschool",title:"夜の回収箱に残る答案は里奈のものだけ",body:"里奈は放課後に提出し、ほかの生徒は翌朝提出するため、夜の箱には里奈の答案だけが残る。"},
     {id:"decoy_kujo_allnight",title:"夜の回収箱には全員の答案が入っていた",body:"クラス全員が放課後までに提出しており、夜の箱には全員分の答案が入っていた。"},
     {id:"locked_box",title:"回収箱は夜のあいだ施錠されていた",body:"放課後から翌朝まで箱には鍵がかかり、鍵は担任が保管していた。生徒は中の答案へ触れない。"},
     {id:"decoy_kujo_unlocked",title:"回収箱は夜も自由に開けられた",body:"箱には鍵がかかっておらず、放課後でも生徒が自由に中の答案を取り出せた。"},
     {id:"old_pencil",title:"箱の中に古い消しゴム付き鉛筆が残っていた",body:"答案以外に、長く使い込まれた古い消しゴム付き鉛筆が箱の底から見つかった。"},
     {id:"decoy_kujo_empty",title:"回収箱の中には答案以外、何もなかった",body:"箱の中を調べても、紙以外の道具や異物は一切見つからなかった。"},
     {id:"overnight_test",title:"一晩置くと、回収箱側の誤答案だけが直った",body:"同じ誤答案を比較すると、夜の回収箱へ入れた方だけが翌朝正答へ修正されていた。"},
     {id:"decoy_kujo_control",title:"箱の外に置いた誤答案も同じように直った",body:"比較実験では、回収箱に入れなかった方の答案まで翌朝同じように修正されていた。"}
   ],
   koharu:[
     {id:"staff_first_return",title:"一回目は職員が本棚へ戻した",body:"除籍未完了の本を見つけた職員が、誤って処分場所へ運ばれたと判断して本棚へ戻した。"},
     {id:"decoy_koharu_first_yuto",title:"一回目は橘先輩が本棚へ戻した",body:"最初に処分場所へ出された時点から、橘先輩が自分で本を図書室へ戻していた。"},
     {id:"decoy_koharu_first_hanako",title:"一回目は花子さんが本棚へ戻した",body:"一回目に本が戻ったのは、夜の図書室にいる花子さんが本を運んだからだった。"},
     {id:"yuto_second_return",title:"二回目は橘先輩が本棚へ戻した",body:"二度目に本が戻った夜、本棚付近で目撃された三年生は橘悠斗だった。"},
     {id:"decoy_koharu_second_staff",title:"二回目も職員が本棚へ戻した",body:"正式な除籍後にも、職員が誤廃棄だと判断して同じ本を本棚へ戻していた。"},
     {id:"decoy_koharu_second_hanako",title:"二回目は花子さんが本棚へ戻した",body:"二度目の夜は、花子さん自身が処分場所から本を運んで本棚へ戻した。"},
     {id:"yuto_memory",title:"橘先輩の動機は、母親との思い出を残すため",body:"その本は亡くなった母親が幼い橘先輩へ何度も読んでくれた一冊で、処分されたくなかった。"},
     {id:"decoy_koharu_motive_prank",title:"橘先輩の動機は、図書委員へのいたずら",body:"図書委員を困らせるため、面白半分で処分済みの本を何度も本棚へ戻していた。"},
     {id:"decoy_koharu_motive_borrow",title:"橘先輩の動機は、あとで自分が借りるため",body:"読みたい本を確保するためだけに、処分予定の本を勝手に本棚へ戻していた。"}
   ]
 };
 function shuffled(items){
   const a=items.slice();
   for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
   return a
 }
 function requiredDeductionCount(){return (deductionCorrect[state.route]||[]).length||4}
 function refreshDeductionCount(){
   const need=requiredDeductionCount(),checked=$$('#deduction-list input:checked');deductionCount.textContent=`${checked.length} / ${need}`;deductionSubmit.disabled=checked.length!==need;
   $$('.deduction-option').forEach(x=>x.classList.toggle('selected',!!x.querySelector('input').checked))
 }
 function openDeduction(){
   clearTimeout(autoTimer);stopCurrentVoice();ensureCaseState();state.deductionOpen=true;deductionPanel.classList.remove("hidden");deductionPanel.setAttribute("aria-hidden","false");dialogue.classList.add("hidden");setCharacters([]);
   const need=requiredDeductionCount();const h=deductionPanel.querySelector('h2'),lead=deductionPanel.querySelector('.deduction-lead');if(h)h.textContent=`真相を説明する${need}枚を選ぶ`;
   if(lead){
     if(state.route==="suzu")lead.textContent="いつ減ったか・朝の弁当の状態・家で触れられる隙・犯人につながる手がかりを1枚ずつ選ぶ。";
     else if(state.route==="kujo")lead.textContent="夜に箱へ残る答案・施錠状況・箱の中の物・再現実験の結果を1枚ずつ選ぶ。";
     else lead.textContent="一回目に戻した人物・二回目に戻した人物・橘先輩の動機を1枚ずつ選ぶ。";
   }
   if(deductionSubmit)deductionSubmit.textContent=`この${need}枚で推理する`;
   const deductionCards=shuffled(deductionCardsByRoute[state.route]||[]);
   deductionList.innerHTML=deductionCards.map(x=>`<label class="deduction-option"><input type="checkbox" value="${x.id}"><span><b>${x.title}</b><small>${x.body}</small></span></label>`).join("");
   $$('#deduction-list input').forEach(el=>el.addEventListener('change',()=>{const checked=$$('#deduction-list input:checked');if(checked.length>need){el.checked=false;playSe("fail")}refreshDeductionCount()}));
   refreshDeductionCount();saveGame(true)
 }
 function submitDeduction(){
   const chosen=$$('#deduction-list input:checked').map(x=>x.value).sort(),correct=(deductionCorrect[state.route]||[]).slice().sort();
   if(chosen.length!==correct.length)return;const ok=chosen.length===correct.length&&chosen.every((x,i)=>x===correct[i]);playSe(ok?"success":"fail");
   state.deductionOpen=false;state.epilogueResult=ok?"success":"fail";state.scene="epilogue";state.index=0;deductionPanel.classList.add("hidden");deductionPanel.setAttribute("aria-hidden","true");dialogue.classList.remove("hidden");const list=currentList();if(list[0])renderLine(list[0]);saveGame(true)
 }
 function currentList(){if(state.scene==="intro")return SCENARIO.intro;if(state.scene==="route"&&state.route)return SCENARIO.routes[state.route].start;if(state.scene==="epilogue"&&state.route&&state.epilogueResult)return SCENARIO.routes[state.route][state.epilogueResult]||[];if(state.scene==="finale")return SCENARIO.finale||[];return[]}
 function forceDialogueVisible(){
   if(!dialogue)return;
   const blocking = !routePanel.classList.contains("hidden") || !caseFileOverlay.classList.contains("hidden") || !caseResultPanel.classList.contains("hidden") || !eventCgOverlay.classList.contains("hidden") || !evidenceAcquire.classList.contains("hidden") || !investigationPanel.classList.contains("hidden") || !interviewPanel.classList.contains("hidden") || !evidencePanel.classList.contains("hidden") || !deductionPanel.classList.contains("hidden") || !choiceBox.classList.contains("hidden");
   if(state.mode==="adv"&&!blocking){dialogue.classList.remove("hidden");dialogue.style.removeProperty("display");dialogue.style.removeProperty("visibility");dialogue.style.removeProperty("opacity");}
 }
 function renderLine(line,{log=true}={}){
   if(!line)return;forceDialogueVisible();if(line.bg)setBg(line.bg);if(line.chars)setCharacters(line.chars);applyExpression(line.focus,line.expression);
   speakerEl.textContent=line.speaker==="SYSTEM"?"":(line.speaker||"");speakerEl.style.display=line.speaker==="SYSTEM"?"none":"block";
   startTyping(line);focusCharacter(line.focus||null);retrigger(dialogue,"line-swap");if(log)addLog(line.speaker,line.text);
   if(state.skip){
     lastVoiceSrc=line.voice||null;lastVoiceLine=line||null;const b=$("#voice-replay-btn");if(b)b.disabled=!line.voice;
     if(!line.action&&(!settings.skipStopUnread||readLines.has(currentReadKey())))scheduleSkip(line);
     else{const unread=!line.action&&!readLines.has(currentReadKey());stopSkip(settings.skipStopUnread&&unread);playVoice(line.voice,line)}
   }else playVoice(line.voice,line);
 }

 function openEventCg(line){
   clearTimeout(autoTimer);clearTimeout(skipTimer);stopCurrentVoice();
   if(!eventCgOverlay||!eventCgImage)return;
   eventCgImage.src=line.cg||"";eventCgImage.alt=line.alt||"イベントCG";
   eventCgOverlay.classList.remove("hidden");eventCgOverlay.setAttribute("aria-hidden","false");
   // Keep the dialogue window visible so the CG appears as an in-game presentation, not a detached full-screen image.
   dialogue.classList.remove("hidden");setCharacters([]);
 }
 function openInvestigationCg(cg,alt){
   clearTimeout(autoTimer);clearTimeout(skipTimer);stopCurrentVoice();
   if(!eventCgOverlay||!eventCgImage)return;
   eventCgReturnMode="investigation";
   eventCgImage.src=cg||"";eventCgImage.alt=alt||"調査CG";
   investigationPanel.classList.add("hidden");investigationPanel.setAttribute("aria-hidden","true");
   eventCgOverlay.classList.remove("hidden");eventCgOverlay.setAttribute("aria-hidden","false");
   dialogue.classList.add("hidden");setCharacters([]);
 }
 function closeEventCg(){
   if(!eventCgOverlay||eventCgOverlay.classList.contains("hidden"))return;
   eventCgOverlay.classList.add("hidden");eventCgOverlay.setAttribute("aria-hidden","true");
   if(eventCgImage)eventCgImage.removeAttribute("src");
   if(eventCgReturnMode==="investigation"){
     eventCgReturnMode=null;
     investigationPanel.classList.remove("hidden");investigationPanel.setAttribute("aria-hidden","false");
     dialogue.classList.add("hidden");refreshInvestigation();saveGame(true);return;
   }
   eventCgReturnMode=null;dialogue.classList.remove("hidden");state.index++;const next=currentList()[state.index];if(next)renderLine(next);saveGame(true);
 }
 function revealCases(){
   clearTimeout(autoTimer);stopCurrentVoice();playSe("page");
   caseFileOverlay.classList.remove("hidden");caseFileOverlay.setAttribute("aria-hidden","false");
   requestAnimationFrame(()=>caseFileOverlay.classList.add("reveal"));dialogue.classList.add("hidden");
 }
 function openRouteSelect(){
   playSe("confirm");caseFileOverlay.classList.add("closing");
   setTimeout(()=>{caseFileOverlay.classList.add("hidden");caseFileOverlay.classList.remove("reveal","closing");caseFileOverlay.setAttribute("aria-hidden","true");updateRouteProgressUI();routePanel.classList.remove("hidden");retrigger(routePanel,"route-enter")},settings.effects?220:0);
 }
 function ensureVisibleFlow(){
   if(state.mode!=="adv")return;
   const blocking = !routePanel.classList.contains("hidden") || !caseFileOverlay.classList.contains("hidden") || !caseResultPanel.classList.contains("hidden") || !eventCgOverlay.classList.contains("hidden") || !evidenceAcquire.classList.contains("hidden") || !investigationPanel.classList.contains("hidden") || !interviewPanel.classList.contains("hidden") || !evidencePanel.classList.contains("hidden") || !deductionPanel.classList.contains("hidden") || !choiceBox.classList.contains("hidden");
   if(!blocking && dialogue.classList.contains("hidden")){
     dialogue.classList.remove("hidden");
     const line=currentList()[state.index];
     if(line)renderLine(line,{log:false});
   }
 }
 function resumeInteractiveState(){
   ensureCaseState();
   if(state.interviewHub){openInterviewHub();return true}
   if(state.deductionOpen){openDeduction();return true}
   if(state.suzuHypothesisStage){openSuzuHypothesis();return true}
   if(state.kujoExperimentStage){openKujoExperiment();return true}
   if(state.koharuHypothesisStage){openKoharuHypothesis();return true}
   return false
 }
 function advance(){
   if(typingActive){finishTyping();return}
   if(state.mode!=="adv"||!routePanel.classList.contains("hidden")||!caseFileOverlay.classList.contains("hidden")||!caseResultPanel.classList.contains("hidden")||!eventCgOverlay.classList.contains("hidden")||!evidenceAcquire.classList.contains("hidden")||!investigationPanel.classList.contains("hidden")||!interviewPanel.classList.contains("hidden")||!evidencePanel.classList.contains("hidden")||!deductionPanel.classList.contains("hidden"))return;
   markCurrentRead();clearTimeout(autoTimer);clearTimeout(skipTimer);stopCurrentVoice();
   if(state.interview&&state.interview.who){const script=interviewScripts[state.interview.who]||[];state.interview.index++;if(state.interview.index>=script.length){completeInterview();return}renderLine(script[state.interview.index]);saveGame(true);return}
   const list=currentList(),line=list[state.index];if(!line)return;
   if(line.action==="showRoutes"){revealCases();return}
   if(line.action==="gainEvidence"){openEvidenceAcquire(line.evidence);return}
   if(line.action==="eventCG"){openEventCg(line);return}
   if(line.action==="endingSequence"){startEndingSequence();return}
   if(line.action==="timeFade"){runTimeFade();return}
   if(line.action==="investigation"){openInvestigation();return}
   if(line.action==="interviews"){openInterviewHub();return}
   if(line.action==="kujoExperiment"){openKujoExperiment();return}
   if(line.action==="suzuHypothesis"){openSuzuHypothesis();return}
   if(line.action==="koharuHypothesis"){openKoharuHypothesis();return}
   if(line.action==="deduction"){openDeduction();return}
   if(state.scene==="epilogue"&&state.index>=list.length-1){finishCase();return}
   if(state.scene==="finale"&&state.index>=list.length-1){finishFinale();return}
   // v1.14 hard route: after Kujo reassures Rina, the added Rina line MUST play before Naoto.
   if(state.scene==="epilogue"&&state.route==="kujo"&&state.epilogueResult==="success"){
     const kujoText="不安にさせて悪かった。再発防止は済ませた。だから安心していい。生徒会を信じてほしい。";
     const rinaText="分かりました。誰がやったのかは少し気になりますけど……これからは、返ってきた答案も自分でちゃんと確認するようにします。";
     const naotoText="それがいい。自分で解いて、自分で直してこそ意味があるからな。";
     const rinaIndex=list.findIndex(x=>x&&x.speaker==="藤崎里奈"&&x.text===rinaText);
     const naotoIndex=list.findIndex(x=>x&&x.speaker==="直人"&&x.text===naotoText);
     if(line&&line.speaker==="九条玲"&&line.text===kujoText&&rinaIndex>=0){
       state.index=rinaIndex;state.rina009Seen=true;renderLine(list[rinaIndex]);saveGame(true);return;
     }
     // Old saves that landed after the insertion point are rewound exactly once until Rina was truly shown.
     if(!state.rina009Seen&&rinaIndex>=0&&naotoIndex>=0&&state.index>=rinaIndex&&state.index<=naotoIndex){
       state.index=rinaIndex;state.rina009Seen=true;renderLine(list[rinaIndex]);saveGame(true);return;
     }
   }
   state.index++;const next=list[state.index];if(next)renderLine(next);ensureVisibleFlow();
 }
 function startGame(){
   stopCurrentVoice();clearTimeout(autoTimer);
   transitionTo(()=>{title.classList.remove("active");adv.classList.add("active");state={mode:"adv",scene:"intro",index:0,log:[],auto:false,skip:false,route:null,evidence:[],investigation:{},interviews:{},interview:null,interviewHub:false,deductionOpen:false,epilogueResult:null};
     routePanel.classList.add("hidden");caseFileOverlay.classList.add("hidden");if(routeStartOverlay)routeStartOverlay.classList.add("hidden");caseResultPanel.classList.add("hidden");if(eventCgOverlay)eventCgOverlay.classList.add("hidden");dialogue.classList.remove("hidden");$("#auto-btn").textContent="AUTO";updateSkipButton();
     setBgm("assets/audio/bgm/student_council_secret.mp3",true);renderLine(SCENARIO.intro[0]);forceDialogueVisible();setTimeout(forceDialogueVisible,0);setTimeout(forceDialogueVisible,300)},1000);
 }
 function chooseRoute(route){
   stopCurrentVoice();clearTimeout(autoTimer);clearTimeout(transitionTimer);
   // FILE selection must never be blocked by the decorative fade layer.
   sceneTransition.classList.remove("active");
   state.scene="route";state.route=route;state.index=0;state.evidence=[];state.investigation={};state.interviews={};state.interview=null;state.interviewHub=false;state.deductionOpen=false;state.epilogueResult=null;state.suzuInsight=3;state.kujoInsight=3;state.koharuInsight=3;
   routePanel.classList.add("hidden");routePanel.classList.remove("route-enter");caseFileOverlay.classList.add("hidden");caseResultPanel.classList.add("hidden");if(eventCgOverlay)eventCgOverlay.classList.add("hidden");evidenceAcquire.classList.add("hidden");investigationPanel.classList.add("hidden");interviewPanel.classList.add("hidden");evidencePanel.classList.add("hidden");deductionPanel.classList.add("hidden");choiceBox.classList.add("hidden");choiceBox.innerHTML="";
   dialogue.classList.add("hidden");setCharacters([]);
   const meta={
     suzu:{file:"FILE 01",title:"消える弁当",client:"依頼人　小宮山紗季"},
     kujo:{file:"FILE 02",title:"100点になる課題",client:"依頼人　藤崎里奈"},
     koharu:{file:"FILE 03",title:"戻ってくる本",client:"依頼人　図書委員会"}
   }[route];
   if(meta&&routeStartOverlay){routeStartFile.textContent=meta.file;routeStartTitle.textContent=meta.title;routeStartClient.textContent=meta.client;routeStartOverlay.classList.remove("hidden");routeStartOverlay.setAttribute("aria-hidden","false");retrigger(routeStartOverlay,"route-start-reveal")}
   const begin=()=>{
     if(routeStartOverlay){routeStartOverlay.classList.add("hidden");routeStartOverlay.classList.remove("route-start-reveal");routeStartOverlay.setAttribute("aria-hidden","true")}
     dialogue.classList.remove("hidden");
     try{
       const first=SCENARIO.routes[route]&&SCENARIO.routes[route].start&&SCENARIO.routes[route].start[0];
       if(!first)throw new Error("route start not found: "+route);
       renderLine(first);saveGame(true);
     }catch(err){
       console.error(err);sceneTransition.classList.remove("active");dialogue.classList.remove("hidden");speakerEl.textContent="SYSTEM";textEl.textContent="FILEの開始処理に失敗しました。";
     }
   };
   setTimeout(begin,settings.effects?900:80);
 }
 function routeLabel(route){return route==="suzu"?'FILE 01「消える弁当」':route==="kujo"?'FILE 02「100点になる課題」':route==="koharu"?'FILE 03「戻ってくる本」':"生徒会相談録"}
 function sceneLabel(data){if(!data)return"―";if(data.scene==="routeSelect")return"相談一覧";if(data.scene==="epilogue")return"解決後";if(data.scene==="finale")return"エンディング";if(data.deductionOpen)return"最終推理";if(data.interviewHub||data.interview)return"聞き込み";if(data.investigation&&Object.keys(data.investigation).length)return"調査中";return data.route?"事件調査":"序章"}
 function readSaveMeta(key){const raw=localStorage.getItem(key);if(!raw)return null;try{const d=JSON.parse(raw),dt=d._savedAt?new Date(d._savedAt):null;return{raw,data:d,main:`${routeLabel(d.route)}　${sceneLabel(d)}`,sub:dt&&!Number.isNaN(dt.getTime())?dt.toLocaleString("ja-JP"):'保存日時不明'}}catch(e){return null}}
 let saveLoadMode="load";
 function refreshSaveLoadPanel(){const man=readSaveMeta(SAVE_KEY),aut=readSaveMeta(AUTO_SAVE_KEY);manualSlotMain.textContent=man?man.main:"セーブデータなし";manualSlotSub.textContent=man?man.sub:"―";autoSlotMain.textContent=aut?aut.main:"オートセーブなし";autoSlotSub.textContent=aut?aut.sub:"―";manualSlot.disabled=saveLoadMode==="load"&&!man;autoSlot.disabled=saveLoadMode==="load"&&!aut;if(saveLoadMode==="save")autoSlot.disabled=true}
 function openSaveLoadPanel(mode){saveLoadMode=mode;saveLoadKicker.textContent=mode==="save"?"SAVE DATA":"LOAD DATA";saveLoadTitle.textContent=mode==="save"?"セーブする":"ロードする";refreshSaveLoadPanel();saveLoadPanel.classList.remove("hidden");saveLoadPanel.setAttribute("aria-hidden","false")}
 function closeSaveLoadPanel(){saveLoadPanel.classList.add("hidden");saveLoadPanel.setAttribute("aria-hidden","true")}
 function showLoadRecap(data){
   if(!loadRecapOverlay||!data||data.mode!=="adv")return;
   const latest=Array.isArray(data.log)&&data.log.length?data.log[data.log.length-1]:null;
   if(loadRecapFile)loadRecapFile.textContent=routeLabel(data.route);
   if(loadRecapScene)loadRecapScene.textContent=`再開地点　${sceneLabel(data)}`;
   if(loadRecapText){
     const who=latest&&latest.speaker?`${latest.speaker}「`:"";
     const close=latest&&latest.speaker?"」":"";
     const body=latest&&latest.text?latest.text:"保存した地点から再開します。";
     loadRecapText.textContent=`${who}${body}${close}`;
   }
   loadRecapOverlay.classList.remove("hidden");loadRecapOverlay.setAttribute("aria-hidden","false");
 }
 function closeLoadRecap(){if(!loadRecapOverlay)return;loadRecapOverlay.classList.add("hidden");loadRecapOverlay.setAttribute("aria-hidden","true")}

 function saveGame(auto=false){
   try{
     const data={...state,_buildVersion:116,_savedAt:new Date().toISOString()};
     localStorage.setItem(auto?AUTO_SAVE_KEY:SAVE_KEY,JSON.stringify(data));
     if(!auto)showNotice("セーブしました");
     return true;
   }catch(e){console.error(e);if(!auto)showNotice("セーブに失敗しました");return false}
 }
 function getSaveRaw(preferManual=false){
   const manual=localStorage.getItem(SAVE_KEY)||localStorage.getItem(OLD_SAVE_KEY);
   const auto=localStorage.getItem(AUTO_SAVE_KEY);
   return preferManual?(manual||auto):(auto||manual);
 }

 function loadFromRaw(raw){
   if(!raw){showNotice("セーブデータがありません");return}
   try{
     stopCurrentVoice();clearTimeout(autoTimer);const loaded=JSON.parse(raw);
     // v1.14 compatibility: Rina's added final line must be shown once on old saves.
     if(loaded.scene==="epilogue" && loaded.route==="kujo" && loaded.epilogueResult==="success" && !loaded.rina009Seen){
       const list=(SCENARIO.routes.kujo&&SCENARIO.routes.kujo.success)||[];
       const kujoText="不安にさせて悪かった。再発防止は済ませた。だから安心していい。生徒会を信じてほしい。";
       const kujoIndex=list.findIndex(x=>x&&x.speaker==="九条玲"&&x.text===kujoText);
       if(kujoIndex>=0 && Number(loaded.index)>kujoIndex)loaded.index=kujoIndex;
     }
     state=loaded;state.skip=false;ensureCaseState();updateSkipButton();
     transitionTo(()=>{title.classList.remove("active");adv.classList.add("active");routePanel.classList.add("hidden");caseFileOverlay.classList.add("hidden");if(routeStartOverlay)routeStartOverlay.classList.add("hidden");caseResultPanel.classList.add("hidden");if(eventCgOverlay)eventCgOverlay.classList.add("hidden");evidenceAcquire.classList.add("hidden");investigationPanel.classList.add("hidden");interviewPanel.classList.add("hidden");evidencePanel.classList.add("hidden");deductionPanel.classList.add("hidden");dialogue.classList.remove("hidden");
       $("#auto-btn").textContent=state.auto?"AUTO●":"AUTO";const list=currentList(),line=list[state.index]||list[0];
       const lastChars=[...list.slice(0,state.index+1)].reverse().find(x=>x.chars);if(lastChars)setCharacters(lastChars.chars);
       setBgm("assets/audio/bgm/student_council_secret.mp3",false);
       if(state.scene==="routeSelect"){dialogue.classList.add("hidden");updateRouteProgressUI();routePanel.classList.remove("hidden");retrigger(routePanel,"route-enter")}
       else if(state.interview&&state.interview.who){const script=interviewScripts[state.interview.who]||[];const iLine=script[state.interview.index]||script[0];const iChars=[...script.slice(0,(state.interview.index||0)+1)].reverse().find(x=>x.chars);if(iChars)setCharacters(iChars.chars);dialogue.classList.remove("hidden");renderLine(iLine,{log:false})}
       else if(!resumeInteractiveState()){dialogue.classList.remove("hidden");if(line)renderLine(line,{log:false})}
       ensureVisibleFlow();showLoadRecap(loaded);showNotice("ロードしました")});
   }catch(e){showNotice("セーブデータを読み込めませんでした")}
 }
 function loadGame(preferManual=false){loadFromRaw(getSaveRaw(preferManual))}

 preloadPortraitAssets();
 syncSettingsUI();
 const audioUnlock=$("#audio-unlock");
 if(audioUnlock){
   audioUnlock.addEventListener("click",()=>{
     audioUnlocked=true;
     const a=new Audio(seFiles.hover);a.volume=0;
     const p=a.play();if(p&&p.catch)p.catch(()=>{});
     audioUnlock.classList.add("hidden");
   },{once:true});
 }else{audioUnlocked=true;}
 ["#start-btn","#continue-btn","#config-btn","#help-btn"].forEach(sel=>{
  const el=$(sel);
  el.addEventListener("mouseenter",()=>playSe("hover"));
});
$("#start-btn").onclick=()=>{playSe("confirm");startGame()};
 $("#continue-btn").onclick=()=>{playSe("confirm");loadGame(false)};
 $("#config-btn").onclick=()=>{playSe("confirm");configPanel.classList.remove("hidden")};
 $("#config-close").onclick=()=>{playSe("confirm");configPanel.classList.add("hidden");saveSettings()};
 const helpBtn=$("#help-btn"),helpClose=$("#help-close");
 if(helpBtn&&helpPanel)helpBtn.onclick=()=>{playSe("confirm");helpPanel.classList.remove("hidden");helpPanel.setAttribute("aria-hidden","false")};
 if(helpClose&&helpPanel)helpClose.onclick=()=>{playSe("confirm");helpPanel.classList.add("hidden");helpPanel.setAttribute("aria-hidden","true")};
 const resetProgressBtn=$("#reset-progress");if(resetProgressBtn)resetProgressBtn.onclick=()=>{playSe("confirm");resetClearData()};
 $("#bgm-volume").oninput=e=>{settings.bgm=Number(e.target.value);bgmPlayer.volume=Math.max(0,Math.min(1,(settings.bgm/100)*BGM_GAIN));saveSettings()};
 $("#se-volume").oninput=e=>{settings.se=Number(e.target.value);saveSettings()};
 $("#voice-volume").oninput=e=>{settings.voice=Number(e.target.value);if(currentVoice)currentVoice.volume=settings.voice/100;saveSettings()};
 $("#voice-mute").onchange=e=>{settings.voiceMuted=e.target.checked;if(settings.voiceMuted){stopCurrentVoice();if(state.auto&&lastVoiceLine)scheduleAuto(lastVoiceLine,null)}saveSettings()};
 $("#skip-stop-unread").onchange=e=>{settings.skipStopUnread=e.target.checked;saveSettings();if(state.skip&&lastVoiceLine)scheduleSkip(lastVoiceLine)};
 $("#skip-speed").onchange=e=>{settings.skipSpeed=Number(e.target.value)||90;saveSettings();if(state.skip&&lastVoiceLine)scheduleSkip(lastVoiceLine)};
 const voiceReplayBtn=$("#voice-replay-btn");if(voiceReplayBtn){voiceReplayBtn.disabled=true;voiceReplayBtn.onclick=e=>{e.stopPropagation();replayCurrentVoice()}};
 $("#text-speed").onchange=e=>{settings.textSpeed=e.target.value;saveSettings();if(typingActive){finishTyping()}};
 $("#screen-effects").onchange=e=>{settings.effects=e.target.checked;applyEffectsSetting();saveSettings()};
 if(eventCgOverlay)eventCgOverlay.onclick=e=>{e.stopPropagation();closeEventCg()};
 dialogue.onclick=advance;caseFileContinue.onclick=openRouteSelect;
 // Recovery guard: if no modal/choice is visible, never leave the ADV screen with a hidden dialogue window.
 adv.addEventListener("click",e=>{
   if(e.target.closest("button,input,label,.overlay,.investigation-panel,.interview-panel,.choice-box,.case-file-overlay,.route-panel,.case-result-panel"))return;
   const wasHidden=dialogue.classList.contains("hidden");
   ensureVisibleFlow();forceDialogueVisible();
   if(wasHidden&&!dialogue.classList.contains("hidden")){const line=currentList()[state.index];if(line&&!textEl.textContent)renderLine(line,{log:false});}
 });
 $("#evidence-acquire-close").onclick=closeEvidenceAcquire;
 $$(".investigation-card").forEach(b=>b.onclick=()=>inspectItem(b.dataset.investigate));
 $("#investigation-finish").onclick=finishInvestigation;
 $$(".interview-card").forEach(b=>b.onclick=()=>startInterview(b.dataset.interview));
 $("#interview-finish").onclick=finishInterviewHub;
 deductionSubmit.onclick=submitDeduction;
 $("#evidence-btn").onclick=()=>{playSe("confirm");renderEvidenceList();evidencePanel.classList.remove("hidden")};
 $("#evidence-close").onclick=()=>{playSe("confirm");evidencePanel.classList.add("hidden")};
 if(caseResultNext)caseResultNext.onclick=closeCaseResult;
 updateRouteProgressUI();
 $$(".route-card").forEach(b=>b.onclick=()=>{playSe("confirm");chooseRoute(b.dataset.route)});
 $("#save-btn").onclick=()=>{playSe("confirm");openSaveLoadPanel("save")};$("#load-btn").onclick=()=>{playSe("confirm");openSaveLoadPanel("load")};
 if(manualSlot)manualSlot.onclick=()=>{playSe("confirm");if(saveLoadMode==="save"){saveGame(false);refreshSaveLoadPanel()}else{const m=readSaveMeta(SAVE_KEY);if(m){closeSaveLoadPanel();loadFromRaw(m.raw)}}};
 if(autoSlot)autoSlot.onclick=()=>{playSe("confirm");if(saveLoadMode==="load"){const m=readSaveMeta(AUTO_SAVE_KEY);if(m){closeSaveLoadPanel();loadFromRaw(m.raw)}}};
 const saveLoadClose=$("#save-load-close");if(saveLoadClose)saveLoadClose.onclick=()=>{playSe("confirm");closeSaveLoadPanel()};
 const loadRecapClose=$("#load-recap-close");if(loadRecapClose)loadRecapClose.onclick=()=>{playSe("confirm");closeLoadRecap()};
 $("#auto-btn").onclick=()=>{playSe("confirm");clearTimeout(autoTimer);stopSkip(false);state.auto=!state.auto;$("#auto-btn").textContent=state.auto?"AUTO●":"AUTO";
   if(state.auto){const line=currentList()[state.index];if(currentVoice){scheduleAuto(line,currentVoice)}else scheduleAuto(line,null)}};
 const skipBtn=$("#skip-btn");if(skipBtn)skipBtn.onclick=()=>{playSe("confirm");clearTimeout(autoTimer);state.auto=false;$("#auto-btn").textContent="AUTO";state.skip=!state.skip;updateSkipButton();if(state.skip){const line=state.interview&&state.interview.who?(interviewScripts[state.interview.who]||[])[state.interview.index]:currentList()[state.index];scheduleSkip(line)}else clearTimeout(skipTimer)};
 function renderLog(){
   const items=Array.isArray(state.log)?state.log:[];
   const count=$("#log-count");if(count)count.textContent=`${items.length}件`;
   logContent.innerHTML=items.length?items.map((x,i)=>`<div class="log-entry"><div class="log-entry-head"><span class="log-index">${String(i+1).padStart(3,"0")}</span><b>${x.speaker||"地の文"}</b></div><div class="log-line">${x.text||""}</div></div>`).join(""):`<div class="log-empty">まだ会話ログはありません。</div>`;
 }
 function scrollLogLatest(){requestAnimationFrame(()=>{logContent.scrollTop=logContent.scrollHeight})}
 $("#log-btn").onclick=()=>{playSe("confirm");renderLog();logPanel.classList.remove("hidden");scrollLogLatest()};
 const logLatest=$("#log-latest");if(logLatest)logLatest.onclick=()=>{playSe("confirm");scrollLogLatest()};
 $("#log-close").onclick=()=>{playSe("confirm");logPanel.classList.add("hidden")};
 window.BOCCHI_SE={evidence:()=>playSe("evidence"),success:()=>playSe("success"),fail:()=>playSe("fail")};
 document.addEventListener("keydown",e=>{
   if(!configPanel.classList.contains("hidden")||!logPanel.classList.contains("hidden")||!saveLoadPanel.classList.contains("hidden")||(loadRecapOverlay&&!loadRecapOverlay.classList.contains("hidden"))||!evidencePanel.classList.contains("hidden")||!evidenceAcquire.classList.contains("hidden")||!investigationPanel.classList.contains("hidden")||!interviewPanel.classList.contains("hidden")||!deductionPanel.classList.contains("hidden"))return;
   if((e.code==="Space"||e.code==="Enter")&&!caseFileOverlay.classList.contains("hidden")){e.preventDefault();openRouteSelect();return}
   if(e.code==="Space"||e.code==="Enter"){e.preventDefault();advance()}
 });
})();
