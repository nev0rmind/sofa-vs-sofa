PRAGMA journal_mode=WAL;
PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS teams (
  id    TEXT PRIMARY KEY,
  name  TEXT NOT NULL,
  tag   TEXT NOT NULL,
  motto TEXT,
  color TEXT,
  color2 TEXT
);

CREATE TABLE IF NOT EXISTS players (
  id        TEXT PRIMARY KEY,
  team_id   TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name      TEXT NOT NULL,
  role      TEXT,
  main_game TEXT,
  wins      INTEGER DEFAULT 0,
  kd        TEXT    DEFAULT '0.0',
  quote     TEXT
);

CREATE TABLE IF NOT EXISTS games (
  id       TEXT PRIMARY KEY,
  name     TEXT NOT NULL,
  category TEXT,
  players  TEXT,
  duration INTEGER,
  art      TEXT
);

CREATE TABLE IF NOT EXISTS rounds (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  round_number  INTEGER NOT NULL UNIQUE,
  game_id       TEXT REFERENCES games(id),
  winner_team   TEXT REFERENCES teams(id),
  score         TEXT,
  points        INTEGER,
  played_at     DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pickban (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  step_number  INTEGER NOT NULL UNIQUE,
  action       TEXT    NOT NULL CHECK(action IN ('ban','pick')),
  team_id      TEXT    REFERENCES teams(id),
  game_id      TEXT    REFERENCES games(id),
  round_number INTEGER,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ledger (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id     TEXT REFERENCES teams(id),
  player_id   TEXT REFERENCES players(id),
  action      TEXT    NOT NULL,
  points      INTEGER NOT NULL,
  game        TEXT,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shop_purchases (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id      TEXT REFERENCES teams(id),
  item_id      TEXT NOT NULL,
  item_name    TEXT NOT NULL,
  item_icon    TEXT,
  price        INTEGER NOT NULL,
  purchased_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jokers (
  id          TEXT PRIMARY KEY,
  name        TEXT    NOT NULL,
  icon        TEXT,
  color       TEXT,
  description TEXT,
  used        INTEGER DEFAULT 0,
  used_by     TEXT REFERENCES teams(id),
  used_at     DATETIME
);
