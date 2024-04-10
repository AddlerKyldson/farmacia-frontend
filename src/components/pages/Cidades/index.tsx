import React from "react";
import Layout from "../../structure/Layout";
import Filtro from "../../other/filtro";

const Cidades: React.FC = () => {
    return (
        <Layout>
            <Filtro title="Filtrar">
                <p>{"Cidades"}</p>
            </Filtro>
        </Layout>
    );
};

export default Cidades;
