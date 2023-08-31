import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {RouteNames} from "../routes";
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import logo from '../assets/logo.png'
import nameIcon from '../assets/username.png'
import LocalStoreService from "../API/LocalStoreService";
import NameInput from "../components/NameInput";
import CanvasService from "../API/CanvasService";
import canvas from "../components/Canvas";
import {sha256} from "../utils";
import CheckBox from "../components/CheckBox.tsx";
import {useFetching} from "../hooks/useFetching.ts";

const CreateCanvasPage = observer(() => {
    const navigate = useNavigate()
    const location = useLocation()
    const [canvasObj, setCanvasObj] = useState({
        name: 'New canvas',
        spectatorCode: '',
        painterCode: '',
        isOpen: true,
        isFree: true
    })
    const [fetchCreate, isCreateLoading, createError] = useFetching(async (name, painterCode, spectatorCode) => {
        const response = await CanvasService.createCanvas({name, painterCode, spectatorCode})
        LocalStoreService.setCanvas(response.data.id, {name, code: painterCode || spectatorCode})
        navigate(`${RouteNames.CANVAS}/${response.data.id}`)
    })

    useEffect(() => {
        canvasState.setId(null)
    }, [])

    async function createCanvas(e){
        e.preventDefault()
        const spectatorCode = canvasObj.isOpen ? '' : await sha256(canvasObj.spectatorCode)
        const painterCode = canvasObj.isFree ? '' : await sha256(canvasObj.painterCode)
        fetchCreate(canvasObj.name, painterCode, spectatorCode)
    }

    return (
        <div className={'create-canvas'}>
            {isCreateLoading &&  <div className={'plug'}>
                <span className="loader"></span>
            </div>}

            <header className={'header'}>
                <div className={'header__logo-box'}>
                    <img className={'header__logo-img'} src={logo} alt="logo"/>
                    <h3>Great Paint</h3>
                </div>
                <NameInput
                    classNameBox={'header__name-box'}
                    value={LocalStoreService.getUsername()}
                    onChange={() => {
                        navigate(RouteNames.CHANGE_NAME, {state: {background: location}})
                    }}
                />
            </header>

            <Form onSubmit={createCanvas} className={'create-canvas__form'}>
                <h5 className={'create-canvas__title'}>Новый холст</h5>
                <InputGroup className="mb-3" >
                    <InputGroup.Text id="inputGroup-sizing-default">
                        Название
                    </InputGroup.Text>
                    <Form.Control
                        className={'create-canvas__input'}
                        value={canvasObj.name}
                        onChange={e => setCanvasObj(prev => {return {...prev, name: e.target.value}})}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>

                <CheckBox label={'Публичный доступ'}
                          type="switch"
                          classNameBox={'create-canvas__check-box'}
                          checked={canvasObj.isOpen}
                          onChange={e => setCanvasObj(prev => {return {...prev, isOpen: !prev.isOpen}})}/>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">
                        Код доступа
                    </InputGroup.Text>
                    <Form.Control value={canvasObj.spectatorCode}
                                  onChange={e => setCanvasObj(prev => {return {...prev, spectatorCode: e.target.value}})}
                                  onClick={e => setCanvasObj(prev => {return {...prev, isOpen: false}})}
                                  onBlur={e => setCanvasObj(prev => {return {...prev, isOpen: !prev.spectatorCode}})}
                                  aria-label="Default"
                                  className={canvasObj.isOpen ? 'input-disabled' : ''}
                                  aria-describedby="inputGroup-sizing-default"/>
                </InputGroup>

                <CheckBox label={'Свободное рисование'}
                          type="switch"
                          classNameBox={'create-canvas__check-box'}
                          checked={canvasObj.isFree}
                          onChange={e => setCanvasObj(prev => {return {...prev, isFree: !prev.isFree}})}/>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">
                        Код доступа
                    </InputGroup.Text>
                    <Form.Control value={canvasObj.painterCode}
                                  onChange={e => setCanvasObj(prev => {return {...prev, painterCode: e.target.value}})}
                                  onClick={e => setCanvasObj(prev => {return {...prev, isFree: false}})}
                                  onBlur={e => setCanvasObj(prev => {return {...prev, isFree: !prev.painterCode}})}
                                  className={canvasObj.isFree ? 'input-disabled' : ''}
                                  aria-label="Default"
                                  aria-describedby="inputGroup-sizing-default"/>
                </InputGroup>

                <Button className={'create-canvas__submit'} type="submit">Создать</Button>
            </Form>
        </div>
    );
})

export default CreateCanvasPage;