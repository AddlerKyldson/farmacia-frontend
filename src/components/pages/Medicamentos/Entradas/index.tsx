import React from "react";
import Layout from "../../../structure/Layout";
import Filtro from "../../../other/filtro";

const EntradasMedicamentos: React.FC = () => {
    return (
        <Layout>
            <Filtro title="Filtrar">
                <p>{"Entradas Medicamentos"}</p>
            </Filtro>
        </Layout>
    );
};

export default EntradasMedicamentos;
