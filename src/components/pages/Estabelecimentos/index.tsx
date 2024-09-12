import React, { useEffect, useState } from "react";
import Layout from "../../structure/Layout";
import Filtro from "../../other/filtro";
import Resultado from "../../other/resultado";
import Breadcrumb from "../../other/breadCrumb";
import Titulo from "../../other/tituloPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useAuth } from "../../../context/AuthContext";
import server from "../../../utils/data/server";
import axios from "axios";
import Alert from "../../other/modal/alert";
import Confirm from "../../other/modal/confirm";
import CampoTexto from "../../other/form/campoTexto";
import { Button, Modal } from "react-bootstrap";

const ITEMS_PER_PAGE = 20;

interface Item {
    id: number;
    title: string;
}

const Estabelecimentos: React.FC = () => {

    const { user } = useAuth();
    const [dados, setDados] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [filtroBusca, setFiltroBusca] = useState<string>(''); // Input field state
    const [searchTerm, setSearchTerm] = useState<string>(''); // Termo de busca efetivo
    const [isModalRTOpen, setIsModalRTOpen] = useState(false);
    const [selectedItemRT, setSelectedItemRT] = useState<Item | null>(null);
    const [modalRTContent, setModalRTContent] = useState<string>('');
    const [isModalRLOpen, setIsModalRLOpen] = useState(false);
    const [selectedItemRL, setSelectedItemRL] = useState<Item | null>(null);
    const [modalRLContent, setModalRLContent] = useState<string>('');

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
                    `${server.url}${server.endpoints.estabelecimento}`,
                    {
                        params: {
                            filtro_busca: searchTerm,
                            page: page,
                            perPage: ITEMS_PER_PAGE
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
    }, [page, searchTerm]);

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    const handleExcluir = async (id: number) => {
        setConfirm({
            show: true,
            success: false,
            title: 'Excluir Estabelecimento',
            message: ['Deseja realmente excluir este estabelecimento?'],
            onConfirm: async () => {
                try {
                    await axios.delete(
                        `${server.url}${server.endpoints.estabelecimento}/${id}`
                    );

                    setDados(dados.filter(dado => dado.id !== id));

                    setAlert({
                        show: true,
                        success: true,
                        title: 'Sucesso',
                        message: ['Estabelecimento excluído com sucesso!'],
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
                        message: ['Erro ao excluir o estabelecimento!'],
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
        setSearchTerm(filtroBusca);
        setPage(1); // Resetar para a primeira página ao buscar
    };

    const handleItemRTClick = (id: number) => {
        // Abra o modal
        setIsModalRTOpen(true);
        // Faça a requisição ao servidor com axios
        /* axios.get(`https://api.example.com/items/${id}`)
            .then(response => {
                setSelectedItemRT(response.data);
                setModalRTContent(response.data.description); // Exemplo de dado recebido
            })
            .catch(error => {
                console.error("Erro ao carregar dados:", error);
            }); */


    };

    const handleItemRLClick = (id: number) => {
        // Abra o modal
        setIsModalRLOpen(true);
        // Faça a requisição ao servidor com axios
        /* axios.get(`https://api.example.com/items/${id}`)
            .then(response => {
                setSelectedItemRT(response.data);
                setModalRTContent(response.data.description); // Exemplo de dado recebido
            })
            .catch(error => {
                console.error("Erro ao carregar dados:", error);
            }); */


    };

    const closeModalRT = () => {
        setIsModalRTOpen(false);
        setSelectedItemRT(null);
    };

    const closeModalRL = () => {
        setIsModalRLOpen(false);
        setSelectedItemRL(null);
    };
    return (
        <Layout>

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Estabelecimentos" }]} />

            <Titulo titulo="Estabelecimentos" botao={{ texto: "Cadastrar", href: "/estabelecimentos/form" }} />

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
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>{"ID"}</th>
                            <th>{"Nome"}</th>
                            <th>{"Telefone"}</th>
                            <th>{"Email"}</th>
                            <th>{"Opções"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((dado) => (
                            <tr key={dado.id}>
                                <td>{dado.id}</td>
                                <td>
                                    {dado.nome_fantasia}<br />
                                    <small>{dado.razao_social}</small>
                                </td>
                                <td>{dado.telefone}</td>
                                <td>{dado.email}</td>
                                <td>
                                    {['1', '2', '8', '7'].includes(user_type) && (
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-secondary btn-sm dropdown-toggle"
                                                type="button"
                                                id={`dropdownMenuButton${dado.id}`}
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Ações
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${dado.id}`}>
                                                <li>
                                                    <a href={`/estabelecimentos/form/${dado.id}`} className="dropdown-item">Editar</a>
                                                </li>
                                                <li onClick={() => handleItemRLClick(dado.id)}>
                                                    <button className="dropdown-item">Responsáveis Legais</button>
                                                </li>
                                                <li onClick={() => handleItemRTClick(dado.id)}>
                                                    <button className="dropdown-item">Responsáveis Técnicos</button>
                                                </li>
                                                <li>
                                                    <button className="dropdown-item" onClick={() => handleExcluir(dado.id)}>Excluir</button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
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

            <Modal show={isModalRTOpen} onHide={closeModalRT}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedItemRT?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Conteúdo do modal para {selectedItemRT?.title}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModalRT}>Fechar</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={isModalRLOpen} onHide={closeModalRL}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedItemRL?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Conteúdo do modal para {selectedItemRL?.title}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModalRL}>Fechar</Button>
                </Modal.Footer>
            </Modal>

        </Layout>
    );
};

export default Estabelecimentos;
