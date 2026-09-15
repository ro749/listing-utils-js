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
  ImageMapPro: () => ImageMapPro_default,
  PlanGrid: () => PlanGrid_default
});
module.exports = __toCommonJS(src_exports);

// src/image_map/ImageMapPro.jsx
var import_react4 = __toESM(require("react"));

// src/image_map/ImageMap.jsx
var import_react3 = __toESM(require("react"));
var import_react_select = __toESM(require("react-select"));

// src/image_map/Polygon.jsx
var import_react = __toESM(require("react"));
var Polygon = ({ title, points, x, y, width, height, fillColor, opacity, hoverFillColor, hoveredOpacity, onMouseEnter, onMouseLeave, onClick }) => {
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
        onClick
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
var ImageMap = ({ config, onClick, selected }) => {
  console.log(config);
  const tooltipRef = (0, import_react3.useRef)();
  const [artboard, setArtboard] = (0, import_react3.useState)(config.map.artboards[0]);
  const selectOptions = config.map.artboards.map((artboard2) => ({
    value: artboard2.id,
    label: artboard2.title
  }));
  function handleChange(selectedOption) {
    const selectedArtboard = config.map.artboards.find((artboard2) => artboard2.id === selectedOption.value);
    setArtboard(selectedArtboard);
  }
  function handleMouseEnter(event) {
    const title = event.target.parentNode.getAttribute("data-title");
    if (title) {
      tooltipRef.current.setText(title);
    }
  }
  function handleMouseLeave(event) {
    const title = event.target.parentNode.getAttribute("data-title");
    if (title) {
      tooltipRef.current.setText("");
    }
  }
  function handleClick(event) {
    const title = event.target.parentNode.getAttribute("data-title");
    if (onClick) {
      onClick(title);
    }
  }
  return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ import_react3.default.createElement("img", { src: artboard.image_url, style: { position: "relative" } }), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", left: 0, top: 0, width: "100%", height: "100%", zIndex: 2 } }, /* @__PURE__ */ import_react3.default.createElement(Tooltip_default, { ref: tooltipRef }), config.map.artboards.length > 1 && /* @__PURE__ */ import_react3.default.createElement("div", { className: "artboard-selector", style: {
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
  )), artboard.children.map((child) => {
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
        fillColor: child.title === selected ? config.selected_color : child.default_style.background_color,
        opacity: child.default_style.background_opacity,
        hoverFillColor: child.title === selected ? config.selected_color : child.mouseover_style.background_color,
        hoveredOpacity: child.mouseover_style.background_opacity,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onClick: handleClick
      }
    );
  }))));
};
var ImageMap_default = ImageMap;

// src/image_map/ImageMapPro.jsx
var import_axios = __toESM(require("axios"));
var ImageMapPro = ({ config, onChange }) => {
  const [selected, setSelected] = (0, import_react4.useState)(null);
  function handleClick(title) {
    setSelected(title);
    import_axios.default.get("imagemappro/SingleImageMapPro/unit", { params: { unit: title } }).then((res) => {
      if (res.status === 200) {
        if (onChange) {
          onChange(res.data);
        }
      }
    });
  }
  return /* @__PURE__ */ import_react4.default.createElement(ImageMap_default, { config, onClick: handleClick, selected });
};
var ImageMapPro_default = ImageMapPro;

// src/plans/PlanGrid.jsx
var import_react15 = __toESM(require("react"));

// src/plans/Plan.jsx
var import_react14 = __toESM(require("react"));

// src/plans/PlanLine.jsx
var import_react5 = __toESM(require("react"));
var PlanLine = ({ item, price = 0, value = "", percent }) => {
  return /* @__PURE__ */ import_react5.default.createElement("tr", { className: "plan-line" }, /* @__PURE__ */ import_react5.default.createElement("td", { className: "right" }, item.text, ":"), /* @__PURE__ */ import_react5.default.createElement("td", { className: "center" }, typeof percent === "number" ? percent + "%" : item.percent != 0 ? item.percent + "%" : ""), /* @__PURE__ */ import_react5.default.createElement("td", { className: "left" }, price != 0 ? new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN"
  }).format(price) : value));
};
var PlanLine_default = PlanLine;

