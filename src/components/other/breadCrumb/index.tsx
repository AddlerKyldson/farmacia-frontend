import React from "react";
import { BreadcrumbLink, ContainerBreadcrumb } from "./styles";

interface LinkProps {
    texto: string;
    href?: string;    
}

interface BreadcrumbProps {
    paginas: LinkProps[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paginas }) => {
    return (
        <ContainerBreadcrumb>
            {paginas.map((pagina, index) => {
                return (
                    <BreadcrumbLink href={pagina.href ? pagina.href : '#'} key={index}>
                        {pagina.texto}
                        {index < paginas.length - 1 && <span> / </span>}
                    </BreadcrumbLink>
                );
            })}
        </ContainerBreadcrumb>
    );
};

export default Breadcrumb;
