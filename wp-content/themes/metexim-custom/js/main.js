(() => {
  "use strict";
  const e = {};
  let t = !0,
    s = (e = 500) => {
      let s = document.querySelector("body");
      if (t) {
        let i = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < i.length; e++) {
            i[e].style.paddingRight = "0px";
          }
          (s.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    },
    i = (e = 500) => {
      let s = document.querySelector("body");
      if (t) {
        let i = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < i.length; e++) {
          i[e].style.paddingRight = "0px";
        }
        (s.style.paddingRight = "0px"),
          document.documentElement.classList.add("lock"),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    };
  function r() {
    let e = document.querySelector(".burger");
    e &&
      e.addEventListener("click", function (e) {
        t &&
          (((e = 500) => {
            document.documentElement.classList.contains("lock") ? s(e) : i(e);
          })(),
          document.documentElement.classList.toggle("open"));
      });
  }
  function n(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function o(e) {
    return e.filter(function (e, t, s) {
      return s.indexOf(e) === t;
    });
  }
  r();

  // сделал
  e.popup = new (class {
    constructor(e) {
      let t = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...t,
          ...e,
          classes: { ...t.classes, ...e?.classes },
          hashSettings: { ...t.hashSettings, ...e?.hashSettings },
          on: { ...t.on, ...e?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (e) {
          const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
          if (t)
            return (
              e.preventDefault(),
              (this._dataValue = t.getAttribute(
                this.options.attributeOpenButton
              )
                ? t.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = t),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${t.classList}`
                  )
            );
          return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (e.preventDefault(), void this.close())
            : void 0;
        }.bind(this)
      ),
        document.addEventListener(
          "keydown",
          function (e) {
            if (
              this.options.closeEsc &&
              27 == e.which &&
              "Escape" === e.code &&
              this.isOpen
            )
              return e.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == e.which &&
              this.isOpen &&
              this._focusCatch(e);
          }.bind(this)
        ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this)
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this)
          ));
    }
    open(e) {
      if (
        (e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute
            )}?rel=0&showinfo=0&autoplay=1`,
            t = document.createElement("iframe");
          t.setAttribute("allowfullscreen", "");
          const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
          t.setAttribute("allow", `${s}; encrypted-media`),
            t.setAttribute("src", e),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(t);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } })
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. "
        );
    }
    close(e) {
      e &&
        "string" == typeof e &&
        "" !== e.trim() &&
        (this.previousOpen.selector = e),
        this.options.on.beforeClose(this),
        this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
          this.targetOpen.element.querySelector(
            `[${this.options.youtubePlaceAttribute}]`
          ) &&
          (this.targetOpen.element.querySelector(
            `[${this.options.youtubePlaceAttribute}]`
          ).innerHTML = ""),
        this.previousOpen.element.classList.remove(
          this.options.classes.popupActive
        ),
        this.previousOpen.element.setAttribute("aria-hidden", "true"),
        this._reopen ||
          (document.body.classList.remove(this.options.classes.bodyActive),
          (this.isOpen = !1)),
        this._removeHash(),
        this._selectorOpen &&
          ((this.lastClosed.selector = this.previousOpen.selector),
          (this.lastClosed.element = this.previousOpen.element)),
        this.options.on.afterClose(this),
        setTimeout(() => {
          this._focusTrap();
        }, 50),
        this.popupLogging("Закрыл попап");
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let e = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${e}"]`) &&
        e &&
        this.open(e);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const t = this.targetOpen.element.querySelectorAll(this._focusEl),
        s = Array.prototype.slice.call(t),
        i = s.indexOf(document.activeElement);
      e.shiftKey && 0 === i && (s[s.length - 1].focus(), e.preventDefault()),
        e.shiftKey || i !== s.length - 1 || (s[0].focus(), e.preventDefault());
    }
    _focusTrap() {
      const e = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : e[0].focus();
    }
    popupLogging(e) {
      this.options.logging && n(`[Попапос]: ${e}`);
    }
  })({});
  let a = (e, t = !1, i = 500, r = 0) => {
    const o = "string" == typeof e ? document.querySelector(e) : e;
    if (o) {
      let a = "",
        l = 0;
      t &&
        ((a = "header.header"), (l = document.querySelector(a).offsetHeight));
      let d = {
        speedAsDuration: !0,
        speed: i,
        header: a,
        offset: r,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (s(), document.documentElement.classList.remove("open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(o, "", d);
      else {
        let e = o.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: l ? e - l : e, behavior: "smooth" });
      }
      n(`[gotoBlock]: Юхуу...едем к ${e}`);
    } else n(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
  };
  function l(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function d(e = {}, t = {}) {
    Object.keys(t).forEach((s) => {
      void 0 === e[s]
        ? (e[s] = t[s])
        : l(t[s]) && l(e[s]) && Object.keys(t[s]).length > 0 && d(e[s], t[s]);
    });
  }
  const c = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function p() {
    const e = "undefined" != typeof document ? document : {};
    return d(e, c), e;
  }
  const u = {
    document: c,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function h() {
    const e = "undefined" != typeof window ? window : {};
    return d(e, u), e;
  }
  function f(e, t = 0) {
    return setTimeout(e, t);
  }
  function m() {
    return Date.now();
  }
  function g(e, t = "x") {
    const s = h();
    let i, r, n;
    const o = (function (e) {
      const t = h();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((r = o.transform || o.webkitTransform),
          r.split(",").length > 6 &&
            (r = r
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (n = new s.WebKitCSSMatrix("none" === r ? "" : r)))
        : ((n =
            o.MozTransform ||
            o.OTransform ||
            o.MsTransform ||
            o.msTransform ||
            o.transform ||
            o
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (i = n.toString().split(","))),
      "x" === t &&
        (r = s.WebKitCSSMatrix
          ? n.m41
          : 16 === i.length
          ? parseFloat(i[12])
          : parseFloat(i[4])),
      "y" === t &&
        (r = s.WebKitCSSMatrix
          ? n.m42
          : 16 === i.length
          ? parseFloat(i[13])
          : parseFloat(i[5])),
      r || 0
    );
  }
  function v(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function w(...e) {
    const t = Object(e[0]),
      s = ["__proto__", "constructor", "prototype"];
    for (let r = 1; r < e.length; r += 1) {
      const n = e[r];
      if (
        null != n &&
        ((i = n),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? i instanceof HTMLElement
          : i && (1 === i.nodeType || 11 === i.nodeType)))
      ) {
        const e = Object.keys(Object(n)).filter((e) => s.indexOf(e) < 0);
        for (let s = 0, i = e.length; s < i; s += 1) {
          const i = e[s],
            r = Object.getOwnPropertyDescriptor(n, i);
          void 0 !== r &&
            r.enumerable &&
            (v(t[i]) && v(n[i])
              ? n[i].__swiper__
                ? (t[i] = n[i])
                : w(t[i], n[i])
              : !v(t[i]) && v(n[i])
              ? ((t[i] = {}), n[i].__swiper__ ? (t[i] = n[i]) : w(t[i], n[i]))
              : (t[i] = n[i]));
        }
      }
    }
    var i;
    return t;
  }
  function b(e, t, s) {
    e.style.setProperty(t, s);
  }
  function S({ swiper: e, targetPosition: t, side: s }) {
    const i = h(),
      r = -e.translate;
    let n,
      o = null;
    const a = e.params.speed;
    (e.wrapperEl.style.scrollSnapType = "none"),
      i.cancelAnimationFrame(e.cssModeFrameID);
    const l = t > r ? "next" : "prev",
      d = (e, t) => ("next" === l && e >= t) || ("prev" === l && e <= t),
      c = () => {
        (n = new Date().getTime()), null === o && (o = n);
        const l = Math.max(Math.min((n - o) / a, 1), 0),
          p = 0.5 - Math.cos(l * Math.PI) / 2;
        let u = r + p * (t - r);
        if ((d(u, t) && (u = t), e.wrapperEl.scrollTo({ [s]: u }), d(u, t)))
          return (
            (e.wrapperEl.style.overflow = "hidden"),
            (e.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (e.wrapperEl.style.overflow = ""),
                e.wrapperEl.scrollTo({ [s]: u });
            }),
            void i.cancelAnimationFrame(e.cssModeFrameID)
          );
        e.cssModeFrameID = i.requestAnimationFrame(c);
      };
    c();
  }
  function T(e, t = "") {
    return [...e.children].filter((e) => e.matches(t));
  }
  function y(e, t) {
    return h().getComputedStyle(e, null).getPropertyValue(t);
  }
  function x(e) {
    let t,
      s = e;
    if (s) {
      for (t = 0; null !== (s = s.previousSibling); )
        1 === s.nodeType && (t += 1);
      return t;
    }
  }
  function E(e, t, s) {
    const i = h();
    return s
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-right" : "margin-top")
          ) +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-left" : "margin-bottom")
          )
      : e.offsetWidth;
  }
  let C, L, M;
  function O() {
    return (
      C ||
        (C = (function () {
          const e = h(),
            t = p();
          return {
            smoothScroll:
              t.documentElement &&
              t.documentElement.style &&
              "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
          };
        })()),
      C
    );
  }
  function P(e = {}) {
    return (
      L ||
        (L = (function ({ userAgent: e } = {}) {
          const t = O(),
            s = h(),
            i = s.navigator.platform,
            r = e || s.navigator.userAgent,
            n = { ios: !1, android: !1 },
            o = s.screen.width,
            a = s.screen.height,
            l = r.match(/(Android);?[\s\/]+([\d.]+)?/);
          let d = r.match(/(iPad).*OS\s([\d_]+)/);
          const c = r.match(/(iPod)(.*OS\s([\d_]+))?/),
            p = !d && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            u = "Win32" === i;
          let f = "MacIntel" === i;
          return (
            !d &&
              f &&
              t.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${o}x${a}`) >= 0 &&
              ((d = r.match(/(Version)\/([\d.]+)/)),
              d || (d = [0, 1, "13_0_0"]),
              (f = !1)),
            l && !u && ((n.os = "android"), (n.android = !0)),
            (d || p || c) && ((n.os = "ios"), (n.ios = !0)),
            n
          );
        })(e)),
      L
    );
  }
  function A() {
    return (
      M ||
        (M = (function () {
          const e = h();
          let t = !1;
          function s() {
            const t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              t.indexOf("chrome") < 0 &&
              t.indexOf("android") < 0
            );
          }
          if (s()) {
            const s = String(e.navigator.userAgent);
            if (s.includes("Version/")) {
              const [e, i] = s
                .split("Version/")[1]
                .split(" ")[0]
                .split(".")
                .map((e) => Number(e));
              t = e < 16 || (16 === e && i < 2);
            }
          }
          return {
            isSafari: t || s(),
            needPerspectiveFix: t,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      M
    );
  }
  const k = {
    on(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      const r = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e][r](t);
        }),
        i
      );
    },
    once(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      function r(...s) {
        i.off(e, r), r.__emitterProxy && delete r.__emitterProxy, t.apply(i, s);
      }
      return (r.__emitterProxy = t), i.on(e, r, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const i = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (s.eventsListeners[e] = [])
              : s.eventsListeners[e] &&
                s.eventsListeners[e].forEach((i, r) => {
                  (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                    s.eventsListeners[e].splice(r, 1);
                });
          }),
          s)
        : s;
    },
    emit(...e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsListeners) return t;
      let s, i, r;
      "string" == typeof e[0] || Array.isArray(e[0])
        ? ((s = e[0]), (i = e.slice(1, e.length)), (r = t))
        : ((s = e[0].events), (i = e[0].data), (r = e[0].context || t)),
        i.unshift(r);
      return (
        (Array.isArray(s) ? s : s.split(" ")).forEach((e) => {
          t.eventsAnyListeners &&
            t.eventsAnyListeners.length &&
            t.eventsAnyListeners.forEach((t) => {
              t.apply(r, [e, ...i]);
            }),
            t.eventsListeners &&
              t.eventsListeners[e] &&
              t.eventsListeners[e].forEach((e) => {
                e.apply(r, i);
              });
        }),
        t
      );
    },
  };
  const _ = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      const s = t.closest(
        e.isElement ? "swiper-slide" : `.${e.params.slideClass}`
      );
      if (s) {
        const t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        t && t.remove();
      }
    },
    I = (e, t) => {
      if (!e.slides[t]) return;
      const s = e.slides[t].querySelector('[loading="lazy"]');
      s && s.removeAttribute("loading");
    },
    z = (e) => {
      if (!e || e.destroyed || !e.params) return;
      let t = e.params.lazyPreloadPrevNext;
      const s = e.slides.length;
      if (!s || !t || t < 0) return;
      t = Math.min(t, s);
      const i =
          "auto" === e.params.slidesPerView
            ? e.slidesPerViewDynamic()
            : Math.ceil(e.params.slidesPerView),
        r = e.activeIndex,
        n = r + i - 1;
      if (e.params.rewind)
        for (let i = r - t; i <= n + t; i += 1) {
          const t = ((i % s) + s) % s;
          t !== r && t > n && I(e, t);
        }
      else
        for (let i = Math.max(n - t, 0); i <= Math.min(n + t, s - 1); i += 1)
          i !== r && i > n && I(e, i);
    };
  const G = {
    updateSize: function () {
      const e = this;
      let t, s;
      const i = e.el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : i.clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : i.clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(y(i, "padding-left") || 0, 10) -
            parseInt(y(i, "padding-right") || 0, 10)),
          (s =
            s -
            parseInt(y(i, "padding-top") || 0, 10) -
            parseInt(y(i, "padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function s(e, s) {
        return parseFloat(e.getPropertyValue(t(s)) || 0);
      }
      const i = e.params,
        {
          wrapperEl: r,
          slidesEl: n,
          size: o,
          rtlTranslate: a,
          wrongRTL: l,
        } = e,
        d = e.virtual && i.virtual.enabled,
        c = d ? e.virtual.slides.length : e.slides.length,
        p = T(n, `.${e.params.slideClass}, swiper-slide`),
        u = d ? e.virtual.slides.length : p.length;
      let h = [];
      const f = [],
        m = [];
      let g = i.slidesOffsetBefore;
      "function" == typeof g && (g = i.slidesOffsetBefore.call(e));
      let v = i.slidesOffsetAfter;
      "function" == typeof v && (v = i.slidesOffsetAfter.call(e));
      const w = e.snapGrid.length,
        S = e.slidesGrid.length;
      let x = i.spaceBetween,
        C = -g,
        L = 0,
        M = 0;
      if (void 0 === o) return;
      "string" == typeof x && x.indexOf("%") >= 0
        ? (x = (parseFloat(x.replace("%", "")) / 100) * o)
        : "string" == typeof x && (x = parseFloat(x)),
        (e.virtualSize = -x),
        p.forEach((e) => {
          a ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
            (e.style.marginBottom = ""),
            (e.style.marginTop = "");
        }),
        i.centeredSlides &&
          i.cssMode &&
          (b(r, "--swiper-centered-offset-before", ""),
          b(r, "--swiper-centered-offset-after", ""));
      const O = i.grid && i.grid.rows > 1 && e.grid;
      let P;
      O && e.grid.initSlides(u);
      const A =
        "auto" === i.slidesPerView &&
        i.breakpoints &&
        Object.keys(i.breakpoints).filter(
          (e) => void 0 !== i.breakpoints[e].slidesPerView
        ).length > 0;
      for (let r = 0; r < u; r += 1) {
        let n;
        if (
          ((P = 0),
          p[r] && (n = p[r]),
          O && e.grid.updateSlide(r, n, u, t),
          !p[r] || "none" !== y(n, "display"))
        ) {
          if ("auto" === i.slidesPerView) {
            A && (p[r].style[t("width")] = "");
            const o = getComputedStyle(n),
              a = n.style.transform,
              l = n.style.webkitTransform;
            if (
              (a && (n.style.transform = "none"),
              l && (n.style.webkitTransform = "none"),
              i.roundLengths)
            )
              P = e.isHorizontal() ? E(n, "width", !0) : E(n, "height", !0);
            else {
              const e = s(o, "width"),
                t = s(o, "padding-left"),
                i = s(o, "padding-right"),
                r = s(o, "margin-left"),
                a = s(o, "margin-right"),
                l = o.getPropertyValue("box-sizing");
              if (l && "border-box" === l) P = e + r + a;
              else {
                const { clientWidth: s, offsetWidth: o } = n;
                P = e + t + i + r + a + (o - s);
              }
            }
            a && (n.style.transform = a),
              l && (n.style.webkitTransform = l),
              i.roundLengths && (P = Math.floor(P));
          } else
            (P = (o - (i.slidesPerView - 1) * x) / i.slidesPerView),
              i.roundLengths && (P = Math.floor(P)),
              p[r] && (p[r].style[t("width")] = `${P}px`);
          p[r] && (p[r].swiperSlideSize = P),
            m.push(P),
            i.centeredSlides
              ? ((C = C + P / 2 + L / 2 + x),
                0 === L && 0 !== r && (C = C - o / 2 - x),
                0 === r && (C = C - o / 2 - x),
                Math.abs(C) < 0.001 && (C = 0),
                i.roundLengths && (C = Math.floor(C)),
                M % i.slidesPerGroup == 0 && h.push(C),
                f.push(C))
              : (i.roundLengths && (C = Math.floor(C)),
                (M - Math.min(e.params.slidesPerGroupSkip, M)) %
                  e.params.slidesPerGroup ==
                  0 && h.push(C),
                f.push(C),
                (C = C + P + x)),
            (e.virtualSize += P + x),
            (L = P),
            (M += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, o) + v),
        a &&
          l &&
          ("slide" === i.effect || "coverflow" === i.effect) &&
          (r.style.width = `${e.virtualSize + x}px`),
        i.setWrapperSize && (r.style[t("width")] = `${e.virtualSize + x}px`),
        O && e.grid.updateWrapperSize(P, h, t),
        !i.centeredSlides)
      ) {
        const t = [];
        for (let s = 0; s < h.length; s += 1) {
          let r = h[s];
          i.roundLengths && (r = Math.floor(r)),
            h[s] <= e.virtualSize - o && t.push(r);
        }
        (h = t),
          Math.floor(e.virtualSize - o) - Math.floor(h[h.length - 1]) > 1 &&
            h.push(e.virtualSize - o);
      }
      if (d && i.loop) {
        const t = m[0] + x;
        if (i.slidesPerGroup > 1) {
          const s = Math.ceil(
              (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                i.slidesPerGroup
            ),
            r = t * i.slidesPerGroup;
          for (let e = 0; e < s; e += 1) h.push(h[h.length - 1] + r);
        }
        for (
          let s = 0;
          s < e.virtual.slidesBefore + e.virtual.slidesAfter;
          s += 1
        )
          1 === i.slidesPerGroup && h.push(h[h.length - 1] + t),
            f.push(f[f.length - 1] + t),
            (e.virtualSize += t);
      }
      if ((0 === h.length && (h = [0]), 0 !== x)) {
        const s = e.isHorizontal() && a ? "marginLeft" : t("marginRight");
        p.filter(
          (e, t) => !(i.cssMode && !i.loop) || t !== p.length - 1
        ).forEach((e) => {
          e.style[s] = `${x}px`;
        });
      }
      if (i.centeredSlides && i.centeredSlidesBounds) {
        let e = 0;
        m.forEach((t) => {
          e += t + (x || 0);
        }),
          (e -= x);
        const t = e - o;
        h = h.map((e) => (e < 0 ? -g : e > t ? t + v : e));
      }
      if (i.centerInsufficientSlides) {
        let e = 0;
        if (
          (m.forEach((t) => {
            e += t + (x || 0);
          }),
          (e -= x),
          e < o)
        ) {
          const t = (o - e) / 2;
          h.forEach((e, s) => {
            h[s] = e - t;
          }),
            f.forEach((e, s) => {
              f[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: p,
          snapGrid: h,
          slidesGrid: f,
          slidesSizesGrid: m,
        }),
        i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
      ) {
        b(r, "--swiper-centered-offset-before", -h[0] + "px"),
          b(
            r,
            "--swiper-centered-offset-after",
            e.size / 2 - m[m.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (u !== c && e.emit("slidesLengthChange"),
        h.length !== w &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        f.length !== S && e.emit("slidesGridLengthChange"),
        i.watchSlidesProgress && e.updateSlidesOffset(),
        !(d || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
      ) {
        const t = `${i.containerModifierClass}backface-hidden`,
          s = e.el.classList.contains(t);
        u <= i.maxBackfaceHiddenSlides
          ? s || e.el.classList.add(t)
          : s && e.el.classList.remove(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        i = t.virtual && t.params.virtual.enabled;
      let r,
        n = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const o = (e) => (i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || []).forEach((e) => {
            s.push(e);
          });
        else
          for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
            const e = t.activeIndex + r;
            if (e > t.slides.length && !i) break;
            s.push(o(e));
          }
      else s.push(o(t.activeIndex));
      for (r = 0; r < s.length; r += 1)
        if (void 0 !== s[r]) {
          const e = s[r].offsetHeight;
          n = e > n ? e : n;
        }
      (n || 0 === n) && (t.wrapperEl.style.height = `${n}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides,
        s = e.isElement
          ? e.isHorizontal()
            ? e.wrapperEl.offsetLeft
            : e.wrapperEl.offsetTop
          : 0;
      for (let i = 0; i < t.length; i += 1)
        t[i].swiperSlideOffset =
          (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
          s -
          e.cssOverflowAdjustment();
    },
    updateSlidesProgress: function (e = (this && this.translate) || 0) {
      const t = this,
        s = t.params,
        { slides: i, rtlTranslate: r, snapGrid: n } = t;
      if (0 === i.length) return;
      void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
      let o = -e;
      r && (o = e),
        i.forEach((e) => {
          e.classList.remove(s.slideVisibleClass);
        }),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      let a = s.spaceBetween;
      "string" == typeof a && a.indexOf("%") >= 0
        ? (a = (parseFloat(a.replace("%", "")) / 100) * t.size)
        : "string" == typeof a && (a = parseFloat(a));
      for (let e = 0; e < i.length; e += 1) {
        const l = i[e];
        let d = l.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
        const c =
            (o + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (l.swiperSlideSize + a),
          p =
            (o - n[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (l.swiperSlideSize + a),
          u = -(o - d),
          h = u + t.slidesSizesGrid[e];
        ((u >= 0 && u < t.size - 1) ||
          (h > 1 && h <= t.size) ||
          (u <= 0 && h >= t.size)) &&
          (t.visibleSlides.push(l),
          t.visibleSlidesIndexes.push(e),
          i[e].classList.add(s.slideVisibleClass)),
          (l.progress = r ? -c : c),
          (l.originalProgress = r ? -p : p);
      }
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        i = t.maxTranslate() - t.minTranslate();
      let { progress: r, isBeginning: n, isEnd: o, progressLoop: a } = t;
      const l = n,
        d = o;
      if (0 === i) (r = 0), (n = !0), (o = !0);
      else {
        r = (e - t.minTranslate()) / i;
        const s = Math.abs(e - t.minTranslate()) < 1,
          a = Math.abs(e - t.maxTranslate()) < 1;
        (n = s || r <= 0), (o = a || r >= 1), s && (r = 0), a && (r = 1);
      }
      if (s.loop) {
        const s = t.getSlideIndexByData(0),
          i = t.getSlideIndexByData(t.slides.length - 1),
          r = t.slidesGrid[s],
          n = t.slidesGrid[i],
          o = t.slidesGrid[t.slidesGrid.length - 1],
          l = Math.abs(e);
        (a = l >= r ? (l - r) / o : (l + o - n) / o), a > 1 && (a -= 1);
      }
      Object.assign(t, {
        progress: r,
        progressLoop: a,
        isBeginning: n,
        isEnd: o,
      }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        n && !l && t.emit("reachBeginning toEdge"),
        o && !d && t.emit("reachEnd toEdge"),
        ((l && !n) || (d && !o)) && t.emit("fromEdge"),
        t.emit("progress", r);
    },
    updateSlidesClasses: function () {
      const e = this,
        { slides: t, params: s, slidesEl: i, activeIndex: r } = e,
        n = e.virtual && s.virtual.enabled,
        o = (e) => T(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
      let a;
      if (
        (t.forEach((e) => {
          e.classList.remove(
            s.slideActiveClass,
            s.slideNextClass,
            s.slidePrevClass
          );
        }),
        n)
      )
        if (s.loop) {
          let t = r - e.virtual.slidesBefore;
          t < 0 && (t = e.virtual.slides.length + t),
            t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
            (a = o(`[data-swiper-slide-index="${t}"]`));
        } else a = o(`[data-swiper-slide-index="${r}"]`);
      else a = t[r];
      if (a) {
        a.classList.add(s.slideActiveClass);
        let e = (function (e, t) {
          const s = [];
          for (; e.nextElementSibling; ) {
            const i = e.nextElementSibling;
            t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
          }
          return s;
        })(a, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && !e && (e = t[0]), e && e.classList.add(s.slideNextClass);
        let i = (function (e, t) {
          const s = [];
          for (; e.previousElementSibling; ) {
            const i = e.previousElementSibling;
            t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
          }
          return s;
        })(a, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && 0 === !i && (i = t[t.length - 1]),
          i && i.classList.add(s.slidePrevClass);
      }
      e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          snapGrid: i,
          params: r,
          activeIndex: n,
          realIndex: o,
          snapIndex: a,
        } = t;
      let l,
        d = e;
      const c = (e) => {
        let s = e - t.virtual.slidesBefore;
        return (
          s < 0 && (s = t.virtual.slides.length + s),
          s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
          s
        );
      };
      if (
        (void 0 === d &&
          (d = (function (e) {
            const { slidesGrid: t, params: s } = e,
              i = e.rtlTranslate ? e.translate : -e.translate;
            let r;
            for (let e = 0; e < t.length; e += 1)
              void 0 !== t[e + 1]
                ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2
                  ? (r = e)
                  : i >= t[e] && i < t[e + 1] && (r = e + 1)
                : i >= t[e] && (r = e);
            return (
              s.normalizeSlideIndex && (r < 0 || void 0 === r) && (r = 0), r
            );
          })(t)),
        i.indexOf(s) >= 0)
      )
        l = i.indexOf(s);
      else {
        const e = Math.min(r.slidesPerGroupSkip, d);
        l = e + Math.floor((d - e) / r.slidesPerGroup);
      }
      if ((l >= i.length && (l = i.length - 1), d === n))
        return (
          l !== a && ((t.snapIndex = l), t.emit("snapIndexChange")),
          void (
            t.params.loop &&
            t.virtual &&
            t.params.virtual.enabled &&
            (t.realIndex = c(d))
          )
        );
      let p;
      (p =
        t.virtual && r.virtual.enabled && r.loop
          ? c(d)
          : t.slides[d]
          ? parseInt(
              t.slides[d].getAttribute("data-swiper-slide-index") || d,
              10
            )
          : d),
        Object.assign(t, {
          previousSnapIndex: a,
          snapIndex: l,
          previousRealIndex: o,
          realIndex: p,
          previousIndex: n,
          activeIndex: d,
        }),
        t.initialized && z(t),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        o !== p && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        s = t.params,
        i = e.closest(`.${s.slideClass}, swiper-slide`);
      let r,
        n = !1;
      if (i)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === i) {
            (n = !0), (r = e);
            break;
          }
      if (!i || !n)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = i),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              i.getAttribute("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = r),
        s.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const $ = {
    getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
      const { params: t, rtlTranslate: s, translate: i, wrapperEl: r } = this;
      if (t.virtualTranslate) return s ? -i : i;
      if (t.cssMode) return i;
      let n = g(r, e);
      return (n += this.cssOverflowAdjustment()), s && (n = -n), n || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        { rtlTranslate: i, params: r, wrapperEl: n, progress: o } = s;
      let a,
        l = 0,
        d = 0;
      s.isHorizontal() ? (l = i ? -e : e) : (d = e),
        r.roundLengths && ((l = Math.floor(l)), (d = Math.floor(d))),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? l : d),
        r.cssMode
          ? (n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -l
              : -d)
          : r.virtualTranslate ||
            (s.isHorizontal()
              ? (l -= s.cssOverflowAdjustment())
              : (d -= s.cssOverflowAdjustment()),
            (n.style.transform = `translate3d(${l}px, ${d}px, 0px)`));
      const c = s.maxTranslate() - s.minTranslate();
      (a = 0 === c ? 0 : (e - s.minTranslate()) / c),
        a !== o && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e = 0, t = this.params.speed, s = !0, i = !0, r) {
      const n = this,
        { params: o, wrapperEl: a } = n;
      if (n.animating && o.preventInteractionOnTransition) return !1;
      const l = n.minTranslate(),
        d = n.maxTranslate();
      let c;
      if (
        ((c = i && e > l ? l : i && e < d ? d : e),
        n.updateProgress(c),
        o.cssMode)
      ) {
        const e = n.isHorizontal();
        if (0 === t) a[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!n.support.smoothScroll)
            return (
              S({ swiper: n, targetPosition: -c, side: e ? "left" : "top" }), !0
            );
          a.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (n.setTransition(0),
            n.setTranslate(c),
            s &&
              (n.emit("beforeTransitionStart", t, r), n.emit("transitionEnd")))
          : (n.setTransition(t),
            n.setTranslate(c),
            s &&
              (n.emit("beforeTransitionStart", t, r),
              n.emit("transitionStart")),
            n.animating ||
              ((n.animating = !0),
              n.onTranslateToWrapperTransitionEnd ||
                (n.onTranslateToWrapperTransitionEnd = function (e) {
                  n &&
                    !n.destroyed &&
                    e.target === this &&
                    (n.wrapperEl.removeEventListener(
                      "transitionend",
                      n.onTranslateToWrapperTransitionEnd
                    ),
                    (n.onTranslateToWrapperTransitionEnd = null),
                    delete n.onTranslateToWrapperTransitionEnd,
                    s && n.emit("transitionEnd"));
                }),
              n.wrapperEl.addEventListener(
                "transitionend",
                n.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function D({ swiper: e, runCallbacks: t, direction: s, step: i }) {
    const { activeIndex: r, previousIndex: n } = e;
    let o = s;
    if (
      (o || (o = r > n ? "next" : r < n ? "prev" : "reset"),
      e.emit(`transition${i}`),
      t && r !== n)
    ) {
      if ("reset" === o) return void e.emit(`slideResetTransition${i}`);
      e.emit(`slideChangeTransition${i}`),
        "next" === o
          ? e.emit(`slideNextTransition${i}`)
          : e.emit(`slidePrevTransition${i}`);
    }
  }
  const B = {
    slideTo: function (e = 0, t = this.params.speed, s = !0, i, r) {
      "string" == typeof e && (e = parseInt(e, 10));
      const n = this;
      let o = e;
      o < 0 && (o = 0);
      const {
        params: a,
        snapGrid: l,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: h,
        enabled: f,
      } = n;
      if ((n.animating && a.preventInteractionOnTransition) || (!f && !i && !r))
        return !1;
      const m = Math.min(n.params.slidesPerGroupSkip, o);
      let g = m + Math.floor((o - m) / n.params.slidesPerGroup);
      g >= l.length && (g = l.length - 1);
      const v = -l[g];
      if (a.normalizeSlideIndex)
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * v),
            s = Math.floor(100 * d[e]),
            i = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= s && t < i - (i - s) / 2
              ? (o = e)
              : t >= s && t < i && (o = e + 1)
            : t >= s && (o = e);
        }
      if (n.initialized && o !== p) {
        if (!n.allowSlideNext && v < n.translate && v < n.minTranslate())
          return !1;
        if (
          !n.allowSlidePrev &&
          v > n.translate &&
          v > n.maxTranslate() &&
          (p || 0) !== o
        )
          return !1;
      }
      let w;
      if (
        (o !== (c || 0) && s && n.emit("beforeSlideChangeStart"),
        n.updateProgress(v),
        (w = o > p ? "next" : o < p ? "prev" : "reset"),
        (u && -v === n.translate) || (!u && v === n.translate))
      )
        return (
          n.updateActiveIndex(o),
          a.autoHeight && n.updateAutoHeight(),
          n.updateSlidesClasses(),
          "slide" !== a.effect && n.setTranslate(v),
          "reset" !== w && (n.transitionStart(s, w), n.transitionEnd(s, w)),
          !1
        );
      if (a.cssMode) {
        const e = n.isHorizontal(),
          s = u ? v : -v;
        if (0 === t) {
          const t = n.virtual && n.params.virtual.enabled;
          t &&
            ((n.wrapperEl.style.scrollSnapType = "none"),
            (n._immediateVirtual = !0)),
            t && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0
              ? ((n._cssModeVirtualInitialSet = !0),
                requestAnimationFrame(() => {
                  h[e ? "scrollLeft" : "scrollTop"] = s;
                }))
              : (h[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (n.wrapperEl.style.scrollSnapType = ""),
                  (n._immediateVirtual = !1);
              });
        } else {
          if (!n.support.smoothScroll)
            return (
              S({ swiper: n, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        n.setTransition(t),
        n.setTranslate(v),
        n.updateActiveIndex(o),
        n.updateSlidesClasses(),
        n.emit("beforeTransitionStart", t, i),
        n.transitionStart(s, w),
        0 === t
          ? n.transitionEnd(s, w)
          : n.animating ||
            ((n.animating = !0),
            n.onSlideToWrapperTransitionEnd ||
              (n.onSlideToWrapperTransitionEnd = function (e) {
                n &&
                  !n.destroyed &&
                  e.target === this &&
                  (n.wrapperEl.removeEventListener(
                    "transitionend",
                    n.onSlideToWrapperTransitionEnd
                  ),
                  (n.onSlideToWrapperTransitionEnd = null),
                  delete n.onSlideToWrapperTransitionEnd,
                  n.transitionEnd(s, w));
              }),
            n.wrapperEl.addEventListener(
              "transitionend",
              n.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e = 0, t = this.params.speed, s = !0, i) {
      if ("string" == typeof e) {
        e = parseInt(e, 10);
      }
      const r = this;
      let n = e;
      return (
        r.params.loop &&
          (r.virtual && r.params.virtual.enabled
            ? (n += r.virtual.slidesBefore)
            : (n = r.getSlideIndexByData(n))),
        r.slideTo(n, t, s, i)
      );
    },
    slideNext: function (e = this.params.speed, t = !0, s) {
      const i = this,
        { enabled: r, params: n, animating: o } = i;
      if (!r) return i;
      let a = n.slidesPerGroup;
      "auto" === n.slidesPerView &&
        1 === n.slidesPerGroup &&
        n.slidesPerGroupAuto &&
        (a = Math.max(i.slidesPerViewDynamic("current", !0), 1));
      const l = i.activeIndex < n.slidesPerGroupSkip ? 1 : a,
        d = i.virtual && n.virtual.enabled;
      if (n.loop) {
        if (o && !d && n.loopPreventsSliding) return !1;
        i.loopFix({ direction: "next" }),
          (i._clientLeft = i.wrapperEl.clientLeft);
      }
      return n.rewind && i.isEnd
        ? i.slideTo(0, e, t, s)
        : i.slideTo(i.activeIndex + l, e, t, s);
    },
    slidePrev: function (e = this.params.speed, t = !0, s) {
      const i = this,
        {
          params: r,
          snapGrid: n,
          slidesGrid: o,
          rtlTranslate: a,
          enabled: l,
          animating: d,
        } = i;
      if (!l) return i;
      const c = i.virtual && r.virtual.enabled;
      if (r.loop) {
        if (d && !c && r.loopPreventsSliding) return !1;
        i.loopFix({ direction: "prev" }),
          (i._clientLeft = i.wrapperEl.clientLeft);
      }
      function p(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const u = p(a ? i.translate : -i.translate),
        h = n.map((e) => p(e));
      let f = n[h.indexOf(u) - 1];
      if (void 0 === f && r.cssMode) {
        let e;
        n.forEach((t, s) => {
          u >= t && (e = s);
        }),
          void 0 !== e && (f = n[e > 0 ? e - 1 : e]);
      }
      let m = 0;
      if (
        (void 0 !== f &&
          ((m = o.indexOf(f)),
          m < 0 && (m = i.activeIndex - 1),
          "auto" === r.slidesPerView &&
            1 === r.slidesPerGroup &&
            r.slidesPerGroupAuto &&
            ((m = m - i.slidesPerViewDynamic("previous", !0) + 1),
            (m = Math.max(m, 0)))),
        r.rewind && i.isBeginning)
      ) {
        const r =
          i.params.virtual && i.params.virtual.enabled && i.virtual
            ? i.virtual.slides.length - 1
            : i.slides.length - 1;
        return i.slideTo(r, e, t, s);
      }
      return i.slideTo(m, e, t, s);
    },
    slideReset: function (e = this.params.speed, t = !0, s) {
      return this.slideTo(this.activeIndex, e, t, s);
    },
    slideToClosest: function (e = this.params.speed, t = !0, s, i = 0.5) {
      const r = this;
      let n = r.activeIndex;
      const o = Math.min(r.params.slidesPerGroupSkip, n),
        a = o + Math.floor((n - o) / r.params.slidesPerGroup),
        l = r.rtlTranslate ? r.translate : -r.translate;
      if (l >= r.snapGrid[a]) {
        const e = r.snapGrid[a];
        l - e > (r.snapGrid[a + 1] - e) * i && (n += r.params.slidesPerGroup);
      } else {
        const e = r.snapGrid[a - 1];
        l - e <= (r.snapGrid[a] - e) * i && (n -= r.params.slidesPerGroup);
      }
      return (
        (n = Math.max(n, 0)),
        (n = Math.min(n, r.slidesGrid.length - 1)),
        r.slideTo(n, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, slidesEl: s } = e,
        i =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let r,
        n = e.clickedIndex;
      const o = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
      if (t.loop) {
        if (e.animating) return;
        (r = parseInt(
          e.clickedSlide.getAttribute("data-swiper-slide-index"),
          10
        )),
          t.centeredSlides
            ? n < e.loopedSlides - i / 2 ||
              n > e.slides.length - e.loopedSlides + i / 2
              ? (e.loopFix(),
                (n = e.getSlideIndex(
                  T(s, `${o}[data-swiper-slide-index="${r}"]`)[0]
                )),
                f(() => {
                  e.slideTo(n);
                }))
              : e.slideTo(n)
            : n > e.slides.length - i
            ? (e.loopFix(),
              (n = e.getSlideIndex(
                T(s, `${o}[data-swiper-slide-index="${r}"]`)[0]
              )),
              f(() => {
                e.slideTo(n);
              }))
            : e.slideTo(n);
      } else e.slideTo(n);
    },
  };
  const W = {
    loopCreate: function (e) {
      const t = this,
        { params: s, slidesEl: i } = t;
      if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
      T(i, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
        e.setAttribute("data-swiper-slide-index", t);
      }),
        t.loopFix({
          slideRealIndex: e,
          direction: s.centeredSlides ? void 0 : "next",
        });
    },
    loopFix: function ({
      slideRealIndex: e,
      slideTo: t = !0,
      direction: s,
      setTranslate: i,
      activeSlideIndex: r,
      byController: n,
      byMousewheel: o,
    } = {}) {
      const a = this;
      if (!a.params.loop) return;
      a.emit("beforeLoopFix");
      const {
        slides: l,
        allowSlidePrev: d,
        allowSlideNext: c,
        slidesEl: p,
        params: u,
      } = a;
      if (
        ((a.allowSlidePrev = !0),
        (a.allowSlideNext = !0),
        a.virtual && u.virtual.enabled)
      )
        return (
          t &&
            (u.centeredSlides || 0 !== a.snapIndex
              ? u.centeredSlides && a.snapIndex < u.slidesPerView
                ? a.slideTo(a.virtual.slides.length + a.snapIndex, 0, !1, !0)
                : a.snapIndex === a.snapGrid.length - 1 &&
                  a.slideTo(a.virtual.slidesBefore, 0, !1, !0)
              : a.slideTo(a.virtual.slides.length, 0, !1, !0)),
          (a.allowSlidePrev = d),
          (a.allowSlideNext = c),
          void a.emit("loopFix")
        );
      const h =
        "auto" === u.slidesPerView
          ? a.slidesPerViewDynamic()
          : Math.ceil(parseFloat(u.slidesPerView, 10));
      let f = u.loopedSlides || h;
      f % u.slidesPerGroup != 0 &&
        (f += u.slidesPerGroup - (f % u.slidesPerGroup)),
        (a.loopedSlides = f);
      const m = [],
        g = [];
      let v = a.activeIndex;
      void 0 === r
        ? (r = a.getSlideIndex(
            a.slides.filter((e) => e.classList.contains(u.slideActiveClass))[0]
          ))
        : (v = r);
      const w = "next" === s || !s,
        b = "prev" === s || !s;
      let S = 0,
        T = 0;
      if (r < f) {
        S = Math.max(f - r, u.slidesPerGroup);
        for (let e = 0; e < f - r; e += 1) {
          const t = e - Math.floor(e / l.length) * l.length;
          m.push(l.length - t - 1);
        }
      } else if (r > a.slides.length - 2 * f) {
        T = Math.max(r - (a.slides.length - 2 * f), u.slidesPerGroup);
        for (let e = 0; e < T; e += 1) {
          const t = e - Math.floor(e / l.length) * l.length;
          g.push(t);
        }
      }
      if (
        (b &&
          m.forEach((e) => {
            (a.slides[e].swiperLoopMoveDOM = !0),
              p.prepend(a.slides[e]),
              (a.slides[e].swiperLoopMoveDOM = !1);
          }),
        w &&
          g.forEach((e) => {
            (a.slides[e].swiperLoopMoveDOM = !0),
              p.append(a.slides[e]),
              (a.slides[e].swiperLoopMoveDOM = !1);
          }),
        a.recalcSlides(),
        "auto" === u.slidesPerView && a.updateSlides(),
        u.watchSlidesProgress && a.updateSlidesOffset(),
        t)
      )
        if (m.length > 0 && b)
          if (void 0 === e) {
            const e = a.slidesGrid[v],
              t = a.slidesGrid[v + S] - e;
            o
              ? a.setTranslate(a.translate - t)
              : (a.slideTo(v + S, 0, !1, !0),
                i && (a.touches[a.isHorizontal() ? "startX" : "startY"] += t));
          } else i && a.slideToLoop(e, 0, !1, !0);
        else if (g.length > 0 && w)
          if (void 0 === e) {
            const e = a.slidesGrid[v],
              t = a.slidesGrid[v - T] - e;
            o
              ? a.setTranslate(a.translate - t)
              : (a.slideTo(v - T, 0, !1, !0),
                i && (a.touches[a.isHorizontal() ? "startX" : "startY"] += t));
          } else a.slideToLoop(e, 0, !1, !0);
      if (
        ((a.allowSlidePrev = d),
        (a.allowSlideNext = c),
        a.controller && a.controller.control && !n)
      ) {
        const t = {
          slideRealIndex: e,
          slideTo: !1,
          direction: s,
          setTranslate: i,
          activeSlideIndex: r,
          byController: !0,
        };
        Array.isArray(a.controller.control)
          ? a.controller.control.forEach((e) => {
              !e.destroyed && e.params.loop && e.loopFix(t);
            })
          : a.controller.control instanceof a.constructor &&
            a.controller.control.params.loop &&
            a.controller.control.loopFix(t);
      }
      a.emit("loopFix");
    },
    loopDestroy: function () {
      const e = this,
        { params: t, slidesEl: s } = e;
      if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
      e.recalcSlides();
      const i = [];
      e.slides.forEach((e) => {
        const t =
          void 0 === e.swiperSlideIndex
            ? 1 * e.getAttribute("data-swiper-slide-index")
            : e.swiperSlideIndex;
        i[t] = e;
      }),
        e.slides.forEach((e) => {
          e.removeAttribute("data-swiper-slide-index");
        }),
        i.forEach((e) => {
          s.append(e);
        }),
        e.recalcSlides(),
        e.slideTo(e.realIndex, 0);
    },
  };
  function H(e) {
    const t = this,
      s = p(),
      i = h(),
      r = t.touchEventsData;
    r.evCache.push(e);
    const { params: n, touches: o, enabled: a } = t;
    if (!a) return;
    if (!n.simulateTouch && "mouse" === e.pointerType) return;
    if (t.animating && n.preventInteractionOnTransition) return;
    !t.animating && n.cssMode && n.loop && t.loopFix();
    let l = e;
    l.originalEvent && (l = l.originalEvent);
    let d = l.target;
    if ("wrapper" === n.touchEventsTarget && !t.wrapperEl.contains(d)) return;
    if ("which" in l && 3 === l.which) return;
    if ("button" in l && l.button > 0) return;
    if (r.isTouched && r.isMoved) return;
    const c = !!n.noSwipingClass && "" !== n.noSwipingClass,
      u = e.composedPath ? e.composedPath() : e.path;
    c && l.target && l.target.shadowRoot && u && (d = u[0]);
    const f = n.noSwipingSelector
        ? n.noSwipingSelector
        : `.${n.noSwipingClass}`,
      g = !(!l.target || !l.target.shadowRoot);
    if (
      n.noSwiping &&
      (g
        ? (function (e, t = this) {
            return (function t(s) {
              if (!s || s === p() || s === h()) return null;
              s.assignedSlot && (s = s.assignedSlot);
              const i = s.closest(e);
              return i || s.getRootNode ? i || t(s.getRootNode().host) : null;
            })(t);
          })(f, d)
        : d.closest(f))
    )
      return void (t.allowClick = !0);
    if (n.swipeHandler && !d.closest(n.swipeHandler)) return;
    (o.currentX = l.pageX), (o.currentY = l.pageY);
    const v = o.currentX,
      w = o.currentY,
      b = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection,
      S = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
    if (b && (v <= S || v >= i.innerWidth - S)) {
      if ("prevent" !== b) return;
      e.preventDefault();
    }
    Object.assign(r, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
      (o.startX = v),
      (o.startY = w),
      (r.touchStartTime = m()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      n.threshold > 0 && (r.allowThresholdMove = !1);
    let T = !0;
    d.matches(r.focusableElements) &&
      ((T = !1), "SELECT" === d.nodeName && (r.isTouched = !1)),
      s.activeElement &&
        s.activeElement.matches(r.focusableElements) &&
        s.activeElement !== d &&
        s.activeElement.blur();
    const y = T && t.allowTouchMove && n.touchStartPreventDefault;
    (!n.touchStartForcePreventDefault && !y) ||
      d.isContentEditable ||
      l.preventDefault(),
      t.params.freeMode &&
        t.params.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !n.cssMode &&
        t.freeMode.onTouchStart(),
      t.emit("touchStart", l);
  }
  function V(e) {
    const t = p(),
      s = this,
      i = s.touchEventsData,
      { params: r, touches: n, rtlTranslate: o, enabled: a } = s;
    if (!a) return;
    if (!r.simulateTouch && "mouse" === e.pointerType) return;
    let l = e;
    if ((l.originalEvent && (l = l.originalEvent), !i.isTouched))
      return void (
        i.startMoving &&
        i.isScrolling &&
        s.emit("touchMoveOpposite", l)
      );
    const d = i.evCache.findIndex((e) => e.pointerId === l.pointerId);
    d >= 0 && (i.evCache[d] = l);
    const c = i.evCache.length > 1 ? i.evCache[0] : l,
      u = c.pageX,
      h = c.pageY;
    if (l.preventedByNestedSwiper) return (n.startX = u), void (n.startY = h);
    if (!s.allowTouchMove)
      return (
        l.target.matches(i.focusableElements) || (s.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(n, {
            startX: u,
            startY: h,
            prevX: s.touches.currentX,
            prevY: s.touches.currentY,
            currentX: u,
            currentY: h,
          }),
          (i.touchStartTime = m()))
        )
      );
    if (r.touchReleaseOnEdges && !r.loop)
      if (s.isVertical()) {
        if (
          (h < n.startY && s.translate <= s.maxTranslate()) ||
          (h > n.startY && s.translate >= s.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (u < n.startX && s.translate <= s.maxTranslate()) ||
        (u > n.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      t.activeElement &&
      l.target === t.activeElement &&
      l.target.matches(i.focusableElements)
    )
      return (i.isMoved = !0), void (s.allowClick = !1);
    if (
      (i.allowTouchCallbacks && s.emit("touchMove", l),
      l.targetTouches && l.targetTouches.length > 1)
    )
      return;
    (n.currentX = u), (n.currentY = h);
    const f = n.currentX - n.startX,
      g = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(f ** 2 + g ** 2) < s.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (s.isHorizontal() && n.currentY === n.startY) ||
      (s.isVertical() && n.currentX === n.startX)
        ? (i.isScrolling = !1)
        : f * f + g * g >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(g), Math.abs(f))) / Math.PI),
          (i.isScrolling = s.isHorizontal()
            ? e > r.touchAngle
            : 90 - e > r.touchAngle));
    }
    if (
      (i.isScrolling && s.emit("touchMoveOpposite", l),
      void 0 === i.startMoving &&
        ((n.currentX === n.startX && n.currentY === n.startY) ||
          (i.startMoving = !0)),
      i.isScrolling ||
        (s.zoom &&
          s.params.zoom &&
          s.params.zoom.enabled &&
          i.evCache.length > 1))
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (s.allowClick = !1),
      !r.cssMode && l.cancelable && l.preventDefault(),
      r.touchMoveStopPropagation && !r.nested && l.stopPropagation();
    let v = s.isHorizontal() ? f : g,
      w = s.isHorizontal()
        ? n.currentX - n.previousX
        : n.currentY - n.previousY;
    r.oneWayMovement &&
      ((v = Math.abs(v) * (o ? 1 : -1)), (w = Math.abs(w) * (o ? 1 : -1))),
      (n.diff = v),
      (v *= r.touchRatio),
      o && ((v = -v), (w = -w));
    const b = s.touchesDirection;
    (s.swipeDirection = v > 0 ? "prev" : "next"),
      (s.touchesDirection = w > 0 ? "prev" : "next");
    const S = s.params.loop && !r.cssMode;
    if (!i.isMoved) {
      if (
        (S && s.loopFix({ direction: s.swipeDirection }),
        (i.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating)
      ) {
        const e = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
        });
        s.wrapperEl.dispatchEvent(e);
      }
      (i.allowMomentumBounce = !1),
        !r.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", l);
    }
    let T;
    i.isMoved &&
      b !== s.touchesDirection &&
      S &&
      Math.abs(v) >= 1 &&
      (s.loopFix({ direction: s.swipeDirection, setTranslate: !0 }), (T = !0)),
      s.emit("sliderMove", l),
      (i.isMoved = !0),
      (i.currentTranslate = v + i.startTranslate);
    let y = !0,
      x = r.resistanceRatio;
    if (
      (r.touchReleaseOnEdges && (x = 0),
      v > 0
        ? (S &&
            !T &&
            i.currentTranslate >
              (r.centeredSlides
                ? s.minTranslate() - s.size / 2
                : s.minTranslate()) &&
            s.loopFix({
              direction: "prev",
              setTranslate: !0,
              activeSlideIndex: 0,
            }),
          i.currentTranslate > s.minTranslate() &&
            ((y = !1),
            r.resistance &&
              (i.currentTranslate =
                s.minTranslate() -
                1 +
                (-s.minTranslate() + i.startTranslate + v) ** x)))
        : v < 0 &&
          (S &&
            !T &&
            i.currentTranslate <
              (r.centeredSlides
                ? s.maxTranslate() + s.size / 2
                : s.maxTranslate()) &&
            s.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex:
                s.slides.length -
                ("auto" === r.slidesPerView
                  ? s.slidesPerViewDynamic()
                  : Math.ceil(parseFloat(r.slidesPerView, 10))),
            }),
          i.currentTranslate < s.maxTranslate() &&
            ((y = !1),
            r.resistance &&
              (i.currentTranslate =
                s.maxTranslate() +
                1 -
                (s.maxTranslate() - i.startTranslate - v) ** x))),
      y && (l.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      r.threshold > 0)
    ) {
      if (!(Math.abs(v) > r.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (i.currentTranslate = i.startTranslate),
          void (n.diff = s.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY)
        );
    }
    r.followFinger &&
      !r.cssMode &&
      (((r.freeMode && r.freeMode.enabled && s.freeMode) ||
        r.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      s.params.freeMode &&
        r.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(i.currentTranslate),
      s.setTranslate(i.currentTranslate));
  }
  function F(e) {
    const t = this,
      s = t.touchEventsData,
      i = s.evCache.findIndex((t) => t.pointerId === e.pointerId);
    if (
      (i >= 0 && s.evCache.splice(i, 1),
      ["pointercancel", "pointerout", "pointerleave"].includes(e.type))
    ) {
      if (
        !(
          "pointercancel" === e.type &&
          (t.browser.isSafari || t.browser.isWebView)
        )
      )
        return;
    }
    const {
      params: r,
      touches: n,
      rtlTranslate: o,
      slidesGrid: a,
      enabled: l,
    } = t;
    if (!l) return;
    if (!r.simulateTouch && "mouse" === e.pointerType) return;
    let d = e;
    if (
      (d.originalEvent && (d = d.originalEvent),
      s.allowTouchCallbacks && t.emit("touchEnd", d),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && r.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    r.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const c = m(),
      p = c - s.touchStartTime;
    if (t.allowClick) {
      const e = d.path || (d.composedPath && d.composedPath());
      t.updateClickedSlide((e && e[0]) || d.target),
        t.emit("tap click", d),
        p < 300 &&
          c - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", d);
    }
    if (
      ((s.lastClickTime = m()),
      f(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        0 === n.diff ||
        s.currentTranslate === s.startTranslate)
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let u;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (u = r.followFinger
        ? o
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      r.cssMode)
    )
      return;
    if (t.params.freeMode && r.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: u });
    let h = 0,
      g = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < a.length;
      e += e < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup
    ) {
      const t = e < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
      void 0 !== a[e + t]
        ? u >= a[e] && u < a[e + t] && ((h = e), (g = a[e + t] - a[e]))
        : u >= a[e] && ((h = e), (g = a[a.length - 1] - a[a.length - 2]));
    }
    let v = null,
      w = null;
    r.rewind &&
      (t.isBeginning
        ? (w =
            t.params.virtual && t.params.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (v = 0));
    const b = (u - a[h]) / g,
      S = h < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
    if (p > r.longSwipesMs) {
      if (!r.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (b >= r.longSwipesRatio
          ? t.slideTo(r.rewind && t.isEnd ? v : h + S)
          : t.slideTo(h)),
        "prev" === t.swipeDirection &&
          (b > 1 - r.longSwipesRatio
            ? t.slideTo(h + S)
            : null !== w && b < 0 && Math.abs(b) > r.longSwipesRatio
            ? t.slideTo(w)
            : t.slideTo(h));
    } else {
      if (!r.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (d.target === t.navigation.nextEl || d.target === t.navigation.prevEl)
        ? d.target === t.navigation.nextEl
          ? t.slideTo(h + S)
          : t.slideTo(h)
        : ("next" === t.swipeDirection && t.slideTo(null !== v ? v : h + S),
          "prev" === t.swipeDirection && t.slideTo(null !== w ? w : h));
    }
  }
  function R() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: r, snapGrid: n } = e,
      o = e.virtual && e.params.virtual.enabled;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses();
    const a = o && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
    !e.isEnd ||
    e.isBeginning ||
    e.params.centeredSlides ||
    a
      ? e.params.loop && !o
        ? e.slideToLoop(e.realIndex, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0)
      : e.slideTo(e.slides.length - 1, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(e.autoplay.resizeTimeout),
        (e.autoplay.resizeTimeout = setTimeout(() => {
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = r),
      (e.allowSlideNext = i),
      e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow();
  }
  function N(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function q() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
    if (!i) return;
    let r;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const n = e.maxTranslate() - e.minTranslate();
    (r = 0 === n ? 0 : (e.translate - e.minTranslate()) / n),
      r !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  function j(e) {
    const t = this;
    _(t, e.target),
      t.params.cssMode ||
        ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
        t.update();
  }
  let Y = !1;
  function X() {}
  const U = (e, t) => {
    const s = p(),
      { params: i, el: r, wrapperEl: n, device: o } = e,
      a = !!i.nested,
      l = "on" === t ? "addEventListener" : "removeEventListener",
      d = t;
    r[l]("pointerdown", e.onTouchStart, { passive: !1 }),
      s[l]("pointermove", e.onTouchMove, { passive: !1, capture: a }),
      s[l]("pointerup", e.onTouchEnd, { passive: !0 }),
      s[l]("pointercancel", e.onTouchEnd, { passive: !0 }),
      s[l]("pointerout", e.onTouchEnd, { passive: !0 }),
      s[l]("pointerleave", e.onTouchEnd, { passive: !0 }),
      (i.preventClicks || i.preventClicksPropagation) &&
        r[l]("click", e.onClick, !0),
      i.cssMode && n[l]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[d](
            o.ios || o.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            R,
            !0
          )
        : e[d]("observerUpdate", R, !0),
      r[l]("load", e.onLoad, { capture: !0 });
  };
  const K = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  const Z = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopedSlides: null,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function Q(e, t) {
    return function (s = {}) {
      const i = Object.keys(s)[0],
        r = s[i];
      "object" == typeof r && null !== r
        ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
            !0 === e[i] &&
            (e[i] = { auto: !0 }),
          i in e && "enabled" in r
            ? (!0 === e[i] && (e[i] = { enabled: !0 }),
              "object" != typeof e[i] ||
                "enabled" in e[i] ||
                (e[i].enabled = !0),
              e[i] || (e[i] = { enabled: !1 }),
              w(t, s))
            : w(t, s))
        : w(t, s);
    };
  }
  const J = {
      eventsEmitter: k,
      update: G,
      translate: $,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e = !0, t) {
          const s = this,
            { params: i } = s;
          i.cssMode ||
            (i.autoHeight && s.updateAutoHeight(),
            D({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e = !0, t) {
          const s = this,
            { params: i } = s;
          (s.animating = !1),
            i.cssMode ||
              (s.setTransition(0),
              D({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: B,
      loop: W,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          t.isElement && (t.__preventObserver__ = !0),
            (s.style.cursor = "move"),
            (s.style.cursor = e ? "grabbing" : "grab"),
            t.isElement &&
              requestAnimationFrame(() => {
                t.__preventObserver__ = !1;
              });
        },
        unsetGrabCursor: function () {
          const e = this;
          (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e.isElement && (e.__preventObserver__ = !0),
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = ""),
            e.isElement &&
              requestAnimationFrame(() => {
                e.__preventObserver__ = !1;
              }));
        },
      },
      events: {
        attachEvents: function () {
          const e = this,
            t = p(),
            { params: s } = e;
          (e.onTouchStart = H.bind(e)),
            (e.onTouchMove = V.bind(e)),
            (e.onTouchEnd = F.bind(e)),
            s.cssMode && (e.onScroll = q.bind(e)),
            (e.onClick = N.bind(e)),
            (e.onLoad = j.bind(e)),
            Y || (t.addEventListener("touchstart", X), (Y = !0)),
            U(e, "on");
        },
        detachEvents: function () {
          U(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            { realIndex: t, initialized: s, params: i, el: r } = e,
            n = i.breakpoints;
          if (!n || (n && 0 === Object.keys(n).length)) return;
          const o = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
          if (!o || e.currentBreakpoint === o) return;
          const a = (o in n ? n[o] : void 0) || e.originalParams,
            l = K(e, i),
            d = K(e, a),
            c = i.enabled;
          l && !d
            ? (r.classList.remove(
                `${i.containerModifierClass}grid`,
                `${i.containerModifierClass}grid-column`
              ),
              e.emitContainerClasses())
            : !l &&
              d &&
              (r.classList.add(`${i.containerModifierClass}grid`),
              ((a.grid.fill && "column" === a.grid.fill) ||
                (!a.grid.fill && "column" === i.grid.fill)) &&
                r.classList.add(`${i.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            ["navigation", "pagination", "scrollbar"].forEach((t) => {
              const s = i[t] && i[t].enabled,
                r = a[t] && a[t].enabled;
              s && !r && e[t].disable(), !s && r && e[t].enable();
            });
          const p = a.direction && a.direction !== i.direction,
            u = i.loop && (a.slidesPerView !== i.slidesPerView || p);
          p && s && e.changeDirection(), w(e.params, a);
          const h = e.params.enabled;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            c && !h ? e.disable() : !c && h && e.enable(),
            (e.currentBreakpoint = o),
            e.emit("_beforeBreakpoint", a),
            u && s && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()),
            e.emit("breakpoint", a);
        },
        getBreakpoint: function (e, t = "window", s) {
          if (!e || ("container" === t && !s)) return;
          let i = !1;
          const r = h(),
            n = "window" === t ? r.innerHeight : s.clientHeight,
            o = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: n * t, point: e };
              }
              return { value: e, point: e };
            });
          o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < o.length; e += 1) {
            const { point: n, value: a } = o[e];
            "window" === t
              ? r.matchMedia(`(min-width: ${a}px)`).matches && (i = n)
              : a <= s.clientWidth && (i = n);
          }
          return i || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: i } = s;
          if (i) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: {
        addClasses: function () {
          const e = this,
            { classNames: t, params: s, rtl: i, el: r, device: n } = e,
            o = (function (e, t) {
              const s = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((i) => {
                        e[i] && s.push(t + i);
                      })
                    : "string" == typeof e && s.push(t + e);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "free-mode": e.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: i },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: n.android },
                { ios: n.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
                { "watch-progress": s.watchSlidesProgress },
              ],
              s.containerModifierClass
            );
          t.push(...o), r.classList.add(...t), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { el: e, classNames: t } = this;
          e.classList.remove(...t), this.emitContainerClasses();
        },
      },
    },
    ee = {};
  class te {
    constructor(...e) {
      let t, s;
      1 === e.length &&
      e[0].constructor &&
      "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
        ? (s = e[0])
        : ([t, s] = e),
        s || (s = {}),
        (s = w({}, s)),
        t && !s.el && (s.el = t);
      const i = p();
      if (
        s.el &&
        "string" == typeof s.el &&
        i.querySelectorAll(s.el).length > 1
      ) {
        const e = [];
        return (
          i.querySelectorAll(s.el).forEach((t) => {
            const i = w({}, s, { el: t });
            e.push(new te(i));
          }),
          e
        );
      }
      const r = this;
      (r.__swiper__ = !0),
        (r.support = O()),
        (r.device = P({ userAgent: s.userAgent })),
        (r.browser = A()),
        (r.eventsListeners = {}),
        (r.eventsAnyListeners = []),
        (r.modules = [...r.__modules__]),
        s.modules && Array.isArray(s.modules) && r.modules.push(...s.modules);
      const n = {};
      r.modules.forEach((e) => {
        e({
          params: s,
          swiper: r,
          extendParams: Q(s, n),
          on: r.on.bind(r),
          once: r.once.bind(r),
          off: r.off.bind(r),
          emit: r.emit.bind(r),
        });
      });
      const o = w({}, Z, n);
      return (
        (r.params = w({}, o, ee, s)),
        (r.originalParams = w({}, r.params)),
        (r.passedParams = w({}, s)),
        r.params &&
          r.params.on &&
          Object.keys(r.params.on).forEach((e) => {
            r.on(e, r.params.on[e]);
          }),
        r.params && r.params.onAny && r.onAny(r.params.onAny),
        Object.assign(r, {
          enabled: r.params.enabled,
          el: t,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === r.params.direction,
          isVertical: () => "vertical" === r.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          allowSlideNext: r.params.allowSlideNext,
          allowSlidePrev: r.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: r.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            evCache: [],
          },
          allowClick: !0,
          allowTouchMove: r.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        r.emit("_swiper"),
        r.params.init && r.init(),
        r
      );
    }
    getSlideIndex(e) {
      const { slidesEl: t, params: s } = this,
        i = x(T(t, `.${s.slideClass}, swiper-slide`)[0]);
      return x(e) - i;
    }
    getSlideIndexByData(e) {
      return this.getSlideIndex(
        this.slides.filter(
          (t) => 1 * t.getAttribute("data-swiper-slide-index") === e
        )[0]
      );
    }
    recalcSlides() {
      const { slidesEl: e, params: t } = this;
      this.slides = T(e, `.${t.slideClass}, swiper-slide`);
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const i = s.minTranslate(),
        r = (s.maxTranslate() - i) * e + i;
      s.translateTo(r, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass)
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.forEach((s) => {
        const i = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e = "current", t = !1) {
      const {
        params: s,
        slides: i,
        slidesGrid: r,
        slidesSizesGrid: n,
        size: o,
        activeIndex: a,
      } = this;
      let l = 1;
      if (s.centeredSlides) {
        let e,
          t = i[a].swiperSlideSize;
        for (let s = a + 1; s < i.length; s += 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (l += 1), t > o && (e = !0));
        for (let s = a - 1; s >= 0; s -= 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (l += 1), t > o && (e = !0));
      } else if ("current" === e)
        for (let e = a + 1; e < i.length; e += 1) {
          (t ? r[e] + n[e] - r[a] < o : r[e] - r[a] < o) && (l += 1);
        }
      else
        for (let e = a - 1; e >= 0; e -= 1) {
          r[a] - r[e] < o && (l += 1);
        }
      return l;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function i() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let r;
      if (
        (s.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
          t.complete && _(e, t);
        }),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled)
      )
        i(), e.params.autoHeight && e.updateAutoHeight();
      else {
        if (
          ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) &&
          e.isEnd &&
          !e.params.centeredSlides
        ) {
          const t =
            e.virtual && e.params.virtual.enabled ? e.virtual.slides : e.slides;
          r = e.slideTo(t.length - 1, 0, !1, !0);
        } else r = e.slideTo(e.activeIndex, 0, !1, !0);
        r || i();
      }
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t = !0) {
      const s = this,
        i = s.params.direction;
      return (
        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
          s.el.classList.add(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.forEach((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      let s = e || t.params.el;
      if (("string" == typeof s && (s = document.querySelector(s)), !s))
        return !1;
      (s.swiper = t), s.shadowEl && (t.isElement = !0);
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let r = (() => {
        if (s && s.shadowRoot && s.shadowRoot.querySelector) {
          return s.shadowRoot.querySelector(i());
        }
        return T(s, i())[0];
      })();
      return (
        !r &&
          t.params.createElements &&
          ((r = (function (e, t = []) {
            const s = document.createElement(e);
            return s.classList.add(...(Array.isArray(t) ? t : [t])), s;
          })("div", t.params.wrapperClass)),
          s.append(r),
          T(s, `.${t.params.slideClass}`).forEach((e) => {
            r.append(e);
          })),
        Object.assign(t, {
          el: s,
          wrapperEl: r,
          slidesEl: t.isElement ? s : r,
          mounted: !0,
          rtl: "rtl" === s.dir.toLowerCase() || "rtl" === y(s, "direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === s.dir.toLowerCase() || "rtl" === y(s, "direction")),
          wrongRTL: "-webkit-box" === y(r, "display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.loop && t.virtual && t.params.virtual.enabled
            ? t.slideTo(
                t.params.initialSlide + t.virtual.slidesBefore,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.params.loop && t.loopCreate(),
          t.attachEvents(),
          [...t.el.querySelectorAll('[loading="lazy"]')].forEach((e) => {
            e.complete
              ? _(t, e)
              : e.addEventListener("load", (e) => {
                  _(t, e.target);
                });
          }),
          z(t),
          (t.initialized = !0),
          z(t),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e = !0, t = !0) {
      const s = this,
        { params: i, el: r, wrapperEl: n, slides: o } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          i.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            r.removeAttribute("style"),
            n.removeAttribute("style"),
            o &&
              o.length &&
              o.forEach((e) => {
                e.classList.remove(
                  i.slideVisibleClass,
                  i.slideActiveClass,
                  i.slideNextClass,
                  i.slidePrevClass
                ),
                  e.removeAttribute("style"),
                  e.removeAttribute("data-swiper-slide-index");
              })),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.el.swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      w(ee, e);
    }
    static get extendedDefaults() {
      return ee;
    }
    static get defaults() {
      return Z;
    }
    static installModule(e) {
      te.prototype.__modules__ || (te.prototype.__modules__ = []);
      const t = te.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => te.installModule(e)), te)
        : (te.installModule(e), te);
    }
  }
  Object.keys(J).forEach((e) => {
    Object.keys(J[e]).forEach((t) => {
      te.prototype[t] = J[e][t];
    });
  }),
    te.use([
      function ({ swiper: e, on: t, emit: s }) {
        const i = h();
        let r = null,
          n = null;
        const o = () => {
            e &&
              !e.destroyed &&
              e.initialized &&
              (s("beforeResize"), s("resize"));
          },
          a = () => {
            e && !e.destroyed && e.initialized && s("orientationchange");
          };
        t("init", () => {
          e.params.resizeObserver && void 0 !== i.ResizeObserver
            ? e &&
              !e.destroyed &&
              e.initialized &&
              ((r = new ResizeObserver((t) => {
                n = i.requestAnimationFrame(() => {
                  const { width: s, height: i } = e;
                  let r = s,
                    n = i;
                  t.forEach(
                    ({ contentBoxSize: t, contentRect: s, target: i }) => {
                      (i && i !== e.el) ||
                        ((r = s ? s.width : (t[0] || t).inlineSize),
                        (n = s ? s.height : (t[0] || t).blockSize));
                    }
                  ),
                    (r === s && n === i) || o();
                });
              })),
              r.observe(e.el))
            : (i.addEventListener("resize", o),
              i.addEventListener("orientationchange", a));
        }),
          t("destroy", () => {
            n && i.cancelAnimationFrame(n),
              r && r.unobserve && e.el && (r.unobserve(e.el), (r = null)),
              i.removeEventListener("resize", o),
              i.removeEventListener("orientationchange", a);
          });
      },
      function ({ swiper: e, extendParams: t, on: s, emit: i }) {
        const r = [],
          n = h(),
          o = (t, s = {}) => {
            const o = new (n.MutationObserver || n.WebkitMutationObserver)(
              (t) => {
                if (e.__preventObserver__) return;
                if (1 === t.length) return void i("observerUpdate", t[0]);
                const s = function () {
                  i("observerUpdate", t[0]);
                };
                n.requestAnimationFrame
                  ? n.requestAnimationFrame(s)
                  : n.setTimeout(s, 0);
              }
            );
            o.observe(t, {
              attributes: void 0 === s.attributes || s.attributes,
              childList: void 0 === s.childList || s.childList,
              characterData: void 0 === s.characterData || s.characterData,
            }),
              r.push(o);
          };
        t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          s("init", () => {
            if (e.params.observer) {
              if (e.params.observeParents) {
                const t = (function (e, t) {
                  const s = [];
                  let i = e.parentElement;
                  for (; i; )
                    t ? i.matches(t) && s.push(i) : s.push(i),
                      (i = i.parentElement);
                  return s;
                })(e.el);
                for (let e = 0; e < t.length; e += 1) o(t[e]);
              }
              o(e.el, { childList: e.params.observeSlideChildren }),
                o(e.wrapperEl, { attributes: !1 });
            }
          }),
          s("destroy", () => {
            r.forEach((e) => {
              e.disconnect();
            }),
              r.splice(0, r.length);
          });
      },
    ]);
  const se = te;
  function ie() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)'
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  window.addEventListener("load", function (e) {
    ie(),
      document.querySelector(".promoSwiper") &&
        new se(".promoSwiper", {
          slidesPerView: 1,
          loop: !0,
          grabCursor: !0,
          keyboard: { enabled: !0 },
          scrollbar: { el: ".swiper-scrollbar" },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: !0,
            renderBullet: function (e, t) {
              return (
                '<span class="' +
                t +
                '">' +
                ("0" + (e + 1)).slice(-2) +
                "/" +
                ("0" + this.slides.length).slice(-2) +
                "</span>"
              );
            },
          },
        });
  });
  e.watcher = new (class {
    constructor(e) {
      (this.config = Object.assign({ logging: !0 }, e)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]")
        );
    }
    scrollWatcherConstructor(e) {
      if (e.length) {
        this.scrollWatcherLogging(
          `Проснулся, слежу за объектами (${e.length})...`
        ),
          o(
            Array.from(e).map(function (e) {
              return `${
                e.dataset.watchRoot ? e.dataset.watchRoot : null
              }|${e.dataset.watchMargin ? e.dataset.watchMargin : "0px"}|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
            })
          ).forEach((t) => {
            let s = t.split("|"),
              i = { root: s[0], margin: s[1], threshold: s[2] },
              r = Array.from(e).filter(function (e) {
                let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                  s = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                  r = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                if (
                  String(t) === i.root &&
                  String(s) === i.margin &&
                  String(r) === i.threshold
                )
                  return e;
              }),
              n = this.getScrollWatcherConfig(i);
            this.scrollWatcherInit(r, n);
          });
      } else
        this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
    }
    getScrollWatcherConfig(e) {
      let t = {};
      if (
        (document.querySelector(e.root)
          ? (t.root = document.querySelector(e.root))
          : "null" !== e.root &&
            this.scrollWatcherLogging(
              `Эмм... родительского объекта ${e.root} нет на странице`
            ),
        (t.rootMargin = e.margin),
        !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
      ) {
        if ("prx" === e.threshold) {
          e.threshold = [];
          for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
        } else e.threshold = e.threshold.split(",");
        return (t.threshold = e.threshold), t;
      }
      this.scrollWatcherLogging(
        "Ой ой, настройку data-watch-margin нужно задавать в PX или %"
      );
    }
    scrollWatcherCreate(e) {
      this.observer = new IntersectionObserver((e, t) => {
        e.forEach((e) => {
          this.scrollWatcherCallback(e, t);
        });
      }, e);
    }
    scrollWatcherInit(e, t) {
      this.scrollWatcherCreate(t), e.forEach((e) => this.observer.observe(e));
    }
    scrollWatcherIntersecting(e, t) {
      e.isIntersecting
        ? (!t.classList.contains("_watcher-view") &&
            t.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `Я вижу ${t.classList}, добавил класс _watcher-view`
          ))
        : (t.classList.contains("_watcher-view") &&
            t.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `Я не вижу ${t.classList}, убрал класс _watcher-view`
          ));
    }
    scrollWatcherOff(e, t) {
      t.unobserve(e),
        this.scrollWatcherLogging(`Я перестал следить за ${e.classList}`);
    }
    scrollWatcherLogging(e) {
      this.config.logging && n(`[Наблюдатель]: ${e}`);
    }
    scrollWatcherCallback(e, t) {
      const s = e.target;
      this.scrollWatcherIntersecting(e, s),
        s.hasAttribute("data-watch-once") &&
          e.isIntersecting &&
          this.scrollWatcherOff(s, t),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: e } })
        );
    }
  })({});
  let re = !1;
  setTimeout(() => {
    if (re) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    r(),
    (function () {
      function e(e) {
        if ("click" === e.type) {
          const t = e.target;
          if (t.closest("[data-goto]")) {
            const s = t.closest("[data-goto]"),
              i = s.dataset.goto ? s.dataset.goto : "",
              r = !!s.hasAttribute("data-goto-header"),
              n = s.dataset.gotoSpeed ? s.dataset.gotoSpeed : "500";
            a(i, r, n), e.preventDefault();
          }
        } else if ("watcherCallback" === e.type && e.detail) {
          const t = e.detail.entry,
            s = t.target;
          if ("navigator" === s.dataset.watch) {
            const e = s.id,
              i =
                (document.querySelector("[data-goto]._navigator-active"),
                document.querySelector(`[data-goto="${e}"]`));
            t.isIntersecting
              ? i && i.classList.add("_navigator-active")
              : i && i.classList.remove("_navigator-active");
          }
        }
      }
      document.addEventListener("click", e),
        document.addEventListener("watcherCallback", e);
    })(),
    (function () {
      re = !0;
      const e = document.querySelector("header.header"),
        t = e.hasAttribute("data-scroll-show"),
        s = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
        i = e.dataset.scroll ? e.dataset.scroll : 1;
      let r,
        n = 0;
      document.addEventListener("windowScroll", function (o) {
        const a = window.scrollY;
        clearTimeout(r),
          a >= i
            ? (!e.classList.contains("_header-scroll") &&
                e.classList.add("_header-scroll"),
              t &&
                (a > n
                  ? e.classList.contains("_header-show") &&
                    e.classList.remove("_header-show")
                  : !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show"),
                (r = setTimeout(() => {
                  !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show");
                }, s))))
            : (e.classList.contains("_header-scroll") &&
                e.classList.remove("_header-scroll"),
              t &&
                e.classList.contains("_header-show") &&
                e.classList.remove("_header-show")),
          (n = a <= 0 ? 0 : a);
      });
    })(),
    (re = !0),
    (function () {
      const e = document.querySelectorAll("[data-sticky]");
      e.length &&
        e.forEach((e) => {
          let t = {
            top: e.dataset.stickyTop ? parseInt(e.dataset.stickyTop) : 0,
            bottom: e.dataset.stickyBottom
              ? parseInt(e.dataset.stickyBottom)
              : 0,
            header: e.hasAttribute("data-sticky-header")
              ? document.querySelector("header.header").offsetHeight
              : 0,
          };
          !(function (e, t) {
            const s = e.querySelector("[data-sticky-item]"),
              i = t.header,
              r = i + t.top,
              n = s.getBoundingClientRect().top + scrollY - r;
            document.addEventListener("windowScroll", function (i) {
              const o =
                e.offsetHeight +
                e.getBoundingClientRect().top +
                scrollY -
                (r + s.offsetHeight + t.bottom);
              let a = {
                position: "relative",
                bottom: "auto",
                top: "0px",
                right: "0px",
                width: "auto",
              };
              r + t.bottom + s.offsetHeight < window.innerHeight &&
                (scrollY >= n && scrollY <= o
                  ? ((a.position = "fixed"),
                    (a.bottom = "auto"),
                    (a.top = `${r}px`),
                    (a.right = `${s.getBoundingClientRect().right}px`),
                    (a.width = `${s.offsetWidth}px`))
                  : scrollY >= o &&
                    ((a.position = "relative"),
                    (a.bottom = `${r}px`),
                    (a.top = "auto"),
                    (a.right = `${s.getBoundingClientRect().left}px`),
                    (a.width = `${s.offsetWidth}px`))),
                (function (e, t) {
                  e.style.cssText = `position:${t.position};bottom:${t.bottom};top:${t.top};left:${t.left};width:${t.width};`;
                })(s, a);
            });
          })(e, t);
        });
    })();
  const ne = document.body,
    oe = "scroll-up",
    ae = "scroll-down";
  let le = 0;
  window.addEventListener("scroll", () => {
    const e = window.pageYOffset;
    e <= 0
      ? ne.classList.remove(oe)
      : (e > le && !ne.classList.contains(ae)
          ? (ne.classList.remove(oe), ne.classList.add(ae))
          : e < le &&
            ne.classList.contains(ae) &&
            (ne.classList.remove(ae), ne.classList.add(oe)),
        (le = e));
  });
})();

("use strict");

console.log("1");

let scrollLocked = false;

const unlockScroll = (delay = 500) => {
  const body = document.querySelector("body");
  console.log("2");

  if (scrollLocked) {
    const elements = document.querySelectorAll("[data-lp]");
    console.log("3");

    for (let i = 0; i < elements.length; i++) {
      elements[i].style.paddingRight = "0px";
      console.log("4");
    }

    body.style.paddingRight = "0px";
    console.log("5");
    document.documentElement.classList.remove("lock");
    console.log("6");

    scrollLocked = false;
    console.log("7");

    setTimeout(function () {
      scrollLocked = true;
      console.log("Скролл разблокирован");
    }, delay);
    console.log("9");
  }
};

const lockScroll = (delay = 500) => {
  const body = document.querySelector("body");
  console.log("10");

  if (!scrollLocked) {
    const elements = document.querySelectorAll("[data-lp]");
    console.log("11");

    for (let i = 0; i < elements.length; i++) {
      elements[i].style.paddingRight = `${
        window.innerWidth - document.documentElement.clientWidth
      }px`;
      console.log("12");
    }

    body.style.paddingRight = `${
      window.innerWidth - document.documentElement.clientWidth
    }px`;
    console.log("13");
    document.documentElement.classList.add("lock");
    console.log("14");

    scrollLocked = true;
    console.log("15");

    setTimeout(function () {
      scrollLocked = false;
      console.log("Скролл заблокирован");
    }, delay);
    console.log("17");
  }
};
console.log("18");

function handleBurgerClick() {
  const burger = document.querySelector(".burger");
  console.log("19");
  if (burger) {
    burger.addEventListener("click", function (event) {
      if (scrollLocked) {
        unlockScroll();
        console.log("Скролл разблокирован");
      } else {
        lockScroll();
        console.log("Скролл заблокирован");
      }

      document.documentElement.classList.toggle("open");
      console.log("20");
    });
  }
}

function delayAndLog(message) {
  setTimeout(() => {
    if (window.FLS) {
      console.log(message);
    }
  }, 0);
  console.log("21");
}

function filterUniqueElements(arr) {
  return arr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
  });
}

// Обработчик события DOMContentLoaded для выполнения кода после полной загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  handleBurgerClick();
  // console.log("23");

  delayAndLog("Привет, мир!");
  // console.log("24");
});
// Проверяем, что DOM полностью загружен, прежде чем выполнять код
document.addEventListener("DOMContentLoaded", function () {
  // Проверяем наличие элемента с id "promo-section"
  var promo = document.getElementById("promo");
  // Проверяем, что элемент "promo-section" существует
  if (promo) {
    // Создаем новый Swiper объект для элемента ".promoSwiper"
    var promoSwiper = new Swiper(".promoSwiper", {
      // Задаем количество слайдов, которые будут показываться одновременно
      slidesPerView: 1,

      loop: true,
      // Включаем курсор в виде "руки" при наведении на слайды
      grabCursor: true,
      // Включаем использование клавиатуры для навигации по слайдам
      keyboard: {
        enabled: true,
      },

      // Включаем кнопки "вперед" и "назад" для навигации по слайдам
      navigation: {
        nextEl: ".promo .swiper-button-next",
        prevEl: ".promo .swiper-button-prev",
      },
      // Включаем пагинацию и настраиваем внешний вид номеров слайдов
      pagination: {
        el: ".promo .swiper-pagination",
        clickable: true,
        // Используем функцию renderBullet для создания номеров слайдов вида "01/10"
        renderBullet: function (index, className) {
          return (
            '<span class="' +
            className +
            '">' +
            '<span class="prev-slide">' +
            ("" + (index + 1)).slice(-2) +
            "</span>" +
            '<span class="slash"></span>' +
            '<span class="next-slide">' +
            ("" + this.slides.length).slice(-2) +
            "</span>" +
            "</span>"
          );
        },
      },
    });
  }
});

(function (e) {
  let t = new Image();
  (t.onload = t.onerror =
    function () {
      e(2 == t.height);
    }),
    (t.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
})(function (e) {
  let t = !0 === e ? "webp" : "no-webp";
  document.documentElement.classList.add(t);
});

document.addEventListener("DOMContentLoaded", function () {
  // Функция определения направления прокрутки страницы
  function detectScrollDirection() {
    const body = document.body;
    const scrollUpClass = "scroll-up";
    const scrollDownClass = "scroll-down";
    let lastScrollPosition = 0;

    function handleScroll() {
      const currentScrollPosition = window.pageYOffset;

      if (currentScrollPosition <= 0) {
        body.classList.remove(scrollUpClass);
      } else {
        if (
          currentScrollPosition > lastScrollPosition &&
          !body.classList.contains(scrollDownClass)
        ) {
          body.classList.remove(scrollUpClass);
          body.classList.add(scrollDownClass);
        } else if (
          currentScrollPosition < lastScrollPosition &&
          body.classList.contains(scrollDownClass)
        ) {
          body.classList.remove(scrollDownClass);
          body.classList.add(scrollUpClass);
        }
      }

      lastScrollPosition = currentScrollPosition;
    }

    window.addEventListener("scroll", handleScroll);
  }

  // Проверяем, поддерживается ли браузером событие scroll
  if ("scroll" in window) {
    detectScrollDirection();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Функция определения направления прокрутки страницы
  function detectScrollDirection() {
    const body = document.body;
    const scrollUpClass = "scroll-up";
    const scrollDownClass = "scroll-down";
    let lastScrollPosition = 0;

    function handleScroll() {
      const currentScrollPosition = window.pageYOffset;

      if (currentScrollPosition <= 0) {
        // Если скролл находится вверху страницы или в самом начале, удалить классы scroll-up и scroll-down
        body.classList.remove(scrollUpClass);
        body.classList.remove(scrollDownClass);
      } else {
        if (
          currentScrollPosition > lastScrollPosition &&
          !body.classList.contains(scrollDownClass)
        ) {
          // Если скролл вниз и нет класса scroll-down, добавить класс scroll-down и удалить класс scroll-up
          body.classList.remove(scrollUpClass);
          body.classList.add(scrollDownClass);
        } else if (
          currentScrollPosition < lastScrollPosition &&
          body.classList.contains(scrollDownClass)
        ) {
          // Если скролл вверх и есть класс scroll-down, добавить класс scroll-up и удалить класс scroll-down
          body.classList.remove(scrollDownClass);
          body.classList.add(scrollUpClass);
        }
      }

      lastScrollPosition = currentScrollPosition;
    }

    window.addEventListener("scroll", handleScroll);
  }

  // Проверяем, поддерживается ли браузером событие scroll
  if ("scroll" in window) {
    detectScrollDirection();
  }

  // Функция для обработки Sticky элементов
  function handleStickyElements() {
    const elements = document.querySelectorAll("[data-sticky]");

    elements.forEach((element) => {
      const stickyTop = parseInt(element.dataset.stickyTop) || 0;
      const stickyBottom = parseInt(element.dataset.stickyBottom) || 0;
      const isHeaderSticky = element.hasAttribute("data-sticky-header");
      const headerHeight = isHeaderSticky
        ? document.querySelector("header.header").offsetHeight
        : 0;
      const stickyItem = element.querySelector("[data-sticky-item]");

      if (!stickyItem) {
        // Если элемент data-sticky-item не найден, пропустить обработку
        return;
      }

      function handleScroll() {
        const scrollY = window.scrollY;
        const stickyItemRect = stickyItem.getBoundingClientRect();
        const stickyItemTop =
          stickyItemRect.top + scrollY - (headerHeight + stickyTop);
        const stickyItemBottom =
          element.offsetHeight +
          element.getBoundingClientRect().top +
          scrollY -
          (headerHeight + stickyItem.offsetHeight + stickyBottom);

        if (scrollY >= stickyItemTop && scrollY <= stickyItemBottom) {
          // Когда скролл находится внутри диапазона stickyItemTop и stickyItemBottom
          stickyItem.style.position = "fixed";
          stickyItem.style.bottom = "auto";
          stickyItem.style.top = `${headerHeight + stickyTop}px`;
          stickyItem.style.right = `${stickyItemRect.right}px`;
          stickyItem.style.width = `${stickyItem.offsetWidth}px`;
        } else if (scrollY > stickyItemBottom) {
          // Когда скролл находится ниже stickyItemBottom
          stickyItem.style.position = "relative";
          stickyItem.style.bottom = `${headerHeight + stickyTop}px`;
          stickyItem.style.top = "auto";
          stickyItem.style.right = `${stickyItemRect.left}px`;
          stickyItem.style.width = `${stickyItem.offsetWidth}px`;
        } else {
          // Когда скролл находится выше stickyItemTop
          stickyItem.style.position = "relative";
          stickyItem.style.bottom = "auto";
          stickyItem.style.top = "0px";
          stickyItem.style.right = "0px";
          stickyItem.style.width = "auto";
        }
      }

      window.addEventListener("scroll", handleScroll);
    });
  }

  // Проверяем, поддерживается ли браузером событие scroll
  if ("scroll" in window) {
    handleStickyElements();
  }
});

// Прилипающий блок
export function stickyBlock() {
  addWindowScrollEvent = true;
  // data-sticky для родителя внутри которого прилипает блок *
  // data-sticky-header для родителя, учитываем высоту хедера
  // data-sticky-top="" для родителя, можно указать отступ сверху
  // data-sticky-bottom="" для родителя, можно указать отступ снизу
  // data-sticky-item для прилипающего блока *
  function stickyBlockInit() {
    const stickyParents = document.querySelectorAll("[data-sticky]");
    if (stickyParents.length) {
      stickyParents.forEach((stickyParent) => {
        let stickyConfig = {
          top: stickyParent.dataset.stickyTop
            ? parseInt(stickyParent.dataset.stickyTop)
            : 0,
          bottom: stickyParent.dataset.stickyBottom
            ? parseInt(stickyParent.dataset.stickyBottom)
            : 0,
          header: stickyParent.hasAttribute("data-sticky-header")
            ? document.querySelector("header.header").offsetHeight
            : 0,
        };
        stickyBlockItem(stickyParent, stickyConfig);
      });
    }
  }
  function stickyBlockItem(stickyParent, stickyConfig) {
    const stickyBlockItem = stickyParent.querySelector("[data-sticky-item]");
    const headerHeight = stickyConfig.header;
    const offsetTop = headerHeight + stickyConfig.top;
    const startPoint =
      stickyBlockItem.getBoundingClientRect().top + scrollY - offsetTop;
    document.addEventListener("windowScroll", function (e) {
      const endPoint =
        stickyParent.offsetHeight +
        stickyParent.getBoundingClientRect().top +
        scrollY -
        (offsetTop + stickyBlockItem.offsetHeight + stickyConfig.bottom);
      let stickyItemValues = {
        position: "relative",
        bottom: "auto",
        top: "0px",
        right: "0px",
        width: "auto",
      };
      if (
        offsetTop + stickyConfig.bottom + stickyBlockItem.offsetHeight <
        window.innerHeight
      ) {
        if (scrollY >= startPoint && scrollY <= endPoint) {
          stickyItemValues.position = `fixed`;
          stickyItemValues.bottom = `auto`;
          stickyItemValues.top = `${offsetTop}px`;
          stickyItemValues.right = `${
            stickyBlockItem.getBoundingClientRect().right
          }px`;
          stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
        } else if (scrollY >= endPoint) {
          stickyItemValues.position = `relative`;
          stickyItemValues.bottom = `${offsetTop}px`;
          stickyItemValues.top = `auto`;
          stickyItemValues.right = `${
            stickyBlockItem.getBoundingClientRect().left
          }px`;
          stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
        }
      }
      stickyBlockType(stickyBlockItem, stickyItemValues);
    });
  }
  function stickyBlockType(stickyBlockItem, stickyItemValues) {
    stickyBlockItem.style.cssText = `position:${stickyItemValues.position};bottom:${stickyItemValues.bottom};top:${stickyItemValues.top};left:${stickyItemValues.left};width:${stickyItemValues.width};`;
  }
  stickyBlockInit();
}

"use strict";

let scrollLocked = false;

const unlockScroll = (delay = 500) => { const body = document.querySelector("body");

if (scrollLocked) { const elements = document.querySelectorAll("[data-lp]");

elements.forEach(element => {
  element.style.paddingRight = "0px";
});

body.style.paddingRight = "0px";

document.documentElement.classList.remove("lock");

scrollLocked = false;

setTimeout(() => {
  scrollLocked = true;

  console.log("Скролл разблокирован");
}, delay);
} };

const lockScroll = (delay = 500) => { const body = document.querySelector("body");

if (!scrollLocked) { const elements = document.querySelectorAll("[data-lp]");

elements.forEach(element => {
  element.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
});

body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;

document.documentElement.classList.add("lock");

scrollLocked = true;

setTimeout(() => {
  scrollLocked = false;
  console.log("Скролл заблокирован");
}, delay);
} };

function handleBurgerClick() { const burger = document.querySelector(".burger");

if (burger) { burger.addEventListener("click", event => { if (scrollLocked) { unlockScroll(); console.log("Скролл разблокирован"); } else { lockScroll(); console.log("Скролл заблокирован"); }

  document.documentElement.classList.toggle("open");
});
} }

function delayAndLog(message) { setTimeout(() => { if (window.FLS) { console.log(message); } }, 0); }

function filterUniqueElements(arr) { return arr.filter((element, index, self) => self.indexOf(element) === index); }

document.addEventListener("DOMContentLoaded", () => { handleBurgerClick(); });

document.addEventListener("DOMContentLoaded", () => { const promo = document.getElementById("promo");

if (promo) { const promoSwiper = new Swiper(".promoSwiper", { slidesPerView: 1, loop: true, grabCursor: true, keyboard: { enabled: true, }, navigation: { nextEl: ".promo .swiper-button-next", prevEl: ".promo .swiper-button-prev", }, pagination: { el: ".promo .swiper-pagination", clickable: true, renderBullet: (index, className) => { return <span class="${className}"><span class="prev-slide">${("" + (index + 1)).slice(-2)}</span><span class="slash"></span><span class="next-slide">${("" + this.slides.length).slice(-2)}</span></span>; }, }, }); } });

(callback => { const image = new Image();

image.onload = image.onerror = () => callback(image.height === 2);

image.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"; })((supported) => document.documentElement.classList.add(supported ? "webp" : "no-webp"));

document.addEventListener("DOMContentLoaded", () => { const handleStickyElements = () => { const elements = document.querySelectorAll("[data-sticky]");

elements.forEach(element => {
  const stickyTop = parseInt(element.dataset.stickyTop) || 0;
  const stickyBottom = parseInt(element.dataset.stickyBottom) || 0;
  const isHeaderSticky = element.hasAttribute("data-sticky-header");
  const headerHeight = isHeaderSticky ? document.querySelector("header.header").offsetHeight : 0;
  const stickyItem = element.querySelector("[data-sticky-item]");

  if (!stickyItem) {
    return;
  }

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const stickyItemRect = stickyItem.getBoundingClientRect();
    const stickyItemTop = stickyItemRect.top + scrollY - (headerHeight + stickyTop);
    const stickyItemBottom = element.offsetHeight + element.getBoundingClientRect().top + scrollY - (headerHeight + stickyItem.offsetHeight + stickyBottom);

    if (scrollY >= stickyItemTop && scrollY <= stickyItemBottom) {
      stickyItem.style.position = "fixed";
      stickyItem.style.bottom = "auto";
      stickyItem.style.top = `${headerHeight + stickyTop}px`;
      stickyItem.style.right = `${stickyItemRect.right}px`;
      stickyItem.style.width = `${stickyItem.offsetWidth}px`;
    } else if (scrollY > stickyItemBottom) {
      stickyItem.style.position = "relative";
      stickyItem.style.bottom = `${headerHeight + stickyTop}px`;
      stickyItem.style.top = "auto";
      stickyItem.style.right = `${stickyItemRect.left}px`;
      stickyItem.style.width = `${stickyItem.offsetWidth}px`;
    } else {
      stickyItem.style.position = "relative";
      stickyItem.style.bottom = "auto";
      stickyItem.style.top = "0px";
      stickyItem.style.right = "0px";
      stickyItem.style.width = "auto";
    }
  };

  window.addEventListener("scroll", handleScroll);
});
};

if ("scroll" in window) { handleStickyElements(); } });




"use strict";

let scrollLocked = false;

const unlockScroll = (delay = 500) => { const body = document.querySelector("body");

if (scrollLocked) { const elements = document.querySelectorAll("[data-lp]");

elements.forEach(element => {
  element.style.paddingRight = "0px";
});

body.style.paddingRight = "0px";

document.documentElement.classList.remove("lock");

scrollLocked = false;

setTimeout(() => {
  scrollLocked = true;

  console.log("Скролл разблокирован");
}, delay);
} };

const lockScroll = (delay = 500) => { const body = document.querySelector("body");

if (!scrollLocked) { const elements = document.querySelectorAll("[data-lp]");

elements.forEach(element => {
  element.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
});

body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;

document.documentElement.classList.add("lock");

scrollLocked = true;

setTimeout(() => {
  scrollLocked = false;
  console.log("Скролл заблокирован");
}, delay);
} };

function handleBurgerClick() { const burger = document.querySelector(".burger");

if (burger) { burger.addEventListener("click", event => { if (scrollLocked) { unlockScroll(); console.log("Скролл разблокирован"); } else { lockScroll(); console.log("Скролл заблокирован"); }

  document.documentElement.classList.toggle("open");
});
} }

function delayAndLog(message) { setTimeout(() => { if (window.FLS) { console.log(message); } }, 0); }

function filterUniqueElements(arr) { return arr.filter((element, index, self) => self.indexOf(element) === index); }

document.addEventListener("DOMContentLoaded", () => { handleBurgerClick(); });

document.addEventListener("DOMContentLoaded", () => { const promo = document.getElementById("promo");

if (promo) { const promoSwiper = new Swiper(".promoSwiper", { slidesPerView: 1, loop: true, grabCursor: true, keyboard: { enabled: true, }, navigation: { nextEl: ".promo .swiper-button-next", prevEl: ".promo .swiper-button-prev", }, pagination: { el: ".promo .swiper-pagination", clickable: true, renderBullet: (index, className) => { return <span class="${className}"><span class="prev-slide">${("" + (index + 1)).slice(-2)}</span><span class="slash"></span><span class="next-slide">${("" + this.slides.length).slice(-2)}</span></span>; }, }, }); } });

(callback => { const image = new Image();

image.onload = image.onerror = () => callback(image.height === 2);

image.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"; })((supported) => document.documentElement.classList.add(supported ? "webp" : "no-webp"));

document.addEventListener("DOMContentLoaded", () => { const handleStickyElements = () => { const elements = document.querySelectorAll("[data-sticky]");

elements.forEach(element => {
  const stickyTop = parseInt(element.dataset.stickyTop) || 0;
  const stickyBottom = parseInt(element.dataset.stickyBottom) || 0;
  const isHeaderSticky = element.hasAttribute("data-sticky-header");
  const headerHeight = isHeaderSticky ? document.querySelector("header.header").offsetHeight : 0;
  const stickyItem = element.querySelector("[data-sticky-item]");

  if (!stickyItem) {
    return;
  }

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const stickyItemRect = stickyItem.getBoundingClientRect();
    const stickyItemTop = stickyItemRect.top + scrollY - (headerHeight + stickyTop);
    const stickyItemBottom = element.offsetHeight + element.getBoundingClientRect().top + scrollY - (headerHeight + stickyItem.offsetHeight + stickyBottom);

    if (scrollY >= stickyItemTop && scrollY <= stickyItemBottom) {
      stickyItem.style.position = "fixed";
      stickyItem.style.bottom = "auto";
      stickyItem.style.top = `${headerHeight + stickyTop}px`;
      stickyItem.style.right = `${stickyItemRect.right}px`;
      stickyItem.style.width = `${stickyItem.offsetWidth}px`;
    } else if (scrollY > stickyItemBottom) {
      stickyItem.style.position = "relative";
      stickyItem.style.bottom = `${headerHeight + stickyTop}px`;
      stickyItem.style.top = "auto";
      stickyItem.style.right = `${stickyItemRect.left}px`;
      stickyItem.style.width = `${stickyItem.offsetWidth}px`;
    } else {
      stickyItem.style.position = "relative";
      stickyItem.style.bottom = "auto";
      stickyItem.style.top = "0px";
      stickyItem.style.right = "0px";
      stickyItem.style.width = "auto";
    }
  };

  window.addEventListener("scroll", handleScroll);
});
};

if ("scroll" in window) { handleStickyElements(); } });