import React, {useState} from 'react';
import Toolbar from "../components/Toolbar";
import SettingBar from "../components/SettingBar";
import Canvas from "../components/Canvas";
import PageNotFound from "./PageNotFound";
import {RouteNames} from "../routes";
import {useParams} from "react-router-dom";

const CanvasPage = () => {
    const params = useParams()

    if(!params.id){
        return <PageNotFound path={RouteNames.MAIN}/>
    }
    return (
        <>
            <Toolbar/>
            <SettingBar/>
            <Canvas/>
        </>
    );
};

export default CanvasPage;