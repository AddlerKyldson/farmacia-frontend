//Criar um componente de alerta com um botão de fechar e um botão de confirmar a ação do alerta (caso tenha) e um texto de alerta (caso tenha) e um título (caso tenha) e um overlay (caso tenha)

import React from 'react';
import { ConfirmBody, ConfirmContainer, ConfirmContent, ConfirmFooter, ConfirmHeader, ConfirmHeaderTitle, ConfirmMessageError, ConfirmMessageSuccess, Button, ButtonClose, Overlay } from './styles';

interface IProps {
    title?: string;
    message: string[];
    success?: boolean;
    show: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

const Confirm: React.FC<IProps> = ({ title, message, success, show, onConfirm, onClose }) => {
    return (

        <>
            {show &&
                <Overlay onClick={onClose}>
                    <ConfirmContainer>
                        <ConfirmHeader>
                            <ConfirmHeaderTitle>{title}</ConfirmHeaderTitle>
                            <ButtonClose onClick={onClose}>X</ButtonClose>
                        </ConfirmHeader>
                        <ConfirmBody>
                            <ConfirmContent>
                                {success &&
                                    message.map((msg, index) => (
                                        <ConfirmMessageSuccess key={index}>{msg}</ConfirmMessageSuccess>
                                    ))}
                                {!success &&
                                    message.map((msg, index) => (
                                        <ConfirmMessageError key={index}>{msg}</ConfirmMessageError>
                                    ))}

                            </ConfirmContent>
                        </ConfirmBody>
                        <ConfirmFooter>
                            <Button onClick={onConfirm}>Sim</Button>
                            <Button onClick={onClose} className='ml-2'>Não</Button>
                        </ConfirmFooter>
                    </ConfirmContainer>
                </Overlay>
            }
        </>
    );
}

export default Confirm;
