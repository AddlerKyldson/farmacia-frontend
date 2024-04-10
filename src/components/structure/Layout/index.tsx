import React, { ReactNode } from "react";

import { LayoutContainer, MainContainer, PageContainer } from "./styles";
import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <LayoutContainer>
            <Header />
            <MainContainer>
                <SideBar />
                <PageContainer>{children}</PageContainer>
            </MainContainer>
            <Footer />
        </LayoutContainer>
    );
};

export default Layout;
