import React, { lazy, useEffect, useState } from "react";
import Layout from "../../structure/Layout";
import Breadcrumb from "../../other/breadCrumb";
import Titulo from "../../other/tituloPage";
import ContainerForm from "../../other/form/containerForm";
import CampoTexto from "../../other/form/campoTexto";
import CampoSelect from "../../other/form/campoSelect";
import BotaoSubmit from "../../other/form/botaoSubmit";
import Row from "../../other/grid/row";
import Alert from "../../other/modal/alert";
import axios from "axios";
import server from "../../../utils/data/server";

const FormUnidadeSaude: React.FC = () => {
    const [Id, setId] = useState(0);
    const [formData, setFormData] = useState({
        nome: '',
        Cnes: '',
        logradouro: '',
        id_Estado: '',
        id_Cidade: '',
        id_Bairro: '',
        Cep: '',
        numero: '',
        complemento: '',
        tipo: '',
        slug: ''
    });

    const [Estados, setEstados] = useState<any[]>([]);
    const [Cidades, setCidades] = useState<any[]>([]);
    const [Bairros, setBairros] = useState<any[]>([]);

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
            axios.get(`${server.url}${server.endpoints.unidade_saude}/${id}`).then(response => {

                console.log(response.data);

                loadCidades(response.data.id_Estado);
                loadBairros(response.data.id_Cidade);

                setFormData(response.data);

            }).catch(error => {
                console.error("Erro:", error);
            });
        } else {
            setCidades([{ value: 0, label: 'Selecione o estado' }]);
            setBairros([{ value: 0, label: 'Selecione a cidade' }]);
        }
    };

    useEffect(() => {
        verificaId();
    }, []);

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
                response.data = response.data.map((item: any) => {
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
            response.data = response.data.map((item: any) => {
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
            response.data = response.data.map((item: any) => {
                return { value: item.id, label: item.nome };
            });

            response.data.unshift({ value: 0, label: 'Selecione' });

            setBairros(response.data);

        } catch (error) {

            console.error("Erro:", error);
        }
    }

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

        var nome = validaCampos(formData.nome, 'Nome', true);
        var cnes = validaCampos(formData.Cnes, 'CNES', true, 7);
        var logradouro = validaCampos(formData.logradouro, 'Logradouro', true);
        var estado = validaCampos(formData.id_Estado, 'Estado', true);
        var cidade = validaCampos(formData.id_Cidade, 'Cidade', true);
        var bairro = validaCampos(formData.id_Bairro, 'Bairro', true);
        var cep = validaCampos(formData.Cep, 'CEP', true, 8);
        var numero = validaCampos(formData.numero, 'Número', true);
        var complemento = validaCampos(formData.complemento, 'Complemento', true);
        var tipo = validaCampos(formData.tipo, 'Tipo', true);


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

        if (tipo.erro) {
            mensagem_erro.push(tipo.mensagem_erro);
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
                axios.post(`${server.url}${server.endpoints.unidade_saude}`, formData).then(response => {

                    setAlert({
                        show: true,
                        success: true,
                        title: 'Sucesso',
                        message: ['Unidade de Saúde cadastrada com sucesso'],
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
                        message: ['Erro ao cadastrar Unidade de Saúde'],
                        onConfirm: () => {
                            setAlert({ ...alert, show: false });
                        },
                        onClose: () => {
                            setAlert({ ...alert, show: false });
                        }
                    });

                });
            } else {
                axios.put(`${server.url}${server.endpoints.unidade_saude}/${Id}`, formData).then(response => {
                    console.log("Dados:", response.data);

                    setAlert({
                        show: true,
                        success: true,
                        title: 'Sucesso',
                        message: ['Unidade de Saúde atualizada com sucesso'],
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
                        message: ['Erro ao atualizar Unidade de Saúde'],
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

    const Tipos = [
        { value: '0', label: 'Selecione o tipo' },
        { value: '1', label: 'Hospital' },
        { value: '2', label: 'Posto de Saúde' },
        { value: '3', label: 'Unidade Básica de Saúde' },
        { value: '4', label: 'Unidade de Pronto Atendimento' },
        { value: '5', label: 'Farmácia' },
    ];

    return (
        <Layout>

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Unidades de Saúde", href: "/unidades-de-saude/" }, { texto: "Formulário Unidades de Saúde", href: "#" }]} />

            <Titulo titulo="Formulário Unidades de Saúde" />

            <ContainerForm title="Informações Básicas">
                <Row>
                    <CampoTexto label="Nome" value={formData.nome} name="nome" tipo="text" className="col-md-8" onChange={handleChange} />
                    <CampoTexto label="CNES" value={formData.Cnes} name="Cnes" tipo="text" className="col-md-4" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Tipo" name="tipo" value={formData.tipo} options={Tipos} className="col-md-4" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Contato/Endereço">
                <Row>
                    <CampoTexto label="Logradouro" value={formData.logradouro} name="logradouro" tipo="text" className="col-md-6" onChange={handleChange} />
                    <CampoSelect label="Estado" value={formData.id_Estado} name="id_Estado" options={Estados} className="col-md-2" onChange={handleChange} />
                    <CampoSelect label="Cidade" value={formData.id_Cidade} name="id_Cidade" options={Cidades} className="col-md-4" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Bairro" value={formData.id_Bairro} name="id_Bairro" options={Bairros} className="col-md-4" onChange={handleChange} />
                    <CampoTexto label="CEP" value={formData.Cep} name="Cep" tipo="text" className="col-md-2" onChange={handleChange} />
                    <CampoTexto label="Número" value={formData.numero} name="numero" tipo="text" className="col-md-2" onChange={handleChange} />
                    <CampoTexto label="Complemento" value={formData.complemento} name="complemento" tipo="text" className="col-md-4" onChange={handleChange} />
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
