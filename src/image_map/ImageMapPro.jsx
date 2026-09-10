import React, { useState } from "react";
import ImageMap from "./ImageMap.jsx";
import axios from "axios";
const ImageMapPro = ({config, onChange}) => {
    const [selected, setSelected] = useState(null);
    function handleClick(title) {
        setSelected(title);
        axios.get('imagemappro/SingleImageMapPro/unit', { params: { unit: title } }).then(res =>{
            if (res.status === 200) {
                if(onChange){
                    onChange(res.data);
                }
            }
        });
    }
    return (<ImageMap config={config} onClick={handleClick} selected={selected}/>);
};

export default ImageMapPro;