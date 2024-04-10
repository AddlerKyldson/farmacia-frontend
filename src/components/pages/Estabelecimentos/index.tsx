import React from "react";
import Layout from "../../structure/Layout";
import Filtro from "../../other/filtro";

const Estabelecimentos: React.FC = () => {
    return (
        <Layout>
            <Filtro title="Filtrar">
                <p>{"Estabelecimentos"}</p>
            </Filtro>
        </Layout>
    );
};

export default Estabelecimentos;
