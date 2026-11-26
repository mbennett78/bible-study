// The study buddy: a small stick figure with a talk bubble who opens the Bible helper chat.
// He sits quietly at the side of the screen until someone taps him; then he stands up,
// waves and opens the chat. Now and then (the app decides when) he walks in a few steps to
// say hi, check on them, or ask if they're wondering anything. They can answer him: "Not
// now" gets a cheerful "Okie!", and "Yes" gets an excited "Oh yeah, I can find something!"
// before the chat opens. He looks caring when someone asks about something sad. He can be
// dragged anywhere along either edge, and remembers where he was put. He never covers the
// bottom buttons, and he stays still for anyone who has asked their device for less motion.

import { ctNow, special, dayMood, moodBlock } from "./buddydays.js";

export const BUDDY_SVG = `<svg class="buddy-svg" viewBox="0 0 72 84" aria-hidden="true">
  <g class="buddy-bubble">
    <path class="ti-front" d="M47 2h19a6 6 0 0 1 6 6v11a6 6 0 0 1-6 6h-9l-6 5v-5h-4a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z"/>
    <circle class="ti-dot d1" cx="49" cy="13.5" r="2"/><circle class="ti-dot d2" cx="56.5" cy="13.5" r="2"/><circle class="ti-dot d3" cx="64" cy="13.5" r="2"/>
  </g>
  <g class="buddy-sky"><path class="buddy-moon" d="M15 6.5a7 7 0 1 0 6.4 10.4a5.6 5.6 0 1 1-6.4-10.4z"/><path class="buddy-star s1" d="M34 7l.9 2.1 2.2.2-1.7 1.4.6 2.2-2-1.2-2 1.2.6-2.2-1.7-1.4 2.2-.2z"/><path class="buddy-star s2" d="M52 16l.7 1.6 1.7.2-1.3 1.1.4 1.7-1.5-.9-1.5.9.4-1.7-1.3-1.1 1.7-.2z"/><path class="buddy-star s3" d="M64 6l.7 1.6 1.7.2-1.3 1.1.4 1.7-1.5-.9-1.5.9.4-1.7-1.3-1.1 1.7-.2z"/><path class="buddy-star s4" d="M8 33l.6 1.3 1.4.1-1.1.9.4 1.4-1.3-.8-1.3.8.4-1.4-1.1-.9 1.4-.1z"/><path class="buddy-star s5" d="M42 32l.6 1.3 1.4.1-1.1.9.4 1.4-1.3-.8-1.3.8.4-1.4-1.1-.9 1.4-.1z"/></g>
  <g class="buddy-bucket"><g class="buddy-bucket-fish"><path d="M5.8 61.4q2.6-3.6 5.4-.4q-2.6 3.4-5.4.4z"/><path d="M5.9 61.5l-2.4-1.8v3.6z"/></g><path class="bucket-body" d="M3 63.4h12l-1.4 9.4h-9.2z"/><path class="bucket-handle" d="M3.6 63.6q5.4-6.4 10.8 0"/><path class="bucket-band" d="M3.5 66.4h11"/></g>
  <ellipse class="buddy-pond" cx="61" cy="73" rx="11.5" ry="3.2"/>
  <g class="buddy-fw"><g class="fw fw1"><path d="M54 12v-6M54 12v6M54 12h-6M54 12h6M54 12l-4.2-4.2M54 12l4.2 4.2M54 12l-4.2 4.2M54 12l4.2-4.2"/></g><g class="fw fw2"><path d="M14 16v-5M14 16v5M14 16h-5M14 16h5M14 16l-3.5-3.5M14 16l3.5 3.5M14 16l-3.5 3.5M14 16l3.5-3.5"/></g><g class="fw fw3"><path d="M64 30v-4M64 30v4M64 30h-4M64 30h4M64 30l-2.8-2.8M64 30l2.8 2.8M64 30l-2.8 2.8M64 30l2.8-2.8"/></g></g>
  <g class="buddy-confetti"><rect class="c1" x="6" y="-4" width="2.4" height="1.4"/><rect class="c2" x="14" y="-8" width="2.4" height="1.4"/><rect class="c3" x="22" y="-3" width="2.4" height="1.4"/><rect class="c4" x="31" y="-9" width="2.4" height="1.4"/><rect class="c5" x="39" y="-5" width="2.4" height="1.4"/><rect class="c6" x="47" y="-10" width="2.4" height="1.4"/><rect class="c7" x="55" y="-4" width="2.4" height="1.4"/><rect class="c8" x="63" y="-7" width="2.4" height="1.4"/><rect class="c9" x="10" y="-12" width="2.4" height="1.4"/><rect class="c10" x="58" y="-13" width="2.4" height="1.4"/></g>
  <g class="buddy-gift"><g class="buddy-gift-item"><g class="gi-socks"><path class="sock-a" d="M42 52v6.5q0 2 2 2h3.4v-2.4h-2.4v-6.1z"/><path class="sock-b" d="M47.6 51.4v6.5q0 2 2 2h3.4v-2.4h-2.4v-6.1z"/><path class="sock-stripe" d="M42 53.6h3M47.6 53h3"/></g><g class="gi-teddy"><circle cx="44.2" cy="48.8" r="1.4"/><circle cx="49.8" cy="48.8" r="1.4"/><circle cx="47" cy="51" r="3"/><ellipse cx="47" cy="57.4" rx="3.6" ry="4"/><circle class="ted-face" cx="47" cy="52" r="1.1"/></g><g class="gi-flashlight"><path class="fl-beam" d="M50 51l9-5v10z"/><rect x="40" y="52" width="10" height="3.6" rx="1"/><rect class="fl-head" x="48.6" y="51" width="2.2" height="5.6" rx=".6"/></g><g class="gi-lure"><path d="M41 54q6-5 12 0q-6 5-12 0z"/><path d="M53 54l2.6-2v4z"/><circle class="lure-eye" cx="43.4" cy="53.6" r=".7"/><path class="lure-hook" d="M47 58.4v2.2q0 1.2 1.2 1.2"/></g></g><rect class="buddy-gift-box" x="40" y="63" width="14" height="10" rx="1"/><path class="buddy-gift-ribbon" d="M47 63v10"/><g class="buddy-gift-lid"><rect x="39" y="60.4" width="16" height="3.2" rx="1"/><path class="buddy-gift-ribbon" d="M47 60.4v3.2"/><path class="buddy-gift-bow" d="M47 60.4q-4-4-4.6-.6q.6 1.4 4.6.6q4 .8 4.6-.6q-.6-3.4-4.6.6z"/></g></g>
  <g class="buddy-cake"><path class="cake-plate" d="M37 73h20"/><rect class="cake-body" x="39" y="64" width="16" height="9" rx="1.4"/><path class="cake-icing" d="M39 66.6q2 2 4 0q2 2 4 0q2 2 4 0q2 2 4 0"/><path class="cake-candle" d="M47 64v-6"/><path class="buddy-flame" d="M47 57.4q-1.8-2.2 0-4.6q1.8 2.4 0 4.6z"/><path class="buddy-smoke" d="M47 57q-1.4-2 0-3.6t0-3.6"/></g>
  <g class="buddy-pillow"><path d="M55 84.6q-1-5.4 3.4-6.2q9-1.2 18 0q4.4.8 3.4 6.2q-12.4 1.2-24.8 0z"/><path class="buddy-pillow-crease" d="M60 81.6q7.4-.8 14.8 0"/></g>
  <g class="buddy-body">
    <g class="buddy-packpole"><path d="M19 46L6.5 7"/><path class="buddy-fishline" d="M6.5 7q-2 3-1.2 7"/><circle class="buddy-bobber" cx="5.3" cy="15" r="1.6"/></g>
    <g class="buddy-pack"><rect x="13.5" y="33" width="9.5" height="14" rx="3.2"/><path d="M15.5 38h5.5"/></g>
    <g class="buddy-table"><path class="buddy-table-top" d="M37 59h26"/><path class="buddy-table-leg" d="M41 59v14M59 59v14"/><ellipse class="buddy-plate" cx="46" cy="57.6" rx="5.4" ry="1.4"/><ellipse class="buddy-bread" cx="45.5" cy="55.9" rx="3.6" ry="2"/><circle class="buddy-apple" cx="53.5" cy="56" r="2.3"/><path class="buddy-cup" d="M57 51.5h4l-.6 6h-2.8z"/></g>
    <g class="buddy-trash"><path d="M50 48h10l-1.5 11h-7z"/><path d="M49 48h12"/></g>
    <g class="buddy-crumple"><circle cx="44" cy="58" r="2.3"/><circle cx="49" cy="59" r="1.9"/><circle cx="40" cy="59.3" r="1.6"/></g>
    <g class="buddy-chair"><path d="M15.5 34v34M14 55.5h17M29.5 55.5v12.5"/></g>
    <circle class="buddy-head" cx="26" cy="22" r="10"/>
    <circle class="buddy-eye" cx="22.5" cy="20.5" r="1.6"/><circle class="buddy-eye" cx="29.5" cy="20.5" r="1.6"/>
    <path class="buddy-shut" d="M20.8 21q1.7 1.2 3.4 0M27.8 21q1.7 1.2 3.4 0"/>
    <path class="buddy-smile" d="M21.5 25.5q4.5 4 9 0"/>
    <path class="buddy-soft" d="M23 26.1q3 2 6 0"/><path class="buddy-flat" d="M23.4 26.8q2.6.4 5.2 0"/><path class="buddy-focus" d="M20.4 17.3l3.5.35M31.6 17.3l-3.5.35"/>
    <path class="buddy-grin" d="M22.2 25h7.6q-.4 4.2-3.8 4.2t-3.8-4.2z"/><path class="buddy-up" d="M20.2 16.6q1.8-1.7 3.9-.7M27.9 15.9q2.1-1 3.9.7"/><g class="buddy-santa"><path class="santa-red" d="M16 16.6Q17 9 26 9.4q6 .4 10.6 5.6l-1.8 1.6z"/><path class="santa-trim" d="M15.6 17.2q10.4-3.4 20.8-1"/><circle class="santa-ball" cx="37" cy="16.2" r="2"/></g><g class="buddy-fishhat"><path class="fh-crown" d="M18.6 14.6Q19.4 8.6 26 8.6q6.6 0 7.4 6z"/><path class="fh-brim" d="M14.8 15.4q11.2-3 22.4 0"/><path class="fh-band" d="M18.8 13.4q7.2-1.4 14.4 0"/></g><g class="buddy-partyhat"><path class="ph-cone" d="M19.6 14.2L26 .8l6.4 13.4q-6.4 1.6-12.8 0z"/><path class="ph-stripe" d="M22 9.4q4 1 8 0M23.8 5.6q2.2.7 4.4 0"/><circle class="ph-pom" cx="26" cy=".8" r="1.8"/></g>
    <ellipse class="buddy-mouth" cx="26" cy="26.6" rx="2.8" ry="1.9"/>
    <path class="buddy-frown" d="M23 27.2q3-1.3 6 0"/>
    <path class="buddy-brow" d="M20.3 17.2l3.2-.8M31.7 17.2l-3.2-.8"/>
    <path class="buddy-mad" d="M20.2 16.3l3.6 1.7M31.8 16.3l-3.6 1.7"/>
    <path class="buddy-tear" d="M22.3 23.2q-1.3 2.1 0 3.1q1.3-1 0-3.1z"/>
    <g class="buddy-glasses"><circle cx="22.5" cy="20.6" r="3.1"/><circle cx="29.5" cy="20.6" r="3.1"/><path d="M25.6 20.4h.8M19.4 20.1l-2.6-1.1M32.6 20.1l2.6-1.1"/></g>
    <g class="buddy-cap"><path d="M16.3 19.5Q16.6 11.2 26 11.2Q35.4 11.2 35.7 19.5Z"/><path d="M34 18.6l8.5.9q-1.6 2.3-8 1.9z"/></g>
    <path class="buddy-line" d="M26 32v22"/>
    <g class="buddy-arm-l"><path class="buddy-line" d="M26 38l-10 9"/></g>
    <g class="buddy-arm-r"><path class="buddy-line" d="M26 38l10 9"/><g class="buddy-flower"><path class="buddy-stem" d="M36 47.5L43.5 36"/><path class="buddy-leaf" d="M39.6 42q3.4-.4 4.2 1.8q-3 .9-4.2-1.8z"/><circle cx="44" cy="32.6" r="2.3"/><circle cx="47.2" cy="35" r="2.3"/><circle cx="46" cy="38.6" r="2.3"/><circle cx="42" cy="38.4" r="2.3"/><circle cx="40.8" cy="34.8" r="2.3"/><circle class="buddy-flower-mid" cx="43.9" cy="35.9" r="1.9"/></g></g>
    <g class="buddy-legs-stand"><path class="buddy-line" d="M26 54l-8 18M26 54l8 18"/></g>
    <g class="buddy-readhold"><path class="buddy-line" d="M26 38L15.5 48.6L18.2 51.6M26 38L36.5 48.6L33.8 51.6"/></g>
    <g class="buddy-book"><path class="buddy-book-page" d="M17 44.5l9 2.2l9-2.2v9l-9 2.2l-9-2.2z"/><path class="buddy-book-spine" d="M26 46.7v9"/></g>
    <path class="buddy-book-flip" d="M26 46.7l9-2.2v9l-9 2.2z"/><g class="buddy-thumbs"><circle cx="18.2" cy="50.4" r="1.9"/><circle cx="33.8" cy="50.4" r="1.9"/></g>
    <g class="buddy-paper"><path class="buddy-paper-sheet" d="M17.5 44.5h13v11h-13z"/><path class="buddy-paper-lines" d="M19.5 47.5h9M19.5 50h9M19.5 52.5h5"/><path class="buddy-pencil" d="M37 43.5l-7.5 8.5"/><path class="buddy-pencil-tip" d="M29.5 52l-.9 1.9 1.9-.9z"/></g>
    <path class="buddy-rope" d="M16 47Q26 88 36 47"/>
    <g class="buddy-mitt"><ellipse cx="37.5" cy="48" rx="3.6" ry="3.1"/><path d="M35.2 46.4l-1.8-2.2"/></g>
    <g class="buddy-baseball"><circle cx="37.5" cy="44.6" r="2.1"/><path d="M36.3 43.3q.8 1.3 0 2.6M38.7 43.3q-.8 1.3 0 2.6"/></g>
    <g class="buddy-football"><ellipse cx="37" cy="46" rx="3.6" ry="2.1" transform="rotate(-30 37 46)"/><path d="M35.6 46.6l2.8-1.4"/></g>
    <g class="buddy-bowl"><circle cx="37" cy="48.5" r="3.4"/><circle cx="36.2" cy="47.4" r=".55"/><circle cx="37.6" cy="47.2" r=".55"/><circle cx="37" cy="48.6" r=".55"/></g>
    <g class="buddy-pins">${[57, 62, 67].map((x, i) => `<g class="buddy-pin pin${i + 1}" style="transform-origin:${x}px 72px"><path d="M${x - 1.6} 72q-.6-4 .5-6.2q-1-1.6 0-3.2q.6-.9 1.1-.9q.5 0 1.1.9q1 1.6 0 3.2q1.1 2.2.5 6.2z"/><path class="buddy-pin-band" d="M${x - 1} 66.6h2"/></g>`).join("")}</g>
    <g class="buddy-carrypole"><path d="M33 51L54 22"/><path class="buddy-fishline" d="M54 22q1.6 4 .8 8"/><circle class="buddy-bobber" cx="54.8" cy="31" r="1.8"/></g>
    <g class="buddy-catch"><path class="buddy-catchline" d="M58 25.6V30.4"/><path class="buddy-hook buddy-catchhook" d="M58 30.4v3.6q0 2.2-2 2.2t-1.9-1.8M54.1 34.4l-.4-1.9 1.6.9"/><g class="buddy-fish"><path d="M58 30.2q3.9 4.8 0 11.1q-3.9-6.3 0-11.1z"/><path class="buddy-fish-tail" d="M58 40.5l-3.3 4.2h6.6z"/><circle class="buddy-fish-eye" cx="59" cy="33.4" r=".8"/><path class="buddy-fish-fin" d="M60 35.6l2.2 1.2-2.2 1"/></g></g>
    <g class="buddy-pole"><path class="buddy-rod" d="M36 47L58 19"/><path class="buddy-rod-bent" d="M36 47Q50 25 59.4 25.6"/><g class="buddy-reel"><circle cx="40.6" cy="41.4" r="2.3"/><path class="buddy-reel-handle" d="M40.6 41.4l2.4 1.6"/></g><path class="buddy-biteline" d="M59.4 25.6L61.2 60.6"/><g class="buddy-tackle"><path class="buddy-fishline" d="M58 19Q63 36 61 56.4"/><circle class="buddy-bobber" cx="61" cy="57.6" r="2.1"/><path class="buddy-hook buddy-linehook" d="M61 59.7v3.4q0 2.1-1.9 2.1t-1.8-1.7M57.3 63.5l-.4-1.8 1.5.8"/></g></g>
    <g class="buddy-castfly"><path class="buddy-castline" pathLength="100" d="M58 19Q72 -6 61 57.6"/><g class="buddy-flytackle"><circle class="buddy-bobber" cx="61" cy="57.6" r="2.1"/><path class="buddy-hook" d="M61 59.7v3.4q0 2.1-1.9 2.1t-1.8-1.7M57.3 63.5l-.4-1.8 1.5.8"/></g></g>
    <g class="buddy-splash"><ellipse cx="61" cy="59" rx="3" ry=".9"/><ellipse class="sp2" cx="61" cy="59" rx="5.5" ry="1.6"/><path class="sp-drops" d="M58.6 56.9l-1.4-2.6M61 56.3v-3M63.4 56.9l1.4-2.6"/></g>
    <g class="buddy-utensils"><path d="M36 47l2.5-6.5M37.4 40.2l.6-2.2M38.6 40.6l.6-2.2M39.8 41l.6-2.2"/><path d="M16 47l-2.2-6.3"/><ellipse cx="13.4" cy="39.6" rx="1.4" ry="2"/></g>
    <g class="buddy-balls"><circle class="bb1" cx="16" cy="40" r="2.4"/><circle class="bb2" cx="26" cy="36" r="2.4"/><circle class="bb3" cx="36" cy="40" r="2.4"/></g>
    <g class="buddy-bball"><circle cx="38" cy="58" r="3.6"/><path d="M34.4 58h7.2M38 54.4v7.2"/></g>
    <g class="buddy-legs-chair"><path class="buddy-line" d="M26 54h10.5v13.5h3"/></g>
    <g class="buddy-desk"><path d="M32 48h30M40 48v20M59 48v20"/></g>
    <g class="buddy-deskwork"><path class="buddy-desk-paper" d="M36 47.2h15.5l-2.4-3.4h-11z"/><path class="buddy-paper-lines" d="M39.5 45.1h8M38.5 46.3h7"/><path class="buddy-line" d="M26 38l5 7.6l6.5 1.4"/><g class="buddy-desk-hand"><path class="buddy-line" d="M26 38l7.5 6.6l7.5.4"/><path class="buddy-pencil" d="M41.4 44.6l5-6.4"/><path class="buddy-pencil-tip" d="M41.4 44.6l-.6 1.6 1.4-.9z"/></g></g>
    <g class="buddy-legs-knees"><path class="buddy-line" d="M26 54l-11 5l9.5 11M26 54l-9 7.5l9 8.5"/></g>
    <path class="buddy-tangle" d="M56 20q4 1 2 4t-3-1t4 3t-1 4q-3-2 1-3"/>
    <g class="buddy-legs-sit"><path class="buddy-line" d="M26 54l15 2l4 2M26 54l11-5l4 9"/></g>
  </g>
</svg>`;

