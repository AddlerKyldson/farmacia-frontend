import React, { useState } from "react";
import Layout from "../../../structure/Layout";
import Breadcrumb from "../../../other/breadCrumb";
import Titulo from "../../../other/tituloPage";
import ContainerForm from "../../../other/form/containerForm";
import CampoTexto from "../../../other/form/campoTexto";
import BotaoSubmit from "../../../other/form/botaoSubmit";
import Row from "../../../other/grid/row";
import Alert from "../../../other/modal/alert";

const FormEntradasMedicamentos: React.FC = () => {
    const [formData, setFormData] = useState({
        descricao: '',
        data: '',
        codigo_barras: '',
        nome: '',
        quantidade: '',
        data_validade: ''
    });

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
        
        var descricao = validaCampos(formData.descricao, 'Descrição', true);
        var data = validaCampos(formData.data, 'Data', true);
        var codigo_barras = validaCampos(formData.codigo_barras, 'Código de Barras', true);
        var nome = validaCampos(formData.nome, 'Nome', true);
        var quantidade = validaCampos(formData.quantidade, 'Quantidade', true);
        var data_validade = validaCampos(formData.data_validade, 'Data de Validade', true);

        if (descricao.erro) {
            mensagem_erro.push(descricao.mensagem_erro);
        }

        if (data.erro) {
            mensagem_erro.push(data.mensagem_erro);
        }

        if (codigo_barras.erro) {
            mensagem_erro.push(codigo_barras.mensagem_erro);
        }

        if (nome.erro) {
            mensagem_erro.push(nome.mensagem_erro);
        }

        if (quantidade.erro) {
            mensagem_erro.push(quantidade.mensagem_erro);
        }

        if (data_validade.erro) {
            mensagem_erro.push(data_validade.mensagem_erro);
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
                message: ['Entrada Medicamentos cadastrada com sucesso'],
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

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Entrada Medicamentos", href: "/medicamentos/entradas" }, { texto: "Formulário Entrada Medicamentos", href: "#" }]} />

            <Titulo titulo="Formulário Entrada Medicamentos" />

            <ContainerForm title="Informações Básicas">
                <Row>
                    <CampoTexto label="Descrição" name="descricao" tipo="text" className="col-md-8" onChange={handleChange} />
                    <CampoTexto label="Data" name="data" tipo="text" className="col-md-4" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Medicamentos">
                <Row>
                    <CampoTexto label="Código de Barras" name="codigo_barras" tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="Nome" name="nome" tipo="text" className="col-md-4" onChange={handleChange} />
                    <CampoTexto label="Quantidade" name="quantidade" tipo="text" className="col-md-2" onChange={handleChange} />
                    <CampoTexto label="Validade" name="data_validade" tipo="text" className="col-md-3" onChange={handleChange} />
                </Row>

                <Row className="justify-content-end">
                    <BotaoSubmit texto="Adicionar" onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                    />
                </Row>
            </ContainerForm>

            <ContainerForm title="Salvar">
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

export default FormEntradasMedicamentos;
