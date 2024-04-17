import React, { useState } from "react";
import Layout from "../../structure/Layout";
import Breadcrumb from "../../other/breadCrumb";
import Titulo from "../../other/tituloPage";
import ContainerForm from "../../other/form/containerForm";
import CampoTexto from "../../other/form/campoTexto";
import CampoSelect from "../../other/form/campoSelect";
import BotaoSubmit from "../../other/form/botaoSubmit";
import Row from "../../other/grid/row";
import Alert from "../../other/modal/alert";

const FormUnidadeSaude: React.FC = () => {
    const [formData, setFormData] = useState({
        nome: '',
        cnes: '',
        logradouro: '',
        estado: '',
        cidade: '',
        bairro: '',
        cep: '',
        numero: '',
        complemento: ''
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
        { value: "0", label: "Selecione um bairro" },
        { value: "1", label: "Vila Mariana" },
        { value: "2", label: "Vila Olímpia" },
        { value: "3", label: "Vila Madalena" }
    ]

    function validaCampos(value = '', nome_campo = '', obrigatorio = false, tamanho = 0) {
        let erro = false;
        let mensagem_erro = '';

        if (obrigatorio && (value === '' || value === null || value === '0')) {
            erro = true;
            mensagem_erro = `Campo ${nome_campo} obrigatório`;
        }

        if (tamanho !== 0 && tamanho !== null && value !== null && value.length !== tamanho) {
            erro = true;
            mensagem_erro = `O campo ${nome_campo} deve ter ${tamanho} caracteres`;
        }

        return { erro, mensagem_erro };
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        console.log(formData);

        var mensagem_erro = [];

        var nome = validaCampos(formData.nome, 'Nome', true);
        var cnes = validaCampos(formData.cnes, 'CNES', true, 7);
        var logradouro = validaCampos(formData.logradouro, 'Logradouro', true);
        var estado = validaCampos(formData.estado, 'Estado', true);
        var cidade = validaCampos(formData.cidade, 'Cidade', true);
        var bairro = validaCampos(formData.bairro, 'Bairro', true);
        var cep = validaCampos(formData.cep, 'CEP', true, 8);
        var numero = validaCampos(formData.numero, 'Número', true);
        var complemento = validaCampos(formData.complemento, 'Complemento', true);


        if (nome.erro) {
            mensagem_erro.push(nome.mensagem_erro);
        }

        if (cnes.erro) {
            mensagem_erro.push(cnes.mensagem_erro);
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

        if (numero.erro) {
            mensagem_erro.push(numero.mensagem_erro);
        }

        if (complemento.erro) {
            mensagem_erro.push(complemento.mensagem_erro);
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
                message: ['Unidade de Saúde cadastrado com sucesso'],
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

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Unidades de Saúde", href: "/unidades-de-saude/" }, { texto: "Formulário Unidades de Saúde", href: "#" }]} />

            <Titulo titulo="Formulário Unidades de Saúde" />

            <ContainerForm title="Informações Básicas">
                <Row>
                    <CampoTexto label="Nome" name="nome" tipo="text" className="col-md-8" onChange={handleChange} />
                    <CampoTexto label="CNES" name="cnes" tipo="text" className="col-md-4" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Contato/Endereço">
                <Row>
                    <CampoTexto label="Logradouro" name="logradouro" tipo="text" className="col-md-6" onChange={handleChange} />
                    <CampoSelect label="Estado" name="estado" options={estados} className="col-md-2" onChange={handleChange} />
                    <CampoSelect label="Cidade" name="cidade" options={cidades} className="col-md-4" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Bairro" name="bairro" options={bairros} className="col-md-4" onChange={handleChange} />
                    <CampoTexto label="CEP" name="cep" tipo="text" className="col-md-2" onChange={handleChange} />
                    <CampoTexto label="Número" name="numero" tipo="text" className="col-md-2" onChange={handleChange} />
                    <CampoTexto label="Complemento" name="complemento" tipo="text" className="col-md-4" onChange={handleChange} />
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

export default FormUnidadeSaude;
