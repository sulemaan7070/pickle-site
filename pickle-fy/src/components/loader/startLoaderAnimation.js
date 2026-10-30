/**
 * Pickle-Fy loading animation (plain DOM + SVG, no framework).
 *
 * The whole show is a function of time: render(t) draws one frame for any t,
 * and a requestAnimationFrame loop simply feeds it the elapsed time.
 *
 *   0s ........ T_RIPEN ........ T_BOOM ........ T_FADE_OUT ........ T_END
 *   | % counter  | green chilli    | chilli bursts   | the big seed       |
 *   | fills up   | morphs to red   | into 72 seeds   | covers the screen, |
 *   |            | and glows       | that bounce     | overlay fades out  |
 *
 * It expects the markup rendered by <PickleLoader /> to be on the page.
 */
import { setLoaderState } from '@/lib/loaderState';

/* ------------------------------------------------------------------ */
/* Timeline & tuning (all times are in "animation seconds")            */
/* ------------------------------------------------------------------ */
const SPEED = 1.5; // playback speed multiplier
const T_RIPEN = 4.4; // the green chilli turns red here
const T_BOOM = T_RIPEN + 2.4; // ...and explodes here
const HERO_ZOOM_START = 0.45; // after the boom, one seed starts growing
const HERO_ZOOM_DURATION = 1.7;
const T_FADE_OUT = T_BOOM + HERO_ZOOM_START + HERO_ZOOM_DURATION + 0.15;
const T_END = T_FADE_OUT + 0.85;

const BURST_CENTER = { x: 823, y: 480 }; // where the seeds are thrown from (scene units)
const SEED_COUNT = 72;
const GRAVITY = 6000;
const PATH_SAMPLES = 220; // points used when morphing one outline into another

// Conversion between the "boom" group's local units and scene units.
const BOOM_SCALE = 0.3581;
const BOOM_OFFSET = { x: 137.8, y: 205.6 };

/* ------------------------------------------------------------------ */
/* Small math helpers                                                  */
/* ------------------------------------------------------------------ */
const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const lerp = (a, b, t) => a + (b - a) * t;
/** 0 → 1 progress of time `t` through the window [start, start + duration]. */
const progress = (t, start, duration) => clamp01((t - start) / duration);

const ease = {
  smooth: (t) => t * t * (3 - 2 * t),
  inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  out3: (t) => 1 - Math.pow(1 - t, 3),
  out4: (t) => 1 - Math.pow(1 - t, 4),
  back: (t) => 1 + 3.2 * Math.pow(t - 1, 3) + 2.2 * Math.pow(t - 1, 2),
  elastic: (t) =>
    t <= 0 ? 0 : t >= 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * 2.0944) + 1,
};

const randomBetween = (a, b) => a + Math.random() * (b - a);

/* ------------------------------------------------------------------ */
/* Path morphing: green chilli outline → red chilli outline            */
/* ------------------------------------------------------------------ */

/** Sample `pathData` into PATH_SAMPLES evenly spaced points. */
function sampleOutline(probe, pathData) {
  probe.setAttribute('d', pathData.split(/(?=M)/)[0]); // outer contour only
  const length = probe.getTotalLength();
  const points = [];
  for (let i = 0; i < PATH_SAMPLES; i++) {
    const p = probe.getPointAtLength((length * i) / PATH_SAMPLES);
    points.push([p.x, p.y]);
  }
  return points;
}

/** Signed area – its sign tells us the winding direction of an outline. */
function signedArea(points) {
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const next = points[(i + 1) % points.length];
    area += points[i][0] * next[1] - next[0] * points[i][1];
  }
  return area;
}

