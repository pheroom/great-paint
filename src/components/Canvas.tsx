import React, {RefObject} from 'react';
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import ImageService from "../API/ImageService";

const Canvas = observer(React.forwardRef(({id}: {id: string}, ref: RefObject<HTMLCanvasElement>) => {
    const mouseUpHandler = () => {
        if(!canvasState.isPainter) return
        ImageService.postImage(id, canvasState.userId, canvasState.username, ref.current.toDataURL())
            .then(response => console.log(response.data))
    }

    return (
        <div className="canvas">
            <canvas onMouseUp={() => mouseUpHandler()} ref={ref} width={900} height={500}/>
        </div>
    );
}))

export default Canvas;