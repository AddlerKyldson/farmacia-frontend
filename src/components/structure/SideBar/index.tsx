import React from "react";

import { SideBarContainer } from "./styles";
import Menu from "../Menu";

const SideBar: React.FC = () => {
    return (
        <SideBarContainer>
            <Menu></Menu>
        </SideBarContainer>
    );
};

export default SideBar;
