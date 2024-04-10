import React from "react";
import Layout from "../../structure/Layout";
import Filtro from "../../other/filtro";

const UnidadeSaude: React.FC = () => {
    return (
        <Layout>
            <Filtro title="Filtrar">
                <p>{"Unidades de Saúde"}</p>
            </Filtro>
        </Layout>
    );
};

export default UnidadeSaude;
