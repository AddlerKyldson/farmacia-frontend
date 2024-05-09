import React from "react";
import { ContainerCampoTexto, Input, Label } from "./styles";

interface CampoTextoProps {
    label: string;
    tipo: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    name: string;
    value?: any;
    disabled?: boolean;
}

const CampoTexto: React.FC<CampoTextoProps> = ({ label, value, name, tipo, className, disabled, onChange, onBlur }) => {
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

                name={name}
                value={value}
                disabled={disabled}
            />
        </ContainerCampoTexto>
    );
};

export default CampoTexto;
