/* Dwello house illustrations.
   Usage in a post/reel HTML (one folder deep):
     <script src="../brand/houses.js"></script>
     <div class="house" data-type="cottage" data-seed="3" data-sign="FOR SALE" data-stamp="REJECTED" data-tape="1" data-worn="1"></div>
   Types: cottage, modern, townhouses, units, frame, block (empty land)
   Options: data-seed (colour variety), data-sign (sign on a post), data-stamp (red rubber stamp across),
            data-tape (hazard tape), data-worn (cracks, weeds, crooked shutter), data-frame (0-1 build progress for "frame"),
            data-bare (no panel/sky background, transparent), data-fit="slice" (fill a tall/narrow box by cropping the sides).
   Colours: houses use fixed realistic paint colours; panel, ground and sun use theme tokens from themes.css. */
(function () {
  const INK = "#10233a";
  const WALLS = ["#f4efe6", "#dfe8ee", "#ead8c2", "#cfdfd4", "#f1e3c4", "#e6dff0"];
  const ROOFS = ["#3b4450", "#9b4a32", "#56656e", "#2f3a45", "#7a3e2c"];
  const DOORS = ["#d94a2b", "#0b6b55", "#e0a81c", "#3e6fa8", "#7b4fa8"];
  const GLASS = "#a9d3e6";

  function rng(seed) { let s = (seed * 9301 + 49297) % 233280 || 1; return () => (s = (s * 9301 + 49297) % 233280) / 233280; }
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  const S = `stroke="${INK}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;

  function win(x, y, w, h, extra) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${GLASS}" ${S}/>` +
      `<line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" ${S}/>` +
      `<line x1="${x}" y1="${y + h / 2}" x2="${x + w}" y2="${y + h / 2}" ${S}/>` + (extra || "");
  }
  function door(x, y, w, h, c) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${c}" ${S}/><circle cx="${x + w - 14}" cy="${y + h / 2}" r="5" fill="${INK}"/>`;
  }
  function tree(x, g, r) {
    const s = 0.8 + r() * 0.5;
    return `<rect x="${x - 8}" y="${g - 110 * s}" width="16" height="${110 * s}" fill="#7a5233" ${S}/>` +
      `<circle cx="${x}" cy="${g - 130 * s}" r="${62 * s}" fill="#3f9a62" ${S}/>` +
      `<circle cx="${x - 40 * s}" cy="${g - 95 * s}" r="${40 * s}" fill="#4cae70" ${S}/>`;
  }
  function weeds(x, g) {
    let o = ""; for (let i = 0; i < 5; i++) { const a = x + i * 14; o += `<path d="M${a} ${g} q -6 -26 -14 -34 M${a} ${g} q 4 -30 12 -38" fill="none" stroke="#3f7f4f" stroke-width="5" stroke-linecap="round"/>`; }
    return o;
  }

  const TYPES = {
    cottage(r, o, G) {
      const wall = pick(r, WALLS), roof = pick(r, ROOFS), dc = pick(r, DOORS);
      const x = 230, w = 340, h = 190, y = G - h;
      let s = `<rect x="${x + 230}" y="${y - 120}" width="40" height="80" fill="${roof}" ${S}/>`;
      s += `<polygon points="${x - 30},${y + 6} ${x + w / 2},${y - 130} ${x + w + 30},${y + 6}" fill="${roof}" ${S}/>`;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${wall}" ${S}/>`;
      for (let i = 1; i < 6; i++) s += `<line x1="${x + 4}" y1="${y + i * 32}" x2="${x + w - 4}" y2="${y + i * 32}" stroke="${INK}" stroke-opacity=".18" stroke-width="3"/>`;
      s += win(x + 30, y + 40, 90, 80) + win(x + w - 120, y + 40, 90, 80) + door(x + w / 2 - 35, y + 70, 70, 120, dc);
      s += `<rect x="${x - 20}" y="${y - 6}" width="${w + 40}" height="16" fill="#ffffff" ${S}/>`;
      s += `<line x1="${x - 10}" y1="${y + 10}" x2="${x - 10}" y2="${G}" ${S}/><line x1="${x + w + 10}" y1="${y + 10}" x2="${x + w + 10}" y2="${G}" ${S}/>`;
      if (o.worn) {
        s += `<path d="M${x + 40} ${y + 140} l 20 18 l -8 14 l 18 16" fill="none" ${S}/>`;
        s += `<path d="M${x + w - 60} ${y + 20} l -14 26 l 12 10" fill="none" ${S}/>`;
        s += `<rect x="${x + w - 128}" y="${y + 36}" width="22" height="88" fill="${roof}" transform="rotate(12 ${x + w - 117} ${y + 80})" ${S}/>`;
        s += weeds(x - 60, G) + weeds(x + w + 20, G);
      }
      return s;
    },
    modern(r, o, G) {
      const wall = pick(r, ["#f4f4f1", "#e7ebee", "#ece6dc"]), clad = pick(r, ["#6b4f3a", "#3b4450", "#8a6a4f"]), dc = pick(r, DOORS);
      let s = `<rect x="200" y="${G - 300}" width="260" height="300" fill="${wall}" ${S}/>`;
      s += `<rect x="440" y="${G - 200}" width="200" height="200" fill="${clad}" ${S}/>`;
      for (let i = 1; i < 6; i++) s += `<line x1="${440 + i * 33}" y1="${G - 196}" x2="${440 + i * 33}" y2="${G - 4}" stroke="#000" stroke-opacity=".18" stroke-width="3"/>`;
      s += `<rect x="186" y="${G - 316}" width="288" height="18" fill="${INK}" ${S}/><rect x="428" y="${G - 214}" width="226" height="16" fill="${INK}" ${S}/>`;
      s += `<rect x="230" y="${G - 270}" width="200" height="110" rx="4" fill="${GLASS}" ${S}/><line x1="330" y1="${G - 270}" x2="330" y2="${G - 160}" ${S}/>`;
      s += door(240, G - 130, 70, 130, dc) + `<rect x="330" y="${G - 120}" width="100" height="90" rx="4" fill="${GLASS}" ${S}/>`;
      s += `<rect x="470" y="${G - 150}" width="140" height="150" fill="#d9dde0" ${S}/>`;
      for (let i = 1; i < 5; i++) s += `<line x1="470" y1="${G - 150 + i * 30}" x2="610" y2="${G - 150 + i * 30}" stroke="${INK}" stroke-opacity=".3" stroke-width="3"/>`;
      return s;
    },
    townhouses(r, o, G) {
      let s = "";
      [[190, pick(r, WALLS), pick(r, DOORS)], [400, pick(r, WALLS), pick(r, DOORS)]].forEach(([x, wall, dc]) => {
        const w = 210, h = 290, y = G - h, roof = pick(r, ROOFS);
        s += `<polygon points="${x - 14},${y + 4} ${x + w / 2},${y - 90} ${x + w + 14},${y + 4}" fill="${roof}" ${S}/>`;
        s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${wall}" ${S}/>`;
        s += win(x + 30, y + 30, 70, 70) + win(x + 115, y + 30, 70, 70);
        s += `<line x1="${x}" y1="${y + 140}" x2="${x + w}" y2="${y + 140}" ${S}/>`;
        s += door(x + 30, y + 170, 64, 120, dc) + win(x + 115, y + 175, 70, 70);
      });
      return s;
    },
    units(r, o, G) {
      const wall = pick(r, ["#e9d2bb", "#d8c3a8", "#efe4d4"]), roof = pick(r, ROOFS);
      const x = 170, w = 460, h = 300, y = G - h;
      let s = `<rect x="${x - 14}" y="${y - 22}" width="${w + 28}" height="26" fill="${roof}" ${S}/>`;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${wall}" ${S}/>`;
      for (let row = 0; row < 2; row++) for (let i = 0; i < 4; i++) {
        const wx = x + 26 + i * 110, wy = y + 26 + row * 145;
        s += (i % 2 === 0) ? win(wx, wy, 80, 72) : door(wx + 10, wy + 4, 60, 110, pick(r, DOORS));
      }
      s += `<rect x="${x - 10}" y="${y + 135}" width="${w + 20}" height="14" fill="#ffffff" ${S}/>`;
      for (let i = 0; i < 9; i++) s += `<line x1="${x + i * 57}" y1="${y + 108}" x2="${x + i * 57}" y2="${y + 135}" ${S}/>`;
      return s;
    },
    frame(r, o, G) {
      const p = o.frame == null ? 0.6 : +o.frame, T = "#d9a35b";
      let s = `<rect x="160" y="${G - 22}" width="480" height="22" fill="#b9b4ab" ${S}/>`;
      const studs = 9, top = G - 22 - 250;
      for (let i = 0; i < studs; i++) { if (i / studs > p + 0.15) break; const x = 170 + i * 57; s += `<rect x="${x}" y="${top}" width="14" height="250" fill="${T}" ${S}/>`; }
      s += `<rect x="160" y="${top - 14}" width="${480 * Math.min(1, p + 0.2)}" height="16" fill="${T}" ${S}/>`;
      if (p > 0.5) for (let i = 0; i < 4; i++) { const x = 160 + i * 120; s += `<polyline points="${x},${top - 14} ${x + 60},${top - 110} ${x + 120},${top - 14}" fill="none" stroke="${T}" stroke-width="12" stroke-linejoin="round"/><polyline points="${x},${top - 14} ${x + 60},${top - 110} ${x + 120},${top - 14}" fill="none" ${S} stroke-width="3"/>`; }
      s += `<rect x="600" y="${top - 40}" width="10" height="${G - top + 40}" fill="#9aa3ab" ${S}/><rect x="690" y="${top - 40}" width="10" height="${G - top + 40}" fill="#9aa3ab" ${S}/>`;
      for (let i = 0; i < 4; i++) s += `<line x1="600" y1="${top - 30 + i * 80}" x2="700" y2="${top - 30 + i * 80}" ${S}/>`;
      return s;
    },
    block(r, o, G) {
      let s = `<polygon points="120,${G} 220,${G - 40} 600,${G - 40} 700,${G}" fill="#b5cf8f" ${S}/>`;
      s += `<line x1="410" y1="${G - 40}" x2="410" y2="${G}" stroke="${INK}" stroke-width="5" stroke-dasharray="14 12"/>`;
      for (let i = 0; i < 4; i++) s += `<rect x="${180 + i * 150}" y="${G - 56}" width="10" height="40" fill="#e0a81c" ${S}/>`;
      return s;
    }
  };

  function sign(text, G) {
    const fs = text.length > 8 ? 26 : 32, w = Math.max(160, text.length * fs * 0.7 + 40), c = Math.min(700, 772 - w / 2);
    return `<line x1="${c}" y1="${G}" x2="${c}" y2="${G - 190}" stroke="#7a5233" stroke-width="12"/>` +
      `<rect x="${c - w / 2}" y="${G - 250}" width="${w}" height="70" rx="6" fill="#ffffff" ${S}/>` +
      `<rect x="${c - w / 2 + 8}" y="${G - 242}" width="${w - 16}" height="54" rx="4" fill="#d94a2b"/>` +
      `<text x="${c}" y="${G - 205}" text-anchor="middle" font-family="Inter, sans-serif" font-weight="900" font-size="${fs}" fill="#ffffff">${text}</text>`;
  }
  function stamp(text) {
    const fs = text.length > 10 ? 50 : 72, w = text.length * fs * 0.7 + 60;
    return `<g transform="rotate(-12 400 250)" opacity=".92"><rect x="${400 - w / 2}" y="${250 - fs * 0.85}" width="${w}" height="${fs * 1.5}" rx="10" fill="none" stroke="#d62d1f" stroke-width="12"/>` +
      `<text x="400" y="${250 + fs * 0.32}" text-anchor="middle" font-family="Inter, sans-serif" font-weight="900" font-size="${fs}" fill="#d62d1f" letter-spacing="4">${text}</text></g>`;
  }
  function tape(G) {
    const y = G - 120;
    return `<defs><pattern id="hz" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="20" height="40" fill="#f2c230"/><rect x="20" width="20" height="40" fill="#10233a"/></pattern></defs>` +
      `<rect x="40" y="${y}" width="720" height="34" fill="url(#hz)" ${S} transform="rotate(-6 400 ${y})"/>`;
  }

  function draw(el) {
    const d = el.dataset, type = TYPES[d.type] ? d.type : "cottage", r = rng(+d.seed || 1), G = 440;
    const o = { worn: d.worn === "1", frame: d.frame };
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="100%" height="100%" preserveAspectRatio="xMidYMax ${d.fit === "slice" ? "slice" : "meet"}" role="img" aria-label="${type} illustration">`;
    if (d.bare !== "1") {
      s += `<rect x="0" y="0" width="800" height="520" rx="36" fill="var(--card)"/>`;
      s += `<circle cx="${d.type === "frame" ? 84 : 716}" cy="84" r="44" fill="var(--hot)" opacity=".9"/>`;
      s += `<path d="M${(d.type === "frame" ? 560 : 60) + r() * 60} 110 q 30 -34 60 0 q 26 -26 54 0 z" fill="#ffffff" opacity=".7"/>`;
      s += `<rect x="0" y="${G}" width="800" height="80" fill="var(--accent)" opacity=".35"/>`;
    }
    s += `<line x1="20" y1="${G}" x2="780" y2="${G}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`;
    const shift = d.sign ? -70 : 0;
    s += `<g transform="translate(${shift} 0)">`;
    if (type !== "frame" && type !== "block") s += tree(d.sign ? 110 : 90, G, r);
    s += TYPES[type](r, o, G) + `</g>`;
    if (d.sign) s += sign(d.sign, G);
    if (d.tape === "1") s += tape(G);
    if (d.stamp) s += stamp(d.stamp);
    s += `</svg>`;
    el.innerHTML = s;
  }
  function all() { document.querySelectorAll(".house").forEach(draw); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", all); else all();
  window.DwelloHouses = { draw, all };
})();
