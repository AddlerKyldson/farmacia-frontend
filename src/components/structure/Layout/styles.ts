import styled from "styled-components";

export const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

export const MainContainer = styled.div`
    position: relative;
    display: flex;
    flex: 1;
`;

export const PageContainer = styled.main`
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    height: 100vh;
`;
