/**
 * Scene logic for the /intro demo. The community model (public/intro/community.glb) is built in
 * Blender from a script kept outside the repo; every mesh is one group, styled here by name.
 * `startIntro(root)` wires everything inside `root` and returns a cleanup function.
 */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// Two palettes: the site's cream (light) and its espresso dark mode. Scene colours are
// registered by key (see `tc` below) so switching the theme only re-colours them.
const LIGHT = {
  bg: 0xf9f5ed,
  ink: 0x402f1e,
  brown: 0x5c4a3d,
  gold: 0xae9064,
  water: 0xece2cf,
  road: 0xf2ebde,
  far: 0x7a6350, // far buildings once the darkness rolls in
  hi: 0xeee0c4, // fill of the chapter's highlighted group
};
type Palette = typeof LIGHT;
type Key = keyof Palette;
// Dark mode follows the site's own dark tokens (styles.css `.dark`): espresso, not black.
const DARK: Palette = {
  bg: 0x24180c,
  ink: 0xf8f5ee,
  brown: 0xd3c1ac,
  gold: 0xd8bd8c,
  water: 0x2f2316,
  road: 0x2a1d10,
  far: 0x170d05,
  hi: 0x4a3824,
};
export type IntroTheme = "light" | "dark";

type Style = {
  fill: Key | null;
  edge: Key;
  op: number;
  angle: number;
  hi?: number;
  dark?: boolean;
};
// Per group: fill colour, edge colour/opacity, crease angle; `hi` is the chapter that lights it in gold.
const STYLE: Record<string, Style> = {
  ground: { fill: "bg", edge: "gold", op: 0.5, angle: 80 },
  water_lagoon: { fill: "water", edge: "gold", op: 0.9, angle: 80, hi: 2 },
  water_river: { fill: "water", edge: "gold", op: 0.9, angle: 80, hi: 2 },
  islands: { fill: "bg", edge: "brown", op: 0.7, angle: 80, hi: 2 },
  roads: { fill: "road", edge: "gold", op: 0.35, angle: 80 },
  villas: { fill: "bg", edge: "brown", op: 0.62, angle: 30, hi: 1, dark: true },
  villas_gold: { fill: "bg", edge: "brown", op: 0.62, angle: 30, hi: 4, dark: true },
  townhouses: { fill: "bg", edge: "brown", op: 0.62, angle: 30, hi: 1, dark: true },
  pools: { fill: "water", edge: "gold", op: 0.8, angle: 30, hi: 2 },
  clubhouse: { fill: "bg", edge: "ink", op: 0.75, angle: 12, hi: 3, dark: true },
  palms: { fill: null, edge: "brown", op: 0.5, angle: 1 },
  skyline: { fill: "bg", edge: "ink", op: 0.55, angle: 30, dark: true, hi: 5 },
  trees: { fill: "bg", edge: "brown", op: 0.38, angle: 20, dark: true },
  pier: { fill: "bg", edge: "gold", op: 0.8, angle: 30, hi: 2 },
  cabanas: { fill: "bg", edge: "brown", op: 0.6, angle: 30, hi: 2 },
};

// Camera keyframes over the model (lagoon A at x -130 z -40, lagoon B at 125/-95, clubhouse at
// 30/55, river around z 150, townhouses z 215-295, skyline z 460-600).
const KEYS: [number, number, number][][] = [
  [
    [0, 330, -560],
    [0, 10, 120],
  ], // hero: the whole master plan, ASCII on top
  [
    [-300, 230, -300],
    [-40, 0, 10],
  ], // 01 portfolio: oblique over villas and townhouses
  [
    [230, 45, -200],
    [120, 0, -90],
  ], // 02 locations: low over lagoon B
  [
    [105, 30, 128],
    [30, 8, 55],
  ], // 03 consultancy: the clubhouse roof from the river side
  [
    [-130, 250, -170],
    [-130, 0, -40],
  ], // 04 matches: above the gold ring of villas
  [
    [-70, 34, 110],
    [0, 110, 560],
  ], // 05 investment: from the river towards the skyline
  [
    [0, 300, 120],
    [-110, 470, 1150],
  ], // final: rise above the skyline to the moon
];

