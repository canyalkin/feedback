game = {};
(function (g) {
    function v(a, c, b) {
        for (; c;) {
            var h = Math.random() * (s - 2) + 1 >> 0,
                m = Math.random() * (t - 2) + 1 >> 0;
            d[m][h].type == A && (d[m][h] = new B(a, b), c--)
        }
    }

    function w() {
        if (!g.noDraw) {
            x[0].width = x[0].width;
            for (var k = 0; k < t; k++)
                for (var c = 0; c < s; c++) {
                    p = d[k][c];
                    if (p.type == y) q.fillStyle = J;
                    else if (p.type == C) q.fillStyle = X[p.level - 1];
                    else if (p.type == K) q.fillStyle = Y;
                    else continue;
                    q.fillRect(c * b, k * h, b, h);
                    p.level && E(q, c * b + b / 2, k * h + h / 2, p.level)
                }
            q.drawImage(z, 0, 0, b, h, a.x * b, a.y * h, b, h);
            q.fillStyle = "#fff";
            E(q, b * s - 100, 12, "Turns: " + u,
                "#fff")
        }
    }

    function B(a, d) {
        this.type = a;
        this.level = d
    }

    function n(k, c) {
        var b = d[a.y + c][a.x + k];
        if (b.type == y || 1 < Math.abs(b.level - a.level)) return !1;
        a.x += k;
        a.y += c;
        a.level = b.level;
        u++;
        w();
        b.type == K && (L = !0);
        return !0
    }

    function E(a, d, b, h, m) {
        a.save();
        a.fillStyle = m ? m : "#333";
        a.font = "12px Arial";
        a.textAlign = "center";
        a.fillText(h, d, b + 5);
        a.restore()
    }
    var F, d, x, z, q, b, h, p, r = {},
        u, a, L, A = 0,
        y = 1,
        C = 2,
        K = 3,
        Z = 4,
        G = 0,
        T = 1,
        U = 2,
        H = 3,
        J = "#4d4d4d",
        X = "#0cf #3f0 #af0 #ff0 #fa0 #f70 #f42".split(" "),
        Y = "#f0a",
        s = 18,
        t = 18,
        M = 2 // time;
    g.noDraw = !1;
    (function (k) {
        function c() {
            p = {
                left: {
                    type: d[a.y][a.x - 1].type,
                    level: d[a.y][a.x - 1].level
                },
                up: {
                    type: d[a.y - 1][a.x].type,
                    level: d[a.y - 1][a.x].level
                },
                right: {
                    type: d[a.y][a.x + 1].type,
                    level: d[a.y][a.x + 1].level
                },
                down: {
                    type: d[a.y + 1][a.x].type,
                    level: d[a.y + 1][a.x].level
                },
                type: d[a.y][a.x].type,
                level: d[a.y][a.x].level
            };
            var D = V.turn(p);
            r[D]();
            L ? (N = (new Date).getTime(), O.push(N - P), Q.push(u), $("h2").html("You Won! Turns: " + u + " Javascript Time: " + (N - P)), W.fillRect(0, 0, 400 * (++R / I), 18), R < I ? g() : $("h2").html("Average for " + I + " runs: " + n(Q) + " turns, " +
                n(O) + "ms")) : F = setTimeout(c, M)
        }

        function g() {
            clearTimeout(F);
            k.init();
            P = (new Date).getTime();
            V = new Stacker;
            c()
        }

        function n(D) {
            for (var a = 0, l = 0; a < D.length; l += D[a++]);
            return l / D.length
        }

        function m(a, e, l, d) {
            this.x = a;
            this.y = e;
            this.dist = l;
            this.level = d
        }

        function E(a, e) {
            var l = new J;
            l.add(new m(a.x, a.y, 0, d[a.y][a.x].level));
            for (var k = 0, f = l.get(k); f.x != e.x || f.y != e.y;) {
                for (var b = f, f = [], h = void 0, c = 0; 4 > c; c++) h = d[c == H || c == T ? b.y : c == G ? b.y - 1 : b.y + 1][c == G || c == U ? b.x : c == H ? b.x - 1 : b.x + 1], h.type != Z && h.type != y && (f[f.length] = new m(c ==
                    G || c == U ? b.x : c == H ? b.x - 1 : b.x + 1, c == H || c == T ? b.y : c == G ? b.y - 1 : b.y + 1, b.dist + 1, h.level));
                1 < f.length && (b = Math.random() * (f.length - 1) + 1 >> 0, h = f[b], f[b] = f[0], f[0] = h);
                for (var g in f) f.hasOwnProperty(g) && (l.contains(f[g]) ? l.get(l.indexOf(f[g])).dist > f[g].dist && l.set(l.indexOf(f[g]), f[g]) : l.add(f[g]));
                if (k == l.size - 1) return !1;
                f = l.get(++k)
            }
            return !0
        }

        function J() {
            this.size = 0;
            this.tail = {
                next: null
            };
            this.head = {
                prev: null,
                next: this.tail
            };
            this.tail.prev = this.head;
            this.add = function (a) {
                a.prev = this.tail.prev;
                a.next = this.tail;
                a.prev.next = a.next.prev = a;
                this.size++
            };
            this.remove = function (a) {
                a.prev.next = a.next;
                a.next.prev = a.prev;
                this.size--
            };
            this.contains = function (a) {
                for (var e = this.head.next; e;) {
                    if (a.equals(e)) return !0;
                    e = e.next
                }
                return !1
            };
            this.get = function (a) {
                for (var e = 0, b = this.head.next; b != this.tail;) {
                    if (e++ == a) return b;
                    b = b.next
                }
                return !1
            };
            this.getFirst = function () {
                return this.head.next
            };
            this.getLast = function () {
                return this.tail.prev
            };
            this.popFront = function () {
                var a = this.getFirst();
                this.remove(a);
                return a
            };
            this.set = function (a,
                b) {
                var d = this.get(a);
                d.prev.next = b;
                d.next.prev = b;
                b.prev = d.prev;
                b.next = d.next
            };
            this.indexOf = function (a) {
                for (var b = this.head.next, d = 0; b != this.tail;) {
                    if (a.equals(b)) return d;
                    d++;
                    b = b.next
                }
                return !1
            };
            this.values = function () {
                for (var a = [], b = this.head.next; b != this.tail;) a[a.length] = b, b = b.next;
                return a
            }
        }
        var V, P, N, R, I, S, W = $("#progress")[0].getContext("2d"),
            Q = [],
            O = [];
        k.init = function () {
            d = [];
            for (var c = 0; c < t; c++) {
                d[c] = [];
                for (var e = 0; e < s; e++) d[c][e] = 0 == c || c == t - 1 || 0 == e || e == s - 1 ? new B(y, 0) : new B(A, 0)
            }
            v(C, 50, 1);
            v(y, 50,
                0);
            var k = Math.random() * (s - 6) + 3 >> 0,
                g = Math.random() * (t - 6) + 3 >> 0;
            d[g][k] = new B(K, 8);
            for (c = 0; 5 > c; c++)
                for (e = 0; 5 > e; e++) d[g - 2 + e][k - 2 + c].type == y && (d[g - 2 + e][k - 2 + c] = new B(A, 0));
            for (e = c = 0; d[e][c].type != A || !E(new m(c, e), new m(k, g));) c = Math.random() * (s - 2) + 1 >> 0, e = Math.random() * (t - 2) + 1 >> 0;
            a = {
                x: c,
                y: e,
                level: 0
            };
            x = $("#field");
            q = x[0].getContext("2d");
            b = x.width() / s >> 0;
            h = x.height() / t >> 0;
            u = 0;
            L = !1;
            var f = new Image;
            z = document.createElement("canvas");
            z.width = b;
            z.height = h;
            f.onload = function () {
                z.getContext("2d").drawImage(f, 0,
                    0, 100, 100, 0, 0, b, h);
                w()
            };
            f.src = "minitroll.png";
            f.complete && (z.getContext("2d").drawImage(f, 0, 0, 100, 100, 0, 0, b, h), w());
            w()
        };
        k.run = function (a) {
            $("h2").html("Running Trials....");
            $("#progress")[0].width = $("#progress")[0].width;
            W.fillStyle = "#09f";
            I = a;
            R = 0;
            Q = [];
            O = [];
            g()
        };
        k.pause = function () {
            F && (S ? (S = !1, c()) : (S = !0, clearTimeout(F)))
        };
        m.prototype.equals = function (a) {
            return a.x == this.x && a.y == this.y
        }
    })(g);
    r.left = function () {
        n(-1, 0)
    };
    r.up = function () {
        n(0, -1)
    };
    r.right = function () {
        n(1, 0)
    };
    r.down = function () {
        n(0, 1)
    };
    r.pickup =
        function () {
            if (a.carrying || d[a.y][a.x].type != C) return !1;
            a.carrying = !0;
            d[a.y][a.x].type = 0 < --d[a.y][a.x].level ? C : A;
            a.level--;
            u++;
            w();
            return !0
        };
    r.drop = function () {
        if (!a.carrying) return !1;
        a.carrying = !1;
        d[a.y][a.x].type = C;
        d[a.y][a.x].level++;
        a.level++;
        u++;
        w();
        return !0
    };
    g.setDelay = function (a) {
        M = a
    };
    g.getDelay = function () {
        return M
    };
    g.test = function (a) {
        37 == a.which ? n(-1, 0) : 38 == a.which ? n(0, -1) : 39 == a.which ? n(1, 0) : 40 == a.which ? n(0, 1) : 32 == a.which && (r.pickup() || r.drop())
    }
})(game);

function print_all(g) {
    for (var v = 0; v < g.length; v++) console.log(g[v])
};