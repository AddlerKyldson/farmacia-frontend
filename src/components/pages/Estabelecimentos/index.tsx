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
import ContainerForm from "../../other/form/containerForm";
import Row from "../../other/grid/row";
import CampoSelect from "../../other/form/campoSelect";
import BotaoSubmit from "../../other/form/botaoSubmit";

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

    const [responsavelLegal, setResponsavelLegal] = useState({
        cpf: '',
        nome_responsavel: '',
        email: '',
        escolaridade: '0',
        Id_Estabelecimento: 0,
        status: 1
    });

    const [responsavelTecnico, setResponsavelTecnico] = useState({
        cpf: '',
        nome_responsavel: '',
        email: '',
        escolaridade: '0',
        formacao: '',
        especializacao: '',
        registro_conselho: '',
        Id_Estabelecimento: 0,
        status: 1
    });

    const handleChangeResponsavelLegal = (e: any) => {
        const { name, value } = e.target;
        setResponsavelLegal({
            ...responsavelLegal,
            [name]: value
        });
    };

    const handleChangeResponsavelTecnico = (e: any) => {
        const { name, value } = e.target;
        setResponsavelTecnico({
            ...responsavelTecnico,
            [name]: value
        });
    };

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
        setResponsavelTecnico({
            ...responsavelTecnico,
            Id_Estabelecimento: id
        });

        // Abra o modal
        setIsModalRTOpen(true);
        // Faça a requisição ao servidor com axios
        axios.get(`${server.url}${server.endpoints.estabelecimento}/${id}/responsaveis-tecnicos`)
            .then(response => {
                console.log(response.data.$values);

                if (response.data.$values.length > 0) {

                    setModalRTContent(response.data.$values.map((item: any) => {
                        return (
                            <div className="col-md-6 mt-3">
                                <div key={item.id} className="card">
                                    <div className="card-header">
                                        <strong>{item.nome_responsavel}</strong>
                                    </div>
                                    <div className="card-body">
                                        <small><strong>Email: </strong> {item.email}</small><br></br>
                                        <small><strong>CPF: </strong> {item.cpf}</small>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-danger btn-sm" onClick={(e) => { handleExcluirResponsavelTecnico(e, id, item.id) }}>Excluir</button>
                                    </div>
                                </div>
                            </div>
                        );
                    }));

                } else {
                    setModalRTContent("Nenhum responsável legal cadastrado.");
                }

            })
            .catch(error => {
                console.error("Erro ao carregar dados:", error);
            });


    };

    const handleExcluirResponsavelLegal = (e: React.MouseEvent<HTMLButtonElement>, idEstabelecimento: number, id: number) => {
        e.preventDefault();

        console.log(`Excluindo responsável legal do estabelecimento ID: ${idEstabelecimento}, Responsável Legal ID: ${id}`);

        // Faça a requisição ao servidor com axios
        axios.delete(`${server.url}${server.endpoints.estabelecimento}/responsavelLegal/${idEstabelecimento}/${id}`)
            .then(response => {
                // Atualizar a lista de responsáveis legais
                handleItemRLClick(idEstabelecimento);

                // Exibir mensagem de sucesso
                document.getElementById("resultado")!.innerHTML = `<div class="alert alert-success mt-3 w-100" role="alert">${response.data}</div>`;
            })
            .catch(error => {
                console.error("Erro ao carregar dados:", error);
                // Exibir mensagem de erro
                document.getElementById("resultado")!.innerHTML = `<div class="alert alert-danger mt-3 w-100" role="alert">Erro ao excluir responsável legal: ${error}</div>`;
            });
    };

    const handleExcluirResponsavelTecnico = (e: React.MouseEvent<HTMLButtonElement>, idEstabelecimento: number, id: number) => {
        e.preventDefault();

        console.log(`Excluindo responsável Técnico do estabelecimento ID: ${idEstabelecimento}, Responsável Técnico ID: ${id}`);

        // Faça a requisição ao servidor com axios
        axios.delete(`${server.url}${server.endpoints.estabelecimento}/responsavelTecnico/${idEstabelecimento}/${id}`)
            .then(response => {
                // Atualizar a lista de responsáveis legais
                handleItemRTClick(idEstabelecimento);

                // Exibir mensagem de sucesso
                document.getElementById("resultado")!.innerHTML = `<div class="alert alert-success mt-3 w-100" role="alert">${response.data}</div>`;
            })
            .catch(error => {
                console.error("Erro ao carregar dados:", error);
                // Exibir mensagem de erro
                document.getElementById("resultado")!.innerHTML = `<div class="alert alert-danger mt-3 w-100" role="alert">Erro ao excluir responsável técnico: ${error}</div>`;
            });
    };


    const handleItemRLClick = (id: number) => {
        //setar o id do estabelecimento no estado
        setResponsavelLegal({
            ...responsavelLegal,
            Id_Estabelecimento: id
        });

        // Abra o modal
        setIsModalRLOpen(true);
        // Faça a requisição ao servidor com axios
        axios.get(`${server.url}${server.endpoints.estabelecimento}/${id}/responsaveis-legais`)
            .then(response => {
                console.log(response.data.$values);

                if (response.data.$values.length > 0) {

                    setModalRLContent(response.data.$values.map((item: any) => {
                        return (
                            <div className="col-md-6 mt-3">
                                <div key={item.id} className="card">
                                    <div className="card-header">
                                        <strong>{item.nome_responsavel}</strong>
                                    </div>
                                    <div className="card-body">
                                        <small><strong>Email: </strong> {item.email}</small><br></br>
                                        <small><strong>CPF: </strong> {item.cpf}</small>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-danger btn-sm" onClick={(e) => { handleExcluirResponsavelLegal(e, id, item.id) }}>Excluir</button>
                                    </div>
                                </div>
                            </div>
                        );
                    }));

                } else {
                    setModalRLContent("Nenhum responsável legal cadastrado.");
                }

            })
            .catch(error => {
                console.error("Erro ao carregar dados:", error);
            });


    };

    const closeModalRT = () => {
        setIsModalRTOpen(false);
        setSelectedItemRT(null);
    };

    const closeModalRL = () => {
        setIsModalRLOpen(false);
        setSelectedItemRL(null);
    };

    const escolaridade = [
        { value: "0", label: "Selecione" },
        { value: "1", label: "Analfabeto" },
        { value: "2", label: "Até 5ª Incompleto" },
        { value: "3", label: "5ª Completo" },
        { value: "4", label: "6ª a 9ª Incompleto" },
        { value: "5", label: "9ª Completo" },
        { value: "6", label: "Ensino Médio Incompleto" },
        { value: "7", label: "Ensino Médio Completo" },
        { value: "8", label: "Superior Incompleto" },
        { value: "9", label: "Superior Completo" },
    ];

    const handleAddResponsavelLegal = async () => {
        try {
            const response = await axios.post(`${server.url}${server.endpoints.estabelecimento}/responsavelLegal`, responsavelLegal);

            console.log(response.data);

            // Exibir mensagem de sucesso adicionando um alert do bootstrap com a mensagem de sucesso na div com id resultado
            document.getElementById("resultado")!.innerHTML = `<div class="alert alert-success mt-3 w-100" role="alert">${response.data}</div>`;

            // Atualizar a lista de responsáveis legais primeiro
            handleItemRLClick(responsavelLegal.Id_Estabelecimento);

            // Limpar os campos do formulário após a atualização da lista com exceção do id do estabelecimento
            setResponsavelLegal({
                ...responsavelLegal,
                cpf: '',
                nome_responsavel: '',
                email: '',
                escolaridade: '0'
            });


        } catch (error) {
            console.error('Erro ao adicionar responsável legal:', error);
            // Exibir mensagem de erro adicionando um alert do bootstrap com a mensagem de erro na div com id resultado
            document.getElementById("resultado")!.innerHTML = `<div class="alert alert-danger mt-3 w-100" role="alert">Erro ao adicionar responsável legal: ${error}</div>`;
        }
    };

    const handleAddResponsavelTecnico = async () => {
        try {
            const response = await axios.post(`${server.url}${server.endpoints.estabelecimento}/responsavelTecnico`, responsavelTecnico);

            console.log(response.data);

            // Exibir mensagem de sucesso adicionando um alert do bootstrap com a mensagem de sucesso na div com id resultado
            document.getElementById("resultado")!.innerHTML = `<div class="alert alert-success mt-3 w-100" role="alert">${response.data}</div>`;

            // Atualizar a lista de responsáveis legais primeiro
            handleItemRTClick(responsavelTecnico.Id_Estabelecimento);

            // Limpar os campos do formulário após a atualização da lista com exceção do id do estabelecimento
            setResponsavelTecnico({
                ...responsavelTecnico,
                cpf: '',
                nome_responsavel: '',
                email: '',
                escolaridade: '0',
                formacao: '',
                especializacao: '',
                registro_conselho: '',
            });


        } catch (error) {
            console.error('Erro ao adicionar responsável técnico:', error);
            // Exibir mensagem de erro adicionando um alert do bootstrap com a mensagem de erro na div com id resultado
            document.getElementById("resultado")!.innerHTML = `<div class="alert alert-danger mt-3 w-100" role="alert">Erro ao adicionar responsável técnico: ${error}</div>`;
        }
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

            <Modal show={isModalRTOpen} onHide={closeModalRT} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Responsáveis Técnicos</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <ContainerForm title="Adicionar Novo">
                        <Row>
                            <CampoTexto label="CPF" value={responsavelTecnico.cpf} tipo="text" name="cpf" placeholder="CPF" className="col-md-4" onChange={(e) => handleChangeResponsavelTecnico(e)} />
                            <CampoTexto label="Nome" value={responsavelTecnico.nome_responsavel} tipo="text" name="nome_responsavel" placeholder="Nome" className="col-md-4" onChange={(e) => handleChangeResponsavelTecnico(e)} />
                            <CampoTexto label="E-mail" value={responsavelTecnico.email} tipo="text" name="email" placeholder="E-mail" className="col-md-4" onChange={(e) => handleChangeResponsavelTecnico(e)} />
                        </Row>
                        <Row>
                            <CampoSelect label="Escolaridade" value={responsavelTecnico.escolaridade} name="escolaridade" options={escolaridade} className="col-md-4" onChange={(e) => handleChangeResponsavelTecnico(e)} />
                            <CampoTexto label="Formação" value={responsavelTecnico.formacao} tipo="text" name="formacao" placeholder="Formação" className="col-md-4" onChange={(e) => handleChangeResponsavelTecnico(e)} />
                            <CampoTexto label="Especialização" value={responsavelTecnico.especializacao} tipo="text" name="especializacao" placeholder="Especialização" className="col-md-4" onChange={(e) => handleChangeResponsavelTecnico(e)} />
                            <CampoTexto label="Registro no Conselho" value={responsavelTecnico.registro_conselho} tipo="text" name="registro_conselho" placeholder="Registro no Conselho" className="col-md-4" onChange={(e) => handleChangeResponsavelTecnico(e)} />
                        </Row>
                        <Row className="justify-content-end">
                            <BotaoSubmit texto="Adicionar Novo" onClick={(e) => {
                                e.preventDefault();
                                handleAddResponsavelTecnico();
                            }}
                            />
                        </Row>

                        <Row>
                            <div id="resultado" className="w-100 px-2">

                            </div>
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Lista">
                        <div className="row">
                            {modalRTContent}
                        </div>
                    </ContainerForm>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModalRT}>Fechar</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={isModalRLOpen} onHide={closeModalRL} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Responsáveis Legais</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <ContainerForm title="Adicionar Novo">
                        <Row>
                            <CampoTexto label="CPF" value={responsavelLegal.cpf} tipo="text" name="cpf" placeholder="CPF" className="col-md-4" onChange={(e) => handleChangeResponsavelLegal(e)} />
                            <CampoTexto label="Nome" value={responsavelLegal.nome_responsavel} tipo="text" name="nome_responsavel" placeholder="Nome" className="col-md-4" onChange={(e) => handleChangeResponsavelLegal(e)} />
                            <CampoTexto label="E-mail" value={responsavelLegal.email} tipo="text" name="email" placeholder="E-mail" className="col-md-4" onChange={(e) => handleChangeResponsavelLegal(e)} />
                        </Row>
                        <Row>
                            <CampoSelect label="Escolaridade" value={responsavelLegal.escolaridade} name="escolaridade" options={escolaridade} className="col-md-3" onChange={(e) => handleChangeResponsavelLegal(e)} />
                        </Row>
                        <Row className="justify-content-end">
                            <BotaoSubmit texto="Adicionar Novo" onClick={(e) => {
                                e.preventDefault();
                                handleAddResponsavelLegal();
                            }}
                            />
                        </Row>

                        <Row>
                            <div id="resultado" className="w-100 px-2">

                            </div>
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Lista">
                        <div className="row">
                            {modalRLContent}
                        </div>
                    </ContainerForm>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModalRL}>Fechar</Button>
                </Modal.Footer>
            </Modal>

        </Layout>
    );
};

export default Estabelecimentos;
