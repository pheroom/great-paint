import React, {FC} from 'react';
import {Form, FormCheckProps} from "react-bootstrap";

interface InputProps extends FormCheckProps{
    className?: string
    classNameBox?: string
    label: string
}

const CheckBox: FC<InputProps> = ({className, classNameBox, label, ...args}) => {
    return (
        <div className={'check-box ' + (classNameBox ? classNameBox : '')}>
            <label>{label}</label>
            <Form.Check className={'check-box__input ' + (className ? className : '')}
                        {...args}
            />
        </div>
    );
};

export default CheckBox;