const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
const q = <T extends Element>(root: Element, sel: string) => root.querySelector<T>(sel)!;

// Shared vertex shader. With INST defined the geometry is drawn once per instance, placed by
// iOff = (x, z, height scale, width scale): used for the thousands of trees.
const VERTEX = `
  #ifdef INST
  attribute vec4 iOff;
  #endif
  varying float vDepth;
  void main() {
    vec3 p = position;
    #ifdef INST
    p = p * vec3(iOff.w, iOff.z, iOff.w) + vec3(iOff.x, 0.0, iOff.y);
    #endif
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }`;

/** One low-poly tree (trunk + faceted canopy), 7 units tall with a canopy radius of 3. */
function baseTree() {
  const trunk = new THREE.CylinderGeometry(0.35, 0.35, 3.15, 3)
    .translate(0, 1.575, 0)
    .toNonIndexed();
  const crown = new THREE.IcosahedronGeometry(3, 0).scale(1, 0.85, 1).translate(0, 5.25, 0);
  for (const g of [trunk, crown]) {
    g.deleteAttribute("normal");
    g.deleteAttribute("uv");
  }
  return mergeGeometries([trunk, crown])!;
}

export function startIntro(root: HTMLElement): () => void {
  const story = q<HTMLElement>(root, ".intro3d-story");
  // Phones and tablets: lighter geometry and slower text effects (decided once, at start).
  const lite = matchMedia("(max-width: 700px), (pointer: coarse)").matches;
  // Reduced motion: the CSS shortens the story to one screen; here the text effects and
  // parallax stay still (the ASCII word is drawn once, headings appear without scrambling).
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = q<HTMLCanvasElement>(root, ".intro3d-canvas");
  // High-density screens are already sharp: skip MSAA there (a big cost on phones).
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: devicePixelRatio < 2,
    powerPreference: "high-performance",
  });
  // Render on demand: only when the camera, a highlight or the theme actually changes.
  let dirty = true;
  const scene = new THREE.Scene();
  let pal: Palette = root.dataset["theme"] === "dark" ? DARK : LIGHT;
  const themed: { color: THREE.Color; key: Key }[] = [];
  const reg = (color: THREE.Color, key: Key) => (themed.push({ color, key }), color);
  const tc = (key: Key) => reg(new THREE.Color(pal[key]), key);
  const fog = new THREE.FogExp2(pal.bg, 0.0012);
  reg(fog.color, "bg");
  scene.background = tc("bg");
  scene.fog = fog;
  // Near plane at 5 keeps depth precision high, so ground, roads and water never shimmer.
  const camera = new THREE.PerspectiveCamera(50, 1, 5, 4200);

  let seed = 5;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const lineMat = (key: Key, opacity: number, fog = true) => {
    const m = new THREE.LineBasicMaterial({ transparent: true, opacity, fog });
    reg(m.color, key).set(pal[key]);
    return m;
  };
  // Model edges, with uniforms the chapter highlights drive, and manual fog.
  const edgeMat = (key: Key, opacity: number, inst = false) =>
    new THREE.ShaderMaterial({
      defines: inst ? { INST: "" } : {},
      transparent: true,
      uniforms: {
        uColor: { value: tc(key) },
        uOpacity: { value: opacity },
        uBg: { value: tc("bg") },
        uDensity: { value: 0.0012 },
      },
      vertexShader: VERTEX,
      fragmentShader: `
        uniform vec3 uColor; uniform float uOpacity; uniform vec3 uBg; uniform float uDensity;
        varying float vDepth;
        void main() {
          float fog = 1.0 - exp(-uDensity * uDensity * vDepth * vDepth);
          gl_FragColor = vec4(mix(uColor, uBg, fog), uOpacity);
        }`,
    });
  // Fills: background-coloured, hiding the lines behind like a drawing. `uFront` (the depth where
  // fills would turn brown) is kept out of reach: the far darkening is switched off.
  const uFront = { value: 9000 };
  const fillMat = (base: Key, canDark: boolean, inst = false) =>
    new THREE.ShaderMaterial({
      defines: inst ? { INST: "" } : {},
      uniforms: {
        uFront,
        uDark: { value: tc("far") },
        uBg: { value: tc("bg") },
        uDensity: { value: 0.0012 },
        uBase: { value: tc(base) },
        uCanDark: { value: canDark ? 1 : 0 },
        uHi: { value: 0 },
        uHiColor: { value: tc("hi") },
      },
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      side: THREE.DoubleSide,
      vertexShader: VERTEX,
      fragmentShader: `
        uniform float uFront; uniform vec3 uDark; uniform vec3 uBase; uniform vec3 uBg; uniform float uDensity;
        uniform float uCanDark; uniform float uHi; uniform vec3 uHiColor;
        varying float vDepth;
        void main() {
          float dark = smoothstep(uFront, uFront + 220.0, vDepth) * uCanDark * (1.0 - uHi) * 0.7;
          vec3 base = mix(uBase, uHiColor, uHi);
          float fog = 1.0 - exp(-uDensity * uDensity * vDepth * vDepth);
          gl_FragColor = vec4(mix(mix(base, uDark, dark), uBg, fog * (1.0 - dark * 0.8)), 1.0);
        }`,
    });

  // ---- Desert around the site: wireframe dunes and a survey grid.
  const duneSegs = lite ? 56 : 110; // 72k line segments on desktop, a quarter of that on phones
  const dunes = new THREE.PlaneGeometry(3400, 3400, duneSegs, duneSegs);
  dunes.rotateX(-Math.PI / 2);
  const dp = dunes.attributes["position"]!;
  for (let i = 0; i < dp.count; i++) {
    const x = dp.getX(i),
      z = dp.getZ(i),
      d = Math.hypot(x, z);
    const h =
      d < 560
        ? -0.5
        : (Math.sin(x * 0.011) * Math.cos(z * 0.009) * 22 + Math.sin(x * 0.03 + z * 0.02) * 6) *
          Math.min(1, (d - 560) / 200);
    dp.setY(i, z > 380 && Math.abs(x) < 700 ? -0.5 : h); // keep the skyline's ground flat
  }
  scene.add(new THREE.LineSegments(new THREE.WireframeGeometry(dunes), lineMat("brown", 0.08)));
  const grid = new THREE.GridHelper(1100, lite ? 55 : 110);
  grid.material = lineMat("brown", 0.07);
  grid.position.y = -1.6;
  scene.add(grid);

  // ---- The model.
  type Highlight = {
    u: Record<string, THREE.IUniform>;
    fill: THREE.Mesh | null;
    at: number;
    base: THREE.Color;
    op: number;
  };
  const highlights: Highlight[] = [];
  const goldC = tc("gold");
  new GLTFLoader().load("/intro/community.glb", (gltf) => {
    gltf.scene.updateMatrixWorld(true);
    gltf.scene.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return;
      const st = STYLE[o.name] ??
        STYLE[o.parent?.name ?? ""] ?? { fill: "bg", edge: "brown", op: 0.5, angle: 30 };
      const geo = o.geometry as THREE.BufferGeometry;
      let fill: THREE.Mesh | null = null;
      if (st.fill !== null) {
        fill = new THREE.Mesh(geo, fillMat(st.fill, !!st.dark));
        fill.matrix.copy(o.matrixWorld);
        fill.matrixAutoUpdate = false;
        scene.add(fill);
      }
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geo, st.angle),
        edgeMat(st.edge, st.op),
      );
      edges.matrix.copy(o.matrixWorld);
      edges.matrixAutoUpdate = false;
      scene.add(edges);
      if (st.hi)
        highlights.push({
          u: edges.material.uniforms,
          fill,
          at: st.hi,
          base: tc(st.edge),
          op: st.op,
        });
    });
    dirty = true;
  });

  // ---- Trees: one shared shape drawn per position (instancing). Phones draw half of them;
  // the list is shuffled at export, so any prefix is an even sample.
  const trees: THREE.InstancedBufferGeometry[] = [];
  void fetch("/intro/trees.json")
    .then((r) => r.json() as Promise<[number, number, number, number][]>)
    .then((rows) => {
      const off = new Float32Array(rows.length * 4);
      rows.forEach(([x, z, h, r], i) => off.set([x, z, h / 7, r / 3], i * 4));
      const iOff = new THREE.InstancedBufferAttribute(off, 4);
      const shape = baseTree();
      const make = (source: THREE.BufferGeometry) => {
        const g = new THREE.InstancedBufferGeometry();
        g.setAttribute("position", source.getAttribute("position"));
        g.setAttribute("iOff", iOff);
        trees.push(g);
        return g;
      };
      const st = STYLE["trees"]!;
      const fill = new THREE.Mesh(make(shape), fillMat(st.fill!, true, true));
      const edges = new THREE.LineSegments(
        make(new THREE.EdgesGeometry(shape, st.angle)),
        edgeMat(st.edge, st.op, true),
      );
      for (const m of [fill, edges]) {
        m.frustumCulled = false; // the shared shape's bounds say nothing about where instances are
        scene.add(m);
      }
      sizeTrees();
      dirty = true;
    });
  const sizeTrees = () => {
    for (const g of trees) {
      const n = g.getAttribute("iOff").count;
      g.instanceCount = portrait ? Math.round(n * 0.5) : n;
    }
  };

  // ---- The moon above the skyline.
  const moon = new THREE.Group();
  moon.position.set(-120, 520, 1150);
  moon.add(
    new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(150, lite ? 24 : 36, lite ? 12 : 18)),
      lineMat("gold", 0.35, false),
    ),
  );
  for (let i = 0; i < 16; i++) {
    const r = 8 + rnd() * 22;
    const pts = new THREE.EllipseCurve(0, 0, r, r)
      .getPoints(40)
      .map((p) => new THREE.Vector3(p.x, p.y, 0));
    const ring = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(pts),
      lineMat("gold", 0.6, false),
    );
    const dir = new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, -(0.6 + rnd())).normalize();
    ring.position.copy(dir.clone().multiplyScalar(150.5));
    ring.lookAt(dir.clone().multiplyScalar(400));
    moon.add(ring);
  }
  scene.add(moon);

  const sections = KEYS.length - 1;
  const posCurve = new THREE.CatmullRomCurve3(
    KEYS.map((k) => new THREE.Vector3(...k[0]!)),
    false,
    "centripetal",
  );
  const tgtCurve = new THREE.CatmullRomCurve3(
    KEYS.map((k) => new THREE.Vector3(...k[1]!)),
    false,
    "centripetal",
  );

  // ---- Input. Progress comes from how far the story block has scrolled past the top.
  let target = 0,
    smooth = 0,
    mx = 0,
    my = 0;
  const onScroll = () => {
    // The last outro-height of the story belongs to the outro rising over the stage.
    const max = story.offsetHeight - innerHeight - outro.offsetHeight;
    target = max > 0 ? Math.min(1, Math.max(0, -story.getBoundingClientRect().top / max)) : 0;
  };
  const onPointer = (e: PointerEvent) => {
    // Parallax follows a mouse only: touches would re-render the scene for nothing.
    if (e.pointerType !== "mouse" || still) return;
    mx = e.clientX / innerWidth - 0.5;
    my = e.clientY / innerHeight - 0.5;
  };
  const stage = q<HTMLElement>(root, ".intro3d-stage");
  // Portrait phones: a wider lens, the camera pulled back, and the picture shifted up so the
  // subject sits in the free space above the chapter card instead of behind it.
  let portrait = false;
  // Pixel ratio: capped per device, then lowered at run time if frames come too slowly (never raised
  // again, so it cannot oscillate). `dprDrop` survives resizes.
  let dprDrop = 0;
  const pixelRatio = () => Math.max(1, Math.min(devicePixelRatio, portrait ? 1.5 : 2) - dprDrop);
  const resize = () => {
    const w = stage.clientWidth,
      h = stage.clientHeight;
    portrait = w / h < 0.8;
    // Phones: cap the pixel ratio; the line drawing stays crisp and the GPU does far less work.
    renderer.setPixelRatio(pixelRatio());
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = portrait ? 62 : 50;
    if (portrait) camera.setViewOffset(w, h, 0, h * 0.17, w, h);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
    sizeChars();
    buildWord();
    sizeTrees();
    dirty = true;
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("pointermove", onPointer);
  addEventListener("resize", resize);

  // ---- Text: scrambled headings and the ASCII wordmark.
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=<>/\\|01";
  const scrambles = new Map<HTMLElement, number>();
  const scramble = (el: HTMLElement) => {
    if (still) return;
    const final = (el.dataset["text"] ??= el.textContent ?? "");
    let frame = 0;
    clearInterval(scrambles.get(el));
    scrambles.set(
      el,
      window.setInterval(() => {
        frame++;
        el.textContent = [...final]
          .map((ch, i) =>
            ch === " " || i < frame * 1.4 ? ch : glyphs[(Math.random() * glyphs.length) | 0],
          )
          .join("");
        if (frame * 1.4 >= final.length) {
          el.textContent = final;
          clearInterval(scrambles.get(el));
        }
      }, 30),
    );
  };
  const asciiEls = [...root.querySelectorAll<HTMLElement>(".intro3d-ascii")];
  // The word is sampled on a character grid (150 columns; 116 on phones, with the font sized so
  // the word fits the screen width). The glyphs act as texture: the word reads from its shape.
  let word: boolean[][] = [];
  function buildWord() {
    const cols = portrait ? 116 : 150,
      rows = portrait ? 24 : 30,
      c = document.createElement("canvas");
    c.width = cols;
    c.height = rows;
    const g = c.getContext("2d")!;
    g.fillStyle = "#000";
    g.font = `bold ${rows}px Georgia, serif`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("LUNARIS", cols / 2, rows / 2 + 1);
    const d = g.getImageData(0, 0, cols, rows).data;
    const ink = (x: number, y: number) =>
      x >= 0 && y >= 0 && x < cols && y < rows && d[(y * cols + x) * 4 + 3]! > 90;
    word = Array.from({ length: rows }, (_, y) =>
      Array.from({ length: cols }, (_, x) => ink(x, y)),
    );
    // A monospace cell is ~0.6em wide plus 0.05em letter spacing.
    const fit = portrait ? `${((stage.clientWidth * 0.92) / (cols * 0.65)).toFixed(2)}px` : "";
    asciiEls.forEach((el) => (el.style.fontSize = fit));
    drawAscii();
  }
  const asciiChars = "LUNARIS#*+:=.%&@$";
  const drawAscii = () => {
    // Only the hero and the finale show the word; skip the rebuild while neither is on screen.
    const live = asciiEls.filter((el) => el.closest(".intro3d-panel")?.classList.contains("on"));
    if (!live.length || story.getBoundingClientRect().bottom <= 0) return;
    const text = word
      .map((row) =>
        row
          .map((on) =>
            on
              ? asciiChars[(Math.random() * asciiChars.length) | 0]
              : Math.random() < 0.004
                ? "."
                : " ",
          )
          .join(""),
      )
      .join("\n");
    live.forEach((el) => (el.textContent = text));
  };
  const asciiTimer = still ? 0 : window.setInterval(drawAscii, lite ? 220 : 140);

  // ---- Outro: the outline draws itself (CSS), then a sheen glides across it and glyphs drift.
  const outro = q<HTMLElement>(root, ".intro3d-outro");
  // Theme: the component flips data-theme on the root; re-colour every registered scene colour.
  let charColor = "#5c4a3d";
  const applyTheme = () => {
    pal = root.dataset["theme"] === "dark" ? DARK : LIGHT;
    themed.forEach(({ color, key }) => color.set(pal[key]));
    dirty = true;
    charColor = getComputedStyle(root).getPropertyValue("--i-chars").trim() || charColor;
  };
  const themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  applyTheme();
  let lastCover = -1;
  const sheen = q<SVGLinearGradientElement>(root, "#intro3d-sheen");
  let outroVisible = false,
    outroStart = 0;
  const io = new IntersectionObserver(
    ([e]) => {
      outroVisible = !!e?.isIntersecting;
      if (outroVisible && !outro.classList.contains("in")) {
        outro.classList.add("in");
        outroStart = performance.now();
      }
    },
    { threshold: [0, 0.35] },
  );
  io.observe(outro);
  const charCanvas = q<HTMLCanvasElement>(root, ".intro3d-chars");
  const cx2 = charCanvas.getContext("2d")!;
  const glyphSet = "LUNARISlunaris·+*.:~^\"'".split("");
  type Glyph = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    g: string;
    size: number;
    a: number;
    ph: number;
    sp: number;
  };
  let chars: Glyph[] = [];
  function sizeChars() {
    const dpr = Math.min(devicePixelRatio, 2);
    charCanvas.width = outro.clientWidth * dpr;
    charCanvas.height = outro.clientHeight * dpr;
    cx2.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round((outro.clientWidth * outro.clientHeight) / 9000);
    chars = Array.from({ length: n }, () => ({
      x: Math.random() * outro.clientWidth,
      y: Math.random() * outro.clientHeight,
      vx: 3 + Math.random() * 6,
      vy: -(6 + Math.random() * 12),
      g: glyphSet[(Math.random() * glyphSet.length) | 0]!,
      size: 10 + ((Math.random() * 5) | 0) * 2,
      a: 0.06 + Math.random() * 0.26,
      ph: Math.random() * 6.28,
      sp: 0.4 + Math.random() * 0.5,
    })).sort((a, b) => a.size - b.size);
  }
  resize();

  // ---- Loop.
  const panels = [...root.querySelectorAll<HTMLElement>(".intro3d-panel[data-at]")];
  const bar = q<HTMLElement>(root, ".intro3d-progress i");
  const heroVeil = q<HTMLElement>(root, ".intro3d-hero-veil");
  let active = -1,
    px = 0,
    py = 0,
    raf = 0,
    lastT = performance.now(),
    lastBar = -1,
    lastVeil = -1,
    slowFrames = 0,
    renderedLast = false;
  const tick = (now: number) => {
    const rawDt = (now - lastT) / 1000;
    const dt = Math.min(0.05, rawDt);
    lastT = now;
    const storyOnScreen = story.getBoundingClientRect().bottom > 0;
    if (storyOnScreen) {
      const moving =
        Math.abs(target - smooth) > 1e-5 || Math.abs(mx - px) + Math.abs(my - py) > 1e-4;
      smooth += (target - smooth) * 0.06;
      const u = Math.min(0.9999, Math.max(0, smooth)),
        step = u * sections,
        current = Math.round(step);
      const p = posCurve.getPoint(u),
        t = tgtCurve.getPoint(u);
      // Eased pointer parallax, no idle bobbing: a still page renders a still frame.
      px += (mx - px) * 0.05;
      py += (my - py) * 0.05;
      if (portrait) p.sub(t).multiplyScalar(1.3).add(t);
      camera.position.set(p.x + px * 14, p.y - py * 9, p.z);
      camera.lookAt(t);
      // Switch chapters only once clearly past the midpoint, so the highlights never flip back and forth.
      if (current !== active && Math.abs(step - current) < 0.38) {
        active = current;
        panels.forEach((el) => {
          const on = Number(el.dataset["at"]) === active;
          el.classList.toggle("on", on);
          if (on) el.querySelectorAll<HTMLElement>("[data-scramble]").forEach(scramble);
        });
      }
      let fading = 0;
      highlights.forEach((h) => {
        const on = h.at === active;
        fading += Math.abs((on ? 1 : h.op) - h.u["uOpacity"]!.value);
        (h.u["uColor"]!.value as THREE.Color).lerp(on ? goldC : h.base, 0.08);
        h.u["uOpacity"]!.value += ((on ? 1 : h.op) - h.u["uOpacity"]!.value) * 0.08;
        if (h.fill) {
          const hi = (h.fill.material as THREE.ShaderMaterial).uniforms["uHi"]!;
          hi.value += ((on ? 1 : 0) - hi.value) * 0.08;
        }
      });
      // No darkening of far buildings: they keep the same cream fill as the near ones (`uFront`
      // stays out of reach), so the drawing reads as one continuous line work while scrolling.
      if (Math.abs(u - lastBar) > 0.0005) {
        bar.style.transform = `scaleX(${u.toFixed(4)})`;
        lastBar = u;
      }
      const veil = Math.max(0, 1 - step * 2.5, ease((step - (sections - 0.6)) * 2.5));
      if (Math.abs(veil - lastVeil) > 0.002) {
        heroVeil.style.opacity = veil.toFixed(3);
        lastVeil = veil;
      }
      const render = moving || fading > 0.002 || dirty;
      if (render) {
        // Two rendered frames in a row measure the real frame time: under ~40 fps for a while,
        // drop the resolution a step (down to 1x).
        if (renderedLast && rawDt < 0.5) {
          slowFrames = rawDt > 0.025 ? slowFrames + 1 : Math.max(0, slowFrames - 1);
          if (slowFrames > 20 && pixelRatio() > 1) {
            dprDrop += 0.25;
            slowFrames = 0;
            resize();
          }
        }
        renderer.render(scene, camera);
        dirty = false;
      }
      renderedLast = render;
    }
    // Outro lid: 0 while it sits below the screen, 1 once it has risen fully over the stage.
    const cover = Math.min(1, Math.max(0, 1 - outro.getBoundingClientRect().top / innerHeight));
    if (Math.abs(cover - lastCover) > 0.0005) {
      const v = cover.toFixed(4);
      outro.style.setProperty("--cover", v);
      stage.style.setProperty("--cover", v);
      lastCover = cover;
    }
    if (!still && outroVisible && outro.classList.contains("in")) {
      const w = outro.clientWidth,
        h = outro.clientHeight,
        ts = now / 1000;
      cx2.clearRect(0, 0, w, h);
      cx2.textAlign = "center";
      cx2.textBaseline = "middle";
      cx2.fillStyle = charColor;
      let font = 0;
      for (const c of chars) {
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        if (c.y < -20) {
          c.y = h + 20;
          c.x = Math.random() * w;
        }
        if (c.x > w + 20) c.x = -20;
        const edge = Math.min(1, c.y / 120, (h - c.y) / 120);
        cx2.globalAlpha = Math.max(0, c.a * (0.65 + 0.35 * Math.sin(ts * c.sp + c.ph)) * edge);
        if (c.size !== font) {
          font = c.size;
          cx2.font = `${font}px "JetBrains Mono", monospace`;
        }
        cx2.fillText(c.g, c.x, c.y);
      }
      // Sheen: a 3.8 s pass from left to right, then a 1.6 s rest, once the outline is drawn.
      const since = (now - outroStart) / 1000 - 2.8;
      if (since > 0) {
        const k = (since % 5.4) / 3.8;
        const x = k <= 1 ? 230 + (1 - Math.pow(1 - k, 2)) * 680 : 230;
        sheen.setAttribute("gradientTransform", `translate(${x.toFixed(1)} 293) rotate(-24)`);
      }
    }
    // Nothing of the intro on screen (reading the home page below): stop the loop until a scroll
    // brings it back.
    if (!storyOnScreen && !outroVisible && cover >= 1) {
      raf = 0;
      return;
    }
    raf = requestAnimationFrame(tick);
  };
  const wake = () => {
    if (raf) return;
    lastT = performance.now();
    raf = requestAnimationFrame(tick);
  };
  addEventListener("scroll", wake, { passive: true });
  onScroll();
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    clearInterval(asciiTimer);
    scrambles.forEach((id) => clearInterval(id));
    io.disconnect();
    themeObserver.disconnect();
    removeEventListener("scroll", onScroll);
    removeEventListener("scroll", wake);
    removeEventListener("pointermove", onPointer);
    removeEventListener("resize", resize);
    trees.forEach((g) => g.dispose());
    renderer.dispose();
  };
}
