import React, { ReactNode } from "react";
import { ContainerRow } from "./styles";

interface RowProps {
    children: ReactNode;
    className?: string;
}

const Row: React.FC<RowProps> = ({ children, className }) => {
    return (
        <ContainerRow className={className}>
            {children}
        </ContainerRow>
    );
};

export default Row;
