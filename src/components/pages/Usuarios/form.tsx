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
        estado: '0',
        cidade: '0',
        bairro: '0',
        cep: '',
        senha: '',
        confirmacao_senha: '',
        slug: ''
    });

    const estados = [
        { value: "0", label: "Selecione um Estado" },
        { value: "1", label: "São Paulo" },
        { value: "2", label: "Rio de Janeiro" },
        { value: "3", label: "Minas Gerais" }
    ];

    const cidades = [
        { value: "0", label: "Selecione uma Cidade" },
        { value: "1", label: "São Paulo" },
        { value: "2", label: "Rio de Janeiro" },
        { value: "3", label: "Belo Horizonte" }
    ];

    const bairros = [
        { value: "0", label: "Selecione um Bairro" },
        { value: "1", label: "São Paulo" },
        { value: "2", label: "Rio de Janeiro" },
        { value: "3", label: "Belo Horizonte" }
    ];

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
        var estado = validaCampos(formData.estado, 'Estado', true);
        var cidade = validaCampos(formData.cidade, 'Cidade', true);
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
                    <CampoSelect label="Estado" name="estado" value={formData.estado} options={estados} className="col-md-2" onChange={handleChange} />
                    <CampoSelect label="Cidade" name="cidade" value={formData.cidade} options={cidades} className="col-md-4" onChange={handleChange} />
                    <CampoSelect label="Bairro" name="bairro" value={formData.bairro} options={bairros} className="col-md-4" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoTexto label="Logradouro" name="logradouro" value={formData.logradouro} tipo="text" className="col-md-4" onChange={handleChange} />
                    <CampoTexto label="Nº" name="numero" tipo="text" value={formData.numero} className="col-md-2" onChange={handleChange} />
                    <CampoTexto label="CEP" name="cep" tipo="text" value={formData.cep} className="col-md-2" onChange={handleChange} />
                    <CampoTexto label="Complemento" name="complemento" value={formData.complemento} tipo="text" className="col-md-4" onChange={handleChange} />
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
