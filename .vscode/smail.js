var c = document.getElementById("canv");
$ = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight;

window.addEventListener(
  "resize",
  function () {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  },
  false
);
function cmul(w, z) {
  return [w[0] * z[0] - w[1] * z[1], w[0] * z[1] + w[1] * z[0]];
}

function csub(w, z) {
  return [w[0] - z[0], w[1] - z[1]];
}

function modulus(p) {
  return Math.sqrt(p[0] * p[0] + p[1] * p[1]);
}

function crecip(z) {
  var d = z[0] * z[0] + z[1] * z[1];
  return [z[0] / d, -z[1] / d];
}

function cpow(z, n) {
  var mod = Math.pow(modulus(z), n),
    arg = Math.atan2(z[1], z[0]) * n;
  return [mod * Math.cos(arg), mod * Math.sin(arg)];
}
function möb(p) {
  var x = p[0],
    y = p[1];
  var denom = (x + 1) * (x + 1) + y * y;
  return [(x * x - 1 + y * y) / denom, (2 * y) / denom];
}
function spiral(r, st, delta, gamma, opts) {
  var rd = crecip(delta),
    md = modulus(delta),
    mrd = 1 / md,
    colidx = opts.i,
    cols = opts.fill,
    min_d = opts.min_d,
    max_d = opts.max_d,
    dg = cmul(delta, gamma),
    dog = cmul(delta, crecip(gamma)),
    god = cmul(gamma, crecip(delta));
  for (
    var q = st, mod_q = modulus(q);
    mod_q > min_d;
    q = cmul(q, rd), mod_q *= mrd
  ) {
    colidx = (colidx + cols.length - 1) % cols.length;
  }
  for (
    ;
    mod_q < max_d;
    q = cmul(q, delta), mod_q *= md, colidx = (colidx + 1) % cols.length
  ) {
    var quad = [möb(q)];
    if (modulus(quad[0]) > 5) continue;

    if (colidx == 0) quad.push(möb(cmul(q, dog)));
    quad.push(möb(cmul(q, delta)));
    if (colidx == 2) quad.push(möb(cmul(q, dg)));
    quad.push(möb(cmul(q, gamma)));
    if (colidx == 1) quad.push(möb(cmul(q, god)));
    if (modulus(csub(quad[0], quad[2])) > 5) continue;
    $.fillStyle = cols[colidx];
    $.beginPath();
    $.moveTo(quad[0][0], quad[0][1]);
    $.lineTo(quad[1][0], quad[1][1]);
    $.lineTo(quad[2][0], quad[2][1]);
    $.lineTo(quad[3][0], quad[3][1]);
    $.closePath();
    $.fill();
  }
}

var p = 9,
  q = 36;
var root = doyle(p, q);
var rep = 700;

function anim(t) {
  $.setTransform(1, 0, 0, 1, 0, 0);
  $.clearRect(0, 0, c.width, c.height);
  $.translate(Math.round(c.width / 2), (cy = Math.round(c.height / 2)));
  $.scale(450, 450);
  $.rotate(Math.PI / 5);
  var min_d = 1e-4,
    max_d = 1e4;
  var start = cpow(root.a, t);
  for (var i = 0; i < q; i++) {
    spiral(root.r, start, root.a, root.b, {
      fill: ["#D43D2C", "#333838", "#BBCCB6"],
      i: (5 * i) % 5,
      min_d: min_d,
      max_d: max_d
    });
    start = cmul(start, root.b);
  }
}
var fts;
function run(ts) {
  if (!fts) fts = ts;
  anim(((ts - fts) % (3 * rep)) / rep);
  window.requestAnimationFrame(run);
}
run();
S