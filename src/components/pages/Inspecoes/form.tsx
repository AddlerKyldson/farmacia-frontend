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
import { Container } from "react-bootstrap";
import CampoAreaTexto from "../../other/form/campoAreaTexto";
import { useAuth } from "../../../context/AuthContext";
import { parse } from "path";
import OverlayLoading from "../../other/overlayLoading";

const FormularioInspecoes: React.FC = () => {
    const [Id, setId] = useState(0);
    const [id_usuario, setId_Usuario] = useState(0);
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [roteiroSelecionado, setRoteiroSelecionado] = useState(0);

    const [formData, setFormData] = useState({
        descricao: '',
        n_termo_inspecao: '',
        data_inspecao: '',
        motivo_inspecao: '0',
        id_estabelecimento: '0',
        id_responsavel_tecnico: '0',
        roteiro_Inspecao: '0',
        verificacao_restaurantes: {
            procedencia_materiais: '',
            produtos: '0',
            uniformes: '0',
            transportes_carnes: '0',
            transportes: '0',
            recebimento_frios: '0',
            armazenamento: '0',
            embalagens_industrializados: '0',
            armazenamento_toxicos: '0',
            temperatura_pereciveis: '0',
            local_geladeira: '0',
            estado_geladeira: '0',
            espessura_gelo: '0',
            organizacao_geladeira: '0',
            regulacao_freezer: '0',
            estado_camara_fria: '0',
            porta_camara_fria: '0',
            termometro_camara_fria: '0',
            carnes_camara_fria: '0',
            hortifruti_camara_fria: '0',
            estrado_camara_fria: '0',
            higienizacao_camara_fria: '0',
            qualidade_temperatura: '0',
            prazo_validade: '0',
            devolucao_produtos: '0',
        },
        verificacao_supermercados: {
            supermercado_area_externa: '0',
            supermercado_area_externa_piso: '0',
            supermercado_area_externa_obs: '',
            supermercado_residuos_recipientes: '0',
            supermercado_residuos_local: '0',
            supermercado_residuos_obs: '',
            supermercado_recebimento_area: '0',
            supermercado_recebimento_higiene: '0',
            supermercado_recebimento_temperatura: '0',
            supermercado_recebimento_validade: '0',
            supermercado_recebimento_obs: '',
            supermercado_armazenamento_seco_local: '0',
            supermercado_armazenamento_seco_embalagens: '0',
            supermercado_armazenamento_seco_ordem: '0',
            supermercado_armazenamento_seco_devolucao: '0',
            supermercado_armazenamento_seco_separacao: '0',
            supermercado_armazenamento_seco_instalacoes: '0',
            supermercado_armazenamento_seco_iluminacao: '0',
            supermercado_armazenamento_seco_obs: '',
            supermercado_armazenamento_refrigerados_itens: {
                hortifruti: '0',
                laticinios: '0',
                frios: '0',
                margarina: '0',
                panificados: '0',
                aves: '0',
                carnes: '0',
                pescados: '0',
            },
            supermercado_armazenamento_refrigerados_portas: '0',
            supermercado_armazenamento_refrigerados_termometro: '0',
            supermercado_armazenamento_refrigerados_revestimento: '0',
            supermercado_armazenamento_refrigerados_paletes: '0',
            supermercado_armazenamento_refrigerados_embalagens: '0',
            supermercado_armazenamento_refrigerados_caixas: '0',
            supermercado_armazenamento_refrigerados_distancia_paredes: '0',
            supermercado_armazenamento_refrigerados_ordem: '0',
            supermercado_armazenamento_refrigerados_devolucao: '0',
            supermercado_armazenamento_refrigerados_pescados: '0',
            supermercado_armazenamento_refrigerados_carnes: '0',
            supermercado_armazenamento_refrigerados_hortifruti: '0',
            supermercado_armazenamento_refrigerados_validade: '0',
            supermercado_armazenamento_refrigerados_periodicidade_higienizacao: '0',
            supermercado_armazenamento_refrigerados_iluminacao: '0',
            supermercado_armazenamento_refrigerados_instalacoes: '0',
            supermercado_armazenamento_refrigerados_obs: '',
            supermercado_armazenamento_congelados_itens: {
                aves: '0',
                carnes: '0',
                pescados: '0',
                sorvetes: '0',
            },
            supermercado_armazenamento_congelados_portas: '0',
            supermercado_armazenamento_congelados_termometro: '0',
            supermercado_armazenamento_congelados_revestimento: '0',
            supermercado_armazenamento_congelados_paletes: '0',
            supermercado_armazenamento_congelados_embalagens: '0',
            supermercado_armazenamento_congelados_caixas: '0',
            supermercado_armazenamento_congelados_distancia_parede: '0',
            supermercado_armazenamento_congelados_ordem: '0',
            supermercado_armazenamento_congelados_devolucao: '0',
            supermercado_armazenamento_congelados_temperatura: '0',
            supermercado_armazenamento_congelados_periodicidade_higienizacao: '0',
            supermercado_armazenamento_congelados_validade: '0',
            supermercado_armazenamento_congelados_iluminacao: '0',
            supermercado_armazenamento_congelados_instalacoes: '0',
            supermercado_armazenamento_congelados_obs: '',
            supermercado_acougue_itens: {
                acougue: '0',
                peixaria: '0',
            },
            supermercado_acougue_freezer_carnes: '0',
            supermercado_acougue_freezer_peixes: '0',
            supermercado_acougue_freezer_conservacao: '0',
            supermercado_acougue_freezer_gelo: '0',
            supermercado_acougue_freezer_temperatura: '0',
            supermercado_acougue_freezer_obs: '',
            supermercado_acougue_manipulacao_local: '0',
            supermercado_acougue_manipulacao_cartaz: '0',
            supermercado_acougue_manipulacao_caixas: '0',
            supermercado_acougue_manipulacao_temperatura: '0',
            supermercado_acougue_manipulacao_luvas: '0',
            supermercado_acougue_manipulacao_escovas: '0',
            supermercado_acougue_manipulacao_panos: '0',
            supermercado_acougue_manipulacao_fluxo: '0',
            supermercado_acougue_manipulacao_utensilios: '0',
            supermercado_acougue_manipulacao_periodicidade_higienizacao: '0',
            supermercado_acougue_manipulacao_equipamentos: '0',
            supermercado_acougue_manipulacao_uniformes: '0',
            supermercado_acougue_manipulacao_obs: '',
            supermercado_acougue_exposicao_validade: '0',
            supermercado_acougue_exposicao_embalagens: '0',
            supermercado_acougue_exposicao_separacao: '0',
            supermercado_acougue_exposicao_obs: '',
            supermercado_acougue_obs: '',
            supermercado_salsicharia_armazenamento_embalagens: '0',
            supermercado_salsicharia_armazenamento_temperatura: '0',
            supermercado_salsicharia_armazenamento_freezer: '0',
            supermercado_salsicharia_armazenamento_gelo: '0',
            supermercado_salsicharia_armazenamento_obs: '',
            supermercado_salsicharia_manipulacao_local: '0',
            supermercado_salsicharia_manipulacao_cartaz: '0',
            supermercado_salsicharia_manipulacao_caixas: '0',
            supermercado_salsicharia_manipulacao_escovas: '0',
            supermercado_salsicharia_manipulacao_panos: '0',
            supermercado_salsicharia_manipulacao_temperatura: '0',
            supermercado_salsicharia_manipulacao_utensilios: '0',
            supermercado_salsicharia_manipulacao_periodicidade_higienizacao: '0',
            supermercado_salsicharia_manipulacao_equipamentos: '0',
            supermercado_salsicharia_exposicao_protecao: '0',
            supermercado_salsicharia_exposicao_validade: '0',
            supermercado_salsicharia_exposicao_separacao: '0',
            supermercado_salsicharia_exposicao_obs: '',
            supermercado_salsicharia_manipulacao_validade: '0',
            supermercado_salsicharia_manipulacao_separacao: '0',
            supermercado_salsicharia_manipulacao_obs: '',
            supermercado_salsicharia_obs: '',
            supermercado_rotisserie_itens: {
                rotisserie: '0',
                refeitorio: '0',
                flv: '0',
                lanchonete: '0',
                padaria: '0'
            },
            supermercado_rotisserie_armazenamento_local: '0',
            supermercado_rotisserie_armazenamento_embalagens: '0',
            supermercado_rotisserie_armazenamento_separacao: '0',
            supermercado_rotisserie_armazenamento_temperatura: '0',
            supermercado_rotisserie_armazenamento_local_freezer: '0',
            supermercado_rotisserie_armazenamento_gelo: '0',
            supermercado_rotisserie_armazenamento_limpeza_freezer: '0',
            supermercado_rotisserie_armazenamento_temperatura_freezer: '0',
            supermercado_rotisserie_armazenamento_obs: '',
            supermercado_rotisserie_manipulacao_pia: '0',
            supermercado_rotisserie_manipulacao_cartaz: '0',
            supermercado_rotisserie_manipulacao_isolamento: '0',
            supermercado_rotisserie_manipulacao_separacao: '0',
            supermercado_rotisserie_manipulacao_luvas: '0',
            supermercado_rotisserie_manipulacao_temperatura: '0',
            supermercado_rotisserie_manipulacao_coccao: '0',
            supermercado_rotisserie_manipulacao_descongelamento: '0',
            supermercado_rotisserie_manipulacao_recongelamento: '0',
            supermercado_rotisserie_manipulacao_oleo: '0',
            supermercado_rotisserie_manipulacao_oleo_residuos: '0',
            supermercado_rotisserie_manipulacao_frutas: '0',
            supermercado_rotisserie_manipulacao_embalagens: '0',
            supermercado_rotisserie_manipulacao_ovos: '0',
            supermercado_rotisserie_manipulacao_validade: '0',
            supermercado_rotisserie_manipulacao_panos: '0',
            supermercado_rotisserie_manipulacao_equipamentos: '0',
            supermercado_rotisserie_manipulacao_utensilios: '0',
            supermercado_rotisserie_manipulacao_utensilios_conservacao: '0',
            supermercado_rotisserie_manipulacao_escovas: '0',
            supermercado_rotisserie_manipulacao_caixas: '0',
            supermercado_rotisserie_manipulacao_comidas_quentes: '0',
            supermercado_rotisserie_manipulacao_comidas_frias: '0',
            supermercado_rotisserie_manipulacao_validade_remocao: '0',
            supermercado_rotisserie_manipulacao_embalagens_info: '0',
            supermercado_rotisserie_manipulacao_balcao: '0',
            supermercado_rotisserie_manipulacao_amostra: '0',
            supermercado_rotisserie_manipulacao_obs: '',
            supermercado_rotisserie_ilhas_equipamentos: '0',
            supermercado_rotisserie_ilhas_freezer: '0',
            supermercado_rotisserie_ilhas_separacao: '0',
            supermercado_rotisserie_ilhas_embalagens: '0',
            supermercado_rotisserie_ilhas_termometro: '0',
            supermercado_rotisserie_ilhas_obs: '',
            supermercado_instalacoes_itens: {
                deposito: '0',
                acougue: '0',
                peixaria: '0',
                salsicharia: '0',
                rotisserie: '0',
                padaria: '0',
                flv: '0',
                lanchonete: '0',
                refeitorio: '0',
            },
            supermercado_instalacoes_conservacao: '0',
            supermercado_instalacoes_iluminacao: '0',
            supermercado_instalacoes_instalacoes: '0',
            supermercado_instalacoes_ventilacao: '0',
            supermercado_instalacoes_portas: '0',
            supermercado_instalacoes_obs: '',
            supermercado_manipuladores_treinamento: '0',
            supermercado_manipuladores_higiene: '0',
            supermercado_manipuladores_estado_saude: '0',
            supermercado_manipuladores_uniformes: '0',
            supermercado_manipuladores_sapatos: '0',
            supermercado_manipuladores_cabelos: '0',
            supermercado_manipuladores_barba: '0',
            supermercado_manipuladores_vestimenta_camara_fria: '0',
            supermercado_manipuladores_epi: '0',
            supermercado_manipuladores_obs: '',
            supermercado_sanitario_contato: '0',
            supermercado_sanitario_piso: '0',
            supermercado_sanitario_vasos: '0',
            supermercado_sanitario_descarte: '0',
            supermercado_sanitario_pia: '0',
            supermercado_sanitario_armarios: '0',
            supermercado_sanitario_obs: '',
            supermercado_agua_abastecimento: '0',
            supermercado_agua_reservatorio: '0',
            supermercado_agua_periodicidade_higienizacao: '0',
            supermercado_agua_fonte_alternativa: '0',
            supermercado_agua_licenca_poco: '0',
            supermercado_agua_tratamento_alternativa: '0',
            supermercado_agua_analise_cloro: '0',
            supermercado_agua_gelo: '0',
            supermercado_agua_obs: '',
            supermercado_pragas_telas: '0',
            supermercado_pragas_ralos: '0',
            supermercado_pragas_portas: '0',
            supermercado_pragas_vetores: '0',
            supermercado_pragas_desinfetante: '0',
            supermercado_pragas_obs: '',
            supermercado_sanitario_publico_conservacao: '0',
            supermercado_sanitario_publico_pia: '0',
            supermercado_sanitario_publico_cestos: '0',
            supermercado_sanitario_publico_obs: '',
            supermercado_documentacao_responsavel_tecnico: '0',
            supermercado_documentacao_manual_boas_praticas: '0',
            supermercado_documentacao_procedimentos: '0',
            supermercado_documentacao_treinamento_funcionarios: '0',
            supermercado_documentacao_programa_saude: '0',
            supermercado_documentacao_comprovante_higienizacao_agua: '0',
            supermercado_documentacao_licenca_fonte_alternativa: '0',
            supermercado_documentacao_laudo_agua: '0',
            supermercado_documentacao_analise_cloro: '0',
            supermercado_documentacao_execucao_vetores: '0',
            supermercado_documentacao_proposta_empresa: '0',
            supermercado_documentacao_certificado_execucao: '0',
            supermercado_documentacao_planilhas_controle_temperatura: '0',
            supermercado_documentacao_calibracao_medicao: '0',
            supermercado_documentacao_manutencao_equipamentos: '0',
            supermercado_documentacao_produtos_higiene: '0',
            supermercado_documentacao_desfibrilador: '0',
            supermercado_documentacao_capacitacao: '0',
            supermercado_documentacao_cartaz_bebidas: '0',
            supermercado_documentacao_promocao_infantis: '0',
            supermercado_documentacao_promocao_intantis_leite: '0',
            supermercado_documentacao_promocao_transicao: '0',
            supermercado_documentacao_obs: ''
        },
        verificacao_escolas: {
            horario_funcionamento: {
                manha: '0',
                tarde: '0',
                noite: '0',
            },
            natureza_escola: '0',
            modalidade_ensino: {
                infantil: '0',
                fundamental1: '0',
                fundamental2: '0',
                medio: '0',
                eja: '0',
                cmei: '0',
                creche: '0',
                outras: '0',

            },
            quantidade_alunos: '0',
            quantidade_funcionarios: '0',
            dependencias: '0',
            area_externa: '0',
            area_circulacao: '0',
            piso: '0',
            paredes: '0',
            iluminacao: '0',
            ventilacao: '0',
            ventilacao_higienizacao: '0',
            equipamentos_moveis: '0',
            protecao_incendios: '0',
            manutencao: '0',
            area_externa_obs: '',
            alimentacao_selecao: '0',
            alimentacao_armazenamento: '0',
            alimentacao_lavatorio: '0',
            alimentacao_descongelamento: '0',
            alimentacao_tratamento_termico: '0',
            alimentacao_higienizacao_crus: '0',
            alimentacao_contato_crus: '0',
            alimentacao_temperatura: '0',
            alimentacao_local: '0',
            alimentacao_obs: '',
            manipuladores_saude_atestado: '0',
            manipuladores_saude_empregados: '0',
            manipuladores_higiene: '0',
            manipuladores_costumes: '0',
            manipuladores_mascara: '0',
            manipuladores_supervisao: '0',
            manipuladores_capacitacao: '0',
            manipuladores_registro_capacitacao: '0',
            manipuladores_capacitacao_periodica: '0',
            manipuladores_responsavel_habilitado: '0',
            manipuladores_conscientizacao: '0',
            manipuladores_obs: '',
            sanitarias_banheiros_alunos: '0',
            sanitarias_banheiros_funcionarios: '0',
            sanitarias_banheiros_separados: '0',
            sanitarias_obs: '',
            agua_potavel: '0',
            agua_reservatorio: '0',
            agua_higienizacao: '0',
            agua_planilha_higienizacao: '0',
            agua_higienizacao_bebedouros: '0',
            agua_obs: '',
            residuos_recipientes: '0',
            residuos_coletores: '0',
            residuos_frequencia: '0',
            residuos_obs: '',
            esgoto_rede: '0',
            esgoto_caixa_gordura: '0',
            esgoto_obs: '',
            pragas_estado: '0',
            pragas_medidas: '0',
            pragas_obs: '',
            lazer_estado: '0',
            lazer_estrutura: '0',
            lazer_manutencao: '0',
            lazer_obs: ''
        },
        verificacao_veiculos_alimentos: {
            tipo: '0',
            placa: '0',
            responsavel: '0',
            destinacao: '0',
            certificado: '0',
            contaminacao: '0',
            isolamento: '0',
            vetores: '0',
            limpeza: '0',
            piso: '0',
            prateleiras: '0',
            contaminacao_cruzada: '0',
            ventilacao: '0',
            ventilacao_artificial: '0',
            fungos: '0',
            carregamento: '0',
            emblocamento: '0',
            acesso_carroceria: '0',
            embalagens_assento: '0',
            pisoteadas: '0',
            termostato: '0',
            temperatura: '0',
            frios: '0',
            planilha: '0',
            rotulo_temperatura: '0',
            equipamento_regrigeracao: '0',
            limpeza_carroceria: '0',
            procedimento_limpeza: '0',
            procedimento_limpeza_registro: '0',
            produtos_limpeza: '0',
            manipuladores_uniforme: '0',
            isolamento_termico: '0',
            manutencao_preventiva: '0',
            manutencao_preventiva_registro: '0',
            limpeza_periodica_registro: '0',
            integridade: '0',
            outras_cargas: '0',
            manipuladores_saude: '0'
        },
        slug: '',
    });

    const [Estabelecimentos, setEstabelecimentos] = useState([]);
    const [Responsaveis, setResponsaveis] = useState([]);

    const motivos = [
        { value: "0", label: "Selecione um motivo" },
        { value: "1", label: "Solicitação de Alvará Sanitário" },
        { value: "2", label: "Renovação de Alvará Sanitário" },
        { value: "3", label: "Denúncia" },
        { value: "4", label: "Solicitação do MP" },
        { value: "5", label: "Solicitação da SUVISA" },
        { value: "6", label: "Solicitação do MPT" },
        { value: "7", label: "Inspeção de Rotina" },
    ]

    const simNao = [
        { value: "0", label: "Selecione" },
        { value: "1", label: "Conforme" },
        { value: "2", label: "Não conforme" },
        { value: "3", label: "Não se aplica" },
    ];

    const naturezaEscola = [
        { value: "0", label: "Selecione" },
        { value: "1", label: "Municipal" },
        { value: "2", label: "Estadual" },
        { value: "3", label: "Particular" },
        { value: "4", label: "Outros" },
    ];

    const conforme = [
        { value: "0", label: "Selecione" },
        { value: "1", label: "Conforme" },
        { value: "2", label: "Não Conforme" },
        { value: "3", label: "Não se aplica" },
    ]

    const roteiros_inspecao = [
        { value: "0", label: "Selecione um roteiro" },
        { value: "1", label: "Restaurantes e Similares" },
        { value: "2", label: "Supermercados" },
        { value: "3", label: "Escolas" },
        { value: "4", label: "Veículos que transportam alimentos" },

    ];

    //Verifica ID
    const verificaId = () => {
        const url = window.location.pathname;
        const id = url.split('/').pop();


        if (id !== 'form') {

            setId(parseInt(id ? id : '0'));
            //buscar os dados da inspeção
            axios.get(`${server.url}${server.endpoints.inspecao}/${id}`).then(response => {

                try {
                    // Cria uma cópia dos dados recebidos
                    const data = response.data;

                    // Verifica e desserializa os campos que são JSON string
                    if (typeof data.verificacao_Restaurantes === 'string') {
                        data.verificacao_restaurantes = JSON.parse(data.verificacao_Restaurantes);
                    }
                    if (typeof data.verificacao_Supermercados === 'string') {
                        data.verificacao_supermercados = JSON.parse(data.verificacao_Supermercados);
                    }
                    if (typeof data.verificacao_Escolas === 'string') {
                        data.verificacao_escolas = JSON.parse(data.verificacao_Escolas);
                    }
                    if (typeof data.verificacao_Veiculos_Alimentos === 'string') {
                        data.verificacao_veiculos_alimentos = JSON.parse(data.verificacao_Veiculos_Alimentos);
                    }

                    data.Id_Usuario_Alteracao = user ? user.id : '0';

                    // Define os dados no formData
                    setFormData(data);

                    console.log("FORMDATA:", formData);
                    setLoading(false); // Define como falso quando os dados são carregados

                } catch (error) {
                    console.error("Erro:", error);
                    setLoading(false); // Define como falso quando os dados são carregados
                }

            }).catch(error => {
                console.error("Erro:", error);
                setLoading(false); // Define como falso quando os dados são carregados
            });
        } else {
            setLoading(false); // Define como falso quando os dados são carregados
        }
    };

    useEffect(() => {
        verificaId();
    }, [Id, user]);

    useEffect(() => {
        //console.log("FORMDATA atualizado:", formData);
    }, [formData]);

    useEffect(() => {
        // Reavalie a condição quando 'formData.roteiro_Inspecao' mudar
    }, [formData.roteiro_Inspecao]);

    useEffect(() => {

        setId_Usuario(parseInt(user ? user.id : '0'));

        if (!Id) { // Só atualiza se for um novo registro
            setFormData((prevState) => ({
                ...prevState,
                Id_Usuario_Cadastro: user ? user.id : '0',
            }));
        }
    }, [user]); // Executa quando o `user` estiver disponível

    //Carrega Estabelecimentos
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(
                    `${server.url}${server.endpoints.estabelecimento}`,
                    {
                        //parâmetros
                    }
                );

                response.data = response.data.dados.$values.map((item: any) => {
                    return { value: item.id, label: item.razao_social };
                });

                response.data.unshift({ value: 0, label: 'Selecione' });

                setEstabelecimentos(response.data);

            } catch (error) {
                console.error("Erro:", error);
            }
        };

        fetchData();
    }, []);

    //Carrega Usuários
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(
                    `${server.url}${server.endpoints.usuario}`,
                    {
                        params: {
                            tipo: 7
                        }
                    }
                );

                response.data = response.data.dados.$values.map((item: any) => {
                    return { value: item.id, label: item.nome };
                });

                response.data.unshift({ value: 0, label: 'Selecione' });

                setResponsaveis(response.data);

            } catch (error) {
                console.error("Erro:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {

        setRoteiroSelecionado(parseInt(formData.roteiro_Inspecao));

    }, [formData]);

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

        if (name === 'roteiro_Inspecao') {
            setRoteiroSelecionado(parseInt(value));
        }

        setFormData(prevState => {
            const keys = name.split('.'); // Divide o nome pelo ponto para lidar com campos aninhados

            if (keys.length > 1) {
                return {
                    ...prevState,
                    [keys[0]]: {
                        ...(prevState[keys[0] as keyof typeof prevState] as any), // Faz uma assertion de tipo para garantir que o TypeScript aceite
                        [keys[1]]: value
                    }
                };
            } else {
                // Para campos não aninhados
                return {
                    ...prevState,
                    [name]: value
                };
            }
        });
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

    function handleSubmit(e: any) {

        if (id_usuario === 0) {
            setAlert({
                show: true,
                success: false,
                title: 'Erro',
                message: ['Usuário não autenticado'],
                onConfirm: () => { },
                onClose: () => { }
            });
            return;
        } else {
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

            var mensagem_erro = [];

            const descricao = validaCampos(formData.descricao, 'Descrição', true);
            const n_termo_inspecao = validaCampos(formData.n_termo_inspecao, 'Nº do Termo de Inspeção', true);
            const data_inspecao = validaCampos(formData.data_inspecao, 'Data da Inspeção', true);
            const motivo_inspecao = validaCampos(formData.motivo_inspecao, 'Motivo da Inspeção', true);
            const estabelecimento = validaCampos(formData.id_estabelecimento, 'Estabelecimento', true);
            const responsavel_tecnico = validaCampos(formData.id_responsavel_tecnico, 'Responsável Técnico', true);

            if (descricao.erro) {
                mensagem_erro.push(descricao.mensagem_erro);
            }

            if (n_termo_inspecao.erro) {
                mensagem_erro.push(n_termo_inspecao.mensagem_erro);
            }

            if (data_inspecao.erro) {
                mensagem_erro.push(data_inspecao.mensagem_erro);
            }

            if (motivo_inspecao.erro) {
                mensagem_erro.push(motivo_inspecao.mensagem_erro);
            }

            if (estabelecimento.erro) {
                mensagem_erro.push(estabelecimento.mensagem_erro);
            }

            if (responsavel_tecnico.erro) {
                mensagem_erro.push(responsavel_tecnico.mensagem_erro);
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
                var slug = formData.descricao.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                formData.slug = slug;

                const dataToSend = {
                    ...formData,
                    verificacao_restaurantes: JSON.stringify(formData.verificacao_restaurantes),
                    verificacao_supermercados: JSON.stringify(formData.verificacao_supermercados),
                    verificacao_escolas: JSON.stringify(formData.verificacao_escolas),
                    verificacao_veiculos_alimentos: JSON.stringify(formData.verificacao_veiculos_alimentos),
                };

                if (Id === 0) {
                    axios.post(`${server.url}${server.endpoints.inspecao}`, dataToSend).then(response => {

                        setAlert({
                            show: true,
                            success: true,
                            title: 'Sucesso',
                            message: ['Inspeção cadastrada com sucesso'],
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
                            message: ['Erro ao cadastrar Inspeção'],
                            onConfirm: () => {
                                setAlert({ ...alert, show: false });
                            },
                            onClose: () => {
                                setAlert({ ...alert, show: false });
                            }
                        });

                    });
                } else {
                    axios.put(`${server.url}${server.endpoints.inspecao}/${Id}`, dataToSend).then(response => {

                        setAlert({
                            show: true,
                            success: true,
                            title: 'Sucesso',
                            message: ['Inspeção atualizada com sucesso'],
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
                            message: ['Erro ao atualizar Inspeção'],
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

    }

    if (id_usuario === 0) {
        return (
            <Layout>
                <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Inspecoes", href: "/estabelecimentos/" }, { texto: "Formulário Inspecoes", href: "#" }]} />

                <Titulo titulo="Formulário Inspecoes" />

                < div > Usuário não autenticado</div >
            </Layout>
        )
    }

    return (
        <Layout>

            {loading && <OverlayLoading />}

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Inspecoes", href: "/estabelecimentos/" }, { texto: "Formulário Inspecoes", href: "#" }]} />

            <Titulo titulo="Formulário Inspecoes" />

            <ContainerForm title="Informações Básicas">
                <Row>
                    <CampoSelect label="Estabelecimento" value={formData.id_estabelecimento} name="id_estabelecimento" options={Estabelecimentos} className="col-md-4" onChange={handleChange} />
                    <CampoTexto label="Descrição" name="descricao" value={formData.descricao} tipo="text" className="col-md-8" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoTexto label="Nº do Termo de Inspeção" value={formData.n_termo_inspecao} name="n_termo_inspecao" tipo="text" className="col-md-4" onChange={handleChange} />
                    <CampoTexto label="Data da Inspeção" value={formData.data_inspecao ? new Date(formData.data_inspecao).toISOString().split('T')[0] : ''} name="data_inspecao" tipo="date" className="col-md-4" onChange={handleChange} />
                    <CampoSelect label="Motivo da Inspeção" value={formData.motivo_inspecao} name="motivo_inspecao" options={motivos} className="col-md-4" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Informações Técnicas">
                <Row>
                    <CampoSelect label="Responsável Técnico" value={formData.id_responsavel_tecnico} name="id_responsavel_tecnico" options={Responsaveis} className="col-md-6" onChange={handleChange} />
                    <CampoSelect label="Roteiro de Inspeção" value={formData.roteiro_Inspecao} name="roteiro_Inspecao" options={roteiros_inspecao} className="col-md-6" onChange={handleChange} />
                </Row>
            </ContainerForm>

            {!loading && roteiroSelecionado === 1 &&

                <ContainerForm title="Inspeção - Restaurantes e Similares">
                    <ContainerForm title="Inspeção">

                        <Row>
                            <CampoTexto label="As matérias primas e os produtos industrializados são procedentes de empresas licenciadas ou cadastradas nos órgãos de vigilância sanitária OU MAPA." name="verificacao_restaurantes.procedencia_materiais" value={formData.verificacao_restaurantes.procedencia_materiais} tipo="text" className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="São verificados nos produtos adquiridos: data de validade, denominação de venda, lista de ingredientes, conteúdo líquido, lote, n° de registro SIF ou do MS, quando necessário; nome e endereço do fabricante, fracionador, distribuidor e importador, características sensoriais, integridade das embalagens e higiene do produto." name="verificacao_restaurantes.produtos" value={formData.verificacao_restaurantes.produtos} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os entregadores utilizam uniforme limpo?" name="verificacao_restaurantes.uniformes" value={formData.verificacao_restaurantes.uniformes} options={simNao} className="col-md-6" onChange={handleChange} />
                            <CampoSelect label="As carnes/pescados são transportados em veículos limpos, fechados e refrigerados?" name="verificacao_restaurantes.transportes_carnes" value={formData.verificacao_restaurantes.transportes_carnes} options={simNao} className="col-md-6" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os demais alimentos são transportados em veículos limpos, fechados e/ou refrigerados, se necessário?" name="verificacao_restaurantes.transportes" value={formData.verificacao_restaurantes.transportes} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="É verificada, na hora do recebimento, as temperaturas dos  produtos perecíveis: pescado +3ºC; carnes +7°C; refrigerados +10° C; congelados –12ºC. Tem a planilha de comprovação?" name="verificacao_restaurantes.recebimento_frios" value={formData.verificacao_restaurantes.recebimento_frios} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Armazenamento">
                        <Row>
                            <CampoSelect label="Os produtos alimentícios são armazenados sobre estrados ou paletes, em local exclusivo, limpo, arejado, protegido contra entrada de insetos e roedores e de forma organizada segundo: Primeiro que entra, primeiro que sai – PEPS ou Primeiro quevence, primeiro que sai - PVPS?" name="verificacao_restaurantes.armazenamento" value={formData.verificacao_restaurantes.armazenamento} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="As embalagens de produtos industrializados estão íntegras e com identificação ou rótulo visível?" name="verificacao_restaurantes.embalagens_industrializados" value={formData.verificacao_restaurantes.embalagens_industrializados} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os produtos de limpeza e outros potencialmente tóxicos são armazenados em local separado dos alimentos?" name="verificacao_restaurantes.armazenamento_toxicos" value={formData.verificacao_restaurantes.armazenamento_toxicos} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os produtos perecíveis estão armazenados em equipamento refrigerado.Temperaturas máximas: carnes: 4°C; pescados: 2°C; hortifruti: 10°C; congelados: - 18° C ou na temperatura recomendada pelo fabricante?" name="verificacao_restaurantes.temperatura_pereciveis" value={formData.verificacao_restaurantes.temperatura_pereciveis} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Geladeira/Freezer">
                        <Row>
                            <CampoSelect label="A geladeira e o freezer estão instalados longe de fontes de  calor como forno, fogão?" name="verificacao_restaurantes.local_geladeira" value={formData.verificacao_restaurantes.local_geladeira} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="A geladeira e o freezer encontram–se em bom estado de conservação?" name="verificacao_restaurantes.estado_geladeira" value={formData.verificacao_restaurantes.estado_geladeira} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="A espessura do gelo não ultrapassa 1 cm?" name="verificacao_restaurantes.espessura_gelo" value={formData.verificacao_restaurantes.espessura_gelo} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="A geladeira e o freezer estão limpos e organizados, os produtos estão separados conforme as categorias?" name="verificacao_restaurantes.organizacao_geladeira" value={formData.verificacao_restaurantes.organizacao_geladeira} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O freezer está regulado para manter os alimentos congelados a temperatura de –18°C ou na temperatura recomendada pelo fabricante?" name="verificacao_restaurantes.regulacao_freezer" value={formData.verificacao_restaurantes.regulacao_freezer} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Câmara Fria">
                        <Row>
                            <CampoSelect label="A câmara é revestida de material liso, resistente e impermeável. Está livre de ralos e grelhas, encontra-se em bom estado de conservação e limpeza. Não existe gotejamento?" name="verificacao_restaurantes.estado_camara_fria" value={formData.verificacao_restaurantes.estado_camara_fria} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="A porta da câmara fria está totalmente vedada. Possui dispositivo de segurança que permite sua abertura pelo lado interno?" name="verificacao_restaurantes.porta_camara_fria" value={formData.verificacao_restaurantes.porta_camara_fria} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Possui termômetro no lado externo indicando a temperatura interna da câmara?" name="verificacao_restaurantes.termometro_camara_fria" value={formData.verificacao_restaurantes.termometro_camara_fria} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="As carnes e/ou pescado estão adequadamente armazenados em câmara fria. Temperaturas máximas: + 4°C para carnes; + 2°C para pescado ou sob congelamento a -18°C?" name="verificacao_restaurantes.carnes_camara_fria" value={formData.verificacao_restaurantes.carnes_camara_fria} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Hortifruti e outros produtos estão armazenados em temperatura adequada temperatura máxima: até +10°C ou conforme recomendação do fabricante e registrados em planilhas?" name="verificacao_restaurantes.hortifruti_camara_fria" value={formData.verificacao_restaurantes.hortifruti_camara_fria} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Possui estrado de material de fácil limpeza, liso, resistente e impermeável?" name="verificacao_restaurantes.estrado_camara_fria" value={formData.verificacao_restaurantes.estrado_camara_fria} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="A periodicidade e os procedimentos de higienização estão adequados?" name="verificacao_restaurantes.higienizacao_camara_fria" value={formData.verificacao_restaurantes.higienizacao_camara_fria} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Controle de Qualidade">
                        <Row>
                            <CampoSelect label="Monitora diariamente e registra em planilha própria a temperatura de equipamentos de frio e térmicos?" name="verificacao_restaurantes.qualidade_temperatura" value={formData.verificacao_restaurantes.qualidade_temperatura} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Não utiliza alimentos com prazo de validade vencido no processo?" name="verificacao_restaurantes.prazo_validade" value={formData.verificacao_restaurantes.prazo_validade} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Produtos para devolução estão identificados e separados?" name="verificacao_restaurantes.devolucao_produtos" value={formData.verificacao_restaurantes.devolucao_produtos} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>

                    </ContainerForm>
                </ContainerForm>

            }

            {!loading && roteiroSelecionado === 2 &&

                <ContainerForm title="Inspeção - Supermercados">

                    <ContainerForm title="Área Externa">
                        <Row>
                            <CampoSelect label="Área externa do estabelecimento livre de focos de insalubridade, ausência de lixo, objetos em desuso, sem presença de animais, insetos e roedores" name="verificacao_supermercados.supermercado_area_externa" value={formData.verificacao_supermercados.supermercado_area_externa || '0'} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Pátio com piso lavável, grama aparada ou cascalho" name="verificacao_supermercados.supermercado_area_externa_piso" value={formData.verificacao_supermercados.supermercado_area_externa_piso} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_area_externa_obs" value={formData.verificacao_supermercados.supermercado_area_externa_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>
                    <ContainerForm title="Resíduos">
                        <Row>
                            <CampoSelect label="Recipientes para coleta de resíduos no interior do estabelecimento de fácil higienização e transporte, devidamente identificados e higienizados constantemente; uso de sacos de lixo apropriados. Quando necessário, recipientes tampados com acionamento não manual" name="verificacao_supermercados.supermercado_residuos_recipientes" value={formData.verificacao_supermercados.supermercado_residuos_recipientes} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O estabelecimento possui local próprio e adequado para o armazenamento externo do lixo, provido de ponto de água, ralo, protegido de chuva, sol, acesso de pessoas estranhas, animais domésticos e roedores e livre de odores ou incômodo à vizinhança." name="verificacao_supermercados.supermercado_residuos_local" value={formData.verificacao_supermercados.supermercado_residuos_local} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_residuos_obs" value={formData.verificacao_supermercados.supermercado_residuos_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>
                    <ContainerForm title="Recebimento">
                        <Row>
                            <CampoSelect label="Área de recebimento protegida de chuva, sol, poeira, livre de materiais ou equipamentos inservíveis" name="verificacao_supermercados.supermercado_recebimento_area" value={formData.verificacao_supermercados.supermercado_recebimento_area} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os alimentos são transportados em veículos limpos, fechados, refrigerados ou isotérmicos, se necessário" name="verificacao_supermercados.supermercado_recebimento_higiene" value={formData.verificacao_supermercados.supermercado_recebimento_higiene} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="É verificada, na hora do recebimento, a temperatura dos produtos perecíveis.Temperaturas máximas: congelados: - 12ºC; pescado até 3ºC; carnes até 7°C; refrigerados até 10° C ou conforme especificação do fabricante e registrados em planilhas" name="verificacao_supermercados.supermercado_recebimento_temperatura" value={formData.verificacao_supermercados.supermercado_recebimento_temperatura} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="São verificados nos produtos: data de validade, denominação de venda, lista de ingredientes, conteúdo líquido, lote, n° de registro SIF, nome e endereço do fabricante, fracionador, distribuidor e importador, características sensoriais, integridade das embalagens e higiene do produto" name="verificacao_supermercados.supermercado_recebimento_validade" value={formData.verificacao_supermercados.supermercado_recebimento_validade} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_recebimento_obs" value={formData.verificacao_supermercados.supermercado_recebimento_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Armazenamento - Estoque Seco">
                        <Row>
                            <CampoSelect label="Alimentos armazenados de forma organizada, em local limpo, livre de pragas, entulhos e material tóxico, separados por categorias, longe do piso, sobre estrados fixos ou móveis, distantes a 40 cm das paredes e entre pilhas e 60 cm do forro" name="verificacao_supermercados.supermercado_armazenamento_seco_local" value={formData.verificacao_supermercados.supermercado_armazenamento_seco_local} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Embalagens íntegras, de identificação visível e com dados necessários para garantir a rastreabilidade e a validade dos produtos" name="verificacao_supermercados.supermercado_armazenamento_seco_embalagens" value={formData.verificacao_supermercados.supermercado_armazenamento_seco_embalagens} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Uso de PEPS/PVPS – Primeiro que entra, primeiro que sai/Primeiro que vence, primeiro que sai" name="verificacao_supermercados.supermercado_armazenamento_seco_ordem" value={formData.verificacao_supermercados.supermercado_armazenamento_seco_ordem} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Produtos destinados à devolução ou descarte identificados e colocados em local apropriado" name="verificacao_supermercados.supermercado_armazenamento_seco_devolucao" value={formData.verificacao_supermercados.supermercado_armazenamento_seco_devolucao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Material de limpeza ou similares armazenados separadamente dos alimentos" name="verificacao_supermercados.supermercado_armazenamento_seco_separacao" value={formData.verificacao_supermercados.supermercado_armazenamento_seco_separacao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_armazenamento_seco_obs" value={formData.verificacao_supermercados.supermercado_armazenamento_seco_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Câmara Produtos Refrigerados">

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Horifruti" name="verificacao_supermercados.supermercado_armazenamento_refrigerados_itens.hortifruti" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_itens.hortifruti} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Frios" name="verificacao_supermercados.supermercado_armazenamento_refrigerados_itens.frios" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_itens.frios} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Aves" name="verificacao_supermercados.supermercado_armazenamento_refrigerados_itens.aves" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_itens.aves} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Carnes" name="verificacao_supermercados.supermercado_armazenamento_refrigerados_itens.carnes" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_itens.carnes} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Peixes" name="verificacao_supermercados.supermercado_armazenamento_refrigerados_itens.pescados" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_itens.pescados} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Laticínios" name="verificacao_supermercados.supermercado_armazenamento_refrigerados_itens.laticinios" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_itens.laticinios} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Margarina" name="verificacao_supermercados.supermercado_armazenamento_refrigerados_itens.margarina" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_itens.margarina} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Panificados" name="verificacao_supermercados.supermercado_armazenamento_refrigerados_itens.panificados" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_itens.panificados} options={simNao} className="col-md-3" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="A porta da câmara fria está totalmente vedada. Possui dispositivo de segurança que permite sua abertura pelo lado interno." name="verificacao_supermercados.supermercado_armazenamento_refrigerados_portas" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_portas} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Possui termômetro no lado externo indicando a temperatura interna da câmara." name="verificacao_supermercados.supermercado_armazenamento_refrigerados_termometro" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_termometro} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="A câmara é revestida de material liso, resistente e impermeável. Está livre de ralos e grelhas, encontra-se em bom estado de conservação e limpeza. Não existe gotejamento." name="verificacao_supermercados.supermercado_armazenamento_refrigerados_revestimento" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_revestimento} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Paletes, estrados e prateleiras de material liso, resistente, impermeável e lavável." name="verificacao_supermercados.supermercado_armazenamento_refrigerados_paletes" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_paletes} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Embalagens íntegras, de identificação visível e com dados necessários para garantir a rastreabilidade e a validade dos produtos." name="verificacao_supermercados.supermercado_armazenamento_refrigerados_embalagens" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_embalagens} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Presença de caixas de papelão em local segregado livre de umidade ou emboloramento." name="verificacao_supermercados.supermercado_armazenamento_refrigerados_caixas" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_caixas} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Produtos distantes das paredes e entre grupos, afastados de condensadores e evaporadores." name="verificacao_supermercados.supermercado_armazenamento_refrigerados_distancia_paredes" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_distancia_paredes} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Uso de PEPS/PVPS – Primeiro que entra, primeiro que sai/Primeiro que vence, primeiro que sai." name="verificacao_supermercados.supermercado_armazenamento_refrigerados_ordem" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_ordem} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Produtos destinados à devolução ou descarte estão identificados e colocados em local apropriado." name="verificacao_supermercados.supermercado_armazenamento_refrigerados_devolucao" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_devolucao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Os pescados estão armazenados em temperatura adequada (temperatura máxima: até + 2°C ou conforme recomendação do fabricante) e registrado em planilhas." name="verificacao_supermercados.supermercado_armazenamento_refrigerados_pescados" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_pescados} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="As carnes estão armazenadas em temperatura adequada (temperatura máxima: até + 4°C ou conforme recomendação do fabricante e registrados em planilhas." name="verificacao_supermercados.supermercado_armazenamento_refrigerados_carnes" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_carnes} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Hortifruti e outros produtos estão armazenados em temperatura adequada (temperatura máxima: até +10°C ou conforme recomendação do fabricante e registrados em  planilhas." name="verificacao_supermercados.supermercado_armazenamento_refrigerados_hortifruti" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_hortifruti} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Ausência de produtos com prazos de validade vencidos." name="verificacao_supermercados.supermercado_armazenamento_refrigerados_validade" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_validade} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="A periodicidade e os procedimentos de higienização estão adequados." name="verificacao_supermercados.supermercado_armazenamento_refrigerados_periodicidade_higienizacao" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_periodicidade_higienizacao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Iluminação suficiente. Luminárias protegidas contra queda acidental e explosão, em adequado estado de conservação e higiene." name="verificacao_supermercados.supermercado_armazenamento_refrigerados_iluminacao" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_iluminacao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Instalações elétricas embutidas ou protegidas em tubulações externas e íntegras de tal forma a permitir a higienização do ambiente." name="verificacao_supermercados.supermercado_armazenamento_refrigerados_instalacoes" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_instalacoes} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_armazenamento_refrigerados_obs" value={formData.verificacao_supermercados.supermercado_armazenamento_refrigerados_obs} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>
                    </ContainerForm>

                    <ContainerForm title="Câmara Produtos Congelados">

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Aves" name="verificacao_supermercados.supermercado_armazenamento_congelados_itens.aves" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_itens.aves} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Carnes" name="verificacao_supermercados.supermercado_armazenamento_congelados_itens.carnes" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_itens.carnes} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Pescados" name="verificacao_supermercados.supermercado_armazenamento_congelados_itens.pescados" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_itens.pescados} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Sorvetes" name="verificacao_supermercados.supermercado_armazenamento_congelados_itens.sorvetes" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_itens.sorvetes} options={simNao} className="col-md-3" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="A porta da câmara fria está totalmente vedada. Possui dispositivo de segurança que permite sua abertura pelo lado interno." name="verificacao_supermercados.supermercado_armazenamento_congelados_portas" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_portas} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Possui termômetro no lado externo indicando a temperatura interna da câmara." name="verificacao_supermercados.supermercado_armazenamento_congelados_termometro" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_termometro} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="A câmara é revestida de material liso, resistente e impermeável. Está livre de ralos e grelhas, encontra-se em bom estado de conservação e limpeza. Não existe gotejamento." name="verificacao_supermercados.supermercado_armazenamento_congelados_revestimento" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_revestimento} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Paletes, estrados e prateleiras de material liso, resistente, impermeável e lavável." name="verificacao_supermercados.supermercado_armazenamento_congelados_paletes" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_paletes} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Embalagens íntegras, de identificação visível e com dados necessários para garantir a rastreabilidade e a validade dos produtos." name="verificacao_supermercados.supermercado_armazenamento_congelados_embalagens" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_embalagens} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Presença de caixas de papelão em local segregado livre de umidade ou emboloramento." name="verificacao_supermercados.supermercado_armazenamento_congelados_caixas" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_caixas} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Produtos distantes das paredes e entre grupos, afastados de condensadores e evaporadores." name="verificacao_supermercados.supermercado_armazenamento_congelados_distancia_parede" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_distancia_parede} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Uso de PEPS/PVPS – Primeiro que entra, primeiro que sai/Primeiro que vence, primeiro que sai." name="verificacao_supermercados.supermercado_armazenamento_congelados_ordem" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_ordem} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Produtos destinados à devolução ou descarte estão identificados e colocados em local apropriado." name="verificacao_supermercados.supermercado_armazenamento_congelados_devolucao" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_devolucao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Os alimentos estão armazenados em temperatura adequada (sob congelamento -18° C ou conforme recomendação do fabricante)." name="verificacao_supermercados.supermercado_armazenamento_congelados_temperatura" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_temperatura} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="A periodicidade e os procedimentos de higienização estão adequados." name="verificacao_supermercados.supermercado_armazenamento_congelados_periodicidade_higienizacao" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_periodicidade_higienizacao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Ausência de produtos com prazos de validade vencidos." name="verificacao_supermercados.supermercado_armazenamento_congelados_validade" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_validade} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Iluminação suficiente. Luminárias protegidas contra queda acidental e explosão, em adequado estado de conservação e higiene." name="verificacao_supermercados.supermercado_armazenamento_congelados_iluminacao" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_iluminacao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Instalações elétricas embutidas ou protegidas em tubulações externas e íntegras de tal forma a permitir a higienização do ambiente." name="verificacao_supermercados.supermercado_armazenamento_congelados_instalacoes" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_instalacoes} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm>
                            <Row>
                                <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_armazenamento_congelados_obs" value={formData.verificacao_supermercados.supermercado_armazenamento_congelados_obs} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>
                    </ContainerForm>

                    <ContainerForm title="Açougue/Peixaria">

                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Açougue" name="verificacao_supermercados.supermercado_acougue_itens.acougue" value={formData.verificacao_supermercados.supermercado_acougue_itens.acougue} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Peixaria" name="verificacao_supermercados.supermercado_acougue_itens.peixaria" value={formData.verificacao_supermercados.supermercado_acougue_itens.peixaria} options={simNao} className="col-md-3" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm title="Geladeira/Freezer/Balcão Frigorífico">
                            <Row>
                                <CampoSelect label="No açougue as carnes são mantidas em geladeira ou balcão frigorífico. Temperaturas máximas: + 4°C para carnes; ou conforme recomendação do fabricante." name="verificacao_supermercados.supermercado_acougue_freezer_carnes" value={formData.verificacao_supermercados.supermercado_acougue_freezer_carnes} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os peixes são mantidos em geladeira ou balcão frigorífico. Temperaturas máximas: + 2°C para pescados ou conforme recomendação do fabricante." name="verificacao_supermercados.supermercado_acougue_freezer_peixes" value={formData.verificacao_supermercados.supermercado_acougue_freezer_peixes} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="A geladeira e o freezer estão em bom estado de conservação, limpos e organizados." name="verificacao_supermercados.supermercado_acougue_freezer_conservacao" value={formData.verificacao_supermercados.supermercado_acougue_freezer_conservacao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="A espessura do gelo não ultrapassa 1 cm." name="verificacao_supermercados.supermercado_acougue_freezer_gelo" value={formData.verificacao_supermercados.supermercado_acougue_freezer_gelo} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="O freezer está regulado para manter os alimentos congelados a temperatura de –18°C ou na temperatura recomendada pelo fabricante." name="verificacao_supermercados.supermercado_acougue_freezer_temperatura" value={formData.verificacao_supermercados.supermercado_acougue_freezer_temperatura} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm title="Manipulação">
                            <Row>
                                <CampoSelect label="O local de manipulação possui pia exclusiva para lavagem das mãos, dotado de sabonete líquido anti-séptico, papel toalha não reciclado." name="verificacao_supermercados.supermercado_acougue_manipulacao_local" value={formData.verificacao_supermercados.supermercado_acougue_manipulacao_local} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Existem cartazes orientando a lavagem e desinfecção das mãos." name="verificacao_supermercados.supermercado_acougue_manipulacao_cartaz" value={formData.verificacao_supermercados.supermercado_acougue_manipulacao_cartaz} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Ausência de caixas de madeira ou papelão na área de manipulação." name="verificacao_supermercados.supermercado_acougue_manipulacao_caixas" value={formData.verificacao_supermercados.supermercado_acougue_manipulacao_caixas} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Na manipulação de carnes e peixes, quando realizada em temperatura ambiente, respeita o prazo máximo de 30 minutos ou até 2 (duas) horas em temperatura climatizada entre 12°C e 18°C." name="verificacao_supermercados.supermercado_acougue_manipulacao_temperatura" value={formData.verificacao_supermercados.supermercado_acougue_manipulacao_temperatura} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os manipuladores utilizam luvas de malha de aço para o corte das carnes e pescados." name="verificacao_supermercados.supermercado_acougue_manipulacao_luvas" value={formData.verificacao_supermercados.supermercado_acougue_manipulacao_luvas} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Não são utilizadas escovas de metal, lã de aço ou outros materiais abrasivos na limpeza de equipamentos e utensílios." name="verificacao_supermercados.supermercado_acougue_manipulacao_escovas" value={formData.verificacao_supermercados.supermercado_acougue_manipulacao_escovas} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Não são utilizados panos convencionais (panos de prato) para secagem das mãos e utensílios." name="verificacao_supermercados.supermercado_acougue_manipulacao_panos" value={formData.verificacao_supermercados.supermercado_acougue_manipulacao_panos} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="A manipulação de alimentos deve garantir um fluxo linear sem cruzamento de atividade." name="verificacao_supermercados.supermercado_acougue_manipulacao_fluxo" value={formData.verificacao_supermercados.supermercado_acougue_manipulacao_fluxo} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os utensílios utilizados estão conservados, sem pontos escuros e/ou amassamentos e higienizados antes e após cada uso." name="verificacao_supermercados.supermercado_acougue_manipulacao_utensilios" value={formData.verificacao_supermercados.supermercado_acougue_manipulacao_utensilios} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="A periodicidade e os procedimentos de higienização estão adequados." name="verificacao_supermercados.supermercado_acougue_manipulacao_periodicidade_higienizacao" value={formData.verificacao_supermercados.supermercado_acougue_manipulacao_periodicidade_higienizacao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os equipamentos são revestidos de material sanitário atóxico, bem conservados, e, se necessário, com dispositivo de proteção e segurança." name="verificacao_supermercados.supermercado_acougue_manipulacao_equipamentos" value={formData.verificacao_supermercados.supermercado_acougue_manipulacao_equipamentos} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os uniformes, panos de limpeza são lavados fora da área de produção." name="verificacao_supermercados.supermercado_acougue_manipulacao_uniformes" value={formData.verificacao_supermercados.supermercado_acougue_manipulacao_uniformes} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_acougue_manipulacao_obs" value={formData.verificacao_supermercados.supermercado_acougue_manipulacao_obs} className="col-md-12" onChange={handleChange} />
                            </Row>

                        </ContainerForm>
                        <ContainerForm title="Área de Exposição para a venda">
                            <Row>
                                <CampoSelect label="Os produtos com prazos de validade vencidos são diariamente retirados da área de venda e descartados ou separados e identificados para troca." name="verificacao_supermercados.supermercado_acougue_exposicao_validade" value={formData.verificacao_supermercados.supermercado_acougue_exposicao_validade} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Ausência de comercialização de alimentos em embalagens rasgadas, furadas, bem como aquelas que apresentem sujidades que possam alterar a qualidade e integridade do produto." name="verificacao_supermercados.supermercado_acougue_exposicao_embalagens" value={formData.verificacao_supermercados.supermercado_acougue_exposicao_embalagens} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os produtos preparados ou fracionados e embalados na presença do consumidor têm as seguintes informações: nome do produto, marca, quantidade, ingredientes, preço, validade." name="verificacao_supermercados.supermercado_acougue_exposicao_separacao" value={formData.verificacao_supermercados.supermercado_acougue_exposicao_separacao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>

                            <Row>
                                <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_acougue_exposicao_obs" value={formData.verificacao_supermercados.supermercado_acougue_exposicao_obs} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>
                    </ContainerForm>

                    <ContainerForm title="Salsicharia/Fiambreria">
                        <ContainerForm title="Armazenamento">
                            <Row>
                                <CampoSelect label="As embalagens estão íntegras com identificação visível e com dados necessários para garantir a rastreabilidade e a validade dos produtos." name="verificacao_supermercados.supermercado_salsicharia_armazenamento_embalagens" value={formData.verificacao_supermercados.supermercado_salsicharia_armazenamento_embalagens} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os produtos perecíveis estão armazenados em equipamento refrigerado. Temperaturas máximas: +10°C; congelados: - 18° C ou na temperatura recomendada pelo fabricante." name="verificacao_supermercados.supermercado_salsicharia_armazenamento_temperatura" value={formData.verificacao_supermercados.supermercado_salsicharia_armazenamento_temperatura} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="O freezer está regulado para manter os alimentos congelados a temperatura de –18°C ou na temperatura recomendada pelo fabricante." name="verificacao_supermercados.supermercado_salsicharia_armazenamento_freezer" value={formData.verificacao_supermercados.supermercado_salsicharia_armazenamento_freezer} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="A espessura do gelo não ultrapassa 1 cm." name="verificacao_supermercados.supermercado_salsicharia_armazenamento_gelo" value={formData.verificacao_supermercados.supermercado_salsicharia_armazenamento_gelo} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_salsicharia_armazenamento_obs" value={formData.verificacao_supermercados.supermercado_salsicharia_armazenamento_obs} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>
                        <ContainerForm title="Manipulação">
                            <Row>
                                <CampoSelect label="O local de manipulação possui pia exclusiva para lavagem das mãos, dotado de sabonete líquido anti-séptico, papel toalha não reciclado." name="verificacao_supermercados.supermercado_salsicharia_manipulacao_local" value={formData.verificacao_supermercados.supermercado_salsicharia_manipulacao_local} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Existem cartazes orientando a lavagem e desinfecção das mãos." name="verificacao_supermercados.supermercado_salsicharia_manipulacao_cartaz" value={formData.verificacao_supermercados.supermercado_salsicharia_manipulacao_cartaz} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Ausência de caixas de madeira ou papelão na área de manipulação." name="verificacao_supermercados.supermercado_salsicharia_manipulacao_caixas" value={formData.verificacao_supermercados.supermercado_salsicharia_manipulacao_caixas} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Não são utilizadas escovas de metal, lã de aço ou outros materiais abrasivos na limpeza de equipamentos e utensílios." name="verificacao_supermercados.supermercado_salsicharia_manipulacao_escovas" value={formData.verificacao_supermercados.supermercado_salsicharia_manipulacao_escovas} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Não são utilizados panos convencionais (panos de prato) para secagem das mãos e utensílios." name="verificacao_supermercados.supermercado_salsicharia_manipulacao_panos" value={formData.verificacao_supermercados.supermercado_salsicharia_manipulacao_panos} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="A manipulação dos produtos perecíveis, quando realizada em temperatura ambiente, respeita o prazo máximo de 30 minutos ou de 2 horas em área climatizada entre 12ºC e 18ºC." name="verificacao_supermercados.supermercado_salsicharia_manipulacao_temperatura" value={formData.verificacao_supermercados.supermercado_salsicharia_manipulacao_temperatura} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os utensílios utilizados estão conservados, sem pontos escuros e/ou amassamentos e higienizados antes e após cada uso." name="verificacao_supermercados.supermercado_salsicharia_manipulacao_utensilios" value={formData.verificacao_supermercados.supermercado_salsicharia_manipulacao_utensilios} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="A periodicidade e os procedimentos de higienização estão adequados." name="verificacao_supermercados.supermercado_salsicharia_manipulacao_periodicidade_higienizacao" value={formData.verificacao_supermercados.supermercado_salsicharia_manipulacao_periodicidade_higienizacao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os equipamentos são revestidos de material sanitário atóxico, bem conservados, limpos e desinfetados e, se necessário, com dispositivo de proteção e segurança." name="verificacao_supermercados.supermercado_salsicharia_manipulacao_equipamentos" value={formData.verificacao_supermercados.supermercado_salsicharia_manipulacao_equipamentos} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_salsicharia_manipulacao_obs" value={formData.verificacao_supermercados.supermercado_salsicharia_manipulacao_obs} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>
                        <ContainerForm title="Área de Exposição para a venda">
                            <Row>
                                <CampoSelect label="Os alimentos expostos à venda estão adequadamente protegidos contra poeira, insetos, e outras pragas urbanas, distantes de saneantes, cosméticos, produtos de higiene e demais produtos tóxicos." name="verificacao_supermercados.supermercado_salsicharia_exposicao_protecao" value={formData.verificacao_supermercados.supermercado_salsicharia_exposicao_protecao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os produtos com prazo de validade vencidos são diariamente retirados da área de venda e descartados ou separados e identificados para troca." name="verificacao_supermercados.supermercado_salsicharia_exposicao_validade" value={formData.verificacao_supermercados.supermercado_salsicharia_exposicao_validade} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os produtos preparados ou fracionados e embalados na presença do consumidor têm as seguintes informações: nome do produto, marca, quantidade, ingredientes, preço, validade." name="verificacao_supermercados.supermercado_salsicharia_exposicao_separacao" value={formData.verificacao_supermercados.supermercado_salsicharia_exposicao_separacao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_salsicharia_exposicao_obs" value={formData.verificacao_supermercados.supermercado_salsicharia_exposicao_obs} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>
                    </ContainerForm>
                    <ContainerForm title="Rotisserie/Refeitório/Área de Fracionamento de Frutas/Verduras/Legumes/Lanchonete/Quiosques/Padaria">
                        <ContainerForm>
                            <Row>
                                <CampoTexto label="Rotisserie" name="verificacao_supermercados.supermercado_rotisserie_itens." value={formData.verificacao_supermercados.supermercado_rotisserie_itens.rotisserie} tipo="text" className="col-md-3" onChange={handleChange} />
                                <CampoTexto label="Refeitório" name="verificacao_supermercados.supermercado_rotisserie_itens.refeitorio" value={formData.verificacao_supermercados.supermercado_rotisserie_itens.refeitorio} tipo="text" className="col-md-3" onChange={handleChange} />
                                <CampoTexto label="Área de Fracionamento de FLV" name="verificacao_supermercados.supermercado_rotisserie_itens.flv" value={formData.verificacao_supermercados.supermercado_rotisserie_itens.flv} tipo="text" className="col-md-3" onChange={handleChange} />
                                <CampoTexto label="Lanchonete/Quiosques" name="verificacao_supermercados.supermercado_rotisserie_itens.lanchonete" value={formData.verificacao_supermercados.supermercado_rotisserie_itens.lanchonete} tipo="text" className="col-md-3" onChange={handleChange} />
                                <CampoTexto label="Padaria" name="verificacao_supermercados.supermercado_rotisserie_itens.padaria" value={formData.verificacao_supermercados.supermercado_rotisserie_itens.padaria} tipo="text" className="col-md-3" onChange={handleChange} />
                            </Row>
                        </ContainerForm>
                        <ContainerForm title="Armazenamento">
                            <Row>
                                <CampoSelect label="Alimentos são armazenados de forma organizada, em local limpo, livre de pragas, separados por categorias, longe do piso, sobre estrados fixos ou móveis, distantes das paredes, entre pilhas e do forro." name="verificacao_supermercados.supermercado_rotisserie_armazenamento_local" value={formData.verificacao_supermercados.supermercado_rotisserie_armazenamento_local} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="As embalagens estão íntegras e com identificação ou rótulo visível." name="verificacao_supermercados.supermercado_rotisserie_armazenamento_embalagens" value={formData.verificacao_supermercados.supermercado_rotisserie_armazenamento_embalagens} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os produtos de limpeza ou material químico são armazenados em local separado dos alimentos." name="verificacao_supermercados.supermercado_rotisserie_armazenamento_separacao" value={formData.verificacao_supermercados.supermercado_rotisserie_armazenamento_separacao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os produtos perecíveis estão armazenados em equipamento refrigerado. Temperaturas máximas: carnes: + 4°C; pescados: + 2°C; hortifruti e outros: +10°C; congelados: - 18° C ou na temperatura recomendada pelo fabricante." name="verificacao_supermercados.supermercado_rotisserie_armazenamento_temperatura" value={formData.verificacao_supermercados.supermercado_rotisserie_armazenamento_temperatura} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="A geladeira e o freezer estão instalados longe de fontes de calor como forno, fogão ou outros." name="verificacao_supermercados.supermercado_rotisserie_armazenamento_local_freezer" value={formData.verificacao_supermercados.supermercado_rotisserie_armazenamento_local_freezer} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="A espessura do gelo não ultrapassa 1 cm." name="verificacao_supermercados.supermercado_rotisserie_armazenamento_gelo" value={formData.verificacao_supermercados.supermercado_rotisserie_armazenamento_gelo} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="A geladeira e o freezer estão limpos e organizados, os produtos são separados conforme as categorias." name="verificacao_supermercados.supermercado_rotisserie_armazenamento_limpeza_freezer" value={formData.verificacao_supermercados.supermercado_rotisserie_armazenamento_limpeza_freezer} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="O freezer está regulado para manter os alimentos congelados a temperatura de –18°C ou na temperatura recomendada pelo fabricante." name="verificacao_supermercados.supermercado_rotisserie_armazenamento_temperatura_freezer" value={formData.verificacao_supermercados.supermercado_rotisserie_armazenamento_temperatura_freezer} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_rotisserie_armazenamento_obs" value={formData.verificacao_supermercados.supermercado_rotisserie_armazenamento_obs} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>
                        <ContainerForm title="Manipulação">
                            <Row>
                                <CampoSelect label="O local de manipulação possui pia exclusiva para lavagem das mãos, dotado de sabonete líquido anti-séptico, papel toalha não reciclado." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_pia" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_pia} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Existem cartazes orientando a lavagem e desinfecção das mãos." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_cartaz" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_cartaz} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="A manipulação ocorre sem cruzamento de atividades. A área destinada à seleção, limpeza e lavagem (área suja) é isolada da área de preparo final (área limpa), por barreira física ou técnica." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_isolamento" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_isolamento} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="As áreas de panificação e confeitaria são separadas por barreira física e/ou técnica." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_separacao" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_separacao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="As luvas térmicas estão conservadas e limpas." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_luvas" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_luvas} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="A manipulação dos produtos perecíveis, quando realizada em temperatura ambiente, respeita o prazo máximo de 30 minutos ou de 2 horas em área climatizada entre 12°C e 18°C." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_temperatura" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_temperatura} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os alimentos submetidos à cocção atingem, no mínimo 70ºC no seu centro geométrico." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_coccao" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_coccao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="O descongelamento é efetuado em condições de temperatura inferior a 5°C ou em forno de microondas, quando o alimento for submetido imediatamente a cocção." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_descongelamento" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_descongelamento} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os alimentos que foram descongelados não são recongelados." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_recongelamento" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_recongelamento} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="O óleo de fritura não apresenta alteração de cor, odor ou presença de espuma. Encontra-se adequadamente armazenado. Quando aquecido encontra-se na faixa de 160°C a 180°C, com tolerância até 190°C." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_oleo" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_oleo} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Resíduos de óleo de fritura acondicionados em recipientes rígidos, fechados, fora da área de produção e comercializados por empresas especializadas no reprocessamento destes resíduos." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_oleo_residuos" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_oleo_residuos} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="As frutas, os legumes e as verduras utilizados são higienizados com procedimentos validados e com produtos registrados no Ministério da Saúde." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_frutas" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_frutas} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="As embalagens dos ingredientes utilizados nas preparações são adequadamente fechadas após o uso, armazenadas e identificadas." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_embalagens" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_embalagens} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Uso de ovos pasteurizados, desidratados ou cozidos em preparações como mousses, cremes ou maioneses que necessitem de ovos." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_ovos" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_ovos} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Produtos vencidos não são utilizados/vendidos. São descartados ou são separados e identificados para troca." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_separacao" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_separacao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Não são utilizados panos convencionais, como panos de prato, para secagem das mãos e utensílios." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_panos" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_panos} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os equipamentos são revestidos de material sanitário atóxico, bem conservados, limpos e desinfetados e, se necessário, com dispositivo de proteção e segurança." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_equipamentos" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_equipamentos} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os utensílios utilizados são limpos e desinfetados a cada uso." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_utensilios" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_utensilios} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os utensílios utilizados estão conservados, sem pontos escuros e/ou amassamentos." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_utensilios_conservacao" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_utensilios_conservacao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Não são utilizadas escovas de metal, lã de aço ou outros materiais abrasivos na limpeza de equipamentos e utensílios." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_escovas" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_escovas} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Ausência de caixas de madeira ou papelão na área de manipulação." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_caixas" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_caixas} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os uniformes e panos de limpeza são lavados fora da área de produção." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_panos" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_panos} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="As preparações consumidas quentes, expostas ao consumo em distribuição ou espera, permanecem sob controle de tempo e temperatura mínima de 60ºC por 6 horas ou abaixo de 60ºC por 1 hora no máximo. Alimentos que não observarem critérios de tempo/temperatura são desprezados." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_comidas_quentes" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_comidas_quentes} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Alimentos frios, que dependam somente da temperatura para sua conservação permanecem no máximo a 10°C por 4 horas ou entre 10°C e 21°C por 2 horas no máximo. Alimentos que não observarem critérios de tempo/temperatura são desprezados." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_comidas_frias" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_comidas_frias} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os produtos com prazo de validade vencidos são diariamente retirados da área de venda e descartados ou separados e identificados para troca." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_validade" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_validade} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os produtos preparados ou fracionados e embalados na presença do consumidor têm as seguintes informações: nome do produto, marca, quantidade, ingredientes, preço, validade." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_embalagens_info" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_embalagens_info} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="O balcão térmico está limpo, com água potável, trocada diariamente, mantida à temperatura de 80 a 90º C." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_balcao" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_balcao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Guarda de amostra por 96 horas das preparações confeccionadas." name="verificacao_supermercados.supermercado_rotisserie_manipulacao_amostra" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_amostra} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_rotisserie_manipulacao_obs" value={formData.verificacao_supermercados.supermercado_rotisserie_manipulacao_obs} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>
                        <ContainerForm title="Ilhas/Balcões">
                            <Row>
                                <CampoSelect label="Equipamentos de refrigeração/congelamento de acordo com as necessidades e tipos de alimentos produzidos/armazenados." name="verificacao_supermercados.supermercado_rotisserie_ilhas_equipamentos" value={formData.verificacao_supermercados.supermercado_rotisserie_ilhas_equipamentos} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="O freezer está regulado para manter os alimentos congelados a temperatura de –18°C ou na temperatura recomendada pelo fabricante." name="verificacao_supermercados.supermercado_rotisserie_ilhas_freezer" value={formData.verificacao_supermercados.supermercado_rotisserie_ilhas_freezer} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Os produtos são separados conforme as categorias e estocados sempre abaixo das linhas de carga." name="verificacao_supermercados.supermercado_rotisserie_ilhas_separacao" value={formData.verificacao_supermercados.supermercado_rotisserie_ilhas_separacao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Embalagens íntegras, de identificação visível e com dados necessários para garantir a rastreabilidade e a validade dos produtos." name="verificacao_supermercados.supermercado_rotisserie_ilhas_embalagens" value={formData.verificacao_supermercados.supermercado_rotisserie_ilhas_embalagens} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Presença de termômetro no equipamento, visível e em adequado estado de funcionamento garantindo que os alimentos perecíveis expostos a venda estejam conservados em temperaturas adequadas." name="verificacao_supermercados.supermercado_rotisserie_ilhas_termometro" value={formData.verificacao_supermercados.supermercado_rotisserie_ilhas_termometro} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_rotisserie_ilhas_obs" value={formData.verificacao_supermercados.supermercado_rotisserie_ilhas_obs} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>
                    </ContainerForm>

                    <ContainerForm title="Instalações e Edificações">
                        <ContainerForm>
                            <Row>
                                <CampoSelect label="Depósito" name="verificacao_supermercados.supermercado_instalacoes_itens.deposito" value={formData.verificacao_supermercados.supermercado_instalacoes_itens.deposito} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Açougue" name="verificacao_supermercados.supermercado_instalacoes_itens.acougue" value={formData.verificacao_supermercados.supermercado_instalacoes_itens.acougue} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Peixaria" name="verificacao_supermercados.supermercado_instalacoes_itens.peixaria" value={formData.verificacao_supermercados.supermercado_instalacoes_itens.peixaria} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Salsicharia/Fiambreria" name="verificacao_supermercados.supermercado_instalacoes_itens.salsicharia" value={formData.verificacao_supermercados.supermercado_instalacoes_itens.salsicharia} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Rotisserie" name="verificacao_supermercados.supermercado_instalacoes_itens.rotisserie" value={formData.verificacao_supermercados.supermercado_instalacoes_itens.rotisserie} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Padaria" name="verificacao_supermercados.supermercado_instalacoes_itens.padaria" value={formData.verificacao_supermercados.supermercado_instalacoes_itens.padaria} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Área de Fracionamento FLV" name="verificacao_supermercados.supermercado_instalacoes_itens.flv" value={formData.verificacao_supermercados.supermercado_instalacoes_itens.flv} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Lanchonete/Quiosques" name="verificacao_supermercados.supermercado_instalacoes_itens.lanchonete" value={formData.verificacao_supermercados.supermercado_instalacoes_itens.lanchonete} options={simNao} className="col-md-3" onChange={handleChange} />
                                <CampoSelect label="Refeitório" name="verificacao_supermercados.supermercado_instalacoes_itens.refeitorio" value={formData.verificacao_supermercados.supermercado_instalacoes_itens.refeitorio} options={simNao} className="col-md-3" onChange={handleChange} />
                            </Row>
                        </ContainerForm>

                        <ContainerForm title="Estado">
                            <Row>
                                <CampoSelect label="Piso, parede e teto construído com material liso, resistente, impermeável e lavável. Conservados, livres de rachaduras, trincas, goteiras, bolores e descascamentos." name="verificacao_supermercados.supermercado_instalacoes_conservacao" value={formData.verificacao_supermercados.supermercado_instalacoes_conservacao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Iluminação suficiente. Luminárias protegidas contra queda acidentais e explosão, em adequado estado de conservação e higiene." name="verificacao_supermercados.supermercado_instalacoes_iluminacao" value={formData.verificacao_supermercados.supermercado_instalacoes_iluminacao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Instalações elétricas embutidas ou protegidas em tubulações externas e íntegras de tal forma a permitir a higienização dos ambientes." name="verificacao_supermercados.supermercado_instalacoes_instalacoes" value={formData.verificacao_supermercados.supermercado_instalacoes_instalacoes} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Ventilação adequada. Janelas com telas milimétricas (2mm) sem falhas de revestimento e ajustadas aos batentes. As janelas estão protegidas de modo a não permitirem que os raios solares incidam diretamente sobre os alimentos ou equipamentos mais sensíveis ao calor." name="verificacao_supermercados.supermercado_instalacoes_ventilacao" value={formData.verificacao_supermercados.supermercado_instalacoes_ventilacao} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoSelect label="Portas com superfície lisa, cores claras, de fácil limpeza, ajustadas aos batentes, de material não absorvente, com fechamento automático e protetor no rodapé. Entradas principais e acesso às câmaras possuem mecanismos contra insetos e roedores." name="verificacao_supermercados.supermercado_instalacoes_portas" value={formData.verificacao_supermercados.supermercado_instalacoes_portas} options={simNao} className="col-md-12" onChange={handleChange} />
                            </Row>
                            <Row>
                                <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_instalacoes_obs" value={formData.verificacao_supermercados.supermercado_instalacoes_obs} className="col-md-12" onChange={handleChange} />
                            </Row>
                        </ContainerForm>
                    </ContainerForm>

                    <ContainerForm title="Manipuladores">
                        <Row>
                            <CampoSelect label="Os manipuladores são treinados pelo responsável técnico." name="verificacao_supermercados.supermercado_manipuladores_treinamento" value={formData.verificacao_supermercados.supermercado_manipuladores_treinamento} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os funcionários responsáveis pela manipulação apresentam-se asseados, sem adornos, unhas curtas, limpas e sem esmalte; não utilizam maquiagem e piercing." name="verificacao_supermercados.supermercado_manipuladores_higiene" value={formData.verificacao_supermercados.supermercado_manipuladores_higiene} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="As mãos estão limpas, sem cortes ou lesões abertas e caso existentes estão protegidas com cobertura à prova de água como luvas de borracha." name="verificacao_supermercados.supermercado_manipuladores_estado_saude" value={formData.verificacao_supermercados.supermercado_manipuladores_estado_saude} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os funcionários usam uniformes fechados, de cor clara, limpos e bem conservados." name="verificacao_supermercados.supermercado_manipuladores_uniformes" value={formData.verificacao_supermercados.supermercado_manipuladores_uniformes} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Usam sapatos, limpos, fechados antiderrapantes ou botas de borracha para limpeza e higienização do ambiente." name="verificacao_supermercados.supermercado_manipuladores_sapatos" value={formData.verificacao_supermercados.supermercado_manipuladores_sapatos} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os cabelos estão protegidos por toucas ou redes." name="verificacao_supermercados.supermercado_manipuladores_cabelos" value={formData.verificacao_supermercados.supermercado_manipuladores_cabelos} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="A barba está feita, o bigode aparado." name="verificacao_supermercados.supermercado_manipuladores_barba" value={formData.verificacao_supermercados.supermercado_manipuladores_barba} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Empregados que trabalham no interior de câmaras frias usam vestimentas adequadas." name="verificacao_supermercados.supermercado_manipuladores_vestimenta_camara_fria" value={formData.verificacao_supermercados.supermercado_manipuladores_vestimenta_camara_fria} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Funcionários usam EPIs (uniforme, avental, botas, luvas, capas)." name="verificacao_supermercados.supermercado_manipuladores_epi" value={formData.verificacao_supermercados.supermercado_manipuladores_epi} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_manipuladores_obs" value={formData.verificacao_supermercados.supermercado_manipuladores_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Sanitário e vestiários masculino e feminino">
                        <Row>
                            <CampoSelect label="Instalações sanitárias sem comunicação direta com áreas destinadas ao processo de produção/manipulação/armazenamento de alimentos." name="verificacao_supermercados.supermercado_sanitario_contato" value={formData.verificacao_supermercados.supermercado_sanitario_contato} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Apresentam piso, paredes e teto de material liso, resistente e impermeável, ventilação adequada, telas milimétricas nas aberturas, porta com mola e proteção no rodapé em bom estado de conservação e higiene." name="verificacao_supermercados.supermercado_sanitario_piso" value={formData.verificacao_supermercados.supermercado_sanitario_piso} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os vasos sanitários possuem assento com tampa." name="verificacao_supermercados.supermercado_sanitario_vasos" value={formData.verificacao_supermercados.supermercado_sanitario_vasos} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O descarte do papel higiênico é feito em lixeira com pedal e tampa, quando destinado a mulheres, ou diretamente no vaso sanitário quando ligado diretamente a rede de esgoto." name="verificacao_supermercados.supermercado_sanitario_descarte" value={formData.verificacao_supermercados.supermercado_sanitario_descarte} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Possuem pia, sabão líquido anti-séptico e toalha de papel não reciclado para a higienização das mãos ou qualquer outro método de secagem que não permita a recontaminação das mãos." name="verificacao_supermercados.supermercado_sanitario_pia" value={formData.verificacao_supermercados.supermercado_sanitario_pia} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os vestiários possuem armários em número suficiente e em bom estado de conservação e 01 chuveiro para cada 20 funcionários." name="verificacao_supermercados.supermercado_sanitario_armarios" value={formData.verificacao_supermercados.supermercado_sanitario_armarios} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_sanitario_obs" value={formData.verificacao_supermercados.supermercado_sanitario_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>
                    <ContainerForm title="Água">
                        <Row>
                            <CampoSelect label="A água utilizada é de abastecimento público." name="verificacao_supermercados.supermercado_agua_abastecimento" value={formData.verificacao_supermercados.supermercado_agua_abastecimento} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O estabelecimento possui reservatório com superfície lisa, sem rachaduras e com tampas integras." name="verificacao_supermercados.supermercado_agua_reservatorio" value={formData.verificacao_supermercados.supermercado_agua_reservatorio} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="São lavados e desinfetados, no mínimo, de 6 em 6 meses, e nas seguintes situações: quando for instalado e na ocorrência de acidentes que possam contaminar a água." name="verificacao_supermercados.supermercado_agua_periodicidade_higienizacao" value={formData.verificacao_supermercados.supermercado_agua_periodicidade_higienizacao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O estabelecimento utiliza fonte alternativa de água (poço, mina ou de caminhão pipa)." name="verificacao_supermercados.supermercado_agua_fonte_alternativa" value={formData.verificacao_supermercados.supermercado_agua_fonte_alternativa} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Possui licença de outorga de uso para exploração da água de poço." name="verificacao_supermercados.supermercado_agua_licenca_poco" value={formData.verificacao_supermercados.supermercado_agua_licenca_poco} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Água proveniente de fonte alternativa é tratada e possui laudo de análise laboratorial." name="verificacao_supermercados.supermercado_agua_tratamento_alternativa" value={formData.verificacao_supermercados.supermercado_agua_tratamento_alternativa} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Apresenta cópia da análise de cloro residual livre de cada carga de água transportada pelo caminhão pipa, bem como cópia da nota fiscal." name="verificacao_supermercados.supermercado_agua_analise_cloro" value={formData.verificacao_supermercados.supermercado_agua_analise_cloro} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O gelo é proveniente de água potável, de acordo com padrão de Qualidade e Identidade vigente quando produzido no próprio local. Quando industrializado é embalado e devidamente rotulado." name="verificacao_supermercados.supermercado_agua_gelo" value={formData.verificacao_supermercados.supermercado_agua_gelo} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_agua_obs" value={formData.verificacao_supermercados.supermercado_agua_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>
                    <ContainerForm title="Controle integrado de Pragas e Vetores">
                        <Row>
                            <CampoSelect label="As janelas, portas e aberturas são protegidas com telas milimétricas: 2mm." name="verificacao_supermercados.supermercado_pragas_telas" value={formData.verificacao_supermercados.supermercado_pragas_telas} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os ralos e grelhas são sifonados, dotados de dispositivos que impeçam a entrada de pragas e vetores." name="verificacao_supermercados.supermercado_pragas_ralos" value={formData.verificacao_supermercados.supermercado_pragas_ralos} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="As portas são ajustadas aos batentes, apresentam proteção na parte inferior contra entrada de insetos e roedores e possuem mola." name="verificacao_supermercados.supermercado_pragas_portas" value={formData.verificacao_supermercados.supermercado_pragas_portas} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Ausência de vetores e pragas urbanas e/ou indícios." name="verificacao_supermercados.supermercado_pragas_vetores" value={formData.verificacao_supermercados.supermercado_pragas_vetores} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="A aplicação do desinfestante é realizada por empresa credenciada nos órgãos de vigilância sanitária." name="verificacao_supermercados.supermercado_pragas_desinfetante" value={formData.verificacao_supermercados.supermercado_pragas_desinfetante} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_pragas_obs" value={formData.verificacao_supermercados.supermercado_pragas_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Sanitários destinados ao público masculino e feminino">
                        <Row>
                            <CampoSelect label="Apresentam piso, paredes e teto de material liso, resistente e impermeável, ventilação adequada, telas milimétricas nas aberturas, porta com mola e proteção no rodapé, em bom estado de conservação e higiene." name="verificacao_supermercados.supermercado_sanitario_publico_conservacao" value={formData.verificacao_supermercados.supermercado_sanitario_publico_conservacao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Possuem pia, sabão líquido e toalha de papel ou outro método para secagem de mãos." name="verificacao_supermercados.supermercado_sanitario_publico_pia" value={formData.verificacao_supermercados.supermercado_sanitario_publico_pia} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Possuem cestos de lixo com pedal e tampa para o descarte de papéis servidos, quando não ligados diretamente à rede de esgoto ou quando destinado a mulheres." name="verificacao_supermercados.supermercado_sanitario_publico_cestos" value={formData.verificacao_supermercados.supermercado_sanitario_publico_cestos} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_sanitario_publico_obs" value={formData.verificacao_supermercados.supermercado_sanitario_publico_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Documentação">
                        <Row>
                            <CampoSelect label="A responsabilidade técnica é exercida por profissional legalmente habilitado." name="verificacao_supermercados.supermercado_documentacao_responsavel_tecnico" value={formData.verificacao_supermercados.supermercado_documentacao_responsavel_tecnico} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Possui e cumpre o Manual de Boas Práticas específico para empresa." name="verificacao_supermercados.supermercado_documentacao_manual_boas_praticas" value={formData.verificacao_supermercados.supermercado_documentacao_manual_boas_praticas} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Possui e cumpre os procedimentos operacionais padronizados." name="verificacao_supermercados.supermercado_documentacao_procedimentos" value={formData.verificacao_supermercados.supermercado_documentacao_procedimentos} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Comprovante de Execução de Treinamento de Funcionários." name="verificacao_supermercados.supermercado_documentacao_treinamento_funcionarios" value={formData.verificacao_supermercados.supermercado_documentacao_treinamento_funcionarios} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Programa de Saúde: PPRA, PCMSO, ASO." name="verificacao_supermercados.supermercado_documentacao_programa_saude" value={formData.verificacao_supermercados.supermercado_documentacao_programa_saude} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Comprovante de Execução de Higienização do Reservatório de Água realizado semestralmente." name="verificacao_supermercados.supermercado_documentacao_comprovante_higienizacao_agua" value={formData.verificacao_supermercados.supermercado_documentacao_comprovante_higienizacao_agua} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Licença de outorga de uso de fonte alternativa para abastecimento de água concedida pelo DAEE." name="verificacao_supermercados.supermercado_documentacao_licenca_fonte_alternativa" value={formData.verificacao_supermercados.supermercado_documentacao_licenca_fonte_alternativa} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Laudo de Análise de Potabilidade de Água proveniente de fonte alternativa." name="verificacao_supermercados.supermercado_documentacao_laudo_agua" value={formData.verificacao_supermercados.supermercado_documentacao_laudo_agua} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Cópia de análise de cloro residual livre de cada carga de água transportada pelo caminhão pipa, bem como cópia da nota fiscal da empresa fornecedora ou transportadora de água." name="verificacao_supermercados.supermercado_documentacao_analise_cloro" value={formData.verificacao_supermercados.supermercado_documentacao_analise_cloro} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Comprovante de Execução de Controle Integrado de Vetores e Pragas Urbanas." name="verificacao_supermercados.supermercado_documentacao_execucao_vetores" value={formData.verificacao_supermercados.supermercado_documentacao_execucao_vetores} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Apresentação de proposta da empresa contratada, contemplando as medidas preventivas a serem adotadas pelo contratante, com relatório técnico da visita." name="verificacao_supermercados.supermercado_documentacao_proposta_empresa" value={formData.verificacao_supermercados.supermercado_documentacao_proposta_empresa} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Apresentação do certificado de execução do serviço, informando os produtos utilizados, métodos, registro do MS, indicações para uso médico e responsável técnico." name="verificacao_supermercados.supermercado_documentacao_certificado_execucao" value={formData.verificacao_supermercados.supermercado_documentacao_certificado_execucao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Planilhas de controle de temperatura de câmaras, balcões, congeladores e equipamento térmicos." name="verificacao_supermercados.supermercado_documentacao_planilhas_controle_temperatura" value={formData.verificacao_supermercados.supermercado_documentacao_planilhas_controle_temperatura} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Registros ou comprovante de execução comprovando a calibração dos instrumentos e equipamentos de medição." name="verificacao_supermercados.supermercado_documentacao_calibracao_medicao" value={formData.verificacao_supermercados.supermercado_documentacao_calibracao_medicao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Registros que comprovem a manutenção preventiva de equipamentos e maquinários." name="verificacao_supermercados.supermercado_documentacao_manutencao_equipamentos" value={formData.verificacao_supermercados.supermercado_documentacao_manutencao_equipamentos} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Produtos utilizados para higienização de alimentos, de equipamentos e utensílios e anti-sépticos estão regularizados no Ministério da Saúde." name="verificacao_supermercados.supermercado_documentacao_produtos_higiene" value={formData.verificacao_supermercados.supermercado_documentacao_produtos_higiene} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Presença de aparelho desfibrilador externo automático em locais com concentração/circulação média acima de 1500 pessoas. Lei 13945 de 07/01/2005." name="verificacao_supermercados.supermercado_documentacao_desfibrilador" value={formData.verificacao_supermercados.supermercado_documentacao_desfibrilador} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Capacitação no Curso “Suporte Básico da Vida” ministrado por entidades credenciadas pelo Conselho Nacional de Ressucitação. Lei 13945 de 07/01/2005." name="verificacao_supermercados.supermercado_documentacao_capacitacao" value={formData.verificacao_supermercados.supermercado_documentacao_capacitacao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Presença de cartaz com os dizeres: “É PROIBIDA A VENDA DE BEBIDA ALCOÓLICA PARA MENORES DE 18 ANOS. LEGISLAÇÃO: ESTATUTO DA CRIANÇA E DO ADOLESCENTE, LEI FEDERAL 8069, DE 13/07/90.”" name="verificacao_supermercados.supermercado_documentacao_cartaz_bebidas" value={formData.verificacao_supermercados.supermercado_documentacao_cartaz_bebidas} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Não há promoção comercial para formulas infantis para lactentes e formulas infantis de seguimento para lactentes e para mamadeiras, bicos e chupetas." name="verificacao_supermercados.supermercado_documentacao_promocao_infantis" value={formData.verificacao_supermercados.supermercado_documentacao_promocao_infantis} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="A promoção comercial de fórmulas infantis de seguimento para crianças de primeira infância, leites fluidos, leites em pó, leites modificados e similares de origem vegetal consta os dizeres: “O Ministério da Saúde informa: O aleitamento materno evita infecções e alergias e é recomendados até os dois anos de idade ou mais.”" name="verificacao_supermercados.supermercado_documentacao_promocao_intantis_leite" value={formData.verificacao_supermercados.supermercado_documentacao_promocao_intantis_leite} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="A promoção comercial de alimentos de transição e alimentos à base de cereais indicados para lactentes ou crianças de primeira infância ou outros de mesma indicação consta os dizeres: “O Ministério da Saúde informa: Após os seis meses de idade continue amamentando seu filho e ofereça novos alimentos.”" name="verificacao_supermercados.supermercado_documentacao_promocao_transicao" value={formData.verificacao_supermercados.supermercado_documentacao_promocao_transicao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_supermercados.supermercado_documentacao_obs" value={formData.verificacao_supermercados.supermercado_documentacao_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>


                </ContainerForm>

            }
            {!loading && roteiroSelecionado === 3 &&

                <ContainerForm title="Inspeção - Escolas">
                    <ContainerForm title="Horário de Funcionamento">
                        <Row>
                            <CampoSelect label="Manhã" name="verificacao_escolas.horario_funcionamento.manha" value={formData.verificacao_escolas.horario_funcionamento.manha} options={simNao} className="col-md-3" onChange={handleChange} />
                            <CampoSelect label="Tarde" name="verificacao_escolas.horario_funcionamento.tarde" value={formData.verificacao_escolas.horario_funcionamento.tarde} options={simNao} className="col-md-3" onChange={handleChange} />
                            <CampoSelect label="Noite" name="verificacao_escolas.horario_funcionamento.noite" value={formData.verificacao_escolas.horario_funcionamento.noite} options={simNao} className="col-md-3" onChange={handleChange} />
                        </Row>
                    </ContainerForm>
                    <ContainerForm title="Natureza">
                        <Row>
                            <CampoSelect label="Natureza da Escola" name="verificacao_escolas.natureza_escola" value={formData.verificacao_escolas.natureza_escola} options={naturezaEscola} className="col-md-3" onChange={handleChange} />
                        </Row>
                    </ContainerForm>
                    <ContainerForm title="Modalidade de Ensino">
                        <Row>
                            <CampoSelect label="Infantil" name="verificacao_escolas.modalidade_ensino.infantil" value={formData.verificacao_escolas.modalidade_ensino.infantil} options={simNao} className="col-md-3" onChange={handleChange} />

                            <CampoSelect label="CMEI" name="verificacao_escolas.modalidade_ensino.cmei" value={formData.verificacao_escolas.modalidade_ensino.cmei} options={simNao} className="col-md-3" onChange={handleChange} />

                            <CampoSelect label="Fundamental I" name="verificacao_escolas.modalidade_ensino.fundamental1" value={formData.verificacao_escolas.modalidade_ensino.fundamental1} options={simNao} className="col-md-3" onChange={handleChange} />

                            <CampoSelect label="Fundamental II" name="verificacao_escolas.modalidade_ensino.fundamental2" value={formData.verificacao_escolas.modalidade_ensino.fundamental2} options={simNao} className="col-md-3" onChange={handleChange} />

                            <CampoSelect label="EJA" name="verificacao_escolas.modalidade_ensino.eja" value={formData.verificacao_escolas.modalidade_ensino.eja} options={simNao} className="col-md-3" onChange={handleChange} />

                            <CampoSelect label="Creche" name="verificacao_escolas.modalidade_ensino.creche" value={formData.verificacao_escolas.modalidade_ensino.creche} options={simNao} className="col-md-3" onChange={handleChange} />

                            <CampoSelect label="Outra" name="verificacao_escolas.modalidade_ensino.outras" value={formData.verificacao_escolas.modalidade_ensino.outras} options={simNao} className="col-md-3" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Informações Gerais">
                        <Row>
                            <CampoTexto label="Quantidade de alunos matriculados." name="verificacao_escolas.quantidade_alunos" value={formData.verificacao_escolas.quantidade_alunos} tipo="text" className="col-md-4" onChange={handleChange} />
                            <CampoTexto label="Quantidade de funcionários." name="verificacao_escolas.quantidade_funcionarios" value={formData.verificacao_escolas.quantidade_funcionarios} tipo="text" className="col-md-4" onChange={handleChange} />
                            <CampoTexto label="Dependências." name="verificacao_escolas.dependencias" value={formData.verificacao_escolas.dependencias} tipo="text" className="col-md-4" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Edificações, instalações, equipamentos, móveis e utensílios">
                        <Row>
                            <CampoSelect label="Área externa livre de focos de insalubridade, ausência de lixo e objetos em desuso, livre de focos de vetores e pragas urbanas e animais domésticos?" name="verificacao_escolas.area_externa" value={formData.verificacao_escolas.area_externa} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Áreas de circulação como rampas ou escadas, com corrimão ou guarda corpo?" name="verificacao_escolas.area_circulacao" value={formData.verificacao_escolas.area_circulacao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O piso é constituído de material antiderrapante, resistente, impermeável, lavável, íntegro, sem trincas, vazamentos e infiltrações. Os ralos são sifonados com dispositivos que permitem o seu fechamento?" name="verificacao_escolas.piso" value={formData.verificacao_escolas.piso} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="As paredes e divisórias, assim como os tetos são sólidos, sem vazamentos, umidade, bolores, infiltrações, trincas, rachaduras, descascamento, goteiras, entre outros?" name="verificacao_escolas.paredes" value={formData.verificacao_escolas.paredes} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="A iluminação é adequada e as tomadas oferecem segurança?" name="verificacao_escolas.iluminacao" value={formData.verificacao_escolas.iluminacao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="A ventilação da edificação garante conforto térmico, renovação do ar e o ambiente livre de fungos, e ou poluentes?" name="verificacao_escolas.ventilacao" value={formData.verificacao_escolas.ventilacao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O sistema de ventilação e/ ou climatização apresenta-se em boas condições de higienização. (Manutenção periódica / troca de filtros)?" name="verificacao_escolas.ventilacao_higienizacao" value={formData.verificacao_escolas.ventilacao_higienizacao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="As instalações, equipamentos, móveis e utensílios são mantidos em condições higiênico sanitárias apropriadas, através de frequência adequada de higienização, obedecendo as instruções do rótulo quanto a diluição, tempo de contato e modo de aplicação dos produtos saneantes?" name="verificacao_escolas.equipamentos_moveis" value={formData.verificacao_escolas.equipamentos_moveis} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Possui equipamentos de proteção contra incêndio, dentro do prazo de validade?" name="verificacao_escolas.protecao_incendios" value={formData.verificacao_escolas.protecao_incendios} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Setor de manutenção com arranjo físico adequado, com melhor aproveitamento do espaço?" name="verificacao_escolas.manutencao" value={formData.verificacao_escolas.manutencao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_escolas.area_externa_obs" value={formData.verificacao_escolas.area_externa_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Cantinas, Cozinhas e Refeitórios">
                        <Row>
                            <CampoSelect label="Existem critérios para avaliação e seleção de fornecedores de Matérias-primas, ingredientes, embalagens e alimentos prontos. Os mesmos são submetidos à inspeção e avaliação na recepção?" name="verificacao_escolas.alimentacao_selecao" value={formData.verificacao_escolas.alimentacao_selecao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="As matérias primas, os ingredientes, embalagens e alimentos prontos ou fracionados estão armazenados em local adequado, (sobre palhetes, e ou prateleiras equipamentos de refrigeração/ congelamento) respeitando espaçamento para ventilação, higienização, prazos de validade, temperaturas e devidamente identificados?" name="verificacao_escolas.alimentacao_armazenamento" value={formData.verificacao_escolas.alimentacao_armazenamento} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Presença de lavatório na área de preparação, dotado de produtos destinados a higiene das mãos (sabonete líquido antisséptico e toalhas de papel e lixeira com acionamento por pedal)?" name="verificacao_escolas.alimentacao_lavatorio" value={formData.verificacao_escolas.alimentacao_lavatorio} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Descongelamento de alimentos conduzido de acordo com orientações do fabricante ou em temperatura de refrigeração (inferior a 5º C) e nunca recongelados?" name="verificacao_escolas.alimentacao_descongelamento" value={formData.verificacao_escolas.alimentacao_descongelamento} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O tratamento térmico garante que todas as partes do alimento atinjam a temperatura de, no mínimo 70º C, ou outra combinação de tempo temperatura que assegure a qualidade sanitária?" name="verificacao_escolas.alimentacao_tratamento_termico" value={formData.verificacao_escolas.alimentacao_tratamento_termico} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Alimentos consumidos crus, quando aplicável, submetidos a processo de higienização com produtos regularizados e aplicados de forma a evitar presença de resíduos?" name="verificacao_escolas.alimentacao_higienizacao_crus" value={formData.verificacao_escolas.alimentacao_higienizacao_crus} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Evita-se o contato direto ou indireto entre alimentos crus, semi-prontos e prontos para o consumo?" name="verificacao_escolas.alimentacao_contato_crus" value={formData.verificacao_escolas.alimentacao_contato_crus} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Alimentos servidos a quente são mantidos em temperatura acima de 60 Cº e os servidos frios em temperatura abaixo de 10 Cº ?" name="verificacao_escolas.alimentacao_temperatura" value={formData.verificacao_escolas.alimentacao_temperatura} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Local adequado, fora da área de trabalho, para as refeições dos empregados, com mesas e assentos em números suficientes e provido de equipamento para refrigeração e aquecimento para as refeições?" name="verificacao_escolas.alimentacao_local" value={formData.verificacao_escolas.alimentacao_local} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_escolas.alimentacao_obs" value={formData.verificacao_escolas.alimentacao_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Manipuladores/Empregados">
                        <Row>
                            <CampoSelect label="A saúde dos funcionários é comprovada por atestado de saúde ocupacional, de acordo com legislação específica?" name="verificacao_escolas.manipuladores_saude_atestado" value={formData.verificacao_escolas.manipuladores_saude_atestado} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="A saúde dos funcionários é comprovada por atestado de saúde ocupacional, de acordo com legislação específica?" name="verificacao_escolas.manipuladores_saude_empregados" value={formData.verificacao_escolas.manipuladores_saude_empregados} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os funcionários apresentam-se com asseio pessoal, mãos limpas, unhas curtas, sem esmalte ou adornos e uniformes compatíveis à atividade, conservados e limpos e com equipamentos de proteção individual quando necessários?" name="verificacao_escolas.manipuladores_higiene" value={formData.verificacao_escolas.manipuladores_higiene} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os funcionários não fumam, falam desnecessariamente, cantam, assobiam, espirram, cospem, tossem, comem, manipulam dinheiro ou praticam outros atos que possam contaminar o alimento, durante o desempenho das atividades?" name="verificacao_escolas.manipuladores_costumes" value={formData.verificacao_escolas.manipuladores_costumes} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os funcionários utilizam mascara durante todo o expediente?" name="verificacao_escolas.manipuladores_mascara" value={formData.verificacao_escolas.manipuladores_mascara} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os funcionários são supervisionados e capacitados periodicamente em higiene pessoal, manipulação higiênica de alimentos. Existência de documentação e registros que comprovem a capacitação?" name="verificacao_escolas.manipuladores_supervisao" value={formData.verificacao_escolas.manipuladores_supervisao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Capacita os manipuladores de alimentos nos conteúdos previstos na RDC 216/2004?" name="verificacao_escolas.manipuladores_capacitacao" value={formData.verificacao_escolas.manipuladores_capacitacao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Possui registro atualizado da atividade de capacitação dos manipuladores?" name="verificacao_escolas.manipuladores_registro_capacitacao" value={formData.verificacao_escolas.manipuladores_registro_capacitacao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Realiza capacitação uma ou duas vezes por ano?" name="verificacao_escolas.manipuladores_capacitacao_periodica" value={formData.verificacao_escolas.manipuladores_capacitacao_periodica} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Apresenta responsável técnico habilitado para o fornecimento de Alimentos saudáveis no ambiente escolar?" name="verificacao_escolas.manipuladores_responsavel_habilitado" value={formData.verificacao_escolas.manipuladores_responsavel_habilitado} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="A escola deve definir estratégias, em conjunto com a comunidade Escolar, para favorecer escolhas  de alimentação saudáveis. Realiza atividades educativas com os funcionários e alunos sobre o tema?" name="verificacao_escolas.manipuladores_conscientizacao" value={formData.verificacao_escolas.manipuladores_conscientizacao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_escolas.manipuladores_obs" value={formData.verificacao_escolas.manipuladores_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Instalações Sanitárias">
                        <Row>
                            <CampoSelect label="Banheiros para alunos separados por sexo, com vasos sanitários e lavatórios íntegros, providos de material para higienização e secagem das mãos (material descartável), lixeira com tampa (sem contato manual) e Higienização adequada. (1 conjunto/ 40 alunos)?" name="verificacao_escolas.sanitarias_banheiros_alunos" value={formData.verificacao_escolas.sanitarias_banheiros_alunos} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Banheiros para funcionários/professores separados por sexo, com vasos sanitários e lavatórios íntegros, providos de material para higienização e secagem das mãos (material descartável), lixeira com tampa (sem contato manual) e armário para a guarda de pertences pessoais e higienização adequada?" name="verificacao_escolas.sanitarias_banheiros_funcionarios" value={formData.verificacao_escolas.sanitarias_banheiros_funcionarios} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Existência de banheiros separados por sexo, adaptados aos portadores de necessidades especiais, com vasos sanitários e lavatórios íntegros, providos de material para higienização e secagem das mãos (material descartável), lixeira com tampa (sem contato manual) e higienização adequada?" name="verificacao_escolas.sanitarias_banheiros_separados" value={formData.verificacao_escolas.sanitarias_banheiros_separados} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_escolas.sanitarias_obs" value={formData.verificacao_escolas.sanitarias_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Potabilidade de Água">
                        <Row>
                            <CampoSelect label="A água utilizada no abastecimento é potável e corrente, e quando utilizada solução alternativa de abastecimento, a potabilidade é atestada e controlada por análise laboratorial periódica, conforme a legislação em vigor PORTARIA GM/MS Nº 888, DE 4 DE MAIO DE 2021?" name="verificacao_escolas.agua_potavel" value={formData.verificacao_escolas.agua_potavel} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O reservatório de água está livre de rachaduras, vazamentos, infiltrações, descascamentos e outros defeitos, devidamente tampado e longe de fontes de contaminação?" name="verificacao_escolas.agua_reservatorio" value={formData.verificacao_escolas.agua_reservatorio} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="A	higienização	semestral	do (s) reservatório (s) encontra-se documentada, através de certificado de higienização emitido por empresa Licenciada ou procedimento operacional padronizado. (POP)?" name="verificacao_escolas.agua_higienizacao" value={formData.verificacao_escolas.agua_higienizacao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Há Planilha de higienização dos reservatorios e bebedouros?" name="verificacao_escolas.agua_planilha_higienizacao" value={formData.verificacao_escolas.agua_planilha_higienizacao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Bebedouros higienizados, com troca e manutenção dos filtros , não apresenta ferrugem?" name="verificacao_escolas.agua_higienizacao_bebedouros" value={formData.verificacao_escolas.agua_higienizacao_bebedouros} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_escolas.agua_obs" value={formData.verificacao_escolas.agua_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Resíduos Sólidos e Materiais Recicláveis">
                        <Row>
                            <CampoSelect label="O estabelecimento dispõe de recipientes identificados e íntegros, de fácil higienização e transporte, em número e capacidade suficiente para conter os resíduos?" name="verificacao_escolas.residuos_recipientes" value={formData.verificacao_escolas.residuos_recipientes} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os coletores utilizados para a deposição dos resíduos das áreas de preparação e armazenamento de alimentos são dotados de tampas acionadas sem contato Manual?" name="verificacao_escolas.residuos_coletores" value={formData.verificacao_escolas.residuos_coletores} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os resíduos são frequentemente coletados e estocados em local fechado e isolado, de forma a evitar focos de contaminação e atração de vetores e pragas urbanas?" name="verificacao_escolas.residuos_frequencia" value={formData.verificacao_escolas.residuos_frequencia} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_escolas.residuos_obs" value={formData.verificacao_escolas.residuos_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                    <ContainerForm title="Esgotamento Sanitário">
                        <Row>
                            <CampoSelect label="As instalações dispõem de conexões com rede de esgoto ou fossa séptica?" name="verificacao_escolas.esgoto_rede" value={formData.verificacao_escolas.esgoto_rede} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="As caixas de gordura e de esgoto possuem dimensão compatível ao volume de resíduos, localizadas fora da área de preparo e armazenamento de alimentos e apresentam-se em adequado estado de conservação e higienização?" name="verificacao_escolas.esgoto_caixa_gordura" value={formData.verificacao_escolas.esgoto_caixa_gordura} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_escolas.esgoto_obs" value={formData.verificacao_escolas.esgoto_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>
                    <ContainerForm title="Controle Integrado de Vetores e Pragas Urbanas">
                        <Row>
                            <CampoSelect label="A edificação, as instalações, os equipamentos, os móveis e os utensílios são livres de vetores e pragas urbanas. Existe um conjunto de ações eficazes e contínuas de controle de vetores e pragas urbanas, com objetivo de impedir a atração, o abrigo, o acesso e ou proliferação dos mesmos?" name="verificacao_escolas.pragas_estado" value={formData.verificacao_escolas.pragas_estado} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Quando as medidas de prevenção adotadas não forem eficazes, é empregado o controle químico, executado por empresa especializada, conforme legislação específica, com produtos regularizados pelo Ministério da Saúde?" name="verificacao_escolas.pragas_medidas" value={formData.verificacao_escolas.pragas_medidas} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_escolas.pragas_obs" value={formData.verificacao_escolas.pragas_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>
                    <ContainerForm title="Áreas de Recreação e Lazer">
                        <Row>
                            <CampoSelect label="Áreas com areia se apresentam com bom aspecto visual, sem mau cheiro, sem presença de resíduos, evitando-se a presença de animais e realizando sua troca quando se fizer necessário?" name="verificacao_escolas.lazer_estado" value={formData.verificacao_escolas.lazer_estado} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Playgrounds com integridade estrutural e manutenção periódica (piso, grades, coberturas, batentes, equipamentos, acessos, corrimão etc.)?" name="verificacao_escolas.lazer_estrutura" value={formData.verificacao_escolas.lazer_estrutura} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Quadras com integridade estrutural e manutenção periódica (piso, grades, coberturas, batentes, equipamentos, acessos, corrimão etc)?" name="verificacao_escolas.lazer_manutencao" value={formData.verificacao_escolas.lazer_manutencao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoAreaTexto label="Observações" name="verificacao_escolas.lazer_obs" value={formData.verificacao_escolas.lazer_obs} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>

                </ContainerForm>
            }

            {!loading && roteiroSelecionado === 4 &&

                <ContainerForm title="Inspeção - Veículos que transportam alimentos">
                    <ContainerForm title="Dados do Veículo">
                        <Row>
                            <CampoTexto label="Tipo do Veículo" name="verificacao_veiculos_alimentos.tipo" value={formData.verificacao_veiculos_alimentos.tipo} tipo="text" className="col-md-3" onChange={handleChange} />
                            <CampoTexto label="Placa" name="verificacao_veiculos_alimentos.placa" value={formData.verificacao_veiculos_alimentos.placa} tipo="text" className="col-md-3" onChange={handleChange} />
                            <CampoTexto label="Placa" name="verificacao_veiculos_alimentos.responsavel" value={formData.verificacao_veiculos_alimentos.responsavel} tipo="text" className="col-md-3" onChange={handleChange} />
                        </Row>
                    </ContainerForm>
                    <ContainerForm title="Avaliação">
                        <Row>
                            <CampoSelect label="O veículo é destinado apenas ao transporte de alimentos." name="verificacao_veiculos_alimentos.destinacao" value={formData.verificacao_veiculos_alimentos.destinacao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Possui certificado de vistoria do órgão competente." name="verificacao_veiculos_alimentos.certificado" value={formData.verificacao_veiculos_alimentos.certificado} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Existência de produtos estranhos que possam contaminar os alimentos transportados." name="verificacao_veiculos_alimentos.contaminacao" value={formData.verificacao_veiculos_alimentos.contaminacao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Existência de isolamento entre a parte do veículo que contém os alimentos e a cabine do condutor e ajudante." name="verificacao_veiculos_alimentos.isolamento" value={formData.verificacao_veiculos_alimentos.isolamento} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Ausência de vetores (insetos) e pragas urbanas (roedores e pássaros) ou qualquer evidência de sua presença como fezes, ninhos e outros." name="verificacao_veiculos_alimentos.vetores" value={formData.verificacao_veiculos_alimentos.vetores} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O compartimento do veículo que transporta alimentos se apresenta limpo, livre de odores ou pontas (pregos, lascas, etc) que possam comprometer a integridade do alimento." name="verificacao_veiculos_alimentos.limpeza" value={formData.verificacao_veiculos_alimentos.limpeza} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O piso e as laterais da carroceria do veículo não apresentam aberturas que permitam a passagem de umidade ou sujidade para a carga de alimentos transportados." name="verificacao_veiculos_alimentos.limpeza_carroceria" value={formData.verificacao_veiculos_alimentos.limpeza_carroceria} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O veículo encontra-se equipado com prateleiras, paletes (PVC) ou ganchos (aço inoxidável) removíveis, para facilitar sua limpeza e desinfecção." name="verificacao_veiculos_alimentos.prateleiras" value={formData.verificacao_veiculos_alimentos.prateleiras} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Não transporta, concomitantemente, dois ou mais tipos de produtos alimentícios, se um deles representar risco de contaminação cruzada para os demais." name="verificacao_veiculos_alimentos.contaminacao_cruzada" value={formData.verificacao_veiculos_alimentos.contaminacao_cruzada} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Ventilação e circulação de ar capazes de garantir o conforto térmico do produto transportado." name="verificacao_veiculos_alimentos.ventilacao" value={formData.verificacao_veiculos_alimentos.ventilacao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Ventilação artificial por meio de equipamento(s) higienizado(s) e com manutenção adequada ao tipo de equipamento." name="verificacao_veiculos_alimentos.ventilacao_artificial" value={formData.verificacao_veiculos_alimentos.ventilacao_artificial} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Ambiente livre de fungos, gases, pós, partículas em suspensão." name="verificacao_veiculos_alimentos.fungos" value={formData.verificacao_veiculos_alimentos.fungos} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O ato de carregar e / ou descarregar, não representa risco de contaminação, dano ou deterioração para o produto a ser transportado." name="verificacao_veiculos_alimentos.carregamento" value={formData.verificacao_veiculos_alimentos.carregamento} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O emblocamento da carga obedece as recomendações do fabricante, prevenindo danos ao produto." name="verificacao_veiculos_alimentos.emblocamento" value={formData.verificacao_veiculos_alimentos.emblocamento} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O acesso à carroceria é restrito aos manipuladores responsáveis pela atividade de transporte e distribuição do produto." name="verificacao_veiculos_alimentos.acesso_carroceria" value={formData.verificacao_veiculos_alimentos.acesso_carroceria} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="As embalagens não servem de assento aos manipuladores no ato do carregamento e transporte." name="verificacao_veiculos_alimentos.embalagens_assento" value={formData.verificacao_veiculos_alimentos.embalagens_assento} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="As embalagens não são pisoteadas durante o carregamento e transporte do alimento." name="verificacao_veiculos_alimentos.pisoteadas" value={formData.verificacao_veiculos_alimentos.pisoteadas} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O veículo possui termostato." name="verificacao_veiculos_alimentos.termostato" value={formData.verificacao_veiculos_alimentos.termostato} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Existência do controle de temperatura do veículo." name="verificacao_veiculos_alimentos.temperatura" value={formData.verificacao_veiculos_alimentos.temperatura} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Rede de frios adequada ao volume da carga transportada." name="verificacao_veiculos_alimentos.frios" value={formData.verificacao_veiculos_alimentos.frios} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Rede de frios adequada ao volume da carga transportada." name="verificacao_veiculos_alimentos.planilha" value={formData.verificacao_veiculos_alimentos.planilha} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Produtos transportados na temperatura especificada no rótulo." name="verificacao_veiculos_alimentos.rotulo_temperatura" value={formData.verificacao_veiculos_alimentos.rotulo_temperatura} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O equipamento de refrigeração garante a temperatura do alimento durante o transporte." name="verificacao_veiculos_alimentos.equipamento_regrigeracao" value={formData.verificacao_veiculos_alimentos.equipamento_regrigeracao} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="A carroceria do veículo de transporte de alimentos se encontra em perfeito estado de limpeza e conservação." name="verificacao_veiculos_alimentos.limpeza_carroceria" value={formData.verificacao_veiculos_alimentos.limpeza_carroceria} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Os procedimentos de limpeza e desinfecção do compartimento do veículo que transporta alimento são adequados as características do produto transportado." name="verificacao_veiculos_alimentos.procedimento_limpeza" value={formData.verificacao_veiculos_alimentos.procedimento_limpeza} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Existência de registro dos procedimentos de limpeza e desinfecção do veículo." name="verificacao_veiculos_alimentos.procedimento_limpeza_registro" value={formData.verificacao_veiculos_alimentos.procedimento_limpeza_registro} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Produtos utilizados na limpeza e desinfecção do veículo são aprovados pelo Ministério da Saúde." name="verificacao_veiculos_alimentos.produtos_limpeza" value={formData.verificacao_veiculos_alimentos.produtos_limpeza} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Manipuladores fazem uso de uniforme, de cor clara adequado à atividade e exclusivos para o serviço." name="verificacao_veiculos_alimentos.manipuladores_uniforme" value={formData.verificacao_veiculos_alimentos.manipuladores_uniforme} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O veículo possui carroceria provida de isolamento térmico e dotado de unidade frigorífica, para alcançar os pontos de venda com temperatura não superior a 7°C (sete graus Celsius), de acordo com a legislação." name="verificacao_veiculos_alimentos.isolamento_termico" value={formData.verificacao_veiculos_alimentos.isolamento_termico} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="É realizada manutenção preventiva dos equipamentos de refrigeração." name="verificacao_veiculos_alimentos.manutencao_preventiva" value={formData.verificacao_veiculos_alimentos.manutencao_preventiva} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Existência de registro comprovando que os equipamentos de refrigeração passam por manutenção preventiva." name="verificacao_veiculos_alimentos.manutencao_preventiva_registro" value={formData.verificacao_veiculos_alimentos.manutencao_preventiva_registro} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Existência de registro periódico dos procedimentos de limpeza e manutenção dos componentes do sistema de climatização (conforme legislação específica)." name="verificacao_veiculos_alimentos.limpeza_periodica_registro" value={formData.verificacao_veiculos_alimentos.limpeza_periodica_registro} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="O veículo garante a integridade e qualidade do(s) produto(s) transportado(s)." name="verificacao_veiculos_alimentos.integridade" value={formData.verificacao_veiculos_alimentos.integridade} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Veículo não transporta outras cargas que comprometam a segurança do produto." name="verificacao_veiculos_alimentos.outras_cargas" value={formData.verificacao_veiculos_alimentos.outras_cargas} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                        <Row>
                            <CampoSelect label="Existência do controle de saúde dos manipuladores." name="verificacao_veiculos_alimentos.manipuladores_saude" value={formData.verificacao_veiculos_alimentos.manipuladores_saude} options={simNao} className="col-md-12" onChange={handleChange} />
                        </Row>
                    </ContainerForm>
                </ContainerForm>
            }

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

export default FormularioInspecoes;
