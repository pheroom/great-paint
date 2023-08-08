import React, {FC} from 'react';
import {Form, InputGroup, FormControlProps} from "react-bootstrap";
import nameIcon from "../assets/username.png";

interface InputProps extends FormControlProps{
    className?: string
    classNameBox?: string
    mode?: string
    size?: 'sm' | 'lg'
}

const NameInput: FC<InputProps> = ({mode='medium', className, classNameBox, ...args}) => {

    if(mode === 'small') return <div className={'name-box-small ' + (className || '')}>
        <img className={'name-box-small__img'} src={nameIcon} alt="name"/>
        <Form.Control
            className={'name-box-small__input ' + (className || '')}
            size="sm"
            {...args}
        />
    </div>
    return (
        <InputGroup className={"name-box " + (classNameBox || '')}>
            <InputGroup.Text className={'name-box__img-box'} id="inputGroup-sizing-default">
                <img className={'name-box__img'} src={nameIcon} alt="name"/>
            </InputGroup.Text>
            <Form.Control
                className={'name-box__input ' + (className || '')}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                {...args}
            />
        </InputGroup>
    );
};

export default NameInput;