var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.jsx
var src_exports = {};
__export(src_exports, {
  ImageMap: () => ImageMap_default
});
module.exports = __toCommonJS(src_exports);

// src/image_map/ImageMap.jsx
var import_react3 = __toESM(require("react"));
var import_react_select = __toESM(require("react-select"));

// src/image_map/Polygon.jsx
var import_react = __toESM(require("react"));
var Polygon = ({ title, points, x, y, width, height, fillColor, opacity, hoverFillColor, hoveredOpacity, onMouseEnter, onMouseLeave, onClick: onClick2 }) => {
  const state = (0, import_react.useRef)(0);
  function hexToRgba(hex, opacity2) {
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity2})`;
  }
  const handleMouseEnter = (event) => {
    setHovered(true);
    if (onMouseEnter) {
      onMouseEnter(event);
    }
  };
  const handleMouseLeave = (event) => {
    setHovered(false);
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  };
  const [hovered, setHovered] = (0, import_react.useState)(false);
  return /* @__PURE__ */ import_react.default.createElement(
    "svg",
    {
      viewBox: "0 0 100 100",
      preserveAspectRatio: "none",
      style: {
        fill: hovered ? hexToRgba(hoverFillColor, hoveredOpacity) : hexToRgba(fillColor, opacity),
        left: x + "%",
        top: y + "%",
        width: width + "%",
        height: height + "%",
        position: "absolute"
      },
      "data-title": title
    },
    /* @__PURE__ */ import_react.default.createElement(
      "polygon",
      {
        points,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onClick: onClick2
      }
    )
  );
};
var Polygon_default = Polygon;

// src/image_map/Tooltip.jsx
var import_react2 = __toESM(require("react"));
var Tooltip = ({ ref }) => {
  const [text, setText] = (0, import_react2.useState)("");
  const [pos, setPos] = (0, import_react2.useState)({ x: 0, y: 0 });
  (0, import_react2.useImperativeHandle)(ref, () => ({
    setText
  }));
  const handleMouseMove = (e) => {
    setPos({ x: e.clientX, y: e.clientY });
  };
  document.addEventListener("mousemove", handleMouseMove);
  return text != "" && /* @__PURE__ */ import_react2.default.createElement("div", { style: {
    position: "fixed",
    zIndex: 1e3,
    backgroundColor: "rgb(34, 34, 34)",
    borderRadius: "10px",
    padding: "15px",
    color: "#ffffff",
    transform: "translate(-50%, calc(-100% - 10px))",
    left: pos.x,
    top: pos.y,
    pointerEvents: "none"
  } }, /* @__PURE__ */ import_react2.default.createElement("div", { style: { position: "absolute", left: "50%", top: "100%", marginLeft: "-8px", marginTop: "0", width: "0", height: "0", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "8px solid black" } }), /* @__PURE__ */ import_react2.default.createElement("p", { style: { color: "#ffffff", margin: "0px" } }, text));
};
var Tooltip_default = Tooltip;

// src/image_map/ImageMap.jsx
var ImageMap = (config) => {
  const tooltipRef = (0, import_react3.useRef)();
  const [artboard, setArtboard] = (0, import_react3.useState)(config.map.artboards[0]);
  config.map.artboards.forEach((artboard2) => {
    console.log(artboard2);
  });
  const selectOptions = config.map.artboards.map((artboard2) => ({
    value: artboard2.id,
    label: artboard2.title
  }));
  function handleChange(selectedOption) {
    const selectedArtboard = config.map.artboards.find((artboard2) => artboard2.id === selectedOption.value);
    setArtboard(selectedArtboard);
  }
  function handleMouseEnter(event) {
    console.log("enter: ");
    console.log(event.target.parentNode);
    const title = event.target.parentNode.getAttribute("data-title");
    if (title) {
      tooltipRef.current.setText(title);
    }
  }
  function handleMouseLeave(event) {
    const title = event.target.parentNode.getAttribute("data-title");
    console.log("leave: ");
    console.log(event.target.parentNode);
    if (title) {
      tooltipRef.current.setText("");
    }
  }
  function handleClick(event) {
    const title = event.target.parentNode.getAttribute("data-title");
    console.log("clicked ", title);
    if (onClick) {
      onClick(title);
    }
  }
  return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute" } }, /* @__PURE__ */ import_react3.default.createElement(Tooltip_default, { ref: tooltipRef }), config.map.artboards.length > 1 && /* @__PURE__ */ import_react3.default.createElement("div", { className: "artboard-selector", style: {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 10
  } }, /* @__PURE__ */ import_react3.default.createElement(
    import_react_select.default,
    {
      onChange: handleChange,
      options: selectOptions,
      defaultValue: selectOptions[0],
      id: "artboard-selector",
      isClearable: false,
      isSearchable: false
    }
  )), /* @__PURE__ */ import_react3.default.createElement("img", { src: artboard.image_url, style: { position: "relative" } }), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", left: 0, top: 0, width: "100%", height: "100%", zIndex: 2 } }, artboard.children.map((child) => {
    let points = child.points.map((p) => `${p.x},${p.y}`).join(" ");
    return /* @__PURE__ */ import_react3.default.createElement(
      Polygon_default,
      {
        key: child.id,
        title: child.title,
        points,
        x: child.x,
        y: child.y,
        width: child.width,
        height: child.height,
        fillColor: child.default_style.background_color,
        opacity: child.default_style.background_opacity,
        hoverFillColor: child.mouseover_style.background_color,
        hoveredOpacity: child.mouseover_style.background_opacity,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onClick: handleClick
      }
    );
  }))));
};
var ImageMap_default = ImageMap;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ImageMap
});
