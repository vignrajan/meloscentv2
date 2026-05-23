import { useState, useEffect } from "react";

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#FAF3E8;}

/* ── Cards ── */
.melo-masonry{columns:3 260px;column-gap:22px;}
@media(max-width:620px){.melo-masonry{columns:1;}}
@media(min-width:621px) and (max-width:960px){.melo-masonry{columns:2;}}
.mcard-wrap{break-inside:avoid;display:inline-block;width:100%;margin-bottom:22px;animation:cardIn .45s ease both;}
@keyframes cardIn{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
.mcard-scene{perspective:1300px;cursor:pointer;border-radius:20px;}
.mcard-inner{position:relative;width:100%;transform-style:preserve-3d;transition:transform .75s cubic-bezier(.4,0,.2,1);}
.mcard-inner.flipped{transform:rotateY(180deg);}
.mcard-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:20px;overflow:hidden;}
.mcard-back{transform:rotateY(180deg);}
.mcard-scene:hover .mcard-shadow{box-shadow:0 28px 64px rgba(44,24,16,.28)!important;}
.flip-hint{opacity:0;transition:opacity .3s;}
.mcard-scene:hover .flip-hint{opacity:1;}

/* ── Search & Filters ── */
.melo-search{width:100%;padding:16px 52px;border:1.5px solid rgba(193,127,58,.25);border-radius:50px;background:white;font-family:'DM Sans',sans-serif;font-size:15px;color:#2C1810;box-shadow:0 8px 30px rgba(44,24,16,.08);outline:none;transition:border-color .2s,box-shadow .2s;}
.melo-search:focus{border-color:#C17F3A;box-shadow:0 8px 30px rgba(193,127,58,.18);}
.melo-search::placeholder{color:rgba(44,24,16,.35);}
.filter-pill{padding:6px 16px;border-radius:50px;background:transparent;font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;letter-spacing:.3px;transition:all .2s;border:1px solid rgba(193,127,58,.3);color:#8b5a1a;}
.filter-pill:hover{background:rgba(193,127,58,.15);}
.filter-pill.active{background:#C17F3A;color:white;border-color:#C17F3A;}

/* ── Blog ── */
.blog-card{background:white;border-radius:18px;overflow:hidden;box-shadow:0 4px 24px rgba(44,24,16,.07);transition:transform .3s,box-shadow .3s;cursor:pointer;}
.blog-card:hover{transform:translateY(-6px);box-shadow:0 22px 56px rgba(44,24,16,.14);}
.melo-blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
@media(max-width:620px){.melo-blog-grid{grid-template-columns:1fr;}}
@media(min-width:621px) and (max-width:960px){.melo-blog-grid{grid-template-columns:repeat(2,1fr);}}

/* ── Navigation ── */
.nav-link{font-family:'DM Sans',sans-serif;font-size:13.5px;color:rgba(44,24,16,.5);background:none;border:none;letter-spacing:.4px;cursor:pointer;transition:color .2s;padding:0;}
.nav-link:hover{color:#C17F3A;}
.melo-hero-h1{font-size:3.6rem;font-family:'Playfair Display',serif;font-weight:700;color:#2C1810;line-height:1.1;margin-bottom:16px;letter-spacing:-.5px;}
@media(max-width:620px){.melo-hero-h1{font-size:2.2rem;}}

/* ── Mobile Nav ── */
.hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:6px;border-radius:8px;transition:opacity .2s;align-items:center;justify-content:center;}
.hamburger:hover{opacity:.65;}
.h-line{width:22px;height:2px;background:#2C1810;border-radius:2px;transition:all .25s;}
@media(max-width:680px){.desktop-nav{display:none!important;}.hamburger{display:flex;}}
.mob-menu{position:fixed;inset:0;z-index:970;background:#FAF3E8;display:flex;flex-direction:column;animation:fadeInO .25s ease;overflow-y:auto;}
.mob-menu-header{display:flex;align-items:center;justify-content:space-between;padding:20px 28px;border-bottom:.5px solid rgba(193,127,58,.15);}
.mob-nav-item{font-family:'Playfair Display',serif;font-size:2rem;font-weight:600;color:#2C1810;background:none;border:none;cursor:pointer;text-align:left;padding:18px 28px;letter-spacing:-.3px;transition:color .2s;border-bottom:.5px solid rgba(193,127,58,.1);width:100%;}
.mob-nav-item:hover{color:#C17F3A;}
.mob-nav-sub{font-family:'DM Sans',sans-serif;font-size:13px;color:rgba(44,24,16,.45);background:none;border:none;cursor:pointer;text-align:left;padding:14px 28px;transition:color .2s;width:100%;letter-spacing:.3px;}
.mob-nav-sub:hover{color:#C17F3A;}

/* ── Quiz ── */
.quiz-overlay{position:fixed;inset:0;z-index:1000;background:rgba(44,24,16,.78);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeInO .3s ease;}
@keyframes fadeInO{from{opacity:0}to{opacity:1}}
.quiz-modal{background:#FAF3E8;border-radius:24px;width:100%;max-width:620px;max-height:93vh;overflow-y:auto;box-shadow:0 40px 100px rgba(44,24,16,.45);}
.qz-enter{animation:qzIn .35s ease both;}
@keyframes qzIn{from{opacity:0;transform:translateX(22px)}to{opacity:1;transform:translateX(0)}}
.quiz-opt{cursor:pointer;border-radius:14px;overflow:hidden;transition:transform .2s,box-shadow .2s;border:2.5px solid transparent;}
.quiz-opt:hover,.quiz-opt:focus-visible{transform:translateY(-3px);box-shadow:0 12px 32px rgba(44,24,16,.2);}
.quiz-opt.sel{border-color:#C17F3A;box-shadow:0 0 0 4px rgba(193,127,58,.22);}
.quiz-next{padding:14px 34px;border-radius:50px;background:linear-gradient(135deg,#C17F3A,#d4af37);border:none;color:white;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;letter-spacing:.5px;box-shadow:0 6px 20px rgba(193,127,58,.4);transition:transform .2s,box-shadow .2s;}
.quiz-next:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 10px 28px rgba(193,127,58,.5);}
.quiz-next:disabled{opacity:.38;cursor:not-allowed;}

/* ── Profile Drawer ── */
.prof-overlay{position:fixed;inset:0;z-index:800;background:rgba(44,24,16,.28);backdrop-filter:blur(3px);animation:fadeInO .3s ease;}
.prof-drawer{position:fixed;top:0;right:0;bottom:0;z-index:850;width:360px;background:#FAF3E8;box-shadow:-8px 0 48px rgba(44,24,16,.18);overflow-y:auto;transform:translateX(100%);transition:transform .38s cubic-bezier(.4,0,.2,1);}
.prof-drawer.prof-open{transform:translateX(0);}
@media(max-width:400px){.prof-drawer{width:100%;}}
.prof-btn{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#C17F3A,#d4af37);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(193,127,58,.4);transition:transform .2s,box-shadow .2s;position:relative;flex-shrink:0;}
.prof-btn:hover{transform:scale(1.1);box-shadow:0 6px 24px rgba(193,127,58,.5);}
.badge-item{transition:transform .25s;}
.badge-item:hover{transform:translateY(-2px);}

/* ── SOTD ── */
.sotd-banner{position:relative;overflow:hidden;}
.sotd-quiz-btn{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;letter-spacing:.4px;backdrop-filter:blur(6px);transition:all .2s;white-space:nowrap;border:none;}
.hero-quiz-btn{display:inline-flex;align-items:center;gap:9px;padding:15px 32px;border-radius:50px;background:linear-gradient(135deg,#C17F3A,#d4af37);border:none;color:white;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;cursor:pointer;letter-spacing:.5px;box-shadow:0 8px 28px rgba(193,127,58,.4);transition:transform .2s,box-shadow .2s;}
.hero-quiz-btn:hover{transform:translateY(-3px);box-shadow:0 14px 40px rgba(193,127,58,.5);}

/* ── Note Pills ── */
.npill{display:inline-block;padding:2px 9px;border-radius:50px;font-size:11px;font-family:'DM Sans',sans-serif;letter-spacing:.2px;margin-right:4px;margin-bottom:4px;transition:all .15s;user-select:none;}
.npill.clickable{cursor:pointer;}
.npill.clickable:hover{opacity:.72;transform:scale(1.07);}
.note-filter-bar{animation:nfIn .3s ease;display:flex;align-items:center;gap:10px;padding:10px 18px;background:rgba(193,127,58,.09);border-radius:50px;border:1px solid rgba(193,127,58,.22);width:fit-content;}
@keyframes nfIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}

/* ── Compare ── */
.cmp-btn{border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .22s;line-height:1;font-weight:700;}
.cmp-btn:hover{transform:scale(1.18);}
.cmp-overlay{position:fixed;inset:0;z-index:890;background:rgba(44,24,16,.22);backdrop-filter:blur(3px);animation:fadeInO .3s ease;}
.cmp-panel{position:fixed;bottom:0;left:0;right:0;z-index:900;background:#FAF3E8;border-radius:24px 24px 0 0;box-shadow:0 -12px 60px rgba(44,24,16,.22);transform:translateY(100%);transition:transform .42s cubic-bezier(.4,0,.2,1);max-height:84vh;overflow-y:auto;}
.cmp-panel.cmp-open{transform:translateY(0);}
.cmp-row{display:grid;grid-template-columns:100px 1fr 1fr;gap:0;border-bottom:.5px solid rgba(193,127,58,.12);align-items:center;}
.cmp-row:last-child{border-bottom:none;}
.cmp-hint{opacity:0;transition:opacity .2s;font-size:10px;font-family:'DM Sans',sans-serif;color:rgba(255,255,255,.5);letter-spacing:.5px;text-align:center;padding-bottom:4px;}
.mcard-scene:hover .cmp-hint{opacity:1;}

/* ── Wardrobe ── */
.wd-enter{animation:wdIn .4s ease both;}
@keyframes wdIn{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
.wd-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;}
@media(max-width:700px){.wd-grid{grid-template-columns:1fr;}}
.wd-item{background:white;border-radius:18px;overflow:hidden;transition:transform .25s,box-shadow .25s;box-shadow:0 4px 20px rgba(44,24,16,.07);display:flex;}
.wd-item:hover{transform:translateY(-3px);box-shadow:0 18px 50px rgba(44,24,16,.13);}
.wd-back-btn{background:transparent;border:1px solid rgba(193,127,58,.3);border-radius:50px;padding:8px 18px;font-family:'DM Sans',sans-serif;font-size:13px;color:#8b5a1a;cursor:pointer;letter-spacing:.3px;transition:all .2s;}
.wd-back-btn:hover{background:rgba(193,127,58,.09);border-color:rgba(193,127,58,.5);}
.wd-rm-btn{background:transparent;border:1px solid rgba(193,127,58,.3);border-radius:50px;padding:5px 14px;font-family:'DM Sans',sans-serif;font-size:11px;color:#8b5a1a;cursor:pointer;letter-spacing:.4px;transition:all .2s;}
.wd-rm-btn:hover{background:rgba(193,127,58,.12);border-color:rgba(193,127,58,.5);}
.wd-add-btn{background:rgba(193,127,58,.08);border:1px solid rgba(193,127,58,.25);border-radius:50px;padding:5px 14px;font-family:'DM Sans',sans-serif;font-size:11px;color:#8b5a1a;cursor:pointer;letter-spacing:.4px;transition:all .2s;}
.wd-add-btn:hover{background:rgba(193,127,58,.18);}
.wd-add-btn.saved{background:#C17F3A;border-color:#C17F3A;color:white;}

/* ── Toast ── */
.melo-toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:2000;background:#2C1810;color:#d4af37;padding:11px 26px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;box-shadow:0 8px 32px rgba(44,24,16,.35);animation:toastIn .3s ease;letter-spacing:.5px;white-space:nowrap;pointer-events:none;}
@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

/* ── Accessibility ── */
*:focus-visible{outline:2px solid #C17F3A;outline-offset:3px;border-radius:4px;}
*:focus:not(:focus-visible){outline:none;}

/* ── Reduced Motion ── */
@media(prefers-reduced-motion:reduce){
  *{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}
}
`;

// ─────────────────────── DATA ─────────────────────────────────
const PERFUMES = [
  {id:1,designer:"Tom Ford",name:"Black Orchid",badge:"Niche Luxury",mood:"Mysterious",height:448,retail:135,
   gradient:"linear-gradient(155deg,#1a0a2e 0%,#2d1b4e 45%,#6b2d7a 100%)",accent:"#d8a8ff",textCol:"#FAF3E8",
   notes:{top:["Bergamot","Black Truffle"],mid:["Black Orchid","Jasmine"],base:["Sandalwood","Patchouli"]},
   dupe:{brand:"Zara",name:"Black Oud",price:"$19.99",match:89}},
  {id:2,designer:"Creed",name:"Aventus",badge:"Prestige",mood:"Woody",height:400,retail:395,
   gradient:"linear-gradient(155deg,#1c3a1c 0%,#2d5a2d 45%,#8b7d55 100%)",accent:"#d4af37",textCol:"#FAF3E8",
   notes:{top:["Blackcurrant","Apple","Bergamot"],mid:["Birch","Jasmine","Rose"],base:["Musk","Oak Moss","Ambergris"]},
   dupe:{brand:"Armaf",name:"Club de Nuit",price:"$35.00",match:92}},
  {id:3,designer:"Maison Margiela",name:"Replica Beach Walk",badge:"Artisan",mood:"Fresh Aquatic",height:480,retail:175,
   gradient:"linear-gradient(155deg,#1a5f7a 0%,#2d9bb0 50%,#8fccd8 100%)",accent:"#b8e8f0",textCol:"#FAF3E8",
   notes:{top:["Lemon","Bergamot","Pink Pepper"],mid:["Ylang-Ylang","Heliotrope"],base:["Musk","Vanilla","Woody Notes"]},
   dupe:{brand:"Pacifica",name:"Tahitian Gardenia",price:"$28.00",match:87}},
  {id:4,designer:"Chanel",name:"No. 5",badge:"Heritage",mood:"Floral Aldehyde",height:420,retail:155,
   gradient:"linear-gradient(155deg,#9a7b4f 0%,#c9a96e 50%,#f0dec8 100%)",accent:"#4a2800",textCol:"#2C1810",
   notes:{top:["Aldehyde","Neroli","Ylang-Ylang"],mid:["Iris","Rose","Jasmine"],base:["Vetiver","Sandalwood","Civet"]},
   dupe:{brand:"Zara",name:"Emotions No. 5",price:"$22.00",match:91}},
  {id:5,designer:"YSL",name:"Black Opium",badge:"Mainstream Luxury",mood:"Gourmand",height:468,retail:130,
   gradient:"linear-gradient(155deg,#1a0505 0%,#5c1515 40%,#a83030 80%,#d45050 100%)",accent:"#ffb3b3",textCol:"#FAF3E8",
   notes:{top:["Pink Pepper","Orange Blossom","Pear"],mid:["Coffee","Jasmine","Bitter Almond"],base:["Patchouli","Vanilla","White Musk"]},
   dupe:{brand:"Dossier",name:"Ambery Vanilla",price:"$49.00",match:94}},
  {id:6,designer:"Dior",name:"Sauvage",badge:"Prestige",mood:"Fresh Spicy",height:402,retail:120,
   gradient:"linear-gradient(155deg,#0d1b2a 0%,#1b3a5c 50%,#3a7ab0 100%)",accent:"#90caef",textCol:"#FAF3E8",
   notes:{top:["Bergamot","Pepper"],mid:["Lavender","Pink Pepper","Vetiver"],base:["Ambroxan","Cedar","Labdanum"]},
   dupe:{brand:"Armaf",name:"Club de Nuit Intense Man",price:"$32.00",match:90}},
  {id:7,designer:"Jo Malone",name:"Peony & Blush Suede",badge:"British Niche",mood:"Floral",height:440,retail:160,
   gradient:"linear-gradient(155deg,#7a2a4a 0%,#b86080 50%,#e8a8b8 100%)",accent:"#ffd8e4",textCol:"#FAF3E8",
   notes:{top:["Red Apple","Peony"],mid:["Jasmine","Rose"],base:["Suede","White Musk","Blush"]},
   dupe:{brand:"Zara",name:"Peony",price:"$18.00",match:85}},
  {id:8,designer:"MFK",name:"Baccarat Rouge 540",badge:"Ultra-Niche",mood:"Oriental Woody",height:500,retail:325,
   gradient:"linear-gradient(155deg,#8b1a1a 0%,#c4602a 40%,#d4af37 80%,#f0d060 100%)",accent:"#fff0b0",textCol:"#FAF3E8",
   notes:{top:["Jasmine","Saffron"],mid:["Amberwood","Ambergris","Fir Resin"],base:["Suede","Cedar","Oakmoss"]},
   dupe:{brand:"Lattafa",name:"Badee Al Oud",price:"$25.00",match:93}},
  {id:9,designer:"Chanel",name:"Chance Eau Tendre",badge:"Heritage",mood:"Fresh Floral",height:420,retail:145,
   gradient:"linear-gradient(155deg,#4a8a4a 0%,#7ab87a 50%,#c8dfa8 100%)",accent:"#1a4a1a",textCol:"#1a3a1a",
   notes:{top:["Grapefruit","Quince"],mid:["Hyacinth","Jasmine","Rose"],base:["Iris","White Musk","Amber"]},
   dupe:{brand:"Zara",name:"Gardenia",price:"$16.00",match:86}},
  {id:10,designer:"Viktor & Rolf",name:"Flowerbomb",badge:"Mainstream Luxury",mood:"Floral",height:462,retail:120,
   gradient:"linear-gradient(155deg,#5a1a4a 0%,#a050a0 50%,#d898d0 100%)",accent:"#ffd8f8",textCol:"#FAF3E8",
   notes:{top:["Bergamot","Green Tea","Osmanthus"],mid:["Freesia","Jasmine","Rose","Orchid"],base:["Patchouli","Musk","Vanilla"]},
   dupe:{brand:"Zara",name:"Femme",price:"$17.00",match:88}},
  {id:11,designer:"Guerlain",name:"Mon Guerlain",badge:"Heritage",mood:"Floral Gourmand",height:382,retail:115,
   gradient:"linear-gradient(155deg,#4a2a6a 0%,#8a5aa8 50%,#c8a0d8 100%)",accent:"#f0d8ff",textCol:"#FAF3E8",
   notes:{top:["Bergamot","Lavender"],mid:["Jasmine Sambac","Lavender"],base:["Sandalwood","Vanilla","Tonka Bean"]},
   dupe:{brand:"L'Oreal",name:"La Vie Est Belle",price:"$24.00",match:88}},
];

const BLOGS = [
  {id:1,category:"Dupe Guide",title:"The Art of Dupes: You Don't Need $300 Perfume",excerpt:"Luxury fragrance dupes have come a long way. Discover how modern perfumery makes exquisite scents accessible at every budget.",gradient:"linear-gradient(155deg,#8b4513 0%,#c4843a 100%)"},
  {id:2,category:"Scent 101",title:"Understanding Scent Families: A Beginner's Guide",excerpt:"From woody orientals to aquatic florals — learn to decode the language of fragrance and find your signature scent family.",gradient:"linear-gradient(155deg,#2d5a2d 0%,#6b9b5c 100%)"},
  {id:3,category:"Niche Reviews",title:"5 Niche Perfumes Worth Every Single Penny",excerpt:"When a fragrance transcends the ordinary, price becomes irrelevant. We curate the five niche perfumes that truly deserve the splurge.",gradient:"linear-gradient(155deg,#4a1a6b 0%,#8b4db0 100%)"},
  {id:4,category:"Tips & Tricks",title:"How to Layer Fragrances Like a Professional Nose",excerpt:"Layering is the secret weapon of fragrance connoisseurs. Master the art of building complex, personal scent profiles.",gradient:"linear-gradient(155deg,#8b1a3a 0%,#c45a7a 100%)"},
  {id:5,category:"Scent 101",title:"The Science of Skin Chemistry and Fragrance",excerpt:"Ever wonder why perfume smells different on you? Your skin's pH, temperature, and microbiome all play a fascinating role.",gradient:"linear-gradient(155deg,#1a4a6b 0%,#4a8ab0 100%)"},
  {id:6,category:"Dupe Guide",title:"2025's Most-Wanted Fragrance Dupes, Ranked",excerpt:"Our annual roundup of the best affordable alternatives to designer fragrances — tested, verified, and completely obsessed over.",gradient:"linear-gradient(155deg,#6b4a1a 0%,#c49b5c 100%)"},
];

const MOOD_FILTERS = ["Woody","Floral","Gourmand","Fresh","Oriental","Niche"];

const QUIZ_QS = [
  {q:"Pick a mood",sub:"How do you want to feel when you wear it?",opts:[{v:"Mysterious",sym:"◈",grad:"linear-gradient(155deg,#1a0a2e,#6b2d7a)",col:"#d8a8ff"},{v:"Fresh",sym:"◉",grad:"linear-gradient(155deg,#1a5f7a,#8fccd8)",col:"#b8f0f8"},{v:"Romantic",sym:"✿",grad:"linear-gradient(155deg,#7a2a4a,#e8a8b8)",col:"#ffd8e8"},{v:"Bold",sym:"◆",grad:"linear-gradient(155deg,#3a1a0a,#a84020)",col:"#ffb888"}]},
  {q:"Choose a season",sub:"When will you reach for this most?",opts:[{v:"Spring",sym:"✿",grad:"linear-gradient(155deg,#1a5a2a,#7ab87a)",col:"#c8f0a8"},{v:"Summer",sym:"✦",grad:"linear-gradient(155deg,#8b6020,#e8c050)",col:"#fff0b0"},{v:"Autumn",sym:"◈",grad:"linear-gradient(155deg,#6b4020,#c4843a)",col:"#ffe0b0"},{v:"Winter",sym:"❄",grad:"linear-gradient(155deg,#1a2a4a,#4a7ab0)",col:"#b8d8f0"}]},
  {q:"Your ideal weekend",sub:"Where does your imagination take you?",opts:[{v:"Beach",sym:"∿",grad:"linear-gradient(155deg,#1a5f7a,#2d9bb0)",col:"#b8e8f0"},{v:"Forest",sym:"◈",grad:"linear-gradient(155deg,#1c3a1c,#4a7a3a)",col:"#a8d898"},{v:"City",sym:"◆",grad:"linear-gradient(155deg,#1a1a2e,#4a4a7a)",col:"#c8c8f0"},{v:"Cosy Home",sym:"♥",grad:"linear-gradient(155deg,#6b3a1a,#c4843a)",col:"#ffe0b0"}]},
  {q:"Pick a texture",sub:"What does your perfect scent feel like?",opts:[{v:"Silky",sym:"◇",grad:"linear-gradient(155deg,#9a7b4f,#f0dec8)",col:"#4a2800"},{v:"Earthy",sym:"◉",grad:"linear-gradient(155deg,#3a2a1a,#8b6040)",col:"#f0c890"},{v:"Crisp",sym:"◈",grad:"linear-gradient(155deg,#1a5f3a,#7ab890)",col:"#c8f0d8"},{v:"Warm",sym:"◆",grad:"linear-gradient(155deg,#6b2020,#d45050)",col:"#ffb8b8"}]},
  {q:"How long should it last?",sub:"From first spray to final whisper",opts:[{v:"Light & Fleeting",sym:"◌",grad:"linear-gradient(155deg,#8a8a9a,#c8c8d8)",col:"#f0f0f8"},{v:"All Day",sym:"◎",grad:"linear-gradient(155deg,#3a5a8a,#7a9ab0)",col:"#d8e8f8"},{v:"Morning to Night",sym:"◉",grad:"linear-gradient(155deg,#8b4513,#d4af37)",col:"#fff0a0"},{v:"Forever",sym:"✦",grad:"linear-gradient(155deg,#1a0a2e,#8b1a1a,#d4af37)",col:"#ffd860"}]},
];

const QZ_SC = {
  Mysterious:{1:3,5:3,8:3,2:1},Fresh:{3:3,6:3,9:3},Romantic:{4:3,7:3,10:3,11:2},Bold:{2:3,6:2,1:2},
  Spring:{9:3,7:3,10:2,4:1},Summer:{3:3,6:3,9:2},Autumn:{8:3,1:3,5:2,2:1},Winter:{5:3,8:3,1:2,2:2},
  Beach:{3:3,9:2,6:2},Forest:{2:3,1:2,8:2},City:{5:3,1:2,4:2},"Cosy Home":{11:3,10:3,5:2,4:1},
  Silky:{4:3,7:3,10:2},Earthy:{2:3,1:2,8:3},Crisp:{3:3,6:3,9:2},Warm:{5:3,11:3,8:2},
  "Light & Fleeting":{3:3,9:2,7:1},"All Day":{6:3,7:2,10:2},"Morning to Night":{4:3,2:2,11:2},Forever:{8:3,1:3,5:2},
};
function calcQuizResults(a){
  const sc={};PERFUMES.forEach(p=>sc[p.id]=0);
  a.filter(Boolean).forEach(v=>{Object.entries(QZ_SC[v]||{}).forEach(([id,pt])=>{sc[+id]=(sc[+id]||0)+pt;});});
  return [...PERFUMES].sort((a,b)=>(sc[b.id]||0)-(sc[a.id]||0)).slice(0,3);
}

const BADGES = [
  {id:"fw",name:"First Whiff",sym:"✧",bg:"linear-gradient(135deg,#5a2a7a,#9b6bb0)",desc:"Flipped your first card",hint:"Flip any perfume card",earned:s=>s.fIds.length>=1,prog:s=>Math.min(1,s.fIds.length/1)},
  {id:"oe",name:"Oud Explorer",sym:"◈",bg:"linear-gradient(135deg,#1a0a2e,#6b2d7a)",desc:"Explored 3 dark fragrances",hint:"Flip 3 woody/mysterious cards",earned:s=>s.fIds.filter(i=>[1,2,8].includes(i)).length>=3,prog:s=>Math.min(1,s.fIds.filter(i=>[1,2,8].includes(i)).length/3)},
  {id:"cc",name:"Citrus Collector",sym:"◉",bg:"linear-gradient(135deg,#1a5f7a,#2d9bb0)",desc:"Explored 3 fresh scents",hint:"Flip 3 fresh/aquatic cards",earned:s=>s.fIds.filter(i=>[3,6,9].includes(i)).length>=3,prog:s=>Math.min(1,s.fIds.filter(i=>[3,6,9].includes(i)).length/3)},
  {id:"dh",name:"Dupe Hunter",sym:"⬡",bg:"linear-gradient(135deg,#8b4513,#d4af37)",desc:"Viewed 5 dupe reveals",hint:"Flip any 5 perfume cards",earned:s=>s.fIds.length>=5,prog:s=>Math.min(1,s.fIds.length/5)},
  {id:"fd",name:"Floral Devotee",sym:"✿",bg:"linear-gradient(135deg,#7a2a4a,#e8a8b8)",desc:"Explored 3 floral scents",hint:"Flip 3 floral cards",earned:s=>s.fIds.filter(i=>[4,7,10,11].includes(i)).length>=3,prog:s=>Math.min(1,s.fIds.filter(i=>[4,7,10,11].includes(i)).length/3)},
  {id:"dd",name:"Daily Devotee",sym:"◎",bg:"linear-gradient(135deg,#8b5a1a,#d4af37)",desc:"Visited 3 days in a row",hint:"Open Meloscent 3 days in a row",earned:s=>s.streak>=3,prog:s=>Math.min(1,s.streak/3)},
  {id:"wc",name:"Wardrobe Curator",sym:"◇",bg:"linear-gradient(135deg,#9a7b4f,#f0dec8)",desc:"Saved 3 to your wardrobe",hint:"Add 3 perfumes to wardrobe",earned:s=>s.wIds.length>=3,prog:s=>Math.min(1,s.wIds.length/3)},
  {id:"nk",name:"The Nose Knows",sym:"✦",bg:"linear-gradient(135deg,#8b1a1a,#d4af37)",desc:"Explored all 11 fragrances",hint:"Flip every perfume card",earned:s=>s.fIds.length>=11,prog:s=>Math.min(1,s.fIds.length/11)},
];

const rLS=(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch{return d;}};
const wLS=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}};
const parsePx=s=>parseFloat(String(s).replace(/[^0-9.]/g,""))||0;

// ─────────────── Note Pills ───────────────────────────────────
function NotePill({note,dark,onClick,active}){
  const handle=onClick?e=>{e.stopPropagation();onClick(note);}:undefined;
  return dark
    ?<span className={`npill${onClick?" clickable":""}`} onClick={handle} style={{background:active?"#C17F3A":"rgba(193,127,58,.1)",color:active?"white":"#8b5a1a",border:`0.5px solid ${active?"#C17F3A":"rgba(193,127,58,.22)"}`}}>{note}</span>
    :<span className={`npill${onClick?" clickable":""}`} onClick={handle} style={{background:active?"rgba(255,255,255,.45)":"rgba(255,255,255,.16)",color:"rgba(255,255,255,.95)",border:active?"1.5px solid rgba(255,255,255,.8)":"none"}}>{note}</span>;
}

function ScentStrip({notes,dark,onNoteClick,noteFilter}){
  const lbl={fontSize:10,fontFamily:"'DM Sans',sans-serif",letterSpacing:1.5,textTransform:"uppercase",color:dark?"#C17F3A":"rgba(255,255,255,.55)",marginRight:6,display:"block",marginBottom:4};
  const pill=n=><NotePill key={n} note={n} dark={dark} onClick={onNoteClick} active={noteFilter===n}/>;
  return(<div>
    <div style={{marginBottom:6}}><span style={lbl}>Top</span>{notes.top.map(pill)}</div>
    <div style={{marginBottom:6}}><span style={lbl}>Mid</span>{notes.mid.map(pill)}</div>
    <div><span style={lbl}>Base</span>{notes.base.map(pill)}</div>
  </div>);
}

function MatchRing({score}){
  const r=28,c=2*Math.PI*r;
  return(<div style={{display:"flex",alignItems:"center",gap:14}}>
    <svg width="68" height="68" viewBox="0 0 68 68" aria-label={`${score}% scent match`} role="img">
      <defs><linearGradient id="mg"><stop offset="0%" stopColor="#C17F3A"/><stop offset="100%" stopColor="#d4af37"/></linearGradient></defs>
      <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(193,127,58,.15)" strokeWidth="5"/>
      <circle cx="34" cy="34" r={r} fill="none" stroke="url(#mg)" strokeWidth="5" strokeDasharray={`${(score/100)*c} ${c}`} strokeLinecap="round" transform="rotate(-90 34 34)"/>
      <text x="34" y="39" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="14" fontWeight="500" fill="#5a3010">{score}%</text>
    </svg>
    <div>
      <div style={{fontSize:10,fontFamily:"'DM Sans',sans-serif",letterSpacing:1.5,textTransform:"uppercase",color:"#C17F3A",marginBottom:3}}>Scent Match</div>
      <div style={{fontSize:12,fontFamily:"'DM Sans',sans-serif",color:"#a07040"}}>Verified similarity</div>
    </div>
  </div>);
}

// ─────────────── NavBar (extracted — fixes Bug 3) ─────────────
function NavBar({page,stats,earnedCount,onNavigate,onOpenProfile,onScrollToBlog,onFilterNiche}){
  const [mob,setMob]=useState(false);
  const wdCount=stats.wIds.length;
  useEffect(()=>{
    // Lock scroll when mobile menu open
    document.body.style.overflow=mob?"hidden":"";
    return()=>{document.body.style.overflow="";};
  },[mob]);
  const close=()=>setMob(false);
  return(
    <>
      <nav style={{maxWidth:1400,margin:"0 auto",padding:"18px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"0.5px solid rgba(193,127,58,.15)"}}>
        <button onClick={()=>{onNavigate("discovery");close();}} style={{display:"flex",alignItems:"center",gap:10,background:"none",border:"none",cursor:"pointer",padding:0}} aria-label="Go to homepage">
          <div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#C17F3A,#d4af37)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(193,127,58,.35)"}}>
            <span style={{fontSize:15,color:"white",lineHeight:1}}>✦</span>
          </div>
          <span style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"#2C1810",letterSpacing:"-.3px"}}>Melo<span style={{color:"#C17F3A"}}>scent</span></span>
        </button>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{display:"flex",alignItems:"center",gap:22}}>
          <button className="nav-link" onClick={()=>onNavigate("discovery")} style={{color:page==="discovery"?"#C17F3A":undefined}}>Discovery</button>
          <button className="nav-link" onClick={()=>onNavigate("wardrobe")} style={{color:page==="wardrobe"?"#C17F3A":undefined}}>
            Wardrobe{wdCount>0&&<span style={{marginLeft:5,fontSize:10,background:"#C17F3A",color:"white",borderRadius:50,padding:"1px 6px",verticalAlign:"middle"}}>{wdCount}</span>}
          </button>
          <button className="nav-link" onClick={()=>{onNavigate("discovery");onFilterNiche();}}>Niche</button>
          <button className="nav-link" onClick={()=>{onNavigate("discovery");setTimeout(onScrollToBlog,120);}}>Journal</button>
          <button className="prof-btn" onClick={onOpenProfile} aria-label={`Open profile — ${earnedCount} badges earned`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            {earnedCount>0&&<div aria-hidden="true" style={{position:"absolute",top:-3,right:-3,width:16,height:16,borderRadius:"50%",background:"#2C1810",color:"#d4af37",fontSize:9,fontFamily:"'DM Sans',sans-serif",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #FAF3E8"}}>{earnedCount}</div>}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button className="prof-btn" onClick={onOpenProfile} aria-label="Open profile" style={{display:"none"}}
            id="mob-prof-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          </button>
          <button className="hamburger" onClick={()=>setMob(true)} aria-label="Open navigation menu" aria-expanded={mob}>
            <span className="h-line"/><span className="h-line"/><span className="h-line"/>
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {mob&&(
        <div className="mob-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="mob-menu-header">
            <span style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"#C17F3A"}}>Meloscent</span>
            <button onClick={close} aria-label="Close menu" style={{background:"none",border:"none",cursor:"pointer",fontSize:26,color:"rgba(44,24,16,.4)",lineHeight:1,padding:"4px 8px"}}>×</button>
          </div>
          <div style={{padding:"12px 0"}}>
            {[["Discovery","discovery"],["Wardrobe","wardrobe"]].map(([l,pg])=>(
              <button key={pg} className="mob-nav-item" onClick={()=>{onNavigate(pg);close();}}>
                {l}{pg==="wardrobe"&&wdCount>0&&` (${wdCount})`}
              </button>
            ))}
            <button className="mob-nav-item" onClick={()=>{onNavigate("discovery");onFilterNiche();close();}}>Niche</button>
            <button className="mob-nav-item" onClick={()=>{onNavigate("discovery");setTimeout(onScrollToBlog,200);close();}}>Journal</button>
          </div>
          <div style={{padding:"16px 0 0",borderTop:"0.5px solid rgba(193,127,58,.12)"}}>
            {["Instagram","Pinterest","TikTok"].map(s=>(
              <button key={s} className="mob-nav-sub" onClick={close}>{s}</button>
            ))}
          </div>
          <div style={{padding:"24px 28px",marginTop:"auto"}}>
            <button onClick={()=>{onOpenProfile();close();}} style={{width:"100%",padding:"14px",borderRadius:14,background:"linear-gradient(135deg,#C17F3A,#d4af37)",border:"none",color:"white",fontFamily:"'DM Sans',sans-serif",fontSize:15,fontWeight:500,cursor:"pointer",letterSpacing:.4}}>
              My Profile {earnedCount>0&&`· ${earnedCount} badges`}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────── PerfumeCard ──────────────────────────────────
function PerfumeCard({p,onFlip,onNoteClick,noteFilter,compareIds,onCompare,wardrobeIds,onWardrobeToggle}){
  const [flipped,setFlipped]=useState(false);
  const inCmp=compareIds.includes(p.id);
  const cmpFull=compareIds.length===2&&!inCmp;
  const inWd=wardrobeIds.includes(p.id);
  const handleClick=()=>{if(!flipped&&onFlip)onFlip(p.id);setFlipped(f=>!f);};
  const handleCmp=e=>{e.stopPropagation();if(!cmpFull)onCompare(p.id);};
  const handleWd=e=>{e.stopPropagation();onWardrobeToggle(p.id);};
  return(
    <div className="mcard-wrap">
      <div className="mcard-scene" style={{height:p.height}} onClick={handleClick}
        role="button" tabIndex={0} aria-label={`${p.designer} ${p.name} — ${flipped?"showing dupe":"click to reveal dupe"}`}
        onKeyDown={e=>e.key==="Enter"&&handleClick()}>
        <div className={`mcard-inner mcard-shadow${flipped?" flipped":""}`}
          style={{height:p.height,borderRadius:20,boxShadow:"0 10px 40px rgba(44,24,16,.18)"}}>
          {/* FRONT */}
          <div className="mcard-face" style={{background:p.gradient}}>
            <div style={{position:"absolute",right:-28,top:-28,width:110,height:110,borderRadius:"50%",background:"rgba(255,255,255,.06)",pointerEvents:"none"}}/>
            {/* Compare button — FIX 9: higher opacity, proper aria-label */}
            <button className="cmp-btn" onClick={handleCmp}
              aria-label={inCmp?"Remove from compare":"Add to compare"}
              style={{position:"absolute",top:10,right:10,zIndex:5,width:28,height:28,fontSize:13,
                background:inCmp?"#C17F3A":"rgba(255,255,255,.32)",
                color:inCmp?"white":"rgba(255,255,255,.9)",
                opacity:cmpFull?.3:1,
                border:`1.5px solid ${inCmp?"#C17F3A":"rgba(255,255,255,.5)"}`,
                backdropFilter:"blur(4px)"}}>
              {inCmp?"✓":"+"}
            </button>
            <div style={{position:"relative",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:24,zIndex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",paddingRight:36}}>
                <span style={{padding:"4px 13px",borderRadius:50,background:"rgba(255,255,255,.15)",color:"rgba(255,255,255,.92)",fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:.7,fontWeight:500,border:"0.5px solid rgba(255,255,255,.22)"}}>{p.badge}</span>
                <span style={{padding:"4px 13px",borderRadius:50,background:"rgba(0,0,0,.18)",color:"rgba(255,255,255,.82)",fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:.4}}>{p.mood}</span>
              </div>
              <div>
                <div style={{fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:300,letterSpacing:2.5,textTransform:"uppercase",color:p.accent,marginBottom:6,opacity:.9}}>{p.designer}</div>
                <div style={{fontSize:28,fontFamily:"'Playfair Display',serif",fontWeight:600,color:p.textCol,lineHeight:1.15,marginBottom:6}}>{p.name}</div>
                <div className="flip-hint" style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",color:"rgba(255,255,255,.45)",letterSpacing:.3}}>↩ Tap to reveal dupe</div>
              </div>
              <div>
                <div style={{borderTop:"0.5px solid rgba(255,255,255,.15)",paddingTop:13,marginBottom:8}}>
                  <ScentStrip notes={p.notes} dark={false} onNoteClick={onNoteClick} noteFilter={noteFilter}/>
                </div>
                <div className="cmp-hint">+ Compare</div>
              </div>
            </div>
          </div>
          {/* BACK */}
          <div className="mcard-face mcard-back" style={{background:"linear-gradient(160deg,#FAF3E8 0%,#F0E4D0 60%,#E8D4BC 100%)"}}>
            <div style={{position:"absolute",right:-18,top:-18,width:96,height:96,borderRadius:"50%",background:"rgba(193,127,58,.07)",pointerEvents:"none"}}/>
            <div style={{position:"relative",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:24,zIndex:1}}>
              <div>
                <div style={{fontSize:10,fontFamily:"'DM Sans',sans-serif",letterSpacing:2,textTransform:"uppercase",color:"#C17F3A",marginBottom:8}}>A Perfect Alternative For</div>
                <div style={{fontSize:13,fontFamily:"'Playfair Display',serif",fontStyle:"italic",color:"#8b6a3a"}}>{p.designer} — {p.name}</div>
              </div>
              <div>
                <div style={{marginBottom:14}}><MatchRing score={p.dupe.match}/></div>
                <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:14}}>
                  <div>
                    <div style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:1.8,textTransform:"uppercase",color:"#C17F3A",marginBottom:5}}>{p.dupe.brand}</div>
                    <div style={{fontSize:20,fontFamily:"'Playfair Display',serif",fontWeight:600,color:"#2C1810",lineHeight:1.1}}>{p.dupe.name}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:24,fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#5a3010"}}>{p.dupe.price}</div>
                    <div style={{fontSize:10,fontFamily:"'DM Sans',sans-serif",color:"#C17F3A",letterSpacing:.5}}>vs. ${p.retail}</div>
                  </div>
                </div>
                <button className={`wd-add-btn${inWd?" saved":""}`} onClick={handleWd} aria-pressed={inWd}>
                  {inWd?"✓ Saved to Wardrobe":"+ Save to Wardrobe"}
                </button>
              </div>
              <div style={{borderTop:"0.5px solid rgba(193,127,58,.2)",paddingTop:13}}>
                <ScentStrip notes={p.notes} dark={true} onNoteClick={onNoteClick} noteFilter={noteFilter}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogCard({b}){
  return(
    <article className="blog-card">
      <div style={{height:148,background:b.gradient,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-20,bottom:-20,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,.12)"}}/>
        <div style={{position:"absolute",left:20,top:20,padding:"4px 12px",borderRadius:50,background:"rgba(0,0,0,.25)",color:"rgba(255,255,255,.9)",fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:.7}}>{b.category}</div>
      </div>
      <div style={{padding:"22px 24px"}}>
        <h3 style={{fontSize:17,fontFamily:"'Playfair Display',serif",fontWeight:600,color:"#2C1810",lineHeight:1.35,marginBottom:10}}>{b.title}</h3>
        <p style={{fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:300,color:"rgba(44,24,16,.58)",lineHeight:1.7,marginBottom:18}}>{b.excerpt}</p>
        <span style={{fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:500,letterSpacing:1.2,textTransform:"uppercase",color:"#C17F3A"}}>Read More →</span>
      </div>
    </article>
  );
}

// ─────────────── SOTD — FIX 2: adaptive contrast ─────────────
function ScentOfTheDay({onOpenQuiz}){
  const p=PERFUMES[new Date().getDate()%PERFUMES.length];
  const light=p.textCol!=="#FAF3E8";
  const oBg=light?"rgba(0,0,0,.1)":"rgba(255,255,255,.16)";
  const oBd=light?"rgba(0,0,0,.18)":"rgba(255,255,255,.26)";
  const oTxt=light?p.textCol:"rgba(255,255,255,.92)";
  const dBg=light?"rgba(0,0,0,.07)":"rgba(255,255,255,.13)";
  const dTxt=light?"#2C1810":"rgba(255,255,255,.96)";
  const dSub=light?"rgba(44,24,16,.55)":"rgba(255,255,255,.65)";
  const mBg=light?"rgba(0,0,0,.08)":"rgba(0,0,0,.18)";
  const mTxt=light?"rgba(44,24,16,.65)":"rgba(255,255,255,.85)";
  return(
    <div className="sotd-banner" style={{background:p.gradient}} role="banner" aria-label="Scent of the Day">
      <div style={{position:"absolute",right:-80,top:-80,width:280,height:280,borderRadius:"50%",background:"rgba(255,255,255,.07)",pointerEvents:"none"}} aria-hidden="true"/>
      <div style={{position:"absolute",left:-40,bottom:-40,width:180,height:180,borderRadius:"50%",background:"rgba(0,0,0,.08)",pointerEvents:"none"}} aria-hidden="true"/>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"32px 28px",display:"flex",alignItems:"center",gap:40,position:"relative",zIndex:1,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:240}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 14px",borderRadius:50,background:oBg,marginBottom:14,backdropFilter:"blur(6px)",border:`0.5px solid ${oBd}`}}>
            <span style={{fontSize:10,color:oTxt,letterSpacing:1.5,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>✦ Today's Pick</span>
          </div>
          <div style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:2.5,textTransform:"uppercase",color:p.accent,marginBottom:5,opacity:.9}}>{p.designer}</div>
          <div style={{fontSize:"2rem",fontFamily:"'Playfair Display',serif",fontWeight:700,color:p.textCol,lineHeight:1.15,marginBottom:10}}>{p.name}</div>
          <div style={{display:"inline-flex",padding:"4px 14px",borderRadius:50,background:mBg,color:mTxt,fontSize:12,fontFamily:"'DM Sans',sans-serif",marginBottom:20}}>{p.mood}</div>
          <div>
            <button className="sotd-quiz-btn" onClick={onOpenQuiz}
              style={{background:oBg,border:`1.5px solid ${oBd}`,color:oTxt,backdropFilter:"blur(6px)"}}
              aria-label="Take the scent quiz">
              ✦ Find Your Scent
            </button>
          </div>
        </div>
        <div style={{background:dBg,backdropFilter:"blur(14px)",borderRadius:18,padding:"20px 24px",minWidth:220,border:`0.5px solid ${oBd}`,flexShrink:0}} aria-label="Dupe recommendation">
          <div style={{fontSize:10,fontFamily:"'DM Sans',sans-serif",letterSpacing:2,textTransform:"uppercase",color:dSub,marginBottom:12}}>Perfect Dupe</div>
          <div style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:1.5,textTransform:"uppercase",color:p.accent,marginBottom:4}}>{p.dupe.brand}</div>
          <div style={{fontSize:20,fontFamily:"'Playfair Display',serif",fontWeight:600,color:dTxt,marginBottom:10}}>{p.dupe.name}</div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
            <div style={{fontSize:22,fontFamily:"'Playfair Display',serif",fontWeight:700,color:dTxt}}>{p.dupe.price}</div>
            <div style={{padding:"4px 12px",borderRadius:50,background:oBg,color:oTxt,fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:500,border:`0.5px solid ${oBd}`}}>{p.dupe.match}% match</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────── Quiz Modal — FIX 5: keyboard accessible ─────
function QuizModal({onClose,onAddToWardrobe}){
  const [step,setStep]=useState(0);
  const [ans,setAns]=useState(Array(5).fill(null));
  const [results,setResults]=useState([]);
  const [aKey,setAKey]=useState(0);
  const [saved,setSaved]=useState([]);
  const isR=step===5;
  function pick(v){const a=[...ans];a[step]=v;setAns(a);}
  function next(){if(step<4){setAKey(k=>k+1);setStep(s=>s+1);}else{setResults(calcQuizResults(ans));setAKey(k=>k+1);setStep(5);}}
  function retake(){setAns(Array(5).fill(null));setResults([]);setSaved([]);setAKey(k=>k+1);setStep(0);}
  function save(id){if(!saved.includes(id)){setSaved(s=>[...s,id]);onAddToWardrobe(id);}}
  const q=QUIZ_QS[step];
  return(
    <div className="quiz-overlay" onClick={e=>e.target===e.currentTarget&&onClose()} role="dialog" aria-modal="true" aria-label="Scent profile quiz">
      <div className="quiz-modal">
        <div style={{padding:"18px 24px",borderBottom:"0.5px solid rgba(193,127,58,.2)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:1.5,textTransform:"uppercase",color:"#C17F3A"}}>{isR?"Your Scent Profile":`Question ${step+1} of 5`}</span>
          {!isR&&<div style={{display:"flex",gap:6}} aria-label={`Progress: question ${step+1} of 5`}>{[0,1,2,3,4].map(i=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:i<=step?"#C17F3A":"rgba(193,127,58,.22)",transition:"background .3s"}}/>)}</div>}
          <button onClick={onClose} aria-label="Close quiz" style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:"rgba(44,24,16,.38)",lineHeight:1,padding:"4px 8px"}}>×</button>
        </div>
        <div className="qz-enter" key={aKey} style={{padding:"26px 24px 28px"}}>
          {isR?(
            <div>
              <div style={{textAlign:"center",marginBottom:24}}>
                <div style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:2,textTransform:"uppercase",color:"#C17F3A",marginBottom:8}}>✦ Matched For You ✦</div>
                <h2 style={{fontSize:"1.7rem",fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#2C1810",marginBottom:6}}>Your Perfect Matches</h2>
                <p style={{fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:300,color:"rgba(44,24,16,.52)",lineHeight:1.65}}>Based on your taste profile, we found these for you.</p>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:14,marginBottom:24}}>
                {results.map(p=>(
                  <div key={p.id} style={{borderRadius:16,overflow:"hidden",boxShadow:"0 8px 32px rgba(44,24,16,.12)"}}>
                    <div style={{height:108,background:p.gradient,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:14,position:"relative"}}>
                      <div style={{position:"absolute",right:-16,top:-16,width:60,height:60,borderRadius:"50%",background:"rgba(255,255,255,.07)"}}/>
                      <div style={{fontSize:10,fontFamily:"'DM Sans',sans-serif",letterSpacing:2,textTransform:"uppercase",color:p.accent,marginBottom:3}}>{p.designer}</div>
                      <div style={{fontSize:15,fontFamily:"'Playfair Display',serif",fontWeight:600,color:p.textCol,lineHeight:1.2}}>{p.name}</div>
                    </div>
                    <div style={{padding:"13px 14px 15px",background:"white"}}>
                      <div style={{fontSize:10,fontFamily:"'DM Sans',sans-serif",letterSpacing:1.5,textTransform:"uppercase",color:"#C17F3A",marginBottom:3}}>Dupe →</div>
                      <div style={{fontSize:13,fontFamily:"'Playfair Display',serif",fontWeight:600,color:"#2C1810",marginBottom:2}}>{p.dupe.name}</div>
                      <div style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",color:"rgba(44,24,16,.5)",marginBottom:10}}>{p.dupe.brand} · {p.dupe.price}</div>
                      <button onClick={()=>save(p.id)} aria-pressed={saved.includes(p.id)} style={{width:"100%",padding:"8px",borderRadius:10,background:saved.includes(p.id)?"transparent":"#C17F3A",border:`1px solid ${saved.includes(p.id)?"rgba(193,127,58,.4)":"#C17F3A"}`,color:saved.includes(p.id)?"#8b5a1a":"white",fontFamily:"'DM Sans',sans-serif",fontSize:12,cursor:"pointer",fontWeight:500,letterSpacing:.3,transition:"all .2s"}}>
                        {saved.includes(p.id)?"✓ In Wardrobe":"+ Add to Wardrobe"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap"}}>
                <button onClick={retake} style={{padding:"12px 26px",borderRadius:50,border:"1.5px solid rgba(193,127,58,.4)",background:"transparent",color:"#8b5a1a",fontFamily:"'DM Sans',sans-serif",fontSize:13,cursor:"pointer",letterSpacing:.4}}>↺ Retake Quiz</button>
                <button onClick={onClose} style={{padding:"12px 26px",borderRadius:50,background:"#C17F3A",border:"none",color:"white",fontFamily:"'DM Sans',sans-serif",fontSize:13,cursor:"pointer",letterSpacing:.4,boxShadow:"0 6px 20px rgba(193,127,58,.35)"}}>Explore All →</button>
              </div>
            </div>
          ):(
            <div>
              <h2 style={{fontSize:"1.65rem",fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#2C1810",marginBottom:5}}>{q.q}</h2>
              <p style={{fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:300,color:"rgba(44,24,16,.52)",marginBottom:22,lineHeight:1.5}}>{q.sub}</p>
              {/* FIX 5: role=button + tabIndex + onKeyDown on quiz options */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:26}} role="radiogroup" aria-label={q.q}>
                {q.opts.map(o=>(
                  <div key={o.v}
                    className={`quiz-opt${ans[step]===o.v?" sel":""}`}
                    onClick={()=>pick(o.v)}
                    role="radio"
                    aria-checked={ans[step]===o.v}
                    tabIndex={0}
                    onKeyDown={e=>(e.key==="Enter"||e.key===" ")&&pick(o.v)}>
                    <div style={{height:96,background:o.grad,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6}}>
                      <span style={{fontSize:30,color:o.col,lineHeight:1}} aria-hidden="true">{o.sym}</span>
                      <span style={{fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:500,color:"rgba(255,255,255,.92)",letterSpacing:.2}}>{o.v}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                {step>0?<button onClick={()=>{setAKey(k=>k+1);setStep(s=>s-1);}} style={{padding:"10px 22px",borderRadius:50,border:"1.5px solid rgba(193,127,58,.4)",background:"transparent",color:"#8b5a1a",fontFamily:"'DM Sans',sans-serif",fontSize:13,cursor:"pointer"}}>← Back</button>:<div/>}
                <button className="quiz-next" onClick={next} disabled={!ans[step]}>{step===4?"See My Matches ✦":"Next →"}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────── Profile Drawer ───────────────────────────────
function ProfileDrawer({stats,open,onClose,onGoWardrobe}){
  const earned=BADGES.filter(b=>b.earned(stats));
  const next=BADGES.find(b=>!b.earned(stats));
  return(
    <>
      {open&&<div className="prof-overlay" onClick={onClose} aria-hidden="true"/>}
      <div className={`prof-drawer${open?" prof-open":""}`} role="dialog" aria-modal="true" aria-label="Fragrance profile">
        <div style={{padding:"20px",borderBottom:"0.5px solid rgba(193,127,58,.2)",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:"#FAF3E8",zIndex:10}}>
          <div>
            <div style={{fontSize:10,fontFamily:"'DM Sans',sans-serif",letterSpacing:2,textTransform:"uppercase",color:"#C17F3A",marginBottom:2}}>My Journey</div>
            <div style={{fontSize:18,fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#2C1810"}}>Fragrance Profile</div>
          </div>
          <button onClick={onClose} aria-label="Close profile" style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:"rgba(44,24,16,.38)",lineHeight:1,padding:"4px 8px"}}>×</button>
        </div>
        <div style={{padding:"18px",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {[{l:"Flipped",v:stats.fIds.length},{l:"Dupes Viewed",v:stats.fIds.length},{l:"Day Streak",v:stats.streak}].map(({l,v})=>(
            <div key={l} style={{background:"white",borderRadius:12,padding:"13px 10px",textAlign:"center",border:"0.5px solid rgba(193,127,58,.15)"}}>
              <div style={{fontSize:26,fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#C17F3A",lineHeight:1,marginBottom:4}}>{v}</div>
              <div style={{fontSize:10,fontFamily:"'DM Sans',sans-serif",color:"rgba(44,24,16,.48)",letterSpacing:.4,lineHeight:1.3}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{padding:"0 18px 14px"}}>
          <button onClick={()=>{onClose();onGoWardrobe();}} style={{width:"100%",padding:"13px",borderRadius:14,background:"linear-gradient(135deg,#2C1810,#5a3010)",border:"none",color:"#d4af37",fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,letterSpacing:.2}}>
            ◇ My Wardrobe <span style={{fontSize:12,color:"rgba(212,175,55,.7)",fontFamily:"'DM Sans',sans-serif",fontWeight:400}}>({stats.wIds.length} saved)</span>
          </button>
        </div>
        <div style={{padding:"0 18px 18px"}}>
          <div style={{background:"white",borderRadius:14,padding:"14px 16px",border:"0.5px solid rgba(193,127,58,.15)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:500,color:"#2C1810"}}>Badge Progress</span>
              <span style={{fontSize:12,fontFamily:"'DM Sans',sans-serif",color:"#C17F3A",fontWeight:500}}>{earned.length}/{BADGES.length}</span>
            </div>
            <div style={{height:6,background:"rgba(193,127,58,.15)",borderRadius:3,overflow:"hidden",marginBottom:8}} role="progressbar" aria-valuenow={earned.length} aria-valuemin={0} aria-valuemax={BADGES.length}>
              <div style={{height:"100%",borderRadius:3,background:"linear-gradient(90deg,#C17F3A,#d4af37)",width:`${(earned.length/BADGES.length)*100}%`,transition:"width .6s ease"}}/>
            </div>
            {next&&<div style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",color:"rgba(44,24,16,.42)",lineHeight:1.4}}>Next: <em>{next.name}</em> — {next.hint}</div>}
          </div>
        </div>
        <div style={{padding:"0 18px 36px"}}>
          <div style={{fontSize:10,fontFamily:"'DM Sans',sans-serif",letterSpacing:2,textTransform:"uppercase",color:"#C17F3A",marginBottom:14}}>✦ Badges</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {BADGES.map(b=>{
              const ok=b.earned(stats),pct=b.prog(stats);
              return(
                <div key={b.id} className="badge-item" style={{background:"white",borderRadius:14,padding:"14px",border:`0.5px solid ${ok?"rgba(193,127,58,.3)":"rgba(44,24,16,.08)"}`,opacity:ok?1:.6}} aria-label={`${b.name}: ${ok?"earned":"locked — "+b.hint}`}>
                  <div style={{width:46,height:46,borderRadius:"50%",background:ok?b.bg:"linear-gradient(135deg,#aaa098,#878078)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:9,filter:ok?"none":"grayscale(1) opacity(.6)"}} aria-hidden="true">
                    <span style={{fontSize:20,color:"rgba(255,255,255,.9)"}}>{b.sym}</span>
                  </div>
                  <div style={{fontSize:12,fontFamily:"'Playfair Display',serif",fontWeight:600,color:ok?"#2C1810":"rgba(44,24,16,.45)",marginBottom:3,lineHeight:1.2}}>{b.name}</div>
                  <div style={{fontSize:10,fontFamily:"'DM Sans',sans-serif",color:"rgba(44,24,16,.42)",marginBottom:8,lineHeight:1.35}}>{ok?b.desc:`🔒 ${b.hint}`}</div>
                  {ok?<div style={{fontSize:10,fontFamily:"'DM Sans',sans-serif",color:"#C17F3A",fontWeight:500,letterSpacing:.5}}>✓ Earned</div>
                    :<div style={{height:3,background:"rgba(193,127,58,.15)",borderRadius:2}} role="progressbar" aria-valuenow={Math.round(pct*100)} aria-valuemin={0} aria-valuemax={100}><div style={{height:"100%",borderRadius:2,background:"linear-gradient(90deg,#C17F3A,#d4af37)",width:`${pct*100}%`,transition:"width .5s"}}/></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────── Wardrobe Page ────────────────────────────────
function WardrobePage({wIds,onBack,onRemove,onGoQuiz}){
  const items=PERFUMES.filter(p=>wIds.includes(p.id));
  const totalRetail=items.reduce((s,p)=>s+p.retail,0);
  const totalDupe=items.reduce((s,p)=>s+parsePx(p.dupe.price),0);
  const saved=(totalRetail-totalDupe).toFixed(0);
  return(
    <main className="wd-enter" style={{maxWidth:1400,margin:"0 auto",padding:"0 24px 80px"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,padding:"32px 0 24px",borderBottom:"0.5px solid rgba(193,127,58,.15)",marginBottom:28,flexWrap:"wrap"}}>
        {/* FIX 6: CSS class instead of inline onMouseOver */}
        <button className="wd-back-btn" onClick={onBack}>← Discovery</button>
        <div style={{flex:1}}>
          <div style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:3,textTransform:"uppercase",color:"#C17F3A",marginBottom:4}}>✦ My Collection</div>
          <h1 style={{fontSize:"2.2rem",fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#2C1810",lineHeight:1}}>My Wardrobe</h1>
        </div>
        {items.length>0&&<div style={{textAlign:"right"}}><div style={{fontSize:13,fontFamily:"'DM Sans',sans-serif",color:"#C17F3A",fontWeight:500}}>{items.length} saved</div></div>}
      </div>
      {items.length===0?(
        <div style={{textAlign:"center",padding:"80px 20px"}}>
          <div style={{fontSize:56,marginBottom:20,opacity:.2}} aria-hidden="true">◇</div>
          <h2 style={{fontSize:26,fontFamily:"'Playfair Display',serif",color:"#2C1810",marginBottom:12}}>Your wardrobe is empty</h2>
          <p style={{fontSize:15,fontFamily:"'DM Sans',sans-serif",fontWeight:300,color:"rgba(44,24,16,.5)",maxWidth:380,margin:"0 auto 28px",lineHeight:1.75}}>Take the scent quiz to discover your perfect matches, or flip any card and save dupes you love.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={onGoQuiz} style={{padding:"13px 28px",borderRadius:50,background:"#C17F3A",border:"none",color:"white",fontFamily:"'DM Sans',sans-serif",fontSize:14,cursor:"pointer",letterSpacing:.5,boxShadow:"0 6px 20px rgba(193,127,58,.35)"}}>✦ Take the Quiz</button>
            <button onClick={onBack} className="wd-back-btn" style={{padding:"13px 28px"}}>Browse Fragrances</button>
          </div>
        </div>
      ):(
        <>
          <div style={{borderRadius:20,overflow:"hidden",marginBottom:28,background:"linear-gradient(135deg,#2C1810 0%,#5a3010 50%,#8b5a1a 100%)",padding:"28px 32px",position:"relative"}} role="region" aria-label="Savings summary">
            <div style={{position:"absolute",right:-40,top:-40,width:180,height:180,borderRadius:"50%",background:"rgba(255,255,255,.06)"}} aria-hidden="true"/>
            <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:20}}>
              <div>
                <div style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:2,textTransform:"uppercase",color:"#d4af37",marginBottom:6}}>Your Smart Savings</div>
                <div style={{fontSize:"2.4rem",fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#d4af37",lineHeight:1,marginBottom:6}} aria-label={`$${saved} saved`}>${saved} saved</div>
                <div style={{fontSize:14,fontFamily:"'DM Sans',sans-serif",fontWeight:300,color:"rgba(212,175,55,.7)"}}>vs. buying originals at retail</div>
              </div>
              <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
                {[{l:"Original Value",v:`$${totalRetail}`,strike:true},{l:"You Paid",v:`$${totalDupe.toFixed(0)}`,strike:false}].map(({l,v,strike})=>(
                  <div key={l} style={{textAlign:"center"}}>
                    <div style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:1,textTransform:"uppercase",color:"rgba(212,175,55,.6)",marginBottom:4}}>{l}</div>
                    <div style={{fontSize:22,fontFamily:"'Playfair Display',serif",fontWeight:600,color:!strike?"#d4af37":"rgba(255,255,255,.45)",textDecoration:strike?"line-through":"none"}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="wd-grid">
            {items.map(p=>{
              const itemSaved=(p.retail-parsePx(p.dupe.price)).toFixed(0);
              return(
                <article key={p.id} className="wd-item" aria-label={`${p.name} by ${p.designer}`}>
                  <div style={{width:110,background:p.gradient,flexShrink:0,position:"relative",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:14}} aria-hidden="true">
                    <div style={{position:"absolute",right:-12,top:-12,width:50,height:50,borderRadius:"50%",background:"rgba(255,255,255,.08)"}}/>
                    <div style={{fontSize:10,fontFamily:"'DM Sans',sans-serif",letterSpacing:1.8,textTransform:"uppercase",color:p.accent,marginBottom:4,opacity:.9}}>{p.designer}</div>
                    <div style={{fontSize:14,fontFamily:"'Playfair Display',serif",fontWeight:600,color:p.textCol,lineHeight:1.2}}>{p.name}</div>
                  </div>
                  <div style={{flex:1,padding:"18px 18px 18px 20px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                    <div>
                      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:8}}>
                        <div>
                          <div style={{fontSize:10,fontFamily:"'DM Sans',sans-serif",letterSpacing:1.5,textTransform:"uppercase",color:"#C17F3A",marginBottom:4}}>Dupe</div>
                          <div style={{fontSize:15,fontFamily:"'Playfair Display',serif",fontWeight:600,color:"#2C1810",lineHeight:1.2}}>{p.dupe.name}</div>
                          <div style={{fontSize:12,fontFamily:"'DM Sans',sans-serif",color:"rgba(44,24,16,.5)",marginTop:2}}>{p.dupe.brand}</div>
                        </div>
                        <div style={{padding:"4px 10px",borderRadius:50,background:"rgba(193,127,58,.1)",border:"0.5px solid rgba(193,127,58,.25)"}}>
                          <div style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",color:"#8b5a1a",fontWeight:500}}>{p.dupe.match}%</div>
                        </div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginTop:10,flexWrap:"wrap"}}>
                        <div style={{fontSize:18,fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#2C1810"}}>{p.dupe.price}</div>
                        <div style={{fontSize:13,fontFamily:"'DM Sans',sans-serif",color:"rgba(44,24,16,.35)",textDecoration:"line-through"}}>${p.retail}</div>
                        <div style={{padding:"2px 10px",borderRadius:50,background:"linear-gradient(135deg,#C17F3A,#d4af37)",color:"white",fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>-${itemSaved}</div>
                      </div>
                    </div>
                    <div style={{marginTop:12}}>
                      <button className="wd-rm-btn" onClick={()=>onRemove(p.id)} aria-label={`Remove ${p.name} from wardrobe`}>Remove</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}

// ─────────────── Compare Panel ────────────────────────────────
function ComparePanel({ids,onClear}){
  const open=ids.length===2;
  if(ids.length===0)return null;
  const perfs=ids.map(id=>PERFUMES.find(p=>p.id===id)).filter(Boolean);
  const [pA,pB]=perfs.length===2?perfs:[perfs[0],null];
  const allA=pA?[...pA.notes.top,...pA.notes.mid,...pA.notes.base]:[];
  const allB=pB?[...pB.notes.top,...pB.notes.mid,...pB.notes.base]:[];
  const shared=allA.filter(n=>allB.includes(n));
  const savA=pA?(pA.retail-parsePx(pA.dupe.price)).toFixed(0):"—";
  const savB=pB?(pB.retail-parsePx(pB.dupe.price)).toFixed(0):"—";
  const betterVal=pB&&parseFloat(savB)>parseFloat(savA)?"B":"A";
  const rows=[{label:"Mood",a:pA?.mood,b:pB?.mood},{label:"Badge",a:pA?.badge,b:pB?.badge},{label:"Retail",a:pA?`$${pA.retail}`:"-",b:pB?`$${pB.retail}`:"-"},{label:"Dupe Price",a:pA?.dupe.price,b:pB?.dupe.price},{label:"You Save",a:`$${savA}`,b:`$${savB}`},{label:"Match",a:pA?`${pA.dupe.match}%`:"-",b:pB?`${pB.dupe.match}%`:"-"}];
  return(
    <>
      {open&&<div className="cmp-overlay" onClick={onClear} aria-hidden="true"/>}
      <div className={`cmp-panel${open?" cmp-open":""}`} role="dialog" aria-modal="true" aria-label="Fragrance comparison">
        <div style={{display:"flex",justifyContent:"center",padding:"12px 0 0"}} aria-hidden="true">
          <div style={{width:40,height:4,borderRadius:2,background:"rgba(193,127,58,.25)"}}/>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 24px 16px"}}>
          <div>
            <div style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:2,textTransform:"uppercase",color:"#C17F3A",marginBottom:2}}>Side by Side</div>
            <div style={{fontSize:18,fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#2C1810"}}>Compare</div>
          </div>
          <button onClick={onClear} aria-label="Clear comparison" style={{padding:"8px 20px",borderRadius:50,border:"1.5px solid rgba(193,127,58,.35)",background:"transparent",color:"#8b5a1a",fontFamily:"'DM Sans',sans-serif",fontSize:12,cursor:"pointer",letterSpacing:.4,transition:"all .2s"}}>Clear ×</button>
        </div>
        <div style={{padding:"0 24px 28px"}}>
          <div style={{display:"grid",gridTemplateColumns:"100px 1fr 1fr",gap:0,marginBottom:16}}>
            <div/>
            {[pA,pB].map((p,i)=>p&&(
              <div key={i} style={{borderRadius:16,overflow:"hidden",margin:"0 6px",boxShadow:"0 6px 24px rgba(44,24,16,.14)"}}>
                <div style={{height:90,background:p.gradient,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"12px 14px",position:"relative"}}>
                  <div style={{position:"absolute",right:-12,top:-12,width:50,height:50,borderRadius:"50%",background:"rgba(255,255,255,.07)"}} aria-hidden="true"/>
                  {((i===0&&betterVal==="A")||(i===1&&betterVal==="B"))&&(
                    <div style={{position:"absolute",top:8,right:8,padding:"2px 8px",borderRadius:50,background:"rgba(212,175,55,.3)",border:"0.5px solid rgba(212,175,55,.5)"}}>
                      <span style={{fontSize:9,fontFamily:"'DM Sans',sans-serif",color:"#fff0a0",letterSpacing:.5}}>✦ Best Value</span>
                    </div>
                  )}
                  <div style={{fontSize:9,fontFamily:"'DM Sans',sans-serif",letterSpacing:1.5,textTransform:"uppercase",color:p.accent,marginBottom:2}}>{p.designer}</div>
                  <div style={{fontSize:13,fontFamily:"'Playfair Display',serif",fontWeight:600,color:p.textCol,lineHeight:1.2}}>{p.name}</div>
                </div>
                <div style={{padding:"8px 14px 10px",background:"white"}}>
                  <div style={{fontSize:10,fontFamily:"'DM Sans',sans-serif",color:"rgba(44,24,16,.5)",marginBottom:2}}>{p.dupe.brand}</div>
                  <div style={{fontSize:12,fontFamily:"'Playfair Display',serif",fontWeight:600,color:"#2C1810"}}>{p.dupe.name}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{borderRadius:14,overflow:"hidden",border:"0.5px solid rgba(193,127,58,.15)",marginBottom:20}}>
            {rows.map((row,i)=>(
              <div key={row.label} className="cmp-row" style={{background:i%2===0?"white":"rgba(193,127,58,.03)"}}>
                <div style={{padding:"10px 14px",fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:.5,textTransform:"uppercase",color:"rgba(44,24,16,.45)",fontWeight:500}}>{row.label}</div>
                {[row.a,row.b].map((val,j)=>(
                  <div key={j} style={{padding:"10px 14px",textAlign:"center",fontSize:13,fontFamily:["Retail","Dupe Price","You Save"].includes(row.label)?"'Playfair Display',serif":"'DM Sans',sans-serif",fontWeight:row.label==="You Save"?700:400,color:row.label==="You Save"?"#C17F3A":"#2C1810"}}>{val||"—"}</div>
                ))}
              </div>
            ))}
          </div>
          {shared.length>0&&(
            <div style={{padding:"16px",background:"rgba(193,127,58,.06)",borderRadius:14,border:"0.5px solid rgba(193,127,58,.18)"}} aria-label={`Notes in common: ${shared.join(", ")}`}>
              <div style={{fontSize:10,fontFamily:"'DM Sans',sans-serif",letterSpacing:2,textTransform:"uppercase",color:"#C17F3A",marginBottom:10}}>✦ Notes in Common</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {shared.map(n=><span key={n} style={{padding:"3px 12px",borderRadius:50,background:"#C17F3A",color:"white",fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>{n}</span>)}
              </div>
            </div>
          )}
          {!open&&perfs.length===1&&(
            <div style={{textAlign:"center",padding:"16px",background:"rgba(193,127,58,.06)",borderRadius:14,border:"1px dashed rgba(193,127,58,.3)"}}>
              <div style={{fontSize:13,fontFamily:"'DM Sans',sans-serif",color:"rgba(44,24,16,.5)",lineHeight:1.6}}>Pick one more fragrance to compare with <em style={{fontFamily:"'Playfair Display',serif",color:"#2C1810"}}>{pA?.name}</em></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─────────────── Toast ────────────────────────────────────────
function Toast({message}){
  if(!message)return null;
  return <div className="melo-toast" role="status" aria-live="polite">{message}</div>;
}

// ─────────────── MAIN APP ─────────────────────────────────────
export default function Meloscent(){
  const [page,setPage]=useState("discovery");
  const [query,setQuery]=useState("");
  const [activeFilter,setActiveFilter]=useState("");
  const [noteFilter,setNoteFilter]=useState("");
  const [compareIds,setCompareIds]=useState([]);
  const [showQuiz,setShowQuiz]=useState(false);
  const [showProfile,setShowProfile]=useState(false);
  const [toast,setToast]=useState(null);
  const [stats,setStats]=useState({fIds:rLS("melo_fids",[]),wIds:rLS("melo_wids",[]),streak:1});

  // FIX: document title + favicon
  useEffect(()=>{
    document.title=page==="wardrobe"?"My Wardrobe — Meloscent":"Meloscent · Fragrance Discovery Platform";
    let meta=document.querySelector('meta[name="description"]');
    if(!meta){meta=document.createElement("meta");meta.name="description";document.head.appendChild(meta);}
    meta.content="Discover affordable dupes for luxury fragrances. Take our scent quiz, flip cards to reveal perfect matches, and build your wardrobe.";
    let fav=document.querySelector("link[rel~='icon']")||document.createElement("link");
    fav.rel="icon";fav.type="image/svg+xml";
    fav.href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%232C1810'/><text y='74' x='50' text-anchor='middle' font-size='58' fill='%23C17F3A'>✦</text></svg>";
    document.head.appendChild(fav);
  },[page]);

  // FIX 4: scroll lock when any modal open
  useEffect(()=>{
    document.body.style.overflow=(showQuiz||showProfile)?"hidden":"";
    return()=>{document.body.style.overflow="";};
  },[showQuiz,showProfile]);

  // Streak
  useEffect(()=>{
    const today=new Date().toDateString(),yest=new Date(Date.now()-86400000).toDateString();
    const s=rLS("melo_streak",{lv:"",n:0});
    let n=1;if(s.lv===today)n=s.n;else if(s.lv===yest)n=s.n+1;
    wLS("melo_streak",{lv:today,n});setStats(st=>({...st,streak:n}));
  },[]);

  // FIX 8: toast helper
  const showToast=(msg)=>{setToast(msg);setTimeout(()=>setToast(null),2400);};

  // FIX 7: navigateTo scrolls to top
  const navigateTo=(pg)=>{setPage(pg);window.scrollTo({top:0,behavior:"smooth"});};
  const scrollToBlog=()=>{const el=document.getElementById("melo-blog");if(el)el.scrollIntoView({behavior:"smooth"});};
  const filterNiche=()=>{setActiveFilter("Niche");setQuery("");setNoteFilter("");};

  const flip=id=>setStats(s=>{
    if(s.fIds.includes(id))return s;
    const nf=[...s.fIds,id];wLS("melo_fids",nf);return{...s,fIds:nf};
  });

  const wardrobeToggle=id=>setStats(s=>{
    const has=s.wIds.includes(id);
    const nw=has?s.wIds.filter(i=>i!==id):[...s.wIds,id];
    wLS("melo_wids",nw);
    showToast(has?"Removed from wardrobe":"✦ Saved to your wardrobe");
    return{...s,wIds:nw};
  });

  const compare=id=>setCompareIds(ids=>ids.includes(id)?ids.filter(i=>i!==id):ids.length<2?[...ids,id]:ids);
  const handleNoteClick=note=>setNoteFilter(f=>f===note?"":note);
  const handleSearch=v=>{setQuery(v);setActiveFilter("");};
  const handleFilter=t=>{setActiveFilter(a=>a===t?"":t);setQuery("");};
  const clearAll=()=>{setQuery("");setActiveFilter("");setNoteFilter("");};

  const eq=activeFilter||query;
  const filtered=PERFUMES.filter(p=>{
    const q=eq.toLowerCase();
    const mS=!q||p.designer.toLowerCase().includes(q)||p.name.toLowerCase().includes(q)||p.mood.toLowerCase().includes(q)||p.badge.toLowerCase().includes(q)||[...p.notes.top,...p.notes.mid,...p.notes.base].some(n=>n.toLowerCase().includes(q))||p.dupe.brand.toLowerCase().includes(q)||p.dupe.name.toLowerCase().includes(q);
    const mN=!noteFilter||[...p.notes.top,...p.notes.mid,...p.notes.base].includes(noteFilter);
    return mS&&mN;
  });

  const earnedCount=BADGES.filter(b=>b.earned(stats)).length;
  const sharedNavProps={page,stats,earnedCount,onNavigate:navigateTo,onOpenProfile:()=>setShowProfile(true),onScrollToBlog:scrollToBlog,onFilterNiche:filterNiche};

  if(page==="wardrobe") return(
    <div style={{background:"#FAF3E8",minHeight:"100vh",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{GLOBAL_CSS}</style>
      <NavBar {...sharedNavProps}/>
      <WardrobePage wIds={stats.wIds} onBack={()=>navigateTo("discovery")}
        onRemove={wardrobeToggle} onGoQuiz={()=>{navigateTo("discovery");setShowQuiz(true);}}/>
      {showQuiz&&<QuizModal onClose={()=>setShowQuiz(false)} onAddToWardrobe={wardrobeToggle}/>}
      <ProfileDrawer stats={stats} open={showProfile} onClose={()=>setShowProfile(false)} onGoWardrobe={()=>{setShowProfile(false);navigateTo("wardrobe");}}/>
      <Toast message={toast}/>
    </div>
  );

  return(
    <div style={{background:"#FAF3E8",minHeight:"100vh",fontFamily:"'DM Sans',sans-serif",paddingBottom:compareIds.length>0?200:0,transition:"padding-bottom .4s"}}>
      <style>{GLOBAL_CSS}</style>
      <NavBar {...sharedNavProps}/>
      <ScentOfTheDay onOpenQuiz={()=>setShowQuiz(true)}/>

      <section style={{textAlign:"center",padding:"56px 28px 32px",maxWidth:1400,margin:"0 auto"}}>
        <div style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:400,letterSpacing:4,textTransform:"uppercase",color:"#C17F3A",marginBottom:14}}>✦ Fragrance Discovery Platform ✦</div>
        <h1 className="melo-hero-h1">Wear the Story.<br/><em style={{fontWeight:400,color:"#C17F3A",fontStyle:"italic"}}>Not the Price Tag.</em></h1>
        <p style={{fontSize:16,fontFamily:"'DM Sans',sans-serif",fontWeight:300,color:"rgba(44,24,16,.55)",maxWidth:500,margin:"0 auto 36px",lineHeight:1.75}}>Discover affordable dupes for the world's most coveted fragrances. Flip each card to reveal your perfect match.</p>
        <div style={{marginBottom:32}}>
          <button className="hero-quiz-btn" onClick={()=>setShowQuiz(true)} aria-label="Take the scent profile quiz"><span aria-hidden="true">✦</span> Find Your Scent Profile</button>
        </div>
        <div style={{position:"relative",maxWidth:580,margin:"0 auto 18px"}}>
          <svg style={{position:"absolute",left:20,top:"50%",transform:"translateY(-50%)",opacity:.35}} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2C1810" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input className="melo-search" type="search" placeholder="Search by designer, mood, notes, or keyword..." value={query} onChange={e=>handleSearch(e.target.value)} aria-label="Search fragrances"/>
          {(query||activeFilter||noteFilter)&&<button onClick={clearAll} aria-label="Clear all filters" style={{position:"absolute",right:18,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:20,color:"rgba(44,24,16,.35)",lineHeight:1,padding:"4px 8px"}}>×</button>}
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}} role="group" aria-label="Filter by mood">
          {MOOD_FILTERS.map(t=>(
            <button key={t} className={`filter-pill${activeFilter===t?" active":""}`} onClick={()=>handleFilter(t)} aria-pressed={activeFilter===t}>{t}</button>
          ))}
        </div>
      </section>

      {noteFilter&&(
        <div style={{maxWidth:1400,margin:"0 auto 8px",padding:"0 28px"}}>
          <div className="note-filter-bar" role="status" aria-live="polite">
            <span style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:1,color:"#8b5a1a"}}>◉ Note filter:</span>
            <span style={{fontSize:13,fontFamily:"'Playfair Display',serif",fontWeight:600,color:"#2C1810",fontStyle:"italic"}}>{noteFilter}</span>
            <span style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",color:"rgba(44,24,16,.4)"}}>— {filtered.length} match{filtered.length!==1?"es":""}</span>
            <button onClick={()=>setNoteFilter("")} aria-label={`Remove note filter: ${noteFilter}`} style={{background:"none",border:"none",cursor:"pointer",fontSize:16,color:"rgba(44,24,16,.4)",lineHeight:1,padding:"0 2px",marginLeft:2}}>×</button>
          </div>
        </div>
      )}

      <div style={{maxWidth:1400,margin:"0 auto 26px",padding:"0 28px"}} aria-hidden="true">
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{flex:1,height:".5px",background:"linear-gradient(90deg,transparent,rgba(193,127,58,.35))"}}/>
          <span style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:2,color:"#C17F3A",textTransform:"uppercase",whiteSpace:"nowrap"}}>{filtered.length} Fragrance{filtered.length!==1?"s":""}</span>
          <div style={{flex:1,height:".5px",background:"linear-gradient(90deg,rgba(193,127,58,.35),transparent)"}}/>
        </div>
      </div>

      {compareIds.length===1&&(
        <div style={{maxWidth:1400,margin:"0 auto 14px",padding:"0 28px"}} role="status" aria-live="polite">
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 18px",borderRadius:50,background:"rgba(193,127,58,.08)",border:"1px solid rgba(193,127,58,.2)"}}>
            <span style={{fontSize:12,fontFamily:"'DM Sans',sans-serif",color:"#8b5a1a"}}>+ Pick one more card to compare</span>
          </div>
        </div>
      )}

      <section style={{maxWidth:1400,margin:"0 auto",padding:"0 24px"}} aria-label="Fragrance collection">
        {filtered.length===0?(
          <div style={{textAlign:"center",padding:"80px 20px"}}>
            <div style={{fontSize:48,marginBottom:16,opacity:.28}} aria-hidden="true">◎</div>
            <h2 style={{fontSize:24,fontFamily:"'Playfair Display',serif",color:"#2C1810",marginBottom:10}}>No Scents Found</h2>
            <p style={{fontSize:15,fontFamily:"'DM Sans',sans-serif",fontWeight:300,color:"rgba(44,24,16,.45)",maxWidth:360,margin:"0 auto 24px",lineHeight:1.7}}>Try a different mood, note, or designer.</p>
            <button onClick={clearAll} style={{padding:"11px 30px",borderRadius:50,background:"#C17F3A",border:"none",color:"white",fontFamily:"'DM Sans',sans-serif",fontSize:14,cursor:"pointer",letterSpacing:.5,boxShadow:"0 6px 20px rgba(193,127,58,.35)"}}>Clear Filters</button>
          </div>
        ):(
          <div className="melo-masonry">
            {filtered.map(p=>(
              <PerfumeCard key={p.id} p={p} onFlip={flip}
                onNoteClick={handleNoteClick} noteFilter={noteFilter}
                compareIds={compareIds} onCompare={compare}
                wardrobeIds={stats.wIds} onWardrobeToggle={wardrobeToggle}/>
            ))}
          </div>
        )}
      </section>

      <section id="melo-blog" style={{maxWidth:1400,margin:"72px auto 0",padding:"0 24px 88px"}} aria-label="Blog">
        <div style={{textAlign:"center",marginBottom:44}}>
          <div style={{fontSize:11,fontFamily:"'DM Sans',sans-serif",letterSpacing:4,textTransform:"uppercase",color:"#C17F3A",marginBottom:14}}>✦ The Journal ✦</div>
          <h2 style={{fontSize:"2.3rem",fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#2C1810",marginBottom:14,letterSpacing:"-.2px"}}>Fragrance Stories</h2>
          <p style={{fontSize:15,fontFamily:"'DM Sans',sans-serif",fontWeight:300,color:"rgba(44,24,16,.52)",maxWidth:460,margin:"0 auto",lineHeight:1.75}}>Deep dives into the world of scent — guides, reviews, and the stories behind the bottle.</p>
        </div>
        <div className="melo-blog-grid">{BLOGS.map(b=><BlogCard key={b.id} b={b}/>)}</div>
      </section>

      <footer style={{borderTop:"0.5px solid rgba(193,127,58,.2)",padding:"28px 32px",maxWidth:1400,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:14,color:"#C17F3A"}} aria-hidden="true">✦</span>
          <span style={{fontFamily:"'Playfair Display',serif",fontSize:19,color:"#C17F3A",fontWeight:600}}>Meloscent</span>
        </div>
        <span style={{fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:300,color:"rgba(44,24,16,.38)"}}>© 2025 Meloscent · Fragrance Discovery</span>
        <nav aria-label="Social links" style={{display:"flex",gap:20}}>
          {["Instagram","Pinterest","TikTok"].map(s=>(
            <a key={s} href="#" onClick={e=>e.preventDefault()} className="nav-link" style={{fontSize:13}} rel="noopener">{s}</a>
          ))}
        </nav>
      </footer>

      {showQuiz&&<QuizModal onClose={()=>setShowQuiz(false)} onAddToWardrobe={wardrobeToggle}/>}
      <ProfileDrawer stats={stats} open={showProfile} onClose={()=>setShowProfile(false)} onGoWardrobe={()=>{setShowProfile(false);navigateTo("wardrobe");}}/>
      <ComparePanel ids={compareIds} onClear={()=>setCompareIds([])}/>
      <Toast message={toast}/>
    </div>
  );
}
