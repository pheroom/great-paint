import React, {useEffect, useState} from 'react';
import Toolbar from "../components/Toolbar";
import SettingBar from "../components/SettingBar";
import Canvas from "../components/Canvas";
import PageNotFound from "./PageNotFound";
import {RouteNames} from "../routes";
import {useParams} from "react-router-dom";
import CanvasDrawingAlertsSurface from "../components/CanvasDrawingAlertsSurface.tsx";
import canvasState from "../store/canvasState.ts";
import {observer} from "mobx-react-lite";

const CanvasPage = observer(() => {
    const params = useParams()

    if(!params.id){
        return <PageNotFound path={RouteNames.MAIN}/>
    }
    return (
        <>
            <Toolbar/>
            {canvasState.isPainter && <SettingBar/>}
            <Canvas/>
            <CanvasDrawingAlertsSurface/>
        </>
    );
})

export default CanvasPage;