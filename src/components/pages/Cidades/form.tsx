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

const FormCidades: React.FC = () => {
    const [formData, setFormData] = useState({
        nome: '',
        estado: '',
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
        var estado = validaCampos(formData.estado, 'Estado', true);

        if (nome.erro) {
            mensagem_erro.push(nome.mensagem_erro);
        }

        if (estado.erro) {
            mensagem_erro.push(estado.mensagem_erro);
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
                message: ['Cidade cadastrada com sucesso'],
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

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Cidades", href: "/cidades/" }, { texto: "Formulário Cidades", href: "#" }]} />

            <Titulo titulo="Formulário Cidades" />

            <ContainerForm title="Informações Básicas">
                <Row>
                    <CampoTexto label="Nome" name="nome" tipo="text" className="col-md-10" onChange={handleChange} />
                    <CampoSelect label="Estado" name="estado" options={estados} className="col-md-2" onChange={handleChange} />
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

export default FormCidades;
