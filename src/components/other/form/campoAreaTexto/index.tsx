import React from "react";
import { ContainerCampoTexto, Label, TextArea } from "./styles";

interface CampoAreaTextoProps {
    label: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    name: string;
    value?: any;
    disabled?: boolean;
    errored?: boolean;
    mensagemErro?: string;
    children?: React.ReactNode;
    placeholder?: string;
}

const CampoAreaTexto: React.FC<CampoAreaTextoProps> = ({ label, value, name, className, disabled, onChange, onBlur, onFocus, placeholder, errored, mensagemErro, children }) => {
    return (
        <ContainerCampoTexto className={className}>
            <Label>{label}</Label>
            <TextArea onChange={
                (e) => {
                    if (onChange) {
                        onChange(e);
                    }
                }
            }

                onBlur={
                    (e) => {
                        if (onBlur) {
                            onBlur(e);
                        }
                    }
                }

                onFocus={
                    (e) => {
                        if (onFocus) {
                            onFocus(e);
                        }
                    }
                }

                name={name}
                value={value}
                disabled={disabled}
                className={errored ? "errored_field" : ""}
                placeholder={placeholder}
            />

            {errored && <span className="error_message">{mensagemErro}</span>}

            {children}
        </ContainerCampoTexto>
    );
};

export default CampoAreaTexto;
