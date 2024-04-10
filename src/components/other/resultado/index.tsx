import React, { ReactNode } from "react";
import { ContainerResultado, ContainerTableResultado, ResultadoTitle } from "./styles";

interface ResultadoProps {
    children: ReactNode;
    title: string;
}

const Resultado: React.FC<ResultadoProps> = ({ children, title }) => {
    return (
        <ContainerResultado>
            <ResultadoTitle>{title}</ResultadoTitle>
            <ContainerTableResultado>
                {children}
            </ContainerTableResultado>
        </ContainerResultado>
    );
};

export default Resultado;
