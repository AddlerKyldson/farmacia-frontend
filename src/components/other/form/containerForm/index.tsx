import React, { ReactNode } from "react";
import { Container, ContainerFormTitle, Form } from "./styles";

interface ContainerFormProps {
    children: ReactNode;
    title: string;
}

const ContainerForm: React.FC<ContainerFormProps> = ({ children, title }) => {
    return (
        <Container>
            <ContainerFormTitle>{title}</ContainerFormTitle>
            <Form>
                {children}
            </Form>
        </Container>
    );
};

export default ContainerForm;
