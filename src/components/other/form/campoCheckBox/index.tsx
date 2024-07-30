import React from "react";
import { ContainerCampoCheckBox, Checkbox, Label } from "./styles";

interface OptionProps {
    value: string;
    label: string;
}

interface CampoCheckBoxProps {
    label: string;
    value: string;
    disabled?: boolean;
    name: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
}

const CampoCheckBox: React.FC<CampoCheckBoxProps> = ({ label, value, disabled, name, checked, className, onChange }) => {
    return (
        <ContainerCampoCheckBox className={className}>
            <Checkbox onChange={
                (e: any) => {
                    if (onChange) {
                        onChange(e);
                    }
                }
            }
                checked={checked}
                name={name}
                value={value}
                disabled={disabled}
            >

            </Checkbox>
            <Label>{label}</Label>
        </ContainerCampoCheckBox>
    );
};

export default CampoCheckBox;
