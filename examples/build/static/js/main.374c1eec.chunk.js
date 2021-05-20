(this.webpackJsonpexample = this.webpackJsonpexample || []).push([
  [0],
  {
    1065: function (e, t) {},
    1161: function (e, t) {},
    1175: function (e, t) {},
    1177: function (e, t) {},
    1209: function (e, t) {},
    1211: function (e, t) {},
    1218: function (e, t) {},
    1219: function (e, t) {},
    1380: function (e, t) {},
    1381: function (e, t, n) {
      var r = { "./bls.js": 649, "./bls_c.js": 650 };
      function a(e) {
        var t = o(e);
        return n(t);
      }
      function o(e) {
        if (!n.o(r, e)) {
          var t = new Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        return r[e];
      }
      (a.keys = function () {
        return Object.keys(r);
      }),
        (a.resolve = o),
        (e.exports = a),
        (a.id = 1381);
    },
    1384: function (e, t) {},
    1440: function (e, t, n) {
      "use strict";
      n.r(t);
      var r = n(0),
        a = n.n(r),
        o = n(665),
        c = n.n(o),
        i = n(1460),
        s = n(73),
        u = n(8),
        l = Object(r.createContext)(null),
        h = function (e, t) {
          return (h =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            })(e, t);
        };
      function f(e, t) {
        if ("function" !== typeof t && null !== t)
          throw new TypeError(
            "Class extends value " +
              String(t) +
              " is not a constructor or null",
          );
        function n() {
          this.constructor = e;
        }
        h(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((n.prototype = t.prototype), new n()));
      }
      var b = function () {
        return (b =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var a in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return e;
          }).apply(this, arguments);
      };
      function d(e, t, n, r) {
        return new (n || (n = Promise))(function (a, o) {
          function c(e) {
            try {
              s(r.next(e));
            } catch (t) {
              o(t);
            }
          }
          function i(e) {
            try {
              s(r.throw(e));
            } catch (t) {
              o(t);
            }
          }
          function s(e) {
            var t;
            e.done
              ? a(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t);
                    })).then(c, i);
          }
          s((r = r.apply(e, t || [])).next());
        });
      }
      function j(e, t) {
        var n,
          r,
          a,
          o,
          c = {
            label: 0,
            sent: function () {
              if (1 & a[0]) throw a[1];
              return a[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (o = { next: i(0), throw: i(1), return: i(2) }),
          "function" === typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this;
            }),
          o
        );
        function i(o) {
          return function (i) {
            return (function (o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; c; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (a =
                        2 & o[0]
                          ? r.return
                          : o[0]
                          ? r.throw || ((a = r.return) && a.call(r), 0)
                          : r.next) &&
                      !(a = a.call(r, o[1])).done)
                  )
                    return a;
                  switch (((r = 0), a && (o = [2 & o[0], a.value]), o[0])) {
                    case 0:
                    case 1:
                      a = o;
                      break;
                    case 4:
                      return c.label++, { value: o[1], done: !1 };
                    case 5:
                      c.label++, (r = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = c.ops.pop()), c.trys.pop();
                      continue;
                    default:
                      if (
                        !(a = (a = c.trys).length > 0 && a[a.length - 1]) &&
                        (6 === o[0] || 2 === o[0])
                      ) {
                        c = 0;
                        continue;
                      }
                      if (3 === o[0] && (!a || (o[1] > a[0] && o[1] < a[3]))) {
                        c.label = o[1];
                        break;
                      }
                      if (6 === o[0] && c.label < a[1]) {
                        (c.label = a[1]), (a = o);
                        break;
                      }
                      if (a && c.label < a[2]) {
                        (c.label = a[2]), c.ops.push(o);
                        break;
                      }
                      a[2] && c.ops.pop(), c.trys.pop();
                      continue;
                  }
                  o = t.call(e, c);
                } catch (i) {
                  (o = [6, i]), (r = 0);
                } finally {
                  n = a = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, i]);
          };
        }
      }
      var p,
        O = (function (e) {
          function t(t) {
            var n = this;
            return (
              console.log("ReactMoralisError", t),
              ((n = e.call(this, "[react-moralis]: " + t) || this).name =
                "ReactMoralisError"),
              (n.message = t),
              n
            );
          }
          return f(t, e), (t.isReactMoraliserrpr = !0), t;
        })(Error),
        v = (function (e) {
          function t(t) {
            var n = e.call(this, t) || this;
            return (n.name = "NoMoralisContextProviderError"), n;
          }
          return f(t, e), t;
        })(O),
        g = (function (e) {
          function t(t) {
            var n = e.call(this, t) || this;
            return (n.name = "NotAuthenticatedError"), n;
          }
          return f(t, e), t;
        })(O),
        y = (function (e) {
          function t(t) {
            var n = e.call(this, t) || this;
            return (n.name = "ValidationError"), n;
          }
          return f(t, e), t;
        })(O),
        m = function () {
          var e = Object(r.useContext)(l);
          if (!e)
            throw new v(
              "Make sure to only call useMoralis within a  <MoralisProvider>",
            );
          return e;
        },
        x = function (e, t) {
          console.log({ data: e });
          var n = e.password,
            r = e.email,
            a = e.username,
            o = (function (e, t) {
              var n = {};
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) &&
                  t.indexOf(r) < 0 &&
                  (n[r] = e[r]);
              if (
                null != e &&
                "function" === typeof Object.getOwnPropertySymbols
              ) {
                var a = 0;
                for (r = Object.getOwnPropertySymbols(e); a < r.length; a++)
                  t.indexOf(r[a]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(e, r[a]) &&
                    (n[r[a]] = e[r[a]]);
              }
              return n;
            })(e, ["password", "email", "username"]);
          if (void 0 !== n) {
            if ("string" !== typeof n)
              throw new y("password can only be a string type");
            var c = t.setPassword(n);
            console.log("1", c);
          }
          if (void 0 !== r) {
            if ("string" !== typeof r)
              throw new y("email can only be a string type");
            c = t.setEmail(r);
            console.log("2", c);
          }
          if (void 0 !== a) {
            if ("string" !== typeof a)
              throw new y("username can only be a string type");
            c = t.setUsername(a);
            console.log("3", c);
          }
          console.log("nonSensitiveData", o),
            Object.entries(o)
              .filter(function (e) {
                return void 0 !== e[1];
              })
              .forEach(function (e) {
                var n = e[0],
                  r = e[1];
                t.set(n, r);
              });
        };
      !(function (e) {
        (e.UNAUTHENTICATED = "unauthenticated"),
          (e.AUTHENTICATED = "authenticated"),
          (e.AUTHENTICATING = "authenticating"),
          (e.LOGGING_OUT = "logging_out"),
          (e.ERROR = "error");
      })(p || (p = {}));
      var T = { state: p.UNAUTHENTICATED, error: null },
        w = {},
        E = function (e) {
          var t = e.children,
            n = e.appId,
            a = e.jsKey,
            o = e.dangerouslyUseOfMasterKey,
            c = e.serverUrl,
            i = e.options,
            h = (void 0 === i ? {} : i).onAccountChanged,
            f = (function (e) {
              var t = e.appId,
                n = e.serverUrl,
                a = e.jsKey,
                o = e.dangerouslyUseOfMasterKey,
                c = Object(r.useState)(!1),
                i = c[0],
                u = c[1];
              return (
                Object(r.useEffect)(
                  function () {
                    if (!t || !n)
                      throw new O("Provide a valid key  <MoralisProvider>. ");
                    i ||
                      (s.Moralis.initialize(t, a, o),
                      (s.Moralis.serverURL = n),
                      u(!0));
                  },
                  [t, n, i],
                ),
                { isInitialized: i }
              );
            })({
              appId: n,
              serverUrl: c,
              jsKey: a,
              dangerouslyUseOfMasterKey: o,
            }),
            v = (function (e) {
              var t = b(b({}, w), e),
                n = t.onAccountChanged,
                a = t.authType,
                o = Object(r.useState)(T),
                c = o[0],
                i = o[1],
                u = Object(r.useState)(!1),
                l = u[0],
                h = u[1],
                f = Object(r.useCallback)(
                  function (e) {
                    var t = void 0 === e ? {} : e,
                      n = t.onComplete,
                      r = t.onError,
                      o = t.onSuccess;
                    return d(void 0, void 0, void 0, function () {
                      var e;
                      return j(this, function (t) {
                        switch (t.label) {
                          case 0:
                            i({ state: p.AUTHENTICATING, error: null }),
                              (t.label = 1);
                          case 1:
                            return (
                              t.trys.push([1, 3, 4, 5]),
                              [
                                4,
                                s.Moralis.Web3.authenticate(
                                  a ? { type: a } : void 0,
                                ),
                              ]
                            );
                          case 2:
                            return (
                              t.sent(),
                              i({ state: p.AUTHENTICATED, error: null }),
                              o && o(),
                              [3, 5]
                            );
                          case 3:
                            return (
                              (e = t.sent()),
                              i({ state: p.ERROR, error: e }),
                              r && r(e),
                              [3, 5]
                            );
                          case 4:
                            return n && n(), [7];
                          case 5:
                            return [2];
                        }
                      });
                    });
                  },
                  [a],
                ),
                O = Object(r.useCallback)(function (e, t, n, r) {
                  return (
                    void 0 === r && (r = {}),
                    d(void 0, void 0, void 0, function () {
                      var a, o;
                      return j(this, function (c) {
                        switch (c.label) {
                          case 0:
                            i({ state: p.AUTHENTICATING, error: null }),
                              (a = new s.Moralis.User()),
                              x(
                                b({ username: e, password: t, email: n }, r),
                                a,
                              ),
                              (c.label = 1);
                          case 1:
                            return c.trys.push([1, 3, , 4]), [4, a.signUp()];
                          case 2:
                            return (
                              c.sent(),
                              i({ state: p.AUTHENTICATED, error: null }),
                              [3, 4]
                            );
                          case 3:
                            return (
                              (o = c.sent()),
                              i({ state: p.ERROR, error: o }),
                              [3, 4]
                            );
                          case 4:
                            return [2];
                        }
                      });
                    })
                  );
                }, []),
                v = Object(r.useCallback)(function (e, t, n) {
                  return d(void 0, void 0, void 0, function () {
                    var r;
                    return j(this, function (a) {
                      switch (a.label) {
                        case 0:
                          i({ state: p.AUTHENTICATING, error: null }),
                            (a.label = 1);
                        case 1:
                          return (
                            a.trys.push([1, 3, , 4]),
                            [
                              4,
                              s.Moralis.User.logIn(e, t, {
                                usePost:
                                  null === n || void 0 === n
                                    ? void 0
                                    : n.usePost,
                              }),
                            ]
                          );
                        case 2:
                          return (
                            a.sent(),
                            i({ state: p.AUTHENTICATED, error: null }),
                            [3, 4]
                          );
                        case 3:
                          return (
                            (r = a.sent()),
                            i({ state: p.ERROR, error: r }),
                            [3, 4]
                          );
                        case 4:
                          return [2];
                      }
                    });
                  });
                }, []),
                g = Object(r.useCallback)(function () {
                  return d(void 0, void 0, void 0, function () {
                    var e;
                    return j(this, function (t) {
                      switch (t.label) {
                        case 0:
                          i({ state: p.AUTHENTICATING, error: null }),
                            (t.label = 1);
                        case 1:
                          return (
                            t.trys.push([1, 3, , 4]),
                            [4, s.Moralis.User.logOut()]
                          );
                        case 2:
                          return t.sent(), i(T), [3, 4];
                        case 3:
                          return (
                            (e = t.sent()),
                            i({ state: p.ERROR, error: e }),
                            [3, 4]
                          );
                        case 4:
                          return [2];
                      }
                    });
                  });
                }, []);
              Object(r.useEffect)(function () {
                try {
                  s.Moralis.User.current() &&
                    i({ state: p.AUTHENTICATED, error: null });
                } catch (e) {}
              }, []),
                Object(r.useEffect)(
                  function () {
                    l
                      ? console.warn(
                          "cannot change onAccountChange once its set",
                        )
                      : (window.ethereum.on("accountsChanged", function (e) {
                          return d(void 0, void 0, void 0, function () {
                            var t;
                            return j(this, function (r) {
                              return (t = e[0]), n && n(t), [2];
                            });
                          });
                        }),
                        h(!0));
                  },
                  [l],
                );
              var y = c.state === p.AUTHENTICATED,
                m = c.state === p.UNAUTHENTICATED,
                E = c.state === p.AUTHENTICATING,
                A = c.state === p.ERROR,
                U = c.state === p.LOGGING_OUT;
              return {
                auth: c,
                authenticate: f,
                signup: O,
                login: v,
                logout: g,
                authError: c.error,
                isAuthenticated: y,
                isUnauthenticated: m,
                isAuthenticating: E,
                hasAuthError: A,
                isLoggingOut: U,
              };
            })({ onAccountChanged: h }),
            y = (function (e) {
              var t = Object(r.useState)(null),
                n = t[0],
                a = t[1],
                o = Object(r.useCallback)(function () {
                  return d(void 0, void 0, void 0, function () {
                    var e, t;
                    return j(this, function (r) {
                      switch (r.label) {
                        case 0:
                          if (n) return [3, 4];
                          r.label = 1;
                        case 1:
                          return (
                            r.trys.push([1, 3, , 4]),
                            [4, s.Moralis.Web3.enable()]
                          );
                        case 2:
                          return (e = r.sent()), a(e), [3, 4];
                        case 3:
                          return (
                            (t = r.sent()),
                            console.error(
                              "[react-moralis]: Failed to enable web3",
                              t,
                            ),
                            [3, 4]
                          );
                        case 4:
                          return [2];
                      }
                    });
                  });
                }, []);
              return (
                Object(r.useEffect)(
                  function () {
                    e && o();
                  },
                  [e],
                ),
                { enableWeb3: o, web3: n }
              );
            })(v.isAuthenticated),
            m = (function (e) {
              var t = Object(r.useState)(null),
                n = t[0],
                a = t[1],
                o = Object(r.useState)(!1),
                c = o[0],
                i = o[1],
                u = Object(r.useState)(null),
                l = u[0],
                h = u[1];
              return (
                Object(r.useEffect)(
                  function () {
                    if (e.state === p.AUTHENTICATED) {
                      var t = s.Moralis.User.current();
                      a(null !== t && void 0 !== t ? t : null);
                    } else a(null);
                  },
                  [e],
                ),
                {
                  setUserData: Object(r.useCallback)(
                    function (t) {
                      return d(void 0, void 0, void 0, function () {
                        var r, o, c;
                        return j(this, function (u) {
                          switch (u.label) {
                            case 0:
                              if (!n)
                                return (
                                  h(
                                    new g(
                                      "User needs to be authenticated before setting new data",
                                    ),
                                  ),
                                  [2]
                                );
                              i(!0), h(null), (u.label = 1);
                            case 1:
                              return (
                                u.trys.push([1, 3, 4, 5]),
                                x(t, n),
                                [4, n.save()]
                              );
                            case 2:
                              return (
                                (r = u.sent()),
                                console.log("aftersave", r),
                                (o = s.Moralis.User.current()),
                                console.log("currentUser", o),
                                o && e.state === p.AUTHENTICATED && a(o),
                                [3, 5]
                              );
                            case 3:
                              return (c = u.sent()), h(c), [3, 5];
                            case 4:
                              return i(!1), [7];
                            case 5:
                              return [2];
                          }
                        });
                      });
                    },
                    [n],
                  ),
                  user: n,
                  isUserUpdating: c,
                  userError: l,
                }
              );
            })(v.auth);
          return Object(u.jsx)(
            l.Provider,
            b(
              { value: b(b(b(b({ Moralis: s.Moralis }, f), v), m), y) },
              { children: t },
            ),
            void 0,
          );
        },
        A = n(1456),
        U = n(1454),
        C = n(1455),
        S = n(1461),
        I = n(1457),
        N = n(46),
        M = n(298),
        k = n(1462),
        R = n(290),
        D = n(1453),
        H = function (e) {
          return Object(u.jsx)(
            D.a,
            Object(R.a)(
              {
                display: "block",
                whiteSpace: "pre",
                overflowX: "auto",
                borderRadius: 4,
                p: 8,
                background: "blackAlpha.600",
              },
              e,
            ),
          );
        },
        P = n(19),
        _ = n(1459),
        G = [
          {
            path: "/authentication",
            label: "Authentication",
            component: function () {
              var e = m(),
                t = e.authenticate,
                n = e.user,
                r = e.authError,
                a = e.isAuthenticated,
                o = e.isAuthenticating,
                c = e.logout;
              return Object(u.jsx)("div", {
                children: Object(u.jsxs)(S.a, {
                  spacing: 6,
                  children: [
                    Object(u.jsx)(U.a, { children: "Authentication" }),
                    Object(u.jsx)(C.a, {
                      children: a
                        ? Object(u.jsx)(k.a, {
                            onClick: function () {
                              return c();
                            },
                            children: "Logout",
                          })
                        : Object(u.jsx)(k.a, {
                            onClick: function () {
                              return t();
                            },
                            children: "Authenticate",
                          }),
                    }),
                    Object(u.jsx)(H, {
                      children: JSON.stringify(
                        {
                          user: n,
                          isAuthenticated: a,
                          isAuthenticating: o,
                          authError: r,
                        },
                        null,
                        2,
                      ),
                    }),
                  ],
                }),
              });
            },
          },
          {
            path: "/login",
            label: "Login",
            component: function () {
              var e = Object(r.useState)(""),
                t = Object(P.a)(e, 2),
                n = t[0],
                a = t[1],
                o = Object(r.useState)(""),
                c = Object(P.a)(o, 2),
                i = c[0],
                s = c[1],
                l = Object(r.useState)(""),
                h = Object(P.a)(l, 2),
                f = h[0],
                b = h[1],
                d = m(),
                j = d.signup,
                p = d.login,
                O = d.user,
                v = d.authError,
                g = d.isAuthenticated,
                y = d.isAuthenticating;
              return Object(u.jsx)("div", {
                children: Object(u.jsxs)(S.a, {
                  spacing: 6,
                  children: [
                    Object(u.jsxs)(S.a, {
                      spacing: 6,
                      direction: "row",
                      align: "stretch",
                      children: [
                        Object(u.jsxs)(C.a, {
                          flex: 1,
                          children: [
                            Object(u.jsx)(U.a, { children: "Sign up" }),
                            Object(u.jsx)("form", {
                              onSubmit: function (e) {
                                e.preventDefault(), j(n, i, n, { phone: f });
                              },
                              children: Object(u.jsxs)(S.a, {
                                spacing: 6,
                                children: [
                                  Object(u.jsx)(_.a, {
                                    value: n,
                                    onChange: function (e) {
                                      return a(e.currentTarget.value);
                                    },
                                    placeholder: "mail",
                                  }),
                                  Object(u.jsx)(_.a, {
                                    type: "password",
                                    value: i,
                                    onChange: function (e) {
                                      return s(e.currentTarget.value);
                                    },
                                    placeholder: "password",
                                  }),
                                  Object(u.jsx)(_.a, {
                                    type: "phone",
                                    value: f,
                                    onChange: function (e) {
                                      return b(e.currentTarget.value);
                                    },
                                    placeholder: "phone",
                                  }),
                                  Object(u.jsx)(k.a, {
                                    type: "submit",
                                    colorScheme: "green",
                                    children: "Sign up",
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                        Object(u.jsxs)(C.a, {
                          flex: 1,
                          children: [
                            Object(u.jsx)(U.a, { children: "Log in" }),
                            Object(u.jsx)("form", {
                              onSubmit: function (e) {
                                e.preventDefault(), p(n, i);
                              },
                              children: Object(u.jsxs)(S.a, {
                                spacing: 6,
                                children: [
                                  Object(u.jsx)(_.a, {
                                    value: n,
                                    onChange: function (e) {
                                      return a(e.currentTarget.value);
                                    },
                                    placeholder: "mail",
                                  }),
                                  Object(u.jsx)(_.a, {
                                    type: "password",
                                    value: i,
                                    onChange: function (e) {
                                      return s(e.currentTarget.value);
                                    },
                                    placeholder: "password",
                                  }),
                                  Object(u.jsx)(k.a, {
                                    type: "submit",
                                    colorScheme: "green",
                                    children: "Login",
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    Object(u.jsx)(H, {
                      children: JSON.stringify(
                        {
                          user: O,
                          isAuthenticated: g,
                          isAuthenticating: y,
                          authError: v,
                        },
                        null,
                        2,
                      ),
                    }),
                  ],
                }),
              });
            },
          },
          {
            path: "/user",
            label: "User",
            component: function () {
              var e = m(),
                t = e.user,
                n = e.userError,
                a = e.isUserUpdating,
                o = e.setUserData,
                c = Object(r.useState)(t.email),
                i = Object(P.a)(c, 2),
                s = i[0],
                l = i[1],
                h = Object(r.useState)(""),
                f = Object(P.a)(h, 2),
                b = f[0],
                d = f[1],
                j = Object(r.useState)(""),
                p = Object(P.a)(j, 2),
                O = p[0],
                v = p[1],
                g = Object(r.useState)(""),
                y = Object(P.a)(g, 2),
                x = y[0],
                T = y[1];
              return Object(u.jsx)("div", {
                children: Object(u.jsxs)(S.a, {
                  spacing: 6,
                  children: [
                    Object(u.jsx)(U.a, { children: "User" }),
                    Object(u.jsx)(C.a, {
                      maxWidth: 500,
                      children: Object(u.jsx)("form", {
                        onSubmit: function (e) {
                          e.preventDefault(),
                            console.log("update user"),
                            o({ email: s, password: b, phone: O, username: x });
                        },
                        children: Object(u.jsxs)(S.a, {
                          spacing: 6,
                          children: [
                            Object(u.jsx)(_.a, {
                              value: s,
                              onChange: function (e) {
                                return l(e.currentTarget.value);
                              },
                              placeholder: "email",
                            }),
                            Object(u.jsx)(_.a, {
                              value: x,
                              onChange: function (e) {
                                return T(e.currentTarget.value);
                              },
                              placeholder: "username",
                            }),
                            Object(u.jsx)(_.a, {
                              type: "password",
                              value: b,
                              onChange: function (e) {
                                return d(e.currentTarget.value);
                              },
                              placeholder: "password",
                            }),
                            Object(u.jsx)(_.a, {
                              type: "phone",
                              value: O,
                              onChange: function (e) {
                                return v(e.currentTarget.value);
                              },
                              placeholder: "phone",
                            }),
                            Object(u.jsx)(k.a, {
                              type: "submit",
                              colorScheme: "green",
                              disabled: a,
                              children: "Update user",
                            }),
                          ],
                        }),
                      }),
                    }),
                    Object(u.jsx)(H, {
                      children: JSON.stringify(
                        {
                          user: t,
                          userError: {
                            name: n && n.name,
                            message: n && n.message,
                          },
                          isUserUpdating: a,
                        },
                        null,
                        2,
                      ),
                    }),
                  ],
                }),
              });
            },
          },
        ];
      var L = function () {
          var e = Object(N.g)();
          return Object(u.jsxs)(A.a, {
            my: 8,
            maxW: "container.lg",
            children: [
              Object(u.jsx)(U.a, {
                as: "h1",
                size: "4xl",
                children: "react-moralis examples",
              }),
              Object(u.jsx)(C.a, {
                mt: 6,
                mb: 12,
                children: Object(u.jsx)(S.a, {
                  direction: "row",
                  children: G.map(function (t) {
                    var n = t.label,
                      r = t.path;
                    return Object(u.jsx)(I.a, {
                      as: M.b,
                      to: r,
                      colorScheme: "green",
                      ml: "1",
                      fontSize: "1.1em",
                      variant: e.pathname === r ? "solid" : "subtle",
                      children: n,
                    });
                  }),
                }),
              }),
              Object(u.jsx)(C.a, {
                children: Object(u.jsxs)(N.d, {
                  children: [
                    G.map(function (e) {
                      var t = e.path,
                        n = e.component;
                      return Object(u.jsx)(
                        N.b,
                        { path: t, exact: !0, children: Object(u.jsx)(n, {}) },
                        t,
                      );
                    }),
                    Object(u.jsx)(N.b, {
                      path: "*",
                      children: Object(u.jsx)(N.a, { to: G[0].path }),
                    }),
                  ],
                }),
              }),
            ],
          });
        },
        K = function (e) {
          e &&
            e instanceof Function &&
            n
              .e(3)
              .then(n.bind(null, 1463))
              .then(function (t) {
                var n = t.getCLS,
                  r = t.getFID,
                  a = t.getFCP,
                  o = t.getLCP,
                  c = t.getTTFB;
                n(e), r(e), a(e), o(e), c(e);
              });
        },
        B = n(1458),
        F = Object(B.a)({
          config: { initialColorMode: "dark" },
          components: {
            Input: { defaultProps: { variant: "filled" } },
            Button: { defaultProps: { colorScheme: "green" } },
            Heading: { baseStyle: { marginBottom: "0.5em" } },
          },
        });
      c.a.render(
        Object(u.jsx)(a.a.StrictMode, {
          children: Object(u.jsx)(M.a, {
            children: Object(u.jsx)(i.a, {
              theme: F,
              children: Object(u.jsx)(E, {
                appId: "9OIwyKcaHzrJYQsgn8EjEjHCrv6VC4Bk4S7BwOSx",
                serverUrl: "https://m1850rtikewe.moralis.io:2053/server",
                children: Object(u.jsx)(L, {}),
              }),
            }),
          }),
        }),
        document.getElementById("root"),
      ),
        K();
    },
    913: function (e, t) {},
    915: function (e, t) {},
    924: function (e, t) {},
    926: function (e, t) {},
    952: function (e, t) {},
    953: function (e, t) {},
    958: function (e, t) {},
    960: function (e, t) {},
    967: function (e, t) {},
    986: function (e, t) {},
  },
  [[1440, 1, 2]],
]);
//# sourceMappingURL=main.374c1eec.chunk.js.map
