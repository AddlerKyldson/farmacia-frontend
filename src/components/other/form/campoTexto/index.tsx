import React from "react";
import { ContainerCampoTexto, Input, Label } from "./styles";

interface CampoTextoProps {
    label: string;
    tipo: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    value?: any;
}

const CampoTexto: React.FC<CampoTextoProps> = ({ label, value, name, tipo, className, onChange }) => {
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
                name={name}
                value={value}
            />
        </ContainerCampoTexto>
    );
};

export default CampoTexto;
