import React, {useState} from 'react';
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import Rect from "../tools/Rect";
import Line from "../tools/Line";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {RouteNames} from "../routes";
import {Button, Form, ButtonGroup, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import rectImg from '../assets/rect.png'
import circleImg from '../assets/circle.png'
import brushImg from '../assets/brush.png'
import eraserImg from '../assets/eraser.png'
import lineImg from '../assets/line.png'
import cleanImg from '../assets/clean.png'
import downloadImg from '../assets/download.png'
import logo from '../assets/logo.png'
import copyImg from '../assets/copy.png'
import LocalStoreService from "../API/LocalStoreService";
import NameInput from "./NameInput";
import CanvasState from "../store/canvasState";
import ButtonIcon from "./ButtonIcon.tsx";

const Toolbar = observer(() => {
    const [clearDown, setClearDown] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL()
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = canvasState.name + ".jpg"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                console.log('copy!')
            })
            .catch(err => {
                console.log('Something went wrong', err);
            });
    }

    const clearCanvas = () => {
        canvasState.canvas.getContext('2d').clearRect(0, 0, canvasState.canvas.width, canvasState.canvas.height)
        canvasState.socket.send(JSON.stringify({
            method: 'draw',
            id: canvasState.id,
            username: canvasState.username,
            figure: {
                type: 'clear'
            }
        }))
        setClearDown(false)
    }

    return (
        <div className="toolbar">

            <Modal show={clearDown} onHide={() => setClearDown(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Prompt</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы уверенны, что хотите очистить весь холст?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setClearDown(false)}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={clearCanvas}>
                        Очистить
                    </Button>
                </Modal.Footer>
            </Modal>

            <Link to={RouteNames.MAIN} className={'toolbar__menu-btn'}>
                <img className={'toolbar__menu-btn-img'} src={logo} alt="menu"/>
            </Link>
            {canvasState.isPainter ? <>
            <ButtonIcon
                isActive={toolState.tool instanceof Brush}
                className={'toolbar__btn'}
                onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.id, canvasState.username))}
                img={brushImg}
                alt={'brush'}/>
            <ButtonIcon
                isActive={toolState.tool instanceof Rect}
                className={'toolbar__btn'}
                onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.id, canvasState.username))}
                img={rectImg}
                alt={'rect'}/>
            <ButtonIcon
                isActive={toolState.tool instanceof Circle}
                className={'toolbar__btn'}
                onClick={() => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.id, canvasState.username))}
                img={circleImg}
                alt={'circle'}/>
            <ButtonIcon
                isActive={toolState.tool instanceof Eraser}
                className={'toolbar__btn'}
                onClick={() => toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.id, canvasState.username))}
                img={eraserImg}
                alt={'eraser'}/>
            <ButtonIcon
                isActive={toolState.tool instanceof Line}
                className={'toolbar__btn'}
                onClick={() => toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.id, canvasState.username))}
                img={lineImg}
                alt={'line'}/>
            <ButtonIcon
                className={'toolbar__btn'}
                onClick={() => setClearDown(true)}
                img={cleanImg}
                alt={'clean'}/>
            </> : <div style={{marginLeft: '10px'}}>Вы подключились не как художник</div>}
            {/*<button className="toolbar__btn toolbar__undo" onClick={() => canvasState.undo()}/>*/}
            {/*<button className="toolbar__btn toolbar__redo" onClick={() => canvasState.redo()}/>*/}
            <ButtonIcon
                className={'toolbar__btn-download'}
                onClick={download}
                img={downloadImg}
                alt={'download'}/>
            <ButtonIcon
                className={'toolbar__btn'}
                onClick={copyUrl}
                img={copyImg}
                alt={'copy-url'}/>

            <Button
                variant="outline-info"
                size="sm"
                className={'toolbar__canvas-btn canvas-name-btn'}
                onClick={() => navigate(`${RouteNames.CANVAS_INFO}/${canvasState.id}`, {state: {background: location}})}
            >{CanvasState.name || 'canvas'}</Button>

            <NameInput
                mode="small"
                className={'toolbar__name-input'}
                value={LocalStoreService.getUsername()}
                onChange={() => navigate(RouteNames.CHANGE_NAME, {state: {background: location}})}
            />
        </div>
    );
})

export default Toolbar;