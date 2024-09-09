import styled from "styled-components";

// Botão para abrir/fechar o menu no mobile
export const MobileMenuButton = styled.button`
    display: none;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    z-index: 1001;

    @media (max-width: 768px) {
        display: block;
        position: fixed;
        top: 15px;
        left: 15px;
    }
`;

// Overlay que aparece quando o menu está aberto no mobile
export const Overlay = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }
`;

export const MenuContainer = styled.nav<{ isVisible: boolean }>`
    background-color: #fff;
    color: #333;
    z-index: 1001;
    height: 100vh;
    transition: left 0.3s ease;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    left: 0;

    @media (max-width: 768px) {
        position: fixed;
        top: 0;
        left: 0; /* Por padrão, o menu está sempre visível no desktop */
        width: 250px;
        left: ${(props) => (props.isVisible ? '0' : '-250px')}; /* Oculto no mobile até que isVisible seja true */
    }
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
    padding-left: 20px;
    margin: 0;
    display: flex;
    flex-direction: column;
    background-color: #f7f7f7;
`;

export const SubMenuItem = styled.li`
    border-bottom: 1px solid #efefef;
`;