// src/plans/MonthsLine.jsx
var import_react6 = __toESM(require("react"));
var MonthsLine = ({ item, price }) => {
  return /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement(PlanLine_default, { item: item.line, price }), /* @__PURE__ */ import_react6.default.createElement(PlanLine_default, { item: item.months_line, value: item.months_line.amount }), /* @__PURE__ */ import_react6.default.createElement(PlanLine_default, { item: item.mensuality_line, price: price / item.months_line.amount }));
};
var MonthsLine_default = MonthsLine;

// src/plans/EditableLine.jsx
var import_react7 = __toESM(require("react"));
var import_shared_utils = require("shared-utils");
var import_shared_utils2 = require("shared-utils");
var EditableLine = ({ ref, form, item, price = 0, onChange }) => {
  const [percent, setPercent] = (0, import_react7.useState)(0);
  const editedValue = (0, import_react7.useRef)(true);
  (0, import_react7.useEffect)(() => {
    if (editedValue.current) {
      const newPercent = form.getFieldValue("fill_" + item.id) / price * 100;
      setPercent(newPercent);
    } else {
      const newMoney = price * percent / 100;
      form.setFieldValue("fill_" + item.id, newMoney);
    }
  }, [price]);
  function onChangePercent(val) {
    editedValue.current = false;
    setPercent(val);
    const moneyValue = price * val / 100;
    form.setFieldValue("fill_" + item.id, moneyValue);
    if (onChange) {
      onChange(moneyValue);
    }
  }
  function onChangeMoney(val) {
    editedValue.current = true;
    setPercent(val / price * 100);
    if (onChange) {
      onChange(val);
    }
  }
  return /* @__PURE__ */ import_react7.default.createElement("tr", { className: "plan-line" }, /* @__PURE__ */ import_react7.default.createElement("td", { className: "right" }, item.text, ":"), /* @__PURE__ */ import_react7.default.createElement("td", { className: "center" }, /* @__PURE__ */ import_react7.default.createElement(import_shared_utils.PercentInput, { form, name: item.name, value: percent, onChange: onChangePercent })), /* @__PURE__ */ import_react7.default.createElement("td", { className: "left" }, /* @__PURE__ */ import_react7.default.createElement(
    form.Field,
    {
      name: "fill_" + item.id,
      children: (field) => {
        return /* @__PURE__ */ import_react7.default.createElement(
          import_shared_utils2.MoneyInput,
          {
            id: "fill_" + item.id,
            field,
            value: field.state.value,
            onChange: onChangeMoney
          }
        );
      }
    }
  )));
};
var EditableLine_default = EditableLine;

// src/plans/EditableMonths.jsx
var import_react8 = __toESM(require("react"));
var import_shared_utils3 = require("shared-utils");
var EditableMonths = ({ form, item, price }) => {
  const [mensuality, setMensuality] = (0, import_react8.useState)(0);
  function handleValueChange(value) {
    setMensuality(value / form.getFieldValue("fill_months_" + item.line.id));
  }
  function handleMonthsChange(value) {
    setMensuality(form.getFieldValue("fill_" + item.line.id) / value);
  }
  return /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, /* @__PURE__ */ import_react8.default.createElement(EditableLine_default, { form, item: item.line, price, onChange: handleValueChange }), /* @__PURE__ */ import_react8.default.createElement("tr", { className: "plan-line" }, /* @__PURE__ */ import_react8.default.createElement("td", { className: "right" }, item.months_line.text, ":"), /* @__PURE__ */ import_react8.default.createElement("td", { className: "center" }), /* @__PURE__ */ import_react8.default.createElement("td", { className: "left" }, /* @__PURE__ */ import_react8.default.createElement(
    form.Field,
    {
      name: "fill_months_" + item.line.id,
      children: (field) => {
        return /* @__PURE__ */ import_react8.default.createElement(
          import_shared_utils3.Input,
          {
            field,
            value: field.state.value,
            onChange: handleMonthsChange,
            type: "number"
          }
        );
      }
    }
  ))), /* @__PURE__ */ import_react8.default.createElement("tr", { className: "plan-line" }, /* @__PURE__ */ import_react8.default.createElement("td", { className: "right" }, item.mensuality_line.text, ":"), /* @__PURE__ */ import_react8.default.createElement("td", { className: "center" }), /* @__PURE__ */ import_react8.default.createElement("td", { className: "left" }, /* @__PURE__ */ import_react8.default.createElement(
    import_shared_utils3.MoneyInput,
    {
      value: mensuality
    }
  ))));
};
var EditableMonths_default = EditableMonths;

