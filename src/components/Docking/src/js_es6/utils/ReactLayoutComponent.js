function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import LayoutManager from "../LayoutManager";
/**
 * Far from cryptographically secure, but good enough to avoid component naming collisions.
 */

function randomString() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function translateConfig(config, componentMap) {
  if (config.component) {
    var componentName = "".concat(config.component.key || config.component.name, "_").concat(randomString());
    componentMap[componentName] = config.component;
    return _objectSpread({}, config, {
      type: "react-component",
      component: componentName
    });
  }

  return _objectSpread({}, config, {
    content: config.content.map(function (item) {
      return translateConfig(item, componentMap);
    })
  });
}
/**
 * Quick and dirty hash function for determining quickly determining config file changes.
 * https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 */


function hash(s) {
  return s.split('').reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
}

export default function ReactLayoutComponent(_ref) {
  var config = _ref.config,
      htmlAttrs = _ref.htmlAttrs,
      onLayoutReady = _ref.onLayoutReady,
      _ref$autoresize = _ref.autoresize,
      autoresize = _ref$autoresize === void 0 ? false : _ref$autoresize,
      _ref$debounceResize = _ref.debounceResize,
      debounceResize = _ref$debounceResize === void 0 ? 0 : _ref$debounceResize;
  var containerRef = useRef();

  var _useState = useState(new Set()),
      _useState2 = _slicedToArray(_useState, 2),
      panels = _useState2[0],
      setPanels = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      layoutManager = _useState4[0],
      setLayoutManager = _useState4[1]; // Equality almost never pass when passing in config object. Usually a new object is created.
  // This hash is a quick method of detecting actual config changes before heavy recreation of the layout.
  // TODO: This may not be optimal or most performant method to check for config changes.


  var _useState5 = useState(hash(JSON.stringify(config))),
      _useState6 = _slicedToArray(_useState5, 2),
      configHash = _useState6[0],
      setConfigHash = _useState6[1];

  useEffect(function () {
    var newHash = hash(JSON.stringify(config));

    if (newHash !== configHash) {
      setConfigHash(newHash);
    }
  }, [config]);
  useEffect(function () {
    var componentMap = {};
    var layoutManager = new LayoutManager(translateConfig(config, componentMap), containerRef.current);
    setLayoutManager(layoutManager);
    setPanels(new Set()); // these callbacks are used by ReactComponentHandler to bind
    // the goldenlayout component lifecycle to react

    layoutManager.reactContainer = {
      componentRender: function componentRender(panel) {
        setPanels(function (panels) {
          return panels.add(panel);
        });
      },
      componentDestroy: function componentDestroy(panel) {
        setPanels(function (panels) {
          var newPanels = new Set(panels);
          newPanels.delete(panel);
          return newPanels;
        });
      }
    };

    for (var component in componentMap) {
      layoutManager.registerComponent(component, componentMap[component]);
    }

    layoutManager.init();

    if (onLayoutReady) {
      onLayoutReady(layoutManager);
    }

    return function () {
      return layoutManager.destroy();
    };
  }, [configHash]); // Autoresize

  useEffect(function () {
    if (!autoresize) {
      return;
    }

    var resizeTimer;

    var resize = function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (layoutManager) {
          layoutManager.updateSize();
        }
      }, debounceResize);
    };

    window.addEventListener('resize', resize);
    return function () {
      return window.removeEventListener('resize', resize);
    };
  }, [autoresize, debounceResize, layoutManager]); // Default to filling parent container.

  var _ref2 = htmlAttrs || {},
      style = _ref2.style,
      restHtmlAttrs = _objectWithoutProperties(_ref2, ["style"]);

  style = _objectSpread({
    width: '100%',
    height: '100%'
  }, style || {});
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: containerRef
  }, restHtmlAttrs, {
    style: style
  }), Array.from(panels).map(function (panel) {
    return /*#__PURE__*/ReactDOM.createPortal(panel._getReactComponent(), panel._container.getElement()[0]);
  }));
}