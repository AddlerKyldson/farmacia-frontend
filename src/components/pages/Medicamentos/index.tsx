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
import CampoTexto from "../../other/form/campoTexto";

const Medicamentos: React.FC = () => {

    const [dados, setDados] = React.useState<any[]>([]);
    const [filtro_busca, setFiltroBusca] = React.useState<string>('');

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
                    `${server.url}${server.endpoints.medicamento}`,
                    {
                        params: {
                            filtro_busca: filtro_busca
                        }
                    }
                );
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
            message: ['Deseja realmente excluir este medicamento?'],
            onConfirm: async () => {
                try {
                    const response = await axios.delete(
                        `${server.url}${server.endpoints.medicamento}/${id}`,
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
                        message: ['Medicamento excluído com sucesso!'],
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
                        message: ['Erro ao excluir o medicamento!'],
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

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Medicamentos" }]} />

            <Titulo titulo="Medicamentos" botao={{ texto: "Cadastrar", href: "/medicamentos/form" }} />

            <Filtro title="Filtrar">

                <div className="row">
                    <CampoTexto label="Descrição" tipo="text" name="filtro_busca" value={filtro_busca} onChange={
                        (e) => {
                            setFiltroBusca(e.target.value);
                        }
                    } />
                    <div className="col-md-12 d-flex justify-content-end">
                        <button className="btn btn-primary ms-2" onClick={() => {
                            const fetchData = async () => {
                                try {
                                    const response = await axios.get(
                                        `${server.url}${server.endpoints.medicamento}`,
                                        {
                                            params: {
                                                filtro_busca: filtro_busca
                                            }
                                        }
                                    );

                                    console.log("Dados:", response.data.$values);
                                    setDados(response.data.$values);
                                } catch (error) {
                                    console.error("Erro:", error);
                                }
                            };

                            fetchData();
                        }}>{"Buscar"}</button>
                        <button className="btn btn-warning ms-2" onClick={() => {
                            window.location.href = `${server.url}${server.endpoints.medicamento}/gerar_excel`;
                        }}>{"Gerar Excel"}</button>
                    </div>
                </div>
            </Filtro>

            <Resultado title="Resultado">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>{"ID"}</th>
                            <th>{"Código de Barras"}</th>
                            <th>{"Nome"}</th>
                            <th>{"Apelido"}</th>
                            <th>{"Estoque"}</th>
                            <th>{"Opções"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((dado) => (
                            <tr key={dado.id}>
                                <td>{dado.id}</td>
                                <td>{dado.codigo_Barras}</td>
                                <td>{dado.nome}</td>
                                <td>{dado.apelido}</td>
                                <td>{dado.estoque}</td>
                                <td>
                                    <a href={`/medicamentos/form/${dado.id}`} className="btn btn-warning btn-sm">{"Editar"}</a>
                                    <button className="btn btn-danger btn-sm ms-1"
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

export default Medicamentos;
