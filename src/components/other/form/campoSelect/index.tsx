import React from "react";
import { ContainerCampoSelect, Input, Label } from "./styles";

interface OptionProps {
    value: string;
    label: string;
}

interface CampoSelectProps {
    label: string;
    options: OptionProps[];
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    name: string;
}

const CampoSelect: React.FC<CampoSelectProps> = ({ label, name, options, className, onChange }) => {
    return (
        <ContainerCampoSelect className={className}>
            <Label>{label}</Label>
            <Input onChange={
                (e) => {
                    if (onChange) {
                        onChange(e);
                    }
                }
            }
            name={name}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </Input>
        </ContainerCampoSelect>
    );
};

export default CampoSelect;
