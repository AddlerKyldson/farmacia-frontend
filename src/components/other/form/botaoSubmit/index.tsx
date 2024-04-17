import React from "react";
import { ContainerBotaoSubmit, Input } from "./styles";

interface BotaoSubmitProps {
    texto: string;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
}

const BotaoSubmit: React.FC<BotaoSubmitProps> = ({ texto, className, onClick }) => {
    return (
        <ContainerBotaoSubmit className={className}>
            <Input type="submit" value={texto} onClick={(e) => onClick ? onClick(e) : undefined} />
        </ContainerBotaoSubmit>
    );
};

export default BotaoSubmit;