/** Resample both outlines, align their start points and winding so they can be blended. */
function prepareMorph(probe, fromPath, toPath) {
  const from = sampleOutline(probe, fromPath);
  const to = sampleOutline(probe, toPath);
  if (signedArea(from) * signedArea(to) < 0) to.reverse();

  // Rotate `to` so that its points line up with `from` as closely as possible.
  let bestCost = Infinity;
  let bestShift = 0;
  for (let shift = 0; shift < PATH_SAMPLES; shift++) {
    let cost = 0;
    for (let i = 0; i < PATH_SAMPLES; i += 4) {
      const a = from[i];
      const b = to[(i + shift) % PATH_SAMPLES];
      cost += (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
    }
    if (cost < bestCost) {
      bestCost = cost;
      bestShift = shift;
    }
  }
  const aligned = [];
  for (let i = 0; i < PATH_SAMPLES; i++) aligned.push(to[(i + bestShift) % PATH_SAMPLES]);
  return { from, to: aligned };
}

/** Path data for the shape that is `t` (0–1) of the way from → to. */
function blendMorph(morph, t) {
  let d = 'M';
  for (let i = 0; i < PATH_SAMPLES; i++) {
    const x = lerp(morph.from[i][0], morph.to[i][0], t).toFixed(1);
    const y = lerp(morph.from[i][1], morph.to[i][1], t).toFixed(1);
    d += `${i ? 'L' : ''}${x} ${y}`;
  }
  return `${d}Z`;
}

/* ------------------------------------------------------------------ */
/* The animation                                                       */
/* ------------------------------------------------------------------ */
export default function startLoaderAnimation() {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  /* ---- find the pieces of the artwork ---- */
  const overlay = $('#ov');
  const scene = $('#scene');
  const chilliBody = $('#body');
  const chilliStem = $('#stem');
  const bodyPath = chilliBody.getAttribute('d'); // green chilli outline
  const stemPath = chilliStem.getAttribute('d');
  const fillRect = $('#fill'); // the "ripening" fill inside the chilli
  const percentNumber = $('#n');
  const percentLabel = $('#pct');
  const greenFill = $('#red');
  const chilli = $('#chilli');
  const stage = $('#stage');
  const boom = $('#boom'); // everything that appears after the explosion
  const flash = $('#flash');
  const shockRing = $('#ring');
  const topHalf = $('#boom .top');
  const bottomHalf = $('#boom .bot');
  const core = $('#boom .core');
  const peripherals = $$('#boom .per'); // small pieces that fly back together
  const seeds = $$('#boom .seed');

  /* ---- remember each piece's bounding box so we can rotate/scale around its centre ---- */
  const boxes = new Map();
  [topHalf, bottomHalf, core, ...peripherals, ...seeds].forEach((el) => {
    const b = el.getBBox();
    boxes.set(el, { cx: b.x + b.width / 2, cy: b.y + b.height / 2, w: b.width, h: b.height });
  });
  const spins = new Map(); // fixed pseudo-random spin for each peripheral piece
  peripherals.forEach((el, i) => spins.set(el, (((i * 7919) % 281) / 281) * 280 - 140));

  /** Position, rotate, scale and fade one piece (rotation/scale around its centre). */
  function place(el, x, y, rotation, scale, opacity) {
    const b = boxes.get(el);
    el.setAttribute(
      'transform',
      `translate(${x} ${y}) translate(${b.cx} ${b.cy}) rotate(${rotation}) scale(${scale}) translate(${-b.cx} ${-b.cy})`
    );
    el.setAttribute('opacity', opacity);
  }

  /* ---- chilli morph data ---- */
  const probe = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  probe.setAttribute('fill', 'none');
  scene.appendChild(probe);
  const bodyMorph = prepareMorph(probe, bodyPath, $('#tBody').getAttribute('d'));
  const stemMorph = prepareMorph(probe, stemPath, $('#tStem').getAttribute('d'));
  scene.removeChild(probe);

  /* ---- seeds: duplicate the artwork's seeds up to SEED_COUNT ---- */
  const originalSeedCount = seeds.length;
  for (let i = originalSeedCount; i < SEED_COUNT; i++) {
    const original = seeds[i % originalSeedCount];
    const copy = original.cloneNode(true);
    boxes.set(copy, boxes.get(original));
    boom.appendChild(copy);
    seeds.push(copy);
  }
  // One seed is the "hero": it grows until it covers the whole screen.
  const heroSeed = $('#boom [data-hero]');
  heroSeed.removeAttribute('data-hero');
  boom.appendChild(heroSeed); // drawn on top of the other seeds

  /* ---- seed physics ---- */
  let sim = null; // one record per seed
  let simTime = 0;
  let screenBounds = null; // visible screen, in the boom group's units
  let heroFullScale = 1;

  /** The visible screen rectangle expressed in the boom group's local units. */
  function measureScreen() {
    const rect = scene.getBoundingClientRect();
    const sceneScale = rect.width / 1458;
    const margin = 30;
    const toBoom = (v, offset) => (v / sceneScale - offset) / BOOM_SCALE;
    return {
      l: toBoom(-rect.left, BOOM_OFFSET.x) + margin,
      r: toBoom(window.innerWidth - rect.left, BOOM_OFFSET.x) - margin,
      t: toBoom(-rect.top, BOOM_OFFSET.y) + margin,
      b: toBoom(window.innerHeight - rect.top, BOOM_OFFSET.y) - margin,
    };
  }

  /** Throw every seed from the burst centre towards its own landing cell. */
  function initSeeds() {
    const b = measureScreen();
    const width = b.r - b.l;
    const height = b.b - b.t;
    screenBounds = b;
    // How big the hero seed must become to cover the screen (even while rotated).
    const heroBox = boxes.get(heroSeed);
    heroFullScale = 1.1 * 1.4143 * Math.max((width + 60) / heroBox.w, (height + 60) / heroBox.h);

    // Split the screen into a grid so the seeds land spread out, not in a pile.
    const columns = Math.max(1, Math.round(Math.sqrt((SEED_COUNT * width) / height)));
    const rows = Math.ceil(SEED_COUNT / columns);
    const cells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        cells.push([
          b.l + ((c + Math.random()) * width) / columns,
          b.t + ((r + Math.random()) * height) / rows,
        ]);
      }
    }
    cells.sort(() => Math.random() - 0.5);

    sim = seeds.map((el, i) => {
      const target = cells[i % cells.length];
      const x = BURST_CENTER.x + randomBetween(-40, 40);
      const y = BURST_CENTER.y + randomBetween(-60, 60);
      const drag = 2.2;
      const flightTime = randomBetween(1.3, 1.9);
      const launch = drag / (1 - Math.exp(-drag * flightTime)); // speed that lands on the target
      return {
        el,
        x, // position on the ground plane
        y,
        z: 0, // height above the ground
        vx: (target[0] - x) * launch,
        vy: (target[1] - y) * launch,
        vz: randomBetween(1400, 2900),
        scale: randomBetween(2, 3.6),
        rotation: randomBetween(0, 360),
        spin: randomBetween(-600, 600),
        asleep: false,
      };
    });
    simTime = 0;
  }

  /** Advance the physics to time `u` (seconds since the boom) and draw every seed. */
  function drawSeeds(u) {
    if (!sim || u < simTime) initSeeds(); // restarted or scrubbed backwards

    const dt = 1 / 60;
    const groundDrag = Math.exp(-2.2 * dt);
    while (simTime + dt <= u) {
      simTime += dt;
      sim.forEach((s) => {
        if (s.asleep) return;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vx *= groundDrag;
        s.vy *= groundDrag;
        s.rotation += s.spin * dt;
        s.vz -= GRAVITY * dt;
        s.z += s.vz * dt;
        if (s.z < 0) {
          // bounce
          s.z = 0;
          s.vz = -s.vz * 0.4;
          if (s.vz < 250) s.vz = 0;
          s.spin *= 0.6;
        }
        if (s.z === 0 && s.vz === 0) {
          // rolling on the ground
          s.spin *= 0.9;
          if (Math.abs(s.vx) + Math.abs(s.vy) < 18) {
            s.asleep = true;
            s.spin = 0;
          }
        }
      });
    }

    const popIn = ease.back(progress(u, 0, 0.25));
    sim.forEach((s) => {
      const b = boxes.get(s.el);
      let x = s.x - b.cx;
      let y = s.y - s.z - b.cy;
      let rotation = s.rotation;
      let scale = lerp(0.25, 1, popIn) * s.scale * (1 + s.z / 5000);

      if (s.el === heroSeed) {
        // The hero seed flies like the others, then blends into "cover the screen".
        const zoom = ease.inOut(progress(u, HERO_ZOOM_START, HERO_ZOOM_DURATION));
        x = lerp(x, (screenBounds.l + screenBounds.r) / 2 - b.cx, zoom);
        y = lerp(y, (screenBounds.t + screenBounds.b) / 2 - b.cy, zoom);
        rotation = lerp((((s.rotation % 360) + 540) % 360) - 180, 0, zoom);
        scale = Math.exp(lerp(Math.log(scale), Math.log(heroFullScale), zoom));
      }
      place(s.el, x, y, rotation, scale, 1);
    });
  }

  /* ---- one frame of the animation ---- */
  let finished = false;

  function render(t) {
    // 1) Percentage counter and ripening fill
    const fillProgress = ease.smooth(progress(t, 0, 3.8));
    fillRect.setAttribute('y', 530 - 268 * fillProgress);
    percentNumber.textContent = Math.round(fillProgress * 100);
    percentLabel.style.opacity = 1 - progress(t, T_RIPEN, 0.5);

    // 2) Chilli turns from green to red (shape morph)
    const morphing = t >= T_RIPEN;
    greenFill.setAttribute('display', morphing ? 'none' : 'inline');
    chilliBody.setAttribute('fill', morphing ? '#C31711' : '#5FA52A');
    if (morphing) {
      const m = ease.inOut(progress(t, T_RIPEN + 0.1, 1.3));
      chilliBody.setAttribute('d', blendMorph(bodyMorph, m));
      chilliStem.setAttribute('d', blendMorph(stemMorph, m));
    } else {
      chilliBody.setAttribute('d', bodyPath);
      chilliStem.setAttribute('d', stemPath);
    }
    stage.setAttribute('opacity', progress(t, T_RIPEN + 1, 0.6));

    // 3) Glow + shake just before it explodes
    const glow = ease.inOut(progress(t, T_RIPEN + 1.7, 0.6));
    const shake =
      t >= T_RIPEN + 1.7 && t < T_RIPEN + 2.26 ? 3 * Math.sin((t - T_RIPEN - 1.7) * 78) : 0;
    chilli.style.filter = glow > 0 ? `drop-shadow(0 0 ${(14 * glow).toFixed(1)}px #ff3b1f)` : 'none';
    chilli.setAttribute('transform', `translate(${shake.toFixed(2)} 0)`);

    // 4) The explosion
    const u = t - T_BOOM; // seconds since the boom
    const exploded = u >= 0;
    chilli.setAttribute('opacity', exploded ? 0 : 1);
    boom.setAttribute('opacity', exploded ? 1 : 0);

    if (exploded) {
      drawBurst(u);
    } else {
      resetBoomPieces();
    }

    // 5) Fade the whole overlay away
    const overlayOpacity = 1 - ease.inOut(progress(t, T_FADE_OUT, 0.6));
    overlay.style.opacity = overlayOpacity;
    overlay.style.visibility = overlayOpacity <= 0 ? 'hidden' : 'visible';
    if (overlayOpacity <= 0 && !finished) {
      finished = true;
      setLoaderState('done');
    }
  }

  /** Before the boom everything in the "boom" group is hidden or tucked away. */
  function resetBoomPieces() {
    flash.setAttribute('opacity', 0);
    shockRing.setAttribute('opacity', 0);
    scene.style.transform = 'none';
    sim = null;
    place(topHalf, 0, 130, 0, 1, 1);
    place(bottomHalf, 0, -130, 0, 1, 1);
    place(core, 0, 0, 0, 0.3, 0);
    peripherals.forEach((el) => place(el, 0, 0, 0, 1, 0));
    seeds.forEach((el) => place(el, 0, 0, 0, 1, 0));
  }

  /** Everything that happens `u` seconds after the boom. */
  function drawBurst(u) {
    // white flash + shock ring
    const flashProgress = progress(u, 0, 0.5);
    flash.setAttribute('r', 300 * ease.out3(flashProgress));
    flash.setAttribute('opacity', 0.95 * (1 - flashProgress));
    const ringProgress = progress(u, 0, 0.8);
    shockRing.setAttribute('r', 340 * (0.05 + 0.95 * ease.out3(ringProgress)));
    shockRing.setAttribute('opacity', 1 - ringProgress);

    // screen shake
    const shakeAmount = Math.max(0, 1 - u / 0.4);
    scene.style.transform =
      shakeAmount > 0
        ? `translate(${(Math.sin(u * 130) * 9 * shakeAmount).toFixed(1)}px,${(Math.cos(u * 170) * 7 * shakeAmount).toFixed(1)}px)`
        : 'none';

    // the two halves of the chilli spring back to the middle
    const springBack = ease.elastic(progress(u, 0, 1.4));
    place(topHalf, 0, lerp(130, 0, springBack), 0, 1, 1);
    place(bottomHalf, 0, lerp(-130, 0, springBack), 0, 1, 1);

    // the core pops in
    const corePop = progress(u, 0.02, 0.6);
    place(core, 0, 0, 0, lerp(0.3, 1, ease.back(corePop)), ease.out3(corePop));

    // small pieces fly in from the outside, the further away the later they start
    peripherals.forEach((el) => {
      const b = boxes.get(el);
      const dx = b.cx - BURST_CENTER.x;
      const dy = b.cy - BURST_CENTER.y;
      const distance = Math.hypot(dx, dy);
      const q = progress(u, 0.02 + distance / 2600, 0.7 + distance / 900);
      const e = ease.out4(q);
      place(
        el,
        lerp(-dx * 0.9, 0, e),
        lerp(-dy * 0.9, 0, e),
        lerp(spins.get(el), 0, e),
        lerp(0.15, 1, e),
        q > 0 ? clamp01(e * 4) : 0
      );
    });

    drawSeeds(u);
  }

  /* ---- run it ---- */
  let startTime = 0;
  let frameId = 0;

  function tick(now) {
    const t = ((now - startTime) / 1000) * SPEED;
    render(Math.min(t, T_END + 1));
    if (t < T_END + 0.6) frameId = requestAnimationFrame(tick);
  }

  setLoaderState('running');
  startTime = performance.now();
  frameId = requestAnimationFrame(tick);

  return {
    /** Draw the frame at animation time `t` (used for testing / scrubbing). */
    seek: render,
    stop: () => cancelAnimationFrame(frameId),
  };
}
