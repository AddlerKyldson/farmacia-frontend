import styled from "styled-components";

export const ContainerTitulo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #eee;
    padding: 1rem 0;
`;

export const TituloPage = styled.h1`
    font-size: 2rem;
    margin: 0;
`;

export const Button = styled.a`
    padding: 0.5rem 1rem;
    background-color: #00997b;
    color: #fff;
    border-radius: 0.5rem;
    text-decoration: none;
    transition: 0.3s;
    &:hover {
        background-color: #007f63;
    }
`;
