import React, {useState} from 'react';
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import Rect from "../tools/Rect";
import Line from "../tools/Line";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import {Link} from "react-router-dom";
import {RouteNames} from "../routes";
import {observer} from "mobx-react-lite";

const Toolbar = observer(() => {
    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL()
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = canvasState.sessionId + ".jpg"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <div className="toolbar">
            <Link to={RouteNames.MAIN}>Menu</Link>
            <button className={'toolbar__btn toolbar__brush ' + (toolState.tool instanceof Brush ? 'toolbar__btn--active' : '')} onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId, canvasState.username))}/>
            <button className={"toolbar__btn toolbar__rect " + (toolState.tool instanceof Rect ? 'toolbar__btn--active' : '')} onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId, canvasState.username))}/>
            <button className={"toolbar__btn toolbar__circle " + (toolState.tool instanceof Circle ? 'toolbar__btn--active' : '')} onClick={() => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId, canvasState.username))}/>
            <button className={"toolbar__btn toolbar__eraser " + (toolState.tool instanceof Eraser ? 'toolbar__btn--active' : '')} onClick={() => toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId, canvasState.username))}/>
            <button className={"toolbar__btn toolbar__line " + (toolState.tool instanceof Line ? 'toolbar__btn--active' : '')} onClick={() => toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionId, canvasState.username))}/>
            <button className="toolbar__btn toolbar__undo" onClick={() => canvasState.undo()}/>
            <button className="toolbar__btn toolbar__redo" onClick={() => canvasState.redo()}/>
            <button className="toolbar__btn toolbar__save" onClick={() => download()}/>
        </div>
    );
})

export default Toolbar;