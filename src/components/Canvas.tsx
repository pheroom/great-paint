import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import axios from "axios";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import PageNotFound from "../pages/PageNotFound";
import {RouteNames} from "../routes";
import Rect from "../tools/Rect";
import Eraser from "../tools/Eraser";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import ImageService from "../API/ImageService";
import WsService from "../API/WsService";

const Canvas = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>()
    const params = useParams()

    useEffect(() => {
        if(!canvasState.username){
            canvasState.setUsername(`f${(+new Date).toString(16)}`)
        }
        canvasState.setCanvas(canvasRef.current)
        const ctx = canvasRef.current.getContext('2d')
        // axios.get(`http://localhost:5000/image?id=${params.id}`)
        ImageService.getImage(params.id)
            .then(response => {
                console.log(response)
                const img = new Image()
                if(response.data){
                    img.src = response.data
                    img.onload = () => {
                        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                    }
                }else{
                    console.log('post')
                    const canvasImgUrl = canvasRef.current.toDataURL()
                    ImageService.postImage(params.id, canvasState.username, canvasImgUrl)
                        .then(response => console.log(response.data))
                    img.src = canvasImgUrl
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                }
            })
    }, [params.id])

    useEffect(() => {
        if (canvasState.username) {
            // const socket = new WebSocket(`ws://sphenoid-tested-alyssum.glitch.me/`);
            const socket = WsService.openWs()
            canvasState.setSocket(socket)
            canvasState.setSessionId(params.id)
            toolState.setTool(new Brush(canvasRef.current, socket, params.id))
            socket.onopen = () => {
                console.log('Подключение установлено')
                socket.send(JSON.stringify({
                    id:params.id,
                    username: canvasState.username,
                    method: "connection"
                }))
            }
            socket.onmessage = (event) => {
                const msg = JSON.parse(event.data)
                switch (msg.method) {
                    case "connection":
                        console.log(`пользователь ${msg.username} присоединился`)
                        break
                    case "draw":
                        console.log('draw')
                        drawHandler(msg)
                        break
                }
            }
        }
    }, [params.id])

    const drawHandler = (msg) => {
        const figure = msg.figure
        const ctx = canvasState.canvas.getContext('2d')
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y, figure.stroke, figure.lineWidth)
                break
            case "rect":
                Rect.draw(ctx, figure.x, figure.y, figure.width, figure.height, figure.stroke, figure.fill, figure.lineWidth)
                break
            case "eraser":
                Eraser.draw(ctx, figure.x, figure.y, figure.lineWidth)
                break
            case "circle":
                Circle.draw(ctx, figure.x, figure.y, figure.r, figure.stroke, figure.fill, figure.lineWidth)
                break
            case "line":
                Line.draw(ctx, figure.x, figure.y, figure.width, figure.height, figure.stroke, figure.lineWidth)
                break
            case "finish":
                ctx.beginPath()
                break
        }
    }

    const mouseUpHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
        ImageService.postImage(params.id, canvasState.username, canvasRef.current.toDataURL())
            .then(response => console.log(response.data))
    }

    return (
        <div className="canvas">
            <canvas onMouseUp={() => mouseUpHandler()} ref={canvasRef} width={600} height={400}/>
        </div>
    );
})

export default Canvas;