const SPOT_KEY = "bible-study:buddy-spot2"; // 2: on iPad he starts in the side menu
// His little tricks while nobody needs him, and when he naps.
const TRICK_EVERY_MS = 25000;
const NAP_AFTER_MS = 150000;
const TRICKS = ["cartwheel", "stroll", "pondering", "yay", "reading", "pondering", "reading", "stroll", "yay", "reading", "cartwheel", "swing", "whistle", "lean", "swing", "lean"];
// Quiet things he does while he sits and waits: swinging his feet, whistling, leaning back.
const IDLES = { swing: 4200, whistle: 2800, lean: 4200 };
// Late at night he gets sleepy: he yawns now and then and naps much sooner.
const lateNow = () => { const h = new Date().getHours(); return h >= 22 || h < 5; };
const LATE_NAP_MS = 45000;
const SIT_AFTER_MS = 12000;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const pick = (list) => list[Math.floor(Math.random() * list.length)];
// What he says back, so it never sounds the same twice in a row.
const NO_LINES = ["Okie! 😊", "Sure thing! Just let me know.", "Okay! I'll be right over here.", "No problem! I'm here whenever you need me.", "Okie dokie! Happy reading."];
const PLAY_LINES = ["Yay! Let's play! 🎲", "Woohoo! Get ready to spin!", "Game on! I'll try my best!"];
const YES_LINES = ["Oh yeah! I can find something!", "Ooh, yay! What is it?", "Oh good, I love questions!", "Yes! Let's find out together!"];
let careTimer = 0, nerdTimer = 0;

