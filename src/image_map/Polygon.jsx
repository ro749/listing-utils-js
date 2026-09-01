import React, { useState, useRef } from "react";

const Polygon = ({title, points, x, y, width, height, fillColor, opacity, hoverFillColor, hoveredOpacity, onMouseEnter, onMouseLeave, onClick}) => {
    const state = useRef(0);
    function hexToRgba(hex, opacity) {
      const cleanHex = hex.replace('#', '')
      const r = parseInt(cleanHex.slice(0, 2), 16)
      const g = parseInt(cleanHex.slice(2, 4), 16)
      const b = parseInt(cleanHex.slice(4, 6), 16)
        
      return `rgba(${r}, ${g}, ${b}, ${opacity})`
    }
    const handleMouseEnter = (event) => {
        setHovered(true);
        if (onMouseEnter) {
            onMouseEnter(event);
        }
    }
    const handleMouseLeave = (event) => {
        setHovered(false);
        if (onMouseLeave) {
            onMouseLeave(event);
        }
    }
    const [hovered, setHovered] = useState(false);
    return (
        <svg 
         viewBox="0 0 100 100"
         preserveAspectRatio="none" 
         style={{
            fill: hovered ? hexToRgba(hoverFillColor,hoveredOpacity) : hexToRgba(fillColor,opacity), 
            left: x+'%', 
            top: y+'%', 
            width: width+'%', 
            height: height+'%', 
            position: "absolute" 
         }} 
         data-title={title}
        >
            <polygon 
                points={points}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
            />
        </svg>  
    );    
};

export default Polygon;