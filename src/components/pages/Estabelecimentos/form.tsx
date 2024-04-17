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

const FormularioEstabelecimentos: React.FC = () => {
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
        estado: '',
        cidade: '',
        bairro: '',
        cep: '',
        complemento: '',
        telefone: '',
        email: '',
        protocolo_funcionamento: '',
        passivo_alvara: '',
        n_alvara: '',
        coleta_residuos: '',
        recebeu_autuacao: '',
        forma_abastecimento: '',
        nome_responsavel: '',
        cpf: '',
        escolaridade: '',
        formacao: '',
        especializacao: '',
        registro_conselho: ''
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

    const graus_risco = [
        { value: "0", label: "Selecione um grau" },
        { value: "1", label: "Baixo" },
        { value: "2", label: "Médio" },
        { value: "3", label: "Alto" }
    ];

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
        { value: "0", label: "Selecione uma bairro" },
        { value: "1", label: "Bairro 1" },
        { value: "2", label: "Bairro 2" },
        { value: "3", label: "Bairro 3" }
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
            mensagem_erro = `O campo deve ter ${tamanho} caracteres`;
        }

        return { erro, mensagem_erro };
    }

    function handleSubmit(e: any) {
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
        const estado = validaCampos(formData.estado, 'Estado', true);
        const cidade = validaCampos(formData.cidade, 'Cidade', true);
        const bairro = validaCampos(formData.bairro, 'Bairro', true);
        const cep = validaCampos(formData.cep, 'CEP', true, 8);
        const telefone = validaCampos(formData.telefone, 'Telefone', true);
        const email = validaCampos(formData.email, 'E-mail', true);
        const protocolo_funcionamento = validaCampos(formData.protocolo_funcionamento, 'Protocolo de Funcionamento', true);
        const passivo_alvara = validaCampos(formData.passivo_alvara, 'Passivo de Alvará Sanitário?', true);
        const n_alvara = validaCampos(formData.n_alvara, 'N° do Alvará Sanitário ou Protocolo', true);
        const coleta_residuos = validaCampos(formData.coleta_residuos, 'Coleta de Resíduos', true);
        const recebeu_autuacao = validaCampos(formData.recebeu_autuacao, 'Recebeu Autuação da Vigilância Sanitária?', true);
        const forma_abastecimento = validaCampos(formData.forma_abastecimento, 'Forma de Abastecimento', true);
        const nome_responsavel = validaCampos(formData.nome_responsavel, 'Nome', true);
        const cpf = validaCampos(formData.cpf, 'CPF', true, 11);
        const escolaridade = validaCampos(formData.escolaridade, 'Escolaridade', true);
        const formacao = validaCampos(formData.formacao, 'Formação', true);
        const especializacao = validaCampos(formData.especializacao, 'Especialização', true);
        const registro_conselho = validaCampos(formData.registro_conselho, 'Registro no Conselho', true);

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
        if (n_alvara.erro) mensagem_erro.push(n_alvara.mensagem_erro);
        if (coleta_residuos.erro) mensagem_erro.push(coleta_residuos.mensagem_erro);
        if (recebeu_autuacao.erro) mensagem_erro.push(recebeu_autuacao.mensagem_erro);
        if (forma_abastecimento.erro) mensagem_erro.push(forma_abastecimento.mensagem_erro);
        if (nome_responsavel.erro) mensagem_erro.push(nome_responsavel.mensagem_erro);
        if (cpf.erro) mensagem_erro.push(cpf.mensagem_erro);
        if (escolaridade.erro) mensagem_erro.push(escolaridade.mensagem_erro);
        if (formacao.erro) mensagem_erro.push(formacao.mensagem_erro);
        if (especializacao.erro) mensagem_erro.push(especializacao.mensagem_erro);
        if (registro_conselho.erro) mensagem_erro.push(registro_conselho.mensagem_erro);


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
        }
    }

    return (
        <Layout>

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Estabelecimentos", href: "/estabelecimentos/" }, { texto: "Formulário Estabelecimentos", href: "#" }]} />

            <Titulo titulo="Formulário Estabelecimentos" />

            <ContainerForm title="Informações Básicas">
                <Row>
                    <CampoTexto label="Razão Social" name="razao_social" tipo="text" className="col-md-6" onChange={handleChange} />
                    <CampoTexto label="Nome Fantasia" name="nome_fantasia" tipo="text" className="col-md-6" onChange={handleChange} />
                    {/* <CampoSelect label="Cidade" name="cidade" options={cidades} className="col-md-4" onChange={handleChange} /> */}
                </Row>
                <Row>
                    <CampoTexto label="CNPJ" name="cnpj" tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="CNAE" name="cnae" tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="Data Início Funcionamento" name="data_inicio_funcionamento" tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoSelect label="Grau de Risco" name="grau_risco" options={graus_risco} className="col-md-3" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoTexto label="Inscrição Estadual" name="inscricao_estadual" tipo="text" className="col-md-6" onChange={handleChange} />
                    <CampoTexto label="Inscrição Municipal" name="inscricao_municipal" tipo="text" className="col-md-6" onChange={handleChange} />
                </Row>

            </ContainerForm>

            <ContainerForm title="Endereço / Contato">
                <Row>
                    <CampoTexto label="Logradouro" name="logradouro" tipo="text" className="col-md-6" onChange={handleChange} />
                    <CampoSelect label="Estado" name="estado" options={estados} className="col-md-3" onChange={handleChange} />
                    <CampoSelect label="Cidade" name="cidade" options={cidades} className="col-md-3" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Bairro" name="bairro" options={bairros} className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="CEP" name="cep" tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="Complemento" name="complemento" tipo="text" className="col-md-3" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoTexto label="Telefone" name="telefone" tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="E-mail" name="email" tipo="text" className="col-md-3" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Vigilância">
                <Row>
                    <CampoTexto label="Protocolo de Funcionamento" name="protocolo_funcionamento" tipo="text" className="col-md-4" onChange={handleChange} />
                    <CampoSelect label="Passivo de Alvará Sanitário?" name="passivo_alvara" options={alvara} className="col-md-4" onChange={handleChange} />
                    <CampoTexto label="N° do Alvará Sanitário ou Protocolo" name="n_alvara" tipo="text" className="col-md-4" onChange={handleChange} />
                </Row>

                <Row>
                    <CampoSelect label="Coleta de Resíduos" name="coleta_residuos" options={coleta_residuos} className="col-md-4" onChange={handleChange} />
                    <CampoSelect label="Recebeu Autuação da Vigilância Sanitária?" name="recebeu_autuacao" options={recebeu_autuacao} className="col-md-4" onChange={handleChange} />
                    <CampoSelect label="Forma de Abastecimento" name="forma_abastecimento" options={forma_abastecimento} className="col-md-4" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Responsáveis Legais">
                <Row>
                    <CampoTexto label="Nome" name="nome_responsavel" tipo="text" className="col-md-6" onChange={handleChange} />
                    <CampoTexto label="CPF" name="cpf" tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoSelect label="Escolaridade" name="escolaridade" options={escolaridade} className="col-md-3" onChange={handleChange} />
                </Row>

                <Row className="justify-content-end">
                    <BotaoSubmit texto="Adicionar Novo" onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                    />
                </Row>
            </ContainerForm>

            <ContainerForm title="Responsáveis Técnicos">
                <Row>
                    <CampoTexto label="Nome" name="nome_responsavel" tipo="text" className="col-md-6" onChange={handleChange} />
                    <CampoTexto label="CPF" name="cpf" tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoSelect label="Escolaridade" name="escolaridade" options={escolaridade} className="col-md-3" onChange={handleChange} />
                </Row>

                <Row>
                    <CampoTexto label="Formação" name="formacao" tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="Especialização" name="especializacao" tipo="text" className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="Registro no Conselho" name="registro_conselho" tipo="text" className="col-md-3" onChange={handleChange} />
                </Row>

                <Row className="justify-content-end">
                    <BotaoSubmit texto="Adicionar Novo" onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                    />
                </Row>
            </ContainerForm>

            <ContainerForm title="Salvar Dados">
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
