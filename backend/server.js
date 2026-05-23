const express = require('express');
const cors    = require('cors');
const Database = require('better-sqlite3');
const fs   = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db', 'tournament.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(fs.readFileSync(path.join(__dirname, 'db', 'schema.sql'), 'utf8'));

const app = express();
app.use(cors());
app.use(express.json());

// ── Helper ───────────────────────────────────────────────────────────────────

const teamScores = () => {
  const rounds = db.prepare(`
    SELECT winner_team AS team, SUM(points) AS pts
    FROM rounds GROUP BY winner_team
  `).all();
  const shop = db.prepare(`
    SELECT team_id AS team, SUM(price) AS spent FROM shop_purchases GROUP BY team_id
  `).all();
  const ledger = db.prepare(`
    SELECT team_id AS team, SUM(points) AS pts FROM ledger GROUP BY team_id
  `).all();
  const score = { bremen: { rounds: 0, shop: 0 }, wulmstorf: { rounds: 0, shop: 0 } };
  rounds.forEach(r => { if (score[r.team]) score[r.team].rounds = r.pts; });
  ledger.forEach(l => { if (score[l.team]) score[l.team].shop += l.pts; });
  shop.forEach(s  => { if (score[s.team]) score[s.team].shop -= s.spent; });
  return score;
};

// ── Full state snapshot ───────────────────────────────────────────────────────

app.get('/api/state', (req, res) => {
  const teams = db.prepare(`SELECT * FROM teams`).all().map(t => ({
    ...t,
    members: db.prepare(`SELECT * FROM players WHERE team_id = ?`).all(t.id),
  }));
  const teamsMap = Object.fromEntries(teams.map(t => [t.id, t]));
  res.json({
    teams:     teamsMap,
    games:     db.prepare(`SELECT * FROM games`).all(),
    rounds:    db.prepare(`SELECT * FROM rounds ORDER BY round_number`).all(),
    pickban:   db.prepare(`SELECT * FROM pickban ORDER BY step_number`).all(),
    ledger:    db.prepare(`SELECT * FROM ledger ORDER BY recorded_at DESC`).all(),
    purchases: db.prepare(`SELECT * FROM shop_purchases ORDER BY purchased_at DESC`).all(),
    jokers:    db.prepare(`SELECT * FROM jokers`).all(),
    scores:    teamScores(),
  });
});

// ── Teams ─────────────────────────────────────────────────────────────────────

app.get('/api/teams', (req, res) => {
  const teams = db.prepare(`SELECT * FROM teams`).all().map(t => ({
    ...t,
    members: db.prepare(`SELECT * FROM players WHERE team_id = ?`).all(t.id),
  }));
  res.json(teams);
});

// ── Games ─────────────────────────────────────────────────────────────────────

app.get('/api/games', (req, res) => {
  res.json(db.prepare(`SELECT * FROM games`).all());
});

// ── Rounds ────────────────────────────────────────────────────────────────────

app.get('/api/rounds', (req, res) => {
  res.json(db.prepare(`SELECT * FROM rounds ORDER BY round_number`).all());
});

app.post('/api/rounds', (req, res) => {
  const { round_number, game_id, winner_team, score, points } = req.body;
  if (!round_number || !game_id || !winner_team || !points) {
    return res.status(400).json({ error: 'round_number, game_id, winner_team, points required' });
  }
  const stmt = db.prepare(`
    INSERT INTO rounds (round_number, game_id, winner_team, score, points)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(round_number) DO UPDATE SET
      game_id=excluded.game_id, winner_team=excluded.winner_team,
      score=excluded.score, points=excluded.points
  `);
  stmt.run(round_number, game_id, winner_team, score ?? null, points);
  res.json({ ok: true, scores: teamScores() });
});

// ── Pick & Ban ────────────────────────────────────────────────────────────────

app.get('/api/pickban', (req, res) => {
  res.json(db.prepare(`SELECT * FROM pickban ORDER BY step_number`).all());
});

app.post('/api/pickban', (req, res) => {
  const { step_number, action, team_id, game_id, round_number } = req.body;
  if (!step_number || !action || !team_id || !game_id) {
    return res.status(400).json({ error: 'step_number, action, team_id, game_id required' });
  }
  db.prepare(`
    INSERT INTO pickban (step_number, action, team_id, game_id, round_number)
    VALUES (?,?,?,?,?)
    ON CONFLICT(step_number) DO NOTHING
  `).run(step_number, action, team_id, game_id, round_number ?? null);
  res.json({ ok: true });
});

app.delete('/api/pickban', (req, res) => {
  db.prepare(`DELETE FROM pickban`).run();
  res.json({ ok: true });
});

// ── Ledger ────────────────────────────────────────────────────────────────────

app.get('/api/ledger', (req, res) => {
  res.json(db.prepare(`SELECT * FROM ledger ORDER BY recorded_at DESC`).all());
});

app.post('/api/ledger', (req, res) => {
  const { team_id, player_id, action, points, game } = req.body;
  if (!team_id || !action || points === undefined) {
    return res.status(400).json({ error: 'team_id, action, points required' });
  }
  const row = db.prepare(`
    INSERT INTO ledger (team_id, player_id, action, points, game)
    VALUES (?,?,?,?,?)
  `).run(team_id, player_id ?? null, action, points, game ?? null);
  res.json({ ok: true, id: row.lastInsertRowid, scores: teamScores() });
});

// ── Shop ──────────────────────────────────────────────────────────────────────

app.get('/api/shop', (req, res) => {
  res.json({
    purchases: db.prepare(`SELECT * FROM shop_purchases ORDER BY purchased_at DESC`).all(),
    scores:    teamScores(),
  });
});

app.post('/api/shop', (req, res) => {
  const { team_id, item_id, item_name, item_icon, price } = req.body;
  if (!team_id || !item_id || !item_name || price === undefined) {
    return res.status(400).json({ error: 'team_id, item_id, item_name, price required' });
  }
  db.prepare(`
    INSERT INTO shop_purchases (team_id, item_id, item_name, item_icon, price)
    VALUES (?,?,?,?,?)
  `).run(team_id, item_id, item_name, item_icon ?? null, price);
  res.json({ ok: true, scores: teamScores() });
});

// ── Jokers ────────────────────────────────────────────────────────────────────

app.get('/api/jokers', (req, res) => {
  res.json(db.prepare(`SELECT * FROM jokers`).all());
});

app.post('/api/jokers/:id/use', (req, res) => {
  const { team_id } = req.body;
  if (!team_id) return res.status(400).json({ error: 'team_id required' });
  const joker = db.prepare(`SELECT * FROM jokers WHERE id = ?`).get(req.params.id);
  if (!joker) return res.status(404).json({ error: 'Joker not found' });
  if (joker.used) return res.status(409).json({ error: 'Joker already used' });
  db.prepare(`UPDATE jokers SET used=1, used_by=?, used_at=CURRENT_TIMESTAMP WHERE id=?`)
    .run(team_id, req.params.id);
  res.json({ ok: true });
});

// ── Scores ────────────────────────────────────────────────────────────────────

app.get('/api/scores', (req, res) => {
  res.json(teamScores());
});

// ── Start ─────────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Sofa vs Sofa backend running on port ${PORT}`));
