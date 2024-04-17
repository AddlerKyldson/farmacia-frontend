import styled from "styled-components";

export const ContainerBotaoSubmit = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding: 0.5rem;
    box-sizing: border-box;
`;

export const Input = styled.input`
    background-color: #6ab04c;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 0.25rem;

    &:hover {
        background-color: #5a9440;
    }
`;