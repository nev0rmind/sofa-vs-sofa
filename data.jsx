// Shared mock data — Sofa vs Sofa, Wulmstorf Edition.

const TEAMS = {
  bremen: {
    id: "bremen",
    name: "Team Bremen",
    tag: "BRE",
    motto: "City of legends",
    color: "#ff3b3b",
    color2: "#ffd400",
    members: [
      { id: "karin",  name: "Karin",  role: "Captain",     main: "Mario Kart",   wins: 14, kd: "2.4", quote: "I drift, therefore I win." },
      { id: "elli",   name: "Elli",   role: "Strategist",  main: "Overcooked",   wins: 9,  kd: "1.7", quote: "Onions on the left!" },
      { id: "simon",  name: "Simon",  role: "Brawler",     main: "Smash Bros.",  wins: 18, kd: "3.1", quote: "Down B, every time." },
      { id: "nicole", name: "Nicole", role: "Sniper",      main: "Splatoon 3",   wins: 11, kd: "2.0", quote: "Ink it 'til you sink it." },
      { id: "philip", name: "Philip", role: "Wildcard",    main: "Gang Beasts",  wins: 7,  kd: "0.9", quote: "Hugs are a strategy." },
    ],
  },
  wulmstorf: {
    id: "wulmstorf",
    name: "Team Wulmstorf",
    tag: "WUL",
    motto: "Couch kings & queens",
    color: "#3a4cff",
    color2: "#19e6c8",
    members: [
      { id: "kat",    name: "Kat",    role: "Captain",      main: "Rocket League", wins: 16, kd: "2.6", quote: "Aerial or nothing." },
      { id: "kili",   name: "Kili",   role: "Speedrunner",  main: "Mario Kart",    wins: 13, kd: "2.1", quote: "Blue shell-proof." },
      { id: "flo",    name: "Flo",    role: "Tactician",    main: "GeoGuessr",     wins: 10, kd: "1.5", quote: "I smell the asphalt." },
      { id: "dennis", name: "Dennis", role: "Sharpshooter", main: "Splatoon 3",    wins: 11, kd: "2.3", quote: "Aim small, miss small." },
    ],
  },
};

const GAME_POOL = [
  { id: "mariokart",    name: "Mario Kart 8",                        category: "Racing",    players: "4 vs 4",       duration: 25, art: "🏁" },
  { id: "rocketleague", name: "Rocket League",                       category: "Racing",    players: "3 vs 3",       duration: 20, art: "🚗" },
  { id: "wreckfest",    name: "Wreckfest",                           category: "Racing",    players: "3 vs 3",       duration: 20, art: "💥" },
  { id: "smash",        name: "Super Smash Bros.",                   category: "Fighting",  players: "4 vs 4",       duration: 30, art: "👊" },
  { id: "nidhogg",      name: "Nidhogg",                             category: "Fighting",  players: "1 vs 1",       duration: 10, art: "⚔️" },
  { id: "towerfall",    name: "Towerfall",                           category: "Fighting",  players: "2 vs 2",       duration: 15, art: "🏹" },
  { id: "marioparty",   name: "Mario Party",                         category: "Party",     players: "2 vs 2",       duration: 35, art: "🎲" },
  { id: "overcooked",   name: "Overcooked 2",                        category: "Party",     players: "4 vs 4",       duration: 20, art: "🍳" },
  { id: "gangbeasts",   name: "Gang Beasts",                         category: "Party",     players: "4 vs 4",       duration: 15, art: "🤼" },
  { id: "splatoon",     name: "Splatoon 3",                          category: "Shooter",   players: "4 vs 4",       duration: 25, art: "🦑" },
  { id: "tmnt",         name: "Ninja Turtles: Shredder's Revenge",   category: "Arcade",    players: "Co-op Run",    duration: 30, art: "🐢" },
  { id: "ktane",        name: "Keep Talking & Nobody Explodes",      category: "Party II",  players: "Co-op",        duration: 15, art: "💣" },
  { id: "geoguessr",    name: "GeoGuessr",                           category: "Party II",  players: "Team vs Team", duration: 20, art: "🌍" },
  { id: "uch",          name: "Ultimate Chicken Horse",              category: "Party III", players: "Team Run",     duration: 25, art: "🐔" },
  { id: "worms",        name: "Worms",                               category: "Strategy",  players: "Team vs Team", duration: 20, art: "🪱" },
  { id: "trickytowers", name: "Tricky Towers",                       category: "Puzzle",    players: "4 vs 4",       duration: 20, art: "🧱" },
];

