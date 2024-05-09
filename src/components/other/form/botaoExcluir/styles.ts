import styled from "styled-components";

export const ContainerBotaoExcluir = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 13px;
    padding: 0.5rem;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Input = styled.input`
    background-color: #d9534f;
    color: #fff;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 0.25rem;

    &:hover {
        background-color: #c9302c;
    }
`;