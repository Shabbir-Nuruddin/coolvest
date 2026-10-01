const keys = [
  "Your roster already bends around the heat",
  "Talk to us about a pilot",
  "Section 08 / Contact",
  "Build note: no company contact details",
  "Four kinds of shift this is aimed at",
  "What we test, and in what order",
  "What your site needs between shifts",
  "What independent testing says about this category",
  "What we have not proven yet",
  "Where it stands",
  "Section 04 / Evidence",
];

fetch("http://localhost:3001")
  .then((r) => r.text())
  .then((t) => {
    keys.forEach((k) => console.log(t.includes(k) ? "YES" : "NO ", "|", k));
    console.log("LEN", t.length);
    const anchors = [...t.matchAll(/id="([a-z]+)"/g)].map((m) => m[1]);
    console.log("anchors:", anchors.join(","));
  })
  .catch((e) => console.log("ERR", e.message));
