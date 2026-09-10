import React, { useState, useRef } from "react";
import ReactSelect from 'react-select';
import Polygon from "./Polygon.jsx";
import Tooltip from "./Tooltip.jsx";


const ImageMap = ({config, onClick, selected}) => {
    console.log(config);
    const tooltipRef = useRef();
    const [artboard, setArtboard] = useState(config.map.artboards[0]);

    const selectOptions = config.map.artboards.map((artboard) => ({
      value: artboard.id,
      label: artboard.title
    }))
    function handleChange(selectedOption) {
        const selectedArtboard = config.map.artboards.find(artboard => artboard.id === selectedOption.value);
        setArtboard(selectedArtboard);
    }

    function handleMouseEnter(event) {
        const title = event.target.parentNode.getAttribute('data-title'); 
        if (title){
            tooltipRef.current.setText(title);
        } 
        
    }

    function handleMouseLeave(event) {
        const title = event.target.parentNode.getAttribute('data-title'); 
        if (title){
            tooltipRef.current.setText('');
        } 
    }

    function handleClick(event) {
        const title = event.target.parentNode.getAttribute('data-title');
        if(onClick){
            onClick(title);
        }
    }
    
    return (<>
        <div style={{ position: "relative" }}>
            <img src={artboard.image_url} style={{ position: "relative" }}/>
            <div style={{ position: "absolute", left: 0, top: 0, width: '100%', height: '100%', zIndex: 2 }}>
                <Tooltip ref={tooltipRef}/>
                {config.map.artboards.length > 1 && (
                <div className="artboard-selector" style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  zIndex: 10
                }}>
                    <ReactSelect
                        onChange={handleChange}
                        options={selectOptions}
                        defaultValue={selectOptions[0]}
                        id="artboard-selector"
                        isClearable={false}
                        isSearchable={false}
                    />
                </div>
            )}
                {artboard.children.map((child) => {
                    let points = child.points.map(p => `${p.x},${p.y}`).join(' ');
                    return(
                        <Polygon
                            key={child.id}
                            title={child.title}
                            points={points}
                            x={child.x}
                            y={child.y}
                            width={child.width}
                            height={child.height}
                            fillColor={child.title === selected ? config.selected_color : child.default_style.background_color}
                            opacity={child.default_style.background_opacity}
                            hoverFillColor={child.title === selected ? config.selected_color : child.mouseover_style.background_color}
                            hoveredOpacity={child.mouseover_style.background_opacity}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleClick}
                        />
                )})}
            </div>
            
        </div>
        </>
    );
};

export default ImageMap;