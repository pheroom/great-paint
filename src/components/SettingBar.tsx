import React, {useEffect, useState} from 'react';
import toolState from "../store/toolState";
import CanvasState from "../store/canvasState";
import widthImg from "../assets/width.png";
import fillImg from "../assets/fill.png";
import strokeImg from "../assets/stroke.png";

const SettingBar = () => {
    const [strokeColor, setStrokeColor] = useState('#000000')
    const [fillColor, setFillColor] = useState('#ffffff')
    const [lineWidth, setLineWidth] = useState(1)

    useEffect(() => {
        toolState.setFillColor('rgb(255, 255, 255, 0)')
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
    }

    const checkLineWidthValue = () => {
        if(lineWidth <= 0){
            setLineWidth(1)
            toolState.setLineWidth(1)
        }else if(lineWidth > 50){
            setLineWidth(50)
            toolState.setLineWidth(50)
        } else toolState.setLineWidth(lineWidth)
    }

    return (
        <div className="setting-bar">
            {/*<label htmlFor="line-width">Толщина линии</label>*/}
            <label htmlFor="line-width" className={'toolbar__label'}>
                <img className={'toolbar__label-img'} src={widthImg} alt={'width'}/>
            </label>
            <input
                className={'toolbar__width-input'}
                value={lineWidth}
                onChange={changeLineWidth}
                id="line-width"
                type="number" min={1} max={50}
                onBlur={checkLineWidthValue}/>
            <label htmlFor="stroke-color" className={'toolbar__label'}>
                <img className={'toolbar__label-img'} src={strokeImg} alt={'stroke'}/>
            </label>
            <input
                className={'toolbar__color-input'}
                type="color"
                value={strokeColor}
                onChange={e => changeColor(e)}
                id="stroke-color"
                style={{marginLeft:5}}/>
            <label htmlFor="fill-color" className={'toolbar__label'}>
                <img className={'toolbar__label-img'} src={fillImg} alt={'fill'}/>
            </label>
            <input className={'toolbar__color-input'}
                   type="color"
                   value={fillColor}
                   onChange={changeFillColor}
                   id="fill-color"
                   style={{marginLeft:5}}/>
        </div>
    );
};

export default SettingBar;