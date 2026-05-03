// Landing / invitation page — Y2K Game Show aesthetic.
// Chunky shapes, splats, bold drop-shadows, VT323 + Space Grotesk.

const LC = {
  bg:        "#fef3c7",
  bg2:       "#fffaeb",
  paper:     "#ffffff",
  ink:       "#1a0f00",
  dim:       "#7a6a4a",
  purple:    "#7c3aed",
  cyan:      "#06b6d4",
  red:       "#ef4444",
  green:     "#22c55e",
  pink:      "#ec4899",
  orange:    "#f97316",
  yellow:    "#facc15",
  bremen:    "#ef4444",
  wulmstorf: "#06b6d4",
};

// ─── Primitives ───────────────────────────────────────────────

const LBox = ({ children, style = {}, bg = LC.paper, shadow = 6, radius = 18, rotate = 0 }) => (
  <div style={{
    position: "relative", border: `3px solid ${LC.ink}`, borderRadius: radius,
    background: bg, boxShadow: `${shadow}px ${shadow}px 0 0 ${LC.ink}`,
    transform: rotate ? `rotate(${rotate}deg)` : "none",
    ...style,
  }}>{children}</div>
);

const LSticker = ({ color = LC.yellow, children, style = {} }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", padding: "4px 12px",
    background: color, border: `2px solid ${LC.ink}`, borderRadius: 999,
    fontWeight: 800, fontSize: 12, letterSpacing: 0.5,
    boxShadow: `2px 2px 0 0 ${LC.ink}`, whiteSpace: "nowrap", width: "fit-content",
    ...style,
  }}>{children}</div>
);

