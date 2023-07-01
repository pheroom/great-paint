import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {RouteNames} from "../routes";
import {ICanvas} from "../utils";
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import {Button, Form, InputGroup} from "react-bootstrap";

const CreateCanvasPage = observer(() => {
    const navigate = useNavigate()
    const [canvasObj, setCanvasObj] = useState({
        title: 'New canvas',
        spectators: [],
        painters: [],
        isFree: true,
        isPrivate: false
    })

    function createCanvas(e){
        e.preventDefault()
        // const socket = new WebSocket(`ws://localhost:5000/`)
        const cid = `f${(+new Date).toString(16)}`
        // socket.onopen = () => {
        //     console.log('Canvas created')
        //     socket.send(JSON.stringify({
        //         id: cid,
        //         title: canvasObj.title,
        //         isPrivate: canvasObj.isPrivate,
        //         username: canvasState.username,
        //         method: "create"
        //     }))
        // }
        navigate(`${RouteNames.CANVAS}/${cid}`)
    }

    return (
        <Form onSubmit={createCanvas}>
            <InputGroup className="mb-3" style={{maxWidth: '500px'}}>
                <InputGroup.Text id="inputGroup-sizing-default">
                    Canvas name
                </InputGroup.Text>
                <Form.Control
                    value={canvasObj.title} onChange={e => setCanvasObj({...canvasObj, title: e.target.value})}
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <Form.Check type="switch" label="Private" checked={canvasObj.isPrivate} onChange={() => setCanvasObj({...canvasObj, isPrivate: !canvasObj.isPrivate})}/>
            <Form.Check type="switch" label="Free"/>
            <Button type="submit">Create</Button>
        </Form>
    );
})

export default CreateCanvasPage;