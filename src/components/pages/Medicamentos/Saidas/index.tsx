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
import CampoTexto from "../../../other/form/campoTexto";

const ITEMS_PER_PAGE = 20;

const SaidasMedicamentos: React.FC = () => {

    const [dados, setDados] = React.useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
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
                    `${server.url}${server.endpoints.medicamento_movimentacao}`,
                    {
                        params: {
                            tipo: '2', // substitua 'seuTipo' pelo valor que você deseja enviar
                            filtro_busca: filtro_busca,
                            page: page,
                            limit: ITEMS_PER_PAGE
                        }
                    }
                );

                setDados(response.data.dados.$values);
                setTotal(response.data.total);
            } catch (error) {
                console.error("Erro:", error);
            }
        };

        fetchData();
    }, []);
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    const handleExcluir = async (id: number) => {

        setConfirm({
            show: true,
            success: false,
            title: 'Excluir Saída',
            message: ['Deseja realmente excluir esta saída?'],
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
                        message: ['Saída excluída com sucesso!'],
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
                        message: ['Erro ao excluir a saída!'],
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

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Saídas de Medicamentos" }]} />

            <Titulo titulo="Saídas de Medicamentos" botao={{ texto: "Cadastrar", href: "/medicamentos/saidas/form" }} />

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
                                        `${server.url}${server.endpoints.medicamento_movimentacao}`,
                                        {
                                            params: {
                                                tipo: '2', // substitua 'seuTipo' pelo valor que você deseja enviar
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
                    </div>
                </div>
            </Filtro>

            <Resultado title="Resultado">
                <table className="table table-bordered table-striped">
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
                                    <a href={`/medicamentos/saidas/form/${dado.id}`} className="btn btn-warning btn-sm">{"Editar"}</a>
                                    <button className="btn btn-danger btn-sm ms-1"
                                        onClick={() => handleExcluir(dado.id)}
                                    >{"Excluir"}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="d-flex justify-content-center">
                    <ul className="pagination">
                        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                            <a className="page-link" href="#" onClick={() => setPage(page - 1)} tabIndex={-1} aria-disabled={page === 1}>{"Anterior"}</a>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
                                <a className="page-link" href="#" onClick={() => setPage(index + 1)}>{index + 1}</a>
                            </li>
                        ))}
                        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                            <a className="page-link" href="#" onClick={() => setPage(page + 1)} tabIndex={-1} aria-disabled={page === totalPages}>{"Próximo"}</a>
                        </li>
                    </ul>
                </div>

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

export default SaidasMedicamentos;
