import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import {sha256} from "../utils";

const CodeInputModal = ({codeHandler, close}) => {
    const [code, setCode] = useState('')
    const inputRef = useRef<HTMLInputElement>()

    useEffect(()=>{
        inputRef.current && inputRef.current.focus()
    }, [])

    function clickHandler(){
        inputRef.current.onchange = null
        sha256(code).then(res => {
            codeHandler(res)
        })
    }

    return (
        <div>
            <Modal show={true} onHide={() => close}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменение имени</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    <Button variant="primary" onClick={clickHandler}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CodeInputModal;