import React, { useEffect, useState } from "react";
import Layout from "../../structure/Layout";
import Filtro from "../../other/filtro";
import Resultado from "../../other/resultado";
import Breadcrumb from "../../other/breadCrumb";
import Titulo from "../../other/tituloPage";
import server from "../../../utils/data/server";
import axios from "axios";

const UnidadeSaude: React.FC = () => {

    const [dados, setDados] = React.useState<any[]>([]);

    //configura exibição do Alert
    const [alert, setAlert] = useState({
        show: false,
        success: false,
        title: '',
        message: [''],
        onConfirm: () => { },
        onClose: () => { }
    });
    const [confirm, setConfirm] = useState({
        show: false,
        success: false,
        title: '',
        message: [''],
        onConfirm: () => { },
        onClose: () => { }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(
                    `${server.url}${server.endpoints.unidade_saude}`,
                    {
                        //parâmetros
                    }
                );

                console.log("Dados:", response.data);
                setDados(response.data);

            } catch (error) {
                console.error("Erro:", error);
            }
        };

        fetchData();
    }, []);

    const handleExcluir = async (id: number) => {

        setConfirm({
            show: true,
            success: false,
            title: 'Excluir Unidade de Saúde',
            message: ['Deseja realmente excluir esta Unidade de Saúde?'],
            onConfirm: async () => {
                try {
                    const response = await axios.delete(
                        `${server.url}${server.endpoints.bairro}/${id}`,
                        {
                            //parâmetros
                        }
                    );

                    console.log("Dados:", response.data);
                    setDados(dados.filter(dado => dado.id !== id));

                    setAlert({
                        show: true,
                        success: true,
                        title: 'Sucesso',
                        message: ['Unidade de Saúde excluída com sucesso!'],
                        onConfirm: () => {
                            setAlert({
                                show: false,
                                success: false,
                                title: '',
                                message: [''],
                                onConfirm: () => { },
                                onClose: () => { }
                            });
                        },
                        onClose: () => {
                            setAlert({
                                show: false,
                                success: false,
                                title: '',
                                message: [''],
                                onConfirm: () => { },
                                onClose: () => { }
                            });
                        }
                    });

                } catch (error) {
                    console.error("Erro:", error);
                    setAlert({
                        show: true,
                        success: false,
                        title: 'Erro',
                        message: ['Erro ao excluir a Unidade de Saúde!'],
                        onConfirm: () => {
                            setAlert({
                                show: false,
                                success: false,
                                title: '',
                                message: [''],
                                onConfirm: () => { },
                                onClose: () => { }
                            });
                        },
                        onClose: () => {
                            setAlert({
                                show: false,
                                success: false,
                                title: '',
                                message: [''],
                                onConfirm: () => { },
                                onClose: () => { }
                            });
                        }
                    });
                }
            },
            onClose: () => {
                setConfirm({
                    show: false,
                    success: false,
                    title: '',
                    message: [''],
                    onConfirm: () => { },
                    onClose: () => { }
                });
            }
        });

    }

    return (
        <Layout>

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Unidades de Saúde" }]} />

            <Titulo titulo="Unidades de Saúde" botao={{ texto: "Cadastrar", href: "/unidades-de-saude/form" }} />

            <Filtro title="Filtrar">
                <p>{"Estabelecimentos"}</p>
            </Filtro>

            <Resultado title="Resultado">
                <table className="table">
                    <thead>
                        <tr>
                            <th>{"ID"}</th>
                            <th>{"Nome"}</th>
                            <th>{"Bairro"}</th>
                            <th>{"Cidade"}</th>
                            <th>{"Opções"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((dado) => (
                            <tr key={dado.id}>
                                <td>{dado.id}</td>
                                <td>{dado.nome}</td>
                                <td>{dado.nome_Bairro}</td>
                                <td>{dado.nome_Cidade}/{dado.sigla_Estado}</td>
                                <td>
                                    <a href={`/unidades-de-saude/form/${dado.id}`} className="btn btn-warning">{"Editar"}</a>
                                    <button className="btn btn-danger"
                                        onClick={() => handleExcluir(dado.id)}
                                    >{"Excluir"}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Resultado>

        </Layout>
    );
};

export default UnidadeSaude;