const LSplat = ({ color, size = 100, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    <path d="M50 5 L62 22 L82 18 L78 38 L95 50 L78 62 L82 82 L62 78 L50 95 L38 78 L18 82 L22 62 L5 50 L22 38 L18 18 L38 22 Z"
      fill={color} stroke={LC.ink} strokeWidth="3" strokeLinejoin="round"/>
  </svg>
);

const LStar = ({ color, size = 60, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    <path d="M50 5 L60 38 L95 38 L67 58 L78 92 L50 72 L22 92 L33 58 L5 38 L40 38 Z"
      fill={color} stroke={LC.ink} strokeWidth="3" strokeLinejoin="round"/>
  </svg>
);

// ─── Countdown (date TBD) ─────────────────────────────────────

const Countdown = () => {
  const cells = [
    { v: "XX", label: "DAYS", c: LC.purple },
    { v: "XX", label: "HRS",  c: LC.pink   },
    { v: "XX", label: "MIN",  c: LC.cyan   },
    { v: "XX", label: "SEC",  c: LC.orange },
  ];
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {cells.map(c => (
          <div key={c.label} style={{
            background: LC.paper, border: `3px solid ${LC.ink}`, borderRadius: 14,
            boxShadow: `4px 4px 0 ${LC.ink}`, padding: "14px 8px",
            textAlign: "center", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -10, right: -10, width: 24, height: 24, background: c.c, border: `2px solid ${LC.ink}`, borderRadius: "50%" }}/>
            <div style={{ fontFamily: "'VT323', monospace", fontSize: 48, lineHeight: 1, fontWeight: 700, color: c.c }}>{c.v}</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: LC.ink, marginTop: 4, letterSpacing: 1 }}>{c.label}</div>
          </div>
        ))}
      </div>

      <a href="https://doodle.com/meeting/sofa-vs-sofa" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        <div style={{
          padding: "12px 14px",
          background: LC.ink, color: LC.yellow,
          border: `3px solid ${LC.ink}`, borderRadius: 12,
          boxShadow: `4px 4px 0 ${LC.bremen}`,
          fontWeight: 800, fontSize: 13, letterSpacing: 0.5,
          textTransform: "uppercase", textAlign: "center",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <span style={{ fontSize: 16 }}>📅</span>
          Vote the date on Doodle →
        </div>
      </a>

      <div style={{ fontSize: 11, fontWeight: 700, color: LC.ink, textAlign: "center", opacity: 0.85 }}>
        Date TBD — captains, lock it in.
      </div>
    </div>
  );
};

// ─── Team panel ───────────────────────────────────────────────

const TeamPanel = ({ team, color, side }) => (
  <LBox bg={LC.paper} radius={20} shadow={6}>
    <div style={{ padding: 22 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{
          width: 70, height: 70, borderRadius: 14,
          background: color, border: `3px solid ${LC.ink}`,
          display: "grid", placeItems: "center", color: "#fff",
          fontFamily: "'VT323', monospace", fontSize: 44, fontWeight: 700,
          boxShadow: `3px 3px 0 ${LC.ink}`, transform: "rotate(-3deg)",
        }}>{team.tag[0]}</div>
        <div style={{ textAlign: "right" }}>
          <LSticker color={color} style={{ color: "#fff" }}>SIDE {side}</LSticker>
          <div style={{ fontFamily: "'VT323', monospace", fontSize: 32, lineHeight: 1, color, marginTop: 6, fontWeight: 700, whiteSpace: "nowrap" }}>{team.name}</div>
          <div style={{ fontSize: 11, color: LC.dim, fontWeight: 700, fontStyle: "italic" }}>"{team.motto}"</div>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
        {team.members.map(m => (
          <div key={m.id} style={{
            display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "center",
            padding: "8px 10px", background: LC.bg2, border: `2px solid ${LC.ink}`, borderRadius: 10,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: color, color: "#fff",
              fontFamily: "'VT323', monospace", fontSize: 20,
              display: "grid", placeItems: "center", border: `2px solid ${LC.ink}`,
            }}>{m.name[0]}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800 }}>{m.name}</div>
              <div style={{ fontSize: 10, color: LC.dim, fontWeight: 700 }}>{m.role.toUpperCase()}</div>
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, color: LC.dim, textAlign: "right" }}>
              main<br/><span style={{ color: LC.ink, fontSize: 11 }}>{m.main}?</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </LBox>
);

// ─── Info card ────────────────────────────────────────────────

const InfoCard = ({ icon, title, body, color, rotate = 0 }) => (
  <div style={{ transform: `rotate(${rotate}deg)` }}>
    <LBox bg={LC.paper} radius={18} shadow={5}>
      <div style={{ padding: 18, display: "grid", gap: 10 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14, background: color,
          border: `3px solid ${LC.ink}`, boxShadow: `2px 2px 0 ${LC.ink}`,
          display: "grid", placeItems: "center", fontSize: 30,
        }}>{icon}</div>
        <div style={{ fontFamily: "'VT323', monospace", fontSize: 24, lineHeight: 1, fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 12, color: LC.dim, fontWeight: 600, lineHeight: 1.45 }}>{body}</div>
      </div>
    </LBox>
  </div>
);

// ─── Prize row ────────────────────────────────────────────────

const PrizeRow = ({ icon, name, points, color }) => (
  <div style={{
    display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "center",
    padding: "10px 12px", background: LC.paper,
    border: `3px solid ${LC.ink}`, borderRadius: 12, boxShadow: `3px 3px 0 ${LC.ink}`,
    borderLeft: `12px solid ${color}`,
  }}>
    <div style={{ fontSize: 24 }}>{icon}</div>
    <div style={{ fontSize: 13, fontWeight: 800 }}>{name}</div>
    <div style={{ fontFamily: "'VT323', monospace", fontSize: 22, fontWeight: 700, color: LC.ink }}>{points}P</div>
  </div>
);

// ─── Landing root ─────────────────────────────────────────────

const LandingApp = () => {
  const data  = window.SVS_DATA;
  const teams = Object.values(data.TEAMS);

  return (
    <div style={{
      minHeight: "100vh", background: LC.bg,
      backgroundImage: `radial-gradient(${LC.purple}22 1.5px, transparent 1.5px)`,
      backgroundSize: "20px 20px",
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
      color: LC.ink, padding: "32px 28px 60px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Decorative background shapes */}
      <LSplat color={LC.pink}  size={140} style={{ position: "absolute", top: 80, left: -40, opacity: 0.7 }}/>
      <LStar  color={LC.green} size={100} style={{ position: "absolute", top: 320, right: -20, transform: "rotate(15deg)" }}/>
      <LSplat color={LC.cyan}  size={110} style={{ position: "absolute", bottom: 200, left: -20, transform: "rotate(20deg)", opacity: 0.6 }}/>
      <LStar  color={LC.yellow} size={70} style={{ position: "absolute", bottom: 80, right: 80 }}/>

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40, height: 40, background: LC.ink, color: LC.yellow,
              border: `3px solid ${LC.ink}`, borderRadius: 10,
              display: "grid", placeItems: "center",
              fontFamily: "'VT323', monospace", fontSize: 22, fontWeight: 700,
            }}>SvS</div>
            <div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: 22, fontWeight: 700, lineHeight: 1 }}>Sofa vs Sofa</div>
              <div style={{ fontSize: 11, color: LC.dim, fontWeight: 700 }}>WULMSTORF EDITION</div>
            </div>
          </div>
          <a href="Sofa vs Sofa.html" style={{ textDecoration: "none" }}>
            <div style={{
              padding: "10px 18px", background: LC.purple, color: "#fff",
              border: `3px solid ${LC.ink}`, borderRadius: 12,
              boxShadow: `4px 4px 0 ${LC.ink}`, fontWeight: 800,
              fontSize: 13, letterSpacing: 0.5, cursor: "pointer", textTransform: "uppercase",
            }}>Open Tournament App →</div>
          </a>
        </div>

        {/* Hero */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32, alignItems: "center", marginBottom: 48 }}>
          <div style={{ position: "relative" }}>
            <LSticker color={LC.purple} style={{ color: "#fff", marginBottom: 16 }}>★ INVITATION ★ NIGHT ONE</LSticker>
            <div style={{
              fontFamily: "'VT323', monospace", fontSize: 120, fontWeight: 900,
              lineHeight: 0.9, letterSpacing: -1, color: LC.ink,
              textShadow: `6px 6px 0 ${LC.yellow}`,
            }}>
              SOFA<br/>
              <span style={{ color: LC.red, fontStyle: "italic", fontSize: 80 }}>vs</span><br/>
              SOFA
            </div>
            <div style={{ marginTop: 22, fontSize: 18, color: LC.ink, fontWeight: 600, lineHeight: 1.4, maxWidth: 480 }}>
              Two couches. Nine players. Six rounds. One bottle of rum.
              Bremen and Wulmstorf throw down for total couch-supremacy and the right
              to pick the drinks for the rest of the night.
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
              <LSticker color={LC.bremen}    style={{ color: "#fff", fontSize: 14, padding: "8px 14px" }}>📍 DATE TBD • VOTE NOW</LSticker>
              <LSticker color={LC.wulmstorf} style={{ color: "#fff", fontSize: 14, padding: "8px 14px" }}>🛋 WULMSTORF HQ</LSticker>
              <LSticker color={LC.green}     style={{ color: "#fff", fontSize: 14, padding: "8px 14px" }}>🍕 SNACKS PROVIDED</LSticker>
            </div>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            <LBox bg={LC.yellow} radius={22} shadow={6}>
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1, color: LC.ink, marginBottom: 12 }}>★ KICKOFF IN ★</div>
                <Countdown/>
              </div>
            </LBox>

            <LBox bg={LC.paper} radius={20} shadow={5}>
              <div style={{ padding: 18 }}>
                <div style={{ fontFamily: "'VT323', monospace", fontSize: 26, fontWeight: 700, lineHeight: 1, marginBottom: 4 }}>You're invited.</div>
                <div style={{ fontSize: 12, color: LC.dim, fontWeight: 600, marginBottom: 14 }}>Tap to confirm — your team captain will know.</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <button style={{
                    padding: "12px", background: LC.green, color: "#fff",
                    border: `3px solid ${LC.ink}`, borderRadius: 12,
                    boxShadow: `3px 3px 0 ${LC.ink}`, fontWeight: 800, fontSize: 13,
                    cursor: "pointer", textTransform: "uppercase", letterSpacing: 0.5, fontFamily: "inherit",
                  }}>✓ I'm in</button>
                  <button style={{
                    padding: "12px", background: LC.paper, color: LC.ink,
                    border: `3px solid ${LC.ink}`, borderRadius: 12,
                    boxShadow: `3px 3px 0 ${LC.ink}`, fontWeight: 800, fontSize: 13,
                    cursor: "pointer", textTransform: "uppercase", letterSpacing: 0.5, fontFamily: "inherit",
                  }}>Maybe</button>
                </div>
                <div style={{ marginTop: 12, padding: "8px 10px", background: LC.bg, borderRadius: 10, border: `2px solid ${LC.ink}`, fontSize: 11, fontWeight: 700, textAlign: "center" }}>
                  9 / 9 players confirmed 🎮
                </div>
              </div>
            </LBox>
          </div>
        </div>

        {/* Lineups */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <LSticker color={LC.cyan} style={{ color: "#fff", marginBottom: 8 }}>★ THE LINEUPS ★</LSticker>
            <div style={{ fontFamily: "'VT323', monospace", fontSize: 56, lineHeight: 1, fontWeight: 700, color: LC.ink }}>The Couches</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 24, alignItems: "start" }}>
            <TeamPanel team={teams[0]} color={LC.bremen}    side="A"/>
            <div style={{
              alignSelf: "center",
              fontFamily: "'VT323', monospace", fontSize: 96, fontWeight: 900, color: LC.ink,
              textShadow: `4px 4px 0 ${LC.yellow}`, transform: "rotate(-4deg)", padding: 16,
            }}>VS</div>
            <TeamPanel team={teams[1]} color={LC.wulmstorf} side="B"/>
          </div>
        </div>

        {/* Format */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <LSticker color={LC.orange} style={{ color: "#fff", marginBottom: 8 }}>★ HOW IT WORKS ★</LSticker>
            <div style={{ fontFamily: "'VT323', monospace", fontSize: 56, lineHeight: 1, fontWeight: 700, color: LC.ink }}>The Format</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            <InfoCard color={LC.purple} icon="🎲" title="6 Rounds"        body="Each round is a different game. Round 1 = 1 point, Round 6 = 6 points. Higher rounds, higher stakes." rotate={-1.5}/>
            <InfoCard color={LC.cyan}   icon="🚫" title="Pick & Ban"      body="Before each round, both teams alternate banning then picking from the pool of 14 games." rotate={1}/>
            <InfoCard color={LC.pink}   icon="⚡" title="Rotating Squads" body="Each game decides how many players face off — Nidhogg is 1v1, Mario Kart is 4v4, and so on." rotate={-0.5}/>
            <InfoCard color={LC.green}  icon="🏆" title="Outside Shop"    body="Earn extra points for MVPs, fastest rounds, comebacks and trash talk. Spend them on snacks & favors." rotate={1.5}/>
          </div>
        </div>

        {/* Outside Shop teaser */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <LBox bg={LC.purple} radius={22} shadow={6}>
              <div style={{ padding: 24, color: "#fff" }}>
                <LSticker color={LC.yellow}>★ EARN POINTS</LSticker>
                <div style={{ fontFamily: "'VT323', monospace", fontSize: 40, lineHeight: 1, fontWeight: 700, marginTop: 8 }}>Be a menace.</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6, opacity: 0.95 }}>Performance points stack into the Outside Shop. Spend or lose them — they expire at midnight.</div>
                <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
                  {data.POINT_ACTIONS.map(a => (
                    <div key={a.name} style={{
                      display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "center",
                      padding: "8px 12px", background: "rgba(255,255,255,0.18)", border: `2px solid ${LC.ink}`, borderRadius: 10,
                    }}>
                      <div style={{ fontSize: 22 }}>{a.icon}</div>
                      <div style={{ fontSize: 13, fontWeight: 800 }}>{a.name}</div>
                      <div style={{ fontFamily: "'VT323', monospace", fontSize: 22, fontWeight: 700 }}>+{a.points}P</div>
                    </div>
                  ))}
                </div>
              </div>
            </LBox>

            <LBox bg={LC.paper} radius={22} shadow={6}>
              <div style={{ padding: 24 }}>
                <LSticker color={LC.orange} style={{ color: "#fff" }}>★ SHOP IT</LSticker>
                <div style={{ fontFamily: "'VT323', monospace", fontSize: 40, lineHeight: 1, fontWeight: 700, marginTop: 8 }}>The goodies.</div>
                <div style={{ fontSize: 13, color: LC.dim, fontWeight: 600, marginTop: 6 }}>Cash in points during breaks for real-world rewards.</div>
                <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
                  {data.SHOP_ITEMS.map((item, i) => (
                    <PrizeRow key={item.id} icon={item.icon} name={item.name} points={item.price}
                      color={[LC.green, LC.cyan, LC.purple, LC.pink, LC.red][i % 5]}/>
                  ))}
                </div>
              </div>
            </LBox>
          </div>
        </div>

        {/* Game pool */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <LSticker color={LC.green} style={{ color: "#fff", marginBottom: 8 }}>★ THE POOL ★</LSticker>
            <div style={{ fontFamily: "'VT323', monospace", fontSize: 56, lineHeight: 1, fontWeight: 700, color: LC.ink }}>{data.GAME_POOL.length} Games on the Menu</div>
          </div>
          <LBox bg={LC.paper} radius={22} shadow={6}>
            <div style={{ padding: 22 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
                {data.GAME_POOL.map((g, i) => (
                  <div key={g.id} style={{
                    padding: 10, background: [LC.bg2, LC.paper][i % 2],
                    border: `3px solid ${LC.ink}`, borderRadius: 12, boxShadow: `2px 2px 0 ${LC.ink}`,
                    textAlign: "center", transform: `rotate(${(i % 3 - 1) * 1.5}deg)`,
                  }}>
                    <div style={{ fontSize: 28 }}>{g.art}</div>
                    <div style={{ fontSize: 10, fontWeight: 800, marginTop: 4, lineHeight: 1.1 }}>{g.name}</div>
                    <div style={{ fontSize: 9, color: LC.dim, fontWeight: 700, marginTop: 2 }}>{g.players}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: "12px 16px", background: LC.yellow, border: `3px solid ${LC.ink}`, borderRadius: 12, fontSize: 13, fontWeight: 700, textAlign: "center" }}>
                💡 Pick & Ban happens live before each round. Captains pick the lineup.
              </div>
            </div>
          </LBox>
        </div>

        {/* House rules */}
        <div style={{ marginBottom: 48 }}>
          <LBox bg={LC.bg2} radius={22} shadow={5}>
            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
                <LSticker color={LC.red} style={{ color: "#fff" }}>★ HOUSE RULES</LSticker>
                <div style={{ fontFamily: "'VT323', monospace", fontSize: 32, lineHeight: 1, fontWeight: 700 }}>Honor among gamers.</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                {[
                  { n: "01", t: "Charge your controllers", b: "Every team brings working, fully-charged hardware. Dead pads = forfeit." },
                  { n: "02", t: "Snacks shared, points earned", b: "Base snacks are free for all. Outside Shop is points-only." },
                  { n: "03", t: "Trash talk welcome", b: "Fair play is honor — but heckling is encouraged. Best line wins +3P." },
                ].map(r => (
                  <div key={r.n} style={{ background: LC.paper, border: `3px solid ${LC.ink}`, borderRadius: 14, boxShadow: `3px 3px 0 ${LC.ink}`, padding: 16 }}>
                    <div style={{ fontFamily: "'VT323', monospace", fontSize: 36, lineHeight: 1, color: LC.purple, fontWeight: 700 }}>{r.n}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, marginTop: 6 }}>{r.t}</div>
                    <div style={{ fontSize: 12, color: LC.dim, fontWeight: 600, marginTop: 6, lineHeight: 1.45 }}>{r.b}</div>
                  </div>
                ))}
              </div>
            </div>
          </LBox>
        </div>

        {/* CTA */}
        <div style={{ position: "relative", marginBottom: 24 }}>
          <LBox bg={LC.ink} radius={24} shadow={6}>
            <div style={{ padding: "36px 28px", textAlign: "center", color: LC.yellow, position: "relative", overflow: "hidden" }}>
              <LStar color={LC.pink} size={80} style={{ position: "absolute", top: 10, left: 30, opacity: 0.4 }}/>
              <LStar color={LC.cyan} size={60} style={{ position: "absolute", bottom: 10, right: 30, opacity: 0.4, transform: "rotate(20deg)" }}/>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: 22, fontWeight: 700, color: LC.yellow, letterSpacing: 2 }}>★ DATE TBD — VOTE ON DOODLE ★</div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: 80, fontWeight: 900, color: "#fff", lineHeight: 1, marginTop: 8 }}>Press start.</div>
              <div style={{ fontSize: 14, color: LC.bg, marginTop: 12, fontWeight: 700 }}>The couches are loaded. The rum is poured. Pick your seat.</div>
              <a href="Sofa vs Sofa.html" style={{ textDecoration: "none" }}>
                <div style={{
                  display: "inline-block", marginTop: 22,
                  padding: "14px 28px", background: LC.yellow, color: LC.ink,
                  border: `3px solid ${LC.yellow}`, borderRadius: 14,
                  boxShadow: `5px 5px 0 ${LC.bremen}`,
                  fontWeight: 800, fontSize: 16, letterSpacing: 1, cursor: "pointer", textTransform: "uppercase",
                }}>▶ Enter the Tournament App</div>
              </a>
            </div>
          </LBox>
        </div>

        <div style={{ textAlign: "center", fontSize: 11, color: LC.dim, fontWeight: 700 }}>
          SOFA vs SOFA — Wulmstorf Edition • Bremen vs Wulmstorf • 2026
        </div>
      </div>
    </div>
  );
};

window.LandingApp = LandingApp;
