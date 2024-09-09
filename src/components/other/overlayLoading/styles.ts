import styled from "styled-components";

export const ContainerOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ContainerLoading = styled.div`
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Loading = styled.p`
    font-size: 20px;
    color: #fff;
    margin-top: unset;
    margin-bottom: unset;
    margin-left: 10px;
    
`;
