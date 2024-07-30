//Criar um componente de alerta com um botão de fechar e um botão de confirmar a ação do alerta (caso tenha) e um texto de alerta (caso tenha) e um título (caso tenha) e um overlay (caso tenha)

import React from 'react';
import { AlertBody, AlertContainer, AlertContent, AlertFooter, AlertHeader, AlertHeaderTitle, AlertMessageError, AlertMessageSuccess, Button, ButtonClose, Overlay } from './styles';

interface IProps {
    title?: string;
    message: string[];
    success?: boolean;
    show: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

const Alert: React.FC<IProps> = ({ title, message, success, show, onConfirm, onClose }) => {
    return (

        <>
            {show &&
                <Overlay onClick={onClose}>
                    <AlertContainer>
                        <AlertHeader>
                            <AlertHeaderTitle>{title}</AlertHeaderTitle>
                            <ButtonClose onClick={onClose}>X</ButtonClose>
                        </AlertHeader>
                        <AlertBody>
                            <AlertContent>
                                {success &&
                                    message.map((msg, index) => (
                                        <AlertMessageSuccess key={index}>{msg}</AlertMessageSuccess>
                                    ))}
                                {!success &&
                                    message.map((msg, index) => (
                                        <AlertMessageError key={index}>{msg}</AlertMessageError>
                                    ))}

                            </AlertContent>
                        </AlertBody>
                        <AlertFooter>
                            <Button className='btn btn-primary' onClick={onConfirm}>Confirmar</Button>
                        </AlertFooter>
                    </AlertContainer>
                </Overlay>
            }
        </>
    );
}

export default Alert;
