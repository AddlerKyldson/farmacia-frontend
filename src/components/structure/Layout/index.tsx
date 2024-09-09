import React, { ReactNode } from "react";

import { LayoutContainer, MainContainer, PageContainer } from "./styles";
import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";
import { MenuProvider } from "../Menu/MenuContext";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <LayoutContainer>
            <MenuProvider>
                <Header />
                <MainContainer>
                    <SideBar />
                    <PageContainer>{children}</PageContainer>
                </MainContainer>
            </MenuProvider>
            <Footer />
        </LayoutContainer>
    );
};

export default Layout;
