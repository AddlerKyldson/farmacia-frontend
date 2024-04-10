import React from "react";
import Layout from "../../structure/Layout";
import Filtro from "../../other/filtro";

const Estados: React.FC = () => {
    return (
        <Layout>
            <Filtro title="Filtrar">
                <p>{"Estados"}</p>
            </Filtro>
        </Layout>
    );
};

export default Estados;
