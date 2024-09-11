import React from "react";
import Layout from "../../structure/Layout";
import { ContainerHome, FormHome, PageHome, TitleHome } from "./styles";
import CampoTexto from "../../other/form/campoTexto";
import BotaoSubmit from "../../other/form/botaoSubmit";
import { Button } from "react-bootstrap";

const handleAbrirDashboard = () => {
    window.location.href = "/dashboard";
}

const Home: React.FC = () => {
    return (
        <PageHome>
            <ContainerHome>
                <FormHome>
                    {"Seja bem-vindo!"}
                    <Button className="mt-4" onClick={handleAbrirDashboard}>Entrar</Button>
                </FormHome>
            </ContainerHome>
        </PageHome>
    );
};

export default Home;
