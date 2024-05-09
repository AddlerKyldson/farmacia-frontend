import React from "react";
import { ContainerBotaoExcluir, Input } from "./styles";

interface BotaoExcluirProps {
    texto: string;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
}

const BotaoExcluir: React.FC<BotaoExcluirProps> = ({ texto, className, onClick }) => {
    return (
        <ContainerBotaoExcluir className={className}>
            <Input type="button" value={texto} onClick={(e) => onClick ? onClick(e) : undefined} />
        </ContainerBotaoExcluir>
    );
};

export default BotaoExcluir;
