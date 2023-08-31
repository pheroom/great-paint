import React, {FC} from 'react';
import {Button, Modal} from "react-bootstrap";

interface PromptModalProps{
    onClose: () => void
    bodyText: string
    onClick: () => void
    successText: string
    cancelText?: string
}

const PromptModal: FC<PromptModalProps> = ({onClose, onClick, bodyText, successText, cancelText = 'Отмена'}) => {
    return (
        <Modal  className={'prompt-modal'} show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Prompt</Modal.Title>
            </Modal.Header>
            <Modal.Body>{bodyText}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    {cancelText}
                </Button>
                <Button variant="primary" onClick={onClick}>
                    {successText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PromptModal;