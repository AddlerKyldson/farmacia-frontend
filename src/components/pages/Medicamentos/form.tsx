import React, { useEffect, useState } from "react";
import Layout from "../../structure/Layout";
import Breadcrumb from "../../other/breadCrumb";
import Titulo from "../../other/tituloPage";
import ContainerForm from "../../other/form/containerForm";
import CampoTexto from "../../other/form/campoTexto";
import BotaoSubmit from "../../other/form/botaoSubmit";
import Row from "../../other/grid/row";
import Alert from "../../other/modal/alert";
import axios from "axios";
import server from "../../../utils/data/server";

const FormMedicamentos: React.FC = () => {
    const [Id, setId] = useState(0);
    const [formData, setFormData] = useState({
        codigo_Barras: '',
        nome: '',
        apelido: '',
        estoque: 0,
        slug: ''
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

    //Verifica ID
    const verificaId = () => {
        const url = window.location.pathname;
        const id = url.split('/').pop();


        if (id !== 'form') {

            setId(parseInt(id ? id : '0'));
            //buscar os dados do estado
            axios.get(`${server.url}${server.endpoints.medicamento}/${id}`).then(response => {

                setFormData(response.data);

            }).catch(error => {
                console.error("Erro:", error);
            });
        } else {
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

        //Alerta de Carregando
        setAlert({
            show: true,
            success: true,
            title: 'Carregando',
            message: ['Carregando solicitação...'],
            onConfirm: () => {
                //recarregar a página
                //window.location.reload();
            },
            onClose: () => {
                //recarregar a página
                //window.location.reload();
            }
        });

        e.preventDefault();
        console.log(formData);

        var mensagem_erro = [];

        var codigo_barras = validaCampos(formData.codigo_Barras, 'Código de Barras', true);
        var nome = validaCampos(formData.nome, 'Nome', true);
        var apelido = validaCampos(formData.apelido, 'Apelido', true);
        var estoque = validaCampos(formData.estoque.toString(), 'Estoque', true);

        if (codigo_barras.erro) {
            mensagem_erro.push(codigo_barras.mensagem_erro);
        }

        if (nome.erro) {
            mensagem_erro.push(nome.mensagem_erro);
        }

        if (apelido.erro) {
            mensagem_erro.push(apelido.mensagem_erro);
        }

        if (estoque.erro) {
            mensagem_erro.push(estoque.mensagem_erro);
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
                axios.post(`${server.url}${server.endpoints.medicamento}`, formData).then(response => {

                    setAlert({
                        show: true,
                        success: true,
                        title: 'Sucesso',
                        message: ['Medicamento cadastrado com sucesso'],
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
                        message: ['Erro ao cadastrar medicamento'],
                        onConfirm: () => {
                            setAlert({ ...alert, show: false });
                        },
                        onClose: () => {
                            setAlert({ ...alert, show: false });
                        }
                    });

                });
            } else {
                axios.put(`${server.url}${server.endpoints.medicamento}/${Id}`, formData).then(response => {
                    console.log("Dados:", response.data);

                    setAlert({
                        show: true,
                        success: true,
                        title: 'Sucesso',
                        message: ['Medicamento atualizado com sucesso'],
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
                        message: ['Erro ao atualizar medicamento'],
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

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Medicamentos", href: "/medicamentos/" }, { texto: "Formulário Medicamentos", href: "#" }]} />

            <Titulo titulo="Formulário Medicamentos" />

            <ContainerForm title="Informações Básicas">
                <Row>
                    <CampoTexto label="Código de Barras" value={formData.codigo_Barras} name="codigo_Barras" tipo="text" className="col-md-4" onChange={handleChange} />
                    <CampoTexto label="Nome" value={formData.nome} name="nome" tipo="text" className="col-md-4" onChange={handleChange} />
                    <CampoTexto label="Apelido" value={formData.apelido} name="apelido" tipo="text" className="col-md-4" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoTexto label="Estoque" value={formData.estoque} name="estoque" tipo="text" className="col-md-3" onChange={handleChange} />
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

export default FormMedicamentos;