// Pick & Ban state — mid-flow, bans complete, picks in progress.
const PICKBAN_STATE = {
  bans: [],
  picks: [],
  currentStep: 0,
};

const JOKER_DEFS = [
  { id: "j1", name: "Wildcard",  icon: "🃏", color: "#7c3aed", desc: "Platzhalter — Effekt TBD" },
  { id: "j2", name: "Redo",      icon: "↩️", color: "#06b6d4", desc: "Platzhalter — Effekt TBD" },
  { id: "j3", name: "Freeze",    icon: "❄️", color: "#3b82f6", desc: "Platzhalter — Effekt TBD" },
  { id: "j4", name: "Double",    icon: "✌️", color: "#ec4899", desc: "Platzhalter — Effekt TBD" },
  { id: "j5", name: "Steal",     icon: "🎯", color: "#f97316", desc: "Platzhalter — Effekt TBD" },
  { id: "j6", name: "Chaos",     icon: "💀", color: "#ef4444", desc: "Platzhalter — Effekt TBD" },
];

const SHOP_ITEMS = [
  { id: "snack-s",  name: "Snack Pack S",          price: 5,  icon: "🍿", desc: "Chips & gummy bears" },
  { id: "snack-m",  name: "Snack Pack M",          price: 10, icon: "🍕", desc: "Pizza slice + drink" },
  { id: "snack-l",  name: "Snack Pack L",          price: 15, icon: "🍔", desc: "Full burger combo" },
  { id: "cook",     name: "Enemy Cooks for You",   price: 10, icon: "👨‍🍳", desc: "Other team prepares your meal" },
  { id: "massage",  name: "Loser Team Massage",    price: 40, icon: "💆", desc: "Losing team massages winning team" },
];

const POINT_ACTIONS = [
  { name: "Fastest Round",      points: 10, icon: "⚡" },
  { name: "MVP of Match",       points: 15, icon: "👑" },
  { name: "Comeback King/Queen",points: 5,  icon: "🔥" },
  { name: "Best Trash Talk",    points: 3,  icon: "🎤" },
];

// Live ledger — recent scoring events.
const LEDGER = [
  { team: "bremen",    player: "Simon",  action: "MVP of Match",       points: 3, game: "Smash Bros.",   t: "21:14" },
  { team: "wulmstorf", player: "Kat",    action: "Fastest Round",      points: 5, game: "Rocket League", t: "21:02" },
  { team: "bremen",    player: "Karin",  action: "Comeback Queen",     points: 5, game: "Mario Kart",    t: "20:48" },
  { team: "wulmstorf", player: "Kili",   action: "Best Trash Talk",    points: 1, game: "Mario Kart",    t: "20:41" },
  { team: "bremen",    player: "Elli",   action: "Best Trash Talk",    points: 1, game: "Smash Bros.",   t: "20:35" },
  { team: "wulmstorf", player: "Flo",    action: "MVP of Match",       points: 3, game: "Rocket League", t: "20:22" },
];

// Round results so far.
const ROUND_RESULTS = [
  { round: 1, game: "Mario Kart 8",       winner: "wulmstorf", score: "BRE 2 — 3 WUL", pts: 1 },
  { round: 2, game: "Super Smash Bros.",  winner: "bremen",    score: "BRE 4 — 1 WUL", pts: 2 },
  { round: 3, game: "Rocket League",      winner: "wulmstorf", score: "BRE 1 — 4 WUL", pts: 3 },
];

// Compute aggregate scores.
const TEAM_SCORES = (() => {
  const s = { bremen: { rounds: 0, shop: 0 }, wulmstorf: { rounds: 0, shop: 0 } };
  ROUND_RESULTS.forEach((r) => { s[r.winner].rounds += r.pts; });
  LEDGER.forEach((e) => { s[e.team].shop += e.points; });
  s.bremen.shop    -= 5; // bought Snack Pack S
  s.wulmstorf.shop -= 5; // bought Snack Pack S
  return s;
})();

// Seed purchase history for the shop.
const INITIAL_PURCHASES = [
  { team: "bremen",    item: { icon: "🍿", name: "Snack Pack S" }, price: 5 },
  { team: "wulmstorf", item: { icon: "🍿", name: "Snack Pack S" }, price: 5 },
];

window.SVS_DATA = {
  TEAMS,
  GAME_POOL,
  PICKBAN_STATE,
  SHOP_ITEMS,
  POINT_ACTIONS,
  LEDGER,
  ROUND_RESULTS,
  TEAM_SCORES,
  INITIAL_PURCHASES,
};
