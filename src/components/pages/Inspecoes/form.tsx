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

const FormInspecoes: React.FC = () => {
    const [formData, setFormData] = useState({
        descricao: '',
        n_termo_inspecao: '',
        data_inspecao: '',
        motivo_inspecao: '0',
        estabelecimento: '0',
        responsavel_tecnico: '0',
        procedencia_materiais: '',
        verificacao_produtos: '0',
        verificacao_uniformes: '0',
        verificacao_transportes_carnes: '0',
        verificacao_transportes: '0',
        verificacao_recebimento_frios: '0',
        verificacao_armazenamento: '0',
        verificacao_embalagens_industrializados: '0',
        verificacao_armazenamento_toxicos: '0',
        verificacao_temperatura_pereciveis: '0',
        verificacao_local_geladeira: '0',
        verificacao_estado_geladeira: '0',
        verificacao_especura_gelo: '0',
        verificacao_organizacao_geladeira: '0',
        verificacao_regulacao_freezer: '0',
        verificacao_estado_camara_fria: '0',
        verificacao_porta_camara_fria: '0',
        verificacao_termometro_camara_fria: '0',
        verificacao_carnes_camara_fria: '0',
        verificacao_hortifruti_camara_fria: '0',
        verificacao_estrado_camara_fria: '0',
        verificacao_higienizacao_camara_fria: '0',
        verificacao_qualidade_temperatura: '0',
        verificacao_prazo_validade: '0',
        verificacao_devolucao_produtos: '0'
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

    const estabelecimentos = [
        { value: "0", label: "Selecione um estabelecimento" },
        { value: "1", label: "Hospital" },
        { value: "2", label: "Clínica" },
        { value: "3", label: "Laboratório" },
        { value: "4", label: "Farmácia" },
        { value: "5", label: "Unidade Básica de Saúde" },
        { value: "6", label: "Unidade de Pronto Atendimento" },
        { value: "7", label: "Ambulatório" },
        { value: "8", label: "Outro" },
    ]

    const responsaveis = [
        { value: "0", label: "Selecione um responsável" },
        { value: "1", label: "Responsável 1" },
        { value: "2", label: "Responsável 2" },
        { value: "3", label: "Responsável 3" },
        { value: "4", label: "Responsável 4" },
        { value: "5", label: "Responsável 5" },
        { value: "6", label: "Responsável 6" },
        { value: "7", label: "Responsável 7" },
        { value: "8", label: "Responsável 8" },
        { value: "9", label: "Responsável 9" },
        { value: "10", label: "Responsável 10" },
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
        
        const descricao = validaCampos(formData.descricao, 'Descrição', true);
        const n_termo_inspecao = validaCampos(formData.n_termo_inspecao, 'Nº do Termo de Inspeção', true);
        const data_inspecao = validaCampos(formData.data_inspecao, 'Data da Inspeção', true);
        const motivo_inspecao = validaCampos(formData.motivo_inspecao, 'Motivo da Inspeção', true);
        const estabelecimento = validaCampos(formData.estabelecimento, 'Estabelecimento', true);
        const responsavel_tecnico = validaCampos(formData.responsavel_tecnico, 'Responsável Técnico', true);
        const procedencia_materiais = validaCampos(formData.procedencia_materiais, 'Procedência dos Materiais', true);
        const verificacao_produtos = validaCampos(formData.verificacao_produtos, 'Verificação dos Produtos', true);
        const verificacao_uniformes = validaCampos(formData.verificacao_uniformes, 'Verificação dos Uniformes', true);
        const verificacao_transportes_carnes = validaCampos(formData.verificacao_transportes_carnes, 'Verificação dos Transportes de Carnes', true);
        const verificacao_transportes = validaCampos(formData.verificacao_transportes, 'Verificação dos Transportes', true);
        const verificacao_recebimento_frios = validaCampos(formData.verificacao_recebimento_frios, 'Verificação do Recebimento de Frios', true);
        const verificacao_armazenamento = validaCampos(formData.verificacao_armazenamento, 'Verificação do Armazenamento', true);
        const verificacao_embalagens_industrializados = validaCampos(formData.verificacao_embalagens_industrializados, 'Verificação das Embalagens de Produtos Industrializados', true);
        const verificacao_armazenamento_toxicos = validaCampos(formData.verificacao_armazenamento_toxicos, 'Verificação do Armazenamento de Tóxicos', true);
        const verificacao_temperatura_pereciveis = validaCampos(formData.verificacao_temperatura_pereciveis, 'Verificação da Temperatura dos Perecíveis', true);
        const verificacao_local_geladeira = validaCampos(formData.verificacao_local_geladeira, 'Verificação do Local da Geladeira', true);
        const verificacao_estado_geladeira = validaCampos(formData.verificacao_estado_geladeira, 'Verificação do Estado da Geladeira', true);
        const verificacao_especura_gelo = validaCampos(formData.verificacao_especura_gelo, 'Verificação da Espessura do Gelo', true);
        const verificacao_organizacao_geladeira = validaCampos(formData.verificacao_organizacao_geladeira, 'Verificação da Organização da Geladeira', true);
        const verificacao_regulacao_freezer = validaCampos(formData.verificacao_regulacao_freezer, 'Verificação da Regulação do Freezer', true);
        const verificacao_estado_camara_fria = validaCampos(formData.verificacao_estado_camara_fria, 'Verificação do Estado da Câmara Fria', true);
        const verificacao_porta_camara_fria = validaCampos(formData.verificacao_porta_camara_fria, 'Verificação da Porta da Câmara Fria', true);
        const verificacao_termometro_camara_fria = validaCampos(formData.verificacao_termometro_camara_fria, 'Verificação do Termômetro da Câmara Fria', true);
        const verificacao_carnes_camara_fria = validaCampos(formData.verificacao_carnes_camara_fria, 'Verificação das Carnes na Câmara Fria', true);
        const verificacao_hortifruti_camara_fria = validaCampos(formData.verificacao_hortifruti_camara_fria, 'Verificação do Hortifruti na Câmara Fria', true);
        const verificacao_estrado_camara_fria = validaCampos(formData.verificacao_estrado_camara_fria, 'Verificação do Estrado da Câmara Fria', true);
        const verificacao_higienizacao_camara_fria = validaCampos(formData.verificacao_higienizacao_camara_fria, 'Verificação da Higienização da Câmara Fria', true);
        const verificacao_qualidade_temperatura = validaCampos(formData.verificacao_qualidade_temperatura, 'Verificação da Qualidade da Temperatura', true);
        const verificacao_prazo_validade = validaCampos(formData.verificacao_prazo_validade, 'Verificação do Prazo de Validade', true);
        const verificacao_devolucao_produtos = validaCampos(formData.verificacao_devolucao_produtos, 'Verificação da Devolução de Produtos', true);
        
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

        if (procedencia_materiais.erro) {
            mensagem_erro.push(procedencia_materiais.mensagem_erro);
        }

        if (verificacao_produtos.erro) {
            mensagem_erro.push(verificacao_produtos.mensagem_erro);
        }

        if (verificacao_uniformes.erro) {
            mensagem_erro.push(verificacao_uniformes.mensagem_erro);
        }

        if (verificacao_transportes_carnes.erro) {
            mensagem_erro.push(verificacao_transportes_carnes.mensagem_erro);
        }

        if (verificacao_transportes.erro) {
            mensagem_erro.push(verificacao_transportes.mensagem_erro);
        }

        if (verificacao_recebimento_frios.erro) {
            mensagem_erro.push(verificacao_recebimento_frios.mensagem_erro);
        }

        if (verificacao_armazenamento.erro) {
            mensagem_erro.push(verificacao_armazenamento.mensagem_erro);
        }

        if (verificacao_embalagens_industrializados.erro) {
            mensagem_erro.push(verificacao_embalagens_industrializados.mensagem_erro);
        }

        if (verificacao_armazenamento_toxicos.erro) {
            mensagem_erro.push(verificacao_armazenamento_toxicos.mensagem_erro);
        }

        if (verificacao_temperatura_pereciveis.erro) {
            mensagem_erro.push(verificacao_temperatura_pereciveis.mensagem_erro);
        }

        if (verificacao_local_geladeira.erro) {
            mensagem_erro.push(verificacao_local_geladeira.mensagem_erro);
        }

        if (verificacao_estado_geladeira.erro) {
            mensagem_erro.push(verificacao_estado_geladeira.mensagem_erro);
        }

        if (verificacao_especura_gelo.erro) {
            mensagem_erro.push(verificacao_especura_gelo.mensagem_erro);
        }

        if (verificacao_organizacao_geladeira.erro) {
            mensagem_erro.push(verificacao_organizacao_geladeira.mensagem_erro);
        }

        if (verificacao_regulacao_freezer.erro) {
            mensagem_erro.push(verificacao_regulacao_freezer.mensagem_erro);
        }

        if (verificacao_estado_camara_fria.erro) {
            mensagem_erro.push(verificacao_estado_camara_fria.mensagem_erro);
        }

        if (verificacao_porta_camara_fria.erro) {
            mensagem_erro.push(verificacao_porta_camara_fria.mensagem_erro);
        }

        if (verificacao_termometro_camara_fria.erro) {
            mensagem_erro.push(verificacao_termometro_camara_fria.mensagem_erro);
        }

        if (verificacao_carnes_camara_fria.erro) {
            mensagem_erro.push(verificacao_carnes_camara_fria.mensagem_erro);
        }

        if (verificacao_hortifruti_camara_fria.erro) {
            mensagem_erro.push(verificacao_hortifruti_camara_fria.mensagem_erro);
        }

        if (verificacao_estrado_camara_fria.erro) {
            mensagem_erro.push(verificacao_estrado_camara_fria.mensagem_erro);
        }

        if (verificacao_higienizacao_camara_fria.erro) {
            mensagem_erro.push(verificacao_higienizacao_camara_fria.mensagem_erro);
        }

        if (verificacao_qualidade_temperatura.erro) {
            mensagem_erro.push(verificacao_qualidade_temperatura.mensagem_erro);
        }

        if (verificacao_prazo_validade.erro) {
            mensagem_erro.push(verificacao_prazo_validade.mensagem_erro);
        }

        if (verificacao_devolucao_produtos.erro) {
            mensagem_erro.push(verificacao_devolucao_produtos.mensagem_erro);
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
        }
    }

    return (
        <Layout>

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Inspeção", href: "/inspecoes/" }, { texto: "Formulário Inspeções", href: "#" }]} />

            <Titulo titulo="Formulário Inspeções" />

            <ContainerForm title="Informações Básicas">
                <Row>
                    <CampoTexto label="Descrição" name="descricao" tipo="text" className="col-md-8" onChange={handleChange} />
                    <CampoTexto label="Nº do Termo de Inspeção" name="n_termo_inspecao" tipo="text" className="col-md-4" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoTexto label="Data da Inspeção" name="data_inspecao" tipo="text" className="col-md-4" onChange={handleChange} />
                    <CampoSelect label="Motivo da Inspeção" name="motivo_inspecao" options={motivos} className="col-md-4" onChange={handleChange} />
                    <CampoSelect label="Estabelecimento" name="estabelecimento" options={estabelecimentos} className="col-md-4" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Informações Técnicas">
                <Row>
                    <CampoSelect label="Responsável Técnico" name="responsavel_tecnico" options={responsaveis} className="col-md-6" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoTexto label="As matérias primas e os produtos industrializados são procedentes de empresas licenciadas ou cadastradas nos órgãos de vigilância sanitária OU MAPA." name="procedencia_materiais" tipo="text" className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="São verificados nos produtos adquiridos: data de validade, denominação de venda, lista de ingredientes, conteúdo líquido, lote, n° de registro SIF ou do MS, quando necessário; nome e endereço do fabricante, fracionador, distribuidor e importador, características sensoriais, integridade das embalagens e higiene do produto." name="verificacao_produtos" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Os entregadores utilizam uniforme limpo?" name="verificacao_uniformes" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-6" onChange={handleChange} />
                    <CampoSelect label="As carnes/pescados são transportados em veículos limpos, fechados e refrigerados?" name="verificacao_transportes_carnes" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-6" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Os demais alimentos são transportados em veículos limpos, fechados e/ou refrigerados, se necessário?" name="verificacao_transportes" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="É verificada, na hora do recebimento, as temperaturas dos  produtos perecíveis: pescado +3ºC; carnes +7°C; refrigerados +10° C; congelados –12ºC. Tem a planilha de comprovação?" name="verificacao_recebimento_frios" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Armazenamento">
                <Row>
                    <CampoSelect label="Os produtos alimentícios são armazenados sobre estrados ou paletes, em local exclusivo, limpo, arejado, protegido contra entrada de insetos e roedores e de forma organizada segundo: Primeiro que entra, primeiro que sai – PEPS ou Primeiro quevence, primeiro que sai - PVPS?" name="verificacao_armazenamento" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="As embalagens de produtos industrializados estão íntegras e com identificação ou rótulo visível?" name="verificacao_embalagens_industrializados" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Os produtos de limpeza e outros potencialmente tóxicos são armazenados em local separado dos alimentos?" name="verificacao_armazenamento_toxicos" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Os produtos perecíveis estão armazenados em equipamento refrigerado.Temperaturas máximas: carnes: 4°C; pescados: 2°C; hortifruti: 10°C; congelados: - 18° C ou na temperatura recomendada pelo fabricante?" name="verificacao_temperatura_pereciveis" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Geladeira/Freezer">
                <Row>
                    <CampoSelect label="A geladeira e o freezer estão instalados longe de fontes de  calor como forno, fogão?" name="verificacao_local_geladeira" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="A geladeira e o freezer encontram–se em bom estado de conservação?" name="verificacao_estado_geladeira" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="A espessura do gelo não ultrapassa 1 cm?" name="verificacao_especura_gelo" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="A geladeira e o freezer estão limpos e organizados, os produtos estão separados conforme as categorias?" name="verificacao_organizacao_geladeira" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="O freezer está regulado para manter os alimentos congelados a temperatura de –18°C ou na temperatura recomendada pelo fabricante?" name="verificacao_regulacao_freezer" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Câmara Fria">
                <Row>
                    <CampoSelect label="A câmara é revestida de material liso, resistente e impermeável. Está livre de ralos e grelhas, encontra-se em bom estado de conservação e limpeza. Não existe gotejamento?" name="verificacao_estado_camara_fria" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="A porta da câmara fria está totalmente vedada. Possui dispositivo de segurança que permite sua abertura pelo lado interno?" name="verificacao_porta_camara_fria" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Possui termômetro no lado externo indicando a temperatura interna da câmara?" name="verificacao_termometro_camara_fria" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="As carnes e/ou pescado estão adequadamente armazenados em câmara fria. Temperaturas máximas: + 4°C para carnes; + 2°C para pescado ou sob congelamento a -18°C?" name="verificacao_carnes_camara_fria" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Hortifruti e outros produtos estão armazenados em temperatura adequada temperatura máxima: até +10°C ou conforme recomendação do fabricante e registrados em planilhas?" name="verificacao_hortifruti_camara_fria" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Possui estrado de material de fácil limpeza, liso, resistente e impermeável?" name="verificacao_estrado_camara_fria" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="A periodicidade e os procedimentos de higienização estão adequados?" name="verificacao_higienizacao_camara_fria" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Controle de Qualidade">
                <Row>
                    <CampoSelect label="Monitora          diariamente      e          registra em       planilha            própria a temperatura de equipamentos de frio e térmicos?" name="verificacao_qualidade_temperatura" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Não utiliza alimentos com prazo de validade vencido no processo?" name="verificacao_prazo_validade" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Produtos para devolução estão identificados e separados?" name="verificacao_devolucao_produtos" options={[{
                        value: "0", label: "Selecione uma opção"
                    }, {
                        value: "1", label: "Sim"
                    }, {
                        value: "2", label: "Não"
                    }]} className="col-md-12" onChange={handleChange} />
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

export default FormInspecoes;
