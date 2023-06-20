import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import axios from "axios";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";

const Canvas = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>()
    const usernameRef = useRef()
    const [modal, setModal] = useState(true)
    const params = useParams()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
    }, [])

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    return (
        <div className="canvas">
            <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={600} height={400}/>
        </div>
    );
})

export default Canvas;