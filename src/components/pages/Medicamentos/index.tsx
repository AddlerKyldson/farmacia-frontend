import React from "react";
import Layout from "../../structure/Layout";
import Filtro from "../../other/filtro";

const Medicamentos: React.FC = () => {
    return (
        <Layout>
            <Filtro title="Filtrar">
                <p>{"Medicamentos"}</p>
            </Filtro>
        </Layout>
    );
};

export default Medicamentos;