// src/plans/Plan.jsx
var import_react_form = require("@tanstack/react-form");

// src/plans/FillWithRestLine.jsx
var import_react9 = __toESM(require("react"));
var FillWithRestLine = ({ item, price = 0, values, fields, getPrice }) => {
  console.log("FillWithRestLine");
  var newFinalPrice = 0;
  var percent = 0;
  for (let i = 0; i < fields.length; i++) {
    newFinalPrice += parseFloat(values[fields[i]]);
  }
  newFinalPrice = price - newFinalPrice;
  getPrice(newFinalPrice);
  percent = newFinalPrice / price * 100;
  return /* @__PURE__ */ import_react9.default.createElement(PlanLine_default, { item, percent, price: newFinalPrice });
};
var FillWithRestLine_default = FillWithRestLine;

// src/sender/Sender.jsx
var import_react13 = __toESM(require("react"));

// unplugin-icons:~icons/iconamoon/link.jsx
var React10 = __toESM(require("react"));
var import_react10 = require("react");
var iconamoonLink = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React10.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React10.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React10.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h8M9 8H6a4 4 0 1 0 0 8h3m6-8h3a4 4 0 0 1 0 8h-3" }));
var ForwardRef = (0, import_react10.forwardRef)(iconamoonLink);
var link_default = ForwardRef;

