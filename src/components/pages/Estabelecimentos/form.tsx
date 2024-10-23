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
import CampoAreaTexto from "../../other/form/campoAreaTexto";

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
    const [cnae_encontrado, setCnaeEncontrado] = useState(false);
    const [maior_grau_risco, setMaiorGrauRisco] = useState(0);
    const [menor_passivo_analise_projeto, setMenorPassivoAnaliseProjeto] = useState(0);
    const [menor_passivo_alvara_sanitario, setMenorPassivoAlvaraSanitario] = useState(0);

    const [formData, setFormData] = useState({
        razao_social: '',
        nome_fantasia: '',
        cnpj: '',
        cnae: '',
        cnae_secundario: '',
        passivo_analise_projeto: '0',
        data_inicio_funcionamento: null,
        grau_risco: '0',
        inscricao_estadual: '',
        inscricao_municipal: '',
        logradouro: '',
        numero: '',
        id_estado: '',
        id_cidade: '',
        bairro: '',
        cep: '',
        complemento: '',
        telefone: '',
        email: '',
        protocolo_funcionamento: '',
        passivo_alvara_sanitario: '0',
        n_alvara_sanitario: '',
        coleta_residuos: '0',
        autuacao_visa: '0',
        forma_abastecimento: '0',
        id_tipo_estabelecimento: '0',
        id_serie: '0',
        slug: '',
        observacoes: '',
        estabelecimento_Responsavel_Legal: responsaveisLegais,
        estabelecimento_Responsavel_Tecnico: responsaveisTecnicos,
        restaurantes_local: '0',
        restaurantes_tamanho: '0',
        restaurantes_pavimentos: '0',
        restaurantes_lotacao: '0',
        restaurantes_subsolo: '0',
        restaurantes_combustivel: '0',
        restaurantes_gas: '0'
    });

    const [Series, setSeries] = useState<any[]>([]);
    const [Estados, setEstados] = useState<any[]>([]);
    const [Cidades, setCidades] = useState<any[]>([]);
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
                loadTiposEstabelecimentos(response.data.id_serie);

                const data = response.data;

                if (data.restaurantes_tamanho === 1) {
                    //Exibir div .se_restaurante_tamanho
                    document.querySelector('.se_restaurante_tamanho')?.classList.remove('d-none');
                } else {
                    //Ocultar div .se_restaurante_tamanho
                    document.querySelector('.se_restaurante_tamanho')?.classList.add('d-none');
                }

                try {
                    setFormData(response.data);
                    console.log("Dados:", response.data);

                } catch (error) {
                    console.error("Erro:", error);
                }

            }).catch(error => {
                console.error("Erro:", error);
            });
        } else {
            setCidades([{ value: 0, label: 'Selecione o estado' }]);
            setTipoEstabelecimento([{ value: 0, label: 'Selecione a série' }]);

            //Ocultar divs se_restaurante_tamanho
            document.querySelector('.se_restaurante_tamanho')?.classList.add('d-none');
        }
    };

    useEffect(() => {
        verificaId();
    }, []);

    useEffect(() => {
        //console.log("FORMDATA atualizado:", formData);
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

                console.log("Estados:", response.data);

                //ajustar array para que o campo value seja o id do estado e o campo label seja o nome do estado, e adiciona uma opção padrão com value 0 e label "Selecione"
                response.data = response.data.$values.map((item: any) => {
                    return { value: item.sigla, label: item.nome };
                });

                response.data.unshift({ value: 0, label: 'Selecione' });

                setEstados(response.data);

            } catch (error) {
                console.error("Erro:", error);
            }
        };

        fetchData();
    }, []);

    //Carrega Series
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(
                    `${server.url}${server.endpoints.serie}`,
                    {
                        //parâmetros
                    }
                );

                //ajustar array para que o campo value seja o id do estado e o campo label seja o nome do estado, e adiciona uma opção padrão com value 0 e label "Selecione"
                response.data = response.data.$values.map((item: any) => {
                    return { value: item.id, label: item.nome };
                });

                response.data.unshift({ value: 0, label: 'Selecione' });

                setSeries(response.data);

            } catch (error) {
                console.error("Erro:", error);
            }
        };

        fetchData();
    }, []);

    const loadCidades = async (sigla: string) => {

        try {

            const response = await axios.get(
                `${server.url}${server.endpoints.cidade}/Estado/${sigla}`,
                {
                    //parâmetros
                }
            );

            if (response.data.length === 0) {
                setCidades([{ value: 0, label: 'Nenhuma cidade encontrada' }]);
                return;
            }

            console.log("Cidades:", response.data);

            //ajustar array para que o campo value seja o id do estado e o campo label seja o nome do estado, e adiciona uma opção padrão com value 0 e label "Selecione"
            response.data = response.data.$values.map((item: any) => {
                return { value: item.codigo_IBGE, label: item.nome };
            });

            response.data.unshift({ value: 0, label: 'Selecione' });

            setCidades(response.data);

        } catch (error) {

            console.error("Erro:", error);
        }
    }

    const loadTiposEstabelecimentos = async (id: number) => {

        console.log("AQUI");

        try {

            const response = await axios.get(
                `${server.url}${server.endpoints.tipo_estabelecimento}/Serie/${id}`,
                {
                    //parâmetros
                }
            );

            if (response.data.length === 0) {
                setTipoEstabelecimento([{ value: 0, label: 'Nenhum tipo encontrado' }]);
                return;
            }

            //ajustar array para que o campo value seja o id da serie e o campo label seja o nome da serie, e adiciona uma opção padrão com value 0 e label "Selecione"
            response.data = response.data.$values.map((item: any) => {
                return { value: item.id, label: `${item.cnae ? item.cnae + " - " : ''} ${item.nome}` };
            });

            response.data.unshift({ value: 0, label: 'Selecione' });


            setTipoEstabelecimento(response.data);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'id_estado') {
            loadCidades(value);
        }

        if (name === 'id_serie') {
            loadTiposEstabelecimentos(parseInt(value));
        }

        if (name === 'cnpj') {
            setFormData(prevState => ({
                ...prevState,
                cnpj: formataCNPJ(value)
            }));
        }

        if (name === 'restaurantes_tamanho') {
            if (value === '1') {
                //Exibir div .se_restaurante_tamanho
                document.querySelector('.se_restaurante_tamanho')?.classList.remove('d-none');
            } else {
                //Ocultar div .se_restaurante_tamanho
                document.querySelector('.se_restaurante_tamanho')?.classList.add('d-none');
            }
        }

    };

    const formataCNPJ = (cnpj: string) => {
        //retornar apenas números e não deixar adicionar mais de 14 caracteres
        return cnpj.replace(/\D/g, '').substring(0, 14);
    }

    // Função de validação de CNPJ
    const validaCNPJ = (cnpj: string): boolean => {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj.length !== 14) return false;

        // Eliminar CNPJs inválidos conhecidos
        if (/^(\d)\1+$/.test(cnpj)) return false;

        // Validação do dígito verificador
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(0))) return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(1))) return false;

        return true;
    }

    const [cnpjError, setCnpjError] = useState<string | null>(null); // Estado para controlar o erro de CNPJ

    const handleCNPJBlur = async () => {

        //exibir mensagem de carregando
        setCnpjError("Carregando dados...");

        if (!validaCNPJ(formData.cnpj)) {
            setCnpjError('CNPJ inválido');
        } else {

            const dadosCNPJ = await buscarCNPJBrasilAPI(formData.cnpj);
            if (dadosCNPJ) {
                setCnpjError(null);
                console.log("Dados do CNPJ:", dadosCNPJ);

                if (formData.logradouro === '') {
                    setFormData(prevState => ({
                        ...prevState,
                        logradouro: `${dadosCNPJ.descricao_tipo_de_logradouro} ${dadosCNPJ.logradouro}`
                    }));
                }

                if (formData.numero === '') {
                    setFormData(prevState => ({
                        ...prevState,
                        numero: dadosCNPJ.numero
                    }));
                }

                if (formData.bairro === '') {
                    setFormData(prevState => ({
                        ...prevState,
                        bairro: dadosCNPJ.bairro
                    }));
                }

                if (formData.id_estado === '') {
                    setFormData(prevState => ({
                        ...prevState,
                        id_estado: dadosCNPJ.uf
                    }));

                    loadCidades(dadosCNPJ.uf);

                    //pegar 6 primeiros digitos do codigo_municipio_ibge
                    const codigoMunicipioIbgeString = dadosCNPJ.codigo_municipio_ibge.toString().substring(0, 6);

                    setFormData(prevState => ({
                        ...prevState,
                        id_cidade: codigoMunicipioIbgeString
                    }));

                }

                if (formData.cep === '') {
                    setFormData(prevState => ({
                        ...prevState,
                        cep: dadosCNPJ.cep
                    }));
                }

                if (formData.complemento === '') {
                    setFormData(prevState => ({
                        ...prevState,
                        complemento: dadosCNPJ.complemento
                    }));
                }

                if (formData.cnae === '') {
                    setFormData(prevState => ({
                        ...prevState,
                        cnae: `${dadosCNPJ.cnae_fiscal} - ${dadosCNPJ.cnae_fiscal_descricao}`
                    }));
                }

                if (formData.telefone === '') {
                    setFormData(prevState => ({
                        ...prevState,
                        telefone: dadosCNPJ.ddd_telefone_1
                    }));
                }

                if (formData.email === '') {
                    setFormData(prevState => ({
                        ...prevState,
                        email: dadosCNPJ.email
                    }));
                }

                if (formData.razao_social === '') {
                    setFormData(prevState => ({
                        ...prevState,
                        razao_social: dadosCNPJ.razao_social
                    }));
                }

                if (formData.nome_fantasia === '') {
                    setFormData(prevState => ({
                        ...prevState,
                        nome_fantasia: dadosCNPJ.nome_fantasia
                    }));
                }

                if (formData.data_inicio_funcionamento === '') {
                    setFormData(prevState => ({
                        ...prevState,
                        data_inicio_funcionamento: dadosCNPJ.data_inicio_atividade
                    }));
                }

                if (formData.cnae_secundario === '') {

                    // Verifica se o CNPJ possui CNAE secundário
                    if (dadosCNPJ.cnaes_secundarios.length > 0) {
                        // Se possuir, formata a string com os CNAEs secundários
                        let cnaes_secundarios = '';
                        dadosCNPJ.cnaes_secundarios.forEach((cnae: any, index: number) => {
                            cnaes_secundarios += `${cnae.codigo} - ${cnae.descricao}`;
                            if (index < dadosCNPJ.cnaes_secundarios.length - 1) {
                                cnaes_secundarios += '\n';
                            }
                        });

                        setFormData(prevState => ({
                            ...prevState,
                            cnae_secundario: cnaes_secundarios
                        }));
                    } else {
                        setFormData(prevState => ({
                            ...prevState,
                            cnae_secundario: 'Não possui CNAE secundário'
                        }));
                    }
                }

                //verificar cnae principal e verificar níveis de risco
                buscarTipoEstabelecimentoPorCNAE(dadosCNPJ.cnae_fiscal, 1);

                dadosCNPJ.cnaes_secundarios.forEach((cnae: any, index: number) => {
                    buscarTipoEstabelecimentoPorCNAE(cnae.codigo, 0);
                });



            } else {
                setCnpjError('Não conseguimos importar dados do CNPJ');
            }
        }
    };

    const buscarTipoEstabelecimentoPorCNAE = async (cnae: string, principal: number) => {
        axios.get(`${server.url}${server.endpoints.tipo_estabelecimento}/cnae/${cnae}`).then(response => {
            // Supondo que 'response.data' seja o JSON retornado
            const dadosCNAE = response.data || {};

            // Verifica se o JSON não está vazio
            if (Object.keys(dadosCNAE).length > 0) {
                console.log("JSON contém dados:", dadosCNAE);
            } else {
                console.log("JSON está vazio ou não contém dados.");
            }

            if (Object.keys(dadosCNAE).length > 0) {

                if (dadosCNAE.grau_Risco > formData.grau_risco) {
                    setFormData(prevState => ({
                        ...prevState,
                        grau_risco: dadosCNAE.grau_Risco
                    }));
                }

                if ((dadosCNAE.passivo_Analise_Projeto < formData.passivo_analise_projeto) || (formData.passivo_analise_projeto === '0')) {
                    setFormData(prevState => ({
                        ...prevState,
                        passivo_analise_projeto: dadosCNAE.passivo_Analise_Projeto
                    }));
                }

                if ((dadosCNAE.passivo_Alvara_Sanitario < formData.passivo_alvara_sanitario) || (formData.passivo_alvara_sanitario === '0')) {
                    setFormData(prevState => ({
                        ...prevState,
                        passivo_alvara_sanitario: dadosCNAE.passivo_Alvara_Sanitario
                    }));
                }

                if (cnae_encontrado === false) {
                    //atualiza a série
                    setFormData(prevState => ({
                        ...prevState,
                        id_serie: dadosCNAE.id_Serie
                    }));

                    loadTiposEstabelecimentos(dadosCNAE.id_Serie);

                    //atualiza o tipo
                    setFormData(prevState => ({
                        ...prevState,
                        id_tipo_estabelecimento: dadosCNAE.id
                    }));

                    setCnaeEncontrado(true);
                }

                console.log("Form Data:", formData);


            } else {
                setCnaeEncontrado(false);
            }

        }).catch(error => {
            console.error("Erro:", error);
        });
    };

    const buscarCNPJBrasilAPI = async (cnpj: string) => {
        const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;

        try {
            const response = await axios.get(url);
            return response.data; // Retorna os dados da API
        } catch (error) {
            setCnpjError('Erro ao buscar CNPJ');
            console.error("Erro ao buscar CNPJ:", error);
            return null; // Retorna null em caso de erro
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
        { value: "1", label: "Exigência de Alvará Sanitário" },
        { value: "2", label: "Alvará sem inspeção prévia" },
        { value: "3", label: "Dispensado de Alvará Sanitário" },
    ];

    const analise_projeto = [
        { value: "0", label: "Selecione" },
        { value: "1", label: "Exigência de Análise de Projeto" },
        { value: "2", label: "Dispensado de Análise de Projeto" },
    ]

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

    const SimNao = [
        { value: "0", label: "Selecione" },
        { value: "1", label: "Sim" },
        { value: "2", label: "Não" },
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
        var { name, value } = e.target;

        if (name === 'cpf') {
            // Se o campo for CPF, processa apenas números
            value = handleApenasNumeros(e);
        }

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

    const handleApenasNumeros = (e: any) => {
        // Remove qualquer caractere que não seja número
        const { value } = e.target;
        const apenasNumeros = value.replace(/\D/g, '');
        return apenasNumeros;
    };

    const handleChangeResponsavelTecnico = (e: any, index: number) => {
        var { name, value } = e.target;

        if (name === 'cpf') {
            // Se o campo for CPF, processa apenas números
            value = handleApenasNumeros(e);
        }

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
        /* const data_inicio_funcionamento = validaCampos(formData.data_inicio_funcionamento, 'Data Início Funcionamento', true); */
        const logradouro = validaCampos(formData.logradouro, 'Logradouro', true);
        const estado = validaCampos(formData.id_estado, 'Estado', true);
        const cidade = validaCampos(formData.id_cidade, 'Cidade', true);
        const bairro = validaCampos(formData.bairro, 'Bairro', true);
        const cep = validaCampos(formData.cep, 'CEP', true, 8);
        const telefone = validaCampos(formData.telefone, 'Telefone', true);
        const email = validaCampos(formData.email, 'E-mail', true);

        /* if (razao_social.erro) mensagem_erro.push(razao_social.mensagem_erro);
        if (cnpj.erro) mensagem_erro.push(cnpj.mensagem_erro); */
        if (logradouro.erro) mensagem_erro.push(logradouro.mensagem_erro);
        if (estado.erro) mensagem_erro.push(estado.mensagem_erro);
        if (cidade.erro) mensagem_erro.push(cidade.mensagem_erro);
        if (bairro.erro) mensagem_erro.push(bairro.mensagem_erro);

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
                    <CampoTexto label="CNPJ (Apenas Números)" value={formData.cnpj} name="cnpj" tipo="text" className="col-md-6" onChange={handleChange} onBlur={
                        handleCNPJBlur
                    } >
                        {cnpjError && <small style={{ color: 'red' }}>{cnpjError}</small>}
                    </CampoTexto>

                </Row>
                <Row>
                    <CampoTexto label="Razão Social" value={formData.razao_social} name="razao_social" tipo="text" className="col-md-6" onChange={handleChange} />
                    <CampoTexto label="Nome Fantasia" value={formData.nome_fantasia} name="nome_fantasia" tipo="text" className="col-md-6" onChange={handleChange} />
                    {/* <CampoSelect label="Cidade" name="cidade" options={cidades} className="col-md-4" onChange={handleChange} /> */}
                </Row>
                <Row>
                    <CampoTexto label="Início Funcionamento" value={formData.data_inicio_funcionamento ? new Date(formData.data_inicio_funcionamento).toISOString().split('T')[0] : ''} name="data_inicio_funcionamento" tipo="date" className="col-md-3" onChange={handleChange} />
                    <CampoSelect label="Grau de Risco" value={formData.grau_risco} name="grau_risco" options={graus_risco} className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="Inscrição Municipal" name="inscricao_municipal" value={formData.inscricao_municipal} tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="Inscrição Estadual" name="inscricao_estadual" value={formData.inscricao_estadual} tipo="text" className="col-md-3" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoTexto label="CNAE" value={formData.cnae} name="cnae" tipo="text" className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoAreaTexto label="CNAE Secundário" name="cnae_secundario" className="col-12" value={formData.cnae_secundario} onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Endereço / Contato">
                <Row>
                    <CampoTexto label="Logradouro" name="logradouro" value={formData.logradouro} tipo="text" className="col-md-6" onChange={handleChange} />
                    <CampoTexto label="Nº" name="numero" value={formData.numero} tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="CEP" name="cep" value={formData.cep} tipo="text" className="col-md-3" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Estado" name="id_estado" value={formData.id_estado} options={Estados} className="col-md-3" onChange={handleChange} />
                    <CampoSelect label="Cidade" name="id_cidade" value={formData.id_cidade} options={Cidades} className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="Bairro" name="bairro" value={formData.bairro} tipo="text" className="col-md-3" onChange={handleChange} />
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
                    <CampoSelect label="Passivo de Análise de Projeto?" name="passivo_analise_projeto" value={formData.passivo_analise_projeto} options={analise_projeto} className="col-md-4" onChange={handleChange} />
                    <CampoSelect label="Série" name="id_serie" value={formData.id_serie} options={Series} className="col-md-4" onChange={handleChange} />
                    <CampoSelect label="Tipo de Estabelecimento" name="id_tipo_estabelecimento" value={formData.id_tipo_estabelecimento} options={TipoEstabelecimento} className="col-md-4" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Restaurantes">
                <Row>
                    <CampoSelect label="Na residência do empreendedor, sem recepção?" name="restaurantes_local" value={formData.restaurantes_local} options={SimNao} className="col-md-4" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Espaço ocupado pela atividade de até 200m²?" name="restaurantes_tamanho" value={formData.restaurantes_tamanho} options={SimNao} className="col-md-4" onChange={handleChange} />
                </Row>
                <div className="se_restaurante_tamanho">
                    <Row >
                        <CampoSelect label="Edificação tem mais que 3 pavimentos?" name="restaurantes_pavimentos" value={formData.restaurantes_pavimentos} options={SimNao} className="col-md-4" onChange={handleChange} />
                        <CampoSelect label="Capacidade para mais de 100 pessoas?" name="restaurantes_lotacao" value={formData.restaurantes_lotacao} options={SimNao} className="col-md-4" onChange={handleChange} />
                        <CampoSelect label="Estacionamento no subsolo?" name="restaurantes_subsolo" value={formData.restaurantes_subsolo} options={SimNao} className="col-md-4" onChange={handleChange} />
                    </Row>
                    <Row>
                        <CampoSelect label="Possui líquido inflamável ou combustível acima de 1000 L (mil litros)?" name="restaurantes_combustivel" value={formData.restaurantes_combustivel} options={SimNao} className="col-md-4" onChange={handleChange} />
                        <CampoSelect label="Possui gás liquefeito de petróleo (GLP) acima de 190 kg (cento e noventa
quilogramas)?" name="restaurantes_gas" value={formData.restaurantes_gas} options={SimNao} className="col-md-4" onChange={handleChange} />
                    </Row>
                </div>
            </ContainerForm>

            <ContainerForm title="Observações">
                <CampoAreaTexto label="Observações" name="observacoes" value={formData.observacoes} onChange={handleChange} />
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
