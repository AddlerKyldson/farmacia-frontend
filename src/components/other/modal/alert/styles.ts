import styled from "styled-components";

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

export const AlertContainer = styled.div`
    position: fixed;
    width: 50%;
    background-color: white;
    z-index: 1000;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex-direction: column;
    justify-content: space-between;
`;

export const AlertHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
`;

export const AlertBody = styled.div`
    padding: 0px;
`;

export const AlertFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    border-top: 1px solid #ccc;
`;

export const Button = styled.button`
`;

export const ButtonClose = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

export const AlertContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

export const AlertMessageError = styled.p`
    color: #a54c4c;
    margin: 0;
    padding: 10px;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
`;

export const AlertMessageSuccess = styled.p`
    color: green;
    margin: 0;
    padding: 10px;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
`;

export const AlertHeaderTitle = styled.h2`
    margin: 0;
    font-size: 1.3rem;
`;

