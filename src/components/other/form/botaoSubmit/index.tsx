import React from "react";
import { ContainerBotaoSubmit, Input } from "./styles";

interface BotaoSubmitProps {
    texto: string;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
    disabled?: boolean;
}

const BotaoSubmit: React.FC<BotaoSubmitProps> = ({ texto, className, onClick, disabled }) => {
    return (
        <ContainerBotaoSubmit className={className}>
            <Input className='btn btn-success' type="submit" value={texto} onClick={(e) => onClick ? onClick(e) : undefined} disabled={disabled} />
        </ContainerBotaoSubmit>
    );
};

export default BotaoSubmit;
