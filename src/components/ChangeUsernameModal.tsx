import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import LocalStoreService from "../API/LocalStoreService";
import {useNavigate} from "react-router-dom";
import CanvasState from "../store/canvasState.ts";
import {observer} from "mobx-react-lite";

const ChangeUsernameModal = observer(() => {
    const navigate = useNavigate()
    const [username, setUsername] = useState(LocalStoreService.getUsername())
    const inputRef = useRef<HTMLInputElement>()

    useEffect(()=>{
        inputRef.current && inputRef.current.focus()
    }, [])

    return (
        <div>
            <Modal show={true} onHide={() => navigate(-1)}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменение имени</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Новое имя
                        </InputGroup.Text>
                        <Form.Control
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            ref={inputRef}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={() => {
                        LocalStoreService.setUsername(username)
                        CanvasState.setUsername(username)
                        navigate(-1)
                    }}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
})

export default ChangeUsernameModal;