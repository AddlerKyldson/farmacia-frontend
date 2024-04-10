import React from "react";
import Layout from "../../structure/Layout";
import Breadcrumb from "../../other/breadCrumb";
import Titulo from "../../other/tituloPage";

const FormBairros: React.FC = () => {
    return (
        <Layout>

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Bairros", href: "/bairros/" }, { texto: "Formulário Bairros", href: "#" }]} />

            <Titulo titulo="Formulário Bairros" />
        </Layout>
    );
};

export default FormBairros;
