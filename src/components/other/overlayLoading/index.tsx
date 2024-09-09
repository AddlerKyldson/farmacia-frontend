import React from "react";
import { ContainerLoading, ContainerOverlay, Loading } from "./styles";
import { CircularProgress } from '@mui/material';

const OverlayLoading: React.FC = () => {
    return (
        <ContainerOverlay>
            <ContainerLoading>
                <CircularProgress style={{ color: '#FFFFFF' }} size={20} />
                <Loading>
                    Carregando...
                </Loading>
            </ContainerLoading>
        </ContainerOverlay>
    );
};

export default OverlayLoading;
