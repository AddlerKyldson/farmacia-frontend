import React from "react";
import Layout from "../../../structure/Layout";
import Filtro from "../../../other/filtro";

const SaidasMedicamentos: React.FC = () => {
    return (
        <Layout>
            <Filtro title="Filtrar">
                <p>{"Saídas Medicamentos"}</p>
            </Filtro>
        </Layout>
    );
};

export default SaidasMedicamentos;
