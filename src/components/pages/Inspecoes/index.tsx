import React from "react";
import Layout from "../../structure/Layout";
import Filtro from "../../other/filtro";

const Inspecoes: React.FC = () => {
    return (
        <Layout>
            <Filtro title="Filtrar">
                <p>{"Inspeções"}</p>
            </Filtro>
        </Layout>
    );
};

export default Inspecoes;
