import styled from "styled-components";

export const MenuContainer = styled.nav`
    color: #333;
    z-index: 1;
`;

export const MenuUl = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const MenuItem = styled.li`
    border-bottom: solid 1px #efefef;
    width: 100%;
`;

export const MenuLink = styled.a`
    color: #555;
    text-decoration: none;
    padding: 0.8rem;
    display: block;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;

export const SubMenu = styled.ul`
    list-style: none;
    padding-left: 20px; // Indentação para indicar hierarquia
    margin: 0;
    display: flex;
    flex-direction: column;
    background-color: #f7f7f7; // Cor de fundo do submenu
`;

export const SubMenuItem = styled.li`
    border-bottom: 1px solid #efefef; // Estilização similar ao MenuItem, ajuste conforme necessário
`;
