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
import { useAuth } from "../../../context/AuthContext";
import OverlayLoading from "../../other/overlayLoading";

const ITEMS_PER_PAGE = 20;

const Denuncias: React.FC = () => {
    const { user } = useAuth();
    const [dados, setDados] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [filtroBusca, setFiltroBusca] = useState<string>(''); // Input field state
    const [searchTerm, setSearchTerm] = useState<string>(''); // Termo de busca efetivo
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const user_type = user?.role ? user?.role : '0';

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
                    `${server.url}${server.endpoints.denuncia}`,
                    {
                        params: {
                            filtro_busca: searchTerm,
                            page: page,
                            perPage: ITEMS_PER_PAGE
                        }
                    }
                );

                console.log(response.data.dados.$values);

                setDados(response.data.dados.$values);
                setTotal(response.data.total);
                setIsLoading(false);
            } catch (error) {
                console.error("Erro:", error);
            }
        };

        fetchData();
    }, [page, searchTerm]);

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    const handleExcluir = async (id: number) => {
        setConfirm({
            show: true,
            success: false,
            title: 'Excluir Denúncia',
            message: ['Deseja realmente excluir este denuncia?'],
            onConfirm: async () => {
                try {
                    await axios.delete(
                        `${server.url}${server.endpoints.denuncia}/${id}`
                    );

                    setDados(dados.filter(dado => dado.id !== id));

                    setAlert({
                        show: true,
                        success: true,
                        title: 'Sucesso',
                        message: ['Denúncia excluído com sucesso!'],
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
                        message: ['Erro ao excluir o denuncia!'],
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
    };

    const handleSearch = () => {
        setIsLoading(true);
        setSearchTerm(filtroBusca);
        setPage(1); // Resetar para a primeira página ao buscar
        setIsLoading(false);
    };

    const formatDate = (dateStr: any) => {
        const date = new Date(dateStr);
        // Verifica se a data é válida
        if (isNaN(date.getTime())) {
            return 'Data inválida'; // Ou qualquer outra mensagem/valor que faça sentido
        }

        // Extrai o dia, mês e ano da data
        const day = String(date.getDate()).padStart(2, '0'); // Adiciona zero à esquerda, se necessário
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0, por isso +1
        const year = date.getFullYear();

        // Retorna a data no formato dd/mm/yyyy
        return `${day}/${month}/${year}`;
    };

    function verificarAtendimento(atendida: any) {
        switch (atendida) {
            case 1:
                return "Sim";
            case 2:
                return "Não";
            case 3:
                return "Encaminhada";
            default:
                return "Não informado";
        }
    }

    return (



        <Layout>


            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Denuncias" }]} />

            <Titulo titulo="Denuncias" botao={{ texto: "Cadastrar", href: "/denuncias/form" }} />

            <Filtro title="Filtrar">
                <div className="row">
                    <CampoTexto label="Descrição" tipo="text" name="filtro_busca" placeholder="Buscar por código de barras, nome ou apelido" value={filtroBusca} onChange={
                        (e) => setFiltroBusca(e.target.value)
                    } />
                    <div className="col-md-12 d-flex justify-content-end">
                        <button className="btn btn-primary ms-2" onClick={handleSearch}>{"Buscar"}</button>
                    </div>
                </div>
            </Filtro>

            <Resultado title="Resultado">

                {isLoading && <OverlayLoading />}

                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>{"ID"}</th>
                            <th>{"Descrição"}</th>
                            <th>{"Bairro"}</th>
                            <th>{"Atendida"}</th>
                            <th>{"Data Denúncia"}</th>
                            {['1', '2', '8', '7'].includes(user_type) && <th>{"Opções"}</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((dado) => (
                            <tr key={dado.id}>
                                <td>{dado.id}</td>
                                <td>{dado.descricao}</td>
                                <td>{dado.bairro}</td>
                                <td>{
                                    verificarAtendimento(dado.atendida)
                                }</td>
                                <td>{
                                    formatDate(new Date(dado.data_Recebimento).toISOString().split('T')[0])
                                }</td>
                                {['1', '2', '8', '7'].includes(user_type) && (
                                    <td>
                                        <a href={`/denuncias/form/${dado.id}`} className="btn btn-warning btn-sm">{"Editar"}</a>
                                        <button className="btn btn-danger btn-sm ms-1" onClick={() => handleExcluir(dado.id)}>{"Excluir"}</button>
                                    </td>
                                )}
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

export default Denuncias;
