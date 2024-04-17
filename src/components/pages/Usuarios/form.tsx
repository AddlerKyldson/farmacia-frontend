import React, { useState } from "react";
import Layout from "../../structure/Layout";
import Breadcrumb from "../../other/breadCrumb";
import Titulo from "../../other/tituloPage";
import ContainerForm from "../../other/form/containerForm";
import CampoTexto from "../../other/form/campoTexto";
import BotaoSubmit from "../../other/form/botaoSubmit";
import Row from "../../other/grid/row";
import Alert from "../../other/modal/alert";
import CampoSelect from "../../other/form/campoSelect";

const FormUsuarios: React.FC = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        cns: '',
        logradouro: '',
        estado: '0',
        cidade: '0',
        bairro: '0',
        cep: '',
        senha: '',
        confirmacao_senha: ''
    });

    const estados = [
        { value: "0", label: "Selecione um estado" },
        { value: "1", label: "São Paulo" },
        { value: "2", label: "Rio de Janeiro" },
        { value: "3", label: "Minas Gerais" }
    ];

    const cidades = [
        { value: "0", label: "Selecione uma cidade" },
        { value: "1", label: "São Paulo" },
        { value: "2", label: "Rio de Janeiro" },
        { value: "3", label: "Belo Horizonte" }
    ];

    const bairros = [
        { value: "0", label: "Selecione uma cidade" },
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

        if (senha.erro) {
            mensagem_erro.push(senha.mensagem_erro);
        }

        if (confirmacao_senha.erro) {
            mensagem_erro.push(confirmacao_senha.mensagem_erro);
        }

        if (formData.senha !== formData.confirmacao_senha) {
            mensagem_erro.push('As senhas não conferem');
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
        }
    }

    return (
        <Layout>

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Usuários", href: "/usuarios/" }, { texto: "Formulário Usuários", href: "#" }]} />

            <Titulo titulo="Formulário Usuários" />

            <ContainerForm title="Informações Básicas">
                <Row>
                    <CampoTexto label="Nome" name="nome" tipo="text" className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoTexto label="E-mail" name="email" tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="Telefone" name="telefone" tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="CPF" name="cpf" tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="Cartão SUS" name="cns" tipo="text" className="col-md-3" onChange={handleChange} />
                </Row>

            </ContainerForm>

            <ContainerForm title="Endereço">
                <Row>
                    <CampoTexto label="Logradouro" name="logradouro" tipo="text" className="col-md-4" onChange={handleChange} />
                    <CampoSelect label="Estado" name="estado" options={estados} className="col-md-2" onChange={handleChange} />
                    <CampoSelect label="Cidade" name="cidade" options={cidades} className="col-md-4" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Bairro" name="bairro" options={bairros} className="col-md-4" onChange={handleChange} />
                    <CampoTexto label="CEP" name="cep" tipo="text" className="col-md-2" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Senha">
                <Row>
                    <CampoTexto label="Senha" name="senha" tipo="password" className="col-md-6" onChange={handleChange} />
                    <CampoTexto label="Confirmação de Senha" name="confirmacao_senha" tipo="password" className="col-md-6" onChange={handleChange} />
                </Row>

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
