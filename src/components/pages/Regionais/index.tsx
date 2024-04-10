import React from "react";
import Layout from "../../structure/Layout";
import Filtro from "../../other/filtro";

const Regionais: React.FC = () => {
    return (
        <Layout>
            <Filtro title="Filtrar">
                <p>{"Regionais"}</p>
            </Filtro>
        </Layout>
    );
};

export default Regionais;