// unplugin-icons:~icons/iconamoon/email.jsx
var React11 = __toESM(require("react"));
var import_react11 = require("react");
var iconamoonEmail = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React11.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React11.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React11.createElement("g", { fill: "none" }, /* @__PURE__ */ React11.createElement("path", { fill: "currentColor", d: "M3 5V4a1 1 0 0 0-1 1zm18 0h1a1 1 0 0 0-1-1zM3 6h18V4H3zm17-1v12h2V5zm-1 13H5v2h14zM4 17V5H2v12zm1 1a1 1 0 0 1-1-1H2a3 3 0 0 0 3 3zm15-1a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3z" }), /* @__PURE__ */ React11.createElement("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "m3 5l9 9l9-9" })));
var ForwardRef2 = (0, import_react11.forwardRef)(iconamoonEmail);
var email_default = ForwardRef2;

// unplugin-icons:~icons/ic/outline-whatsapp.jsx
var React12 = __toESM(require("react"));
var import_react12 = require("react");
var icOutlineWhatsapp = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React12.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React12.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React12.createElement("path", { fill: "currentColor", d: "M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" }));
var ForwardRef3 = (0, import_react12.forwardRef)(icOutlineWhatsapp);
var outline_whatsapp_default = ForwardRef3;

// src/sender/Sender.jsx
var import_shared_utils4 = require("shared-utils");
var import_axios2 = __toESM(require("axios"));
var Sender = ({ client, unit, form }) => {
  const [showDialog, setShowDialog] = (0, import_react13.useState)(0);
  const [sentDialogTitle, setSentDialogTitle] = (0, import_react13.useState)("");
  const [sentDialogMessage, setSentDialogMessage] = (0, import_react13.useState)("");
  const [link, setLink] = (0, import_react13.useState)("");
  const [linkWhatsapp, setLinkWhatsapp] = (0, import_react13.useState)("");
  function handleLinkClick() {
    setShowDialog(1);
  }
  function handleEmailClick() {
    setShowDialog(2);
  }
  function handleWhatsappClick() {
    setShowDialog(3);
  }
  function handleSend(sendMethod) {
    const formData = new FormData();
    formData.append("medium", sendMethod);
    formData.append("unit_id", unit.id);
    if (form && form.state.isDirty) {
      var values = form.state.values;
      Object.entries(values).forEach(([key, value]) => {
        formData.append("personal_plans['" + key + "']", value);
      });
    }
    import_axios2.default.post("sender", formData).then((response) => {
      setShowDialog(0);
      if (sendMethod === 0) {
        const isSafari = /^((?!chrome|android|crios).)*safari/i.test(navigator.userAgent);
        if (isSafari) {
          navigator.clipboard.writeText(response.data);
          setSentDialogTitle("Copie el enlace y abra WhatsApp para enviar cotizaci\xF3n.");
        } else {
          window.open("https://wa.me/52" + client.phone + "?text=" + response.data, "_blank");
          setSentDialogTitle("Whatsapp Enviado");
          setLink("Si la cotizaci\xF3n no se envi\xF3 favor de revisar los permisos del navegador.");
        }
      }
      if (sendMethod === 1) {
        setSentDialogTitle("Email Enviado a:");
        setLink(client.mail);
      }
      if (sendMethod === 2) {
        navigator.clipboard.writeText(response.data);
        setSentDialogTitle("Link copiado para:");
        setSentDialogMessage(client.name);
        setLink(response.data);
      }
    });
  }
  return /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, null, /* @__PURE__ */ import_react13.default.createElement("div", { style: { display: "flex", justifyContent: "center", gap: "6px" } }, client.mail !== void 0 && /* @__PURE__ */ import_react13.default.createElement("button", { className: "btn btn-light send-btn", onClick: handleEmailClick }, /* @__PURE__ */ import_react13.default.createElement(email_default, null), /* @__PURE__ */ import_react13.default.createElement("span", null, "Correo")), client.phone !== void 0 && /* @__PURE__ */ import_react13.default.createElement("button", { className: "btn btn-light send-btn", onClick: handleWhatsappClick }, /* @__PURE__ */ import_react13.default.createElement(outline_whatsapp_default, null), /* @__PURE__ */ import_react13.default.createElement("span", null, "Whatsapp")), /* @__PURE__ */ import_react13.default.createElement("button", { className: "btn btn-light send-btn", onClick: handleLinkClick }, /* @__PURE__ */ import_react13.default.createElement(link_default, null), /* @__PURE__ */ import_react13.default.createElement("span", null, "Link"))), /* @__PURE__ */ import_react13.default.createElement(
    import_shared_utils4.Dialog,
    {
      isOpen: showDialog === 1,
      onClose: () => setShowDialog(0),
      actions: [
        {
          label: "Enviar",
          onClick: () => handleSend(2),
          className: "btn-success-600"
        }
      ]
    },
    /* @__PURE__ */ import_react13.default.createElement("h4", { className: "sender-title" }, "Quieres el link para:"),
    /* @__PURE__ */ import_react13.default.createElement("p", null, client.name)
  ), /* @__PURE__ */ import_react13.default.createElement(
    import_shared_utils4.Dialog,
    {
      isOpen: showDialog === 2,
      onClose: () => setShowDialog(0),
      actions: [
        {
          label: "Enviar",
          onClick: () => handleSend(1),
          className: "btn-success-600"
        }
      ]
    },
    /* @__PURE__ */ import_react13.default.createElement("h4", { className: "sender-title" }, "Quieres enviar correo a:"),
    /* @__PURE__ */ import_react13.default.createElement("p", null, client.name),
    /* @__PURE__ */ import_react13.default.createElement("p", null, client.mail)
  ), /* @__PURE__ */ import_react13.default.createElement(
    import_shared_utils4.Dialog,
    {
      isOpen: showDialog == 3,
      onClose: () => setShowDialog(0),
      actions: [
        {
          label: "Enviar",
          onClick: () => handleSend(0),
          className: "btn-success-600"
        }
      ]
    },
    /* @__PURE__ */ import_react13.default.createElement("h4", { className: "sender-title" }, "Quieres enviar whatsapp a:"),
    /* @__PURE__ */ import_react13.default.createElement("p", null, client.name),
    /* @__PURE__ */ import_react13.default.createElement("p", null, client.phone)
  ), /* @__PURE__ */ import_react13.default.createElement(
    import_shared_utils4.Dialog,
    {
      isOpen: link != "" || sentDialogTitle != "" || sentDialogMessage != "",
      onClose: () => {
        setLink("");
        setSentDialogTitle("");
        setSentDialogMessage("");
      }
    },
    sentDialogTitle != "" && /* @__PURE__ */ import_react13.default.createElement("h4", { className: "sender-title" }, sentDialogTitle),
    sentDialogMessage != "" && /* @__PURE__ */ import_react13.default.createElement("h4", { className: "sender-title" }, sentDialogMessage),
    link != "" && /* @__PURE__ */ import_react13.default.createElement("p", null, link)
  ), /* @__PURE__ */ import_react13.default.createElement(
    import_shared_utils4.Dialog,
    {
      isOpen: linkWhatsapp != "",
      onClose: () => setLinkWhatsapp(""),
      actions: [
        {
          label: "Enviar",
          onClick: () => handleSend(1),
          className: "btn-success-600"
        }
      ]
    },
    /* @__PURE__ */ import_react13.default.createElement("h4", { className: "sender-title" }, "Copie el enlace y abra WhatsApp para enviar cotizaci\xF3n."),
    /* @__PURE__ */ import_react13.default.createElement("p", null, linkWhatsapp)
  ));
};
var Sender_default = Sender;

