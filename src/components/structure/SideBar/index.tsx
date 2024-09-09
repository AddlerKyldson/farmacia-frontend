import React from "react";

import { SideBarContainer } from "./styles";
import Menu from "../Menu";
import { useMenu } from "../Menu/MenuContext";

const SideBar: React.FC = () => {
    const { isMenuVisible } = useMenu(); // Usa o hook para obter o estado de visibilidade

    return (
        <SideBarContainer>
            {isMenuVisible && <Menu />} {/* Renderiza o Menu com base no estado */}
        </SideBarContainer>
    );
};

export default SideBar;
