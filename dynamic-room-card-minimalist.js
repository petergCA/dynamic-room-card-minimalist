(() => {
  "use strict";
  const t = globalThis,
    e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
    o = Symbol(),
    n = new WeakMap;
  class r {
    constructor(t, e, n) {
      if (this._$cssResult$ = !0, n !== o) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t, this.t = e
    }
    get styleSheet() {
      let t = this.o;
      const o = this.t;
      if (e && void 0 === t) {
        const e = void 0 !== o && 1 === o.length;
        e && (t = n.get(o)), void 0 === t && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), e && n.set(o, t))
      }
      return t
    }
    toString() {
      return this.cssText
    }
  }
  const i = (t, ...e) => {
      const n = 1 === t.length ? t[0] : e.reduce((e, o, n) => e + (t => {
        if (!0 === t._$cssResult$) return t.cssText;
        if ("number" == typeof t) return t;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")
      })(o) + t[n + 1], t[0]);
      return new r(n, t, o)
    },
    a = (o, n) => {
      if (e) o.adoptedStyleSheets = n.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet);
      else
        for (const e of n) {
          const n = document.createElement("style"),
            r = t.litNonce;
          void 0 !== r && n.setAttribute("nonce", r), n.textContent = e.cssText, o.appendChild(n)
        }
    },
    c = e ? t => t : t => t instanceof CSSStyleSheet ? (t => {
      let e = "";
      for (const o of t.cssRules) e += o.cssText;
      return (t => new r("string" == typeof t ? t : t + "", void 0, o))(e)
    })(t) : t,
    {
      is: l,
      defineProperty: s,
      getOwnPropertyDescriptor: u,
      getOwnPropertyNames: d,
      getOwnPropertySymbols: p,
      getPrototypeOf: f
    } = Object,
    h = globalThis,
    _ = h.trustedTypes,
    y = _ ? _.emptyScript : "",
    g = h.reactiveElementPolyfillSupport,
    m = (t, e) => t,
    b = {
      toAttribute(t, e) {
        switch (e) {
        case Boolean:
          t = t ? y : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t)
        }
        return t
      },
      fromAttribute(t, e) {
        let o = t;
        switch (e) {
        case Boolean:
          o = null !== t;
          break;
        case Number:
          o = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            o = JSON.parse(t)
          } catch (t) {
            o = null
          }
        }
        return o
      }
    },
    v = (t, e) => !l(t, e),
    w = {
      attribute: !0,
      type: String,
      converter: b,
      reflect: !1,
      useDefault: !1,
      hasChanged: v
    };
  Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= new WeakMap;
  class k extends HTMLElement {
    static addInitializer(t) {
      this._$Ei(), (this.l ??= []).push(t)
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()]
    }
    static createProperty(t, e = w) {
      if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
        const o = Symbol(),
          n = this.getPropertyDescriptor(t, o, e);
        void 0 !== n && s(this.prototype, t, n)
      }
    }
    static getPropertyDescriptor(t, e, o) {
      const {
        get: n,
        set: r
      } = u(this.prototype, t) ?? {
        get() {
          return this[e]
        },
        set(t) {
          this[e] = t
        }
      };
      return {
        get: n,
        set(e) {
          const i = n?.call(this);
          r?.call(this, e), this.requestUpdate(t, i, o)
        },
        configurable: !0,
        enumerable: !0
      }
    }
    static getPropertyOptions(t) {
      return this.elementProperties.get(t) ?? w
    }
    static _$Ei() {
      if (this.hasOwnProperty(m("elementProperties"))) return;
      const t = f(this);
      t.finalize(), void 0 !== t.l && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties)
    }
    static finalize() {
      if (this.hasOwnProperty(m("finalized"))) return;
      if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(m("properties"))) {
        const t = this.properties,
          e = [...d(t), ...p(t)];
        for (const o of e) this.createProperty(o, t[o])
      }
      const t = this[Symbol.metadata];
      if (null !== t) {
        const e = litPropertyMetadata.get(t);
        if (void 0 !== e)
          for (const [t, o] of e) this.elementProperties.set(t, o)
      }
      this._$Eh = new Map;
      for (const [t, e] of this.elementProperties) {
        const o = this._$Eu(t, e);
        void 0 !== o && this._$Eh.set(o, t)
      }
      this.elementStyles = this.finalizeStyles(this.styles)
    }
    static finalizeStyles(t) {
      const e = [];
      if (Array.isArray(t)) {
        const o = new Set(t.flat(1 / 0).reverse());
        for (const t of o) e.unshift(c(t))
      } else void 0 !== t && e.push(c(t));
      return e
    }
    static _$Eu(t, e) {
      const o = e.attribute;
      return !1 === o ? void 0 : "string" == typeof o ? o : "string" == typeof t ? t.toLowerCase() : void 0
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev()
    }
    _$Ev() {
      this._$ES = new Promise(t => this.enableUpdating = t), this._$AL = new Map, this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(t => t(this))
    }
    addController(t) {
      (this._$EO ??= new Set).add(t), void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.()
    }
    removeController(t) {
      this._$EO?.delete(t)
    }
    _$E_() {
      const t = new Map,
        e = this.constructor.elementProperties;
      for (const o of e.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
      t.size > 0 && (this._$Ep = t)
    }
    createRenderRoot() {
      const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return a(t, this.constructor.elementStyles), t
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(t => t.hostConnected?.())
    }
    enableUpdating(t) {}
    disconnectedCallback() {
      this._$EO?.forEach(t => t.hostDisconnected?.())
    }
    attributeChangedCallback(t, e, o) {
      this._$AK(t, o)
    }
    _$ET(t, e) {
      const o = this.constructor.elementProperties.get(t),
        n = this.constructor._$Eu(t, o);
      if (void 0 !== n && !0 === o.reflect) {
        const r = (void 0 !== o.converter?.toAttribute ? o.converter : b).toAttribute(e, o.type);
        this._$Em = t, null == r ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null
      }
    }
    _$AK(t, e) {
      const o = this.constructor,
        n = o._$Eh.get(t);
      if (void 0 !== n && this._$Em !== n) {
        const t = o.getPropertyOptions(n),
          r = "function" == typeof t.converter ? {
            fromAttribute: t.converter
          } : void 0 !== t.converter?.fromAttribute ? t.converter : b;
        this._$Em = n;
        const i = r.fromAttribute(e, t.type);
        this[n] = i ?? this._$Ej?.get(n) ?? i, this._$Em = null
      }
    }
    requestUpdate(t, e, o, n = !1, r) {
      if (void 0 !== t) {
        const i = this.constructor;
        if (!1 === n && (r = this[t]), o ??= i.getPropertyOptions(t), !((o.hasChanged ?? v)(r, e) || o.useDefault && o.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, o)))) return;
        this.C(t, e, o)
      }!1 === this.isUpdatePending && (this._$ES = this._$EP())
    }
    C(t, e, {
      useDefault: o,
      reflect: n,
      wrapped: r
    }, i) {
      o && !(this._$Ej ??= new Map).has(t) && (this._$Ej.set(t, i ?? e ?? this[t]), !0 !== r || void 0 !== i) || (this._$AL.has(t) || (this.hasUpdated || o || (e = void 0), this._$AL.set(t, e)), !0 === n && this._$Em !== t && (this._$Eq ??= new Set).add(t))
    }
    async _$EP() {
      this.isUpdatePending = !0;
      try {
        await this._$ES
      } catch (t) {
        Promise.reject(t)
      }
      const t = this.scheduleUpdate();
      return null != t && await t, !this.isUpdatePending
    }
    scheduleUpdate() {
      return this.performUpdate()
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t, e] of this._$Ep) this[t] = e;
          this._$Ep = void 0
        }
        const t = this.constructor.elementProperties;
        if (t.size > 0)
          for (const [e, o] of t) {
            const {
              wrapped: t
            } = o, n = this[e];
            !0 !== t || this._$AL.has(e) || void 0 === n || this.C(e, void 0, o, n)
          }
      }
      let t = !1;
      const e = this._$AL;
      try {
        t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach(t => t.hostUpdate?.()), this.update(e)) : this._$EM()
      } catch (e) {
        throw t = !1, this._$EM(), e
      }
      t && this._$AE(e)
    }
    willUpdate(t) {}
    _$AE(t) {
      this._$EO?.forEach(t => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t)
    }
    _$EM() {
      this._$AL = new Map, this.isUpdatePending = !1
    }
    get updateComplete() {
      return this.getUpdateComplete()
    }
    getUpdateComplete() {
      return this._$ES
    }
    shouldUpdate(t) {
      return !0
    }
    update(t) {
      this._$Eq &&= this._$Eq.forEach(t => this._$ET(t, this[t])), this._$EM()
    }
    updated(t) {}
    firstUpdated(t) {}
  }
  k.elementStyles = [], k.shadowRootOptions = {
    mode: "open"
  }, k[m("elementProperties")] = new Map, k[m("finalized")] = new Map, g?.({
    ReactiveElement: k
  }), (h.reactiveElementVersions ??= []).push("2.1.2");
  const x = globalThis,
    S = t => t,
    O = x.trustedTypes,
    A = O ? O.createPolicy("lit-html", {
      createHTML: t => t
    }) : void 0,
    $ = "$lit$",
    E = `lit$${Math.random().toFixed(9).slice(2)}$`,
    T = "?" + E,
    C = `<${T}>`,
    j = document,
    P = () => j.createComment(""),
    M = t => null === t || "object" != typeof t && "function" != typeof t,
    z = Array.isArray,
    I = t => z(t) || "function" == typeof t?.[Symbol.iterator],
    R = "[ \t\n\f\r]",
    D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    U = /-->/g,
    H = />/g,
    N = RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"),
    L = /'/g,
    B = /"/g,
    V = /^(?:script|style|textarea|title)$/i,
    q = t => (e, ...o) => ({
      _$litType$: t,
      strings: e,
      values: o
    }),
    F = q(1),
    Z = (q(2), q(3), Symbol.for("lit-noChange")),
    W = Symbol.for("lit-nothing"),
    G = new WeakMap,
    Y = j.createTreeWalker(j, 129);

  function K(t, e) {
    if (!z(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== A ? A.createHTML(e) : e
  }
  const J = (t, e) => {
    const o = t.length - 1,
      n = [];
    let r, i = 2 === e ? "<svg>" : 3 === e ? "<math>" : "",
      a = D;
    for (let e = 0; e < o; e++) {
      const o = t[e];
      let c, l, s = -1,
        u = 0;
      for (; u < o.length && (a.lastIndex = u, l = a.exec(o), null !== l);) u = a.lastIndex, a === D ? "!--" === l[1] ? a = U : void 0 !== l[1] ? a = H : void 0 !== l[2] ? (V.test(l[2]) && (r = RegExp("</" + l[2], "g")), a = N) : void 0 !== l[3] && (a = N) : a === N ? ">" === l[0] ? (a = r ?? D, s = -1) : void 0 === l[1] ? s = -2 : (s = a.lastIndex - l[2].length, c = l[1], a = void 0 === l[3] ? N : '"' === l[3] ? B : L) : a === B || a === L ? a = N : a === U || a === H ? a = D : (a = N, r = void 0);
      const d = a === N && t[e + 1].startsWith("/>") ? " " : "";
      i += a === D ? o + C : s >= 0 ? (n.push(c), o.slice(0, s) + $ + o.slice(s) + E + d) : o + E + (-2 === s ? e : d)
    }
    return [K(t, i + (t[o] || "<?>") + (2 === e ? "</svg>" : 3 === e ? "</math>" : "")), n]
  };
  class Q {
    constructor({
      strings: t,
      _$litType$: e
    }, o) {
      let n;
      this.parts = [];
      let r = 0,
        i = 0;
      const a = t.length - 1,
        c = this.parts,
        [l, s] = J(t, e);
      if (this.el = Q.createElement(l, o), Y.currentNode = this.el.content, 2 === e || 3 === e) {
        const t = this.el.content.firstChild;
        t.replaceWith(...t.childNodes)
      }
      for (; null !== (n = Y.nextNode()) && c.length < a;) {
        if (1 === n.nodeType) {
          if (n.hasAttributes())
            for (const t of n.getAttributeNames())
              if (t.endsWith($)) {
                const e = s[i++],
                  o = n.getAttribute(t).split(E),
                  a = /([.?@])?(.*)/.exec(e);
                c.push({
                  type: 1,
                  index: r,
                  name: a[2],
                  strings: o,
                  ctor: "." === a[1] ? nt : "?" === a[1] ? rt : "@" === a[1] ? it : ot
                }), n.removeAttribute(t)
              } else t.startsWith(E) && (c.push({
                type: 6,
                index: r
              }), n.removeAttribute(t));
          if (V.test(n.tagName)) {
            const t = n.textContent.split(E),
              e = t.length - 1;
            if (e > 0) {
              n.textContent = O ? O.emptyScript : "";
              for (let o = 0; o < e; o++) n.append(t[o], P()), Y.nextNode(), c.push({
                type: 2,
                index: ++r
              });
              n.append(t[e], P())
            }
          }
        } else if (8 === n.nodeType)
          if (n.data === T) c.push({
            type: 2,
            index: r
          });
          else {
            let t = -1;
            for (; - 1 !== (t = n.data.indexOf(E, t + 1));) c.push({
              type: 7,
              index: r
            }), t += E.length - 1
          } r++
      }
    }
    static createElement(t, e) {
      const o = j.createElement("template");
      return o.innerHTML = t, o
    }
  }

  function X(t, e, o = t, n) {
    if (e === Z) return e;
    let r = void 0 !== n ? o._$Co?.[n] : o._$Cl;
    const i = M(e) ? void 0 : e._$litDirective$;
    return r?.constructor !== i && (r?._$AO?.(!1), void 0 === i ? r = void 0 : (r = new i(t), r._$AT(t, o, n)), void 0 !== n ? (o._$Co ??= [])[n] = r : o._$Cl = r), void 0 !== r && (e = X(t, r._$AS(t, e.values), r, n)), e
  }
  class tt {
    constructor(t, e) {
      this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e
    }
    get parentNode() {
      return this._$AM.parentNode
    }
    get _$AU() {
      return this._$AM._$AU
    }
    u(t) {
      const {
        el: {
          content: e
        },
        parts: o
      } = this._$AD, n = (t?.creationScope ?? j).importNode(e, !0);
      Y.currentNode = n;
      let r = Y.nextNode(),
        i = 0,
        a = 0,
        c = o[0];
      for (; void 0 !== c;) {
        if (i === c.index) {
          let e;
          2 === c.type ? e = new et(r, r.nextSibling, this, t) : 1 === c.type ? e = new c.ctor(r, c.name, c.strings, this, t) : 6 === c.type && (e = new at(r, this, t)), this._$AV.push(e), c = o[++a]
        }
        i !== c?.index && (r = Y.nextNode(), i++)
      }
      return Y.currentNode = j, n
    }
    p(t) {
      let e = 0;
      for (const o of this._$AV) void 0 !== o && (void 0 !== o.strings ? (o._$AI(t, o, e), e += o.strings.length - 2) : o._$AI(t[e])), e++
    }
  }
  class et {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv
    }
    constructor(t, e, o, n) {
      this.type = 2, this._$AH = W, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = o, this.options = n, this._$Cv = n?.isConnected ?? !0
    }
    get parentNode() {
      let t = this._$AA.parentNode;
      const e = this._$AM;
      return void 0 !== e && 11 === t?.nodeType && (t = e.parentNode), t
    }
    get startNode() {
      return this._$AA
    }
    get endNode() {
      return this._$AB
    }
    _$AI(t, e = this) {
      t = X(this, t, e), M(t) ? t === W || null == t || "" === t ? (this._$AH !== W && this._$AR(), this._$AH = W) : t !== this._$AH && t !== Z && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : I(t) ? this.k(t) : this._(t)
    }
    O(t) {
      return this._$AA.parentNode.insertBefore(t, this._$AB)
    }
    T(t) {
      this._$AH !== t && (this._$AR(), this._$AH = this.O(t))
    }
    _(t) {
      this._$AH !== W && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(j.createTextNode(t)), this._$AH = t
    }
    $(t) {
      const {
        values: e,
        _$litType$: o
      } = t, n = "number" == typeof o ? this._$AC(t) : (void 0 === o.el && (o.el = Q.createElement(K(o.h, o.h[0]), this.options)), o);
      if (this._$AH?._$AD === n) this._$AH.p(e);
      else {
        const t = new tt(n, this),
          o = t.u(this.options);
        t.p(e), this.T(o), this._$AH = t
      }
    }
    _$AC(t) {
      let e = G.get(t.strings);
      return void 0 === e && G.set(t.strings, e = new Q(t)), e
    }
    k(t) {
      z(this._$AH) || (this._$AH = [], this._$AR());
      const e = this._$AH;
      let o, n = 0;
      for (const r of t) n === e.length ? e.push(o = new et(this.O(P()), this.O(P()), this, this.options)) : o = e[n], o._$AI(r), n++;
      n < e.length && (this._$AR(o && o._$AB.nextSibling, n), e.length = n)
    }
    _$AR(t = this._$AA.nextSibling, e) {
      for (this._$AP?.(!1, !0, e); t !== this._$AB;) {
        const e = S(t).nextSibling;
        S(t).remove(), t = e
      }
    }
    setConnected(t) {
      void 0 === this._$AM && (this._$Cv = t, this._$AP?.(t))
    }
  }
  class ot {
    get tagName() {
      return this.element.tagName
    }
    get _$AU() {
      return this._$AM._$AU
    }
    constructor(t, e, o, n, r) {
      this.type = 1, this._$AH = W, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = r, o.length > 2 || "" !== o[0] || "" !== o[1] ? (this._$AH = Array(o.length - 1).fill(new String), this.strings = o) : this._$AH = W
    }
    _$AI(t, e = this, o, n) {
      const r = this.strings;
      let i = !1;
      if (void 0 === r) t = X(this, t, e, 0), i = !M(t) || t !== this._$AH && t !== Z, i && (this._$AH = t);
      else {
        const n = t;
        let a, c;
        for (t = r[0], a = 0; a < r.length - 1; a++) c = X(this, n[o + a], e, a), c === Z && (c = this._$AH[a]), i ||= !M(c) || c !== this._$AH[a], c === W ? t = W : t !== W && (t += (c ?? "") + r[a + 1]), this._$AH[a] = c
      }
      i && !n && this.j(t)
    }
    j(t) {
      t === W ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "")
    }
  }
  class nt extends ot {
    constructor() {
      super(...arguments), this.type = 3
    }
    j(t) {
      this.element[this.name] = t === W ? void 0 : t
    }
  }
  class rt extends ot {
    constructor() {
      super(...arguments), this.type = 4
    }
    j(t) {
      this.element.toggleAttribute(this.name, !!t && t !== W)
    }
  }
  class it extends ot {
    constructor(t, e, o, n, r) {
      super(t, e, o, n, r), this.type = 5
    }
    _$AI(t, e = this) {
      if ((t = X(this, t, e, 0) ?? W) === Z) return;
      const o = this._$AH,
        n = t === W && o !== W || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive,
        r = t !== W && (o === W || n);
      n && this.element.removeEventListener(this.name, this, o), r && this.element.addEventListener(this.name, this, t), this._$AH = t
    }
    handleEvent(t) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t)
    }
  }
  class at {
    constructor(t, e, o) {
      this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = o
    }
    get _$AU() {
      return this._$AM._$AU
    }
    _$AI(t) {
      X(this, t)
    }
  }
  const ct = x.litHtmlPolyfillSupport;
  ct?.(Q, et), (x.litHtmlVersions ??= []).push("3.3.2");
  const lt = globalThis;
  class st extends k {
    constructor() {
      super(...arguments), this.renderOptions = {
        host: this
      }, this._$Do = void 0
    }
    createRenderRoot() {
      const t = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t.firstChild, t
    }
    update(t) {
      const e = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ((t, e, o) => {
        const n = o?.renderBefore ?? e;
        let r = n._$litPart$;
        if (void 0 === r) {
          const t = o?.renderBefore ?? null;
          n._$litPart$ = r = new et(e.insertBefore(P(), t), t, void 0, o ?? {})
        }
        return r._$AI(t), r
      })(e, this.renderRoot, this.renderOptions)
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(!0)
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(!1)
    }
    render() {
      return Z
    }
  }
  st._$litElement$ = !0, st.finalized = !0, lt.litElementHydrateSupport?.({
    LitElement: st
  });
  const ut = lt.litElementPolyfillSupport;
  ut?.({
    LitElement: st
  });
  (lt.litElementVersions ??= []).push("4.2.2");
  const dt = {
      attribute: !0,
      type: String,
      converter: b,
      reflect: !1,
      hasChanged: v
    },
    pt = (t = dt, e, o) => {
      const {
        kind: n,
        metadata: r
      } = o;
      let i = globalThis.litPropertyMetadata.get(r);
      if (void 0 === i && globalThis.litPropertyMetadata.set(r, i = new Map), "setter" === n && ((t = Object.create(t)).wrapped = !0), i.set(o.name, t), "accessor" === n) {
        const {
          name: n
        } = o;
        return {
          set(o) {
            const r = e.get.call(this);
            e.set.call(this, o), this.requestUpdate(n, r, t, !0, o)
          },
          init(e) {
            return void 0 !== e && this.C(n, void 0, t, e), e
          }
        }
      }
      if ("setter" === n) {
        const {
          name: n
        } = o;
        return function (o) {
          const r = this[n];
          e.call(this, o), this.requestUpdate(n, r, t, !0, o)
        }
      }
      throw Error("Unsupported decorator location: " + n)
    };

  function ft(t) {
    return (e, o) => "object" == typeof o ? pt(t, e, o) : ((t, e, o) => {
      const n = e.hasOwnProperty(o);
      return e.constructor.createProperty(o, t), n ? Object.getOwnPropertyDescriptor(e, o) : void 0
    })(t, e, o)
  }

  function ht(t) {
    return ft({
      ...t,
      state: !0,
      attribute: !1
    })
  }
  var _t = {
    blue: {
      icon_color: "rgba(var(--color-blue, 61, 90, 254),1)",
      background_color: "rgba(var(--color-blue, 61, 90, 254), 0.2)",
      text_color: "rgba(var(--color-blue-text, 61, 90, 254),1)"
    },
    lightblue: {
      icon_color: "rgba(var(--color-lightblue, 3, 169, 244),1)",
      background_color: "rgba(var(--color-lightblue, 3, 169, 244), 0.2)",
      text_color: "rgba(var(--color-lightblue-text, 3, 169, 244),1)"
    },
    red: {
      icon_color: "rgba(var(--color-red, 245, 68, 54),1)",
      background_color: "rgba(var(--color-red, 245, 68, 54), 0.2)",
      text_color: "rgba(var(--color-red-text, 245, 68, 54),1)"
    },
    green: {
      icon_color: "rgba(var(--color-green, 1, 200, 82),1)",
      background_color: "rgba(var(--color-green, 1, 200, 82), 0.2)",
      text_color: "rgba(var(--color-green-text, 1, 200, 82),1)"
    },
    lightgreen: {
      icon_color: "rgba(var(--color-lightgreen, 139, 195, 74),1)",
      background_color: "rgba(var(--color-lightgreen, 139, 195, 74), 0.2)",
      text_color: "rgba(var(--color-lightgreen-text, 139, 195, 74),1)"
    },
    yellow: {
      icon_color: "rgba(var(--color-yellow, 255, 145, 1),1)",
      background_color: "rgba(var(--color-yellow, 255, 145, 1), 0.2)",
      text_color: "rgba(var(--color-yellow-text, 255, 145, 1),1)"
    },
    purple: {
      icon_color: "rgba(var(--color-purple, 102, 31, 255),1)",
      background_color: "rgba(var(--color-purple, 102, 31, 255), 0.2)",
      text_color: "rgba(var(--color-purple-text, 102, 31, 255),1)"
    },
    orange: {
      icon_color: "rgba(var(--color-orange, 255, 87, 34),1)",
      background_color: "rgba(var(--color-orange, 255, 87, 34), 0.2)",
      text_color: "rgba(var(--color-orange-text, 255, 87, 34),1)"
    },
    pink: {
      icon_color: "rgba(var(--color-pink, 233, 30, 99),1)",
      background_color: "rgba(var(--color-pink, 233, 30, 99), 0.2)",
      text_color: "rgba(var(--color-pink-text, 233, 30, 99),1)"
    },
    grey: {
      icon_color: "rgba(var(--color-grey, 158, 158, 158),1)",
      background_color: "rgba(var(--color-grey, 158, 158, 158), 0.2)",
      text_color: "rgba(var(--color-grey-text, 158, 158, 158),1)"
    },
    teal: {
      icon_color: "rgba(var(--color-teal, 0, 150, 136),1)",
      background_color: "rgba(var(--color-teal, 0, 150, 136), 0.2)",
      text_color: "rgba(var(--color-teal-text, 0, 150, 136),1)"
    },
    indigo: {
      icon_color: "rgba(var(--color-indigo, 63, 81, 181),1)",
      background_color: "rgba(var(--color-indigo, 63, 81, 181), 0.2)",
      text_color: "rgba(var(--color-indigo-text, 63, 81, 181),1)"
    }
  };

  function yt() {
    var t = Object.keys(_t);
    return t[Math.floor(Math.random() * t.length)]
  }
  var gt = {
    vacuum: ["idle", "cleaning", "paused", "returning", "docked", "error"],
    alarm_control_panel: ["disarmed", "armed_home", "armed_away", "armed_night", "triggered", "pending", "arming"],
    media_player: ["off", "idle", "playing", "paused", "buffering"],
    lock: ["locked", "unlocked", "locking", "unlocking", "jammed"],
    cover: ["open", "closed", "opening", "closing"],
    fan: ["off", "on", "low", "medium", "high"],
    humidifier: ["off", "on", "humidifying", "drying"],
    water_heater: ["off", "eco", "electric", "gas", "heat_pump", "performance"]
  };

  function mt(t) {
    if (!t) return [];
    var e = t.split(".")[0];
    return gt[e] || []
  }
  var bt = {
      icon_color: "var(--primary-text-color)",
      background_color: "transparent",
      text_color: "var(--primary-text-color)"
    },
    vt = ["light", "switch", "fan", "automation", "script", "input_boolean"];
  var wt = {
    light: "mdi:lightbulb",
    switch: "mdi:toggle-switch",
    fan: "mdi:fan",
    climate: "mdi:thermostat",
    cover: "mdi:window-shutter",
    lock: "mdi:lock",
    sensor: "mdi:gauge",
    binary_sensor: "mdi:checkbox-marked-circle",
    camera: "mdi:camera",
    media_player: "mdi:speaker",
    automation: "mdi:robot",
    script: "mdi:script-text",
    scene: "mdi:palette",
    vacuum: "mdi:robot-vacuum",
    humidifier: "mdi:air-humidifier",
    water_heater: "mdi:water-boiler",
    alarm_control_panel: "mdi:shield-home"
  };

  function kt(t) {
    var e;
    return null !== (e = null == t ? void 0 : t.startsWith("climate.")) && void 0 !== e && e
  }

  function xt(t, e) {
    if (null != t && t.states && e) return t.states[e]
  }

  function St(t, e) {
    var o, n = xt(t, e);
    return null != n && null !== (o = n.attributes) && void 0 !== o && o.hvac_modes ? n.attributes.hvac_modes : []
  }

  function Ot(t, e) {
    return function (t) {
      if (Array.isArray(t)) return t
    }(t) || function (t, e) {
      var o = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
      if (null != o) {
        var n, r, i, a, c = [],
          l = !0,
          s = !1;
        try {
          if (i = (o = o.call(t)).next, 0 === e) {
            if (Object(o) !== o) return;
            l = !1
          } else
            for (; !(l = (n = i.call(o)).done) && (c.push(n.value), c.length !== e); l = !0);
        } catch (t) {
          s = !0, r = t
        } finally {
          try {
            if (!l && null != o.return && (a = o.return(), Object(a) !== a)) return
          } finally {
            if (s) throw r
          }
        }
        return c
      }
    }(t, e) || $t(t, e) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }()
  }

  function At(t) {
    return function (t) {
      if (Array.isArray(t)) return Et(t)
    }(t) || function (t) {
      if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
    }(t) || $t(t) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }()
  }

  function $t(t, e) {
    if (t) {
      if ("string" == typeof t) return Et(t, e);
      var o = {}.toString.call(t).slice(8, -1);
      return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? Et(t, e) : void 0
    }
  }

  function Et(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var o = 0, n = Array(e); o < e; o++) n[o] = t[o];
    return n
  }
  var Tt, Ct = {
    en: JSON.parse('{"show_value":"Display State in Circle below Icon","value_template":"Template (e.g. {{ states(\'sensor.xxx\') }}%)","use_multi_state":"Multi-State Mode","use_multi_state_description":"Enable Multi-State Mode for custom state colors","custom_states":"States (comma separated)","custom_states_hint":"Enter states like: idle, cleaning, paused","custom_states_helper":"Select states used for Multi-State Mode, others use fallback icon","card_template":"Card Color Preset","card_template_none":"None","card_icon_image":"Card Icon/Image","background_type":"Background Type","background_type_none":"None","background_type_color":"Colorcircle","background_type_image":"Image","background_type_person":"Person","background_circle_color":"Background Color","background_image":"Background Image","background_image_square":"Square Background","background_person_entity":"Person Entity","use_template_color_for_title":"Use Preset Color for Title","use_template_color_for_secondary":"Use Preset Color for Secondary","secondary_allow_html":"Allow HTML in Secondary Info","tertiary":"Tertiary Info","tertiary_color":"Tertiary Info Color","tertiary_entity":"Tertiary Info Entity (for actions)","tertiary_allow_html":"Allow HTML in Tertiary Info","use_template_color_for_tertiary":"Use Preset Color for Tertiary","entities_reverse_order":"Align Entities from Bottom-Up","secondary":"Secondary Info","secondary_color":"Secondary Info Color","secondary_entity":"Secondary Info Entity (for actions)","icon_color":"Icon Color - empty for preset color","add_entity":"Add Entity","move_up":"Move Up","move_down":"Move Down","delete":"Delete","entity_type":"Type","entity_type_entity":"Entity","entity_type_template":"Template","condition":"Condition","icon_on":"Icon (On)","icon_off":"Icon (Off)","icon_fallback":"Icon (Fallback)","on_state":"On State (typical \\"on\\")","template_on":"Template (On)","template_off":"Template (Off)","color_on":"Color (On)","color_off":"Color (Off)","background_color_on":"Background Color (On)","background_color_off":"Background Color (Off)","use_light_color":"Use Light Color","states":"States","add_state":"Add State","state_type":"State Type","maximum_states_reached":"Maximum 4 states reached","template_condition":"Template Condition (On state)","state_label":"State","use_light_color_description":"Use Light Color as icon and background color","background_color_for":"Background Color for","background_circle_color_template_hint":"Background Circle Color - empty for preset color","colors":{"blue":"Blue","lightblue":"Light Blue","red":"Red","green":"Green","lightgreen":"Light Green","yellow":"Yellow","purple":"Purple","orange":"Orange","pink":"Pink","grey":"Grey","teal":"Teal","indigo":"Indigo"}}'),
    de: JSON.parse('{"show_value":"Status im Kreis unterm Symbol anzeigen","value_template":"Template (z.B. {{ states(\'sensor.xxx\') }}%)","use_multi_state":"Multi-State Modus","use_multi_state_description":"Multi-State Modus für benutzerdefinierte Zustandsfarben aktivieren","custom_states":"Zustände (kommasepariert)","custom_states_hint":"Zustände eingeben, z.B.: idle, cleaning, paused","custom_states_helper":"Wähle Zustände für Multi-State Mode, andere nutzen Fallback-Icon","card_template":"Vorlage für Kartenfarbe","card_template_none":"Keine","card_icon_image":"Karten-Icon/Bild","background_type":"Hintergrundtyp","background_type_none":"Kein Hintergrund","background_type_color":"Farbkreis","background_type_image":"Bild","background_type_person":"Person","background_circle_color":"Hintergrundfarbe","background_image":"Hintergrundbild","background_image_square":"Quadratischer Hintergrund","background_person_entity":"Person auswählen","use_template_color_for_title":"Vorlagenfarbe für Name verwenden","use_template_color_for_secondary":"Vorlagenfarbe für Zusatzinfo verwenden","secondary_allow_html":"HTML in Zusatzinfo erlauben","tertiary":"Tertiärinfo","tertiary_color":"Tertiärinfo-Farbe","tertiary_entity":"Tertiärinfo-Entität (für Aktionen)","tertiary_allow_html":"HTML in Tertiärinfo erlauben","use_template_color_for_tertiary":"Vorlagenfarbe für Tertiärinfo verwenden","entities_reverse_order":"Zustände nach unten ausrichten","secondary":"Zusatzinfo","secondary_color":"Zusatzinfo-Farbe","secondary_entity":"Zusatzinfo-Entität (für Aktionen)","icon_color":"Symbolfarbe - leer für Farbe aus Kartenvorlage","add_entity":"Entität hinzufügen","move_up":"Nach oben","move_down":"Nach unten","delete":"Löschen","entity_type":"Typ","entity_type_entity":"Entität","entity_type_template":"Template","condition":"Bedingung","icon_on":"Symbol (An)","icon_off":"Symbol (Aus)","icon_fallback":"Symbol (Fallback)","on_state":"Zustand für An (meistens \\"on\\")","template_on":"Vorlagenfarbe (An)","template_off":"Vorlagenfarbe (Aus)","color_on":"Farbe (An)","color_off":"Farbe (Aus)","background_color_on":"Hintergrundfarbe (An)","background_color_off":"Hintergrundfarbe (Aus)","use_light_color":"Lichtfarbe verwenden","states":"Zustände","add_state":"Zustand hinzufügen","state_type":"Zustand-Typ","maximum_states_reached":"Maximum von 4 Zuständen erreicht","template_condition":"Template","state_label":"Zustand","use_light_color_description":"Lichtfarbe als Symbol- und Hintergrundfarbe verwenden","background_color_for":"Hintergrundfarbe für","background_circle_color_template_hint":"Hintergrundkreis Farbe - leer für Farbe aus Kartenvorlage","colors":{"blue":"Blau","lightblue":"Hellblau","red":"Rot","green":"Grün","lightgreen":"Hellgrün","yellow":"Gelb","purple":"Lila","orange":"Orange","pink":"Rosa","grey":"Grau","teal":"Türkis","indigo":"Indigo"}}')
  };

  function jt(t) {
    var e;
    return (null == t || null === (e = t.locale) || void 0 === e ? void 0 : e.language) || (null == t ? void 0 : t.language) || "en"
  }

  function Pt(t, e) {
    var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e;
    if (!t) return o;
    var n = jt(t),
      r = Ct[n] || Ct.en || {};
    if (e.includes(".")) {
      var i, a = r,
        c = function (t, e) {
          var o = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
          if (!o) {
            if (Array.isArray(t) || (o = $t(t)) || e && t && "number" == typeof t.length) {
              o && (t = o);
              var n = 0,
                r = function () {};
              return {
                s: r,
                n: function () {
                  return n >= t.length ? {
                    done: !0
                  } : {
                    done: !1,
                    value: t[n++]
                  }
                },
                e: function (t) {
                  throw t
                },
                f: r
              }
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
          }
          var i, a = !0,
            c = !1;
          return {
            s: function () {
              o = o.call(t)
            },
            n: function () {
              var t = o.next();
              return a = t.done, t
            },
            e: function (t) {
              c = !0, i = t
            },
            f: function () {
              try {
                a || null == o.return || o.return()
              } finally {
                if (c) throw i
              }
            }
          }
        }(e.split("."));
      try {
        for (c.s(); !(i = c.n()).done;) {
          var l, s = i.value;
          if (void 0 === (a = null === (l = a) || void 0 === l ? void 0 : l[s])) break
        }
      } catch (t) {
        c.e(t)
      } finally {
        c.f()
      }
      return a || o
    }
    return r[e] || o
  }

  function Mt(t) {
    var e = jt(t),
      o = (Ct[e] || Ct.en || {}).colors || {};
    return [{
      label: Pt(t, "card_template_none", "None"),
      value: "none"
    }].concat(At(Object.entries(o).map(function (t) {
      var e = Ot(t, 2),
        o = e[0];
      return {
        label: e[1],
        value: o
      }
    })))
  }
  var zt, It = i(Tt || (Tt = function (t, e) {
    return e || (e = t.slice(0)), Object.freeze(Object.defineProperties(t, {
      raw: {
        value: Object.freeze(e)
      }
    }))
  }([" :host { --main-color: rgb(var(--rgb-grey)); --icon-size: 80px; --icon-background-size: 110px; --state-icon-size: 1.75rem; --state-item-size: 43px; --card-primary-font-size: 20px; --card-primary-font-weight: 600; --card-primary-line-height: 1.3; --card-secondary-font-weight: 400; --card-secondary-font-size: 14px; --card-secondary-line-height: 1.2; --spacing: 8px; --border-radius: 12px; --state-border-radius: 50%; box-sizing: border-box; border-radius: var(--ha-card-border-radius, 12px); border-width: var(--ha-card-border-width, 1px); border-style: solid; border-color: var(--ha-card-border-color, var(--divider-color)); box-shadow: var(--ha-card-box-shadow); transition: box-shadow 0.3s ease; display: block; width: 100%; height: auto; min-height: unset; } :host(:has(.clickable)):hover { box-shadow: var(--material-shadow-elevation-4); } ha-card { border-radius: inherit; background: var(--card-background-color); position: relative; z-index: 1; border: none; width: 100%; height: auto; min-height: unset; overflow: hidden; box-shadow: none; } ha-card.clickable:hover { cursor: pointer; } ha-card.non-clickable { cursor: default; } .container { display: flex; flex-direction: row; align-items: flex-start; gap: 0; padding: 16px; height: auto; min-height: unset; position: relative; z-index: 2; overflow: visible; } .content-main { display: flex; flex-direction: column; justify-content: flex-start; flex: 0 0 30%; padding-right: 15px; gap: 12px; } .text-content { display: flex; flex-direction: column; justify-content: flex-start; min-width: 0; align-self: flex-start; } .icon-container { position: relative; display: flex; align-items: center; justify-content: center; flex-shrink: 0; align-self: flex-start; width: var(--icon-size); height: var(--icon-size); overflow: visible; margin-top: auto; } .icon-background { position: absolute; top: calc(var(--icon-size) / 2 - var(--icon-background-size) / 2); left: calc(var(--icon-size) / 2 - var(--icon-background-size) / 2); width: var(--icon-background-size); height: var(--icon-background-size); border-radius: 50%; opacity: 0.2; z-index: 1; } .icon-background-image { background-size: cover; background-position: center; background-repeat: no-repeat; opacity: 1 !important; } .icon-background-square { border-radius: var(--border-radius); width: 140px !important; height: 140px !important; left: -16px !important; top: -45px !important; } .icon { position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; width: var(--icon-size); height: var(--icon-size); } .icon ha-icon { --mdc-icon-size: var(--icon-size); color: var(--icon-color); filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1)); } .icon-background-image ~ .icon ha-icon { filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3)); } .primary { font-weight: var(--card-primary-font-weight); font-size: var(--card-primary-font-size); line-height: var(--card-primary-line-height); color: var(--primary-text-color); text-overflow: ellipsis; overflow: hidden; white-space: nowrap; margin-bottom: 6px; } .secondary { font-weight: var(--card-secondary-font-weight); font-size: var(--card-secondary-font-size); line-height: var(--card-secondary-line-height); color: var(--secondary-text-color); text-overflow: ellipsis; overflow: hidden; white-space: nowrap; } .secondary.clickable { cursor: pointer; transition: opacity 0.2s ease; } .secondary.clickable:hover { opacity: 0.8; } .tertiary { font-weight: var(--card-secondary-font-weight); font-size: var(--card-secondary-font-size); line-height: var(--card-secondary-line-height); color: var(--secondary-text-color); text-overflow: ellipsis; overflow: hidden; white-space: nowrap; } .tertiary.clickable { cursor: pointer; transition: opacity 0.2s ease; } .tertiary.clickable:hover { opacity: 0.8; } .content-right { display: flex; align-items: flex-start; flex: 1 1 0; min-width: 0; } .states { display: grid; grid-template-columns: repeat(var(--entity-columns, 1), minmax(0, 1fr)); grid-template-rows: repeat(var(--entity-rows), minmax(var(--state-item-size), auto)); grid-auto-rows: minmax(var(--state-item-size), auto); column-gap: 12px; row-gap: 6px; align-content: start; justify-content: stretch; flex: 1 1 0; min-width: 0; width: 100%; box-sizing: border-box; } .states-reverse { align-content: end; padding-top: 0; padding-bottom: 20px; } /* Entity state item — horizontal row: [icon circle] [name?] */ .state-item { display: flex; flex-direction: row; align-items: center; gap: 10px; position: relative; z-index: 1; min-width: 0; } .state-item.clickable { cursor: pointer; } .state-item.non-clickable { cursor: default; } .state-item.clickable:hover .state-icon-circle { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); } /* Circular icon container */ .state-icon-circle { display: flex; align-items: center; justify-content: center; width: var(--state-item-size); height: var(--state-item-size); border-radius: var(--state-border-radius); transition: all 0.2s ease; position: relative; flex-shrink: 0; } .state-icon-circle.has-value { overflow: visible; } .state-icon { --mdc-icon-size: var(--state-icon-size); transition: color 0.2s ease; color: var(--primary-text-color); } .state-icon.on { color: var(--primary-color); } .state-icon.off { color: var(--secondary-text-color); } .state-value { position: absolute; bottom: -2px; left: 50%; transform: translateX(-50%); font-size: 10px; font-weight: 600; white-space: nowrap; text-align: center; line-height: 1; background: var(--card-background-color, var(--ha-card-background, #fff)); padding: 1px 4px; border-radius: 4px; } /* Entity name label */ .state-name { font-size: 14px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1 1 0; min-width: 0; line-height: 1.2; display: block; } .invalid-entity { color: var(--error-color); font-size: 10px; text-align: center; } /* Material-You Theme Compatibility */ @media (prefers-color-scheme: dark) { ha-card { background: var(--card-background-color, var(--ha-card-background, #1f1f1f)); } .icon-background { opacity: 0.3; } } /* Responsive adjustments */ @media (max-width: 768px) { :host { min-height: 200px; --icon-size: 60px; --icon-background-size: 90px; --state-item-size: 38px; --state-icon-size: 1.4rem; } .container { padding: 12px; height: auto; min-height: unset; } .states { padding-top: 0; padding-left: 0; column-gap: 16px; row-gap: 10px; } .states-reverse { padding-bottom: 0; } .state-value { font-size: 9px; padding: 1px 3px; } .state-name { font-size: 14px; } .icon-background-square { width: 115px !important; height: 115px !important; top: -45px !important; left: -13px !important; } } "])));
  var Rt, Dt, Ut, Ht, Nt, Lt, Bt, Vt = i(zt || (zt = function (t, e) {
    return e || (e = t.slice(0)), Object.freeze(Object.defineProperties(t, {
      raw: {
        value: Object.freeze(e)
      }
    }))
  }([" :host { display: block; box-sizing: border-box; width: 100%; overflow-x: hidden; } *, *::before, *::after { box-sizing: border-box; } .box { border: 1px solid var(--divider-color); border-radius: 8px; margin: 6px 0; padding: 12px; transition: all 0.2s ease; background: var(--card-background-color, white); box-sizing: border-box; width: 100%; max-width: 100%; } .box:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); } .box.dragging { border-color: var(--primary-color); opacity: 0.7; transform: scale(0.98); } .box.drag-over { border-color: var(--primary-color); background-color: var(--primary-color-fade, rgba(var(--rgb-primary-color), 0.1)); transform: scale(1.02); } .entity-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--divider-color); } .entity-info { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; } .entity-icon { color: var(--primary-color); --mdc-icon-size: 20px; flex-shrink: 0; } .entity-title { font-weight: 500; color: var(--primary-text-color); font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; } .entity-controls { display: flex; align-items: center; gap: 4px; flex-shrink: 0; } .drag-handle { display: inline-flex; align-items: center; justify-content: center; color: var(--secondary-text-color); cursor: grab; padding: 8px; border-radius: 4px; transition: all 0.2s ease; --mdc-icon-size: 20px; margin: -4px; flex-shrink: 0; user-select: none; -webkit-user-drag: element; } .drag-handle:hover { color: var(--primary-color); background-color: var(--divider-color); cursor: grab; } .drag-handle:active { cursor: grabbing !important; color: var(--primary-color); } .drag-handle[draggable='true']:active { cursor: grabbing !important; } .box.dragging .drag-handle, .drag-handle.dragging { cursor: grabbing !important; } :host(.dragging) * { cursor: grabbing !important; } /* Disable pointer events on children during drag to allow drop events */ :host(.dragging) .box > *:not(.entity-header) { pointer-events: none; } :host(.dragging) ha-form { pointer-events: none !important; } .toolbar { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; } ha-form { pointer-events: auto; width: 100%; } ha-form .grid, ha-form [data-type='grid'], ha-form .form-group.grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 12px !important; width: 100% !important; } ha-form .form-group.grid > * { min-width: 0 !important; width: 100% !important; } "])));

  function qt(t) {
    return function (t) {
      if (Array.isArray(t)) return Ft(t)
    }(t) || function (t) {
      if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
    }(t) || function (t, e) {
      if (t) {
        if ("string" == typeof t) return Ft(t, e);
        var o = {}.toString.call(t).slice(8, -1);
        return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? Ft(t, e) : void 0
      }
    }(t) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }()
  }

  function Ft(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var o = 0, n = Array(e); o < e; o++) n[o] = t[o];
    return n
  }

  function Zt(t, e, o) {
    var n = [];
    return o && e ? n = St(t.hass, e) : e && (n = mt(e)), n.map(function (t) {
      return {
        value: t,
        label: t.charAt(0).toUpperCase() + t.slice(1).replace(/_/g, " ")
      }
    })
  }

  function Wt(t, e) {
    var o, n, r, i, a, c, l, s = "entity" === e.type && !0 === e.use_multi_state,
      u = "entity" === (l = e).type && kt(l.entity),
      d = [{
        name: "type",
        label: Pt(t.hass, "state_type", "State Type"),
        selector: {
          select: {
            multiple: !1,
            mode: "dropdown",
            options: [{
              label: Pt(t.hass, "entity_type_entity", "Entity"),
              value: "entity"
            }, {
              label: Pt(t.hass, "entity_type_template", "Template"),
              value: "template"
            }]
          }
        }
      }].concat(qt(s ? [{
        name: "icon",
        label: Pt(t.hass, "icon_fallback", "Icon (Fallback)"),
        required: !0,
        selector: {
          icon: {}
        },
        context: {
          icon_entity: "entity"
        }
      }] : [{
        type: "grid",
        name: "",
        schema: [{
          name: "icon",
          label: Pt(t.hass, "icon_on", "Icon (On)"),
          required: !0,
          selector: {
            icon: {}
          },
          context: {
            icon_entity: "entity"
          }
        }, {
          name: "icon_off",
          label: Pt(t.hass, "icon_off", "Icon (Off)"),
          selector: {
            icon: {}
          },
          context: {
            icon_entity: "entity"
          }
        }]
      }]), qt(u || s ? [] : [{
        type: "grid",
        name: "",
        schema: [{
          name: "color_on",
          label: Pt(t.hass, "color_on", "Color (On)"),
          selector: {
            text: {}
          }
        }, {
          name: "color_off",
          label: Pt(t.hass, "color_off", "Color (Off)"),
          selector: {
            text: {}
          }
        }]
      }, {
        type: "grid",
        name: "",
        schema: [{
          name: "template_on",
          label: Pt(t.hass, "template_on", "Template (On)"),
          selector: {
            select: {
              multiple: !1,
              mode: "dropdown",
              options: Mt(t.hass)
            }
          }
        }, {
          name: "template_off",
          label: Pt(t.hass, "template_off", "Template (Off)"),
          selector: {
            select: {
              multiple: !1,
              mode: "dropdown",
              options: Mt(t.hass)
            }
          }
        }]
      }, {
        type: "grid",
        name: "",
        schema: [{
          name: "background_color_on",
          label: Pt(t.hass, "background_color_on", "Background Color (On)"),
          selector: {
            text: {}
          }
        }, {
          name: "background_color_off",
          label: Pt(t.hass, "background_color_off", "Background Color (Off)"),
          selector: {
            text: {}
          }
        }]
      }]), [{
        name: "show_value",
        label: Pt(t.hass, "show_value", "Show Value"),
        selector: {
          boolean: {}
        }
      }], qt(e.show_value ? [{
        name: "value_template",
        label: Pt(t.hass, "value_template", "Value Template"),
        selector: {
          template: {}
        }
      }] : []), [{
        type: "grid",
        name: "",
        schema: [{
          name: "tap_action",
          label: (null === (o = t.hass) || void 0 === o || null === (n = o.localize) || void 0 === n ? void 0 : n.call(o, "ui.panel.lovelace.editor.card.generic.tap_action")) || "Tap Action",
          selector: {
            "ui-action": {}
          }
        }, {
          name: "hold_action",
          label: (null === (r = t.hass) || void 0 === r || null === (i = r.localize) || void 0 === i ? void 0 : i.call(r, "ui.panel.lovelace.editor.card.generic.hold_action")) || "Hold Action",
          selector: {
            "ui-action": {}
          }
        }, {
          name: "double_tap_action",
          label: (null === (a = t.hass) || void 0 === a || null === (c = a.localize) || void 0 === c ? void 0 : c.call(a, "ui.panel.lovelace.editor.card.generic.double_tap_action")) || "Double Tap Action",
          selector: {
            "ui-action": {}
          }
        }]
      }], qt(function (t) {
        return "entity" === t.type && (e = t.entity, null !== (o = null == e ? void 0 : e.startsWith("light.")) && void 0 !== o && o);
        var e, o
      }(e) ? [{
        name: "use_light_color",
        label: Pt(t.hass, "use_light_color_description", "Use Light Color as icon and background color"),
        selector: {
          boolean: {}
        }
      }] : [])),
      p = [{
        type: "grid",
        name: "",
        schema: [{
          name: "condition",
          label: Pt(t.hass, "template_condition", "Template Condition"),
          required: !0,
          selector: {
            template: {}
          }
        }]
      }],
      f = "entity" === e.type ? e.entity : void 0,
      h = f ? f.split(".")[0] : "",
      _ = u || h in gt,
      y = [{
        name: "entity",
        label: Pt(t.hass, "entity_type_entity", "Entity"),
        required: !0,
        selector: {
          entity: {}
        }
      }].concat(qt(_ ? [{
        name: "use_multi_state",
        label: Pt(t.hass, "use_multi_state_description", "Enable Multi-State Mode for custom state colors"),
        selector: {
          boolean: {}
        }
      }] : []), qt(u || s ? [] : [{
        name: "on_state",
        label: Pt(t.hass, "on_state", "On State"),
        required: !0,
        selector: {
          text: {}
        }
      }]), qt(s ? [{
        name: "custom_states",
        label: Pt(t.hass, "add_state", "Add State"),
        helper: Pt(t.hass, "custom_states_helper", "Select states to configure individual colors and icons"),
        selector: {
          select: {
            multiple: !0,
            custom_value: !0,
            mode: "list",
            options: Zt(t, f, u)
          }
        }
      }] : []), qt(u && !s ? function (t, e) {
        if ("entity" !== e.type) return [];
        var o = e.entity,
          n = St(t.hass, o);
        if (0 === n.length) return [{
          name: "on_state",
          label: "On State",
          required: !0,
          selector: {
            text: {}
          }
        }];
        var r = [];
        return n.forEach(function (e) {
          var o = e.charAt(0).toUpperCase() + e.slice(1).replace("_", " ");
          r.push({
            type: "expandable",
            expanded: !1,
            name: "",
            title: "".concat(o, " Mode"),
            schema: [{
              type: "grid",
              name: "",
              schema: [{
                name: "color_".concat(e),
                label: "Color for ".concat(o),
                selector: {
                  text: {}
                }
              }, {
                name: "background_color_".concat(e),
                label: "".concat(Pt(t.hass, "background_color_for", "Background Color for"), " ").concat(o),
                selector: {
                  text: {}
                }
              }]
            }, {
              type: "grid",
              name: "",
              schema: [{
                name: "template_".concat(e),
                label: "Template for ".concat(o),
                selector: {
                  select: {
                    multiple: !1,
                    mode: "dropdown",
                    options: Mt(t.hass)
                  }
                }
              }]
            }]
          })
        }), r
      }(t, e) : []), qt(s ? function (t, e) {
        if ("entity" !== e.type) return [];
        var o = e.custom_states;
        if (!o || "" === o.trim()) return [];
        var n = function (t) {
          return t ? t.split(",").map(function (t) {
            return t.trim()
          }).filter(function (t) {
            return "" !== t
          }) : []
        }(o);
        if (0 === n.length) return [];
        var r = [];
        return n.forEach(function (e) {
          var o = e.charAt(0).toUpperCase() + e.slice(1).replace(/_/g, " ");
          r.push({
            type: "expandable",
            expanded: !1,
            name: "",
            title: "".concat(o),
            schema: [{
              name: "icon_".concat(e),
              label: "Icon",
              selector: {
                icon: {}
              },
              context: {
                icon_entity: "entity"
              }
            }, {
              name: "template_".concat(e),
              label: Pt(t.hass, "card_template", "Template"),
              selector: {
                select: {
                  multiple: !1,
                  mode: "dropdown",
                  options: Mt(t.hass)
                }
              }
            }, {
              type: "grid",
              name: "",
              schema: [{
                name: "color_".concat(e),
                label: Pt(t.hass, "icon_color", "Color"),
                selector: {
                  text: {}
                }
              }, {
                name: "background_color_".concat(e),
                label: Pt(t.hass, "background_circle_color", "Background"),
                selector: {
                  text: {}
                }
              }]
            }]
          })
        }), r
      }(t, e) : []));
    return "template" === e.type && d.push.apply(d, p), "entity" === e.type && d.push.apply(d, qt(y)), [{
      type: "expandable",
      expanded: !e.icon,
      name: "",
      title: "".concat(Pt(t.hass, "state_label", "State"), ": ").concat(Pt(t.hass, "entity_type_".concat(e.type), e.type)),
      schema: d
    }]
  }

  function Gt(t) {
    var e, o, n, r, i = null === (e = t.config) || void 0 === e ? void 0 : e.background_type;
    i && "" !== i || (i = !0 === (null === (o = t.config) || void 0 === o ? void 0 : o.use_background_image) ? null !== (n = t.config) && void 0 !== n && n.background_person_entity ? "person" : null !== (r = t.config) && void 0 !== r && r.background_image ? "image" : "color" : "color");
    var a = {
      name: "icon_color",
      label: Pt(t.hass, "icon_color", "Icon Color"),
      selector: {
        template: {}
      }
    };
    switch (i) {
    case "none":
      return [a];
    case "color":
    default:
      return [a, {
        name: "background_circle_color",
        label: Pt(t.hass, "background_circle_color_template_hint", "Background Circle Color - empty for template color"),
        selector: {
          template: {}
        }
      }];
    case "image":
      return [{
        name: "background_image",
        label: Pt(t.hass, "background_image", "Background Image"),
        selector: {
          text: {}
        }
      }, {
        name: "background_image_square",
        label: Pt(t.hass, "background_image_square", "Square Background"),
        selector: {
          boolean: {}
        }
      }];
    case "person":
      return [{
        name: "background_person_entity",
        label: Pt(t.hass, "background_person_entity", "Person Entity"),
        required: !0,
        selector: {
          entity: {
            domain: "person"
          }
        }
      }, {
        name: "background_image_square",
        label: Pt(t.hass, "background_image_square", "Square Background"),
        selector: {
          boolean: {}
        }
      }]
    }
  }

  function Yt(t, e) {
    return e || (e = t.slice(0)), Object.freeze(Object.defineProperties(t, {
      raw: {
        value: Object.freeze(e)
      }
    }))
  }

  function Kt(t, e) {
    var o = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(t);
      e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })), o.push.apply(o, n)
    }
    return o
  }

  function Jt(t) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2 ? Kt(Object(o), !0).forEach(function (e) {
        Qt(t, e, o[e])
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : Kt(Object(o)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e))
      })
    }
    return t
  }

  function Qt(t, e, o) {
    return (e = oe(e)) in t ? Object.defineProperty(t, e, {
      value: o,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = o, t
  }

  function Xt(t) {
    return function (t) {
      if (Array.isArray(t)) return te(t)
    }(t) || function (t) {
      if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
    }(t) || function (t, e) {
      if (t) {
        if ("string" == typeof t) return te(t, e);
        var o = {}.toString.call(t).slice(8, -1);
        return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? te(t, e) : void 0
      }
    }(t) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }()
  }

  function te(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var o = 0, n = Array(e); o < e; o++) n[o] = t[o];
    return n
  }

  function ee(t, e) {
    for (var o = 0; o < e.length; o++) {
      var n = e[o];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, oe(n.key), n)
    }
  }

  function oe(t) {
    var e = function (t, e) {
      if ("object" != le(t) || !t) return t;
      var o = t[Symbol.toPrimitive];
      if (void 0 !== o) {
        var n = o.call(t, e || "default");
        if ("object" != le(n)) return n;
        throw new TypeError("@@toPrimitive must return a primitive value.")
      }
      return ("string" === e ? String : Number)(t)
    }(t, "string");
    return "symbol" == le(e) ? e : e + ""
  }

  function ne(t, e, o) {
    return e = ae(e),
      function (t, e) {
        if (e && ("object" == le(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return function (t) {
          if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t
        }(t)
      }(t, re() ? Reflect.construct(e, o || [], ae(t).constructor) : e.apply(t, o))
  }

  function re() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}))
    } catch (t) {}
    return (re = function () {
      return !!t
    })()
  }

  function ie() {
    return ie = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (t, e, o) {
      var n = function (t, e) {
        for (; !{}.hasOwnProperty.call(t, e) && null !== (t = ae(t)););
        return t
      }(t, e);
      if (n) {
        var r = Object.getOwnPropertyDescriptor(n, e);
        return r.get ? r.get.call(arguments.length < 3 ? t : o) : r.value
      }
    }, ie.apply(null, arguments)
  }

  function ae(t) {
    return ae = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t)
    }, ae(t)
  }

  function ce(t, e) {
    return ce = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t
    }, ce(t, e)
  }

  function le(t) {
    return le = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, le(t)
  }
  var se = function (t, e, o, n) {
      var r, i = arguments.length,
        a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : le(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n);
      else
        for (var c = t.length - 1; c >= 0; c--)(r = t[c]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
      return i > 3 && a && Object.defineProperty(e, o, a), a
    },
    ue = function (t) {
      function e() {
        var t;
        return function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, e), (t = ne(this, e, arguments))._dragState = null, t._boundMouseMove = function (e) {
          var o, n;
          if (null !== (o = t._dragState) && void 0 !== o && o.isDragging) {
            e.preventDefault();
            var r = null === (n = t.shadowRoot) || void 0 === n ? void 0 : n.querySelectorAll(".box");
            r && r.forEach(function (o, n) {
              var r, i = o.getBoundingClientRect();
              e.clientY >= i.top && e.clientY <= i.bottom && n !== (null === (r = t._dragState) || void 0 === r ? void 0 : r.dragIndex) ? o.classList.add("drag-over") : o.classList.remove("drag-over")
            })
          }
        }, t._boundMouseUp = function (e) {
          var o, n;
          if (null !== (o = t._dragState) && void 0 !== o && o.isDragging && t._config) {
            e.preventDefault();
            var r = null === (n = t.shadowRoot) || void 0 === n ? void 0 : n.querySelectorAll(".box"),
              i = -1;
            null == r || r.forEach(function (t, o) {
              var n = t.getBoundingClientRect();
              e.clientY >= n.top && e.clientY <= n.bottom && (i = o)
            });
            var a = t._dragState.dragIndex;
            if (t._cleanupDrag(), -1 !== i && i !== a) {
              var c = Xt(t._config.entities || []),
                l = c[a];
              c.splice(a, 1), c.splice(i, 0, l), t._dispatchConfigChanged(Jt(Jt({}, t._config), {}, {
                entities: c
              }))
            }
          } else t._cleanupDrag()
        }, t
      }
      return function (t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: !0,
              configurable: !0
            }
          }), Object.defineProperty(t, "prototype", {
            writable: !1
          }), e && ce(t, e)
        }(e, t),
        function (t, e, o) {
          return e && ee(t.prototype, e), o && ee(t, o), Object.defineProperty(t, "prototype", {
            writable: !1
          }), t
        }(e, [{
          key: "_getSchemaContext",
          value: function () {
            return {
              hass: this.hass,
              config: this._config
            }
          }
        }, {
          key: "_dispatchConfigChanged",
          value: function (t) {
            this._config = t, this.dispatchEvent(new CustomEvent("config-changed", {
              detail: {
                config: t
              }
            }))
          }
        }, {
          key: "setConfig",
          value: function (t) {
            var e = this,
              o = t.background_type;
            o && "" !== o || (o = !0 === t.use_background_image ? t.background_person_entity ? "person" : t.background_image ? "image" : "color" : !1 === t.show_background_circle ? "none" : "color"), this._config = Jt({
              background_type: o,
              entities: []
            }, t), delete this._config.show_background_circle, delete this._config.use_background_image, delete this._config.background_settings, o === t.background_type && void 0 === t.show_background_circle && void 0 === t.use_background_image || setTimeout(function () {
              e.dispatchEvent(new CustomEvent("config-changed", {
                detail: {
                  config: e._config
                }
              }))
            }, 0)
          }
        }, {
          key: "willUpdate",
          value: function (t) {
            if (function (t, e, o, n) {
                var r = ie(ae(1 & n ? t.prototype : t), e, o);
                return 2 & n && "function" == typeof r ? function (t) {
                  return r.apply(o, t)
                } : r
              }(e, "willUpdate", this, 3)([t]), t.has("_config") && this._config) {
              var o = this._config.background_type || "color";
              this._backgroundType !== o && (this._backgroundType = o)
            }
          }
        }, {
          key: "_deleteStateEntity",
          value: function (t) {
            if (this._config) {
              var e = Xt(this._config.entities || []);
              e.splice(t, 1), this._dispatchConfigChanged(Jt(Jt({}, this._config), {}, {
                entities: e
              }))
            }
          }
        }, {
          key: "_moveStateEntity",
          value: function (t, e) {
            if (this._config) {
              var o = Xt(this._config.entities || []),
                n = [o[t + e], o[t]];
              o[t] = n[0], o[t + e] = n[1], this._dispatchConfigChanged(Jt(Jt({}, this._config), {}, {
                entities: o
              }))
            }
          }
        }, {
          key: "_addEntityState",
          value: function () {
            if (this._config) {
              var t = Xt(this._config.entities || []);
              t.push({
                type: "template"
              }), this._dispatchConfigChanged(Jt(Jt({}, this._config), {}, {
                entities: t
              }))
            }
          }
        }, {
          key: "_getEntityFormData",
          value: function (t) {
            if ("entity" !== t.type || !t.custom_states) return t;
            var e = "string" == typeof t.custom_states ? t.custom_states.split(",").map(function (t) {
              return t.trim()
            }).filter(function (t) {
              return "" !== t
            }) : t.custom_states;
            return Jt(Jt({}, t), {}, {
              custom_states: e
            })
          }
        }, {
          key: "_getEntityIcon",
          value: function (t) {
            if ("template" === t.type) return t.icon ? t.icon : t.icon_off ? t.icon_off : "mdi:code-braces";
            if ("entity" === t.type && t.entity && this.hass) {
              var e = this.hass.states[t.entity];
              if (e) return e.attributes.icon ? e.attributes.icon : function (t) {
                return wt[t] || "mdi:help-circle"
              }(t.entity.split(".")[0])
            }
            return "mdi:help-circle"
          }
        }, {
          key: "_getEntityDisplayName",
          value: function (t, e) {
            var o = "template" === t.type ? Pt(this.hass, "entity_type_template", "Template") : Pt(this.hass, "entity_type_entity", "Entity");
            if ("entity" === t.type && t.entity && this.hass) {
              var n = this.hass.states[t.entity];
              return n && n.attributes.friendly_name ? "".concat(o, ": ").concat(n.attributes.friendly_name) : "".concat(o, ": ").concat(t.entity)
            }
            return "".concat(o, " ").concat(e + 1)
          }
        }, {
          key: "_valueChanged",
          value: function (t) {
            if (this._config && this.hass) {
              var e = t.detail.value;
              if (e.background_type !== this._config.background_type && "person" === e.background_type && !e.background_person_entity) {
                var o = this._getFirstPersonEntity();
                o && (e.background_person_entity = o)
              }
              this._config = e, delete e.background_settings;
              var n = new CustomEvent("config-changed", {
                detail: {
                  config: e
                },
                bubbles: !0,
                composed: !0
              });
              this.dispatchEvent(n)
            }
          }
        }, {
          key: "_valueChangedEntity",
          value: function (t, e) {
            if (this._config && this.hass) {
              var o = Xt(this._config.entities || []),
                n = o[t],
                r = e.detail.value;
              r.custom_states && Array.isArray(r.custom_states) && (r.custom_states = r.custom_states.join(", "));
              var i = !r.custom_states || "string" == typeof r.custom_states && "" === r.custom_states.trim();
              if ("entity" === r.type && r.use_multi_state && (!n || "entity" !== n.type || !n.use_multi_state) && i) {
                var a = [];
                (a = kt(r.entity) ? St(this.hass, r.entity) : mt(r.entity)).length > 0 && (r.custom_states = a.join(", "))
              }
              o[t] = r, this._config = Jt(Jt({}, this._config), {}, {
                entities: o
              });
              var c = new CustomEvent("config-changed", {
                detail: {
                  config: this._config
                },
                bubbles: !0,
                composed: !0
              });
              this.dispatchEvent(c)
            }
          }
        }, {
          key: "_getFirstPersonEntity",
          value: function () {
            if (!this.hass || !this.hass.states) return "";
            var t = Object.keys(this.hass.states).filter(function (t) {
              return t.startsWith("person.")
            }).sort();
            return t.length > 0 ? t[0] : ""
          }
        }, {
          key: "_handleMouseDown",
          value: function (t, e) {
            if (0 === t.button) {
              t.preventDefault(), t.stopPropagation(), this._dragState = {
                isDragging: !0,
                dragIndex: e,
                startY: t.clientY
              };
              var o = t.currentTarget,
                n = null == o ? void 0 : o.closest(".box");
              n && n.classList.add("dragging"), null == o || o.classList.add("dragging"), this.classList.add("dragging"), document.body.style.cursor = "grabbing", document.addEventListener("mousemove", this._boundMouseMove), document.addEventListener("mouseup", this._boundMouseUp)
            }
          }
        }, {
          key: "_cleanupDrag",
          value: function () {
            var t, e;
            this._dragState = null, null === (t = this.shadowRoot) || void 0 === t || t.querySelectorAll(".box").forEach(function (t) {
              t.classList.remove("dragging", "drag-over")
            }), null === (e = this.shadowRoot) || void 0 === e || e.querySelectorAll(".drag-handle").forEach(function (t) {
              t.classList.remove("dragging")
            }), this.classList.remove("dragging"), document.body.style.cursor = "", document.removeEventListener("mousemove", this._boundMouseMove), document.removeEventListener("mouseup", this._boundMouseUp)
          }
        }, {
          key: "_renderEntities",
          value: function () {
            var t = this;
            if (!this._config) return F(Rt || (Rt = Yt([""])));
            var e = this._config.entities || [];
            return F(Dt || (Dt = Yt([" ", " "])), e.map(function (e, o) {
              var n;
              return F(Ut || (Ut = Yt([' <div class="box"> <div class="entity-header"> <div class="entity-info"> <div class="drag-handle" @mousedown="', '"> <ha-icon .icon="', '"></ha-icon> </div> <ha-icon .icon="', '" class="entity-icon"></ha-icon> <span class="entity-title"> ', ' </span> </div> <div class="entity-controls"> <mwc-icon-button .disabled="', '" @click="', '" title="', '"> <ha-icon .icon="', '"></ha-icon> </mwc-icon-button> <mwc-icon-button .disabled="', '" @click="', '" title="', '"> <ha-icon .icon="', '"></ha-icon> </mwc-icon-button> <mwc-icon-button @click="', '" title="', '"> <ha-icon .icon="', '"></ha-icon> </mwc-icon-button> </div> </div> <ha-form .hass="', '" .schema="', '" .data="', '" .computeLabel="', '" @value-changed="', '"></ha-form> </div> '])), function (e) {
                return t._handleMouseDown(e, o)
              }, "mdi:drag", t._getEntityIcon(e), t._getEntityDisplayName(e, o), 0 === o, function () {
                return t._moveStateEntity(o, -1)
              }, Pt(t.hass, "move_up", "Move Up"), "mdi:arrow-up", o === ((null === (n = t._config) || void 0 === n || null === (n = n.entities) || void 0 === n ? void 0 : n.length) || 0) - 1, function () {
                return t._moveStateEntity(o, 1)
              }, Pt(t.hass, "move_down", "Move Down"), "mdi:arrow-down", function () {
                return t._deleteStateEntity(o)
              }, Pt(t.hass, "delete", "Delete"), "mdi:close", t.hass, Wt(t._getSchemaContext(), e), t._getEntityFormData(e), function (t) {
                var e;
                return null !== (e = t.label) && void 0 !== e ? e : t.name
              }, function (e) {
                return t._valueChangedEntity(o, e)
              })
            }))
          }
        }, {
          key: "render",
          value: function () {
            return this._config ? F(Nt || (Nt = Yt([' <ha-form .hass="', '" .data="', '" .schema="', '" .computeLabel="', '" @value-changed="', '"></ha-form> <div style="display:flex;justify-content:space-between;margin-top:20px"> <p>', "</p> ", " </div> ", " "])), this.hass, this._config, (t = this._getSchemaContext(), O = !(null === (e = t.config) || void 0 === e || !e.secondary), A = !(null === (o = t.config) || void 0 === o || !o.tertiary), [{
              name: "name",
              label: (null === (n = t.hass) || void 0 === n || null === (r = n.localize) || void 0 === r ? void 0 : r.call(n, "ui.panel.lovelace.editor.card.generic.name")) || "Name",
              required: !0,
              selector: {
                text: {}
              }
            }, {
              name: "icon",
              label: (null === (i = t.hass) || void 0 === i || null === (a = i.localize) || void 0 === a ? void 0 : a.call(i, "ui.panel.lovelace.editor.card.generic.icon")) || "Icon",
              required: !0,
              selector: {
                icon: {}
              },
              context: {
                icon_entity: "entity"
              }
            }, {
              name: "card_template",
              label: Pt(t.hass, "card_template", "Card Color Template"),
              selector: {
                select: {
                  multiple: !1,
                  mode: "dropdown",
                  options: Mt(t.hass)
                }
              }
            }, {
              name: "tap_action",
              label: (null === (c = t.hass) || void 0 === c || null === (l = c.localize) || void 0 === l ? void 0 : l.call(c, "ui.panel.lovelace.editor.card.generic.tap_action")) || "Tap Action",
              selector: {
                "ui-action": {}
              }
            }, {
              name: "hold_action",
              label: (null === (s = t.hass) || void 0 === s || null === (u = s.localize) || void 0 === u ? void 0 : u.call(s, "ui.panel.lovelace.editor.card.generic.hold_action")) || "Hold Action",
              selector: {
                "ui-action": {}
              }
            }, {
              name: "double_tap_action",
              label: (null === (d = t.hass) || void 0 === d || null === (p = d.localize) || void 0 === p ? void 0 : p.call(d, "ui.panel.lovelace.editor.card.generic.double_tap_action")) || "Double Tap Action",
              selector: {
                "ui-action": {}
              }
            }, {
              name: "use_template_color_for_title",
              label: Pt(t.hass, "use_template_color_for_title", "Use template color for Name"),
              selector: {
                boolean: {}
              }
            }, {
              type: "expandable",
              expanded: O,
              name: "",
              title: Pt(t.hass, "secondary", "Secondary Info"),
              schema: [{
                name: "secondary",
                label: Pt(t.hass, "secondary", "Secondary Info"),
                selector: {
                  template: {}
                }
              }, {
                name: "secondary_color",
                label: Pt(t.hass, "secondary_color", "Secondary Info Color"),
                selector: {
                  template: {}
                }
              }, {
                name: "use_template_color_for_secondary",
                label: Pt(t.hass, "use_template_color_for_secondary", "Use template color for secondary info"),
                selector: {
                  boolean: {}
                }
              }, {
                name: "secondary_allow_html",
                label: Pt(t.hass, "secondary_allow_html", "Allow HTML in secondary info"),
                selector: {
                  boolean: {}
                }
              }, {
                name: "secondary_entity",
                label: Pt(t.hass, "secondary_entity", "Secondary Info Entity (for actions)"),
                selector: {
                  entity: {}
                }
              }, {
                type: "grid",
                name: "",
                schema: [{
                  name: "secondary_tap_action",
                  label: "".concat(Pt(t.hass, "secondary", "Secondary"), " ").concat((null === (f = t.hass) || void 0 === f || null === (h = f.localize) || void 0 === h ? void 0 : h.call(f, "ui.panel.lovelace.editor.card.generic.tap_action")) || "Tap Action"),
                  selector: {
                    "ui-action": {}
                  }
                }, {
                  name: "secondary_hold_action",
                  label: "".concat(Pt(t.hass, "secondary", "Secondary"), " ").concat((null === (_ = t.hass) || void 0 === _ || null === (y = _.localize) || void 0 === y ? void 0 : y.call(_, "ui.panel.lovelace.editor.card.generic.hold_action")) || "Hold Action"),
                  selector: {
                    "ui-action": {}
                  }
                }, {
                  name: "secondary_double_tap_action",
                  label: "".concat(Pt(t.hass, "secondary", "Secondary"), " ").concat((null === (g = t.hass) || void 0 === g || null === (m = g.localize) || void 0 === m ? void 0 : m.call(g, "ui.panel.lovelace.editor.card.generic.double_tap_action")) || "Double Tap Action"),
                  selector: {
                    "ui-action": {}
                  }
                }]
              }]
            }, {
              type: "expandable",
              expanded: A,
              name: "",
              title: Pt(t.hass, "tertiary", "Tertiary Info"),
              schema: [{
                name: "tertiary",
                label: Pt(t.hass, "tertiary", "Tertiary Info"),
                selector: {
                  template: {}
                }
              }, {
                name: "tertiary_color",
                label: Pt(t.hass, "tertiary_color", "Tertiary Info Color"),
                selector: {
                  template: {}
                }
              }, {
                name: "use_template_color_for_tertiary",
                label: Pt(t.hass, "use_template_color_for_tertiary", "Use template color for tertiary info"),
                selector: {
                  boolean: {}
                }
              }, {
                name: "tertiary_allow_html",
                label: Pt(t.hass, "tertiary_allow_html", "Allow HTML in tertiary info"),
                selector: {
                  boolean: {}
                }
              }, {
                name: "tertiary_entity",
                label: Pt(t.hass, "tertiary_entity", "Tertiary Info Entity (for actions)"),
                selector: {
                  entity: {}
                }
              }, {
                type: "grid",
                name: "",
                schema: [{
                  name: "tertiary_tap_action",
                  label: "".concat(Pt(t.hass, "tertiary", "Tertiary"), " ").concat((null === (b = t.hass) || void 0 === b || null === (v = b.localize) || void 0 === v ? void 0 : v.call(b, "ui.panel.lovelace.editor.card.generic.tap_action")) || "Tap Action"),
                  selector: {
                    "ui-action": {}
                  }
                }, {
                  name: "tertiary_hold_action",
                  label: "".concat(Pt(t.hass, "tertiary", "Tertiary"), " ").concat((null === (w = t.hass) || void 0 === w || null === (k = w.localize) || void 0 === k ? void 0 : k.call(w, "ui.panel.lovelace.editor.card.generic.hold_action")) || "Hold Action"),
                  selector: {
                    "ui-action": {}
                  }
                }, {
                  name: "tertiary_double_tap_action",
                  label: "".concat(Pt(t.hass, "tertiary", "Tertiary"), " ").concat((null === (x = t.hass) || void 0 === x || null === (S = x.localize) || void 0 === S ? void 0 : S.call(x, "ui.panel.lovelace.editor.card.generic.double_tap_action")) || "Double Tap Action"),
                  selector: {
                    "ui-action": {}
                  }
                }]
              }]
            }, {
              type: "expandable",
              expanded: !1,
              name: "",
              title: Pt(t.hass, "card_icon_image", "Card Icon/Image"),
              schema: [{
                name: "background_type",
                label: Pt(t.hass, "background_type", "Background Type"),
                selector: {
                  select: {
                    multiple: !1,
                    mode: "dropdown",
                    options: [{
                      value: "none",
                      label: Pt(t.hass, "background_type_none", "No Background")
                    }, {
                      value: "color",
                      label: Pt(t.hass, "background_type_color", "Color Circle")
                    }, {
                      value: "image",
                      label: Pt(t.hass, "background_type_image", "Custom Image")
                    }, {
                      value: "person",
                      label: Pt(t.hass, "background_type_person", "Person Profile Picture")
                    }]
                  }
                }
              }].concat(qt(Gt(t)))
            }, {
              name: "entities_reverse_order",
              label: Pt(t.hass, "entities_reverse_order", "Reverse Entity Order"),
              selector: {
                boolean: {}
              }
            }]), function (t) {
              var e;
              return null !== (e = t.label) && void 0 !== e ? e : t.name
            }, this._valueChanged, Pt(this.hass, "states", "States"), F(Bt || (Bt = Yt(['<mwc-button style="margin-top:5px;cursor:pointer" @click="', '"> <ha-icon .icon="', '"></ha-icon>', " </mwc-button>"])), this._addEntityState, "mdi:plus", Pt(this.hass, "add_state", "Add State")), this._renderEntities()) : F(Ht || (Ht = Yt(["<div>Loading...</div>"])));
            var t, e, o, n, r, i, a, c, l, s, u, d, p, f, h, _, y, g, m, b, v, w, k, x, S, O, A
          }
        }])
    }(st);
  ue.styles = Vt, se([ft({
    attribute: !1
  })], ue.prototype, "hass", void 0), se([ht()], ue.prototype, "_config", void 0), se([ht()], ue.prototype, "_backgroundType", void 0), customElements.define("dynamic-room-card-minimalist-editor", ue), window.customCards = window.customCards || [], window.customCards.push({
    type: "dynamic-room-card-minimalist",
    name: "Room Card Minimalist",
    preview: !0,
    description: "Display the state of a room at a glance - in UI Lovelace Minimalist style",
    documentationURL: "https://github.com/unbekannt3/dynamic-room-card-minimalist"
  });
  const de = 2;
  class pe {
    constructor(t) {}
    get _$AU() {
      return this._$AM._$AU
    }
    _$AT(t, e, o) {
      this._$Ct = t, this._$AM = e, this._$Ci = o
    }
    _$AS(t, e) {
      return this.update(t, e)
    }
    update(t, e) {
      return this.render(...e)
    }
  }
  class fe extends pe {
    constructor(t) {
      if (super(t), this.it = W, t.type !== de) throw Error(this.constructor.directiveName + "() can only be used in child bindings")
    }
    render(t) {
      if (t === W || null == t) return this._t = void 0, this.it = t;
      if (t === Z) return t;
      if ("string" != typeof t) throw Error(this.constructor.directiveName + "() called with a non-string value");
      if (t === this.it) return this._t;
      this.it = t;
      const e = [t];
      return e.raw = e, this._t = {
        _$litType$: this.constructor.resultType,
        strings: e,
        values: []
      }
    }
  }
  fe.directiveName = "unsafeHTML", fe.resultType = 1;
  const he = (t => (...e) => ({
    _$litDirective$: t,
    values: e
  }))(fe);

  function _e(t) {
    return _e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, _e(t)
  }
  var ye = {
    secondary: "",
    secondary_color: "var(--secondary-text-color)",
    secondary_entity: "",
    tertiary: "",
    tertiary_color: "var(--secondary-text-color)",
    tertiary_entity: "",
    entities: [],
    background_type: "color",
    background_image: "",
    background_person_entity: "",
    background_image_square: !1,
    entities_reverse_order: !1,
    entity_columns: 1,
    entity_rows: undefined,
    use_template_color_for_title: !1,
    use_template_color_for_secondary: !1,
    use_template_color_for_tertiary: !1,
    secondary_allow_html: !1,
    tertiary_allow_html: !1
  };

  function ge(t) {
    return !(!t || "string" != typeof t) && t.includes("{")
  }

  function me(t) {
    return me = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, me(t)
  }

  function be() {
    var t, e, o = "function" == typeof Symbol ? Symbol : {},
      n = o.iterator || "@@iterator",
      r = o.toStringTag || "@@toStringTag";

    function i(o, n, r, i) {
      var l = n && n.prototype instanceof c ? n : c,
        s = Object.create(l.prototype);
      return ve(s, "_invoke", function (o, n, r) {
        var i, c, l, s = 0,
          u = r || [],
          d = !1,
          p = {
            p: 0,
            n: 0,
            v: t,
            a: f,
            f: f.bind(t, 4),
            d: function (e, o) {
              return i = e, c = 0, l = t, p.n = o, a
            }
          };

        function f(o, n) {
          for (c = o, l = n, e = 0; !d && s && !r && e < u.length; e++) {
            var r, i = u[e],
              f = p.p,
              h = i[2];
            o > 3 ? (r = h === n) && (l = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = t) : i[0] <= f && ((r = o < 2 && f < i[1]) ? (c = 0, p.v = n, p.n = i[1]) : f < h && (r = o < 3 || i[0] > n || n > h) && (i[4] = o, i[5] = n, p.n = h, c = 0))
          }
          if (r || o > 1) return a;
          throw d = !0, n
        }
        return function (r, u, h) {
          if (s > 1) throw TypeError("Generator is already running");
          for (d && 1 === u && f(u, h), c = u, l = h;
            (e = c < 2 ? t : l) || !d;) {
            i || (c ? c < 3 ? (c > 1 && (p.n = -1), f(c, l)) : p.n = l : p.v = l);
            try {
              if (s = 2, i) {
                if (c || (r = "next"), e = i[r]) {
                  if (!(e = e.call(i, l))) throw TypeError("iterator result is not an object");
                  if (!e.done) return e;
                  l = e.value, c < 2 && (c = 0)
                } else 1 === c && (e = i.return) && e.call(i), c < 2 && (l = TypeError("The iterator does not provide a '" + r + "' method"), c = 1);
                i = t
              } else if ((e = (d = p.n < 0) ? l : o.call(n, p)) !== a) break
            } catch (e) {
              i = t, c = 1, l = e
            } finally {
              s = 1
            }
          }
          return {
            value: e,
            done: d
          }
        }
      }(o, r, i), !0), s
    }
    var a = {};

    function c() {}

    function l() {}

    function s() {}
    e = Object.getPrototypeOf;
    var u = [][n] ? e(e([][n]())) : (ve(e = {}, n, function () {
        return this
      }), e),
      d = s.prototype = c.prototype = Object.create(u);

    function p(t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, s) : (t.__proto__ = s, ve(t, r, "GeneratorFunction")), t.prototype = Object.create(d), t
    }
    return l.prototype = s, ve(d, "constructor", s), ve(s, "constructor", l), l.displayName = "GeneratorFunction", ve(s, r, "GeneratorFunction"), ve(d), ve(d, r, "Generator"), ve(d, n, function () {
      return this
    }), ve(d, "toString", function () {
      return "[object Generator]"
    }), (be = function () {
      return {
        w: i,
        m: p
      }
    })()
  }

  function ve(t, e, o, n) {
    var r = Object.defineProperty;
    try {
      r({}, "", {})
    } catch (t) {
      r = 0
    }
    ve = function (t, e, o, n) {
      function i(e, o) {
        ve(t, e, function (t) {
          return this._invoke(e, o, t)
        })
      }
      e ? r ? r(t, e, {
        value: o,
        enumerable: !n,
        configurable: !n,
        writable: !n
      }) : t[e] = o : (i("next", 0), i("throw", 1), i("return", 2))
    }, ve(t, e, o, n)
  }

  function we(t, e) {
    var o = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(t);
      e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })), o.push.apply(o, n)
    }
    return o
  }

  function ke(t) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2 ? we(Object(o), !0).forEach(function (e) {
        xe(t, e, o[e])
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : we(Object(o)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e))
      })
    }
    return t
  }

  function xe(t, e, o) {
    return (e = $e(e)) in t ? Object.defineProperty(t, e, {
      value: o,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = o, t
  }

  function Se(t, e, o, n, r, i, a) {
    try {
      var c = t[i](a),
        l = c.value
    } catch (t) {
      return void o(t)
    }
    c.done ? e(l) : Promise.resolve(l).then(n, r)
  }

  function Oe(t) {
    return function () {
      var e = this,
        o = arguments;
      return new Promise(function (n, r) {
        var i = t.apply(e, o);

        function a(t) {
          Se(i, n, r, a, c, "next", t)
        }

        function c(t) {
          Se(i, n, r, a, c, "throw", t)
        }
        a(void 0)
      })
    }
  }

  function Ae(t, e) {
    for (var o = 0; o < e.length; o++) {
      var n = e[o];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, $e(n.key), n)
    }
  }

  function $e(t) {
    var e = function (t, e) {
      if ("object" != me(t) || !t) return t;
      var o = t[Symbol.toPrimitive];
      if (void 0 !== o) {
        var n = o.call(t, e || "default");
        if ("object" != me(n)) return n;
        throw new TypeError("@@toPrimitive must return a primitive value.")
      }
      return ("string" === e ? String : Number)(t)
    }(t, "string");
    return "symbol" == me(e) ? e : e + ""
  }
  var Ee = function () {
    return function (t, e, o) {
      return e && Ae(t.prototype, e), o && Ae(t, o), Object.defineProperty(t, "prototype", {
        writable: !1
      }), t
    }(function t() {
      ! function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
      }(this, t), this._results = {}, this._subscriptions = new Map
    }, [{
      key: "setHass",
      value: function (t) {
        this._hass = t
      }
    }, {
      key: "setConfig",
      value: function (t) {
        this._config = t
      }
    }, {
      key: "setUpdateCallback",
      value: function (t) {
        this._updateCallback = t
      }
    }, {
      key: "results",
      get: function () {
        return this._results
      }
    }, {
      key: "subscribe",
      value: (n = Oe(be().m(function t(e) {
        var o, n = this;
        return be().w(function (t) {
          for (;;) switch (t.p = t.n) {
          case 0:
            if (!this._subscriptions.has(e) && this._hass && this._config && ge(e)) {
              t.n = 1;
              break
            }
            return t.a(2);
          case 1:
            return t.p = 1, o = this._subscribeRenderTemplate(e, function (t) {
              var o;
              n._results = ke(ke({}, n._results), {}, xe({}, e, t)), null === (o = n._updateCallback) || void 0 === o || o.call(n, n._results)
            }), this._subscriptions.set(e, o), t.n = 2, o;
          case 2:
            t.n = 4;
            break;
          case 3:
            t.p = 3, t.v, this._subscriptions.delete(e);
          case 4:
            return t.a(2)
          }
        }, t, this, [
          [1, 3]
        ])
      })), function (t) {
        return n.apply(this, arguments)
      })
    }, {
      key: "unsubscribe",
      value: (o = Oe(be().m(function t(e) {
        var o, n, r;
        return be().w(function (t) {
          for (;;) switch (t.p = t.n) {
          case 0:
            if (o = this._subscriptions.get(e)) {
              t.n = 1;
              break
            }
            return t.a(2);
          case 1:
            return t.p = 1, t.n = 2, o;
          case 2:
            (0, t.v)(), this._subscriptions.delete(e), delete this._results[e], t.n = 4;
            break;
          case 3:
            if (t.p = 3, r = t.v, "not_found" === (n = r).code || "template_error" === n.code) {
              t.n = 4;
              break
            }
            throw r;
          case 4:
            return t.a(2)
          }
        }, t, this, [
          [1, 3]
        ])
      })), function (t) {
        return o.apply(this, arguments)
      })
    }, {
      key: "unsubscribeAll",
      value: (e = Oe(be().m(function t() {
        var e, o = this;
        return be().w(function (t) {
          for (;;) switch (t.n) {
          case 0:
            return e = Array.from(this._subscriptions.keys()), t.n = 1, Promise.all(e.map(function (t) {
              return o.unsubscribe(t)
            }));
          case 1:
            this._results = {};
          case 2:
            return t.a(2)
          }
        }, t, this)
      })), function () {
        return e.apply(this, arguments)
      })
    }, {
      key: "getResult",
      value: function (t) {
        return function (t) {
          if (t && null !== t.result && void 0 !== t.result) return String(t.result)
        }(this._results[t])
      }
    }, {
      key: "getValue",
      value: function (t) {
        if (t) return ge(t) ? this.getResult(t) : t
      }
    }, {
      key: "getEntityOrTemplateValue",
      value: function (t) {
        var e;
        if (t) return ge(t) ? this.getResult(t) : null === (e = this._hass) || void 0 === e || null === (e = e.states[t]) || void 0 === e ? void 0 : e.state
      }
    }, {
      key: "_subscribeRenderTemplate",
      value: (t = Oe(be().m(function t(e, o) {
        var n;
        return be().w(function (t) {
          for (;;) switch (t.n) {
          case 0:
            if (this._hass) {
              t.n = 1;
              break
            }
            throw new Error("No Home Assistant connection");
          case 1:
            return t.a(2, this._hass.connection.subscribeMessage(function (t) {
              return o(t)
            }, {
              type: "render_template",
              template: e,
              variables: {
                config: this._config,
                user: null === (n = this._hass.user) || void 0 === n ? void 0 : n.name
              },
              strict: !0
            }))
          }
        }, t, this)
      })), function (e, o) {
        return t.apply(this, arguments)
      })
    }]);
    var t, e, o, n
  }();

  function Te(t) {
    var e = t;
    if (!e.type) return t.tap_action || {
      action: "more-info"
    };
    if ("entity" === e.type && "entity" in e && e.entity) {
      var o = e.entity.split(".")[0];
      if (function (t) {
          return vt.includes(t)
        }(o)) return {
        action: "call-service",
        service: "".concat(o, ".toggle"),
        target: {
          entity_id: e.entity
        }
      }
    }
    return {
      action: "more-info"
    }
  }

  function Ce(t) {
    var e, o, n;
    if (!t) return !1;
    var r = (null === (e = t.tap_action) || void 0 === e ? void 0 : e.action) && "none" !== t.tap_action.action,
      i = (null === (o = t.hold_action) || void 0 === o ? void 0 : o.action) && "none" !== t.hold_action.action,
      a = (null === (n = t.double_tap_action) || void 0 === n ? void 0 : n.action) && "none" !== t.double_tap_action.action;
    return Boolean(r || i || a)
  }

  function je(t) {
    return !!t && (!!Ce(t) || !("entity" !== t.type || !("entity" in t) || !t.entity) && "none" !== Te(t).action)
  }

  function Pe(t, e, o) {
    var n = {
        entity: e.entity,
        tap_action: e.tap_action || Te(e),
        hold_action: e.hold_action,
        double_tap_action: e.double_tap_action
      },
      r = new CustomEvent("hass-action", {
        bubbles: !0,
        composed: !0,
        detail: {
          config: n,
          action: o
        }
      });
    t.dispatchEvent(r)
  }

  function Me(t) {
    return Me = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, Me(t)
  }
  var ze = ["use_background_image", "show_background_circle", "background_settings"];

  function Ie(t, e) {
    var o = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(t);
      e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })), o.push.apply(o, n)
    }
    return o
  }

  function Re(t) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2 ? Ie(Object(o), !0).forEach(function (e) {
        De(t, e, o[e])
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : Ie(Object(o)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e))
      })
    }
    return t
  }

  function De(t, e, o) {
    return (e = function (t) {
      var e = function (t, e) {
        if ("object" != Me(t) || !t) return t;
        var o = t[Symbol.toPrimitive];
        if (void 0 !== o) {
          var n = o.call(t, e || "default");
          if ("object" != Me(n)) return n;
          throw new TypeError("@@toPrimitive must return a primitive value.")
        }
        return ("string" === e ? String : Number)(t)
      }(t, "string");
      return "symbol" == Me(e) ? e : e + ""
    }(e)) in t ? Object.defineProperty(t, e, {
      value: o,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = o, t
  }

  function Ue(t, e) {
    var o = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
    if (!o) {
      if (Array.isArray(t) || (o = He(t)) || e && t && "number" == typeof t.length) {
        o && (t = o);
        var n = 0,
          r = function () {};
        return {
          s: r,
          n: function () {
            return n >= t.length ? {
              done: !0
            } : {
              done: !1,
              value: t[n++]
            }
          },
          e: function (t) {
            throw t
          },
          f: r
        }
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    var i, a = !0,
      c = !1;
    return {
      s: function () {
        o = o.call(t)
      },
      n: function () {
        var t = o.next();
        return a = t.done, t
      },
      e: function (t) {
        c = !0, i = t
      },
      f: function () {
        try {
          a || null == o.return || o.return()
        } finally {
          if (c) throw i
        }
      }
    }
  }

  function He(t, e) {
    if (t) {
      if ("string" == typeof t) return Ne(t, e);
      var o = {}.toString.call(t).slice(8, -1);
      return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? Ne(t, e) : void 0
    }
  }

  function Ne(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var o = 0, n = Array(e); o < e; o++) n[o] = t[o];
    return n
  }
  var Le = ["off", "heat", "cool", "heat_cool", "auto", "dry", "fan_only"];

  function Be(t) {
    return void 0 !== t.use_background_image || void 0 !== t.show_background_circle || void 0 !== t.background_settings || !t.background_type || function (t) {
      return !!t.entities && t.entities.some(function (t) {
        if ("entity" !== t.type) return !1;
        var e = t;
        if (!kt(e.entity)) return !1;
        if (e.use_multi_state) return !1;
        var o, n = Ue(Le);
        try {
          for (n.s(); !(o = n.n()).done;) {
            var r = o.value;
            if (void 0 !== e["template_".concat(r)] || void 0 !== e["color_".concat(r)] || void 0 !== e["background_color_".concat(r)]) return !0
          }
        } catch (t) {
          n.e(t)
        } finally {
          n.f()
        }
        return !1
      })
    }(t)
  }

  function Ve(t) {
    var e, o = function (t) {
        return t.background_type ? t.background_type : !0 === t.use_background_image ? t.background_person_entity ? "person" : t.background_image ? "image" : "color" : !1 === t.show_background_circle ? "none" : "color"
      }(t),
      n = (t.use_background_image, t.show_background_circle, t.background_settings, function (t, e) {
        if (null == t) return {};
        var o, n, r = function (t, e) {
          if (null == t) return {};
          var o = {};
          for (var n in t)
            if ({}.hasOwnProperty.call(t, n)) {
              if (-1 !== e.indexOf(n)) continue;
              o[n] = t[n]
            } return o
        }(t, e);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(t);
          for (n = 0; n < i.length; n++) o = i[n], -1 === e.indexOf(o) && {}.propertyIsEnumerable.call(t, o) && (r[o] = t[o])
        }
        return r
      }(t, ze)),
      r = null === (e = n.entities) || void 0 === e ? void 0 : e.map(function (t) {
        return "entity" === t.type ? function (t) {
          if (!kt(t.entity)) return t;
          if (t.use_multi_state) return t;
          var e, o = [],
            n = Ue(Le);
          try {
            for (n.s(); !(e = n.n()).done;) {
              var r = e.value,
                i = void 0 !== t["template_".concat(r)],
                a = void 0 !== t["color_".concat(r)],
                c = void 0 !== t["background_color_".concat(r)];
              (i || a || c) && o.push(r)
            }
          } catch (t) {
            n.e(t)
          } finally {
            n.f()
          }
          return 0 === o.length ? t : Re(Re({}, t), {}, {
            use_multi_state: !0,
            custom_states: o.join(", ")
          })
        }(t) : t
      });
    return Re(Re({}, n), {}, {
      background_type: o,
      entities: r
    })
  }

  function qe(t) {
    ! function (t) {
      if (!t || "object" !== _e(t)) throw new Error("Invalid configuration");
      var e = t;
      if (!e.name || "string" != typeof e.name) throw new Error("You need to define a name for the room");
      if (!e.icon || "string" != typeof e.icon) throw new Error("You need to define an Icon for the room")
    }(t);
    var e = t;
    return Be(e) && (e = Ve(e)),
      function (t) {
        var e, o, n, r, i, a, c, l, s, u, d, p;
        return Re(Re(Re({}, ye), t), {}, {
          secondary: null !== (e = t.secondary) && void 0 !== e ? e : ye.secondary,
          secondary_color: null !== (o = t.secondary_color) && void 0 !== o ? o : ye.secondary_color,
          secondary_entity: null !== (n = t.secondary_entity) && void 0 !== n ? n : ye.secondary_entity,
          entities: null !== (r = t.entities) && void 0 !== r ? r : ye.entities,
          background_type: null !== (i = t.background_type) && void 0 !== i ? i : ye.background_type,
          background_image: null !== (a = t.background_image) && void 0 !== a ? a : ye.background_image,
          background_person_entity: null !== (c = t.background_person_entity) && void 0 !== c ? c : ye.background_person_entity,
          background_image_square: null !== (l = t.background_image_square) && void 0 !== l ? l : ye.background_image_square,
          entities_reverse_order: null !== (s = t.entities_reverse_order) && void 0 !== s ? s : ye.entities_reverse_order,
          use_template_color_for_title: null !== (u = t.use_template_color_for_title) && void 0 !== u ? u : ye.use_template_color_for_title,
          use_template_color_for_secondary: null !== (d = t.use_template_color_for_secondary) && void 0 !== d ? d : ye.use_template_color_for_secondary,
          secondary_allow_html: null !== (p = t.secondary_allow_html) && void 0 !== p ? p : ye.secondary_allow_html
        })
      }(e)
  }

  function Fe(t) {
    return !(!t || "string" != typeof t) && t.includes("{")
  }

  function Ze(t) {
    return Ze = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, Ze(t)
  }

  function We(t, e) {
    var o = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(t);
      e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })), o.push.apply(o, n)
    }
    return o
  }

  function Ge(t) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2 ? We(Object(o), !0).forEach(function (e) {
        Ye(t, e, o[e])
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : We(Object(o)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e))
      })
    }
    return t
  }

  function Ye(t, e, o) {
    return (e = function (t) {
      var e = function (t, e) {
        if ("object" != Ze(t) || !t) return t;
        var o = t[Symbol.toPrimitive];
        if (void 0 !== o) {
          var n = o.call(t, e || "default");
          if ("object" != Ze(n)) return n;
          throw new TypeError("@@toPrimitive must return a primitive value.")
        }
        return ("string" === e ? String : Number)(t)
      }(t, "string");
      return "symbol" == Ze(e) ? e : e + ""
    }(e)) in t ? Object.defineProperty(t, e, {
      value: o,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = o, t
  }

  function Ke(t, e) {
    var o = Ge({}, bt);
    return t && _t[t] && (o = Ge(Ge({}, o), _t[t])), e && (e.icon_color && (o.icon_color = e.icon_color), e.background_color && (o.background_color = e.background_color), e.text_color && (o.text_color = e.text_color)), o
  }

  function Je(t) {
    return "rgb(".concat(t[0], ", ").concat(t[1], ", ").concat(t[2], ")")
  }

  function Qe(t, e) {
    return "rgba(".concat(t[0], ", ").concat(t[1], ", ").concat(t[2], ", ").concat(e, ")")
  }

  function Xe(t) {
    return Xe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, Xe(t)
  }

  function to(t, e) {
    for (var o = 0; o < e.length; o++) {
      var n = e[o];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, eo(n.key), n)
    }
  }

  function eo(t) {
    var e = function (t, e) {
      if ("object" != Xe(t) || !t) return t;
      var o = t[Symbol.toPrimitive];
      if (void 0 !== o) {
        var n = o.call(t, e || "default");
        if ("object" != Xe(n)) return n;
        throw new TypeError("@@toPrimitive must return a primitive value.")
      }
      return ("string" === e ? String : Number)(t)
    }(t, "string");
    return "symbol" == Xe(e) ? e : e + ""
  }
  var oo, no, ro, io, ao, co, lo, so, uo, po, fo, ho = function () {
    return function (t, e, o) {
      return e && to(t.prototype, e), o && to(t, o), Object.defineProperty(t, "prototype", {
        writable: !1
      }), t
    }(function t(e) {
      ! function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
      }(this, t), this._holdTimeout = null, this._holdFired = !1, this._dblTapTimeout = null, this._pendingTapConfig = null, this._element = e
    }, [{
      key: "holdFired",
      get: function () {
        return this._holdFired
      }
    }, {
      key: "resetHoldFired",
      value: function () {
        this._holdFired = !1
      }
    }, {
      key: "startHoldTimer",
      value: function (t) {
        var e = this;
        this.clearHoldTimer(), this._holdFired = !1, this._holdTimeout = setTimeout(function () {
          e._holdFired = !0, t()
        }, 500)
      }
    }, {
      key: "clearHoldTimer",
      value: function () {
        this._holdTimeout && (clearTimeout(this._holdTimeout), this._holdTimeout = null)
      }
    }, {
      key: "createHandlers",
      value: function (t) {
        var e, o = this,
          n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          r = n.stopPropagation,
          i = void 0 !== r && r,
          a = n.ignoreSelector,
          c = (null === (e = t.double_tap_action) || void 0 === e ? void 0 : e.action) && "none" !== t.double_tap_action.action;
        return {
          onClick: function (e) {
            o._holdFired ? o._holdFired = !1 : (e.stopPropagation(), c ? o._dblTapTimeout ? (clearTimeout(o._dblTapTimeout), o._dblTapTimeout = null, o._pendingTapConfig = null, Pe(o._element, t, "double_tap")) : (o._pendingTapConfig = t, o._dblTapTimeout = setTimeout(function () {
              o._dblTapTimeout = null, o._pendingTapConfig && (Pe(o._element, o._pendingTapConfig, "tap"), o._pendingTapConfig = null)
            }, 300)) : Pe(o._element, t, "tap"))
          },
          onDblClick: function (t) {
            c && (t.preventDefault(), t.stopPropagation())
          },
          onMouseDown: function (e) {
            if (0 === e.button) {
              if (a)
                if (e.target.closest(a)) return;
              i && e.stopPropagation(), o.startHoldTimer(function () {
                return Pe(o._element, t, "hold")
              })
            }
          },
          onMouseUp: function () {
            o.clearHoldTimer()
          },
          onMouseLeave: function () {
            o.clearHoldTimer()
          },
          onTouchStart: function (e) {
            if (a && e.target.closest(a)) return;
            i && e.stopPropagation(), o.startHoldTimer(function () {
              return Pe(o._element, t, "hold")
            })
          },
          onTouchEnd: function () {
            o.clearHoldTimer()
          },
          onContextMenu: function (e) {
            e.preventDefault(), e.stopPropagation(), Pe(o._element, t, "hold")
          }
        }
      }
    }])
  }();

  function _o(t) {
    return _o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, _o(t)
  }

  function yo(t, e) {
    return e || (e = t.slice(0)), Object.freeze(Object.defineProperties(t, {
      raw: {
        value: Object.freeze(e)
      }
    }))
  }

  function go(t, e) {
    var o = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(t);
      e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })), o.push.apply(o, n)
    }
    return o
  }

  function mo(t) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2 ? go(Object(o), !0).forEach(function (e) {
        bo(t, e, o[e])
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : go(Object(o)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e))
      })
    }
    return t
  }

  function bo(t, e, o) {
    return (e = function (t) {
      var e = function (t, e) {
        if ("object" != _o(t) || !t) return t;
        var o = t[Symbol.toPrimitive];
        if (void 0 !== o) {
          var n = o.call(t, e || "default");
          if ("object" != _o(n)) return n;
          throw new TypeError("@@toPrimitive must return a primitive value.")
        }
        return ("string" === e ? String : Number)(t)
      }(t, "string");
      return "symbol" == _o(e) ? e : e + ""
    }(e)) in t ? Object.defineProperty(t, e, {
      value: o,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = o, t
  }

  function vo(t) {
    var e;
    if ("entity" !== t.type) return !1;
    var o = t;
    return !0 === o.use_multi_state && Boolean(null === (e = o.custom_states) || void 0 === e ? void 0 : e.trim())
  }

  function wo(t, e, o, n) {
    var r, i = o.icon_color,
      a = o.background_color;
    if ("entity" === t.type) {
      var c = t;
      if (c.use_light_color && e) {
        var l, s = xt(n, c.entity);
        if (null != s && null !== (l = s.attributes) && void 0 !== l && l.rgb_color) {
          var u = {
            iconColor: Je(r = s.attributes.rgb_color),
            backgroundColor: Qe(r, .2)
          };
          i = u.iconColor, a = u.backgroundColor
        }
      }
    }
    return {
      iconColor: i,
      backgroundColor: a
    }
  }

  function ko(t, e) {
    var o = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(t);
      e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })), o.push.apply(o, n)
    }
    return o
  }

  function xo(t, e, o) {
    return (e = To(e)) in t ? Object.defineProperty(t, e, {
      value: o,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = o, t
  }

  function So(t, e) {
    return e || (e = t.slice(0)), Object.freeze(Object.defineProperties(t, {
      raw: {
        value: Object.freeze(e)
      }
    }))
  }

  function Oo(t) {
    return function (t) {
      if (Array.isArray(t)) return $o(t)
    }(t) || function (t) {
      if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
    }(t) || Ao(t) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }()
  }

  function Ao(t, e) {
    if (t) {
      if ("string" == typeof t) return $o(t, e);
      var o = {}.toString.call(t).slice(8, -1);
      return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? $o(t, e) : void 0
    }
  }

  function $o(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var o = 0, n = Array(e); o < e; o++) n[o] = t[o];
    return n
  }

  function Eo(t, e) {
    for (var o = 0; o < e.length; o++) {
      var n = e[o];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, To(n.key), n)
    }
  }

  function To(t) {
    var e = function (t, e) {
      if ("object" != Ro(t) || !t) return t;
      var o = t[Symbol.toPrimitive];
      if (void 0 !== o) {
        var n = o.call(t, e || "default");
        if ("object" != Ro(n)) return n;
        throw new TypeError("@@toPrimitive must return a primitive value.")
      }
      return ("string" === e ? String : Number)(t)
    }(t, "string");
    return "symbol" == Ro(e) ? e : e + ""
  }

  function Co(t, e, o) {
    return e = zo(e),
      function (t, e) {
        if (e && ("object" == Ro(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return function (t) {
          if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t
        }(t)
      }(t, jo() ? Reflect.construct(e, o || [], zo(t).constructor) : e.apply(t, o))
  }

  function jo() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}))
    } catch (t) {}
    return (jo = function () {
      return !!t
    })()
  }

  function Po(t, e, o, n) {
    var r = Mo(zo(1 & n ? t.prototype : t), e, o);
    return 2 & n && "function" == typeof r ? function (t) {
      return r.apply(o, t)
    } : r
  }

  function Mo() {
    return Mo = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (t, e, o) {
      var n = function (t, e) {
        for (; !{}.hasOwnProperty.call(t, e) && null !== (t = zo(t)););
        return t
      }(t, e);
      if (n) {
        var r = Object.getOwnPropertyDescriptor(n, e);
        return r.get ? r.get.call(arguments.length < 3 ? t : o) : r.value
      }
    }, Mo.apply(null, arguments)
  }

  function zo(t) {
    return zo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t)
    }, zo(t)
  }

  function Io(t, e) {
    return Io = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t
    }, Io(t, e)
  }

  function Ro(t) {
    return Ro = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, Ro(t)
  }
  var Do = function (t, e, o, n) {
      var r, i = arguments.length,
        a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
      if ("object" === ("undefined" == typeof Reflect ? "undefined" : Ro(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n);
      else
        for (var c = t.length - 1; c >= 0; c--)(r = t[c]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, o, a) : r(e, o)) || a);
      return i > 3 && a && Object.defineProperty(e, o, a), a
    },
    Uo = function (t) {
      function e() {
        var t;
        return function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, e), (t = Co(this, e))._templateResultsVersion = 0, t._templateService = new Ee, t._actionController = new ho(t), t._templateService.setUpdateCallback(function () {
          t._templateResultsVersion++
        }), t
      }
      return function (t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: !0,
              configurable: !0
            }
          }), Object.defineProperty(t, "prototype", {
            writable: !1
          }), e && Io(t, e)
        }(e, t),
        function (t, e, o) {
          return e && Eo(t.prototype, e), o && Eo(t, o), Object.defineProperty(t, "prototype", {
            writable: !1
          }), t
        }(e, [{
          key: "getCardSize",
          value: function () {
            if (!this._config) return 4;
            var e = this._config.entities ? this._config.entities.length : 0,
              n = Math.max(1, Number(this._config.entity_columns ?? 1) || 1),
              r = Math.max(
                Math.ceil(e / n),
                Number(this._config.entity_rows) || 0
              ),
              i = 20 + 45 * r + 12 * Math.max(0, r - 1),
              a = Math.max(4, Math.ceil(i / 50) + 1);
            return a
          }
        }, {
          key: "getGridOptions",
          value: function () {
            if (!this._config) return {
              columns: 12,
              min_columns: 12,
              max_columns: 12,
              rows: 4,
              min_rows: 4
            };
            var e = this._config.entities ? this._config.entities.length : 0,
              o = Math.max(1, Number(this._config.entity_columns ?? 1) || 1),
              n = Math.max(
                Math.ceil(e / o),
                Number(this._config.entity_rows) || 0
              ),
              r = 20 + 45 * n + 12 * Math.max(0, n - 1),
              i = Math.max(4, Math.ceil(r / 50) + 1);
            return {
              columns: 12,
              min_columns: 12,
              max_columns: 12,
              rows: i,
              min_rows: i
            }
          }
        }, {
          key: "setConfig",
          value: function (t) {
            this._templateService.unsubscribeAll(), this._config = qe(t), this._templateService.setConfig(this._config)
          }
        }, {
          key: "updated",
          value: function (t) {
            Po(e, "updated", this, 3)([t]), this._config && this.hass && (this._templateService.setHass(this.hass), this._subscribeTemplates())
          }
        }, {
          key: "connectedCallback",
          value: function () {
            Po(e, "connectedCallback", this, 3)([]), this.hass && this._templateService.setHass(this.hass), this._subscribeTemplates()
          }
        }, {
          key: "disconnectedCallback",
          value: function () {
            this._templateService.unsubscribeAll(), Po(e, "disconnectedCallback", this, 3)([])
          }
        }, {
          key: "_subscribeTemplates",
          value: function () {
            if (this._config) {
              this._config.secondary && this._templateService.subscribe(this._config.secondary), this._config.secondary_color && this._templateService.subscribe(this._config.secondary_color), this._config.tertiary && this._templateService.subscribe(this._config.tertiary), this._config.tertiary_color && this._templateService.subscribe(this._config.tertiary_color), this._config.background_image && this._templateService.subscribe(this._config.background_image), this._config.background_circle_color && this._templateService.subscribe(this._config.background_circle_color), this._config.icon_color && this._templateService.subscribe(this._config.icon_color);
              var t, e = function (t, e) {
                var o = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                if (!o) {
                  if (Array.isArray(t) || (o = Ao(t)) || e && t && "number" == typeof t.length) {
                    o && (t = o);
                    var n = 0,
                      r = function () {};
                    return {
                      s: r,
                      n: function () {
                        return n >= t.length ? {
                          done: !0
                        } : {
                          done: !1,
                          value: t[n++]
                        }
                      },
                      e: function (t) {
                        throw t
                      },
                      f: r
                    }
                  }
                  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }
                var i, a = !0,
                  c = !1;
                return {
                  s: function () {
                    o = o.call(t)
                  },
                  n: function () {
                    var t = o.next();
                    return a = t.done, t
                  },
                  e: function (t) {
                    c = !0, i = t
                  },
                  f: function () {
                    try {
                      a || null == o.return || o.return()
                    } finally {
                      if (c) throw i
                    }
                  }
                }
              }(this._config.entities);
              try {
                for (e.s(); !(t = e.n()).done;) {
                  var o = t.value;
                  o.show_value && o.value_template && this._templateService.subscribe(o.value_template);
                  for (var n = 0, r = Object.keys(o); n < r.length; n++) {
                    var i = o[r[n]];
                    "string" == typeof i && Fe(i) && this._templateService.subscribe(i)
                  }
                }
              } catch (t) {
                e.e(t)
              } finally {
                e.f()
              }
            }
          }
        }, {
          key: "_getValue",
          value: function (t) {
            return this._templateService.getEntityOrTemplateValue(t)
          }
        }, {
          key: "_getValueRawOrTemplate",
          value: function (t) {
            return this._templateService.getValue(t)
          }
        }, {
          key: "render",
          value: function () {
            var t, e = this;
            if (!this._config) return W;
            var o = this._getValueRawOrTemplate(this._config.secondary),
              n = this._getValueRawOrTemplate(this._config.secondary_color),
              r = this._getValueRawOrTemplate(this._config.tertiary),
              i = this._getValueRawOrTemplate(this._config.tertiary_color),
              a = this._config.entities.slice(),
              c = Math.max(1, Number(this._config.entity_columns ?? 1) || 1),
              entityRowsN = this._config.entity_rows ? Math.max(1, Number(this._config.entity_rows) || 1) : null,
              entityRowsStyle = entityRowsN ? ';--entity-rows:' + entityRowsN : '';
            this._config.entities_reverse_order && (a = Oo(a).reverse());
            var l = this._getValueRawOrTemplate(this._config.background_circle_color),
              s = this._getValueRawOrTemplate(this._config.icon_color),
              u = function (t, e, o) {
                t = "gray" === t ? "grey" : t;
                if (t && _t[t]) {
                  var n = _t[t];
                  return {
                    background_color: (null == o ? void 0 : o.trim()) || n.background_color,
                    icon_color: (null == e ? void 0 : e.trim()) || n.icon_color,
                    text_color: n.text_color
                  }
                }
                return {
                  background_color: o || "var(--accent-color)",
                  icon_color: e || "rgb(var(--rgb-white))",
                  text_color: "var(--primary-text-color)"
                }
              }(this._config.card_template, s, l),
              d = this._config.use_template_color_for_title ? this._getValueRawOrTemplate(u.text_color) : "var(--primary-text-color)",
              p = this._config.use_template_color_for_secondary ? this._getValueRawOrTemplate(u.text_color) : n,
              f = this._config.use_template_color_for_tertiary ? this._getValueRawOrTemplate(u.text_color) : i,
              h = Ce(this._config),
              _ = this._isSecondaryClickable(),
              y = this._isTertiaryClickable(),
              g = h ? this._actionController.createHandlers(this._config, {
                ignoreSelector: ".state-item, .secondary.clickable, .tertiary.clickable"
              }) : null,
              m = _ ? this._actionController.createHandlers(this._getSecondaryConfig()) : null,
              b = y ? this._actionController.createHandlers(this._getTertiaryConfig()) : null;
            return F(ao || (ao = So([' <ha-card @click="', '" @dblclick="', '" @mousedown="', '" @mouseup="', '" @mouseleave="', '" @touchstart="', '" @touchend="', '" @contextmenu="', '" .config="', '" class="', '" tabindex="', '"> <div class="container"> <div class="content-main"> <div class="text-content"> <span class="primary" style="color:', '">', "</span> ", " ", " </div> ", ' </div> <div class="content-right"> <div class="states ', '" style="--entity-columns:', '', '"> ', " </div> </div> </div> </ha-card> "])), null == g ? void 0 : g.onClick, null == g ? void 0 : g.onDblClick, null == g ? void 0 : g.onMouseDown, null == g ? void 0 : g.onMouseUp, null == g ? void 0 : g.onMouseLeave, null == g ? void 0 : g.onTouchStart, null == g ? void 0 : g.onTouchEnd, null == g ? void 0 : g.onContextMenu, this._config, h ? "clickable" : "non-clickable", h ? "0" : "-1", d, this._config.name, this._renderSecondary(o, p, _, m), this._renderTertiary(r, f, y, b), this._renderIconContainer(u), this._config.entities_reverse_order ? "states-reverse" : "", c, entityRowsStyle, a.map(function (t) {
              return e._renderItem(t)
            }))
          }
        }, {
          key: "_renderSecondary",
          value: function (t, e, o, n) {
            var r;
            if (!t) return "";
            var i = null !== (r = this._config) && void 0 !== r && r.secondary_allow_html ? he(t) : t;
            return F(co || (co = So([' <span class="secondary ', '" style="color:', '" @click="', '" @dblclick="', '" @mousedown="', '" @mouseup="', '" @mouseleave="', '" @touchstart="', '" @touchend="', '" @contextmenu="', '" tabindex="', '">', "</span> "])), o ? "clickable" : "", e, null == n ? void 0 : n.onClick, null == n ? void 0 : n.onDblClick, null == n ? void 0 : n.onMouseDown, null == n ? void 0 : n.onMouseUp, null == n ? void 0 : n.onMouseLeave, null == n ? void 0 : n.onTouchStart, null == n ? void 0 : n.onTouchEnd, null == n ? void 0 : n.onContextMenu, o ? "0" : "-1", i)
          }
        }, {
          key: "_renderTertiary",
          value: function (t, e, o, n) {
            var r;
            if (!t) return "";
            var i = null !== (r = this._config) && void 0 !== r && r.tertiary_allow_html ? he(t) : t;
            return F(lo || (lo = So([' <span class="tertiary ', '" style="color:', '" @click="', '" @dblclick="', '" @mousedown="', '" @mouseup="', '" @mouseleave="', '" @touchstart="', '" @touchend="', '" @contextmenu="', '" tabindex="', '">', "</span> "])), o ? "clickable" : "", e, null == n ? void 0 : n.onClick, null == n ? void 0 : n.onDblClick, null == n ? void 0 : n.onMouseDown, null == n ? void 0 : n.onMouseUp, null == n ? void 0 : n.onMouseLeave, null == n ? void 0 : n.onTouchStart, null == n ? void 0 : n.onTouchEnd, null == n ? void 0 : n.onContextMenu, o ? "0" : "-1", i)
          }
        }, {
          key: "_renderIconContainer",
          value: function (t) {
            var e, o, n, r = this._shouldUseBackgroundImage(),
              i = this._getBackgroundImageUrl(),
              a = r && i;
            return F(so || (so = So([' <div class="icon-container"> ', " ", " </div> "])), "none" !== (null === (e = this._config) || void 0 === e ? void 0 : e.background_type) ? a ? F(uo || (uo = So([' <div class="icon-background icon-background-image ', '" style="background-image:url(', ')"></div> '])), null !== (o = this._config) && void 0 !== o && o.background_image_square ? "icon-background-square" : "", i) : F(po || (po = So([' <div class="icon-background" style="background-color:', '"></div> '])), this._getValueRawOrTemplate(t.background_color)) : "", a ? "" : F(fo || (fo = So([' <div class="icon" style="--icon-color:', '"> <ha-icon .icon="', '"> </div> '])), this._getValueRawOrTemplate(t.icon_color), null === (n = this._config) || void 0 === n ? void 0 : n.icon))
          }
        }, {
          key: "_renderItem",
          value: function (t) {
            var e, o, n, r = this;
            if ("entity" !== t.type && "template" !== t.type) return e = this.hass, n = (null == e || null === (o = e.localize) || void 0 === o ? void 0 : o.call(e, "ui.card.common.invalid_entity")) || "Invalid Entity", F(io || (io = yo(['<span class="invalid-entity">', "</span>"])), n);
            var i, a = function (t, e, o) {
                var n = "",
                  r = !1,
                  i = null,
                  a = null;
                if ("entity" === t.type) {
                  var c = t;
                  if (n = o(c.entity), vo(t)) {
                    var l = xt(e, c.entity);
                    null != l && l.state && (r = "off" !== (a = l.state) && "unavailable" !== a)
                  } else if (kt(c.entity)) {
                    var s = xt(e, c.entity);
                    null != s && s.state && (r = "off" !== (i = s.state))
                  } else r = n == c.on_state
                } else "template" === t.type && (r = "" !== (n = o(t.condition)) && void 0 !== n);
                return {
                  stateValue: n,
                  isOn: r,
                  currentHvacMode: i,
                  currentEntityState: a
                }
              }(t, this.hass, function (t) {
                return r._getValue(t)
              }),
              c = a.isOn,
              l = a.currentHvacMode,
              s = a.currentEntityState,
              u = a.stateValue,
              d = this._resolveEntityTemplateFields(t),
              p = function (t, e) {
                var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                  n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
                  r = t;
                if (vo(t) && n) return Ke(r["template_".concat(n)], {
                  icon_color: r["color_".concat(n)],
                  background_color: r["background_color_".concat(n)]
                });
                if (kt(r.entity) && o) return Ke(r["template_".concat(o)], {
                  icon_color: r["color_".concat(o)],
                  background_color: r["background_color_".concat(o)]
                });
                var i = t,
                  a = "on" === e ? r.template_on || i.templates_on : r.template_off || i.templates_off,
                  c = Ke(void 0);
                return a && (Array.isArray(a) ? a : [a]).forEach(function (t) {
                  _t[t] && (c = mo(mo({}, c), _t[t]))
                }), "on" === e ? (r.color_on && (c.icon_color = r.color_on), r.background_color_on && (c.background_color = r.background_color_on)) : (r.color_off && (c.icon_color = r.color_off), r.background_color_off && (c.background_color = r.background_color_off)), c
              }(d, c ? "on" : "off", l, s),
              f = wo(d, c, p, this.hass),
              h = f.iconColor,
              _ = f.backgroundColor,
              y = function (t, e, o, n) {
                if ("entity" === t.type) {
                  var r = t;
                  return vo(t) && n ? r["icon_".concat(n)] || t.icon : kt(r.entity) && o ? "off" === o && t.icon_off ? t.icon_off : t.icon : e ? t.icon : t.icon_off || t.icon
                }
                return e ? t.icon : t.icon_off || t.icon
              }(d, c, l, s);
            if (t.show_value)
              if (t.value_template) i = this._getValueRawOrTemplate(t.value_template);
              else if ("entity" === t.type) {
              var g, m = t,
                b = null === (g = this.hass) || void 0 === g ? void 0 : g.states[m.entity];
              i = null == b ? void 0 : b.state
            } else "template" === t.type && (i = u);
            return function (t, e, o, n, r, i, a) {
              var c = je(t),
                l = i ? "on" : "off",
                s = void 0 !== a && "" !== a,
                u = t.name,
                d = Boolean(u),
                p = "var(--primary-text-color)";
              return F(oo || (oo = yo([' <div @click="', '" @dblclick="', '" @mousedown="', '" @mouseup="', '" @mouseleave="', '" @touchstart="', '" @touchend="', '" @contextmenu="', '" tabindex="', '" class="state-item ', '"> <div class="state-icon-circle ', '" style="background-color:', '"> <ha-icon class="state-icon ', '" .icon="', '" style="color:', '"></ha-icon> ', " </div> ", " </div> "])), c ? null == e ? void 0 : e.onClick : null, c ? null == e ? void 0 : e.onDblClick : null, c ? null == e ? void 0 : e.onMouseDown : null, c ? null == e ? void 0 : e.onMouseUp : null, c ? null == e ? void 0 : e.onMouseLeave : null, c ? null == e ? void 0 : e.onTouchStart : null, c ? null == e ? void 0 : e.onTouchEnd : null, c ? null == e ? void 0 : e.onContextMenu : null, c ? "0" : "-1", c ? "clickable" : "non-clickable", s ? "has-value" : "", n, l, r, o, s ? F(no || (no = yo(['<span class="state-value" style="color:', '">', "</span>"])), o, a) : W, d ? F(ro || (ro = yo(['<span class="state-name" style="color:', '">', "</span>"])), p, u) : W)
            }(t, je(t) ? this._actionController.createHandlers(t) : null, h, _, y, c, i)
          }
        }, {
          key: "_resolveEntityTemplateFields",
          value: function (t) {
            for (var e = function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var o = null != arguments[e] ? arguments[e] : {};
                  e % 2 ? ko(Object(o), !0).forEach(function (e) {
                    xo(t, e, o[e])
                  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : ko(Object(o)).forEach(function (e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e))
                  })
                }
                return t
              }({}, t), o = 0, n = Object.keys(t); o < n.length; o++) {
              var r = n[o];
              if (r.startsWith("color_") || r.startsWith("background_color_") || "color_on" === r || "color_off" === r || "background_color_on" === r || "background_color_off" === r || r.startsWith("icon_")) {
                var i = t[r];
                if ("string" == typeof i) {
                  var a = this._getValueRawOrTemplate(i);
                  void 0 !== a && (e[r] = a)
                }
              }
            }
            return e
          }
        }, {
          key: "_isSecondaryClickable",
          value: function () {
            var t;
            return !(null === (t = this._config) || void 0 === t || !t.secondary || !this._config.secondary_entity) && Ce({
              entity: this._config.secondary_entity,
              tap_action: this._config.secondary_tap_action,
              hold_action: this._config.secondary_hold_action,
              double_tap_action: this._config.secondary_double_tap_action
            })
          }
        }, {
          key: "_getSecondaryConfig",
          value: function () {
            var t, e, o, n;
            return {
              entity: null === (t = this._config) || void 0 === t ? void 0 : t.secondary_entity,
              tap_action: null === (e = this._config) || void 0 === e ? void 0 : e.secondary_tap_action,
              hold_action: null === (o = this._config) || void 0 === o ? void 0 : o.secondary_hold_action,
              double_tap_action: null === (n = this._config) || void 0 === n ? void 0 : n.secondary_double_tap_action
            }
          }
        }, {
          key: "_isTertiaryClickable",
          value: function () {
            var t;
            return !(null === (t = this._config) || void 0 === t || !t.tertiary || !this._config.tertiary_entity) && Ce({
              entity: this._config.tertiary_entity,
              tap_action: this._config.tertiary_tap_action,
              hold_action: this._config.tertiary_hold_action,
              double_tap_action: this._config.tertiary_double_tap_action
            })
          }
        }, {
          key: "_getTertiaryConfig",
          value: function () {
            var t, e, o, n;
            return {
              entity: null === (t = this._config) || void 0 === t ? void 0 : t.tertiary_entity,
              tap_action: null === (e = this._config) || void 0 === e ? void 0 : e.tertiary_tap_action,
              hold_action: null === (o = this._config) || void 0 === o ? void 0 : o.tertiary_hold_action,
              double_tap_action: null === (n = this._config) || void 0 === n ? void 0 : n.tertiary_double_tap_action
            }
          }
        }, {
          key: "_getBackgroundImageUrl",
          value: function () {
            if (!this._config) return null;
            if ("person" === this._config.background_type && this._config.background_person_entity) {
              var t, e, o = null === (t = this.hass) || void 0 === t ? void 0 : t.states[this._config.background_person_entity];
              if (null != o && null !== (e = o.attributes) && void 0 !== e && e.entity_picture) {
                var n = o.attributes.entity_picture;
                return n.startsWith("http") ? n : (n.startsWith("/") || (n = "/".concat(n)), "".concat(window.location.origin).concat(n))
              }
            }
            return "image" === this._config.background_type && this._config.background_image && this._getValueRawOrTemplate(this._config.background_image) || null
          }
        }, {
          key: "_shouldUseBackgroundImage",
          value: function () {
            var t, e;
            return "image" === (null === (t = this._config) || void 0 === t ? void 0 : t.background_type) || "person" === (null === (e = this._config) || void 0 === e ? void 0 : e.background_type)
          }
        }], [{
          key: "getConfigElement",
          value: function () {
            return document.createElement("dynamic-room-card-minimalist-editor")
          }
        }, {
          key: "getStubConfig",
          value: function () {
            return {
              type: "custom:dynamic-room-card-minimalist",
              name: "Living Room",
              icon: "mdi:sofa",
              card_template: yt(),
              secondary: "22.5°C",
              background_type: "color",
              tap_action: {
                action: "none"
              },
              hold_action: {
                action: "none"
              },
              use_template_color_for_title: !0,
              use_template_color_for_secondary: !0,
              entities: [{
                type: "template",
                icon: "mdi:ceiling-light",
                icon_off: "mdi:ceiling-light-outline",
                condition: "Lights On",
                template_on: "yellow"
              }, {
                type: "template",
                icon: "mdi:motion-sensor",
                icon_off: "mdi:motion-sensor-off",
                condition: "Motion",
                template_on: "green"
              }, {
                type: "template",
                icon: "mdi:radiator",
                icon_off: "mdi:radiator-disabled",
                condition: "",
                template_off: "red"
              }]
            }
          }
        }])
    }(st);
  Uo.styles = It, Do([ft({
    attribute: !1
  })], Uo.prototype, "hass", void 0), Do([ht()], Uo.prototype, "_config", void 0), Do([ht()], Uo.prototype, "_templateResultsVersion", void 0), customElements.define("dynamic-room-card-minimalist", Uo)
})();
