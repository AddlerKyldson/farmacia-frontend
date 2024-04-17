import React from "react";
import { ContainerCampoTexto, Input, Label } from "./styles";

interface CampoTextoProps {
    label: string;
    tipo: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

const CampoTexto: React.FC<CampoTextoProps> = ({ label, name, tipo, className, onChange }) => {
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
            />
        </ContainerCampoTexto>
    );
};

export default CampoTexto;
