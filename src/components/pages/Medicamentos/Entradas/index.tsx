import React, { useEffect, useState } from "react";
import Layout from "../../../structure/Layout";
import Filtro from "../../../other/filtro";
import Resultado from "../../../other/resultado";
import Breadcrumb from "../../../other/breadCrumb";
import Titulo from "../../../other/tituloPage";
import server from "../../../../utils/data/server";
import axios from "axios";
import Alert from "../../../other/modal/alert";
import Confirm from "../../../other/modal/confirm";

const EntradasMedicamentos: React.FC = () => {

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
                    `${server.url}${server.endpoints.medicamento_movimentacao}`,
                    {
                        //parâmetros
                    }
                );

                console.log("Dados:", response.data.$values);
                setDados(response.data.$values);

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
            title: 'Excluir Cidade',
            message: ['Deseja realmente excluir esta entrada?'],
            onConfirm: async () => {
                try {
                    const response = await axios.delete(
                        `${server.url}${server.endpoints.medicamento_movimentacao}/${id}`,
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
                        message: ['Entrada excluída com sucesso!'],
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
                        message: ['Erro ao excluir a entrada!'],
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

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Entradas de Medicamentos" }]} />

            <Titulo titulo="Entradas de Medicamentos" botao={{ texto: "Cadastrar", href: "/medicamentos/entradas/form" }} />

            <Filtro title="Filtrar">
                <p>{"Entradas de Medicamentos"}</p>
            </Filtro>

            <Resultado title="Resultado">
                <table className="table">
                    <thead>
                        <tr>
                            <th>{"ID"}</th>
                            <th>{"Descrição"}</th>
                            <th>{"Data"}</th>
                            <th>{"Opções"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((dado) => (
                            <tr key={dado.id}>
                                <td>{dado.id}</td>
                                <td>{dado.descricao}</td>
                                <td>{
                                    //Data formatada
                                    new Date(dado.data).toLocaleDateString()
                                    }</td>
                                <td>
                                    <a href={`/medicamentos/entradas/form/${dado.id}`} className="btn btn-warning">{"Editar"}</a>
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

export default EntradasMedicamentos;
