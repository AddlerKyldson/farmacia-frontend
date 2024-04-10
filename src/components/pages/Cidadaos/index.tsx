import React from "react";
import Layout from "../../structure/Layout";
import Filtro from "../../other/filtro";

const Cidadaos: React.FC = () => {
    return (
        <Layout>
            <Filtro title="Filtrar">
                <p>{"Cidadãos"}</p>
            </Filtro>
        </Layout>
    );
};

export default Cidadaos;
