import React, {useEffect, useRef, useState} from 'react';
import Toolbar from "../components/Toolbar";
import SettingBar from "../components/SettingBar";
import Canvas from "../components/Canvas";
import PageNotFound from "./PageNotFound";
import {RouteNames} from "../routes";
import {useParams} from "react-router-dom";
import CanvasDrawingAlertsSurface from "../components/CanvasDrawingAlertsSurface.tsx";
import canvasState from "../store/canvasState.ts";
import {observer} from "mobx-react-lite";
import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import {sha256} from "../utils.ts";
import LocalStoreService from "../API/LocalStoreService.ts";
import CanvasService from "../API/CanvasService.ts";
import WsService from "../API/WsService.ts";
import CanvasState from "../store/canvasState.ts";
import toolState from "../store/toolState.ts";
import Brush from "../tools/Brush.ts";
import ImageService from "../API/ImageService.ts";
import Rect from "../tools/Rect.ts";
import Eraser from "../tools/Eraser.ts";
import Circle from "../tools/Circle.ts";
import Line from "../tools/Line.ts";

const CanvasPage = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>()
    const {id} = useParams()

    const [modalVisible, setModalVisible] = useState(false)

    const [{ isLoading, isError, error }, setSuspense] = useState({ isLoading: false, isError: false, error: null })
    const setError = (error) => {setSuspense({isLoading: false, isError: true, error})}
    const setLoading = (value) => {setSuspense(prev => {return {...prev, isLoading: value}})}

    const [code, setCode] = useState('')
    const inputRef = useRef<HTMLInputElement>()

    const [canvasReady, setCanvasReady] = useState(false)

    useEffect(() => {
        window.onunload = closeWs
        const getConfinesController = new AbortController()
        if(canvasState.id !== id) {
            canvasState.setId(id)
            {(async () => {
                const canvasData = LocalStoreService.getCanvas(id)
                const confines = (await CanvasService.getConfines(id, getConfinesController.signal)).data
                canvasState.setConfines(confines)
                if(!canvasData) {
                    if(!confines.spectatorCode && !confines.painterCode){
                        openWsHandler('', confines.name)
                    } else setModalVisible(true)
                } else{
                    openWsHandler(canvasData.code, canvasData.name, false)
                }
            })()}
        }
        return () => {
            getConfinesController.abort()
            closeWs()
        }
    }, [id])

    function openWsHandler(code, name, needSaveCode = true){
        const socket = WsService.openWs()
        canvasState.setSocket(socket)
        canvasState.setName(name)
        canvasState.setUsername(LocalStoreService.getUsername())
        canvasState.resetDrawingList()
        socket.onopen = () => {
            console.log('ws open')
            socket.send(JSON.stringify({
                id: id,
                username: canvasState.username,
                method: "connection",
                code
            }))
        }
        socket.onmessage = (event) => {
            const msg = JSON.parse(event.data)
            console.log(msg)
            switch (msg.method) {
                case "connection":
                    CanvasState.pushToDrawingList(msg)
                    console.log(`пользователь ${msg.username} присоединился`)
                    break
                case "get-user-id":
                    setLoading(false)
                    setModalVisible(false)
                    needSaveCode && LocalStoreService.setCanvas(id, {name, code})
                    canvasState.setUserId(msg.userId)
                    canvasState.setIsPainter(msg.isPainter)
                    if(msg.isPainter){
                        toolState.setTool(new Brush(canvasRef.current, socket, id, canvasState.username))
                    }
                    canvasState.setCanvas(canvasRef.current)
                    fillCanvasContent()
                    break
                case "draw":
                    CanvasState.pushToDrawingList(msg)
                    drawHandler(msg)
                    break
                case "error":
                    setError(msg)
                    switch (msg.code){
                        case 2402:
                            console.error(msg.msg)
                            break
                        case 2403:
                            socket.close()
                            break
                        case 2404:
                            socket.close()
                            break
                        default:
                            console.error(msg)
                    }
                    break
            }
        }
        socket.onclose = (e) => {
            canvasState.pushToDrawingList({method: 'close'})
            console.error(e)
        }
    }

    function closeWs(){
        if(!canvasState.socket || canvasState.socket.readyState !== 1) return
        canvasState.socket.send(JSON.stringify({
            method: 'leave',
            id,
            username: canvasState.username
        }))
        canvasState.socket.close()
    }

    function fillCanvasContent(){
        const ctx = canvasRef.current.getContext('2d')
        ImageService.getImage(id, canvasState.userId)
            .then(response => {
                console.log(response)
                const img = new Image()
                if(response.data){
                    img.src = response.data
                    img.onload = () => {
                        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                        setCanvasReady(true)
                    }
                }else{
                    const canvasImgUrl = canvasRef.current.toDataURL()
                    ImageService.postImage(id, canvasState.userId, canvasState.username, canvasImgUrl)
                        .then(response => console.log(response.data))
                    img.src = canvasImgUrl
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                    setCanvasReady(true)
                }
            })
    }

    const drawHandler = (msg) => {
        if(msg.userId === canvasState.userId) return
        const figure = msg.figure
        const ctx = canvasState.canvas.getContext('2d')
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure)
                break
            case "rect":
                Rect.draw(ctx, figure)
                break
            case "eraser":
                Eraser.draw(ctx, figure)
                break
            case "circle":
                Circle.draw(ctx, figure)
                break
            case "line":
                Line.draw(ctx, figure)
                break
            case "clear":
                canvasState.canvas.getContext('2d').clearRect(0, 0, canvasState.canvas.width, canvasState.canvas.height)
                break
            case "finish":
                ctx.beginPath()
                break
        }
    }

    if(!id){
        return <PageNotFound path={RouteNames.MAIN}/>
    }
    return (
        <>
            {modalVisible && <Modal show={modalVisible}>
                <Modal.Header>
                    <Modal.Title>Код доступа</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {canvasState.confines.spectatorCode
                        ? <Form.Label>Если вы хотите наблюдать за этим холстом нужно ввести код</Form.Label>
                        : <Form.Label>Если вы хотите что-то нарисовать на этом холсте нужно ввести код</Form.Label>
                    }
                    {error && <Form.Label style={{color: 'red'}}>{error.msg}</Form.Label>}
                    <InputGroup>
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Код
                        </InputGroup.Text>
                        <Form.Control
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            ref={inputRef}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    {!canvasState.confines.spectatorCode && <Button
                        onClick={() => {
                            setLoading(true)
                            openWsHandler('', canvasState.confines.name)
                        }}
                        disabled={isLoading}
                        variant="secondary"
                    >Без кода</Button>}
                    <Button
                        variant="primary"
                        disabled={isLoading}
                        onClick={() => {
                            setLoading(true)
                            sha256(code).then(code => openWsHandler(code, canvasState.confines.name))
                        }}
                    >Присоединиться</Button>
                </Modal.Footer>
            </Modal>}

            {!canvasReady && !modalVisible &&  <div className={'plug'}>
                <span className="loader"></span>
            </div>}

            <Toolbar/>
            {canvasState.isPainter && <SettingBar/>}
            <Canvas id={id} ref={canvasRef}/>
            <CanvasDrawingAlertsSurface/>
        </>
    );
})

export default CanvasPage;