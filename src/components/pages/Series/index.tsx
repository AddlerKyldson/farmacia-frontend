import React from "react";
import Layout from "../../structure/Layout";
import Filtro from "../../other/filtro";

const Series: React.FC = () => {
    return (
        <Layout>
            <Filtro title="Filtrar">
                <p>{"Séries"}</p>
            </Filtro>
        </Layout>
    );
};

export default Series;
