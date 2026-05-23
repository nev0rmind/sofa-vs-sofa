const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new Database(path.join(__dirname, 'tournament.db'));
db.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));

// Teams
db.prepare(`INSERT OR IGNORE INTO teams VALUES (?,?,?,?,?,?)`).run('bremen',    'Team Bremen',    'BRE', 'City of legends',       '#ff3b3b', '#ffd400');
db.prepare(`INSERT OR IGNORE INTO teams VALUES (?,?,?,?,?,?)`).run('wulmstorf', 'Team Wulmstorf', 'WUL', 'Couch kings & queens',  '#3a4cff', '#19e6c8');

// Players — Bremen
const insPlayer = db.prepare(`INSERT OR IGNORE INTO players VALUES (?,?,?,?,?,?,?,?)`);
insPlayer.run('karin',  'bremen',    'Karin',  'Captain',      'Mario Kart',    14, '2.4', 'I drift, therefore I win.');
insPlayer.run('elli',   'bremen',    'Elli',   'Strategist',   'Overcooked',     9, '1.7', 'Onions on the left!');
insPlayer.run('simon',  'bremen',    'Simon',  'Brawler',      'Smash Bros.',   18, '3.1', 'Down B, every time.');
insPlayer.run('nicole', 'bremen',    'Nicole', 'Sniper',       'Splatoon 3',    11, '2.0', "Ink it 'til you sink it.");
insPlayer.run('philip', 'bremen',    'Philip', 'Wildcard',     'Gang Beasts',    7, '0.9', 'Hugs are a strategy.');
// Players — Wulmstorf
insPlayer.run('kat',    'wulmstorf', 'Kat',    'Captain',      'Rocket League', 16, '2.6', 'Aerial or nothing.');
insPlayer.run('kili',   'wulmstorf', 'Kili',   'Speedrunner',  'Mario Kart',    13, '2.1', 'Blue shell-proof.');
insPlayer.run('flo',    'wulmstorf', 'Flo',    'Tactician',    'GeoGuessr',     10, '1.5', 'I smell the asphalt.');
insPlayer.run('dennis', 'wulmstorf', 'Dennis', 'Sharpshooter', 'Splatoon 3',    11, '2.3', 'Aim small, miss small.');

// Games
const insGame = db.prepare(`INSERT OR IGNORE INTO games VALUES (?,?,?,?,?,?)`);
insGame.run('mariokart',    'Mario Kart 8',                       'Racing',    '4 vs 4',       25, '🏁');
insGame.run('rocketleague', 'Rocket League',                      'Racing',    '3 vs 3',       20, '🚗');
insGame.run('wreckfest',    'Wreckfest',                          'Racing',    '3 vs 3',       20, '💥');
insGame.run('smash',        'Super Smash Bros.',                  'Fighting',  '4 vs 4',       30, '👊');
insGame.run('nidhogg',      'Nidhogg',                            'Fighting',  '1 vs 1',       10, '⚔️');
insGame.run('towerfall',    'Towerfall',                          'Fighting',  '2 vs 2',       15, '🏹');
insGame.run('marioparty',   'Mario Party',                        'Party',     '2 vs 2',       35, '🎲');
insGame.run('overcooked',   'Overcooked 2',                       'Party',     '4 vs 4',       20, '🍳');
insGame.run('gangbeasts',   'Gang Beasts',                        'Party',     '4 vs 4',       15, '🤼');
insGame.run('splatoon',     'Splatoon 3',                         'Shooter',   '4 vs 4',       25, '🦑');
insGame.run('tmnt',         "Ninja Turtles: Shredder's Revenge",  'Arcade',    'Co-op Run',    30, '🐢');
insGame.run('ktane',        'Keep Talking & Nobody Explodes',     'Party II',  'Co-op',        15, '💣');
insGame.run('geoguessr',    'GeoGuessr',                          'Party II',  'Team vs Team', 20, '🌍');
insGame.run('uch',          'Ultimate Chicken Horse',             'Party III', 'Team Run',     25, '🐔');
insGame.run('worms',        'Worms',                              'Strategy',  'Team vs Team', 20, '🪱');
insGame.run('trickytowers', 'Tricky Towers',                      'Puzzle',    '4 vs 4',       20, '🧱');

// Jokers
const insJoker = db.prepare(`INSERT OR IGNORE INTO jokers VALUES (?,?,?,?,?,0,NULL,NULL)`);
insJoker.run('j1', 'Wildcard', '🃏', '#7c3aed', 'Effect TBD');
insJoker.run('j2', 'Redo',     '↩️', '#06b6d4', 'Effect TBD');
insJoker.run('j3', 'Freeze',   '❄️', '#3b82f6', 'Effect TBD');
insJoker.run('j4', 'Double',   '✌️', '#ec4899', 'Effect TBD');
insJoker.run('j5', 'Steal',    '🎯', '#f97316', 'Effect TBD');
insJoker.run('j6', 'Chaos',    '💀', '#ef4444', 'Effect TBD');

console.log('Database seeded.');
db.close();