// Things people can ask him to do ("jump rope!", "dance", "do a cartwheel"). Each is a real
// little animation; the chat answers with a line from `say`. The AI helper can ask for one
// too, with a tag like [[do:dance]] at the end of its answer.
export const BUDDY_ACTIONS = {
  jump: { ms: 1800, pop: "⬆️", say: ["Boing! Boing! 🦘", "Up I go! Whee!", "How high was that? 😄"] },
  jumprope: { ms: 3600, pop: "🪢", say: ["Jump rope time! One, two, three... 🪢", "Skip, skip, skip! I never trip. Well, almost never. 😄", "Watch my feet! 🪢"] },
  dance: { ms: 3200, pop: "🎵", say: ["Dance party! 🎶", "Check out my moves! 💃🕺", "Like David danced before the Lord! 🎵"] },
  wave: { ms: 1600, pop: "👋", say: ["Hi hi hi! 👋", "*waves both arms* Hello! 👋"] },
  cartwheel: { ms: 1700, pop: "🤸", say: ["Cartwheel! 🤸 Did you see that?", "Wheee! 🤸", "Ta-da! 🤸 Nailed it!"] },
  spin: { ms: 1500, pop: "🌀", say: ["Spinny spin! 🌀 Whoa, I'm dizzy.", "Round and round! 🌀"] },
  cheer: { ms: 2600, pop: "🎉", say: ["Yay! 🎉", "Hooray! Woohoo! 🎉", "Let's gooo! 🎉"] },
  laugh: { ms: 3200, pop: "🤣", say: ["Hahaha! I'm rolling on the floor! 🤣", "Hehe! You're so funny! 🤣"] },
  pray: { ms: 4000, pop: "🙏", say: ["Let's pray together. 🙏", "Talking to God is my favorite. 🙏"] },
  bow: { ms: 1800, pop: "🙇", say: ["*takes a bow* Thank you, thank you! 🙇", "A bow, just for you! 🙇"] },
  ball: { ms: 3600, pop: "", say: ["Toss... and catch! ⚾ Got it!", "Up it goes! ⚾ I've been practicing with my mitt!"] },
  flower: { ms: 5200, pop: "🌷", say: ["For you! 🌷", "I picked this one just for you. 🌷", "Here, a flower for you! 🌼 You make my day."] },
  hug: { ms: 2600, pop: "💕", say: ["Big hug! 🤗💕", "Sending you the biggest hug! 💕"] },
  read: { ms: 9000, pop: "📖", say: ["Reading time! 📖 I love this part.", "Let me read my little Bible with you. 📖"] },
  think: { ms: 5000, pop: "💭", say: ["Hmm, let me think... 🤔", "*thinking hard* 💭"] },
  write: { ms: 7000, pop: "✏️", say: ["Taking notes! ✏️", "Writing this down so I remember. ✏️"] },
  eat: { ms: 7000, pop: "🍞", say: ["Snack time! 🍞🍎 Mmm, bread and an apple.", "Yum! *munch munch* Want some? 🍎", "A little bread and a drink. Thank you, Lord, for food! 🙏"] },
  exercise: { ms: 4200, pop: "💪", say: ["Jumping jacks! One, two, three... 💪", "Gotta stay strong! 💪 Phew!", "Exercise break! Wanna join me? 🏃"] },
  fish: { ms: 9000, pop: "🎣", say: ["Gone fishing! 🎣 Like Peter by the Sea of Galilee.", "Shh... I think I've got a bite! 🎣", "Fishing is good thinking time. 🎣"] },
  hike: { ms: 6000, pop: "🎒", say: ["Backpack on! Let's go hiking! 🎒", "Off to explore! 🥾", "Climbing a mountain, like Moses! ⛰️"] },
  juggle: { ms: 4500, pop: "🤹", say: ["Juggling! 🤹 One, two, three... don't drop it!", "Look, three balls at once! 🤹"] },
  basketball: { ms: 4200, pop: "🏀", say: ["Dribble, dribble... swish! 🏀", "Basketball time! 🏀 Nothing but net!"] },
  bowl: { ms: 4800, pop: "", say: ["Bowling! 🎳 Rolling... rolling... STRIKE!", "Watch this! 🎳 Knock them all down!", "Down the lane it goes! 🎳"] },
  football: { ms: 3600, pop: "", say: ["Go long! 🏈 Touchdown!", "Football! 🏈 I've got a good arm."] },
  glasses: { ms: 6000, pop: "🤓", say: ["*puts on glasses* Very scholarly. 🤓", "Nerd mode: ON. 🤓"] },
  nap: { ms: 0, pop: "", say: ["Okay... yawn... nap time. 😴 Tap me to wake me up!", "Just a little nap... 💤"] },
  wake: { ms: 2000, pop: "☀️", say: ["I'm up! I'm up! ☀️", "Good morning! Did I miss anything? ☀️"] },
};
const ACTION_WORDS = [
  [/jump ?rope|skip(ping)? ?rope/, "jumprope"], [/jump|hop/, "jump"], [/dance|dancing|boogie|groove/, "dance"],
  [/wave|say (hi|hello)/, "wave"], [/cartwheels?|flips?|backflips?|somersaults?|tumble/, "cartwheel"], [/spin|twirl|turn around/, "spin"],
  [/cheer|celebrate|yay|hooray/, "cheer"], [/laugh|roll on the floor|giggle|lol/, "laugh"], [/take a bow|bow/, "bow"],
  [/play (ball|catch)|toss (a |the )?ball|throw (a |the )?ball|catch/, "ball"], [/hug( me)?|give me a hug/, "hug"],
  [/((give|hand|bring|get|pick) (me |us )?)?(a |some |me a )?flowers?( for me)?|(give|hand) me (a )?flower/, "flower"],
  [/read( your bible)?/, "read"], [/think/, "think"], [/write|take notes/, "write"],
  [/eat|have (a )?(snack|lunch|dinner|breakfast)|snack|lunch|dinner|breakfast|get something to eat/, "eat"],
  [/exercise|work ?out|jumping jacks|stretch/, "exercise"], [/(go )?fish(ing)?/, "fish"], [/(go )?hik(e|ing)|put on (your )?backpack|go exploring/, "hike"],
  [/juggle|juggling/, "juggle"], [/(play )?basketball|dribble|shoot hoops/, "basketball"], [/(play )?football|throw a pass/, "football"], [/(go )?bowl(ing)?|knock (down )?the pins/, "bowl"],
  [/(put on )?(your )?glasses|be a nerd|nerd/, "glasses"], [/(go )?(to )?bed|bedtime/, "nap"],
  [/(take a |go to )?(nap|sleep)/, "nap"], [/wake up|nudge/, "wake"], [/(a |some )?tricks?|something (fun|cool)/, "trick"],
];
// "Can you jump rope?", "Buddy, dance!", "do a cartwheel please": a short request to do one
// of his actions. Questions about the Bible ("Why did David dance?") are left for the helper.
export function buddyCommand(text, name = "buddy") {
  const n = name.toLowerCase().replace(/[^a-z ]/g, "");
  let t = ` ${text.toLowerCase().replace(/[^a-z' ]+/g, " ").replace(/\s+/g, " ").trim()} `;
  t = t.replace(new RegExp(` (hey|hi|ok|okay|yo)? ?(buddy|${n || "buddy"}) `, "g"), " ").trim();
  t = t.replace(/^(can|could|will|would) you (please )?|^please |^(let'?s see|i want to see|show me|i wanna see)( you)? |^i want you to |^(go|try to|try|now) /, "");
  t = t.replace(/^(do|show me|give me) /, "").replace(/^(a|an|the|some|your|another) /, "");
  t = t.replace(/ (please|for me|again|now|buddy|too|real quick|for us|with me)$/g, "").replace(/ (please|for me|again|now)$/g, "").trim();
  for (const [re, act] of ACTION_WORDS) if (new RegExp(`^(${re.source})$`).test(t)) return act;
  return null;
}


// Sit somewhere for a while: "chair", "desk" (chair at his little desk) or "ground"; then back to sitting on the ground.
export function seat(x, where, ms) {
  x.classList.remove("chair", "desk", "sitting");
  if (where === "ground") x.classList.add("sitting");
  else x.classList.add("chair", ...(where === "desk" ? ["desk"] : []));
  clearTimeout(x._seatT);
  x._seatT = setTimeout(() => { if (x.classList.contains("chair")) { x.classList.remove("chair", "desk"); x.classList.add("sitting"); } }, ms);
}

export function createBuddy({ onTap, label = "Open my study buddy chat", defaultSide = () => "right", sayOutLoud = null, sleepy = () => false, userName = () => "", userBirthday = () => "" }) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "buddy";
  el.setAttribute("aria-label", label);
  el.innerHTML = BUDDY_SVG + `<span class="buddy-pop" aria-hidden="true"></span>`;
  const pop = el.querySelector(".buddy-pop");
  el.classList.add("sitting");
  document.body.append(el);
  // His little speech bubble for visits ("Hi! Wondering anything?"), with two ways to answer him.
  const say = document.createElement("div");
  say.className = "buddy-say";
  say.setAttribute("role", "status");
  say.hidden = true;
  say.innerHTML = `<button type="button" class="bs-words"></button><span class="bs-acts"><button type="button" class="bs-yes">Yes, I have a question</button><button type="button" class="bs-no">Not now</button></span>
`;
  const words = say.querySelector(".bs-words"), acts = say.querySelector(".bs-acts");
  document.body.append(say);
  // Asking for his name (people who set up the app before he could be named): a big, calm
  // window near the top of the screen, so the keyboard never covers what they're typing, and
  // it stays until they answer.
  const nameDlg = document.createElement("dialog");
  nameDlg.className = "buddy-name-dialog";
  nameDlg.setAttribute("aria-label", "Name your study buddy");
  nameDlg.innerHTML = `<form class="bnd-form"><span class="bnd-face" aria-hidden="true">${BUDDY_SVG}</span><p class="bnd-q"></p>
    <label class="bnd-label">My name will be<input type="text" maxlength="16" autocomplete="off" autocapitalize="words" enterkeyhint="done" value="Buddy"></label>
    <div class="bnd-acts"><button type="submit" class="bnd-save">That's your name!</button><button type="button" class="bnd-later">Maybe later</button></div></form>`;
  document.body.append(nameDlg);
  const nameInput = nameDlg.querySelector("input");
  let onName = null;
  nameDlg.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = nameInput.value.trim().slice(0, 16) || "Buddy";
    nameInput.blur(); nameDlg.close();
    onName?.(v); onName = null;
    setTimeout(() => { visit(`I love it! I'm ${v} now. 😊 Tap me any time you want to talk.`, 5000, false); setTimeout(() => play("excited", 1400), 1000); }, 350);
  });
  nameDlg.querySelector(".bnd-later").addEventListener("click", () => {
    nameInput.blur(); nameDlg.close(); onName = null;
    setTimeout(() => visit("Okie! You can name me any time in Settings. 😊", 4000, false), 350);
  });

  // Where he stands: which edge, and how far down (0 = top of the free space, 1 = bottom).
  // Until someone moves him, he takes the side the app suggests (away from the corner friend).
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(SPOT_KEY)); } catch { /* first time */ }
  let spot = saved || { side: defaultSide(), y: 1 };
  let wanderY = null; // where his little reading walks have taken him (not saved)

  // The space he may use: below the top bar and above the bottom buttons.
  function bounds() {
    const top = (document.querySelector(".topbar")?.getBoundingClientRect().bottom || 0) + 8;
    const tabs = document.querySelector(".tabbar");
    const tr = tabs && getComputedStyle(tabs).display !== "none" ? tabs.getBoundingClientRect() : null;
    // A side rail (iPad) doesn't take the bottom of the screen; a bottom bar does.
    const bottom = (tr && tr.height < innerHeight * 0.5 ? tr.top : innerHeight) - 8;
    const isRail = Boolean(tr && tr.height >= innerHeight * 0.5);
    const left = isRail ? tr.right : 0; // beside the iPad side menu
    // In the side menu he rests in the empty space below the last button.
    const lastBtn = isRail ? [...tabs.querySelectorAll("button")].pop()?.getBoundingClientRect().bottom || 0 : 0;
    const rail = isRail ? { right: tr.right, top: lastBtn + 12, bottom: innerHeight - 10 } : null;
    return { top, bottom: Math.max(top + el.offsetHeight, bottom), left, rail };
  }
  function place() {
    const b = bounds(), h = el.offsetHeight || 84;
    if (!saved) spot = { side: b.rail ? "rail" : defaultSide(), y: wanderY ?? 1 };
    // On iPad he lives in the side menu (out of the page entirely), unless he's been moved.
    const side = spot.side === "rail" && !b.rail ? defaultSide() : spot.side;
    if (side === "rail") {
      const span = Math.max(0, b.rail.bottom - b.rail.top - h);
      el.style.top = `${b.rail.top + clamp(spot.y, 0, 1) * span}px`;
      el.style.left = `${Math.max(2, (b.rail.right - el.offsetWidth) / 2)}px`;
      el.style.right = "";
    } else {
      el.style.top = `${b.top + clamp(spot.y, 0, 1) * (b.bottom - b.top - h)}px`;
      el.style.left = side === "left" ? `${b.left + 4}px` : "";
      el.style.right = side === "right" ? "4px" : "";
    }
    el.classList.toggle("in-rail", side === "rail");
    el.classList.toggle("on-right", side === "right");
    document.body.classList.toggle("buddy-right", !el.hidden && spot.side === "right");
    document.body.classList.toggle("buddy-left", !el.hidden && spot.side === "left");
    placeSay();
  }
  function placeSay() {
    if (say.hidden) return;
    const r = el.getBoundingClientRect();
    say.style.top = `${Math.max(8, r.top - say.offsetHeight + 10)}px`;
    const right = el.classList.contains("on-right");
    say.style.left = !right ? `${Math.max(6, r.right - 6)}px` : "";
    say.style.right = right ? `${Math.max(6, innerWidth - r.left - 6)}px` : "";
    say.classList.toggle("on-right", right);
  }

  // He stands while he's busy (chatting, visiting, cheering), then sits back down.
  let sitTimer = 0, keepStanding = false;
  const sitSoon = (ms = SIT_AFTER_MS) => { clearTimeout(sitTimer); sitTimer = setTimeout(() => { if (!keepStanding) el.classList.add("sitting"); }, ms); };
  const wake = () => { el.classList.remove("sitting"); sitSoon(); };
  let holdUntil = Date.now() + 3000; // stays out while he's greeting, celebrating or answering
  const hold = (ms = 3000) => { holdUntil = Date.now() + ms; };
  // He gets up before he jumps or cheers: from sitting he stands first, never hops straight up.
  const HOPS = /^(excited|cheering|jumping|yay|cartwheel|dancing|spinning|roping)$/;
  const standUp = (x = el) => {
    if (!x.classList.contains("sitting")) return 0;
    x.classList.remove("sitting", "settling", "rising"); void x.offsetWidth; x.classList.add("rising");
    setTimeout(() => x.classList.remove("rising"), 600);
    return matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.graphics === "simple" ? 0 : 520;
  };
  const play = (cls, ms) => {
    const wait = HOPS.test(cls) ? standUp() : 0;
    wake(); hold(Math.max(ms + wait, 3000)); el.classList.remove("tucked");
    setTimeout(() => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms); }, wait);
  };

  // Drag him along the edges; a tap (no real movement) opens the chat.
  let drag = null;
  el.addEventListener("pointerdown", (e) => {
    drag = { x: e.clientX, y: e.clientY, top: el.getBoundingClientRect().top, moved: false };
    el.setPointerCapture(e.pointerId);
  });
  el.addEventListener("pointermove", (e) => {
    if (!drag) return;
    if (!drag.moved && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 8) return;
    drag.moved = true;
    el.classList.add("dragging");
    const b = bounds();
    el.style.top = `${clamp(drag.top + e.clientY - drag.y, b.rail ? 0 : b.top, (b.rail ? innerHeight : b.bottom) - el.offsetHeight)}px`;
    el.style.left = `${clamp(e.clientX - el.offsetWidth / 2, 0, innerWidth - el.offsetWidth)}px`;
    el.style.right = "";
  });
  const drop = (e) => {
    if (!drag) return;
    const was = drag; drag = null;
    el.classList.remove("dragging");
    if (!was.moved) { if (e.type === "pointerup") tapped(); return; }
    const b = bounds(), r = el.getBoundingClientRect();
    const mid = r.left + r.width / 2;
    spot = b.rail && mid < b.rail.right + 20
      ? { side: "rail", y: clamp((r.top - b.rail.top) / Math.max(1, b.rail.bottom - b.rail.top - r.height), 0, 1) }
      : { side: mid < (b.left + innerWidth) / 2 ? "left" : "right", y: clamp((r.top - b.top) / Math.max(1, b.bottom - b.top - r.height), 0, 1) };
    saved = spot;
    try { localStorage.setItem(SPOT_KEY, JSON.stringify(spot)); } catch { /* not saved */ }
    place();
  };
  el.addEventListener("pointerup", drop);
  el.addEventListener("pointercancel", drop);
  // Keyboard and screen readers: Enter or Space opens the chat (the pointer handlers cover taps).
  el.addEventListener("click", (e) => { if (e.detail === 0) tapped(); });
  words.addEventListener("click", () => tapped());
  // "Yes": he's thrilled, then the chat opens.
  const yesBtn = say.querySelector(".bs-yes");
  let onYes = null;
  yesBtn.addEventListener("click", () => {
    clearTimeout(visitTimer);
    if (onAnswer) {
      const a = onAnswer.yes; onAnswer = null;
      // Opening something (like the journal) happens right away, inside the tap, so the
      // keyboard can come up on iPad and iPhone.
      if (a.go) { endVisit(); play("excited", 1600); a.go(); return; }
      speak(a.line, false); play("yay", 1600); visitTimer = setTimeout(goBack, 3200); return;
    }
    const then = onYes || onTap;
    speak(onYes ? pick(PLAY_LINES) : pick(YES_LINES), false);
    play("excited", 1400);
    visitTimer = setTimeout(() => { endVisit(); then(); }, 1100);
  });
  // "Not now": a happy "Okie!" and back he goes.
  const noBtn = say.querySelector(".bs-no");
  noBtn.addEventListener("click", () => {
    clearTimeout(visitTimer);
    if (onAnswer) { const a = onAnswer.no; onAnswer = null; speak(a.line, false); play("waving", 1200); visitTimer = setTimeout(goBack, 3200); return; }
    speak(pick(NO_LINES), false);
    play("waving", 1200);
    visitTimer = setTimeout(goBack, 2400);
  });
  function tapped() { rouse(); endVisit(); play("excited", 1400); onTap(); }
  // He "says" each line: his mouth moves for a moment, about as long as the words.
  let talkTimer = 0, sayShownAt = 0;
  function speak(text, ask) {
    clearTimeout(talkTimer);
    el.classList.add("speaking");
    talkTimer = setTimeout(() => el.classList.remove("speaking"), Math.min(3200, 600 + text.length * 35));
    words.textContent = text;
    sayOutLoud?.(text);
    acts.hidden = ask !== true;
    say.hidden = false;
    sayShownAt = Date.now();
    placeSay();
  }

  // A visit: he stands, walks a few steps into the screen, says something short, then
  // walks back and sits. Tapping him or his bubble opens the chat.
  let visitTimer = 0;
  function endVisit() {
    clearTimeout(visitTimer);
    say.hidden = true;
    el.classList.remove("visiting", "walking");
    sitSoon(4000);
  }
  const goBack = () => { say.hidden = true; el.classList.add("walking"); el.classList.remove("visiting"); setTimeout(endVisit, 900); };
  // A visit where he asks what they'd like to call him; onPicked(name) saves it.
  function askName(text, onPicked) {
    if (el.hidden || drag || !say.hidden || document.querySelector("dialog[open]")) return false;
    rouse();
    nameDlg.querySelector(".bnd-q").textContent = text;
    nameInput.value = "Buddy";
    onName = onPicked;
    nameDlg.showModal();
    play("waving", 1600);
    setTimeout(() => { nameInput.focus(); nameInput.select(); }, 120);
    return true;
  }
  // A friendly question with his own two answers, like "Have you gotten outside today?"
  // yes/no: { label, line (what he says back), go (optional, runs after) }.
  function ask(text, yes, no) {
    if (!visit(text, 16000)) return false;
    onAnswer = { yes, no };
    yesBtn.textContent = yes.label;
    noBtn.textContent = no.label;
    return true;
  }
  // A visit that invites them to something ("Want to play?"): yes runs `go` instead of the chat.
  let onAnswer = null;
  function invite(text, yesLabel, go) {
    if (!visit(text, 14000)) return false;
    onYes = go;
    yesBtn.textContent = yesLabel;
    return true;
  }
  function visit(text, ms = 12000, ask = true) {
    onYes = null; onAnswer = null;
    yesBtn.textContent = "Yes, I have a question";
    noBtn.textContent = "Not now";
    if (el.hidden || drag || !say.hidden) return false;
    rouse();
    el.classList.remove("tucked", "sitting");
    el.classList.add("walking", "visiting");
    hold(ms + 1500);
    setTimeout(() => {
      el.classList.remove("walking");
      play("waving", 1200);
      speak(text, ask);
    }, 900);
    visitTimer = setTimeout(goBack, ms);
    return true;
  }

  // Little things he does on his own: cartwheels, a stroll, a think, a "Yay!", and a nap on
  // the ground when nobody has touched the app for a while. Any tap or key wakes him.
  let lastActive = Date.now(), trickUntil = 0;
  const still = () => matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.graphics === "simple";
  const busy = () => el.hidden || drag || !say.hidden || keepStanding || el.classList.contains("visiting") || Date.now() < holdUntil || Date.now() < trickUntil || document.hidden;
  let popTimer = 0;
  const popUp = (text, ms) => { clearTimeout(popTimer); pop.classList.remove("snore"); pop.textContent = text; pop.classList.add("on"); popTimer = setTimeout(() => pop.classList.remove("on"), ms); };
  function trick(name) {
    if (busy() || el.classList.contains("sleeping")) return false;
    if (IDLES[name]) {
      trickUntil = Date.now() + IDLES[name] + 400;
      el.classList.add("sitting", name);
      if (name === "whistle") popUp("♪ ♫", IDLES[name]);
      setTimeout(() => el.classList.remove(name), IDLES[name]);
      return true;
    }
    const ms = { cartwheel: 1700, stroll: 3200, pondering: 5000, yay: 2000, reading: 9000 }[name] || 2000;
    const rise = HOPS.test(name) ? standUp() : 0;
    trickUntil = Date.now() + ms + 400 + rise;
    el.classList.remove("tucked", "sitting");
    if (rise) { setTimeout(() => { el.classList.add(name); setTimeout(() => el.classList.remove(name), ms); }, rise); return true; }
    if (name === "reading") {
      // He sits down with his own little Bible: in his chair or on the ground.
      el.classList.add("reading"); seat(el, pick(["chair", "ground", "chair"]), ms);
      setTimeout(() => el.classList.remove("reading"), ms);
      if (Math.random() < 0.5) setTimeout(() => { if (el.classList.contains("reading")) popUp(pick(["💡", "💕", "🙂"]), 2200); }, 6400);
    } else if (name === "stroll") {
      el.classList.add("walking", "strolling");
      setTimeout(() => el.classList.remove("strolling"), 1500);
      setTimeout(() => el.classList.remove("walking"), ms);
    } else {
      el.classList.add(name);
      setTimeout(() => el.classList.remove(name), ms);
      // Now and then a cartwheel doesn't go so well: he lands on his bottom and cries a little.
      if (name === "cartwheel" && Math.random() < 0.15) {
        trickUntil += 2000;
        setTimeout(() => { el.classList.add("tripping"); face("cry", 2000); popUp("😢", 1800); }, ms - 200);
        setTimeout(() => el.classList.remove("tripping"), ms + 1500);
      }
    }
    if (name === "yay") popUp("Yay!", ms);
    // Thinking: a question mark, then the lightbulb of a good idea.
    if (name === "pondering") { popUp("?", 2600); setTimeout(() => { if (el.classList.contains("pondering")) popUp("💡", ms - 2700); }, 2700); }
    sitSoon(ms + 2500);
    return true;
  }
  // A little picture over his head for a few seconds: a cloud for a sad passage, hearts
  // for a happy one, lightning for a dramatic one, a sun or moon for the time of day.
  const MOODS = { sad: "☁️", happy: "💕", dramatic: "⚡", idea: "💡", morning: "☀️", night: "🌙", sleepy: "🥱", party: "🎉", trophy: "🏆", mad: "😤", cry: "😢", love: "💛", scared: "😨" };
  function mood(kind, ms = 6000) {
    if (el.hidden || el.classList.contains("sleeping") || pop.classList.contains("search")) return false;
    popUp(MOODS[kind] || kind, ms);
    if (kind === "sad") { el.classList.add("caring"); setTimeout(() => el.classList.remove("caring"), ms); }
    if (kind === "scared") { el.classList.add("caring", "scared"); setTimeout(() => el.classList.remove("caring", "scared"), ms); }
    if (kind === "mad" || kind === "cry") { el.classList.remove("tucked"); el.classList.add(kind === "mad" ? "pouting" : "teary"); setTimeout(() => el.classList.remove("pouting", "teary"), Math.min(ms, 3500)); }
    return true;
  }
  function nap(force = false) {
    if ((!force && busy()) || el.classList.contains("sleeping")) return;
    el.classList.remove("sitting", "tucked", "thinking", "talking");
    el.classList.add("sleeping");
    pop.textContent = "z z z"; pop.classList.add("on", "snore");
  }
  function rouse() {
    if (!el.classList.contains("sleeping")) return;
    el.classList.remove("sleeping"); pop.classList.remove("on", "snore");
    el.classList.add("sitting");
  }
  const active = () => { lastActive = Date.now(); if (el.classList.contains("sleeping")) { rouse(); trick("yay"); } };
  addEventListener("pointerdown", active, { passive: true });
  addEventListener("keydown", active);
  setInterval(() => {
    if (still()) return;
    if (Date.now() - lastActive > (lateNow() || sleepy() || moodNow === "sleepy" || moodNow === "grumpy" ? LATE_NAP_MS : NAP_AFTER_MS)) { nap(); return; }
    if (lateNow() && Math.random() < 0.3) { if (!busy()) mood("sleepy", 2600); return; }
    if (moodNow === "grumpy" && Math.random() < 0.25) { if (!busy()) popUp(pick(["😤", "😒", "😮‍💨"]), 2400); return; }
    if (moodNow === "sleepy" && Math.random() < 0.3) { if (!busy()) mood("sleepy", 2600); return; }
    if (Math.random() < (sleepy() ? 0.15 : 0.55)) trick(pick(TRICKS));
  }, TRICK_EVERY_MS);

  // Asked to do something: he does it right away, even while the chat is open.
  const ACT_CLASSES = ["bite", "reeling", "landed", "nofish", "tangle", "fishhat", "bucketfish", "fishgo", "fishback", "glancing", "mood-soft", "mood-focus", "flowering", "bowling", "throwing", "chair", "desk", "jumping", "roping", "dancing", "spinning", "laughing", "praying", "bowing", "tossing", "hugging", "eating", "exercising", "fishing", "hiking", "juggling", "dribbling", "nerdy"];
  function act(name, also = null) {
    if (name === "trick") name = pick(["cartwheel", "jumprope", "dance", "spin", "ball", "jump"]);
    const a = BUDDY_ACTIONS[name];
    if (!a || (el.hidden && !also)) return null;
    const both = (fn) => { fn(el); if (also) fn(also); };
    if (name === "nap") { nap(true); return name; }
    rouse();
    if (name === "wake") { play("excited", 1400); popUp(a.pop, 1800); return name; }
    const ms = a.ms;
    const hopCls = { jump: "jumping", jumprope: "roping", dance: "dancing", spin: "spinning", cartwheel: "cartwheel", cheer: "cheering" }[name];
    let rise = 0;
    if (hopCls) both((x) => { rise = Math.max(rise, standUp(x)); });
    trickUntil = Date.now() + ms + 400 + rise; hold(ms + 400 + rise);
    el.classList.remove("tucked", "sitting");
    both((x) => x.classList.remove("sitting", ...ACT_CLASSES));
    const cls = { jump: "jumping", jumprope: "roping", dance: "dancing", spin: "spinning", laugh: "laughing", pray: "praying", bow: "bowing", ball: "tossing", hug: "hugging", flower: "flowering", bowl: "bowling",
      wave: "waving", cartwheel: "cartwheel", cheer: "cheering", read: "reading", think: "pondering", write: "writing",
      eat: "eating", exercise: "exercising", fish: "fishing", hike: "hiking", juggle: "juggling", basketball: "dribbling", football: "throwing", glasses: "nerdy" }[name];
    const start = () => both((x) => { void x.offsetWidth; x.classList.add(cls); setTimeout(() => x.classList.remove(cls), ms); });
    if (rise) setTimeout(start, rise); else start();
    if (name === "eat" || name === "fish") both((x) => x.classList.add("sitting"));
    // Asked to go fishing, half the time he gets a bite and reels one in.
    if (name === "fish" && Math.random() < .5) {
      setTimeout(() => both((x) => x.classList.add("bite")), 2600);
      setTimeout(() => both((x) => { x.classList.remove("bite"); x.classList.add("reeling"); }), 4000);
      setTimeout(() => popUp("🐟", 2400), 6600);
      setTimeout(() => both((x) => x.classList.remove("bite", "reeling")), ms);
    }
    // He sits down to read or write, like a real reader: in his chair, on the ground, or at his desk.
    if (name === "read" || name === "write") both((x) => seat(x, name === "write" ? "desk" : pick(["chair", "ground"]), ms));
    if (a.pop) popUp(a.pop, Math.min(ms, 3000));
    if (!keepStanding) sitSoon(ms + 2500);
    return name;
  }

  // Living his own life: come back after a while and you may catch him at something:
  // asleep, reading (maybe dozing on his book), writing with crumpled paper at his feet and then
  // tidying it into the trash, searching for something, juggling, eating, hiking or fishing.
  const SEEN_KEY = "bible-study:buddy-seen", AWAY_MS = 20 * 60 * 1000;
  const LIFE = ["nap", "read", "doze", "writeTidy", "search", "juggle", "jumprope", "eat", "hike", "fish", "basketball", "exercise", "read", "writeTidy", "fish", "wait", "think", "wait", "stars", "pray", "stars"];
  // Fishing is a little story across visits: sometimes you catch him heading off with his pole,
  // sometimes he's already sitting there waiting for a bite, and sometimes he hooks one and reels it in.
  function fishing(stage = pick(["go", "sit", "catch", "catch"])) {
    if (busy() || el.classList.contains("sleeping")) return null;
    el.classList.remove("tucked", "sitting", "fishing", "bite", "reeling", "landed", "nofish", "tangle");
    // A cast up over his head into the pond. Sometimes the line tangles (grr), sometimes a fish
    // bites and gets away (aww), and sometimes he lands one (he's thrilled).
    const cast = (ms, catchIt) => {
      el.classList.add("sitting", "fishing", ...(Math.random() < .5 && !el.classList.contains("capped") ? ["fishhat"] : [])); trickUntil = Date.now() + ms;
      if (!catchIt && Math.random() < .25) {
        setTimeout(() => { el.classList.add("tangle"); face("angry", 2200); popUp("😤", 2200); }, 1900);
        setTimeout(() => { el.classList.remove("tangle"); face("wow", 900); }, 4600);
      }
      if (catchIt) {
        const lost = Math.random() < .3;
        setTimeout(() => { el.classList.add("bite"); face("shocked", 1400); }, 3200);
        setTimeout(() => { el.classList.remove("bite"); el.classList.add("reeling"); if (lost) el.classList.add("nofish"); }, 4800);
        setTimeout(() => {
          if (lost) {
            // A little pout... then he perks right back up.
            const mad = Math.random() < .5; face(mad ? "angry" : "sad", 2400); popUp(mad ? "😤" : "😢", 2200);
            setTimeout(() => { el.classList.remove("reeling", "nofish"); popUp(pick(["💪", "🙂", "Next time!"]), 1800); }, 2600);
          }
          else {
            // Landed! He stands up first, holds the fish up high, and then he cheers.
            el.classList.add("landed"); face("excited", 3200); popUp(pick(["🐟!", "🎉🐟", "🐟"]), 2600);
            play("cheering", 1800);
            if (Math.random() < .4 && say.hidden) { speak(pick(["I got one! 🐟", "Look, I caught one! 🐟", "Woohoo, a fish! 🎣"]), false); clearTimeout(visitTimer); visitTimer = setTimeout(goBack, 3000); }
            // Into the bucket it goes, and he sits back down: a tail pokes out for the rest of his fishing.
            setTimeout(() => { el.classList.remove("reeling", "landed"); el.classList.add("bucketfish", "settling", "sitting"); setTimeout(() => el.classList.remove("settling"), 500); }, 3000);
          }
        }, 7200);
      }
      setTimeout(() => el.classList.remove("fishing", "bite", "reeling", "landed", "nofish", "tangle", "fishhat", "bucketfish"), ms);
    };
    if (stage === "go") {
      // Off he goes with his pole over his shoulder or strapped to his backpack (cap on, some
      // days)... sometimes he trips on the way... and a little later he's sitting by the pond.
      trickUntil = Date.now() + 17000;
      const gear = [Math.random() < .5 && "packed", Math.random() < .4 && "capped"].filter(Boolean);
      el.classList.add("walking", "fishgo", ...gear); popUp("🎣", 2600);
      if (Math.random() < .2) {
        setTimeout(() => { el.classList.add("tripping"); face("cry", 2000); popUp("😢", 1800); }, 1100);
        setTimeout(() => el.classList.remove("tripping"), 2300);
      }
      const catchIt = Math.random() < .5;
      setTimeout(() => { el.classList.add("fishback"); el.classList.remove("walking", "fishgo", "packed"); cast(catchIt ? 13000 : 10000, catchIt); }, 3600);
      setTimeout(() => el.classList.remove("fishback", "capped"), catchIt ? 16600 : 13600);
    } else cast(stage === "catch" ? 13000 : 10000, stage === "catch");
    return "fish-" + stage;
  }
  // Lying back to look at the stars and the moon (evenings), knees up or legs out.
  function stars(ms = 12000) {
    if (busy() || el.classList.contains("sleeping")) return null;
    el.classList.remove("tucked", "sitting");
    el.classList.add("stargazing", ...(Math.random() < .5 ? ["knees"] : []));
    trickUntil = Date.now() + ms;
    if (Math.random() < .5) setTimeout(() => popUp(pick(["✨", "🌙", "⭐"]), 2200), 4000);
    setTimeout(() => { el.classList.remove("stargazing", "knees"); el.classList.add("sitting"); }, ms);
    return "stars";
  }

  // ---- His faces, his moods, and his special days ----
  const FACES = ["f-wow", "f-excited", "f-shocked", "f-sad", "f-cry", "f-angry"];
  function face(kind, ms = 2500, also = null) {
    const all = [el, also].filter(Boolean);
    all.forEach((x) => { x.classList.remove(...FACES); void x.offsetWidth; x.classList.add(`f-${kind}`); clearTimeout(x._faceT); x._faceT = setTimeout(() => x.classList.remove(`f-${kind}`), ms); });
  }
  const DAYS_KEY = "bible-study:buddy-days", CHEER_KEY = "bible-study:buddy-cheered";
  const doneList = () => { try { return JSON.parse(localStorage.getItem(DAYS_KEY)) || {}; } catch { return {}; } };
  const done = (k) => Boolean(doneList()[k]);
  const mark = (k) => { try { const d = doneList(); d[k] = Date.now(); for (const x of Object.keys(d)) if (Date.now() - d[x] > 40 * 864e5) delete d[x]; localStorage.setItem(DAYS_KEY, JSON.stringify(d)); } catch { /* private mode */ } };
  const cheered = () => { try { return localStorage.getItem(CHEER_KEY) === moodBlock(); } catch { return false; } };
  let moodNow = "happy", cheeredAt = 0;
  function setMood() {
    moodNow = globalThis.__buddyMood || dayMood(ctNow(), cheered());
    el.classList.remove("day-calm", "day-grumpy", "day-sleepy");
    if (moodNow !== "happy") el.classList.add(`day-${moodNow}`);
  }
  // Being kind to him, or asking how he's doing, lifts a grumpy or sleepy mood.
  function cheerUp() {
    const was = moodNow;
    try { localStorage.setItem(CHEER_KEY, moodBlock()); } catch { /* private mode */ }
    setMood();
    if (was !== "happy") { cheeredAt = Date.now(); if (!el.hidden) { face("excited", 2200); popUp("💛", 2400); } }
    return was;
  }
  // Hats for the day: a Santa hat on Christmas Eve and Day, a party hat on New Year's Eve
  // evening, New Year's Day and his birthday.
  function dress(sp = special()) {
    const k = sp?.kind;
    el.classList.toggle("santa-hat", k === "christmaseve" || k === "christmas");
    el.classList.toggle("party-hat", k === "nye" || k === "midnight" || k === "newyear" || k === "birthday");
  }
  const GIFT_POP = { socks: "🧦", teddy: "🧸", flashlight: "🔦", lure: "🎣" };
  function openGift(kind, intro, line, ms = 10000) {
    trickUntil = Date.now() + ms; hold(ms);
    el.classList.remove("tucked", "sitting", "opened", "g-socks", "g-teddy", "g-flashlight", "g-lure");
    el.classList.add("gifting", `g-${kind}`);
    speak(intro, false); clearTimeout(visitTimer);
    face("wow", 2000);
    setTimeout(() => { el.classList.add("opened"); face("excited", 3200); popUp(GIFT_POP[kind], 3200); }, 2200);
    setTimeout(() => { speak(line, false); clearTimeout(visitTimer); visitTimer = setTimeout(goBack, 5000); }, 3600);
    setTimeout(() => { el.classList.remove("gifting", "opened", `g-${kind}`); sitSoon(600); }, ms);
  }
  function party(line, ms = 8000, fireworks = false) {
    trickUntil = Date.now() + ms; hold(ms);
    el.classList.remove("tucked");
    el.classList.add("confetti", ...(fireworks ? ["fireworks"] : []));
    play("jumping", 1800); face("excited", 3000);
    if (line) { speak(line, false); clearTimeout(visitTimer); visitTimer = setTimeout(goBack, 6000); }
    setTimeout(() => el.classList.remove("confetti", "fireworks"), ms);
  }
  function cake(age) {
    const ms = 11000;
    trickUntil = Date.now() + ms; hold(ms);
    el.classList.remove("tucked", "sitting", "blown", "blowing");
    el.classList.add("caking");
    speak(`My birthday cake! 🎂 Time to make a wish...`, false); clearTimeout(visitTimer);
    face("wow", 1800);
    setTimeout(() => el.classList.add("blowing"), 3400);
    setTimeout(() => { el.classList.remove("blowing"); el.classList.add("blown"); }, 4400);
    setTimeout(() => { party(`Yay! 🎉 I'm ${age}! Thank you for celebrating with me!`, 6000); }, 4900);
    setTimeout(() => el.classList.remove("caking", "blown"), ms);
  }
  function fireworks(line) {
    trickUntil = Date.now() + 6000; hold(6000);
    el.classList.remove("tucked");
    el.classList.add("fireworks"); face("wow", 1600); popUp("🎆", 2400);
    setTimeout(() => face("excited", 2400), 1800);
    if (line) { speak(line, false); clearTimeout(visitTimer); visitTimer = setTimeout(goBack, 4500); }
    setTimeout(() => el.classList.remove("fireworks"), 6000);
  }
  // fromOpen: they just opened the app (or came back to it). The every-minute check only
  // handles the moments with a set time: midnight on New Year's, his birthday cake at 7:30,
  // and the occasional Fourth of July firework.
  // The day's greeting (the Christmas countdown, Christmas Eve, New Year's Eve), once a day.
  // The app says it in one of his usual visits, so it never crowds its own questions.
  function greeting() {
    const t = ctNow(), sp = special(t);
    if (!sp) return null;
    const line = sp.kind === "countdown" ? (sp.days === 1 ? "Tomorrow's Christmas Eve! 🎄 I can hardly wait!" : `It's almost Christmas! 🎄 Only ${sp.days} days to go!`)
      : sp.kind === "christmaseve" ? "It's Christmas Eve! 🎄 Tomorrow's Christmas!"
      : sp.kind === "nye" ? "It's New Year's Eve! 🎉 I'm staying up till midnight!" : null;
    const k = `${t.key}:greet`;
    if (!line || done(k)) return null;
    return { line, said: () => mark(k) };
  }
  function specialDay(fromOpen) {
    setMood();
    const t = ctNow(), sp = special(t);
    const theirs = userBirthday() === `${String(t.m).padStart(2, "0")}-${String(t.d).padStart(2, "0")}`;
    dress(sp);
    if (theirs && !sp) el.classList.add("party-hat");
    // Their birthday (if they told the app): a party, and "I love you", once that day.
    if (theirs && fromOpen && !el.hidden && !still() && !drag && say.hidden && !busy() && !el.classList.contains("sleeping")) {
      const k = `${t.key}:theirs`;
      if (!done(k)) { mark(k); const who = userName()?.trim(); party(`Happy birthday${who ? `, ${who}` : ""}! 🎂 I love you! 💛`, 8000); return true; }
    }
    if (!sp || el.hidden || still() || drag || !say.hidden || busy() || el.classList.contains("sleeping")) return false;
    const once = (x) => { const k = `${t.key}:${x}`; if (done(k)) return false; mark(k); return true; };
    const who = userName()?.trim();
    const hi = who ? `, ${who}` : "";
    switch (sp.kind) {
      case "countdown": case "christmaseve": case "nye":
        return false; // these are greetings the app's visit slot says (see greeting())
      case "christmas":
        if (!fromOpen || !once("xmas")) return false;
        openGift("socks", `Merry Christmas${hi}! 🎄 Ooh, a present!`, "Socks!! 🧦 I LOVE them! They're so cozy! Merry Christmas, I love you! 💛"); return true;
      case "grandparents":
        if (!fromOpen || !once("gp")) return false;
        openGift(sp.gift, `I'm at my grandparents' house! 🏡 ${sp.from} gave me a present!`, sp.gift === "teddy" ? "A teddy bear! 🧸 I'm going to hug him all night!" : "A flashlight! 🔦 Now I can read my Bible under the covers!"); return true;
      case "midnight":
        if (!once("midnight")) return false;
        party(`Happy New Year${hi}!! 🎉🎆`, 9000, true); return true;
      case "newyear":
        if (!fromOpen || !once("ny")) return false;
        party(`Happy New Year${hi}! 🎉 I hope it's your best year yet.`, 6000); return true;
      case "birthday":
        if (sp.evening && (fromOpen || sp.cakeTime) && once("cake")) { cake(sp.age); return true; }
        if (!sp.evening && fromOpen && once("bday")) { openGift("lure", `It's my birthday! 🎂 I'm ${sp.age} today! And I got a present!`, "A shiny new fishing lure! 🎣 Best present ever!"); return true; }
        return false;
      case "july4": {
        const shown = doneList()[`${t.key}:fw`] || 0, count = doneList()[`${t.key}:fwn`] || 0;
        if (count >= 4 || Date.now() - shown < 45 * 60e3 || (!fromOpen && Math.random() < .7)) return false;
        mark(`${t.key}:fw`);
        try { const d = doneList(); d[`${t.key}:fwn`] = count + 1; localStorage.setItem(DAYS_KEY, JSON.stringify(d)); } catch { /* private mode */ }
        fireworks(count === 0 ? "Happy Fourth of July! 🎆" : ""); return true;
      }
    }
    return false;
  }
  setMood(); dress();
  setInterval(() => { if (document.visibilityState === "visible") specialDay(false); }, 30000);
  function life(what = pick(LIFE)) {
    if (el.hidden || still() || drag || !say.hidden) return null;
    if (what === "nap") { nap(true); return what; }
    if (what === "read" || what === "doze") {
      if (!trick("reading")) return null;
      if (what === "doze") { el.classList.add("dozing"); setTimeout(() => { if (el.classList.contains("dozing")) { pop.textContent = "z z"; pop.classList.add("on", "snore"); } }, 3000); setTimeout(() => { el.classList.remove("dozing"); pop.classList.remove("on", "snore"); }, 9000); }
      else if (Math.random() < 0.5) el.classList.add("nerdy"), setTimeout(() => el.classList.remove("nerdy"), 9000);
      return what;
    }
    if (what === "writeTidy") {
      trickUntil = 0;
      el.classList.remove("tucked", "reading"); el.classList.add("sitting", "writing", "crumpled");
      trickUntil = Date.now() + 9000;
      setTimeout(() => { el.classList.remove("writing"); el.classList.add("tidying"); popUp("🗑️", 1800); }, 6000);
      setTimeout(() => el.classList.remove("crumpled", "tidying"), 8200);
      return what;
    }
    if (what === "fish") return fishing();
    if (/^fish-(go|sit|catch)$/.test(what)) return fishing(what.slice(5));
    // Just sitting and waiting for someone to talk to: a soft smile, looking around now and then.
    if (what === "wait") { el.classList.remove("tucked"); el.classList.add("sitting", "mood-soft", "glancing"); trickUntil = Date.now() + 9000; setTimeout(() => el.classList.remove("mood-soft", "glancing"), 9000); return what; }
    if (what === "think") return trick("pondering") ? what : null;
    if (what === "stars") { const h = ctNow().h; return h >= 19 || h < 5 ? stars() : trick("pondering") ? "think" : null; }
    if (what === "pray") { el.classList.remove("tucked"); el.classList.add("praying", "sitting"); trickUntil = Date.now() + 6000; setTimeout(() => el.classList.remove("praying"), 6000); return what; }
    if (what === "search") { el.classList.remove("tucked"); el.classList.add("thinking"); pop.textContent = "🔍"; pop.classList.add("on", "search"); setTimeout(() => { el.classList.remove("thinking"); pop.classList.remove("search"); popUp("💡", 1800); }, 4500); trickUntil = Date.now() + 6500; return what; }
    return act(what);
  }
  const seen = () => { try { return Number(localStorage.getItem(SEEN_KEY)) || 0; } catch { return 0; } };
  const markSeen = () => { try { localStorage.setItem(SEEN_KEY, String(Date.now())); } catch { /* private mode */ } };
  const back = () => { const was = seen(), gone = Date.now() - was; markSeen(); setTimeout(() => specialDay(true), 4000); if (was && gone > AWAY_MS && !special()) setTimeout(() => life(), 2500); else if (was && gone > 2 * 60 * 1000) setTimeout(() => { if (!el.hidden && !still() && !drag && say.hidden && !document.hidden && !el.classList.contains("visiting")) { el.classList.remove("tucked"); play("waving", 1600); sitSoon(3500); } }, 2000); };
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") back(); else markSeen(); });
  addEventListener("pagehide", markSeen);
  setInterval(() => { if (document.visibilityState === "visible") markSeen(); }, 60000);
  back();

  addEventListener("resize", place);
  // While someone scrolls through the reading he sits and fades a little, so he never
  // distracts from the words. He's still there to tap.
  const tuck = (on) => { el.classList.toggle("tucked", on); if (on && !keepStanding) el.classList.add("sitting"); };
  addEventListener("scroll", () => {
    if (!say.hidden && Date.now() - sayShownAt > 1500) { clearTimeout(visitTimer); goBack(); }
    if (!drag && Date.now() > holdUntil) tuck(true);
  }, { passive: true });
  // Someone starts typing somewhere: his bubble gets out of the way at once.
  document.addEventListener("focusin", (e) => {
    const t = e.target;
    if (say.hidden || say.contains(t) || nameDlg.contains(t) || !/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    clearTimeout(visitTimer); goBack();
  });
  requestAnimationFrame(place);

  return {
    el,
    place,
    show(on) { el.hidden = !on; if (!on) endVisit(); place(); },
    visit,
    askName,
    invite,
    ask,
    mood,
    // A thank-you: hearts and a happy little "Yay!".
    love() { if (el.hidden) return; rouse(); cheerUp(); el.classList.remove("tucked"); play("yay", 2000); popUp("💕", 2600); },
    // The big moments: winning at trivia, finishing a book. He's SO excited.
    celebrate(text, icon = "party") {
      if (el.hidden) return;
      rouse(); el.classList.remove("tucked");
      play("cheering", 2600); popUp(MOODS[icon] || icon, 3200);
      if (text) setTimeout(() => { if (say.hidden && !document.querySelector("dialog[open]")) { speak(text, false); clearTimeout(visitTimer); visitTimer = setTimeout(goBack, 6000); } }, 400);
    },
    // A line in his own talk bubble, from where he is (after doing something he was asked).
    says(text, ms = 5000) { if (el.hidden || !text) return; speak(text, false); clearTimeout(visitTimer); visitTimer = setTimeout(goBack, ms); },
    visiting: () => !say.hidden || el.classList.contains("visiting"),
    // Stands while the chat is open; sits again when it closes.
    chatting(on) { keepStanding = on; if (on) { el.classList.remove("sitting", "tucked"); } else sitSoon(3000); },
    excite() { play("excited", 1400); },     // someone asked him something
    // A friendly wave from where he sits, now and then, without walking over.
    wave() { if (el.hidden || drag || !say.hidden) return false; el.classList.remove("tucked"); play("waving", 1600); sitSoon(3500); return true; },
    // Someone asked about something sad: a gentle, caring face for a while.
    caring(on) { clearTimeout(careTimer); el.classList.toggle("caring", on); if (on) { wake(); hold(8000); el.classList.remove("tucked"); careTimer = setTimeout(() => el.classList.remove("caring"), 90000); } },
    cheer() { play("cheering", 2600); },     // a great quiz score
    trick,                                    // "cartwheel" | "stroll" | "pondering" | "yay"
    act,                                      // a BUDDY_ACTIONS name someone asked for; returns it, or null
    // Scholarly things (Greek, Hebrew, the scholars' views): on go his nerd glasses.
    nerd(ms = 6000) { if (el.hidden || el.classList.contains("sleeping") || drag) return false; el.classList.remove("tucked"); el.classList.add("nerdy"); popUp("🤓", 1800); clearTimeout(nerdTimer); nerdTimer = setTimeout(() => el.classList.remove("nerdy"), ms); return true; },
    // They're writing: he pulls out his own paper and pencil for a bit.
    writing(ms = 7000) {
      if (el.hidden || drag || busy() || el.classList.contains("sleeping")) return false;
      el.classList.remove("tucked", "reading"); el.classList.add("writing"); seat(el, "desk", ms);
      trickUntil = Date.now() + ms;
      setTimeout(() => el.classList.remove("writing"), ms);
      return true;
    },
    nap,
    life,
    face,
    cheerUp,
    // How he feels right now, and what's special today (for the chat helper).
    feeling: () => (Date.now() - cheeredAt < 10 * 60e3 ? "cheered" : moodNow),
    today: () => { const t = ctNow(); return userBirthday() === `${String(t.m).padStart(2, "0")}-${String(t.d).padStart(2, "0")}` ? "theirbirthday" : special(t)?.kind || ""; },
    specialDay,
    greeting,
    // Keeping you company: he writes in his own journal while you're in yours, and reads along
    // while you read (sometimes with glasses on, sometimes dozing off on his book).
    mirror(view) {
      if (el.hidden || still() || busy() || el.classList.contains("sleeping") || Math.random() < 0.4) return;
      if (view === "journal" || view === "notes") this.writing(9000);
      else if (view === "read") life(Math.random() < 0.25 ? "doze" : "read");
    },
    sleeping: () => el.classList.contains("sleeping"),
    // Looking something up: his magnifying glass while he thinks, and a lightbulb when he's got it.
    thinking(on) {
      wake(); hold(); if (on) el.classList.remove("tucked");
      const was = el.classList.contains("thinking");
      el.classList.toggle("thinking", on);
      if (on) { pop.textContent = "🔍"; pop.classList.add("on", "search"); }
      else { pop.classList.remove("search"); if (was) popUp("💡", 1800); else pop.classList.remove("on"); }
    },
    talking(on) { wake(); if (on) { hold(60000); el.classList.remove("tucked"); } else hold(); el.classList.toggle("talking", on); },
  };
}
