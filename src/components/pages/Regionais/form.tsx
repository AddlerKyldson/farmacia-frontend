import React, { useEffect, useState } from "react";
import Layout from "../../structure/Layout";
import Breadcrumb from "../../other/breadCrumb";
import Titulo from "../../other/tituloPage";
import ContainerForm from "../../other/form/containerForm";
import CampoTexto from "../../other/form/campoTexto";
import CampoSelect from "../../other/form/campoSelect";
import BotaoSubmit from "../../other/form/botaoSubmit";
import Row from "../../other/grid/row";
import Alert from "../../other/modal/alert";
import server from "../../../utils/data/server";
import axios from "axios";

const FormRegionais: React.FC = () => {
    const [Id, setId] = useState(0);
    const [formData, setFormData] = useState({
        nome: '',
        id_Estado: '',
        slug: '',
    });

    const [Estados, setEstados] = useState<any[]>([]);

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
            axios.get(`${server.url}${server.endpoints.regiao}/${id}`).then(response => {

                setFormData(response.data);

            }).catch(error => {
                console.error("Erro:", error);
            });
        }
    };

    useEffect(() => {
        verificaId();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(
                    `${server.url}${server.endpoints.estado}`,
                    {
                        //parâmetros
                    }
                );

                console.log("Dados:", response.data.$values);

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
        var estado = validaCampos(formData.id_Estado, 'Estado', true);

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
            var slug = formData.nome.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            formData.slug = slug;

            console.log('FORMDATA', formData);

            if (Id === 0) {
                axios.post(`${server.url}${server.endpoints.regiao}`, formData).then(response => {

                    setAlert({
                        show: true,
                        success: true,
                        title: 'Sucesso',
                        message: ['Regional cadastrada com sucesso'],
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
                        message: ['Erro ao cadastrar regional'],
                        onConfirm: () => {
                            setAlert({ ...alert, show: false });
                        },
                        onClose: () => {
                            setAlert({ ...alert, show: false });
                        }
                    });

                });
            } else {
                axios.put(`${server.url}${server.endpoints.regiao}/${Id}`, formData).then(response => {
                    console.log("Dados:", response.data);

                    setAlert({
                        show: true,
                        success: true,
                        title: 'Sucesso',
                        message: ['Regional atualizada com sucesso'],
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
                        message: ['Erro ao atualizar regional'],
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

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Regionais", href: "/regionais/" }, { texto: "Formulário Regionais", href: "#" }]} />

            <Titulo titulo="Formulário Regionais" />

            <ContainerForm title="Informações Básicas">
                <Row>
                    <CampoTexto label="Nome" name="nome" value={formData.nome} tipo="text" className="col-md-8" onChange={handleChange} />
                    <CampoSelect label="Estado" name="id_Estado" value={formData.id_Estado} options={Estados} className="col-md-4" onChange={handleChange} />
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

export default FormRegionais;
