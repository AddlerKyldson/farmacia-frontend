import React from "react";
import Layout from "../../structure/Layout";
import Filtro from "../../other/filtro";

const Usuarios: React.FC = () => {
    return (
        <Layout>
            <Filtro title="Filtrar">
                <p>{"Usuários"}</p>
            </Filtro>
        </Layout>
    );
};

export default Usuarios;
