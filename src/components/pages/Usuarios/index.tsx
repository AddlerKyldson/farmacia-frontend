import React from "react";
import Layout from "../../structure/Layout";
import Filtro from "../../other/filtro";
import Resultado from "../../other/resultado";
import Breadcrumb from "../../other/breadCrumb";
import Titulo from "../../other/tituloPage";

const Usuarios: React.FC = () => {

    var exemploDados = [
        {
            id: 1,
            nome: "Bairro 1",
            cidade: "Cidade 1",
            regional: "Regional 1",
            populacao: 1000,
            area: 100,
            densidade: 10,
            renda: 1000,
            escolaridade: 10,
            idh: 0.5
        },
        {
            id: 2,
            nome: "Bairro 2",
            cidade: "Cidade 2",
            regional: "Regional 2",
            populacao: 2000,
            area: 200,
            densidade: 20,
            renda: 2000,
            escolaridade: 20,
            idh: 0.6
        },
        {
            id: 3,
            nome: "Bairro 3",
            cidade: "Cidade 3",
            regional: "Regional 3",
            populacao: 3000,
            area: 300,
            densidade: 30,
            renda: 3000,
            escolaridade: 30,
            idh: 0.7
        }
    ];

    return (
        <Layout>

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Usuários" }]} />

            <Titulo titulo="Usuários" botao={{ texto: "Cadastrar", href: "/usuarios/form" }} />

            <Filtro title="Filtrar">
                <p>{"Séries"}</p>
            </Filtro>

            <Resultado title="Resultado">
                <table className="table">
                    <thead>
                        <tr>
                            <th>{"ID"}</th>
                            <th>{"Nome"}</th>
                            <th>{"Cidade"}</th>
                            <th>{"Regional"}</th>
                            <th>{"População"}</th>
                            <th>{"Área"}</th>
                            <th>{"Densidade"}</th>
                            <th>{"Renda"}</th>
                            <th>{"Escolaridade"}</th>
                            <th>{"Opções"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exemploDados.map((dado) => (
                            <tr key={dado.id}>
                                <td>{dado.id}</td>
                                <td>{dado.nome}</td>
                                <td>{dado.cidade}</td>
                                <td>{dado.regional}</td>
                                <td>{dado.populacao}</td>
                                <td>{dado.area}</td>
                                <td>{dado.densidade}</td>
                                <td>{dado.renda}</td>
                                <td>{dado.escolaridade}</td>
                                <td>
                                    <button className="btn btn-warning">{"Editar"}</button>
                                    <button className="btn btn-danger">{"Excluir"}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Resultado>

        </Layout>
    );
};

export default Usuarios;
