import React, { ReactNode } from "react";
import { ContainerFiltro, ContainerFormFiltro, FiltroTitle } from "./styles";

interface FiltroProps {
    children: ReactNode;
    title: string;
}

const Filtro: React.FC<FiltroProps> = ({ children, title }) => {
    return (
        <ContainerFiltro>
            <FiltroTitle>{title}</FiltroTitle>
            <ContainerFormFiltro>
                {children}
            </ContainerFormFiltro>
        </ContainerFiltro>
    );
};

export default Filtro;
