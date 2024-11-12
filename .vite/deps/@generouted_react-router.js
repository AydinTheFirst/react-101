import {
  require_jsx_runtime
} from "./chunk-UJ65IDVR.js";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation
} from "./chunk-IAFLMEO7.js";
import "./chunk-7XA4PLQE.js";
import {
  __toESM,
  require_react
} from "./chunk-BMKNQQUQ.js";

// node_modules/.pnpm/@generouted+react-router@1.19.9_react-router-dom@6.28.0_react-dom@18.3.1_react@18.3.1__react@_u5ellt2lvvspf7zthjvzxcvi7y/node_modules/@generouted/react-router/dist/chunk-5TYDCGKA.js
var patterns = {
  route: [/^.*\/src\/pages\/|\.(jsx|tsx|mdx)$/g, ""],
  splat: [/\[\.{3}\w+\]/g, "*"],
  param: [/\[([^\]]+)\]/g, ":$1"],
  slash: [/^index$|\./g, "/"],
  optional: [/^-(:?[\w-]+|\*)/, "$1?"]
};
var generatePreservedRoutes = (files) => {
  return Object.keys(files).reduce((routes2, key) => {
    const path = key.replace(...patterns.route);
    return { ...routes2, [path]: files[key] };
  }, {});
};
var generateRegularRoutes = (files, buildRoute) => {
  const filteredRoutes = Object.keys(files).filter((key) => !key.includes("/_") || /_layout\.(jsx|tsx)$/.test(key));
  return filteredRoutes.reduce((routes2, key) => {
    const module = files[key];
    const route = { id: key.replace(...patterns.route), ...buildRoute(module, key) };
    const segments = key.replace(...patterns.route).replace(...patterns.splat).replace(...patterns.param).split("/").filter(Boolean);
    segments.reduce((parent, segment, index) => {
      var _a;
      const path = segment.replace(...patterns.slash).replace(...patterns.optional);
      const root = index === 0;
      const leaf = index === segments.length - 1 && segments.length > 1;
      const node = !root && !leaf;
      const layout = segment === "_layout";
      const group = /\([\w-]+\)/.test(path);
      const insert = /^\w|\//.test(path) ? "unshift" : "push";
      if (root) {
        const last = segments.length === 1;
        if (last) {
          routes2.push({ path, ...route });
          return parent;
        }
      }
      if (root || node) {
        const current = root ? routes2 : parent.children;
        const found = current == null ? void 0 : current.find((route2) => {
          var _a2;
          return route2.path === path || ((_a2 = route2.id) == null ? void 0 : _a2.replace("/_layout", "").endsWith(path));
        });
        const props = group ? (route == null ? void 0 : route.component) ? { id: path, path: "/" } : { id: path } : { path };
        if (found) found.children ?? (found.children = []);
        else current == null ? void 0 : current[insert]({ ...props, children: [] });
        return found || (current == null ? void 0 : current[insert === "unshift" ? 0 : current.length - 1]);
      }
      if (layout) {
        return Object.assign(parent, route);
      }
      if (leaf) {
        (_a = parent == null ? void 0 : parent.children) == null ? void 0 : _a[insert]((route == null ? void 0 : route.index) ? route : { path, ...route });
      }
      return parent;
    }, {});
    return routes2;
  }, []);
};
var generateModalRoutes = (files) => {
  return Object.keys(files).reduce((modals, key) => {
    var _a;
    const path = key.replace(...patterns.route).replace(/\+|\([\w-]+\)\//g, "").replace(/(\/)?index/g, "").replace(/\./g, "/");
    return { ...modals, [`/${path}`]: (_a = files[key]) == null ? void 0 : _a.default };
  }, {});
};

// node_modules/.pnpm/@generouted+react-router@1.19.9_react-router-dom@6.28.0_react-dom@18.3.1_react@18.3.1__react@_u5ellt2lvvspf7zthjvzxcvi7y/node_modules/@generouted/react-router/dist/chunk-DZAGGWNQ.js
var import_react = __toESM(require_react(), 1);

// node_modules/.pnpm/@generouted+react-router@1.19.9_react-router-dom@6.28.0_react-dom@18.3.1_react@18.3.1__react@_u5ellt2lvvspf7zthjvzxcvi7y/node_modules/@generouted/react-router/dist/index.js
var import_react2 = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var PRESERVED = import.meta.glob("/src/pages/(_app|404).{jsx,tsx}", { eager: true });
var MODALS = import.meta.glob("/src/pages/**/[+]*.{jsx,tsx}", { eager: true });
var ROUTES = import.meta.glob(
  ["/src/pages/**/[\\w[-]*.{jsx,tsx,mdx}", "!/src/pages/**/(_!(layout)*(/*)?|_app|404)*"],
  { eager: true }
);
var preservedRoutes = generatePreservedRoutes(PRESERVED);
var modalRoutes = generateModalRoutes(MODALS);
var regularRoutes = generateRegularRoutes(ROUTES, (module, key) => {
  const index = /index\.(jsx|tsx|mdx)$/.test(key) && !key.includes("pages/index") ? { index: true } : {};
  const Default2 = (module == null ? void 0 : module.default) || import_react2.Fragment;
  const Page = () => (module == null ? void 0 : module.Pending) ? (0, import_jsx_runtime.jsx)(import_react2.Suspense, { fallback: (0, import_jsx_runtime.jsx)(module.Pending, {}), children: (0, import_jsx_runtime.jsx)(Default2, {}) }) : (0, import_jsx_runtime.jsx)(Default2, {});
  return { ...index, Component: Page, ErrorBoundary: module == null ? void 0 : module.Catch, loader: module == null ? void 0 : module.Loader, action: module == null ? void 0 : module.Action };
});
var _app = preservedRoutes == null ? void 0 : preservedRoutes["_app"];
var _404 = preservedRoutes == null ? void 0 : preservedRoutes["404"];
var Default = (_app == null ? void 0 : _app.default) || Outlet;
var Modals_ = () => {
  var _a;
  const Modal = modalRoutes[(_a = useLocation().state) == null ? void 0 : _a.modal] || import_react2.Fragment;
  return (0, import_jsx_runtime.jsx)(Modal, {});
};
var Layout = () => (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
  (0, import_jsx_runtime.jsx)(Default, {}),
  " ",
  (0, import_jsx_runtime.jsx)(Modals_, {})
] });
var App = () => (_app == null ? void 0 : _app.Pending) ? (0, import_jsx_runtime.jsx)(import_react2.Suspense, { fallback: (0, import_jsx_runtime.jsx)(_app.Pending, {}), children: (0, import_jsx_runtime.jsx)(Layout, {}) }) : (0, import_jsx_runtime.jsx)(Layout, {});
var app = { Component: (_app == null ? void 0 : _app.default) ? App : Layout, ErrorBoundary: _app == null ? void 0 : _app.Catch, loader: _app == null ? void 0 : _app.Loader };
var fallback = { path: "*", Component: (_404 == null ? void 0 : _404.default) || import_react2.Fragment };
var routes = [{ ...app, children: [...regularRoutes, fallback] }];
var router;
var createRouter = () => (router ?? (router = createBrowserRouter(routes)), router);
var Routes = () => (0, import_jsx_runtime.jsx)(RouterProvider, { router: createRouter() });
var Modals = () => (console.warn("[generouted] `<Modals />` will be removed in future releases"), null);
export {
  Modals,
  Routes,
  routes
};
//# sourceMappingURL=@generouted_react-router.js.map
