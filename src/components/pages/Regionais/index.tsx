import React, { useEffect, useState } from "react";
import Layout from "../../structure/Layout";
import Filtro from "../../other/filtro";
import Resultado from "../../other/resultado";
import Breadcrumb from "../../other/breadCrumb";
import Titulo from "../../other/tituloPage";
import Alert from "../../other/modal/alert";
import Confirm from "../../other/modal/confirm";
import server from "../../../utils/data/server";
import axios from "axios";

const Regionais: React.FC = () => {

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
                    `${server.url}${server.endpoints.regiao}`,
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
            title: 'Excluir Regional',
            message: ['Deseja realmente excluir esta regional?'],
            onConfirm: async () => {
                try {
                    const response = await axios.delete(
                        `${server.url}${server.endpoints.regiao}/${id}`,
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
                        message: ['Regional excluída com sucesso!'],
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
                        message: ['Erro ao excluir a regional!'],
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

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Regionais" }]} />

            <Titulo titulo="Regionais" botao={{ texto: "Cadastrar", href: "/regionais/form" }} />

            <Filtro title="Filtrar">
                <p>{"Regionais"}</p>
            </Filtro>

            <Resultado title="Resultado">
                <table className="table">
                    <thead>
                        <tr>
                            <th>{"ID"}</th>
                            <th>{"Nome"}</th>
                            <th>{"Regional"}</th>
                            <th>{"Opções"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((dado) => (
                            <tr key={dado.id}>
                                <td>{dado.id}</td>
                                <td>{dado.nome}</td>
                                <td>{dado.siglaEstado}</td>
                                <td>
                                    <a href={`/regionais/form/${dado.id}`} className="btn btn-warning">{"Editar"}</a>
                                    <button className="btn btn-danger"
                                        onClick={() => handleExcluir(dado.id)}
                                    >{"Excluir"}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Resultado>

            <Alert
                title={alert.title}
                message={alert.message}
                success={alert.success}
                show={alert.show}
                onConfirm={alert.onConfirm}
                onClose={alert.onClose}
            />

            <Confirm
                title={confirm.title}
                message={confirm.message}
                success={confirm.success}
                show={confirm.show}
                onConfirm={confirm.onConfirm}
                onClose={confirm.onClose}
            />

        </Layout>
    );
};

export default Regionais;
