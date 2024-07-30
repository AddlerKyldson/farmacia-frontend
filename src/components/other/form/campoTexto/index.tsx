import React from "react";
import { ContainerCampoTexto, Input, Label } from "./styles";

interface CampoTextoProps {
    label: string;
    tipo: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    name: string;
    value?: any;
    disabled?: boolean;
    errored?: boolean;
    mensagemErro?: string;
    children?: React.ReactNode;
}

const CampoTexto: React.FC<CampoTextoProps> = ({ label, value, name, tipo, className, disabled, onChange, onBlur, onFocus, errored, mensagemErro, children }) => {
    return (
        <ContainerCampoTexto className={className}>
            <Label>{label}</Label>
            <Input type={tipo} onChange={
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
            />

            {errored && <span className="error_message">{mensagemErro}</span>}

            {children}
        </ContainerCampoTexto>
    );
};

export default CampoTexto;
