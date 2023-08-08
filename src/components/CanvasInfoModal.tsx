import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import canvasState from "../store/canvasState.ts";
import {observer} from "mobx-react-lite";
import CanvasState from "../store/canvasState.ts";
import CanvasDrawingAlert from "./CanvasDrawingAlert.tsx";
import copyImg from "../assets/copy.png";
import removeImg from "../assets/remove.png";
import LocalStoreService from "../API/LocalStoreService.ts";
import {RouteNames} from "../routes.ts";
import CheckBox from "./CheckBox.tsx";
import toolState from "../store/toolState.ts";
import Brush from "../tools/Brush.ts";
import brushImg from "../assets/brush.png";
import ButtonIcon from "./ButtonIcon.tsx";

const CanvasInfoModal = observer(() => {
    const [removePromtVisible, setRemovePromtVisible] = useState(false)
    const navigate = useNavigate()
    const {id} = useParams()

    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.origin + window.location.pathname + '#' + RouteNames.CANVAS + '/' + id)
            .then(() => {
                console.log('copy!')
            })
            .catch(err => {
                console.log('Something went wrong', err);
            });
    }

    const removeCanvasData = () => {
        setRemovePromtVisible(false)
        LocalStoreService.removeCanvas(id)
        navigate(RouteNames.MAIN)
    }

    if(!canvasState.confines || id !== canvasState.id) return <></>
    return (
        <div>

            <Modal show={removePromtVisible} onHide={() => setRemovePromtVisible(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Prompt</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы уверенны, что хотите удалить данные холста с устройства?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setRemovePromtVisible(false)}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={removeCanvasData}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal size="lg" show={true} onHide={() => navigate(-1)}>
                <Modal.Header closeButton>
                    <Modal.Title>Информация о холсте</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={'canvas-info__header'}>
                        <div className={'canvas-info__name-box'} >
                            <h4 className={'canvas-info__name'}>Название: {`${canvasState.confines.name}`}</h4>
                            <div className={'canvas-info__btn-box'}>
                                <ButtonIcon
                                    className={'canvas-info__btn'}
                                    onClick={() => setRemovePromtVisible(true)}
                                    img={removeImg}
                                    alt={'remove-canvas-data'}/>
                                <ButtonIcon
                                    className={'canvas-info__btn'}
                                    onClick={copyUrl}
                                    img={copyImg}
                                    alt={'copy-url'}/>
                            </div>
                        </div>
                        <div className={'canvas-info__input-box'}>
                            <CheckBox label={'Публичный доступ'}
                                      type="switch"
                                      readOnly
                                      checked={!canvasState.confines.spectatorCode}/>
                            <CheckBox label={'Свободное рисование'}
                                      type="switch"
                                      readOnly
                                      checked={!canvasState.confines.painterCode}/>
                        </div>
                    </div>
                    <div>
                        {CanvasState.drawingList.slice().reverse().map((msg, i) =>
                            <CanvasDrawingAlert msg={msg} key={i} small/>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
})

export default CanvasInfoModal;