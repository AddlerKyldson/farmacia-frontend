import styled from "styled-components";

export const PageHome = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: url("images/bg_login.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-opacity: 0.5;
`;

export const ContainerHome = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const FormHome = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 40px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const TitleHome = styled.h1`
    font-size: 24px;
    margin: 10px 0;
`;

export const ButtonHome = styled.button`
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    background: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
`;

