import React, { useEffect, useState } from "react";
import Layout from "../../structure/Layout";
import Breadcrumb from "../../other/breadCrumb";
import Titulo from "../../other/tituloPage";
import ContainerForm from "../../other/form/containerForm";
import CampoTexto from "../../other/form/campoTexto";
import BotaoSubmit from "../../other/form/botaoSubmit";
import Row from "../../other/grid/row";
import Alert from "../../other/modal/alert";
import CampoSelect from "../../other/form/campoSelect";
import axios from "axios";
import server from "../../../utils/data/server";
import { Container } from "react-bootstrap";
import CampoCheckBox from "../../other/form/campoCheckBox";

const FormUsuarios: React.FC = () => {
    const [Id, setId] = useState(0);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        cns: '',
        logradouro: '',
        numero: '',
        complemento: '',
        id_Estado: '0',
        id_Cidade: '0',
        bairro: '0',
        tipo: '0',
        cep: '',
        senha: '',
        confirmacao_senha: '',
        slug: '',
        permissoes: ''
    });

    const [Estados, setEstados] = useState<any[]>([]);
    const [Cidades, setCidades] = useState<any[]>([]);
    const [Bairros, setBairros] = useState<any[]>([]);

    const [permissions, setPermissions] = useState({
        permissao_farmacia: false,
        permissao_vigilancia_sanitaria: false,
        permissao_sim_sinasc: false,
        permissao_sinan: false,
        permissao_bolsa_familia: false
    });

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        setPermissions(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    //Carrega Estados
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(
                    `${server.url}${server.endpoints.estado}`,
                    {
                        //parâmetros
                    }
                );

                //ajustar array para que o campo value seja o id do estado e o campo label seja o nome do estado, e adiciona uma opção padrão com value 0 e label "Selecione"
                response.data = response.data.$values.map((item: any) => {
                    return { value: item.id, label: item.nome };
                });

                response.data.unshift({ value: 0, label: 'Selecione' });

                setEstados(response.data);

            } catch (error) {
                console.error("Erro:", error);
            }
        };

        fetchData();
    }, []);

    const loadCidades = async (id: number) => {

        try {

            const response = await axios.get(
                `${server.url}${server.endpoints.cidade}/Estado/${id}`,
                {
                    //parâmetros
                }
            );

            if (response.data.length === 0) {
                setCidades([{ value: 0, label: 'Nenhuma cidade encontrada' }]);
                return;
            }

            //ajustar array para que o campo value seja o id do estado e o campo label seja o nome do estado, e adiciona uma opção padrão com value 0 e label "Selecione"
            response.data = response.data.$values.map((item: any) => {
                return { value: item.id, label: item.nome };
            });

            response.data.unshift({ value: 0, label: 'Selecione' });

            setCidades(response.data);

        } catch (error) {

            console.error("Erro:", error);
        }
    }

    const loadBairros = async (id: number) => {

        try {

            const response = await axios.get(
                `${server.url}${server.endpoints.bairro}/Cidade/${id}`,
                {
                    //parâmetros
                }
            );

            if (response.data.length === 0) {
                setCidades([{ value: 0, label: 'Nenhum bairro encontrado' }]);
                return;
            }

            //ajustar array para que o campo value seja o id do estado e o campo label seja o nome do estado, e adiciona uma opção padrão com value 0 e label "Selecione"
            response.data = response.data.$values.map((item: any) => {
                return { value: item.id, label: item.nome };
            });

            response.data.unshift({ value: 0, label: 'Selecione' });

            setBairros(response.data);

        } catch (error) {

            console.error("Erro:", error);
        }
    }



    //configura exibição do Alert
    const [alert, setAlert] = useState({
        show: false,
        success: false,
        title: '',
        message: [''],
        onConfirm: () => { },
        onClose: () => { }
    });

    //verificar se há id na url
    //se houver, buscar os dados do usuário
    //se não houver, cadastrar um novo usuário
    //se houver, atualizar os dados do usuário

    const verificaId = () => {
        const url = window.location.pathname;
        const id = url.split('/').pop();


        if (id !== 'form') {

            setId(parseInt(id ? id : '0'));
            //buscar os dados do usuário
            axios.get(`${server.url}${server.endpoints.usuario}/${id}`).then(response => {

                console.log("Dados:", response.data);

                let permissions = JSON.parse(response.data.permissoes);
                setPermissions(permissions);

                setFormData(response.data);

            }).catch(error => {
                console.error("Erro:", error);
            });
        }
    };

    useEffect(() => {
        verificaId();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'id_Estado') {
            loadCidades(parseInt(value));
        }

        if (name === 'id_Cidade') {
            loadBairros(parseInt(value));
        }
    };

    function validaCampos(value = '', nome_campo = '', obrigatorio = false, tamanho = null) {
        let erro = false;
        let mensagem_erro = '';

        if (obrigatorio && (value === '' || value === null || value === '0')) {
            erro = true;
            mensagem_erro = `Campo ${nome_campo} obrigatório`;
        }

        if (tamanho !== null && value !== null && value.length !== tamanho) {
            erro = true;
            mensagem_erro = `O campo deve ter ${tamanho} caracteres`;
        }

        return { erro, mensagem_erro };
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        console.log(formData);

        var mensagem_erro = [];

        var nome = validaCampos(formData.nome, 'Nome', true);
        var email = validaCampos(formData.email, 'E-mail', true);
        var telefone = validaCampos(formData.telefone, 'Telefone', true);
        var cpf = validaCampos(formData.cpf, 'CPF', true);
        var cns = validaCampos(formData.cns, 'Cartão SUS', true);
        var logradouro = validaCampos(formData.logradouro, 'Logradouro', true);
        var estado = validaCampos(formData.id_Estado, 'Estado', true);
        var cidade = validaCampos(formData.id_Cidade, 'idCidade', true);
        var bairro = validaCampos(formData.bairro, 'Bairro', true);
        var cep = validaCampos(formData.cep, 'CEP', true);
        var senha = validaCampos(formData.senha, 'Senha', true);
        var confirmacao_senha = validaCampos(formData.confirmacao_senha, 'Confirmação de Senha', true);

        if (nome.erro) {
            mensagem_erro.push(nome.mensagem_erro);
        }

        if (email.erro) {
            mensagem_erro.push(email.mensagem_erro);
        }

        if (telefone.erro) {
            mensagem_erro.push(telefone.mensagem_erro);
        }

        if (cpf.erro) {
            mensagem_erro.push(cpf.mensagem_erro);
        }

        if (cns.erro) {
            mensagem_erro.push(cns.mensagem_erro);
        }

        if (logradouro.erro) {
            mensagem_erro.push(logradouro.mensagem_erro);
        }

        if (estado.erro) {
            mensagem_erro.push(estado.mensagem_erro);
        }

        if (cidade.erro) {
            mensagem_erro.push(cidade.mensagem_erro);
        }

        if (bairro.erro) {
            mensagem_erro.push(bairro.mensagem_erro);
        }

        if (cep.erro) {
            mensagem_erro.push(cep.mensagem_erro);
        }

        if (Id === 0) {
            if (senha.erro) {
                mensagem_erro.push(senha.mensagem_erro);
            }

            if (confirmacao_senha.erro) {
                mensagem_erro.push(confirmacao_senha.mensagem_erro);
            }

            if (formData.senha !== formData.confirmacao_senha) {
                mensagem_erro.push('As senhas não conferem');
            }
        }

        if (mensagem_erro.length > 0) {

            setAlert({
                show: true,
                success: false,
                title: 'Erro',
                message: mensagem_erro,
                onConfirm: () => {
                    setAlert({ ...alert, show: false });
                },
                onClose: () => {
                    setAlert({ ...alert, show: false });
                }
            });

            return;
        } else {

            var slug = formData.nome.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            formData.slug = slug;
            formData.permissoes = JSON.stringify(permissions);

            if (Id === 0) {
                axios.post(`${server.url}${server.endpoints.usuario}`, formData).then(response => {
                    console.log("Dados:", response.data);

                    setAlert({
                        show: true,
                        success: true,
                        title: 'Sucesso',
                        message: ['Usuário cadastrada com sucesso'],
                        onConfirm: () => {
                            //recarregar a página
                            window.location.reload();
                        },
                        onClose: () => {
                            //recarregar a página
                            window.location.reload();
                        }
                    });
                }).catch(error => {
                    console.error("Erro:", error);

                    setAlert({
                        show: true,
                        success: false,
                        title: 'Erro',
                        message: ['Erro ao cadastrar usuário'],
                        onConfirm: () => {
                            setAlert({ ...alert, show: false });
                        },
                        onClose: () => {
                            setAlert({ ...alert, show: false });
                        }
                    });

                });
            } else {
                axios.put(`${server.url}${server.endpoints.usuario}/${Id}`, formData).then(response => {
                    console.log("Dados:", response.data);

                    setAlert({
                        show: true,
                        success: true,
                        title: 'Sucesso',
                        message: ['Usuário atualizado com sucesso'],
                        onConfirm: () => {
                            //recarregar a página
                            window.location.reload();
                        },
                        onClose: () => {
                            //recarregar a página
                            window.location.reload();
                        }
                    });
                }).catch(error => {
                    console.error("Erro:", error);

                    setAlert({
                        show: true,
                        success: false,
                        title: 'Erro',
                        message: ['Erro ao atualizar usuário'],
                        onConfirm: () => {
                            setAlert({ ...alert, show: false });
                        },
                        onClose: () => {
                            setAlert({ ...alert, show: false });
                        }
                    });

                });
            }

        }
    }

    return (
        <Layout>

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Usuários", href: "/usuarios/" }, { texto: "Formulário Usuários", href: "#" }]} />

            <Titulo titulo="Formulário Usuários" />

            <ContainerForm title="Informações Básicas">
                <Row>
                    <CampoTexto label="Nome" name="nome" tipo="text" className="col-md-12" value={formData.nome} onChange={handleChange} />
                </Row>
                <Row>
                    <CampoTexto label="E-mail" name="email" tipo="text" className="col-md-3" value={formData.email} onChange={handleChange} />
                    <CampoTexto label="Telefone" name="telefone" tipo="text" className="col-md-3" value={formData.telefone} onChange={handleChange} />
                    <CampoTexto label="CPF" name="cpf" tipo="text" className="col-md-3" value={formData.cpf} onChange={handleChange} />
                    <CampoTexto label="Cartão SUS" name="cns" tipo="text" value={formData.cns} className="col-md-3" onChange={handleChange} />
                </Row>

            </ContainerForm>

            <ContainerForm title="Endereço">
                <Row>
                    <CampoSelect label="Estado" name="id_Estado" value={formData.id_Estado} options={Estados} className="col-md-2" onChange={handleChange} />
                    <CampoSelect label="Cidade" name="id_Cidade" value={formData.id_Cidade} options={Cidades} className="col-md-4" onChange={handleChange} />
                    <CampoSelect label="Bairro" name="bairro" value={formData.bairro} options={Bairros} className="col-md-4" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoTexto label="Logradouro" name="logradouro" value={formData.logradouro} tipo="text" className="col-md-4" onChange={handleChange} />
                    <CampoTexto label="Nº" name="numero" tipo="text" value={formData.numero} className="col-md-2" onChange={handleChange} />
                    <CampoTexto label="CEP" name="cep" tipo="text" value={formData.cep} className="col-md-2" onChange={handleChange} />
                    <CampoTexto label="Complemento" name="complemento" value={formData.complemento} tipo="text" className="col-md-4" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Permissões">

                <Row>
                    <CampoSelect label="Tipo" name="tipo" value={formData.tipo} options={[
                        { value: '0', label: 'Selecione' },
                        { value: '1', label: 'Administrador' },
                        { value: '2', label: 'Gestor' },
                        { value: '3', label: 'Enfermeiro' },
                        { value: '4', label: 'Agente de Saúde' },
                        { value: '5', label: 'Atendente' },
                        { value: '6', label: 'Farmacêutico' },
                        { value: '7', label: 'Vigilante Sanitário' },
                        { value: '8', label: 'Digitador' },
                        { value: '9', label: 'Cidadão' }
                    ]} className="col-md-4" onChange={handleChange} />
                </Row>

                <Row>
                    <CampoCheckBox label="Farmácia" name="permissao_farmacia" value="1" checked={permissions.permissao_farmacia} onChange={handleCheckboxChange} />
                </Row>
                <Row>
                    <CampoCheckBox label="Vigilância Sanitária" name="permissao_vigilancia_sanitaria" value="1" checked={permissions.permissao_vigilancia_sanitaria} onChange={handleCheckboxChange} />
                </Row>
                <Row>
                    <CampoCheckBox label="SIM/SINASC" name="permissao_sim_sinasc" value="1" checked={permissions.permissao_sim_sinasc} onChange={handleCheckboxChange} />
                </Row>
                <Row>
                    <CampoCheckBox label="SINAN" name="permissao_sinan" value="1" checked={permissions.permissao_sinan} onChange={handleCheckboxChange} />
                </Row>
                <Row>
                    <CampoCheckBox label="Bolsa Família" name="permissao_bolsa_familia" value="1" checked={permissions.permissao_bolsa_familia} onChange={handleCheckboxChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title={Id === 0 ? "Senha" : ''}>
                {/* Só exibit os campos de senha se não ouver id*/}
                {Id === 0 &&
                    <Row>
                        <CampoTexto label="Senha" name="senha" tipo="password" className="col-md-6" value={formData.senha} onChange={handleChange} />
                        <CampoTexto label="Confirmação de Senha" name="confirmacao_senha" tipo="password" className="col-md-6" value={formData.confirmacao_senha} onChange={handleChange} />
                    </Row>
                }

                <Row className="justify-content-end">
                    <BotaoSubmit texto="Salvar" onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                    />
                </Row>
            </ContainerForm>

            <Alert
                title={alert.title}
                message={alert.message}
                success={alert.success}
                show={alert.show}
                onConfirm={alert.onConfirm}
                onClose={alert.onClose}
            />

        </Layout>
    );
};

export default FormUsuarios;