// src/plans/Plan.jsx
var PlanGrid = ({ plan, price, form, client, personalLines, debug }) => {
  var initPrice = price;
  var intiFinalPrice = 0;
  var values = null;
  var fields = [];
  if (plan.is_personalized) {
    values = (0, import_react_form.useSelector)(form.store, (state) => state.values);
  }
  var newFinalPriceBase = 0;
  function setNewFinalPrice(newFinalPrice) {
    newFinalPriceBase += newFinalPrice;
  }
  (0, import_react14.useEffect)(() => {
    var newFinalPrice = newFinalPriceBase;
    for (let i = 0; i < fields.length; i++) {
      newFinalPrice += parseFloat(values[fields[i]]);
    }
    setFinalPrice(newFinalPrice);
  }, [values]);
  plan.top_lines.forEach((item) => {
    if (item.type === "discount") {
      initPrice = price - price * item.percent / 100;
      intiFinalPrice = price - price * item.percent / 100;
    }
  });
  plan.lines.forEach((item) => {
    if (plan.is_personalized) {
      if (item.type === "personalized-fillable") {
        fields.push("fill_" + item.id);
      } else if (item.type === "personalized-months") {
        fields.push("fill_" + item.line.id);
      }
    }
  });
  const [realPrice, setRealPrice] = (0, import_react14.useState)(initPrice);
  const [finalPrice, setFinalPrice] = (0, import_react14.useState)(intiFinalPrice);
  function discountChanged(newDiscount) {
    setRealPrice(price - newDiscount);
  }
  return /* @__PURE__ */ import_react14.default.createElement(import_react14.default.Fragment, null, /* @__PURE__ */ import_react14.default.createElement("div", { className: "plan-div" }, /* @__PURE__ */ import_react14.default.createElement("h3", { className: "plan-title" }, plan.title), /* @__PURE__ */ import_react14.default.createElement("table", { className: "table" }, /* @__PURE__ */ import_react14.default.createElement("tbody", null, plan.top_lines.map(
    (item, itemIndex) => {
      switch (item.type) {
        case "line":
          return /* @__PURE__ */ import_react14.default.createElement(PlanLine_default, { key: itemIndex, item, price });
        case "discount":
          return /* @__PURE__ */ import_react14.default.createElement(PlanLine_default, { key: itemIndex, item, price: price * item.percent / 100 });
        default:
          return null;
      }
    }
  ), plan.lines.map(
    (item, itemIndex) => {
      switch (item.type) {
        case "fillable":
          return /* @__PURE__ */ import_react14.default.createElement(PlanLine_default, { key: itemIndex, item, price: realPrice * item.percent / 100 });
        case "months":
          return /* @__PURE__ */ import_react14.default.createElement(MonthsLine_default, { key: itemIndex, item, price: realPrice * item.line.percent / 100 });
        case "personalized-discount":
          return /* @__PURE__ */ import_react14.default.createElement(EditableLine_default, { key: itemIndex, form, item, price, onChange: discountChanged });
        case "personalized-fillable":
          return /* @__PURE__ */ import_react14.default.createElement(EditableLine_default, { key: itemIndex, form, item, price: realPrice });
        case "personalized-months":
          return /* @__PURE__ */ import_react14.default.createElement(EditableMonths_default, { key: itemIndex, form, item, price: realPrice });
        case "fill-with-rest":
          return /* @__PURE__ */ import_react14.default.createElement(FillWithRestLine_default, { key: itemIndex, form, item, price: realPrice, values, fields, getPrice: setNewFinalPrice });
        default:
          const Component = personalLines[item.type];
          return Component ? /* @__PURE__ */ import_react14.default.createElement(
            Component,
            {
              key: itemIndex,
              form,
              item,
              price: realPrice,
              values,
              fields,
              getPrice: setNewFinalPrice
            }
          ) : null;
      }
    }
  ), plan.bottom_lines.map(
    (item, itemIndex) => {
      switch (item.type) {
        case "line":
          return /* @__PURE__ */ import_react14.default.createElement(PlanLine_default, { key: itemIndex, item, price: finalPrice, newPrice: finalPrice });
        default:
          return null;
      }
    }
  )))), client !== void 0 && /* @__PURE__ */ import_react14.default.createElement(Sender_default, { client }));
};
var Plan_default = PlanGrid;

// src/plans/PlanGrid.jsx
var import_shared_utils5 = require("shared-utils");
var PlanGrid2 = ({ config, client, unit, personalLines }) => {
  console.log(config);
  const reset = () => {
    inputRefs.current.forEach((input) => {
      var _a;
      return (_a = input.reset) == null ? void 0 : _a.call(input);
    });
  };
  const { form, showSuccessDialog, setShowSuccessDialog } = (0, import_shared_utils5.useRecordForm)(config.form, void 0, reset);
  return /* @__PURE__ */ import_react15.default.createElement(import_react15.default.Fragment, null, config.plans.map((planRow, rowIndex) => /* @__PURE__ */ import_react15.default.createElement("div", { key: rowIndex, className: "plan-row", style: { display: "flex", flexDirection: "row", marginBottom: "10px" } }, planRow.map(
    (plan, colIndex) => /* @__PURE__ */ import_react15.default.createElement(Plan_default, { key: colIndex, plan, price: unit.price, form, personalLines, debug: rowIndex + "-" + colIndex })
  ))), client && /* @__PURE__ */ import_react15.default.createElement(Sender_default, { client, unit, form }));
};
var PlanGrid_default = PlanGrid2;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ImageMapPro,
  PlanGrid
});
