const g = "__jp", w = "callback";
function E() {
  let r = 0;
  return () => r++;
}
function h(r, o) {
  var c;
  const t = document.getElementsByTagName("script")[0] || document.head, n = document.createElement("script");
  return n.src = r, o && (n.onerror = o), (c = t.parentNode) == null || c.insertBefore(n, t), n;
}
function N(r, o) {
  const t = new URL(r), n = E(), { prefix: c = g } = o || {}, { param: p = w, name: s = `${c}${n()}`, timeout: d = 6e4 } = o || {};
  t.searchParams.set(p, s);
  let u = (e) => {
  }, i = (e) => {
  };
  const f = new Promise((e, T) => {
    u = e, i = T;
  }), l = h(t.href, () => {
    a(), i(new Error(`JSONP request to ${t.href} failed.`));
  }), m = setTimeout(() => {
    a(), i(new Error("Timeout"));
  }, d);
  function a() {
    var e;
    (e = l.parentNode) == null || e.removeChild(l), delete window[s], m && clearTimeout(m);
  }
  return window[s] = (e) => {
    a(), u(e);
  }, f;
}
export {
  N as jsonp
};
//# sourceMappingURL=index.es.js.map
