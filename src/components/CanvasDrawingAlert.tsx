import React from 'react';
import {Alert} from "react-bootstrap";
import {uuidToColor} from "../utils.ts";

const CanvasDrawingAlert = ({msg, small=false}) => {
    function getTextFromFigureType(type){
        switch (type) {
            case "brush":
                return ' что-то нарисовал'
            case "rect":
                return ' рисует прямоугольник'
            case "eraser":
                return ' пользуется ластиком'
            case "circle":
                return ' рисует круг'
            case "line":
                return ' рисует линию'
            case "clear":
                return ' очистил холст'
            default:
                return ''
        }
    }

    function getTextFromMethod(method){
        switch (method) {
            case "connection":
                return ' подключился'
            case "draw":
                return getTextFromFigureType(msg.figure.type)
            case "close":
                return ' Подключение разорвано'
            default:
                return ''
        }
    }

    return <Alert className={'canvas-drawing-alert ' + (small ? 'canvas-drawing-alert--small ' : '')} variant={'info'}>
        {msg.username && <span className={'canvas-drawing-alert__name'} style={{color: uuidToColor(msg.userId)}}>{msg.username}</span>}
        <span>{getTextFromMethod(msg.method)}</span>
    </Alert>
};

export default CanvasDrawingAlert;