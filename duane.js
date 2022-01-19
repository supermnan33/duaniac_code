document.alphabet = {
  A61: {
    W: 74,
    P: [[58, 94, 8, 42], [45, 89, 7, 69], [31, 91, 7, 119], [20, 99, 7, 91], [12, 111, 7, 51], [11, 124, 8, -35], [29, 151, 8, -35], [45, 149, 7, -35], [65, 153, 6, -35], [57, 126, 6, -35], [57, 112, 6, -102], [58, 142, 8, -102], [15, 140, 9, -102]]
  },
  A64: {
    W: 84,
    P: [[68, 147, 10, -103], [45, 151, 9, -92], [22, 145, 9, -50], [15, 124, 8, -50], [17, 104, 8, 39], [29, 91, 8, 39], [46, 90, 8, 39], [59, 96, 8, -50], [67, 129, 8, -50], [68, 110, 8, 69], [68, 83, 7, 69], [70, 68, 7, 102], [71, 47, 7, 119]]
  },
  A65: {
    W: 79,
    P: [[16, 127, 10, -103], [23, 145, 9, -50], [41, 151, 8, 11], [54, 148, 7, 102], [70, 142, 6, 119], [61, 96, 7, 51], [54, 109, 7, 51], [44, 90, 8, 51], [41, 117, 8, -50], [27, 92, 8, -50], [17, 107, 8, -50]]
  },
  A6e: {
    W: 75,
    P: [[17, 148, 10, -92], [62, 149, 10, -92], [17, 125, 9, -50], [62, 127, 9, -35], [61, 107, 8, 29], [23, 104, 8, 69], [15, 86, 7, 69], [36, 94, 7, 69], [55, 92, 7, 69]]
  },
  A75: {
    W: 75,
    P: [[58, 148, 9, -103], [60, 128, 8, -84], [38, 150, 8, -35], [21, 147, 7, -35], [61, 109, 7, -35], [17, 128, 7, 42], [13, 110, 7, 80], [62, 92, 7, 80], [14, 90, 7, 80]]
  }
};
$(function() {
  var m = $("#c");
  var n;
  var o;
  var p;
  var q = 0.1;
  var r;
  var s = [[356, 75, 58], [39, 90, 58], [126, 70, 37], [225, 83, 58]];
  function makeColor(a, b) {
    var c = a[0] - 17.0 * b / 1000.0;
    var d = a[1] + 81.0 * b / 1000.0;
    var e = a[2] + 58.0 * b / 1000.0;
    return "hsl(" + c + "," + d + "%," + e + "%)"
  }
  ;function phraseToHex(a) {
    var b = "";
    for (jj = 0; jj < a.length; jj++) {
      b += a.charCodeAt(jj).toString(16)
    }
    return b
  }
  function init() {
    updateCanvasDimensions();
    var g = new Array();
    var e = 0;
    function addLetter(a, b) {
      if (document.alphabet.hasOwnProperty(a)) {
        var c = document.alphabet[a].P;
        var d = s[b % 4];
        for (var i = 0, len = c.length; i < len; ++i) {
          point = c[i];
          let [a, b] = [d, point[3]];
          g.push(new Point(point[0] + e,point[1],0.0,point[2],makeColor( a, b )))
        }
        e += document.alphabet[a].W
      }
    }
    var f = "6475616e65";
    var h = -1;
    for (jj = 0; jj < f.length; jj += 2) {
      var j = "A" + f.charAt(jj) + f.charAt(jj + 1);
      if (j != "A20") {
        h++
      }
      addLetter(j, h)
    }
    gLength = g.length;
    for (var i = 0; i < gLength; i++) {
      g[i].curPos.x = (o / 2 - e / 2) + g[i].curPos.x;
      g[i].curPos.y = (n / 2 - 180) + g[i].curPos.y;
      g[i].originalPos.x = (o / 2 - e / 2) + g[i].originalPos.x;
      g[i].originalPos.y = (n / 2 - 180) + g[i].originalPos.y
    }
    ;r = new PointCollection();
    r.points = g;
    initEventListeners();
    timeout()
  }
  ;function initEventListeners() {
    $(window).bind('resize', updateCanvasDimensions).bind('mousemove', onMove);
    m.get(0).ontouchmove = function(e) {
      e.preventDefault();
      onTouchMove(e)
    }
    ;
    m.get(0).ontouchstart = function(e) {
      e.preventDefault()
    }
  }
  ;function updateCanvasDimensions() {
    m.attr({
      height: $(window).height(),
      width: $(window).width()
    });
    o = m.width();
    n = m.height();
    draw()
  }
  ;function onMove(e) {
    if (r)
      r.mousePos.set(e.pageX, e.pageY)
  }
  ;function onTouchMove(e) {
    if (r)
      r.mousePos.set(e.targetTouches[0].pageX, e.targetTouches[0].pageY)
  }
  ;function timeout() {
    draw();
    update();
    setTimeout(function() {
      timeout()
    }, 30)
  }
  ;function draw() {
    var a = m.get(0);
    if (a.getContext == null) {
      return
    }
    ;p = a.getContext('2d');
    p.clearRect(0, 0, o, n);
    if (r)
      r.draw()
  }
  ;function update() {
    if (r)
      r.update()
  }
  ;function Vector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.addX = function(x) {
      this.x += x
    }
    ;
    this.addY = function(y) {
      this.y += y
    }
    ;
    this.addZ = function(z) {
      this.z += z
    }
    ;
    this.set = function(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z
    }
  }
  ;function PointCollection() {
    this.mousePos = new Vector(0,0);
    this.points = new Array();
    this.newPoint = function(x, y, z) {
      var a = new Point(x,y,z);
      this.points.push(a);
      return a
    }
    ;
    this.update = function() {
      var a = this.points.length;
      for (var i = 0; i < a; i++) {
        var b = this.points[i];
        if (b == null)
          continue;
        var c = this.mousePos.x - b.curPos.x;
        var e = this.mousePos.y - b.curPos.y;
        var f = (c * c) + (e * e);
        var d = Math.sqrt(f);
        if (d < 150) {
          b.targetPos.x = (this.mousePos.x < b.curPos.x) ? b.curPos.x - c : b.curPos.x - c;
          b.targetPos.y = (this.mousePos.y < b.curPos.y) ? b.curPos.y - e : b.curPos.y - e
        } else {
          b.targetPos.x = b.originalPos.x;
          b.targetPos.y = b.originalPos.y
        }
        ;b.update()
      }
    }
    ;
    this.draw = function() {
      var a = this.points.length;
      for (var i = 0; i < a; i++) {
        var b = this.points[i];
        if (b == null)
          continue;
        b.draw()
      }
    }
  }
  ;function Point(x, y, z, k, l) {
    this.colour = l;
    this.curPos = new Vector(x,y,z);
    this.friction = 0.8;
    this.originalPos = new Vector(x,y,z);
    this.radius = k;
    this.size = k;
    this.springStrength = 0.1;
    this.targetPos = new Vector(x,y,z);
    this.velocity = new Vector(0.0,0.0,0.0);
    this.update = function() {
      var a = this.targetPos.x - this.curPos.x;
      var b = a * this.springStrength;
      this.velocity.x += b;
      this.velocity.x *= this.friction;
      this.curPos.x += this.velocity.x;
      var c = this.targetPos.y - this.curPos.y;
      var e = c * this.springStrength;
      this.velocity.y += e;
      this.velocity.y *= this.friction;
      this.curPos.y += this.velocity.y;
      var f = this.originalPos.x - this.curPos.x;
      var g = this.originalPos.y - this.curPos.y;
      var h = (f * f) + (g * g);
      var d = Math.sqrt(h);
      this.targetPos.z = d / 100 + 1;
      var i = this.targetPos.z - this.curPos.z;
      var j = i * this.springStrength;
      this.velocity.z += j;
      this.velocity.z *= this.friction;
      this.curPos.z += this.velocity.z;
      this.radius = this.size * this.curPos.z;
      if (this.radius < 1)
        this.radius = 1
    }
    ;
    this.draw = function() {
      p.fillStyle = this.colour;
      p.beginPath();
      p.arc(this.curPos.x, this.curPos.y, this.radius, 0, Math.PI * 2, true);
      p.fill()
    }
  }
  ;init()
});