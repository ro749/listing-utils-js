import React, { useState, useImperativeHandle } from "react";

const Tooltip = ({ref }) => {
    const [text, setText] = useState('');
    const [pos, setPos] = useState({ x: 0, y: 0 });
    useImperativeHandle(ref, () => ({
        setText
    }));
    
    const handleMouseMove = (e) => {
        setPos({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("mousemove", handleMouseMove);
    /**
     *     left: 50%;
    top: 100%;
    margin-left: -8px;
    margin-top: 0;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid black;
     */
    return text!='' && (
        
        <div style={{
            position: "fixed",
            zIndex: 1000,
            backgroundColor: "rgb(34, 34, 34)",
            borderRadius: "10px",
            padding: "15px",
            color: "#ffffff",
            transform: 'translate(-50%, calc(-100% - 10px))',
            left: pos.x,
            top: pos.y,
            pointerEvents: 'none' 
        }}>
            <div style={{position:'absolute', left:'50%', top:'100%', marginLeft:'-8px', marginTop:'0', width:'0', height:'0', borderLeft:'8px solid transparent', borderRight:'8px solid transparent', borderTop:'8px solid black'}}></div>
            <p style={{color: "#ffffff", margin: "0px"}}>{text}</p>
        </div>
    );
}

export default Tooltip;