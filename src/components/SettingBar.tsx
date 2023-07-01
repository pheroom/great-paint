import React, {useEffect, useState} from 'react';
import toolState from "../store/toolState";
import CanvasState from "../store/canvasState";

const SettingBar = () => {
    const [strokeColor, setStrokeColor] = useState('#000000')
    const [fillColor, setFillColor] = useState('#ffffff')
    const [lineWidth, setLineWidth] = useState(1)

    useEffect(() => {
        toolState.setFillColor('rgba(0, 0, 0, 0)')
    }, [])

    const changeColor = e => {
        const color = e.target.value
        setStrokeColor(color)
        toolState.setStrokeColor(color)
    }

    const changeFillColor = e => {
        const color = e.target.value
        setFillColor(color)
        toolState.setFillColor(color)
    }

    const changeLineWidth = e => {
        const width = e.target.value
        setLineWidth(width)
        toolState.setLineWidth(width)
    }

    return (
        <div className="setting-bar">
            <label htmlFor="line-width">Толщина линии</label>
            <input
                value={lineWidth}
                onChange={changeLineWidth}
                style={{margin: '0 10px'}}
                id="line-width"
                type="number" min={1} max={50}/>
            <label htmlFor="stroke-color">Цвет обводки</label>
            <input type="color" value={strokeColor} onChange={e => changeColor(e)} id="stroke-color" style={{marginLeft:5}}/>
            <label htmlFor="fill-color" style={{marginLeft:15}}>Цвет заливки</label>
            <input type="color" value={fillColor} onChange={changeFillColor} id="fill-color" style={{marginLeft:5}}/>
        </div>
    );
};

export default SettingBar;