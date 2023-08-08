import React, {useState} from 'react';
import canvasState from "../store/canvasState.ts";
import {observer} from "mobx-react-lite";
import CanvasDrawingAlert from "./CanvasDrawingAlert.tsx";
import hideImg from "../assets/hide.png";
import ButtonIcon from "./ButtonIcon.tsx";

const CanvasDrawingAlertsSurface = observer(() => {
    const [isHide, setIsHide] = useState(false)

    return (
        <div className={'canvas-drawing-alerts-surface'}>
            {!isHide && canvasState.drawingList.slice(-3).map((msg, i) =>
                <CanvasDrawingAlert msg={msg} key={i}/>
            )}
            <ButtonIcon
                className={'canvas-drawing-alerts-surface__hide-btn'}
                isActive={isHide}
                onClick={() => setIsHide(prev => !prev)}
                img={hideImg}
                alt={'hide'}/>
        </div>
    );
})

export default CanvasDrawingAlertsSurface;