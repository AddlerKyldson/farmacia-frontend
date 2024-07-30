import styled from "styled-components";

export const ContainerCampoCheckBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0.5rem;
    box-sizing: border-box;
`;

export const Label = styled.label`
    font-size: 1rem;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    margin-right: 5px;
`;
