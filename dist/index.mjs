// src/image_map/ImageMap.jsx
import React3, { useState as useState3, useRef as useRef2 } from "react";
import ReactSelect from "react-select";

// src/image_map/Polygon.jsx
import React, { useState, useRef } from "react";
var Polygon = ({ title, points, x, y, width, height, fillColor, opacity, hoverFillColor, hoveredOpacity, onMouseEnter, onMouseLeave, onClick: onClick2 }) => {
  const state = useRef(0);
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
  const [hovered, setHovered] = useState(false);
  return /* @__PURE__ */ React.createElement(
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
    /* @__PURE__ */ React.createElement(
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
import React2, { useState as useState2, useImperativeHandle } from "react";
var Tooltip = ({ ref }) => {
  const [text, setText] = useState2("");
  const [pos, setPos] = useState2({ x: 0, y: 0 });
  useImperativeHandle(ref, () => ({
    setText
  }));
  const handleMouseMove = (e) => {
    setPos({ x: e.clientX, y: e.clientY });
  };
  document.addEventListener("mousemove", handleMouseMove);
  return text != "" && /* @__PURE__ */ React2.createElement("div", { style: {
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
  } }, /* @__PURE__ */ React2.createElement("div", { style: { position: "absolute", left: "50%", top: "100%", marginLeft: "-8px", marginTop: "0", width: "0", height: "0", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "8px solid black" } }), /* @__PURE__ */ React2.createElement("p", { style: { color: "#ffffff", margin: "0px" } }, text));
};
var Tooltip_default = Tooltip;

// src/image_map/ImageMap.jsx
var ImageMap = (config) => {
  const tooltipRef = useRef2();
  const [artboard, setArtboard] = useState3(config.map.artboards[0]);
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
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("div", { style: { position: "absolute" } }, /* @__PURE__ */ React3.createElement(Tooltip_default, { ref: tooltipRef }), config.map.artboards.length > 1 && /* @__PURE__ */ React3.createElement("div", { className: "artboard-selector", style: {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 10
  } }, /* @__PURE__ */ React3.createElement(
    ReactSelect,
    {
      onChange: handleChange,
      options: selectOptions,
      defaultValue: selectOptions[0],
      id: "artboard-selector",
      isClearable: false,
      isSearchable: false
    }
  )), /* @__PURE__ */ React3.createElement("img", { src: artboard.image_url, style: { position: "relative" } }), /* @__PURE__ */ React3.createElement("div", { style: { position: "absolute", left: 0, top: 0, width: "100%", height: "100%", zIndex: 2 } }, artboard.children.map((child) => {
    let points = child.points.map((p) => `${p.x},${p.y}`).join(" ");
    return /* @__PURE__ */ React3.createElement(
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
export {
  ImageMap_default as ImageMap
};
