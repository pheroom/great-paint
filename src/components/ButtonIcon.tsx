import React, {ButtonHTMLAttributes, FC} from 'react';
import toolState from "../store/toolState.ts";
import Line from "../tools/Line.ts";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    classNameIcon?: string
    img: string
    alt: string
    isActive?: boolean
}

const ButtonIcon: FC<ButtonProps> = ({className, classNameIcon, isActive, img, alt, ...args}) => {
    return (
        <button className={"button-icon " + (isActive ? 'button-icon--active ' : '') + (className ? className : '')} {...args}>
            <img className={'button-icon__icon ' + (classNameIcon ? classNameIcon : '')} src={img} alt={alt}/>
        </button>
    );
};

export default ButtonIcon;