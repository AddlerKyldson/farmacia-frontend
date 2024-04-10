import React from "react";
import { Button, ContainerTitulo, TituloPage } from "./styles";

interface ButtonProps {
    href: string;
    texto: string;
}

interface TituloProps {
    titulo: string;
    botao?: ButtonProps;
}

const Titulo: React.FC<TituloProps> = ({ titulo, botao }) => {
    return (
        <ContainerTitulo>
            <TituloPage>{titulo}</TituloPage>

            {botao && (
                <Button href={botao.href}> {botao.texto} </Button>
            )}

        </ContainerTitulo>
    );
};

export default Titulo;
