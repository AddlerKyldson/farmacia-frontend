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
import axios from "axios";
import server from "../../../utils/data/server";
import BotaoExcluir from "../../other/form/botaoExcluir";

interface ResponsaveisLegais {
    nome_responsavel: string;
    cpf: string;
    escolaridade: string;
    email: string;
}

interface ResponsaveisTecnicos {
    nome_responsavel: string;
    cpf: string;
    escolaridade: string;
    formacao: string;
    especializacao: string;
    registro_conselho: string;
    email: string;
}

const FormularioEstabelecimentos: React.FC = () => {
    const [Id, setId] = useState(0);

    const [responsaveisLegais, setResponsaveisLegais] = useState<ResponsaveisLegais[]>([]);
    const [responsaveisTecnicos, setResponsaveisTecnicos] = useState<ResponsaveisTecnicos[]>([]);

    const [formData, setFormData] = useState({
        razao_social: '',
        nome_fantasia: '',
        cnpj: '',
        cnae: '',
        data_inicio_funcionamento: '',
        grau_risco: '',
        inscricao_estadual: '',
        inscricao_municipal: '',
        logradouro: '',
        id_Estado: '',
        id_Cidade: '',
        id_Bairro: '',
        cep: '',
        complemento: '',
        telefone: '',
        email: '',
        protocolo_funcionamento: '',
        passivo_alvara_sanitario: '',
        n_alvara_sanitario: '',
        coleta_residuos: '',
        autuacao_visa: '',
        forma_abastecimento: '',
        id_tipo_estabelecimento: '',
        slug: '',
        estabelecimento_Responsavel_Legal: responsaveisLegais,
        estabelecimento_Responsavel_Tecnico: responsaveisTecnicos
    });

    const [Estados, setEstados] = useState<any[]>([]);
    const [Cidades, setCidades] = useState<any[]>([]);
    const [Bairros, setBairros] = useState<any[]>([]);
    const [TipoEstabelecimento, setTipoEstabelecimento] = useState<any[]>([]);

    //Add Responsável Legal
    const handleAddResponsavelLegal = () => {

        const novoResponsavelLegal = {
            nome_responsavel: '',
            cpf: '',
            escolaridade: '',
            email: ''
        };

        setResponsaveisLegais([...responsaveisLegais, novoResponsavelLegal]);

        setFormData(prevState => ({
            ...prevState,
            Estabelecimento_Responsavel_Legal: [...responsaveisLegais, novoResponsavelLegal]
        }));

    }

    //Delete Responsável Legal
    const handleDeleteResponsavelLegal = (index: number) => {
        const filteredResponsaveisLegais = responsaveisLegais.filter((item, i) => i !== index);
        setResponsaveisLegais(filteredResponsaveisLegais);

        setFormData(prevState => ({
            ...prevState,
            Estabelecimento_Responsavel_Legal: filteredResponsaveisLegais
        }));
    }

    //Add Responsável Técnico
    const handleAddResponsavelTecnico = () => {

        const novoResponsavelTecnico = {
            nome_responsavel: '',
            cpf: '',
            escolaridade: '',
            formacao: '',
            especializacao: '',
            registro_conselho: '',
            email: ''
        };

        setResponsaveisTecnicos([...responsaveisTecnicos, novoResponsavelTecnico]);

        setFormData(prevState => ({
            ...prevState,
            Estabelecimento_Responsavel_Legal: [...responsaveisTecnicos, novoResponsavelTecnico]
        }));

    }

    //Delete Responsável Técnico
    const handleDeleteResponsavelTecnico = (index: number) => {
        const filteredResponsaveisTecnicos = responsaveisTecnicos.filter((item, i) => i !== index);
        setResponsaveisTecnicos(filteredResponsaveisTecnicos);
    }

    //Verifica ID
    const verificaId = () => {
        const url = window.location.pathname;
        const id = url.split('/').pop();


        if (id !== 'form') {

            setId(parseInt(id ? id : '0'));
            //buscar os dados do estado
            axios.get(`${server.url}${server.endpoints.estabelecimento}/${id}`).then(response => {

                loadCidades(response.data.id_estado);
                loadBairros(response.data.id_cidade);

                try {
                    setFormData(response.data);
                    /* console.log("Dados:", response.data.estabelecimento_Responsavel_Legal);
                    setResponsaveisLegais(response.data.estabelecimento_Responsavel_Legal.$values); */

                } catch (error) {
                    console.error("Erro:", error);
                }

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

    useEffect(() => {
        console.log("FORMDATA atualizado:", formData);
    }, [formData]);

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

    //Carrega Tipos de estabelecimentos
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(
                    `${server.url}${server.endpoints.tipo_estabelecimento}`,
                    {
                        //parâmetros
                    }
                );

                //ajustar array para que o campo value seja o id do estado e o campo label seja o nome do estado, e adiciona uma opção padrão com value 0 e label "Selecione"
                response.data = response.data.dados.$values.map((item: any) => {
                    return { value: item.id, label: item.nome };
                });

                response.data.unshift({ value: 0, label: 'Selecione' });

                setTipoEstabelecimento(response.data);

            } catch (error) {
                console.error("Erro:", error);
            }
        };

        fetchData();
    }, []);

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

        if (name === 'id_Estado') {
            loadCidades(parseInt(value));
            loadBairros(parseInt(value));
        }

        if (name === 'id_Cidade') {
            loadBairros(parseInt(value));
        }

    };

    const graus_risco = [
        { value: "0", label: "Selecione um grau" },
        { value: "1", label: "Baixo" },
        { value: "2", label: "Médio" },
        { value: "3", label: "Alto" }
    ];

    const alvara = [
        { value: "0", label: "Selecione" },
        { value: "1", label: "Sim" },
        { value: "2", label: "Não" },
    ];

    const coleta_residuos = [
        { value: "0", label: "Selecione" },
        { value: "1", label: "Contrato" },
        { value: "2", label: "Empresa Pública" },
        { value: "3", label: "Ambos" },
        { value: "4", label: "Não tem coleta de resíduos" },
    ];

    const recebeu_autuacao = [
        { value: "0", label: "Selecione" },
        { value: "1", label: "Sim" },
        { value: "2", label: "Não" },
    ];

    const forma_abastecimento = [
        { value: "0", label: "Selecione" },
        { value: "1", label: "SAA (CAERN)" },
        { value: "2", label: "SAC - Solução Alternativa Coletiva" },
        { value: "3", label: "SAI - Solução Alternativa Individual" },
        { value: "4", label: "SAA (CAERN) E SAC - Solução Alternativa Coletiva" },
    ];

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

    const handleChangeResponsavelLegal = (e: any, index: number) => {
        const { name, value } = e.target;

        const newValue = value;

        setResponsaveisLegais(prevResponsaveisLegais => prevResponsaveisLegais.map((item, i) => {
            if (i !== index) {
                return item;
            }
            return {
                ...item,
                [name]: newValue
            };
        }));

        setFormData(prevState => ({
            ...prevState,
            Estabelecimento_Responsavel_Legal: responsaveisLegais
        }));

    };

    const handleChangeResponsavelTecnico = (e: any, index: number) => {
        const { name, value } = e.target;

        const newValue = value;

        setResponsaveisTecnicos(prevResponsaveisTecnicos => prevResponsaveisTecnicos.map((item, i) => {
            if (i !== index) {
                return item;
            }
            return {
                ...item,
                [name]: newValue
            };
        }));

        setFormData(prevState => ({
            ...prevState,
            Estabelecimento_Responsavel_Tecnico: responsaveisTecnicos
        }));

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

        const razao_social = validaCampos(formData.razao_social, 'Razão Social', true);
        const nome_fantasia = validaCampos(formData.nome_fantasia, 'Nome Fantasia', true);
        const cnpj = validaCampos(formData.cnpj, 'CNPJ', true, 14);
        const cnae = validaCampos(formData.cnae, 'CNAE', true);
        const data_inicio_funcionamento = validaCampos(formData.data_inicio_funcionamento, 'Data Início Funcionamento', true);
        const grau_risco = validaCampos(formData.grau_risco, 'Grau de Risco', true);
        const inscricao_estadual = validaCampos(formData.inscricao_estadual, 'Inscrição Estadual', true);
        const inscricao_municipal = validaCampos(formData.inscricao_municipal, 'Inscrição Municipal', true);
        const logradouro = validaCampos(formData.logradouro, 'Logradouro', true);
        const estado = validaCampos(formData.id_Estado, 'Estado', true);
        const cidade = validaCampos(formData.id_Cidade, 'Cidade', true);
        const bairro = validaCampos(formData.id_Bairro, 'Bairro', true);
        const cep = validaCampos(formData.cep, 'CEP', true, 8);
        const telefone = validaCampos(formData.telefone, 'Telefone', true);
        const email = validaCampos(formData.email, 'E-mail', true);
        const protocolo_funcionamento = validaCampos(formData.protocolo_funcionamento, 'Protocolo de Funcionamento', true);
        const passivo_alvara = validaCampos(formData.passivo_alvara_sanitario, 'Passivo de Alvará Sanitário?', true);
        const n_alvara_sanitario = validaCampos(formData.n_alvara_sanitario, 'N° do Alvará Sanitário ou Protocolo', true);
        const coleta_residuos = validaCampos(formData.coleta_residuos, 'Coleta de Resíduos', true);
        const recebeu_autuacao = validaCampos(formData.autuacao_visa, 'Recebeu Autuação da Vigilância Sanitária?', true);
        const forma_abastecimento = validaCampos(formData.forma_abastecimento, 'Forma de Abastecimento', true);

        if (razao_social.erro) mensagem_erro.push(razao_social.mensagem_erro);
        if (nome_fantasia.erro) mensagem_erro.push(nome_fantasia.mensagem_erro);
        if (cnpj.erro) mensagem_erro.push(cnpj.mensagem_erro);
        if (cnae.erro) mensagem_erro.push(cnae.mensagem_erro);
        if (data_inicio_funcionamento.erro) mensagem_erro.push(data_inicio_funcionamento.mensagem_erro);
        if (grau_risco.erro) mensagem_erro.push(grau_risco.mensagem_erro);
        if (inscricao_estadual.erro) mensagem_erro.push(inscricao_estadual.mensagem_erro);
        if (inscricao_municipal.erro) mensagem_erro.push(inscricao_municipal.mensagem_erro);
        if (logradouro.erro) mensagem_erro.push(logradouro.mensagem_erro);
        if (estado.erro) mensagem_erro.push(estado.mensagem_erro);
        if (cidade.erro) mensagem_erro.push(cidade.mensagem_erro);
        if (bairro.erro) mensagem_erro.push(bairro.mensagem_erro);
        if (cep.erro) mensagem_erro.push(cep.mensagem_erro);
        if (telefone.erro) mensagem_erro.push(telefone.mensagem_erro);
        if (email.erro) mensagem_erro.push(email.mensagem_erro);
        if (protocolo_funcionamento.erro) mensagem_erro.push(protocolo_funcionamento.mensagem_erro);
        if (passivo_alvara.erro) mensagem_erro.push(passivo_alvara.mensagem_erro);
        if (n_alvara_sanitario.erro) mensagem_erro.push(n_alvara_sanitario.mensagem_erro);
        if (coleta_residuos.erro) mensagem_erro.push(coleta_residuos.mensagem_erro);
        if (recebeu_autuacao.erro) mensagem_erro.push(recebeu_autuacao.mensagem_erro);
        if (forma_abastecimento.erro) mensagem_erro.push(forma_abastecimento.mensagem_erro);


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
            var slug = formData.razao_social.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            formData.slug = slug;

            console.log('FORMDATA', formData);

            if (Id === 0) {
                axios.post(`${server.url}${server.endpoints.estabelecimento}`, formData).then(response => {

                    setAlert({
                        show: true,
                        success: true,
                        title: 'Sucesso',
                        message: ['Estabelecimento cadastrado com sucesso'],
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
                        message: ['Erro ao cadastrar Estabelecimento'],
                        onConfirm: () => {
                            setAlert({ ...alert, show: false });
                        },
                        onClose: () => {
                            setAlert({ ...alert, show: false });
                        }
                    });

                });
            } else {
                axios.put(`${server.url}${server.endpoints.estabelecimento}/${Id}`, formData).then(response => {
                    console.log("Dados:", response.data);

                    setAlert({
                        show: true,
                        success: true,
                        title: 'Sucesso',
                        message: ['Estabelecimento atualizado com sucesso'],
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
                        message: ['Erro ao atualizar Estabelecimento'],
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

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Estabelecimentos", href: "/estabelecimentos/" }, { texto: "Formulário Estabelecimentos", href: "#" }]} />

            <Titulo titulo="Formulário Estabelecimentos" />

            <ContainerForm title="Informações Básicas">
                <Row>
                    <CampoTexto label="Razão Social" value={formData.razao_social} name="razao_social" tipo="text" className="col-md-6" onChange={handleChange} />
                    <CampoTexto label="Nome Fantasia" value={formData.nome_fantasia} name="nome_fantasia" tipo="text" className="col-md-6" onChange={handleChange} />
                    {/* <CampoSelect label="Cidade" name="cidade" options={cidades} className="col-md-4" onChange={handleChange} /> */}
                </Row>
                <Row>
                    <CampoTexto label="CNPJ" value={formData.cnpj} name="cnpj" tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="CNAE" value={formData.cnae} name="cnae" tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="Início Funcionamento" value={formData.data_inicio_funcionamento ? new Date(formData.data_inicio_funcionamento).toISOString().split('T')[0] : ''} name="data_inicio_funcionamento" tipo="date" className="col-md-3" onChange={handleChange} />
                    <CampoSelect label="Grau de Risco" value={formData.grau_risco} name="grau_risco" options={graus_risco} className="col-md-3" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoTexto label="Inscrição Estadual" name="inscricao_estadual" value={formData.inscricao_estadual} tipo="text" className="col-md-6" onChange={handleChange} />
                    <CampoTexto label="Inscrição Municipal" name="inscricao_municipal" value={formData.inscricao_municipal} tipo="text" className="col-md-6" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Endereço / Contato">
                <Row>
                    <CampoTexto label="Logradouro" name="logradouro" value={formData.logradouro} tipo="text" className="col-md-6" onChange={handleChange} />
                    <CampoSelect label="Estado" name="id_Estado" value={formData.id_Estado} options={Estados} className="col-md-3" onChange={handleChange} />
                    <CampoSelect label="Cidade" name="id_Cidade" value={formData.id_Cidade} options={Cidades} className="col-md-3" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Bairro" name="id_Bairro" value={formData.id_Bairro} options={Bairros} className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="CEP" name="cep" value={formData.cep} tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="Complemento" name="complemento" value={formData.complemento} tipo="text" className="col-md-3" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoTexto label="Telefone" name="telefone" value={formData.telefone} tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="E-mail" name="email" value={formData.email} tipo="text" className="col-md-3" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Vigilância">
                <Row>
                    <CampoTexto label="Protocolo de Funcionamento" name="protocolo_funcionamento" value={formData.protocolo_funcionamento} tipo="text" className="col-md-4" onChange={handleChange} />
                    <CampoSelect label="Passivo de Alvará Sanitário?" name="passivo_alvara_sanitario" value={formData.passivo_alvara_sanitario} options={alvara} className="col-md-4" onChange={handleChange} />
                    <CampoTexto label="N° do Alvará Sanitário ou Protocolo" name="n_alvara_sanitario" value={formData.n_alvara_sanitario} tipo="text" className="col-md-4" onChange={handleChange} />
                </Row>

                <Row>
                    <CampoSelect label="Coleta de Resíduos" name="coleta_residuos" value={formData.coleta_residuos} options={coleta_residuos} className="col-md-4" onChange={handleChange} />
                    <CampoSelect label="Recebeu Autuação da Vigilância Sanitária?" name="autuacao_visa" value={formData.autuacao_visa} options={recebeu_autuacao} className="col-md-4" onChange={handleChange} />
                    <CampoSelect label="Forma de Abastecimento" name="forma_abastecimento" value={formData.forma_abastecimento} options={forma_abastecimento} className="col-md-4" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Tipo de Estabelecimento" name="id_tipo_estabelecimento" value={formData.id_tipo_estabelecimento} options={TipoEstabelecimento} className="col-md-4" onChange={handleChange} />
                </Row>
            </ContainerForm>

            {!(Id > 0) && (
                <>
                    <ContainerForm title="Responsáveis Legais">
                        {responsaveisLegais.map((responsavelLegal, index) => (

                            <div key={index} style={{ border: 'dashed 1px #ccc', padding: '15px', marginTop: '10px', backgroundColor: '#fbbc0517', borderRadius: '7px' }}>
                                <Row>
                                    <CampoTexto label="CPF" value={responsavelLegal.cpf} name="cpf" tipo="text" className="col-md-3" onChange={(e) => handleChangeResponsavelLegal(e, index)} />
                                    <CampoTexto label="Nome" value={responsavelLegal.nome_responsavel} name="nome_responsavel" tipo="text" className="col-md-6" onChange={(e) => handleChangeResponsavelLegal(e, index)} />
                                    <CampoSelect label="Escolaridade" value={responsavelLegal.escolaridade} name="escolaridade" options={escolaridade} className="col-md-3" onChange={(e) => handleChangeResponsavelLegal(e, index)} />
                                </Row>
                                <Row>
                                    <CampoTexto label="Email" name="email" value={responsavelLegal.email} tipo="email" className="col-md-3" onChange={(e) => handleChangeResponsavelLegal(e, index)} />
                                </Row>

                                <div className="d-flex justify-content-end">
                                    <BotaoExcluir texto="Excluir" onClick={() => {
                                        handleDeleteResponsavelLegal(index);
                                    }} />
                                </div>
                            </div>

                        ))}

                        <Row className="justify-content-end">
                            <BotaoSubmit texto="Adicionar Novo" onClick={(e) => {
                                e.preventDefault();
                                handleAddResponsavelLegal();
                            }}
                            />
                        </Row>
                    </ContainerForm>



                    <ContainerForm title="Responsáveis Técnicos">
                        {responsaveisTecnicos.map((responsavelTecnico, index) => (

                            <div key={index} style={{ border: 'dashed 1px #ccc', padding: '15px', marginTop: '10px', backgroundColor: '#fbbc0517', borderRadius: '7px' }}>
                                <Row>
                                    <CampoTexto label="CPF" value={responsavelTecnico.cpf} name="cpf" tipo="text" className="col-md-3" onChange={(e) => handleChangeResponsavelTecnico(e, index)} />
                                    <CampoTexto label="Nome" value={responsavelTecnico.nome_responsavel} name="nome_responsavel" tipo="text" className="col-md-6" onChange={(e) => handleChangeResponsavelTecnico(e, index)} />
                                    <CampoSelect label="Escolaridade" name="escolaridade" options={escolaridade} className="col-md-3" onChange={(e) => handleChangeResponsavelTecnico(e, index)} />
                                </Row>

                                <Row>
                                    <CampoTexto label="Formação" value={responsavelTecnico.formacao} name="formacao" tipo="text" className="col-md-3" onChange={(e) => handleChangeResponsavelTecnico(e, index)} />
                                    <CampoTexto label="Especialização" value={responsavelTecnico.especializacao} name="especializacao" tipo="text" className="col-md-3" onChange={(e) => handleChangeResponsavelTecnico(e, index)} />
                                    <CampoTexto label="Registro no Conselho" value={responsavelTecnico.registro_conselho} name="registro_conselho" tipo="text" className="col-md-3" onChange={(e) => handleChangeResponsavelTecnico(e, index)} />
                                </Row>
                                <Row>
                                    <CampoTexto label="Email" name="email" value={responsavelTecnico.email} tipo="email" className="col-md-3" onChange={(e) => handleChangeResponsavelTecnico(e, index)} />
                                </Row>
                                <div className="d-flex justify-content-end">
                                    <BotaoExcluir texto="Excluir" onClick={() => {
                                        handleDeleteResponsavelTecnico(index);
                                    }} />
                                </div>
                            </div>

                        ))}

                        <Row className="justify-content-end">
                            <BotaoSubmit texto="Adicionar Novo" onClick={(e) => {
                                e.preventDefault();
                                handleAddResponsavelTecnico();
                            }}
                            />
                        </Row>
                    </ContainerForm>
                </>
            )}
            <ContainerForm>
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

export default FormularioEstabelecimentos;
